import { useState } from 'react';
import { translate, type Lang } from '../i18n/index.ts';
import { Modal } from './Modal.tsx';

const TOTAL = 3;

interface OnboardingProps {
  lang: Lang;
  onDone: () => void;
}

/** Onboarding in 3 schermate, richiamabile dal pulsante Aiuto. */
export function Onboarding({ lang, onDone }: OnboardingProps) {
  const t = (key: string, params?: Record<string, string | number>) =>
    translate(lang, key, params);
  const [step, setStep] = useState(1);

  return (
    <Modal titleId="wf-onboarding-title" onClose={onDone}>
      <p className="wf-panel__meta">
        {t('onboarding.step', { n: step, total: TOTAL })}
      </p>
      <h2 id="wf-onboarding-title">{t(`onboarding.title.${step}`)}</h2>
      <p>{t(`onboarding.body.${step}`)}</p>
      <div className="wf-modal__actions">
        <button type="button" className="wf-button" onClick={onDone}>
          {t('onboarding.skip')}
        </button>
        <span className="wf-recipe__spacer" />
        {step > 1 && (
          <button
            type="button"
            className="wf-button"
            onClick={() => setStep((s) => s - 1)}
          >
            {t('onboarding.back')}
          </button>
        )}
        {step < TOTAL ? (
          <button
            type="button"
            className="wf-button"
            onClick={() => setStep((s) => s + 1)}
          >
            {t('onboarding.next')}
          </button>
        ) : (
          <button type="button" className="wf-button" onClick={onDone}>
            {t('onboarding.done')}
          </button>
        )}
      </div>
    </Modal>
  );
}
