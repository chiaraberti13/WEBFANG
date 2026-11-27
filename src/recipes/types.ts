import { z } from 'zod';

/**
 * Modello della "ricetta": una sequenza di passaggi (operazione + parametri) che
 * compongono una trasformazione. Versionato (`recipeFormat`) per non rompere i
 * link salvati; le migrazioni vivono in `migrate.ts`.
 *
 * SICUREZZA/PRIVACY: una ricetta contiene SOLO operazioni e parametri non
 * sensibili. L'input e i segreti non fanno parte del modello e non vengono mai
 * serializzati (condivisione sicura per default).
 */
export const RECIPE_FORMAT = 2 as const;

export interface RecipeStep {
  opId: string;
  params: Record<string, unknown>;
}

export interface Recipe {
  recipeFormat: typeof RECIPE_FORMAT;
  steps: RecipeStep[];
}

/** I parametri ammessi sono solo primitivi: niente oggetti/funzioni dall'esterno. */
const paramValue = z.union([z.boolean(), z.string(), z.number()]);

export const recipeStepSchema = z.object({
  opId: z.string().min(1).max(64),
  params: z.record(paramValue).default({}),
});

export const recipeSchema = z.object({
  recipeFormat: z.literal(RECIPE_FORMAT),
  steps: z.array(recipeStepSchema).max(64),
});

/** Ricetta vuota valida. */
export function emptyRecipe(): Recipe {
  return { recipeFormat: RECIPE_FORMAT, steps: [] };
}
