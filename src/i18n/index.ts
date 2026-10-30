/**
 * i18n minimale IT/EN per la Fase 0. In seguito: cataloghi completi e
 * risoluzione degli errori strutturati ({ code, params } → testo).
 */
export type Lang = 'it' | 'en';

type Catalog = Record<string, string>;

const it: Catalog = {
  'app.subtitle': 'Offensive Web Toolkit — contesto → trasformazione → difesa',
  'app.scaffold': 'Fase 0 — impalcatura e prova di fattibilità',
  'demo.title': 'Demo: contratto testo/byte (Base64)',
  'demo.inputLabel': 'Input (testo)',
  'demo.encoded': 'Base64',
  'feasibility.title': 'Prova di fattibilità',
  'feasibility.worker': 'Web Worker inline (Blob)',
  'feasibility.webcrypto': 'WebCrypto (SHA-256 nel worker)',
  'feasibility.wasm': 'Supporto WebAssembly',
  'feasibility.running': 'verifica in corso…',
  'feasibility.ok': 'ok',
  'feasibility.fail': 'non disponibile',
};

const en: Catalog = {
  'app.subtitle': 'Offensive Web Toolkit — context → transformation → defense',
  'app.scaffold': 'Phase 0 — scaffolding and feasibility proof',
  'demo.title': 'Demo: text/byte contract (Base64)',
  'demo.inputLabel': 'Input (text)',
  'demo.encoded': 'Base64',
  'feasibility.title': 'Feasibility proof',
  'feasibility.worker': 'Inline Web Worker (Blob)',
  'feasibility.webcrypto': 'WebCrypto (SHA-256 in the worker)',
  'feasibility.wasm': 'WebAssembly support',
  'feasibility.running': 'checking…',
  'feasibility.ok': 'ok',
  'feasibility.fail': 'unavailable',
};

const catalogs: Record<Lang, Catalog> = { it, en };

export function translate(lang: Lang, key: string): string {
  return catalogs[lang][key] ?? key;
}
