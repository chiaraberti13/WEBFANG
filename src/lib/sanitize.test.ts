import { describe, expect, it } from 'vitest';
import { sanitize } from './sanitize.ts';

const XSS = '<img src=x onerror=alert(document.domain)>';

describe('sanitize (Defense Playground)', () => {
  it('no defense: the executable vector survives', () => {
    expect(sanitize(XSS, 'none').survives).toBe(true);
  });

  it('DOMPurify (default) removes the event handler', () => {
    const result = sanitize(XSS, 'purify-default');
    expect(result.survives).toBe(false);
    expect(result.output).not.toMatch(/onerror/i);
  });

  it('DOMPurify (strict) drops a script tag but keeps benign markup', () => {
    const result = sanitize(
      '<script>alert(1)</script><b>ok</b>',
      'purify-strict',
    );
    expect(result.survives).toBe(false);
    expect(result.output).not.toMatch(/<script/i);
    expect(result.output).toContain('<b>ok</b>');
  });

  it('escape neutralizes by encoding', () => {
    const result = sanitize('<script>alert(1)</script>', 'escape');
    expect(result.survives).toBe(false);
    expect(result.output).toContain('&lt;script&gt;');
  });

  it('keeps benign markup under DOMPurify default', () => {
    const result = sanitize('<b>hi</b>', 'purify-default');
    expect(result.output).toBe('<b>hi</b>');
    expect(result.survives).toBe(false);
  });
});
