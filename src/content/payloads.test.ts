// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { PACK_BY_ID, PAYLOAD_PACKS } from './payloads.ts';
import { catalogKeys } from '../i18n/index.ts';

const DEFENSE_FIELDS = ['what', 'where', 'notProve', 'defense'] as const;
const itKeys = new Set(catalogKeys('it'));
const enKeys = new Set(catalogKeys('en'));

// Nessun payload deve essere distruttivo o "armato".
const DESTRUCTIVE =
  /drop\s+table|delete\s+from|truncate|shutdown|reboot|rm\s+-rf|mkfs|:\(\)\s*\{|\bwget\b|\bcurl\b|nc\s+-e|bash\s+-i|reverse/i;

describe('payload pack catalogue', () => {
  it('has packs with a consistent lookup map and non-empty payloads', () => {
    expect(PAYLOAD_PACKS.length).toBeGreaterThan(0);
    for (const pack of PAYLOAD_PACKS) {
      expect(PACK_BY_ID.get(pack.id)).toBe(pack);
      expect(pack.payloads.length).toBeGreaterThan(0);
      expect(pack.defense.cwe).toBeTruthy();
    }
  });

  it('ships only inert, non-destructive payloads', () => {
    for (const pack of PAYLOAD_PACKS) {
      for (const payload of pack.payloads) {
        expect(
          payload,
          `destructive payload in ${pack.id}: ${payload}`,
        ).not.toMatch(DESTRUCTIVE);
      }
    }
  });

  it('ships copy-paste remediation snippets for every pack', () => {
    for (const pack of PAYLOAD_PACKS) {
      expect(
        pack.remediation?.length,
        `no remediation for ${pack.id}`,
      ).toBeTruthy();
      for (const snippet of pack.remediation ?? []) {
        expect(snippet.lang).toBeTruthy();
        expect(snippet.label).toBeTruthy();
        expect(snippet.code.length).toBeGreaterThan(0);
      }
    }
  });

  it('provides label, description and the four defense answers in IT and EN', () => {
    for (const pack of PAYLOAD_PACKS) {
      for (const suffix of ['label', 'description']) {
        const key = `${pack.i18nBase}.${suffix}`;
        expect(itKeys.has(key), `missing IT ${key}`).toBe(true);
        expect(enKeys.has(key), `missing EN ${key}`).toBe(true);
      }
      for (const field of DEFENSE_FIELDS) {
        const key = `defense.${pack.i18nBase}.${field}`;
        expect(itKeys.has(key), `missing IT ${key}`).toBe(true);
        expect(enKeys.has(key), `missing EN ${key}`).toBe(true);
      }
    }
  });
});
