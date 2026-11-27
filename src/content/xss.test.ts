// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { XSS_BY_ID, XSS_CONTEXTS } from './xss.ts';
import { catalogKeys } from '../i18n/index.ts';

const DEFENSE_FIELDS = ['what', 'where', 'notProve', 'defense'] as const;
const itKeys = new Set(catalogKeys('it'));
const enKeys = new Set(catalogKeys('en'));

// Un payload non deve mai esfiltrare o fare rete: solo l'alert didattico inerte.
const EXFIL =
  /document\.cookie|fetch\(|XMLHttpRequest|WebSocket|https?:\/\/|sendBeacon/i;

describe('XSS context catalogue', () => {
  it('has contexts with a consistent lookup map', () => {
    expect(XSS_CONTEXTS.length).toBeGreaterThan(0);
    for (const context of XSS_CONTEXTS) {
      expect(XSS_BY_ID.get(context.id)).toBe(context);
      expect(context.payloads.length).toBeGreaterThan(0);
    }
  });

  it('only ships inert, didactic payloads (alert(document.domain), no exfiltration)', () => {
    for (const context of XSS_CONTEXTS) {
      for (const payload of context.payloads) {
        expect(payload, `payload should be inert: ${payload}`).toMatch(
          /alert\(document\.domain\)/,
        );
        expect(payload, `payload must not exfiltrate: ${payload}`).not.toMatch(
          EXFIL,
        );
      }
    }
  });

  it('provides label, description, prerequisites and defense in both IT and EN', () => {
    for (const context of XSS_CONTEXTS) {
      for (const suffix of ['label', 'description', 'prereq']) {
        const key = `${context.i18nBase}.${suffix}`;
        expect(itKeys.has(key), `missing IT ${key}`).toBe(true);
        expect(enKeys.has(key), `missing EN ${key}`).toBe(true);
      }
      for (const field of DEFENSE_FIELDS) {
        const key = `defense.${context.i18nBase}.${field}`;
        expect(itKeys.has(key), `missing IT ${key}`).toBe(true);
        expect(enKeys.has(key), `missing EN ${key}`).toBe(true);
      }
    }
  });
});
