// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { unicodeEscape, unicodeUnescape } from './unicode.ts';

describe('unicode escape/unescape', () => {
  it('escapes non-ASCII by default, keeping printable ASCII', () => {
    expect(unicodeEscape('A€')).toBe('A\\u20ac');
  });

  it('escapes every character when all=true', () => {
    expect(unicodeEscape('A', true)).toBe('\\u0041');
  });

  it('uses \\u{…} for astral code points and round-trips', () => {
    const escaped = unicodeEscape('😀');
    expect(escaped).toBe('\\u{1f600}');
    expect(unicodeUnescape(escaped)).toBe('😀');
  });

  it('unescapes \\uXXXX and \\xXX forms', () => {
    expect(unicodeUnescape('A\\u20ac')).toBe('A€');
    expect(unicodeUnescape('\\x41\\x42')).toBe('AB');
  });

  it('round-trips arbitrary text', () => {
    const raw = "ciao <b>€</b> 😀 'x'";
    expect(unicodeUnescape(unicodeEscape(raw, true))).toBe(raw);
  });
});
