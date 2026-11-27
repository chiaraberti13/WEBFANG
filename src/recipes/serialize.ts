import LZString from 'lz-string';
import { OPERATION_BY_ID } from '../content/operations.ts';
import { migrateRecipe } from './migrate.ts';
import { recipeSchema, type Recipe } from './types.ts';

/**
 * Serializzazione della ricetta nel fragment URL (`#recipe=…`).
 * Pipeline: JSON → compressione (lz-string) → stringa URL-safe. Oltre il limite
 * si evita un link rotto e si propone il fallback (export/copia).
 *
 * SICUREZZA: si serializzano solo operazioni e parametri (primitivi). L'input e i
 * segreti non fanno parte della ricetta e non vengono mai inclusi. In import, le
 * operazioni sconosciute vengono rifiutate (allowlist), le ricette malformate
 * respinte senza bloccare l'app.
 */
export const MAX_URL_RECIPE_CHARS = 1800;
export const RECIPE_HASH_KEY = 'recipe';

export function serializeRecipe(recipe: Recipe): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(recipe));
}

export function fitsInUrl(encoded: string): boolean {
  return encoded.length <= MAX_URL_RECIPE_CHARS;
}

export type DeserializeOutcome =
  | { ok: true; recipe: Recipe }
  | { ok: false; reason: 'corrupt' | 'invalid' | 'unknown-op' };

export function deserializeRecipe(encoded: string): DeserializeOutcome {
  let json: string | null = null;
  try {
    json = LZString.decompressFromEncodedURIComponent(encoded);
  } catch {
    return { ok: false, reason: 'corrupt' };
  }
  if (!json) return { ok: false, reason: 'corrupt' };

  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    return { ok: false, reason: 'corrupt' };
  }

  const parsed = recipeSchema.safeParse(migrateRecipe(raw));
  if (!parsed.success) return { ok: false, reason: 'invalid' };

  for (const step of parsed.data.steps) {
    if (!OPERATION_BY_ID.has(step.opId)) {
      return { ok: false, reason: 'unknown-op' };
    }
  }
  return { ok: true, recipe: parsed.data };
}

/** Serializza la ricetta in JSON leggibile (export). */
export function recipeToJson(recipe: Recipe): string {
  return JSON.stringify(recipe, null, 2);
}

/** Valida e carica una ricetta da JSON (import), con allowlist delle operazioni. */
export function recipeFromJson(input: string): DeserializeOutcome {
  let raw: unknown;
  try {
    raw = JSON.parse(input);
  } catch {
    return { ok: false, reason: 'corrupt' };
  }
  const parsed = recipeSchema.safeParse(migrateRecipe(raw));
  if (!parsed.success) return { ok: false, reason: 'invalid' };
  for (const step of parsed.data.steps) {
    if (!OPERATION_BY_ID.has(step.opId)) {
      return { ok: false, reason: 'unknown-op' };
    }
  }
  return { ok: true, recipe: parsed.data };
}

/** Estrae e valida una ricetta dal fragment `#…recipe=…`; null se assente. */
export function readRecipeFromHash(hash: string): DeserializeOutcome | null {
  const clean = hash.startsWith('#') ? hash.slice(1) : hash;
  const params = new URLSearchParams(clean);
  const encoded = params.get(RECIPE_HASH_KEY);
  if (!encoded) return null;
  return deserializeRecipe(encoded);
}

/** Fragment da appendere all'URL per condividere la ricetta. */
export function recipeHash(recipe: Recipe): string {
  return `#${RECIPE_HASH_KEY}=${serializeRecipe(recipe)}`;
}
