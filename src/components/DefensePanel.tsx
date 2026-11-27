import { useState } from 'react';
import { translate, type Lang } from '../i18n/index.ts';
import type { DefenseSubject } from '../content/types.ts';

/** Le quattro domande sempre presenti accanto a ogni trasformazione/contesto. */
const FIELDS = ['what', 'where', 'notProve', 'defense'] as const;

interface DefensePanelProps {
  subject: DefenseSubject;
  lang: Lang;
}

/**
 * Il cuore del prodotto: per ogni operazione o contesto mostra cosa fa, dove è
 * pertinente, cosa NON dimostra e come difendersi, con i riferimenti CWE/OWASP e,
 * quando disponibili, gli snippet di remediation copy-paste multi-linguaggio.
 */
export function DefensePanel({ subject, lang }: DefensePanelProps) {
  const t = (key: string) => translate(lang, key);
  const refs = [subject.defense.cwe, subject.defense.owasp].filter(Boolean);
  const titleId = `defense-${subject.id}`;

  const remediation = subject.remediation ?? [];
  const [fixIndex, setFixIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = remediation[Math.min(fixIndex, remediation.length - 1)];

  async function copyFix() {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard non disponibile */
    }
  }

  return (
    <section className="wf-defense" aria-labelledby={titleId}>
      <h2 id={titleId} className="wf-defense__title">
        {t('defense.title')}
      </h2>
      <dl className="wf-defense__list">
        {FIELDS.map((field) => (
          <div
            key={field}
            className={`wf-defense__part wf-defense__part--${field}`}
          >
            <dt>{t(`defense.${field}`)}</dt>
            <dd>{t(`defense.${subject.i18nBase}.${field}`)}</dd>
          </div>
        ))}
      </dl>

      {remediation.length > 0 && current && (
        <div className="wf-fix">
          <div className="wf-fix__head">
            <span className="wf-panel__label">{t('defense.fix')}</span>
            <div className="wf-fix__controls">
              <select
                className="wf-select wf-select--compact"
                aria-label={t('defense.fix')}
                value={current.lang}
                onChange={(event) => {
                  const next = remediation.findIndex(
                    (snippet) => snippet.lang === event.target.value,
                  );
                  setFixIndex(next < 0 ? 0 : next);
                  setCopied(false);
                }}
              >
                {remediation.map((snippet) => (
                  <option key={snippet.lang} value={snippet.lang}>
                    {snippet.label}
                  </option>
                ))}
              </select>
              <button type="button" className="wf-button" onClick={copyFix}>
                {copied ? t('app.copied') : t('xss.copy')}
              </button>
            </div>
          </div>
          <pre className="wf-fix__code">
            <code>{current.code}</code>
          </pre>
        </div>
      )}

      {refs.length > 0 && (
        <p className="wf-defense__refs">
          <span className="wf-defense__refs-label">{t('defense.refs')}:</span>{' '}
          {refs.join(' · ')}
        </p>
      )}
      <p className="wf-defense__disclaimer" role="note">
        {t('defense.disclaimer')}
      </p>
    </section>
  );
}
