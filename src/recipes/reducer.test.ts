// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  canRedo,
  canUndo,
  initialHistory,
  recipeReducer,
  type RecipeHistory,
} from './reducer.ts';

function build(...opIds: string[]): RecipeHistory {
  let state = initialHistory();
  for (const opId of opIds) state = recipeReducer(state, { type: 'add', opId });
  return state;
}

describe('recipeReducer', () => {
  it('adds steps with the operation default params', () => {
    const state = build('base64-encode');
    expect(state.present.steps).toHaveLength(1);
    expect(state.present.steps[0]).toEqual({
      opId: 'base64-encode',
      params: { urlSafe: false },
    });
  });

  it('removes a step and ignores out-of-range indices', () => {
    const state = recipeReducer(build('base64-encode', 'hex-encode'), {
      type: 'remove',
      index: 0,
    });
    expect(state.present.steps.map((s) => s.opId)).toEqual(['hex-encode']);
    expect(
      recipeReducer(state, { type: 'remove', index: 9 }).present.steps,
    ).toHaveLength(1);
  });

  it('moves a step within bounds only', () => {
    const base = build('base64-encode', 'hex-encode');
    const moved = recipeReducer(base, { type: 'move', index: 0, dir: 1 });
    expect(moved.present.steps.map((s) => s.opId)).toEqual([
      'hex-encode',
      'base64-encode',
    ]);
    // moving the first step up is a no-op (same reference back)
    expect(recipeReducer(base, { type: 'move', index: 0, dir: -1 })).toBe(base);
  });

  it('changes an operation and resets its params', () => {
    const base = build('base64-encode');
    const changed = recipeReducer(base, {
      type: 'setOp',
      index: 0,
      opId: 'url-encode',
    });
    expect(changed.present.steps[0]).toEqual({
      opId: 'url-encode',
      params: { double: false },
    });
  });

  it('sets a parameter value', () => {
    const base = build('base64-encode');
    const changed = recipeReducer(base, {
      type: 'setParam',
      index: 0,
      name: 'urlSafe',
      value: true,
    });
    expect(changed.present.steps[0]?.params).toEqual({ urlSafe: true });
  });

  it('undoes and redoes mutations', () => {
    const base = build('base64-encode');
    expect(canUndo(base)).toBe(true);
    const undone = recipeReducer(base, { type: 'undo' });
    expect(undone.present.steps).toHaveLength(0);
    expect(canRedo(undone)).toBe(true);
    const redone = recipeReducer(undone, { type: 'redo' });
    expect(redone.present.steps).toHaveLength(1);
  });

  it('is a no-op to undo with empty history', () => {
    const empty = initialHistory();
    expect(recipeReducer(empty, { type: 'undo' })).toBe(empty);
    expect(canUndo(empty)).toBe(false);
  });

  it('loads a recipe as an undoable change', () => {
    const base = build('base64-encode');
    const loaded = recipeReducer(base, {
      type: 'load',
      recipe: { recipeFormat: 2, steps: [{ opId: 'sha-256', params: {} }] },
    });
    expect(loaded.present.steps[0]?.opId).toBe('sha-256');
    expect(recipeReducer(loaded, { type: 'undo' }).present.steps[0]?.opId).toBe(
      'base64-encode',
    );
  });
});
