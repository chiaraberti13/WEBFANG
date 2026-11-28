/// <reference lib="webworker" />
import { runRegex, type RegexMatch } from '../lib/regex.ts';

/**
 * Esegue la regex in un worker: un pattern catastrofico (ReDoS) blocca questo
 * thread, non la UI, e il thread principale può terminarlo (vedi useRegexWorker).
 */
export interface RegexRequest {
  id: number;
  pattern: string;
  flags: string;
  input: string;
}

export interface RegexResponse {
  id: number;
  matches: RegexMatch[];
  truncated: boolean;
  error: string | null;
}

self.onmessage = (event: MessageEvent<RegexRequest>) => {
  const { id, pattern, flags, input } = event.data;
  const reply = (response: RegexResponse) =>
    (self as DedicatedWorkerGlobalScope).postMessage(response);
  try {
    const { matches, truncated } = runRegex(pattern, flags, input);
    reply({ id, matches, truncated, error: null });
  } catch (error) {
    reply({
      id,
      matches: [],
      truncated: false,
      error: error instanceof Error ? error.message : 'invalid pattern',
    });
  }
};
