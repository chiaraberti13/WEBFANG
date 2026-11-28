import { useEffect, useRef, useState } from 'react';
import RegexWorker from '../workers/regex.worker.ts?worker&inline';
import type { RegexMatch } from '../lib/regex.ts';
import type { RegexRequest, RegexResponse } from '../workers/regex.worker.ts';

const TIMEOUT_MS = 1500;
const DEBOUNCE_MS = 250;
const MAX_INPUT = 50_000;

export type RegexState =
  | { status: 'idle' }
  | { status: 'running' }
  | { status: 'done'; matches: RegexMatch[]; truncated: boolean }
  | { status: 'error'; message: string }
  | { status: 'timeout' }
  | { status: 'input-too-large'; max: number };

/**
 * Esegue la regex in un Web Worker con debounce e TIMEOUT: se il worker non
 * risponde entro il limite (pattern catastrofico), viene TERMINATO e ricreato,
 * così la UI resta reattiva. Input oltre il tetto viene rifiutato prima di partire.
 */
export function useRegexWorker(
  pattern: string,
  flags: string,
  input: string,
): RegexState {
  const [state, setState] = useState<RegexState>({ status: 'idle' });
  const workerRef = useRef<Worker | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (pattern === '') {
      setState({ status: 'idle' });
      return;
    }
    if (input.length > MAX_INPUT) {
      setState({ status: 'input-too-large', max: MAX_INPUT });
      return;
    }

    const debounce = window.setTimeout(() => {
      if (!workerRef.current) workerRef.current = new RegexWorker();
      const worker = workerRef.current;
      const id = ++idRef.current;
      setState({ status: 'running' });

      const timeout = window.setTimeout(() => {
        // il worker è bloccato: terminalo e ricrealo (recupero anti-ReDoS)
        worker.terminate();
        workerRef.current = null;
        if (id === idRef.current) setState({ status: 'timeout' });
      }, TIMEOUT_MS);

      worker.onmessage = (messageEvent: MessageEvent<RegexResponse>) => {
        const data = messageEvent.data;
        if (data.id !== idRef.current) return;
        window.clearTimeout(timeout);
        if (data.error) {
          setState({ status: 'error', message: data.error });
        } else {
          setState({
            status: 'done',
            matches: data.matches,
            truncated: data.truncated,
          });
        }
      };

      worker.postMessage({ id, pattern, flags, input } satisfies RegexRequest);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(debounce);
  }, [pattern, flags, input]);

  useEffect(
    () => () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    },
    [],
  );

  return state;
}
