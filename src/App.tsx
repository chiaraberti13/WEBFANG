import { useEffect, useMemo, useState } from 'react';
import FeasibilityWorker from './workers/feasibility.worker.ts?worker&inline';
import type { FeasibilityResponse } from './workers/feasibility.worker.ts';
import { base64Encode } from './lib/base64.ts';
import { textToBytes } from './core/index.ts';
import { useAppStore } from './store.ts';
import { translate, type Lang } from './i18n/index.ts';

type CheckState = 'running' | 'ok' | 'fail';

function StatusDot({ state }: { state: CheckState }) {
  const color =
    state === 'ok' ? '#7bd88f' : state === 'fail' ? '#e06c75' : '#f7b955';
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 10,
        height: 10,
        borderRadius: 999,
        background: color,
      }}
    />
  );
}

export default function App() {
  const { lang, setLang, theme, toggleTheme } = useAppStore();
  const t = (key: string) => translate(lang, key);

  const [input, setInput] = useState('WebFang');
  const encoded = useMemo(() => base64Encode(textToBytes(input)), [input]);

  const [worker, setWorker] = useState<CheckState>('running');
  const [webcrypto, setWebcrypto] = useState<CheckState>('running');
  const [wasm, setWasm] = useState<CheckState>('running');

  useEffect(() => {
    let cancelled = false;
    const w = new FeasibilityWorker();
    const timeout = window.setTimeout(() => {
      if (!cancelled) {
        setWorker('fail');
        setWebcrypto('fail');
        setWasm('fail');
      }
    }, 4000);

    w.onmessage = (event: MessageEvent<FeasibilityResponse>) => {
      if (cancelled) return;
      window.clearTimeout(timeout);
      setWorker('ok');
      // SHA-256("") = e3b0c442... — presenza di un digest valido ⇒ WebCrypto ok
      setWebcrypto(event.data.sha256.length === 64 ? 'ok' : 'fail');
      setWasm(event.data.wasmSupported ? 'ok' : 'fail');
    };
    w.onerror = (event) => {
      if (cancelled) return;
      window.clearTimeout(timeout);
      console.error('[webfang] feasibility worker error', event.message);
      setWorker('fail');
      setWebcrypto('fail');
      setWasm('fail');
    };
    w.postMessage({ id: 1, bytes: textToBytes('') });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      w.terminate();
    };
  }, []);

  const checks: ReadonlyArray<[string, CheckState]> = [
    ['feasibility.worker', worker],
    ['feasibility.webcrypto', webcrypto],
    ['feasibility.wasm', wasm],
  ];

  const dark = theme === 'dark';

  return (
    <div
      style={{
        minHeight: '100%',
        color: dark ? '#f5efe8' : '#1a1512',
        background: dark ? '#1a1512' : '#f7f2ea',
        padding: '2rem 1rem',
      }}
    >
      <main style={{ maxWidth: 760, margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: '2.25rem', fontWeight: 800 }}>
              Web<span style={{ color: '#f7b955' }}>Fang</span>
            </h1>
            <p style={{ margin: '0.25rem 0 0', opacity: 0.8 }}>
              {t('app.subtitle')}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="sr-only">lang</span>
              <select
                aria-label="language"
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                style={{ padding: '0.4rem' }}
              >
                <option value="it">IT</option>
                <option value="en">EN</option>
              </select>
            </label>
            <button
              type="button"
              onClick={toggleTheme}
              style={{ padding: '0.4rem 0.8rem' }}
            >
              {dark ? '☀︎' : '☾'}
            </button>
          </div>
        </header>

        <p
          style={{ opacity: 0.6, fontFamily: 'monospace', marginTop: '0.5rem' }}
        >
          {t('app.scaffold')}
        </p>

        <section
          aria-labelledby="demo-h"
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: 12,
            border: '1px solid rgba(247,185,85,0.3)',
          }}
        >
          <h2 id="demo-h" style={{ marginTop: 0, fontSize: '1.1rem' }}>
            {t('demo.title')}
          </h2>
          <label
            htmlFor="demo-in"
            style={{ display: 'block', marginBottom: 4 }}
          >
            {t('demo.inputLabel')}
          </label>
          <input
            id="demo-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              fontFamily: 'monospace',
            }}
          />
          <p style={{ margin: '0.75rem 0 0', opacity: 0.7 }}>
            {t('demo.encoded')}
          </p>
          <output
            style={{
              display: 'block',
              fontFamily: 'monospace',
              wordBreak: 'break-all',
              color: '#f7b955',
            }}
          >
            {encoded}
          </output>
        </section>

        <section
          aria-labelledby="feas-h"
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: 12,
            border: '1px solid rgba(247,185,85,0.3)',
          }}
        >
          <h2 id="feas-h" style={{ marginTop: 0, fontSize: '1.1rem' }}>
            {t('feasibility.title')}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {checks.map(([key, state]) => (
              <li
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '0.35rem 0',
                }}
              >
                <StatusDot state={state} />
                <span style={{ flex: 1 }}>{t(key)}</span>
                <span style={{ opacity: 0.7, fontFamily: 'monospace' }}>
                  {t(`feasibility.${state === 'running' ? 'running' : state}`)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
