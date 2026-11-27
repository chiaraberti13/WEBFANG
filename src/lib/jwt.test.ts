// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { inspectJwt, jwtReport } from './jwt.ts';
import { base64Encode } from './base64.ts';
import { isWfError, textToBytes } from '../core/index.ts';

const SAMPLE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
  '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ' +
  '.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const b64u = (obj: unknown): string =>
  base64Encode(textToBytes(JSON.stringify(obj)), { urlSafe: true });

describe('jwt inspect', () => {
  it('decodes header and claims of a standard token', () => {
    const inspection = inspectJwt(SAMPLE);
    expect(inspection.header['alg']).toBe('HS256');
    expect(inspection.payload['sub']).toBe('1234567890');
    expect(inspection.payload['name']).toBe('John Doe');
    expect(inspection.signaturePresent).toBe(true);
  });

  it('flags alg:none as dangerous', () => {
    const token = `${b64u({ alg: 'none' })}.${b64u({ sub: 'x' })}.`;
    const report = jwtReport(inspectJwt(token));
    const algField = report.fields.find((f) => f.label === 'alg');
    expect(algField?.value).toBe('none');
    expect(algField?.severity).toBe('danger');
    const sig = report.fields.find((f) => f.label === 'signature');
    expect(sig?.severity).toBe('warn');
  });

  it('marks an expired exp claim', () => {
    const token = `${b64u({ alg: 'HS256' })}.${b64u({ exp: 1000 })}.sig`;
    const report = jwtReport(inspectJwt(token));
    const exp = report.fields.find((f) => f.label === 'exp');
    expect(exp?.severity).toBe('warn');
    expect(exp?.value).toMatch(/scaduto|expired/);
  });

  it('rejects a malformed token with a structured error', () => {
    try {
      inspectJwt('not-a-jwt');
      expect.unreachable();
    } catch (error) {
      expect(isWfError(error) && error.code).toBe('INVALID_INPUT');
    }
  });
});
