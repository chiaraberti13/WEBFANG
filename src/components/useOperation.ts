import { useEffect, useState } from 'react';
import {
  DEFAULT_LIMITS,
  runOperation,
  text,
  type WfResult,
} from '../core/index.ts';
import type { OperationMeta } from '../content/types.ts';

export interface OperationState {
  result: WfResult | null;
  error: unknown;
  pending: boolean;
}

const IDLE: OperationState = { result: null, error: null, pending: false };

/**
 * Esegue un'operazione in modo reattivo su `input`/`params`, con annullamento
 * (`AbortController`) e limiti di default. Un risultato vecchio non sovrascrive
 * mai uno nuovo: l'effetto precedente viene annullato prima del successivo.
 */
export function useOperation(
  meta: OperationMeta | undefined,
  input: string,
  params: Record<string, unknown>,
): OperationState {
  const [state, setState] = useState<OperationState>(IDLE);

  useEffect(() => {
    if (!meta || input === '') {
      setState(IDLE);
      return;
    }
    const controller = new AbortController();
    let active = true;
    setState({ result: null, error: null, pending: true });

    runOperation(meta.op, text(input), params, {
      signal: controller.signal,
      limits: DEFAULT_LIMITS,
    })
      .then((result: WfResult) => {
        if (active) setState({ result, error: null, pending: false });
      })
      .catch((error: unknown) => {
        if (active) setState({ result: null, error, pending: false });
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [meta, input, params]);

  return state;
}
