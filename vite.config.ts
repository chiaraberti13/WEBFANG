import { createHash } from 'node:crypto';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteSingleFile } from 'vite-plugin-singlefile';

/**
 * Inietta la Content-Security-Policy a build-time (roadmap: AppSec + nodo #3).
 *
 * Gira in `generateBundle` DOPO l'eventuale inlining del single-file, così può
 * leggere l'HTML finale. Ogni script inline presente viene hashato (sha256) e il
 * suo hash entra in `script-src`: niente `'unsafe-inline'`, coerente col principio
 * "nessuno script inline non hashato". Nella build normale non ci sono script
 * inline (modulepreload polyfill disabilitato), quindi la policy resta `'self'`.
 * `frame-ancestors` è servito via header HTTP (vercel.json), ignorato in <meta>.
 */
function webfangCsp(): Plugin {
  const build = (scriptSrc: string): string =>
    [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' data: blob:",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'none'",
      "form-action 'none'",
    ].join('; ');

  return {
    name: 'webfang-csp',
    // 'post': il generateBundle gira dopo l'emissione di index.html da parte di
    // Vite e dopo l'inlining di vite-plugin-singlefile, così vede l'HTML finale.
    enforce: 'post',
    generateBundle(_options, bundle) {
      const asset = bundle['index.html'];
      if (!asset || asset.type !== 'asset') return;
      let html =
        typeof asset.source === 'string'
          ? asset.source
          : Buffer.from(asset.source).toString('utf8');

      const hashes: string[] = [];
      const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
      for (let m = scriptRe.exec(html); m; m = scriptRe.exec(html)) {
        const attrs = m[1] ?? '';
        const body = m[2] ?? '';
        if (/\bsrc\s*=/.test(attrs) || body.trim() === '') continue;
        hashes.push(
          `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`,
        );
      }

      const scriptSrc = [
        "script-src 'self' 'wasm-unsafe-eval'",
        ...hashes,
      ].join(' ');
      const meta = `<meta http-equiv="Content-Security-Policy" content="${build(scriptSrc)}" />`;
      html = html.replace(/<head>/i, `<head>\n    ${meta}`);
      asset.source = html;
    },
  };
}

// WebFang ha due varianti di build (vedi roadmap, nodo tecnico #2 e #3):
//  - normale: PWA installabile + offline (service worker separato).
//  - single-file: un unico HTML eseguibile anche da file:// (niente PWA/SW).
// La variante si sceglie con BUILD_TARGET=singlefile.
// I Web Worker sono importati con `?worker&inline` (vedi src/workers): Vite
// li incorpora via Blob, quindi funzionano sia nel single-file sia da file://.
const isSingleFile = process.env.BUILD_TARGET === 'singlefile';

export default defineConfig({
  // base relativa: indispensabile perché i path funzionino anche da file://
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    ...(isSingleFile
      ? [viteSingleFile()]
      : [
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg'],
            manifest: {
              name: 'WebFang — Offensive Web Toolkit',
              short_name: 'WebFang',
              description:
                'Trasforma una stringa, capisci cosa cambia e quale difesa serve. 100% client-side.',
              theme_color: '#1a1512',
              background_color: '#1a1512',
              display: 'standalone',
              start_url: './',
              scope: './',
              icons: [
                {
                  src: 'favicon.svg',
                  sizes: 'any',
                  type: 'image/svg+xml',
                  purpose: 'any maskable',
                },
              ],
            },
            workbox: {
              // precache dell'intera app: uso offline reale (VM isolate nei pentest)
              globPatterns: ['**/*.{js,css,html,svg,woff2,wasm}'],
            },
          }),
        ]),
    // deve stare in fondo: il suo generateBundle gira dopo l'inlining del single-file
    webfangCsp(),
  ],
  build: {
    target: 'es2022',
    // niente script inline nella build normale → CSP 'self' senza hash
    modulePreload: { polyfill: false },
    // in single-file tutto deve finire inline
    assetsInlineLimit: isSingleFile ? 100_000_000 : 4096,
    cssCodeSplit: !isSingleFile,
  },
  worker: {
    // worker CLASSICO (non ESM): un module worker creato da un blob: fallisce da
    // file:// in Chromium (nodo tecnico #3). Il worker non usa import, quindi il
    // formato classico è pienamente adeguato e compatibile anche offline.
    format: 'iife',
  },
});
