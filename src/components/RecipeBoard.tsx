import { useReducer, useState } from 'react';
import { OPERATIONS, OPERATION_BY_ID } from '../content/operations.ts';
import { formatResult } from '../content/result.ts';
import { translateError } from '../content/format.ts';
import { translate, type Lang } from '../i18n/index.ts';
import {
  canRedo,
  canUndo,
  initialHistory,
  recipeReducer,
} from '../recipes/reducer.ts';
import {
  fitsInUrl,
  readRecipeFromHash,
  recipeFromJson,
  recipeHash,
  recipeToJson,
  serializeRecipe,
} from '../recipes/serialize.ts';
import type { StepOutcome } from '../recipes/engine.ts';
import { DefensePanel } from './DefensePanel.tsx';
import { useRecipeOutcomes } from './useRecipeOutcomes.ts';

const FIRST_OP_ID = OPERATIONS[0]?.id ?? '';

function initHistory() {
  if (typeof window !== 'undefined') {
    const loaded = readRecipeFromHash(window.location.hash);
    if (loaded?.ok) return initialHistory(loaded.recipe);
  }
  return initialHistory();
}

interface RecipeBoardProps {
  lang: Lang;
}

export function RecipeBoard({ lang }: RecipeBoardProps) {
  const t = (key: string, params?: Record<string, string | number>) =>
    translate(lang, key, params);

  const [history, dispatch] = useReducer(recipeReducer, undefined, initHistory);
  const recipe = history.present;
  const [input, setInput] = useState('WebFang');
  const [notice, setNotice] = useState('');
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState('');

  const { outcomes } = useRecipeOutcomes(recipe, input);

  const lastStep = recipe.steps[recipe.steps.length - 1];
  const lastMeta = lastStep ? OPERATION_BY_ID.get(lastStep.opId) : undefined;
  const lastOutcome: StepOutcome | undefined = outcomes[outcomes.length - 1];

  function announce(message: string) {
    setNotice(message);
  }

  async function copyLink() {
    const encoded = serializeRecipe(recipe);
    if (!fitsInUrl(encoded)) {
      announce(t('recipe.shareTooLong'));
      return;
    }
    const url = `${window.location.origin}${window.location.pathname}${recipeHash(recipe)}`;
    try {
      await navigator.clipboard.writeText(url);
      announce(t('recipe.linkCopied'));
    } catch {
      announce(t('recipe.shareTooLong'));
    }
  }

  function exportJson() {
    const blob = new Blob([recipeToJson(recipe)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'webfang-recipe.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function loadImport() {
    const outcome = recipeFromJson(importText);
    if (outcome.ok) {
      dispatch({ type: 'load', recipe: outcome.recipe });
      setImportOpen(false);
      setImportText('');
      announce('');
    } else {
      announce(t(`recipe.err.${outcome.reason}`));
    }
  }

  return (
    <div className="wf-recipe">
      <section className="wf-panel">
        <label className="wf-panel__label" htmlFor="wf-recipe-input">
          {t('app.inputLabel')}
        </label>
        <textarea
          id="wf-recipe-input"
          className="wf-textarea"
          value={input}
          spellCheck={false}
          autoComplete="off"
          placeholder={t('app.inputPlaceholder')}
          onChange={(event) => setInput(event.target.value)}
          rows={4}
        />
      </section>

      <div className="wf-recipe__toolbar" role="toolbar" aria-label="recipe">
        <button
          type="button"
          className="wf-button"
          onClick={() => dispatch({ type: 'add', opId: FIRST_OP_ID })}
        >
          + {t('recipe.addStep')}
        </button>
        <button
          type="button"
          className="wf-button"
          onClick={() => dispatch({ type: 'undo' })}
          disabled={!canUndo(history)}
        >
          ↶ {t('recipe.undo')}
        </button>
        <button
          type="button"
          className="wf-button"
          onClick={() => dispatch({ type: 'redo' })}
          disabled={!canRedo(history)}
        >
          ↷ {t('recipe.redo')}
        </button>
        <span className="wf-recipe__spacer" />
        <button
          type="button"
          className="wf-button"
          onClick={copyLink}
          disabled={recipe.steps.length === 0}
        >
          {t('recipe.share')}
        </button>
        <button
          type="button"
          className="wf-button"
          onClick={exportJson}
          disabled={recipe.steps.length === 0}
        >
          {t('recipe.export')}
        </button>
        <button
          type="button"
          className="wf-button"
          onClick={() => setImportOpen((open) => !open)}
          aria-expanded={importOpen}
        >
          {t('recipe.import')}
        </button>
      </div>

      <p className="wf-recipe__notice" role="status" aria-live="polite">
        {notice}
      </p>

      {importOpen && (
        <section className="wf-panel">
          <label className="wf-panel__label" htmlFor="wf-import">
            {t('recipe.import')}
          </label>
          <textarea
            id="wf-import"
            className="wf-textarea"
            value={importText}
            onChange={(event) => setImportText(event.target.value)}
            placeholder={t('recipe.importPlaceholder')}
            rows={4}
          />
          <button type="button" className="wf-button" onClick={loadImport}>
            {t('recipe.load')}
          </button>
        </section>
      )}

      {recipe.steps.length === 0 ? (
        <p className="wf-output__hint">{t('recipe.empty')}</p>
      ) : (
        <ol className="wf-recipe__steps">
          {recipe.steps.map((step, index) => {
            const meta = OPERATION_BY_ID.get(step.opId);
            const outcome = outcomes[index];
            const display = outcome?.result
              ? formatResult(outcome.result)
              : null;
            return (
              <li key={index} className="wf-step wf-panel">
                <div className="wf-step__head">
                  <span className="wf-panel__label">
                    {t('recipe.step', { n: index + 1 })}
                  </span>
                  <div className="wf-step__actions">
                    <button
                      type="button"
                      className="wf-icon-button"
                      aria-label={`${t('recipe.moveUp')} — ${t('recipe.step', { n: index + 1 })}`}
                      onClick={() => dispatch({ type: 'move', index, dir: -1 })}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="wf-icon-button"
                      aria-label={`${t('recipe.moveDown')} — ${t('recipe.step', { n: index + 1 })}`}
                      onClick={() => dispatch({ type: 'move', index, dir: 1 })}
                      disabled={index === recipe.steps.length - 1}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="wf-icon-button"
                      aria-label={`${t('recipe.remove')} — ${t('recipe.step', { n: index + 1 })}`}
                      onClick={() => dispatch({ type: 'remove', index })}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <select
                  className="wf-select"
                  aria-label={t('app.operationLabel')}
                  value={step.opId}
                  onChange={(event) =>
                    dispatch({
                      type: 'setOp',
                      index,
                      opId: event.target.value,
                    })
                  }
                >
                  {OPERATIONS.map((operation) => (
                    <option key={operation.id} value={operation.id}>
                      {translate(lang, `op.${operation.i18nBase}.label`)}
                    </option>
                  ))}
                </select>

                {meta?.booleanParams.map((param) => (
                  <label key={param.name} className="wf-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(step.params[param.name])}
                      onChange={(event) =>
                        dispatch({
                          type: 'setParam',
                          index,
                          name: param.name,
                          value: event.target.checked,
                        })
                      }
                    />
                    {t(param.labelKey)}
                  </label>
                ))}

                <span className="wf-panel__label">{t('recipe.result')}</span>
                <output className="wf-output" aria-live="polite">
                  {outcome?.error ? (
                    <span className="wf-output__error" role="alert">
                      {translateError(lang, outcome.error)}
                    </span>
                  ) : display ? (
                    <pre className="wf-output__value">{display.text}</pre>
                  ) : null}
                </output>
              </li>
            );
          })}
        </ol>
      )}

      {lastOutcome && !lastOutcome.error && lastOutcome.result && (
        <section className="wf-panel wf-recipe__final">
          <span className="wf-panel__label">{t('recipe.finalOutput')}</span>
          <pre className="wf-output__value">
            {formatResult(lastOutcome.result).text}
          </pre>
        </section>
      )}

      {lastMeta && <DefensePanel meta={lastMeta} lang={lang} />}
    </div>
  );
}
