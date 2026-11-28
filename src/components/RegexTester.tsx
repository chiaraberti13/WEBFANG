import { useState } from 'react';
import { translate, type Lang } from '../i18n/index.ts';
import type { DefenseSubject } from '../content/types.ts';
import { useRegexWorker } from './useRegexWorker.ts';
import { DefensePanel } from './DefensePanel.tsx';

const REGEX_DEFENSE: DefenseSubject = {
  id: 'regex',
  i18nBase: 'regex',
  defense: { cwe: 'CWE-1333', owasp: 'A05:2021' },
};

const FLAGS = ['g', 'i', 'm', 's'] as const;

interface RegexTesterProps {
  lang: Lang;
}

/**
 * Tester di espressioni regolari eseguito in un Web Worker con timeout: un
 * pattern catastrofico non blocca la UI (il worker viene terminato). Dimostra sia
 * l'uso sia il rischio ReDoS, con la difesa accanto.
 */
export function RegexTester({ lang }: RegexTesterProps) {
  const t = (key: string, params?: Record<string, string | number>) =>
    translate(lang, key, params);
  const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b');
  const [flags, setFlags] = useState('g');
  const [input, setInput] = useState(
    'scrivi a test@example.com oppure admin@webfang.dev',
  );
  const state = useRegexWorker(pattern, flags, input);

  function toggleFlag(flag: string, on: boolean) {
    setFlags((prev) => {
      if (on) return prev.includes(flag) ? prev : prev + flag;
      return prev.replace(flag, '');
    });
  }

  return (
    <div className="wf-regex">
      <p className="wf-xss__intro">{t('regex.intro')}</p>

      <section className="wf-panel">
        <label className="wf-panel__label" htmlFor="wf-regex-pattern">
          {t('regex.pattern')}
        </label>
        <input
          id="wf-regex-pattern"
          className="wf-select"
          value={pattern}
          spellCheck={false}
          autoComplete="off"
          onChange={(event) => setPattern(event.target.value)}
        />

        <span className="wf-panel__label">{t('regex.flags')}</span>
        <div className="wf-regex__flags">
          {FLAGS.map((flag) => (
            <label key={flag} className="wf-checkbox">
              <input
                type="checkbox"
                checked={flags.includes(flag)}
                onChange={(event) => toggleFlag(flag, event.target.checked)}
              />
              {t(`regex.flag.${flag}`)}
            </label>
          ))}
        </div>

        <label className="wf-panel__label" htmlFor="wf-regex-input">
          {t('regex.testString')}
        </label>
        <textarea
          id="wf-regex-input"
          className="wf-textarea"
          value={input}
          spellCheck={false}
          autoComplete="off"
          rows={4}
          onChange={(event) => setInput(event.target.value)}
        />
      </section>

      <section className="wf-panel">
        <span className="wf-panel__label">{t('regex.results')}</span>
        <output className="wf-output" aria-live="polite">
          {state.status === 'timeout' && (
            <span className="wf-output__error" role="alert">
              {t('regex.timeout')}
            </span>
          )}
          {state.status === 'error' && (
            <span className="wf-output__error" role="alert">
              {t('regex.invalid')}: {state.message}
            </span>
          )}
          {state.status === 'input-too-large' && (
            <span className="wf-output__hint">
              {t('regex.tooLarge', { max: state.max })}
            </span>
          )}
          {state.status === 'done' && (
            <>
              <p className="wf-panel__meta">
                {t('regex.matches', { n: state.matches.length })}
                {state.truncated ? ' · …' : ''}
              </p>
              {state.matches.length === 0 ? (
                <span className="wf-output__hint">{t('regex.noMatch')}</span>
              ) : (
                <ol className="wf-regex__matches">
                  {state.matches.slice(0, 200).map((m, index) => (
                    <li key={index}>
                      <code className="wf-output__value">{m.match}</code>
                      <span className="wf-panel__meta"> @ {m.index}</span>
                      {m.groups.length > 0 && (
                        <span className="wf-panel__meta">
                          {' '}
                          · {m.groups.map((g) => JSON.stringify(g)).join(', ')}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </>
          )}
        </output>
      </section>

      <DefensePanel subject={REGEX_DEFENSE} lang={lang} />
    </div>
  );
}
