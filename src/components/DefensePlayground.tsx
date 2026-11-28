import { useMemo, useState } from 'react';
import { sanitize, type SanitizeMode } from '../lib/sanitize.ts';
import { translate, type Lang } from '../i18n/index.ts';

const MODES: SanitizeMode[] = [
  'none',
  'purify-default',
  'purify-strict',
  'escape',
];
const SAMPLE = '<img src=x onerror=alert(document.domain)>';

interface DefensePlaygroundProps {
  lang: Lang;
}

/**
 * Chiude il cerchio attacco → verifica della difesa: un payload passato per
 * DOMPurify o per l'escape, con verdetto "sopravvive/neutralizzato". L'output
 * sanificato è mostrato come TESTO (mai inserito nel DOM): la verifica non esegue
 * nulla.
 */
export function DefensePlayground({ lang }: DefensePlaygroundProps) {
  const t = (key: string) => translate(lang, key);
  const [input, setInput] = useState(SAMPLE);
  const [mode, setMode] = useState<SanitizeMode>('none');
  const result = useMemo(() => sanitize(input, mode), [input, mode]);

  return (
    <div className="wf-playground">
      <p className="wf-xss__intro">{t('playground.intro')}</p>

      <section className="wf-panel">
        <label className="wf-panel__label" htmlFor="wf-pg-input">
          {t('playground.inputLabel')}
        </label>
        <textarea
          id="wf-pg-input"
          className="wf-textarea"
          value={input}
          spellCheck={false}
          autoComplete="off"
          rows={4}
          onChange={(event) => setInput(event.target.value)}
        />
        <label className="wf-panel__label" htmlFor="wf-pg-mode">
          {t('playground.mode')}
        </label>
        <select
          id="wf-pg-mode"
          className="wf-select"
          value={mode}
          onChange={(event) => setMode(event.target.value as SanitizeMode)}
        >
          {MODES.map((value) => (
            <option key={value} value={value}>
              {t(`playground.mode.${value}`)}
            </option>
          ))}
        </select>
      </section>

      <section className="wf-panel">
        <div className="wf-output-head">
          <span className="wf-panel__label">{t('playground.output')}</span>
          <span
            className={`wf-verdict wf-verdict--${result.survives ? 'danger' : 'ok'}`}
            role="status"
          >
            {result.survives
              ? t('playground.survives')
              : t('playground.neutralized')}
          </span>
        </div>
        <pre className="wf-output__value">{result.output}</pre>
        <p className="wf-defense__disclaimer">{t('playground.note')}</p>
      </section>
    </div>
  );
}
