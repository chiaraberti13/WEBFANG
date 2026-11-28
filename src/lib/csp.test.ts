// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { cspReport, parseCsp } from './csp.ts';
import { isWfError } from '../core/index.ts';

describe('CSP analyzer', () => {
  it('parses directives and their sources', () => {
    const directives = parseCsp("default-src 'self'; img-src 'self' data:");
    expect(directives[0]).toEqual({ name: 'default-src', sources: ["'self'"] });
    expect(directives[1]?.sources).toEqual(["'self'", 'data:']);
  });

  it('flags unsafe-inline as dangerous and wildcard as a warning', () => {
    const report = cspReport(
      parseCsp("default-src 'self'; script-src 'unsafe-inline'; img-src *"),
    );
    const field = (label: string) =>
      report.fields.find((f) => f.label === label);
    expect(field('script-src')?.severity).toBe('danger');
    expect(field('img-src')?.severity).toBe('warn');
  });

  it('warns when default-src and object-src are missing', () => {
    const report = cspReport(parseCsp("img-src 'self'"));
    const field = (label: string) =>
      report.fields.find((f) => f.label === label);
    expect(field('default-src')?.severity).toBe('warn');
    expect(field('object-src')?.severity).toBe('warn');
  });

  it('rejects an empty policy with a structured error', () => {
    try {
      parseCsp('   ');
      expect.unreachable();
    } catch (error) {
      expect(isWfError(error) && error.code).toBe('INVALID_INPUT');
    }
  });
});
