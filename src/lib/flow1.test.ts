// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { urlDecode, urlEncode } from './url.ts';
import { htmlDecode, htmlEncode } from './html-entities.ts';
import { hexDecode, hexEncode } from './hex.ts';
import { digestHex, sha256Hex } from './hash.ts';
import { isWfError, textToBytes } from '../core/index.ts';

describe('url encode/decode', () => {
  it('percent-encodes reserved characters', () => {
    expect(urlEncode('a b&c=d')).toBe('a%20b%26c%3Dd');
  });
  it('double-encodes with two passes', () => {
    expect(urlEncode('a b', 2)).toBe('a%2520b');
    expect(urlDecode('a%2520b', 2)).toBe('a b');
  });
  it('throws a structured error on malformed input', () => {
    try {
      urlDecode('%ZZ');
      expect.unreachable();
    } catch (error) {
      expect(isWfError(error) && error.code).toBe('DECODE_FAILED');
    }
  });
});

describe('html entity encode/decode', () => {
  it('escapes the five significant characters', () => {
    expect(htmlEncode(`<a href="x">'&`)).toBe(
      `&lt;a href=&quot;x&quot;&gt;&#39;&amp;`,
    );
  });
  it('decodes named and numeric entities', () => {
    expect(htmlDecode('&lt;&gt;&amp;&quot;&#39;&#x41;&#66;')).toBe(`<>&"'AB`);
  });
  it('round-trips the significant characters', () => {
    const raw = `<>&"'`;
    expect(htmlDecode(htmlEncode(raw))).toBe(raw);
  });
});

describe('hex encode/decode', () => {
  it('encodes bytes to lowercase hex, optionally spaced', () => {
    const data = new Uint8Array([0x00, 0xff, 0x10]);
    expect(hexEncode(data)).toBe('00ff10');
    expect(hexEncode(data, ' ')).toBe('00 ff 10');
  });
  it('decodes hex, tolerating whitespace', () => {
    expect(hexDecode('00 ff 10')).toEqual(new Uint8Array([0, 255, 16]));
  });
  it('rejects odd length and invalid characters', () => {
    expect(() => hexDecode('abc')).toThrow();
    expect(() => hexDecode('zz')).toThrow();
  });
});

describe('sha-256', () => {
  it('matches the known NIST vectors', async () => {
    expect(await sha256Hex(textToBytes(''))).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
    expect(await sha256Hex(textToBytes('abc'))).toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    );
  });

  it('matches SHA-1/384/512 vectors for "abc"', async () => {
    expect(await digestHex('SHA-1', textToBytes('abc'))).toBe(
      'a9993e364706816aba3e25717850c26c9cd0d89d',
    );
    expect(await digestHex('SHA-384', textToBytes('abc'))).toBe(
      'cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed' +
        '8086072ba1e7cc2358baeca134c825a7',
    );
    expect(await digestHex('SHA-512', textToBytes('abc'))).toBe(
      'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a' +
        '2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f',
    );
  });
});
