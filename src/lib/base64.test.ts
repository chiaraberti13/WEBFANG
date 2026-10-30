// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  base64Decode,
  base64Encode,
  base64DecodeOp,
  base64EncodeOp,
} from './base64.ts';
import {
  DEFAULT_LIMITS,
  isWfError,
  runOperation,
  text,
  textToBytes,
  type RunContext,
} from '../core/index.ts';

const ctx: RunContext = {
  signal: new AbortController().signal,
  limits: DEFAULT_LIMITS,
};

// Vettori ufficiali RFC 4648 §10
const RFC4648: ReadonlyArray<readonly [string, string]> = [
  ['', ''],
  ['f', 'Zg=='],
  ['fo', 'Zm8='],
  ['foo', 'Zm9v'],
  ['foob', 'Zm9vYg=='],
  ['fooba', 'Zm9vYmE='],
  ['foobar', 'Zm9vYmFy'],
];

describe('base64Encode / base64Decode (RFC 4648)', () => {
  for (const [plain, encoded] of RFC4648) {
    it(`encodes "${plain}" → "${encoded}"`, () => {
      expect(base64Encode(textToBytes(plain))).toBe(encoded);
    });
    it(`decodes "${encoded}" → "${plain}"`, () => {
      expect(base64Decode(encoded)).toEqual(textToBytes(plain));
    });
  }

  it('round-trips arbitrary bytes, including non-UTF-8', () => {
    const data = new Uint8Array([0x00, 0xff, 0x80, 0x7f, 0xfb, 0xef, 0xbe]);
    expect(base64Decode(base64Encode(data))).toEqual(data);
  });

  it('url-safe output has no "+", "/" or padding by default', () => {
    const data = new Uint8Array([0xfb, 0xef, 0xbe, 0xff]);
    const url = base64Encode(data, { urlSafe: true });
    expect(url).not.toMatch(/[+/=]/);
    expect(base64Decode(url, { urlSafe: true })).toEqual(data);
  });

  it('rejects an invalid character with a structured WfError', () => {
    try {
      base64Decode('Zm9v*');
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(isWfError(error)).toBe(true);
      if (isWfError(error)) expect(error.code).toBe('DECODE_FAILED');
    }
  });
});

describe('base64 operations via runOperation (contract)', () => {
  it('encodes text input to a text result', async () => {
    const result = await runOperation(
      base64EncodeOp,
      text('foobar'),
      { urlSafe: false },
      ctx,
    );
    expect(result.kind).toBe('text');
    if (result.kind === 'text') expect(result.value).toBe('Zm9vYmFy');
  });

  it('decode rejects a bytes input (UNSUPPORTED_INPUT_KIND)', async () => {
    await expect(
      runOperation(
        base64DecodeOp,
        { kind: 'bytes', value: new Uint8Array([1, 2, 3]) },
        { urlSafe: false },
        ctx,
      ),
    ).rejects.toMatchObject({ code: 'UNSUPPORTED_INPUT_KIND' });
  });

  it('rejects invalid params (INVALID_PARAMS)', async () => {
    await expect(
      runOperation(base64EncodeOp, text('x'), { urlSafe: 'nope' }, ctx),
    ).rejects.toMatchObject({ code: 'INVALID_PARAMS' });
  });

  it('aborts when the signal is already aborted (ABORTED)', async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(
      runOperation(
        base64EncodeOp,
        text('x'),
        { urlSafe: false },
        { signal: controller.signal, limits: DEFAULT_LIMITS },
      ),
    ).rejects.toMatchObject({ code: 'ABORTED' });
  });

  it('rejects input above the size limit (INPUT_TOO_LARGE)', async () => {
    await expect(
      runOperation(
        base64EncodeOp,
        text('abcdef'),
        { urlSafe: false },
        { signal: ctx.signal, limits: { ...DEFAULT_LIMITS, maxInputBytes: 3 } },
      ),
    ).rejects.toMatchObject({ code: 'INPUT_TOO_LARGE' });
  });
});
