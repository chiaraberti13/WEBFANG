import { useState } from 'react';
import { OPERATIONS, OPERATION_BY_ID } from '../content/operations.ts';
import { defaultParams } from '../content/types.ts';
import { formatResult } from '../content/result.ts';
import { translateError } from '../content/format.ts';
import { translate, type Lang } from '../i18n/index.ts';
import { useOperation } from './useOperation.ts';
import { DefensePanel } from './DefensePanel.tsx';

const FIRST_OP_ID = OPERATIONS[0]?.id ?? '';

interface WorkbenchProps {
  lang: Lang;
}

/**
 * Tavolo a tre blocchi: Input · Operazione+Output · Difesa (sempre visibile).
 * È il template replicabile per tutte le operazioni: aggiungerne una è questione
 * di dati (content/operations.ts + i18n), non di nuova UI.
 */
export function Workbench({ lang }: WorkbenchProps) {
  const t = (key: string, params?: Record<string, string | number>) =>
    translate(lang, key, params);

  const [input, setInput] = useState('WebFang');
  const [opId, setOpId] = useState(FIRST_OP_ID);
  const meta = OPERATION_BY_ID.get(opId);
  const [params, setParams] = useState<Record<string, unknown>>(() =>
    meta ? defaultParams(meta) : {},
  );
  const [copied, setCopied] = useState(false);

  const { result, error, pending } = useOperation(meta, input, params);

  function selectOperation(id: string) {
    setOpId(id);
    const next = OPERATION_BY_ID.get(id);
    setParams(next ? defaultParams(next) : {});
    setCopied(false);
  }

  function toggleParam(name: string, value: boolean) {
    setParams((prev) => ({ ...prev, [name]: value }));
  }

  const display = result ? formatResult(result) : null;

  async function copyOutput() {
    if (!display) return;
    try {
      await navigator.clipboard.writeText(display.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard non disponibile: nessuna azione */
    }
  }

  return (
    <div className="wf-workbench">
      <div className="wf-workbench__io">
        {/* Input */}
        <section className="wf-panel">
          <label className="wf-panel__label" htmlFor="wf-input">
            {t('app.inputLabel')}
          </label>
          <textarea
            id="wf-input"
            className="wf-textarea"
            value={input}
            spellCheck={false}
            autoComplete="off"
            placeholder={t('app.inputPlaceholder')}
            onChange={(event) => setInput(event.target.value)}
            rows={6}
          />
          <p className="wf-panel__meta">
            {t('app.chars', { n: input.length })}
          </p>
        </section>

        {/* Operazione + Output */}
        <section className="wf-panel">
          <label className="wf-panel__label" htmlFor="wf-op">
            {t('app.operationLabel')}
          </label>
          <select
            id="wf-op"
            className="wf-select"
            value={opId}
            onChange={(event) => selectOperation(event.target.value)}
          >
            {OPERATIONS.map((operation) => (
              <option key={operation.id} value={operation.id}>
                {translate(lang, `op.${operation.i18nBase}.label`)}
              </option>
            ))}
          </select>

          {meta && (
            <p className="wf-op__description">
              {translate(lang, `op.${meta.i18nBase}.description`)}
            </p>
          )}

          {meta?.booleanParams.map((param) => (
            <label key={param.name} className="wf-checkbox">
              <input
                type="checkbox"
                checked={Boolean(params[param.name])}
                onChange={(event) =>
                  toggleParam(param.name, event.target.checked)
                }
              />
              {t(param.labelKey)}
            </label>
          ))}

          <div className="wf-output-head">
            <span className="wf-panel__label">{t('app.outputLabel')}</span>
            <button
              type="button"
              className="wf-button"
              onClick={copyOutput}
              disabled={!display}
            >
              {copied ? t('app.copied') : t('app.copy')}
            </button>
          </div>

          <output className="wf-output" aria-live="polite" aria-busy={pending}>
            {error ? (
              <span className="wf-output__error" role="alert">
                {translateError(lang, error)}
              </span>
            ) : input === '' ? (
              <span className="wf-output__hint">{t('app.emptyInput')}</span>
            ) : display ? (
              <>
                <pre className="wf-output__value">{display.text}</pre>
                <p className="wf-panel__meta">
                  {t('app.bytes', { n: display.byteLength })}
                  {display.binary ? ` · ${t('app.binaryNote')}` : ''}
                </p>
              </>
            ) : null}
          </output>
        </section>
      </div>

      {/* Difesa: sempre accanto al passaggio selezionato */}
      {meta && <DefensePanel subject={meta} lang={lang} />}
    </div>
  );
}
