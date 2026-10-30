import type {
  ExecutionLimits,
  Operation,
  RunContext,
  WfResult,
  WfValue,
} from './types.ts';
import { WfError } from './errors.ts';
import { asBytes } from './encoding.ts';

/** Limiti di default (anti-DoS). Ricalibrabili per operazione/contesto. */
export const DEFAULT_LIMITS: ExecutionLimits = {
  maxInputBytes: 5 * 1024 * 1024, // 5 MB
  maxOutputBytes: 8 * 1024 * 1024, // 8 MB
  timeoutMs: 5_000,
};

function byteLength(value: WfValue): number {
  return value.kind === 'bytes' ? value.value.length : asBytes(value).length;
}

function outputByteLength(result: WfResult): number {
  if (result.kind === 'report') return 0;
  return byteLength(result);
}

/**
 * Esegue un'operazione applicando il contratto: tipo di input ammesso, limiti,
 * validazione dei parametri (Zod) e annullamento. Gli errori sono sempre WfError.
 */
export async function runOperation<P>(
  operation: Operation<P>,
  input: WfValue,
  rawParams: unknown,
  ctx: RunContext,
): Promise<WfResult> {
  if (ctx.signal.aborted) {
    throw new WfError('ABORTED', { operation: operation.id });
  }

  // 1. tipo di input ammesso (i `generate` puri accettano qualunque input)
  if (operation.accepts.length > 0 && !operation.accepts.includes(input.kind)) {
    throw new WfError('UNSUPPORTED_INPUT_KIND', {
      operation: operation.id,
      got: input.kind,
      expected: operation.accepts.join('|'),
    });
  }

  // 2. limite dimensione input
  const inputBytes = byteLength(input);
  if (inputBytes > ctx.limits.maxInputBytes) {
    throw new WfError('INPUT_TOO_LARGE', {
      bytes: inputBytes,
      max: ctx.limits.maxInputBytes,
    });
  }

  // 3. validazione parametri (schema Zod)
  const parsed = operation.paramsSchema.safeParse(rawParams);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    throw new WfError('INVALID_PARAMS', {
      operation: operation.id,
      issue: first ? first.message : 'invalid',
    });
  }

  // 4. esecuzione
  const result = await operation.run(input, parsed.data, ctx);

  if (ctx.signal.aborted) {
    throw new WfError('ABORTED', { operation: operation.id });
  }

  // 5. limite dimensione output
  const outBytes = outputByteLength(result);
  if (outBytes > ctx.limits.maxOutputBytes) {
    throw new WfError('OUTPUT_TOO_LARGE', {
      bytes: outBytes,
      max: ctx.limits.maxOutputBytes,
    });
  }

  return result;
}
