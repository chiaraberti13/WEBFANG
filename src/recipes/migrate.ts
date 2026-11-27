import { RECIPE_FORMAT } from './types.ts';

/**
 * Migrazioni del formato ricetta. Oggi esiste solo il formato corrente; quando il
 * formato cambierà, qui si convertono i payload più vecchi PRIMA della validazione
 * con lo schema, così i link salvati non si rompono.
 */
export function migrateRecipe(raw: unknown): unknown {
  if (!raw || typeof raw !== 'object') return raw;
  const record = raw as Record<string, unknown>;
  const format = record['recipeFormat'];

  // Esempio di punto d'aggancio per migrazioni future:
  // if (format === 1) return { recipeFormat: RECIPE_FORMAT, steps: ... };

  if (format === undefined) {
    // payload senza versione esplicita: assume il formato corrente.
    return { ...record, recipeFormat: RECIPE_FORMAT };
  }
  return raw;
}
