import { OPERATION_BY_ID } from '../content/operations.ts';
import { defaultParams } from '../content/types.ts';
import { emptyRecipe, type Recipe, type RecipeStep } from './types.ts';

/**
 * Stato della ricetta con cronologia per undo/redo. Reducer PURO (testabile fuori
 * dalla UI): ogni mutazione spinge lo stato corrente in `past` e svuota `future`.
 */
export interface RecipeHistory {
  past: Recipe[];
  present: Recipe;
  future: Recipe[];
}

export type RecipeAction =
  | { type: 'add'; opId: string }
  | { type: 'remove'; index: number }
  | { type: 'move'; index: number; dir: -1 | 1 }
  | { type: 'setOp'; index: number; opId: string }
  | {
      type: 'setParam';
      index: number;
      name: string;
      value: boolean | string | number;
    }
  | { type: 'load'; recipe: Recipe }
  | { type: 'undo' }
  | { type: 'redo' };

export function initialHistory(recipe: Recipe = emptyRecipe()): RecipeHistory {
  return { past: [], present: recipe, future: [] };
}

function paramsForOp(opId: string): Record<string, unknown> {
  const meta = OPERATION_BY_ID.get(opId);
  return meta ? defaultParams(meta) : {};
}

function withSteps(recipe: Recipe, steps: RecipeStep[]): Recipe {
  return { ...recipe, steps };
}

/** Applica una mutazione agli step e restituisce la nuova ricetta (o la stessa). */
function reduceSteps(recipe: Recipe, action: RecipeAction): Recipe {
  const steps = recipe.steps;
  switch (action.type) {
    case 'add':
      return withSteps(recipe, [
        ...steps,
        { opId: action.opId, params: paramsForOp(action.opId) },
      ]);
    case 'remove':
      if (action.index < 0 || action.index >= steps.length) return recipe;
      return withSteps(
        recipe,
        steps.filter((_, i) => i !== action.index),
      );
    case 'move': {
      const target = action.index + action.dir;
      if (
        action.index < 0 ||
        action.index >= steps.length ||
        target < 0 ||
        target >= steps.length
      ) {
        return recipe;
      }
      const next = steps.slice();
      const a = next[action.index];
      const b = next[target];
      if (!a || !b) return recipe;
      next[action.index] = b;
      next[target] = a;
      return withSteps(recipe, next);
    }
    case 'setOp': {
      const step = steps[action.index];
      if (!step || step.opId === action.opId) return recipe;
      const next = steps.slice();
      next[action.index] = {
        opId: action.opId,
        params: paramsForOp(action.opId),
      };
      return withSteps(recipe, next);
    }
    case 'setParam': {
      const step = steps[action.index];
      if (!step) return recipe;
      const next = steps.slice();
      next[action.index] = {
        ...step,
        params: { ...step.params, [action.name]: action.value },
      };
      return withSteps(recipe, next);
    }
    default:
      return recipe;
  }
}

export function recipeReducer(
  state: RecipeHistory,
  action: RecipeAction,
): RecipeHistory {
  switch (action.type) {
    case 'undo': {
      const previous = state.past[state.past.length - 1];
      if (!previous) return state;
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case 'redo': {
      const next = state.future[0];
      if (!next) return state;
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    }
    case 'load':
      if (action.recipe === state.present) return state;
      return {
        past: [...state.past, state.present],
        present: action.recipe,
        future: [],
      };
    default: {
      const present = reduceSteps(state.present, action);
      if (present === state.present) return state;
      return { past: [...state.past, state.present], present, future: [] };
    }
  }
}

export const canUndo = (state: RecipeHistory): boolean => state.past.length > 0;
export const canRedo = (state: RecipeHistory): boolean =>
  state.future.length > 0;
