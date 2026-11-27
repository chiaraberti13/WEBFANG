import { z } from 'zod';
import type { Operation, WfResult, WfValue } from '../core/index.ts';
import { asBytes, text } from '../core/index.ts';

/**
 * SHA-256 sui BYTE dell'input, via WebCrypto (`crypto.subtle.digest`). Prima
 * operazione crittografica, deterministica. Per input piccoli gira sul main
 * thread; l'offload su Web Worker è un'ottimizzazione successiva (hash-wasm).
 *
 * Riferimento: Web Crypto API (MDN)
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 */

export async function sha256Hex(input: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', input);
  const view = new Uint8Array(digest);
  let hex = '';
  for (let i = 0; i < view.length; i++) {
    hex += (view[i] ?? 0).toString(16).padStart(2, '0');
  }
  return hex;
}

const noParams = z.object({});
type NoParams = z.infer<typeof noParams>;

export const sha256Op: Operation<NoParams> = {
  id: 'sha-256',
  category: 'transform',
  accepts: ['text', 'bytes'],
  produces: 'text',
  paramsSchema: noParams,
  async run(input: WfValue): Promise<WfResult> {
    return text(await sha256Hex(asBytes(input)));
  },
};
