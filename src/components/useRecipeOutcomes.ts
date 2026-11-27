import { useEffect, useState } from 'react';
import { DEFAULT_LIMITS, text } from '../core/index.ts';
import { runRecipe, type StepOutcome } from '../recipes/engine.ts';
import type { Recipe } from '../recipes/types.ts';

export interface RecipeRunState {
  outcomes: StepOutcome[];
  pending: boolean;
}

const IDLE: RecipeRunState = { outcomes: [], pending: false };

/**
 * Esegue la ricetta in modo reattivo su `input`, con annullamento e limiti.
 * Un risultato vecchio non sovrascrive uno nuovo (l'effetto precedente è annullato).
 */
export function useRecipeOutcomes(
  recipe: Recipe,
  input: string,
): RecipeRunState {
  const [state, setState] = useState<RecipeRunState>(IDLE);

  useEffect(() => {
    if (input === '' || recipe.steps.length === 0) {
      setState(IDLE);
      return;
    }
    const controller = new AbortController();
    let active = true;
    setState({ outcomes: [], pending: true });

    runRecipe(recipe, text(input), {
      signal: controller.signal,
      limits: DEFAULT_LIMITS,
    })
      .then((outcomes) => {
        if (active) setState({ outcomes, pending: false });
      })
      .catch(() => {
        if (active) setState(IDLE);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [recipe, input]);

  return state;
}
