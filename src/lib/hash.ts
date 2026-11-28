import { z } from 'zod';
import type { Operation, WfResult, WfValue } from '../core/index.ts';
import { asBytes, text } from '../core/index.ts';

/**
 * Digest crittografici via WebCrypto (`crypto.subtle.digest`): SHA-1, SHA-256,
 * SHA-384, SHA-512. Deterministici, a senso unico. Per input piccoli girano sul
 * main thread; l'offload su Web Worker (e MD5/HMAC via hash-wasm) è un incremento
 * successivo.
 *
 * Riferimento: Web Crypto API (MDN)
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 */
export type ShaAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export async function digestHex(
  algorithm: ShaAlgorithm,
  input: Uint8Array,
): Promise<string> {
  const digest = await crypto.subtle.digest(algorithm, input);
  const view = new Uint8Array(digest);
  let hex = '';
  for (let i = 0; i < view.length; i++) {
    hex += (view[i] ?? 0).toString(16).padStart(2, '0');
  }
  return hex;
}

/** Compat: hash SHA-256 in hex (usato dai test e dalla prova di fattibilità). */
export function sha256Hex(input: Uint8Array): Promise<string> {
  return digestHex('SHA-256', input);
}

const noParams = z.object({});
type NoParams = z.infer<typeof noParams>;

function hashOp(id: string, algorithm: ShaAlgorithm): Operation<NoParams> {
  return {
    id,
    category: 'transform',
    accepts: ['text', 'bytes'],
    produces: 'text',
    paramsSchema: noParams,
    async run(input: WfValue): Promise<WfResult> {
      return text(await digestHex(algorithm, asBytes(input)));
    },
  };
}

export const sha1Op = hashOp('sha-1', 'SHA-1');
export const sha256Op = hashOp('sha-256', 'SHA-256');
export const sha384Op = hashOp('sha-384', 'SHA-384');
export const sha512Op = hashOp('sha-512', 'SHA-512');
