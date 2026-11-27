import type { PayloadPack } from './types.ts';

/**
 * Payload pack didattici (Fase 4). Ogni famiglia d'attacco porta payload INERTI e
 * non distruttivi — sonde che mostrano il meccanismo, non exploit "armati": niente
 * DROP/DELETE, niente rm, niente shell reverse. Comandi solo benigni (id/whoami),
 * host di esempio/riservati, lettura di /etc/passwd come classica sonda testuale.
 * Ogni pack è accompagnato dalla sua difesa, dai riferimenti CWE/OWASP e da
 * snippet di remediation copy-paste multi-linguaggio.
 *
 * I payload sono SEMPRE mostrati come testo, mai eseguiti. Non provano una vulnerabilità.
 */

const PACKS: readonly PayloadPack[] = [
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
    remediation: [
      {
        lang: 'node',
        label: 'Node.js (pg)',
        code: "// node-postgres: parametri, mai concatenazione\nawait client.query(\n  'SELECT * FROM users WHERE email = $1',\n  [email],\n);",
      },
      {
        lang: 'node-prisma',
        label: 'Node.js (Prisma)',
        code: '// Prisma: query tipizzata, nessun SQL costruito a mano\nawait prisma.user.findMany({ where: { email } });',
      },
      {
        lang: 'python',
        label: 'Python (psycopg3)',
        code: '# placeholder, parametri separati\ncur.execute(\n    "SELECT * FROM users WHERE email = %s",\n    (email,),\n)',
      },
      {
        lang: 'php',
        label: 'PHP (PDO)',
        code: "// PDO: prepared statement\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$email]);",
      },
      {
        lang: 'go',
        label: 'Go (database/sql)',
        code: '// placeholder, mai fmt.Sprintf nella query\nrows, err := db.Query("SELECT * FROM users WHERE email = ?", email)',
      },
    ],
  },
  {
    id: 'ssti',
    i18nBase: 'pack.ssti',
    defense: { cwe: 'CWE-94', owasp: 'A03:2021' },
    payloads: ['{{7*7}}', '${7*7}', '#{7*7}', '<%= 7*7 %>', "{{7*'7'}}"],
    remediation: [
      {
        lang: 'python',
        label: 'Python (Jinja2)',
        code: '# input come VARIABILE, non come template\ntemplate.render(name=name)\n# mai: Template(user_input) / render_template_string(user_input)',
      },
      {
        lang: 'node',
        label: 'Node.js (template engine)',
        code: "// il template è statico, l'input è dato\nres.render('page', { name });",
      },
    ],
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
    remediation: [
      {
        lang: 'node',
        label: 'Node.js',
        code: "import path from 'node:path';\nconst ROOT = '/srv/files';\nconst full = path.resolve(ROOT, name);\nif (!full.startsWith(ROOT + path.sep)) throw new Error('path');",
      },
      {
        lang: 'python',
        label: 'Python',
        code: 'import os\nROOT = "/srv/files"\nfull = os.path.realpath(os.path.join(ROOT, name))\nif not full.startswith(ROOT + os.sep):\n    raise ValueError("path")',
      },
    ],
  },
  {
    id: 'cmd-injection',
    i18nBase: 'pack.cmd-injection',
    defense: { cwe: 'CWE-78', owasp: 'A03:2021' },
    payloads: ['; id', '| id', '$(id)', '`id`', '&& whoami'],
    remediation: [
      {
        lang: 'node',
        label: 'Node.js',
        code: "import { execFile } from 'node:child_process';\n// binario + argomenti separati, nessuna shell\nexecFile('ping', ['-c', '1', host]);",
      },
      {
        lang: 'python',
        label: 'Python',
        code: 'import subprocess\nsubprocess.run(["ping", "-c", "1", host], shell=False, check=True)',
      },
      {
        lang: 'go',
        label: 'Go',
        code: '// nessuna shell: binario + argomenti\nexec.Command("ping", "-c", "1", host)',
      },
    ],
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
    remediation: [
      {
        lang: 'node',
        label: 'Node.js',
        code: "const u = new URL(url);\nif (u.protocol !== 'https:' || !ALLOWED_HOSTS.has(u.hostname)) {\n  throw new Error('host non consentito');\n}\n// blocca IP privati/link-local e nega i redirect\nawait fetch(u, { redirect: 'error' });",
      },
      {
        lang: 'python',
        label: 'Python',
        code: 'u = urlparse(url)\nif u.scheme != "https" or u.hostname not in ALLOWED_HOSTS:\n    raise ValueError("host non consentito")\nrequests.get(url, allow_redirects=False, timeout=5)',
      },
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
    remediation: [
      {
        lang: 'node',
        label: 'Node.js',
        code: "// solo destinazioni relative e sicure (no // e no \\\\)\nconst safe =\n  next.startsWith('/') && !next.startsWith('//') && !next.includes('\\\\')\n    ? next\n    : '/';\nres.redirect(safe);",
      },
    ],
  },
];

export const PAYLOAD_PACKS = PACKS;

export const PACK_BY_ID: ReadonlyMap<string, PayloadPack> = new Map(
  PAYLOAD_PACKS.map((pack) => [pack.id, pack]),
);
