import type { DefenseSubject } from './types.ts';

/**
 * Contesti XSS didattici (flusso 3 della roadmap). Per ogni contesto di riflessione
 * dell'input si mostrano payload INERTI (sempre `alert(document.domain)`: nessuna
 * esfiltrazione, nessun C2) con i prerequisiti e la difesa contestuale.
 *
 * I payload sono mostrati SEMPRE come testo, mai eseguiti o inseriti come HTML.
 * Un payload generato non prova una vulnerabilità.
 */
export interface XssContext extends DefenseSubject {
  payloads: string[];
}

export const XSS_CONTEXTS: readonly XssContext[] = [
  {
    id: 'html-body',
    i18nBase: 'xss.html-body',
    defense: { cwe: 'CWE-79', owasp: 'A03:2021' },
    payloads: [
      '<script>alert(document.domain)</script>',
      '<img src=x onerror=alert(document.domain)>',
    ],
  },
  {
    id: 'attribute',
    i18nBase: 'xss.attribute',
    defense: { cwe: 'CWE-79', owasp: 'A03:2021' },
    payloads: [
      '"><script>alert(document.domain)</script>',
      '" onmouseover="alert(document.domain)',
    ],
  },
  {
    id: 'js-string',
    i18nBase: 'xss.js-string',
    defense: { cwe: 'CWE-79', owasp: 'A03:2021' },
    payloads: ["';alert(document.domain)//", "\\';alert(document.domain)//"],
  },
  {
    id: 'url',
    i18nBase: 'xss.url',
    defense: { cwe: 'CWE-79', owasp: 'A03:2021' },
    payloads: ['javascript:alert(document.domain)'],
  },
  {
    id: 'svg',
    i18nBase: 'xss.svg',
    defense: { cwe: 'CWE-79', owasp: 'A03:2021' },
    payloads: ['<svg onload=alert(document.domain)>'],
  },
];

export const XSS_BY_ID: ReadonlyMap<string, XssContext> = new Map(
  XSS_CONTEXTS.map((context) => [context.id, context]),
);
