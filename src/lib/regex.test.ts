// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { runRegex } from './regex.ts';

describe('runRegex', () => {
  it('finds all matches with the global flag added automatically', () => {
    const { matches, truncated } = runRegex('\\d+', '', '12 and 34');
    expect(matches.map((m) => m.match)).toEqual(['12', '34']);
    expect(matches[0]?.index).toBe(0);
    expect(matches[1]?.index).toBe(7);
    expect(truncated).toBe(false);
  });

  it('returns captured groups', () => {
    const { matches } = runRegex('(\\w)(\\w)', '', 'ab cd');
    expect(matches[0]).toEqual({ index: 0, match: 'ab', groups: ['a', 'b'] });
    expect(matches[1]?.groups).toEqual(['c', 'd']);
  });

  it('truncates at the match cap', () => {
    const { matches, truncated } = runRegex('.', '', 'aaaa', 2);
    expect(matches).toHaveLength(2);
    expect(truncated).toBe(true);
  });

  it('does not report truncation when every match fits', () => {
    const { matches, truncated } = runRegex('.', '', 'ab', 2);
    expect(matches).toHaveLength(2);
    expect(truncated).toBe(false);
  });

  it('throws on an invalid pattern', () => {
    expect(() => runRegex('(', '', 'x')).toThrow();
  });
});
