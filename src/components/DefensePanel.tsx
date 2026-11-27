import { translate, type Lang } from '../i18n/index.ts';
import type { OperationMeta } from '../content/types.ts';

/** Le quattro domande sempre presenti accanto a ogni trasformazione. */
const FIELDS = ['what', 'where', 'notProve', 'defense'] as const;

interface DefensePanelProps {
  meta: OperationMeta;
  lang: Lang;
}

/**
 * Il cuore del prodotto: per ogni operazione mostra cosa fa, dove è pertinente,
 * cosa NON dimostra e come difendersi, con i riferimenti CWE/OWASP. È sempre
 * visibile accanto al passaggio selezionato, non in una scheda nascosta.
 */
export function DefensePanel({ meta, lang }: DefensePanelProps) {
  const t = (key: string) => translate(lang, key);
  const refs = [meta.defense.cwe, meta.defense.owasp].filter(Boolean);
  const titleId = `defense-${meta.id}`;

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
            <dd>{t(`defense.${meta.i18nBase}.${field}`)}</dd>
          </div>
        ))}
      </dl>
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
