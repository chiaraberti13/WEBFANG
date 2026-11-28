/**
 * Esecuzione di una regex sull'input, pura e testabile. Gira dentro un Web Worker
 * (vedi workers/regex.worker.ts) perché un pattern "catastrofico" (ReDoS) blocca
 * il thread in modo sincrono: solo terminando il worker dall'esterno si recupera.
 * Qui si impone un tetto ai match; input e timeout sono gestiti dal chiamante.
 */
export interface RegexMatch {
  index: number;
  match: string;
  groups: string[];
}

export interface RegexRunResult {
  matches: RegexMatch[];
  truncated: boolean;
}

export const DEFAULT_MAX_MATCHES = 1000;

export function runRegex(
  pattern: string,
  flags: string,
  input: string,
  maxMatches = DEFAULT_MAX_MATCHES,
): RegexRunResult {
  // matchAll richiede il flag globale; lo aggiungiamo se assente.
  const normalized = flags.includes('g') ? flags : `${flags}g`;
  const re = new RegExp(pattern, normalized); // può lanciare SyntaxError
  const matches: RegexMatch[] = [];
  let truncated = false;

  for (const m of input.matchAll(re)) {
    if (matches.length >= maxMatches) {
      truncated = true;
      break;
    }
    matches.push({
      index: m.index ?? 0,
      match: m[0],
      groups: Array.from(m)
        .slice(1)
        .map((group) => group ?? ''),
    });
  }

  return { matches, truncated };
}
