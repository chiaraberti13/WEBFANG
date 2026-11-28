import DOMPurify from 'dompurify';
import { htmlEncode } from './html-entities.ts';

/**
 * Defense Playground: passa un payload attraverso una difesa (DOMPurify o escape)
 * e indica se "sopravvive" un vettore eseguibile. L'output è SEMPRE testo: non
 * viene mai inserito nel DOM, così la verifica non può eseguire nulla.
 */
export type SanitizeMode =
  'none' | 'purify-default' | 'purify-strict' | 'escape';

// Vettori davvero eseguibili: tag script, handler on*, schema javascript:,
// iframe e srcdoc. Un <svg> o <b> ripuliti dagli handler non sono "sopravvissuti".
const EXECUTABLE =
  /<script\b|<\/script|on\w+\s*=|javascript:|srcdoc\s*=|<iframe\b/i;

export interface SanitizeResult {
  output: string;
  /** true se dopo la difesa resta un vettore eseguibile. */
  survives: boolean;
}

export function sanitize(input: string, mode: SanitizeMode): SanitizeResult {
  let output: string;
  if (mode === 'none') {
    output = input;
  } else if (mode === 'escape') {
    output = htmlEncode(input);
  } else if (mode === 'purify-strict') {
    output = DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span'],
      ALLOWED_ATTR: ['href'],
    });
  } else {
    output = DOMPurify.sanitize(input);
  }
  return { output, survives: EXECUTABLE.test(output) };
}
