// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { OPERATIONS, OPERATION_BY_ID } from './operations.ts';
import { catalogKeys } from '../i18n/index.ts';

const DEFENSE_FIELDS = ['what', 'where', 'notProve', 'defense'] as const;
const itKeys = new Set(catalogKeys('it'));
const enKeys = new Set(catalogKeys('en'));

describe('operation catalogue integrity', () => {
  it('has at least one operation and a consistent lookup map', () => {
    expect(OPERATIONS.length).toBeGreaterThan(0);
    for (const meta of OPERATIONS) {
      expect(OPERATION_BY_ID.get(meta.id)).toBe(meta);
      // the metadata id must match the runnable operation id
      expect(meta.op.id).toBe(meta.id);
    }
  });

  it('exposes label and description in both IT and EN', () => {
    for (const meta of OPERATIONS) {
      for (const suffix of ['label', 'description']) {
        const key = `op.${meta.i18nBase}.${suffix}`;
        expect(itKeys.has(key), `missing IT ${key}`).toBe(true);
        expect(enKeys.has(key), `missing EN ${key}`).toBe(true);
      }
    }
  });

  it('provides the four defense answers in both IT and EN', () => {
    for (const meta of OPERATIONS) {
      for (const field of DEFENSE_FIELDS) {
        const key = `defense.${meta.i18nBase}.${field}`;
        expect(itKeys.has(key), `missing IT ${key}`).toBe(true);
        expect(enKeys.has(key), `missing EN ${key}`).toBe(true);
      }
    }
  });

  it('labels every boolean parameter in both IT and EN', () => {
    for (const meta of OPERATIONS) {
      for (const param of meta.booleanParams) {
        expect(itKeys.has(param.labelKey), `missing IT ${param.labelKey}`).toBe(
          true,
        );
        expect(enKeys.has(param.labelKey), `missing EN ${param.labelKey}`).toBe(
          true,
        );
      }
    }
  });
});
