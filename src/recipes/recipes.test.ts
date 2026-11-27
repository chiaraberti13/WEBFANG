// @vitest-environment node
import { describe, expect, it } from 'vitest';
import LZString from 'lz-string';
import {
  DEFAULT_LIMITS,
  isWfError,
  text,
  type RunContext,
} from '../core/index.ts';
import { runRecipe } from './engine.ts';
import {
  deserializeRecipe,
  readRecipeFromHash,
  recipeHash,
  serializeRecipe,
} from './serialize.ts';
import { RECIPE_FORMAT, type Recipe } from './types.ts';

const ctx: RunContext = {
  signal: new AbortController().signal,
  limits: DEFAULT_LIMITS,
};

function recipe(steps: Recipe['steps']): Recipe {
  return { recipeFormat: RECIPE_FORMAT, steps };
}

describe('recipe engine', () => {
  it('chains operations and reports each intermediate step', async () => {
    const outcomes = await runRecipe(
      recipe([
        { opId: 'base64-encode', params: { urlSafe: false } },
        { opId: 'hex-encode', params: { spaced: false } },
      ]),
      text('hi'),
      ctx,
    );
    expect(outcomes).toHaveLength(2);
    const last = outcomes[1]?.result;
    expect(last?.kind).toBe('text');
    if (last?.kind === 'text') expect(last.value).toBe('61476b3d');
  });

  it('stops at the first failing step with a structured error', async () => {
    const outcomes = await runRecipe(
      recipe([{ opId: 'hex-decode', params: {} }]),
      text('zz'),
      ctx,
    );
    expect(outcomes).toHaveLength(1);
    expect(isWfError(outcomes[0]?.error) && outcomes[0]?.error.code).toBe(
      'DECODE_FAILED',
    );
  });

  it('rejects an unknown operation without crashing', async () => {
    const outcomes = await runRecipe(
      recipe([{ opId: 'definitely-not-real', params: {} }]),
      text('x'),
      ctx,
    );
    expect(isWfError(outcomes[0]?.error) && outcomes[0]?.error.code).toBe(
      'UNKNOWN_OPERATION',
    );
  });
});

describe('recipe serialization', () => {
  const sample = recipe([
    { opId: 'base64-encode', params: { urlSafe: true } },
    { opId: 'url-encode', params: { double: false } },
  ]);

  it('round-trips through the URL encoding', () => {
    const outcome = deserializeRecipe(serializeRecipe(sample));
    expect(outcome.ok).toBe(true);
    if (outcome.ok) expect(outcome.recipe).toEqual(sample);
  });

  it('round-trips through the hash fragment', () => {
    const outcome = readRecipeFromHash(recipeHash(sample));
    expect(outcome?.ok).toBe(true);
  });

  it('never serializes input or secrets — only format and steps', () => {
    const json = LZString.decompressFromEncodedURIComponent(
      serializeRecipe(sample),
    );
    const raw = JSON.parse(json ?? '{}') as Record<string, unknown>;
    expect(Object.keys(raw).sort()).toEqual(['recipeFormat', 'steps']);
    for (const step of raw['steps'] as Array<Record<string, unknown>>) {
      expect(Object.keys(step).sort()).toEqual(['opId', 'params']);
    }
    expect(JSON.stringify(raw)).not.toMatch(/input|secret|key/i);
  });

  it('rejects a recipe that references an unknown operation (allowlist)', () => {
    const hostile = recipe([{ opId: 'exec-shell', params: {} }]);
    const outcome = deserializeRecipe(serializeRecipe(hostile));
    expect(outcome).toEqual({ ok: false, reason: 'unknown-op' });
  });

  it('rejects a corrupt payload', () => {
    expect(deserializeRecipe('@@@not-lz-string@@@').ok).toBe(false);
  });

  it('rejects an unsupported recipe format', () => {
    const encoded = LZString.compressToEncodedURIComponent(
      JSON.stringify({ recipeFormat: 99, steps: [] }),
    );
    expect(deserializeRecipe(encoded)).toEqual({
      ok: false,
      reason: 'invalid',
    });
  });

  it('rejects non-primitive parameter values', () => {
    const encoded = LZString.compressToEncodedURIComponent(
      JSON.stringify({
        recipeFormat: RECIPE_FORMAT,
        steps: [
          { opId: 'base64-encode', params: { urlSafe: { nested: true } } },
        ],
      }),
    );
    expect(deserializeRecipe(encoded)).toEqual({
      ok: false,
      reason: 'invalid',
    });
  });

  it('returns null when the hash has no recipe', () => {
    expect(readRecipeFromHash('#foo=bar')).toBeNull();
  });
});
