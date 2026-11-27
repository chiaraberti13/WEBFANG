import { useState } from 'react';
import { XSS_BY_ID, XSS_CONTEXTS } from '../content/xss.ts';
import { translate, type Lang } from '../i18n/index.ts';
import { DefensePanel } from './DefensePanel.tsx';

interface XssExplorerProps {
  lang: Lang;
  contextId: string;
  onContextChange: (id: string) => void;
}

/**
 * Esploratore dei contesti XSS: scelto il contesto, mostra prerequisiti, payload
 * inerti (resi come TESTO, mai eseguiti né inseriti come HTML) e la difesa
 * contestuale nel pannello Difesa. Il contesto è controllato dall'esterno, così il
 * wizard può impostarlo.
 */
export function XssExplorer({
  lang,
  contextId,
  onContextChange,
}: XssExplorerProps) {
  const t = (key: string) => translate(lang, key);
  const [copied, setCopied] = useState<number | null>(null);
  const context = XSS_BY_ID.get(contextId);

  async function copyPayload(payload: string, index: number) {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(index);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      /* clipboard non disponibile */
    }
  }

  return (
    <div className="wf-xss">
      <p className="wf-xss__intro">{t('xss.intro')}</p>

      <section className="wf-panel">
        <label className="wf-panel__label" htmlFor="wf-xss-context">
          {t('xss.pickContext')}
        </label>
        <select
          id="wf-xss-context"
          className="wf-select"
          value={contextId}
          onChange={(event) => onContextChange(event.target.value)}
        >
          {XSS_CONTEXTS.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {translate(lang, `${entry.i18nBase}.label`)}
            </option>
          ))}
        </select>
        {context && (
          <>
            <p className="wf-op__description">
              {translate(lang, `${context.i18nBase}.description`)}
            </p>
            <span className="wf-panel__label">{t('xss.prereqLabel')}</span>
            <p className="wf-op__description">
              {translate(lang, `${context.i18nBase}.prereq`)}
            </p>
          </>
        )}
      </section>

      {context && (
        <section className="wf-panel">
          <span className="wf-panel__label">{t('xss.payloads')}</span>
          <ul className="wf-xss__payloads">
            {context.payloads.map((payload, index) => (
              <li key={index} className="wf-xss__payload">
                <code className="wf-output__value">{payload}</code>
                <button
                  type="button"
                  className="wf-button"
                  onClick={() => copyPayload(payload, index)}
                >
                  {copied === index ? t('app.copied') : t('xss.copy')}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {context && <DefensePanel subject={context} lang={lang} />}
    </div>
  );
}
