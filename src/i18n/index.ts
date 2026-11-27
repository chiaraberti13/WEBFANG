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

  // --- flusso "componi" (ricetta) ---
  'tab.transform': 'Trasforma',
  'tab.compose': 'Componi',
  'recipe.empty': 'Aggiungi un passaggio per comporre una trasformazione.',
  'recipe.addStep': 'Aggiungi passaggio',
  'recipe.step': 'Passaggio {n}',
  'recipe.remove': 'Rimuovi passaggio',
  'recipe.moveUp': 'Sposta su',
  'recipe.moveDown': 'Sposta giù',
  'recipe.undo': 'Annulla',
  'recipe.redo': 'Ripeti',
  'recipe.result': 'Risultato',
  'recipe.finalOutput': 'Output finale',
  'recipe.share': 'Copia link',
  'recipe.linkCopied': 'Link copiato',
  'recipe.shareTooLong':
    'Ricetta troppo lunga per un link condivisibile: usa Esporta JSON.',
  'recipe.export': 'Esporta JSON',
  'recipe.import': 'Importa JSON',
  'recipe.importPlaceholder': 'Incolla qui il JSON della ricetta…',
  'recipe.load': 'Carica',
  'recipe.loadedFromUrl': 'Ricetta caricata dal link condiviso.',
  'recipe.err.corrupt': 'Link o JSON corrotto.',
  'recipe.err.invalid': 'Ricetta non valida.',
  'recipe.err.unknown-op':
    'La ricetta usa un’operazione sconosciuta: rifiutata.',

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

  'op.param.double': 'Doppia codifica (due passaggi)',
  'op.param.spaced': 'Byte separati da spazio',

  'op.url-encode.label': 'URL-encode',
  'op.url-encode.description':
    'Percent-encoding del testo (UTF-8); opzione doppia codifica.',
  'op.url-decode.label': 'URL-decode',
  'op.url-decode.description':
    'Interpreta il percent-encoding; opzione doppia decodifica.',
  'op.html-encode.label': 'HTML entities — codifica',
  'op.html-encode.description':
    'Escaping dei caratteri significativi in HTML (& < > " \').',
  'op.html-decode.label': 'HTML entities — decodifica',
  'op.html-decode.description': 'Risolve entità nominate e numeriche.',
  'op.hex-encode.label': 'Hex — codifica',
  'op.hex-encode.description':
    'Rappresenta i byte in esadecimale; opzione byte spaziati.',
  'op.hex-decode.label': 'Hex — decodifica',
  'op.hex-decode.description':
    'Converte esadecimale in byte; tollera spazi, richiede lunghezza pari.',
  'op.sha-256.label': 'SHA-256',
  'op.sha-256.description': 'Digest SHA-256 dei byte dell’input (hex).',

  'defense.url-encode.what':
    'Sostituisce i caratteri non sicuri in URL con %XX (UTF-8). La doppia codifica applica due passaggi.',
  'defense.url-encode.where':
    'Query string, path, parametri; la doppia codifica serve a capire i bypass quando reverse proxy e backend decodificano un numero diverso di volte.',
  'defense.url-encode.notProve':
    'Codificare non sanifica: un valore %XX è lo stesso dato, solo rappresentato diversamente.',
  'defense.url-encode.defense':
    'Decodifica una sola volta, in un punto definito, poi valida in forma canonica. Normalizza prima dei controlli di sicurezza per evitare bypass da doppio decode.',

  'defense.url-decode.what':
    'Converte %XX nei caratteri originali. La doppia decodifica applica due passaggi.',
  'defense.url-decode.where':
    'Ispezione di parametri, redirect e payload offuscati nelle URL.',
  'defense.url-decode.notProve':
    'Il valore decodificato resta input non attendibile.',
  'defense.url-decode.defense':
    'Canonicalizza e valida dopo UNA decodifica controllata; rifiuta input che richiedono decodifiche multiple inattese.',

  'defense.html-encode.what':
    'Trasforma & < > " \' nelle rispettive entità, neutralizzando la sintassi HTML.',
  'defense.html-encode.where':
    'Output encoding nel contesto HTML body/attributo: difesa primaria contro XSS riflesso e stored.',
  'defense.html-encode.notProve':
    'Non basta in ogni contesto: JS, URL e CSS richiedono encoding diversi; la CSP è una difesa aggiuntiva, non sostitutiva.',
  'defense.html-encode.defense':
    'Applica l’encoding contestuale nel punto di output (React, Blade/Twig, Go template); non costruire HTML per concatenazione di stringhe.',

  'defense.html-decode.what':
    'Converte entità (&amp;, &#39;, &#x41;) nei caratteri originali.',
  'defense.html-decode.where':
    'Capire payload codificati o confrontare il testo di un link con la sua destinazione.',
  'defense.html-decode.notProve':
    'Decodificare non implica che l’HTML sia sicuro da renderizzare.',
  'defense.html-decode.defense':
    'Non inserire mai HTML non fidato nel DOM; se serve, sanifica con DOMPurify e mostra come testo (textContent).',

  'defense.hex-encode.what':
    'Converte ogni byte in due cifre esadecimali. È una rappresentazione, non cifratura.',
  'defense.hex-encode.where':
    'Dump binari, confronto byte a byte, ispezione di hash e chiavi.',
  'defense.hex-encode.notProve':
    'Hex è reversibile: non offre alcuna riservatezza.',
  'defense.hex-encode.defense':
    'Non usare hex come protezione. Per i segreti usa cifratura e confronti a tempo costante.',

  'defense.hex-decode.what':
    'Interpreta coppie di cifre esadecimali come byte.',
  'defense.hex-decode.where':
    'Ricostruire dati binari da dump, payload o firme.',
  'defense.hex-decode.notProve':
    'I byte ottenuti restano input non attendibile.',
  'defense.hex-decode.defense':
    'Valida lunghezza e alfabeto; imponi limiti di dimensione prima di elaborare i byte.',

  'defense.sha-256.what':
    'Calcola un digest a 256 bit, deterministico e a senso unico, dei byte dell’input.',
  'defense.sha-256.where':
    'Integrità (confronto di digest), deduplica, fingerprint; non serve a cifrare.',
  'defense.sha-256.notProve':
    'Hashing non è cifratura né, da solo, sicurezza delle password: input uguali danno hash uguali.',
  'defense.sha-256.defense':
    'Per le password usa un KDF lento con sale (argon2/bcrypt/scrypt), non SHA grezzo. Confronta i digest a tempo costante.',

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

  'tab.transform': 'Transform',
  'tab.compose': 'Compose',
  'recipe.empty': 'Add a step to compose a transformation.',
  'recipe.addStep': 'Add step',
  'recipe.step': 'Step {n}',
  'recipe.remove': 'Remove step',
  'recipe.moveUp': 'Move up',
  'recipe.moveDown': 'Move down',
  'recipe.undo': 'Undo',
  'recipe.redo': 'Redo',
  'recipe.result': 'Result',
  'recipe.finalOutput': 'Final output',
  'recipe.share': 'Copy link',
  'recipe.linkCopied': 'Link copied',
  'recipe.shareTooLong':
    'Recipe too long for a shareable link: use Export JSON.',
  'recipe.export': 'Export JSON',
  'recipe.import': 'Import JSON',
  'recipe.importPlaceholder': 'Paste the recipe JSON here…',
  'recipe.load': 'Load',
  'recipe.loadedFromUrl': 'Recipe loaded from the shared link.',
  'recipe.err.corrupt': 'Corrupt link or JSON.',
  'recipe.err.invalid': 'Invalid recipe.',
  'recipe.err.unknown-op': 'The recipe uses an unknown operation: rejected.',

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

  'op.param.double': 'Double encoding (two passes)',
  'op.param.spaced': 'Bytes separated by spaces',

  'op.url-encode.label': 'URL-encode',
  'op.url-encode.description':
    'Percent-encodes text (UTF-8); optional double encoding.',
  'op.url-decode.label': 'URL-decode',
  'op.url-decode.description':
    'Reads percent-encoding; optional double decoding.',
  'op.html-encode.label': 'HTML entities — encode',
  'op.html-encode.description':
    'Escapes the characters that are significant in HTML (& < > " \').',
  'op.html-decode.label': 'HTML entities — decode',
  'op.html-decode.description': 'Resolves named and numeric entities.',
  'op.hex-encode.label': 'Hex — encode',
  'op.hex-encode.description':
    'Represents bytes in hexadecimal; optional spaced bytes.',
  'op.hex-decode.label': 'Hex — decode',
  'op.hex-decode.description':
    'Converts hexadecimal to bytes; tolerates spaces, requires even length.',
  'op.sha-256.label': 'SHA-256',
  'op.sha-256.description': 'SHA-256 digest of the input bytes (hex).',

  'defense.url-encode.what':
    'Replaces URL-unsafe characters with %XX (UTF-8). Double encoding applies two passes.',
  'defense.url-encode.where':
    'Query strings, paths, parameters; double encoding helps understand bypasses when a reverse proxy and the backend decode a different number of times.',
  'defense.url-encode.notProve':
    'Encoding does not sanitize: a %XX value is the same data, only represented differently.',
  'defense.url-encode.defense':
    'Decode exactly once, at a defined point, then validate the canonical form. Normalize before security checks to avoid double-decode bypasses.',

  'defense.url-decode.what':
    'Converts %XX back to the original characters. Double decoding applies two passes.',
  'defense.url-decode.where':
    'Inspecting parameters, redirects and obfuscated payloads in URLs.',
  'defense.url-decode.notProve': 'The decoded value is still untrusted input.',
  'defense.url-decode.defense':
    'Canonicalize and validate after ONE controlled decode; reject input that needs unexpected multiple decodes.',

  'defense.html-encode.what':
    'Turns & < > " \' into their entities, neutralizing HTML syntax.',
  'defense.html-encode.where':
    'Output encoding in the HTML body/attribute context: the primary defense against reflected and stored XSS.',
  'defense.html-encode.notProve':
    'It is not enough in every context: JS, URL and CSS need different encodings; CSP is an additional defense, not a substitute.',
  'defense.html-encode.defense':
    'Apply contextual encoding at the output point (React, Blade/Twig, Go templates); never build HTML by string concatenation.',

  'defense.html-decode.what':
    'Converts entities (&amp;, &#39;, &#x41;) back to the original characters.',
  'defense.html-decode.where':
    'Understanding encoded payloads or comparing a link’s text with its destination.',
  'defense.html-decode.notProve':
    'Decoding does not imply the HTML is safe to render.',
  'defense.html-decode.defense':
    'Never insert untrusted HTML into the DOM; if required, sanitize with DOMPurify and show it as text (textContent).',

  'defense.hex-encode.what':
    'Converts each byte into two hexadecimal digits. A representation, not encryption.',
  'defense.hex-encode.where':
    'Binary dumps, byte-by-byte comparison, inspecting hashes and keys.',
  'defense.hex-encode.notProve':
    'Hex is reversible: it provides no confidentiality.',
  'defense.hex-encode.defense':
    'Never use hex as protection. For secrets, use encryption and constant-time comparison.',

  'defense.hex-decode.what': 'Reads pairs of hexadecimal digits as bytes.',
  'defense.hex-decode.where':
    'Rebuilding binary data from dumps, payloads or signatures.',
  'defense.hex-decode.notProve':
    'The resulting bytes are still untrusted input.',
  'defense.hex-decode.defense':
    'Validate length and alphabet; enforce size limits before processing the bytes.',

  'defense.sha-256.what':
    'Computes a deterministic, one-way 256-bit digest of the input bytes.',
  'defense.sha-256.where':
    'Integrity (digest comparison), deduplication, fingerprinting; not for encryption.',
  'defense.sha-256.notProve':
    'Hashing is not encryption, nor on its own password security: equal inputs give equal hashes.',
  'defense.sha-256.defense':
    'For passwords use a slow, salted KDF (argon2/bcrypt/scrypt), not raw SHA. Compare digests in constant time.',

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
