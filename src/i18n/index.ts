/**
 * i18n IT/EN. Catalogo a chiavi piatte e puntate (es. `op.base64-encode.label`).
 * `translate` risolve la chiave e interpola i parametri `{nome}` — usato anche per
 * rendere gli errori strutturati ({ code, params }) in testo leggibile.
 */
export type Lang = 'it' | 'en';

export type TranslateParams = Record<string, string | number>;

type Catalog = Record<string, string>;

const it: Catalog = {
  // --- chrome ---
  'app.tagline': 'Offensive Web Toolkit — contesto → trasformazione → difesa',
  'app.inputLabel': 'Input',
  'app.inputPlaceholder': 'Incolla o scrivi qui il testo da trasformare…',
  'app.outputLabel': 'Output',
  'app.operationLabel': 'Operazione',
  'app.copy': 'Copia output',
  'app.copied': 'Copiato',
  'app.clear': 'Pulisci',
  'app.emptyInput': 'Inserisci un input per vedere il risultato.',
  'app.bytes': '{n} byte',
  'app.chars': '{n} caratteri',
  'app.binaryNote': 'output binario, mostrato in esadecimale',
  'lang.switch': 'Lingua',
  'theme.toggle': 'Cambia tema',
  'app.builtBy': 'Costruito da Chiara Berti',
  'app.footerDisclaimer':
    'Payload inerti, per test autorizzati, CTF e studio. L’uso non autorizzato è illegale e a responsabilità dell’utente.',

  // --- categorie ---
  'cat.encode': 'Codifica / decodifica',
  'cat.hash': 'Hashing',
  'cat.analyze': 'Analisi',
  'cat.generate': 'Generazione',

  // --- pannello Difesa (le 4 domande sempre presenti) ---
  'defense.title': 'Contesto e difesa',
  'defense.what': 'Cosa fa',
  'defense.where': 'Dove è pertinente',
  'defense.notProve': 'Cosa non dimostra',
  'defense.defense': 'Come difendersi',
  'defense.refs': 'Riferimenti',
  'defense.disclaimer':
    'Un esempio generato è inerte e didattico: non prova una vulnerabilità.',

  // --- operazioni ---
  'op.base64-encode.label': 'Base64 — codifica',
  'op.base64-encode.description':
    'Converte i byte dell’input in testo Base64 (standard o URL-safe).',
  'op.base64-decode.label': 'Base64 — decodifica',
  'op.base64-decode.description':
    'Interpreta una stringa Base64 e restituisce i byte originali.',
  'op.param.urlSafe': 'Variante URL-safe (−_ al posto di +/)',

  // --- contenuti difesa per operazione ---
  'defense.base64-encode.what':
    'Rappresenta byte qualunque come testo ASCII. È una codifica reversibile, non una cifratura.',
  'defense.base64-encode.where':
    'Data URL, JWT, allegati email, parametri che devono viaggiare come testo; offuscamento di payload per capire come un filtro li interpreta.',
  'defense.base64-encode.notProve':
    'Vedere dati in Base64 non implica riservatezza o sicurezza: chiunque può decodificarli.',
  'defense.base64-encode.defense':
    'Non usare Base64 per proteggere segreti. Se serve riservatezza, cifra (es. AES-GCM) e gestisci le chiavi. Fai l’output encoding nel contesto giusto, non il Base64, per prevenire injection.',

  'defense.base64-decode.what':
    'Decodifica Base64/Base64URL in byte. Gli input non validi producono un errore esplicito, mai un risultato silenzioso.',
  'defense.base64-decode.where':
    'Ispezione di token, cookie, payload codificati; primo passo per capire dati offuscati.',
  'defense.base64-decode.notProve':
    'Decodificare un valore non lo rende fidato: resta input non attendibile.',
  'defense.base64-decode.defense':
    'Valida e canonicalizza SEMPRE i dati decodificati prima di usarli (doppia codifica = bypass dei filtri). Applica allowlist e limiti di dimensione.',

  // --- errori strutturati ---
  'err.DECODE_FAILED': 'Decodifica fallita: input non valido.',
  'err.ENCODE_FAILED': 'Codifica fallita.',
  'err.INPUT_TOO_LARGE': 'Input troppo grande ({bytes} byte, max {max}).',
  'err.OUTPUT_TOO_LARGE': 'Output troppo grande ({bytes} byte, max {max}).',
  'err.TIMEOUT': 'Operazione interrotta per timeout.',
  'err.ABORTED': 'Operazione annullata.',
  'err.INVALID_PARAMS': 'Parametri non validi: {issue}.',
  'err.UNSUPPORTED_INPUT_KIND':
    'Tipo di input non supportato (atteso {expected}, ricevuto {got}).',
  'err.UNKNOWN_OPERATION': 'Operazione sconosciuta.',
  'err.INVALID_INPUT': 'Input non valido.',
  'err.unknown': 'Si è verificato un errore imprevisto.',
};

const en: Catalog = {
  'app.tagline': 'Offensive Web Toolkit — context → transformation → defense',
  'app.inputLabel': 'Input',
  'app.inputPlaceholder': 'Paste or type the text to transform…',
  'app.outputLabel': 'Output',
  'app.operationLabel': 'Operation',
  'app.copy': 'Copy output',
  'app.copied': 'Copied',
  'app.clear': 'Clear',
  'app.emptyInput': 'Enter some input to see the result.',
  'app.bytes': '{n} bytes',
  'app.chars': '{n} characters',
  'app.binaryNote': 'binary output, shown in hexadecimal',
  'lang.switch': 'Language',
  'theme.toggle': 'Toggle theme',
  'app.builtBy': 'Built by Chiara Berti',
  'app.footerDisclaimer':
    'Inert payloads, for authorized testing, CTF and study. Unauthorized use is illegal and the user’s responsibility.',

  'cat.encode': 'Encode / decode',
  'cat.hash': 'Hashing',
  'cat.analyze': 'Analysis',
  'cat.generate': 'Generation',

  'defense.title': 'Context and defense',
  'defense.what': 'What it does',
  'defense.where': 'Where it is relevant',
  'defense.notProve': 'What it does not prove',
  'defense.defense': 'How to defend',
  'defense.refs': 'References',
  'defense.disclaimer':
    'A generated example is inert and didactic: it does not prove a vulnerability.',

  'op.base64-encode.label': 'Base64 — encode',
  'op.base64-encode.description':
    'Turns the input bytes into Base64 text (standard or URL-safe).',
  'op.base64-decode.label': 'Base64 — decode',
  'op.base64-decode.description':
    'Reads a Base64 string and returns the original bytes.',
  'op.param.urlSafe': 'URL-safe variant (−_ instead of +/)',

  'defense.base64-encode.what':
    'Represents arbitrary bytes as ASCII text. It is a reversible encoding, not encryption.',
  'defense.base64-encode.where':
    'Data URLs, JWTs, email attachments, parameters that must travel as text; obfuscating payloads to see how a filter interprets them.',
  'defense.base64-encode.notProve':
    'Seeing Base64 data implies no confidentiality or security: anyone can decode it.',
  'defense.base64-encode.defense':
    'Never use Base64 to protect secrets. For confidentiality, encrypt (e.g. AES-GCM) and manage keys. Prevent injection with contextual output encoding, not Base64.',

  'defense.base64-decode.what':
    'Decodes Base64/Base64URL into bytes. Invalid input raises an explicit error, never a silent result.',
  'defense.base64-decode.where':
    'Inspecting tokens, cookies, encoded payloads; the first step to understand obfuscated data.',
  'defense.base64-decode.notProve':
    'Decoding a value does not make it trusted: it is still untrusted input.',
  'defense.base64-decode.defense':
    'ALWAYS validate and canonicalize decoded data before use (double-encoding = filter bypass). Apply allowlists and size limits.',

  'err.DECODE_FAILED': 'Decoding failed: invalid input.',
  'err.ENCODE_FAILED': 'Encoding failed.',
  'err.INPUT_TOO_LARGE': 'Input too large ({bytes} bytes, max {max}).',
  'err.OUTPUT_TOO_LARGE': 'Output too large ({bytes} bytes, max {max}).',
  'err.TIMEOUT': 'Operation stopped on timeout.',
  'err.ABORTED': 'Operation cancelled.',
  'err.INVALID_PARAMS': 'Invalid parameters: {issue}.',
  'err.UNSUPPORTED_INPUT_KIND':
    'Unsupported input kind (expected {expected}, got {got}).',
  'err.UNKNOWN_OPERATION': 'Unknown operation.',
  'err.INVALID_INPUT': 'Invalid input.',
  'err.unknown': 'An unexpected error occurred.',
};

const catalogs: Record<Lang, Catalog> = { it, en };

/** Chiavi di ogni catalogo (utile ai test di parità IT/EN). */
export function catalogKeys(lang: Lang): string[] {
  return Object.keys(catalogs[lang]);
}

/** Risolve una chiave e interpola i parametri `{nome}`. */
export function translate(
  lang: Lang,
  key: string,
  params?: TranslateParams,
): string {
  const template = catalogs[lang][key] ?? key;
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}
