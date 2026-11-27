import { useState } from 'react';
import { PACK_BY_ID, PAYLOAD_PACKS } from '../content/payloads.ts';
import { translate, type Lang } from '../i18n/index.ts';
import { DefensePanel } from './DefensePanel.tsx';

interface PayloadExplorerProps {
  lang: Lang;
  packId: string;
  onPackChange: (id: string) => void;
}

/**
 * Esploratore dei payload pack: scelta la famiglia, mostra i payload inerti (resi
 * come TESTO, mai eseguiti) e la difesa contestuale nel pannello Difesa.
 */
export function PayloadExplorer({
  lang,
  packId,
  onPackChange,
}: PayloadExplorerProps) {
  const t = (key: string) => translate(lang, key);
  const [copied, setCopied] = useState<number | null>(null);
  const pack = PACK_BY_ID.get(packId);

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
      <p className="wf-xss__intro">{t('payloads.intro')}</p>

      <section className="wf-panel">
        <label className="wf-panel__label" htmlFor="wf-pack">
          {t('payloads.pick')}
        </label>
        <select
          id="wf-pack"
          className="wf-select"
          value={packId}
          onChange={(event) => onPackChange(event.target.value)}
        >
          {PAYLOAD_PACKS.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {translate(lang, `${entry.i18nBase}.label`)}
            </option>
          ))}
        </select>
        {pack && (
          <p className="wf-op__description">
            {translate(lang, `${pack.i18nBase}.description`)}
          </p>
        )}
      </section>

      {pack && (
        <section className="wf-panel">
          <span className="wf-panel__label">{t('payloads.list')}</span>
          <ul className="wf-xss__payloads">
            {pack.payloads.map((payload, index) => (
              <li key={index} className="wf-xss__payload">
                <code className="wf-output__value">{payload}</code>
                <button
                  type="button"
                  className="wf-button"
                  onClick={() => copyPayload(payload, index)}
                >
                  {copied === index ? t('app.copied') : t('payloads.copy')}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {pack && <DefensePanel subject={pack} lang={lang} />}
    </div>
  );
}
