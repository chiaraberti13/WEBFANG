// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { cookieReport, parseSetCookie } from './cookie.ts';
import { isWfError } from '../core/index.ts';

describe('Set-Cookie parser', () => {
  it('parses name, value and attributes', () => {
    const cookie = parseSetCookie(
      'sid=abc123; Path=/; HttpOnly; Secure; SameSite=Lax',
    );
    expect(cookie.name).toBe('sid');
    expect(cookie.value).toBe('abc123');
    expect(cookie.attributes['httponly']).toBe(true);
    expect(cookie.attributes['samesite']).toBe('Lax');
    expect(cookie.attributes['path']).toBe('/');
  });

  it('flags missing HttpOnly/Secure/SameSite as warnings', () => {
    const report = cookieReport(parseSetCookie('sid=abc123'));
    const flag = (label: string) =>
      report.fields.find((f) => f.label === label);
    expect(flag('HttpOnly')?.severity).toBe('warn');
    expect(flag('Secure')?.severity).toBe('warn');
    expect(flag('SameSite')?.severity).toBe('warn');
  });

  it('marks present security flags as info', () => {
    const report = cookieReport(
      parseSetCookie('sid=x; HttpOnly; Secure; SameSite=Strict'),
    );
    const flag = (label: string) =>
      report.fields.find((f) => f.label === label);
    expect(flag('HttpOnly')?.severity).toBe('info');
    expect(flag('SameSite')?.value).toBe('Strict');
  });

  it('rejects an empty header with a structured error', () => {
    try {
      parseSetCookie('   ');
      expect.unreachable();
    } catch (error) {
      expect(isWfError(error) && error.code).toBe('INVALID_INPUT');
    }
  });
});
