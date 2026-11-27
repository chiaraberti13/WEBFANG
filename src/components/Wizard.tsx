import { XSS_CONTEXTS } from '../content/xss.ts';
import { translate, type Lang } from '../i18n/index.ts';

interface WizardProps {
  lang: Lang;
  onPick: (contextId: string) => void;
  onClose: () => void;
}

/**
 * Wizard "non so cosa mi serve": una domanda in linguaggio semplice (dove viene
 * riflesso l'input) che instrada il principiante al contesto XSS pertinente, con
 * i suoi payload inerti e la difesa. Punto di partenza senza dover leggere la doc.
 */
export function Wizard({ lang, onPick, onClose }: WizardProps) {
  const t = (key: string) => translate(lang, key);
  return (
    <div
      className="wf-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wf-wizard-title"
    >
      <div className="wf-modal__card">
        <h2 id="wf-wizard-title">{t('wizard.title')}</h2>
        <p className="wf-op__description">{t('wizard.hint')}</p>
        <p className="wf-panel__label">{t('wizard.q1')}</p>
        <ul className="wf-wizard__options">
          {XSS_CONTEXTS.map((context) => (
            <li key={context.id}>
              <button
                type="button"
                className="wf-button"
                onClick={() => onPick(context.id)}
              >
                {translate(lang, `${context.i18nBase}.label`)}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="wf-button" onClick={onClose}>
          {t('wizard.close')}
        </button>
      </div>
    </div>
  );
}
