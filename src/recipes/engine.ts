import {
  runOperation,
  WfError,
  type RunContext,
  type WfResult,
  type WfValue,
} from '../core/index.ts';
import { OPERATION_BY_ID } from '../content/operations.ts';
import type { Recipe } from './types.ts';

/** Esito di un singolo passaggio della ricetta (risultato o errore, mai entrambi). */
export interface StepOutcome {
  opId: string;
  result: WfResult | null;
  error: unknown;
}

/**
 * Esegue una ricetta passo per passo a partire da `input`, restituendo l'esito di
 * ogni passaggio (per mostrare i risultati intermedi). La catena si ferma al primo
 * errore o quando un passaggio produce un report (terminale). Un'operazione non in
 * allowlist produce un errore strutturato `UNKNOWN_OPERATION`, non un crash.
 */
export async function runRecipe(
  recipe: Recipe,
  input: WfValue,
  ctx: RunContext,
): Promise<StepOutcome[]> {
  const outcomes: StepOutcome[] = [];
  let current: WfValue = input;

  for (const step of recipe.steps) {
    const meta = OPERATION_BY_ID.get(step.opId);
    if (!meta) {
      outcomes.push({
        opId: step.opId,
        result: null,
        error: new WfError('UNKNOWN_OPERATION', { id: step.opId }),
      });
      break;
    }
    try {
      const result = await runOperation(meta.op, current, step.params, ctx);
      outcomes.push({ opId: step.opId, result, error: null });
      if (result.kind === 'report') break;
      current = result;
    } catch (error) {
      outcomes.push({ opId: step.opId, result: null, error });
      break;
    }
  }

  return outcomes;
}
