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

  // --- flusso "contesto XSS" ---
  'tab.context': 'Contesto XSS',
  'xss.title': 'Capire un contesto XSS',
  'xss.intro':
    'Scegli dove viene riflesso il tuo input: WebFang mostra payload inerti pertinenti, i prerequisiti e la difesa contestuale.',
  'xss.pickContext': 'Contesto di riflessione',
  'xss.payloads': 'Payload didattici (inerti)',
  'xss.prereqLabel': 'Prerequisiti',
  'xss.copy': 'Copia',

  // --- modalità, wizard, onboarding, guide ---
  'mode.label': 'Modalità',
  'mode.guided': 'Guidata',
  'mode.expert': 'Esperto',
  'help.open': 'Aiuto',
  'wizard.open': 'Non so cosa mi serve',
  'wizard.title': 'Non so cosa mi serve',
  'wizard.q1': 'Dove viene riflesso il tuo input?',
  'wizard.hint':
    'Scegli il contesto: ti porto agli esempi inerti e alla difesa giusta.',
  'wizard.close': 'Chiudi',
  'onboarding.title.1': 'Benvenuta in WebFang',
  'onboarding.body.1':
    'Trasforma una stringa e, per ogni passaggio, vedi cosa fa, dove è pertinente, cosa non dimostra e come ci si difende.',
  'onboarding.title.2': 'Componi e condividi',
  'onboarding.body.2':
    'Concatena più operazioni in una ricetta, con risultati intermedi e undo/redo. Condividi via link: solo operazioni e parametri, mai input o segreti.',
  'onboarding.title.3': 'Privacy e sicurezza',
  'onboarding.body.3':
    'Tutto gira nel browser: input e chiavi non lasciano il dispositivo. I payload sono inerti e didattici: non provano una vulnerabilità.',
  'onboarding.step': '{n} / {total}',
  'onboarding.next': 'Avanti',
  'onboarding.back': 'Indietro',
  'onboarding.done': 'Inizia',
  'onboarding.skip': 'Salta',
  'guide.transform':
    'Scegli un’operazione e guarda output e difesa cambiare in tempo reale.',
  'guide.compose':
    'Aggiungi passaggi per concatenare le trasformazioni; ognuno mostra il suo risultato.',
  'guide.context': 'Non sai da dove partire? Usa “Non so cosa mi serve”.',
  'guide.payloads':
    'Scegli una famiglia d’attacco: payload inerti a sinistra, difesa sotto.',

  'xss.html-body.label': 'HTML body',
  'xss.html-body.description':
    'L’input finisce tra i tag, nel corpo della pagina.',
  'xss.html-body.prereq':
    'Output non codificato come HTML e nessuna CSP che blocchi gli script inline.',
  'defense.xss.html-body.what':
    'Il browser interpreta l’input come markup: un <script> o un gestore di eventi viene eseguito.',
  'defense.xss.html-body.where':
    'Valori riflessi nel corpo HTML senza escaping (commenti, messaggi, ricerche).',
  'defense.xss.html-body.notProve':
    'Il payload è inerte (alert del dominio): dimostra il contesto, non un impatto reale.',
  'defense.xss.html-body.defense':
    'Encoding contestuale HTML nel punto di output (React/Blade/Twig/Go). La CSP è difesa aggiuntiva, non sostitutiva dell’encoding.',

  'xss.attribute.label': 'Attributo HTML',
  'xss.attribute.description':
    'L’input finisce nel valore di un attributo (es. value="…").',
  'xss.attribute.prereq':
    'Attributo senza virgolette, o input che può chiuderle.',
  'defense.xss.attribute.what':
    'Uscendo dal valore (con " o >) si inietta un nuovo attributo/handler o un tag.',
  'defense.xss.attribute.where':
    'Valori in attributi costruiti da input: value, title, alt, href.',
  'defense.xss.attribute.notProve':
    'Inerte: mostra come si rompe il contesto, non un exploit.',
  'defense.xss.attribute.defense':
    'Quota sempre gli attributi e applica l’attribute-encoding; non costruire attributi per concatenazione.',

  'xss.js-string.label': 'Stringa JavaScript',
  'xss.js-string.description':
    'L’input finisce dentro una stringa in uno <script> inline.',
  'xss.js-string.prereq':
    'Input inserito in JS senza escaping, con possibilità di chiudere la stringa.',
  'defense.xss.js-string.what':
    'Chiudendo la stringa (con \' o ") e aggiungendo ; si esegue codice JS arbitrario.',
  'defense.xss.js-string.where':
    'Template che interpolano input dentro JavaScript inline.',
  'defense.xss.js-string.notProve':
    'Inerte: evidenzia il contesto JS, non un impatto.',
  'defense.xss.js-string.defense':
    'Non costruire JS da input: passa i dati via JSON.stringify o data-attribute e leggili dal DOM; CSP senza unsafe-inline.',

  'xss.url.label': 'URL / href',
  'xss.url.description': 'L’input diventa un URL (es. href, src).',
  'xss.url.prereq': 'Schema dell’URL non validato (accetta javascript:).',
  'defense.xss.url.what':
    'Uno schema javascript: nell’href esegue codice al click.',
  'defense.xss.url.where': 'Link e redirect costruiti da input.',
  'defense.xss.url.notProve':
    'Inerte: mostra lo schema pericoloso, non un attacco.',
  'defense.xss.url.defense':
    'Allowlist degli schemi (http/https/mailto); rifiuta javascript:/data: dove non servono; valida e normalizza l’URL.',

  'xss.svg.label': 'SVG',
  'xss.svg.description':
    'L’input finisce in un contesto SVG (inline o caricato).',
  'xss.svg.prereq':
    'SVG reso inline o non sanificato, con handler di eventi ammessi.',
  'defense.xss.svg.what':
    'Gli elementi SVG eseguono JS via handler (onload) anche senza <script>.',
  'defense.xss.svg.where':
    'Upload/anteprima di SVG, icone o grafici costruiti da input.',
  'defense.xss.svg.notProve':
    'Inerte: dimostra il vettore SVG, non un impatto.',
  'defense.xss.svg.defense':
    'Sanifica l’SVG con DOMPurify (profilo SVG) rimuovendo gli handler; servilo come immagine, non inline nel DOM.',

  // --- payload pack ---
  'tab.payloads': 'Payload',
  'payloads.title': 'Payload pack',
  'payloads.intro':
    'Famiglie d’attacco con payload inerti e la relativa difesa. Gli esempi sono didattici: non provano una vulnerabilità.',
  'payloads.pick': 'Famiglia',
  'payloads.list': 'Payload inerti',
  'payloads.copy': 'Copia',

  // --- Defense Playground ---
  'tab.playground': 'Playground',
  'playground.title': 'Defense Playground',
  'playground.intro':
    'Incolla un payload e passalo per una difesa: vedi se un vettore eseguibile sopravvive. L’output è solo testo, non viene mai eseguito.',
  'playground.inputLabel': 'Payload',
  'playground.mode': 'Difesa',
  'playground.mode.none': 'Nessuna difesa',
  'playground.mode.purify-default': 'DOMPurify (default)',
  'playground.mode.purify-strict': 'DOMPurify (restrittivo)',
  'playground.mode.escape': 'HTML escape',
  'playground.output': 'Output sanificato',
  'playground.survives': 'Vettore eseguibile sopravvissuto',
  'playground.neutralized': 'Neutralizzato: nessun vettore eseguibile',
  'playground.note':
    'Un esito “neutralizzato” qui non è una garanzia universale: dipende dalla configurazione e dal contesto di rendering.',
  'guide.playground': 'Prova una difesa su un payload e osserva cosa resta.',

  // --- Regex tester ---
  'tab.regex': 'Regex',
  'regex.intro':
    'Testa un’espressione regolare in un worker isolato: un pattern catastrofico non blocca l’interfaccia.',
  'regex.pattern': 'Pattern',
  'regex.flags': 'Flag',
  'regex.flag.g': 'g (globale)',
  'regex.flag.i': 'i (maiuscole/minuscole)',
  'regex.flag.m': 'm (multilinea)',
  'regex.flag.s': 's (dotall)',
  'regex.testString': 'Stringa di test',
  'regex.results': 'Risultati',
  'regex.matches': '{n} match',
  'regex.noMatch': 'Nessun match.',
  'regex.timeout':
    'Timeout: pattern troppo costoso (possibile ReDoS). Il worker è stato terminato per proteggere l’interfaccia.',
  'regex.invalid': 'Pattern non valido',
  'regex.tooLarge': 'Input oltre il limite di {max} caratteri.',
  'defense.regex.what':
    'Confronta un pattern con un testo e restituisce i match e i gruppi catturati.',
  'defense.regex.where':
    'Validazione input, parsing, routing, filtri — ovunque si usino regex su dati non fidati.',
  'defense.regex.notProve':
    'Un match non valida la sicurezza: pattern con backtracking annidato possono esplodere (ReDoS) su input costruiti.',
  'defense.regex.defense':
    'Evita quantificatori annidati/ambigui; usa àncore e classi specifiche; imponi limiti di lunghezza e timeout; valuta engine lineari (RE2) lato server.',
  'guide.regex':
    'Scrivi un pattern e una stringa: i match compaiono sotto, al sicuro in un worker.',

  'pack.sqli.label': 'SQL injection',
  'pack.sqli.description': 'Input che altera una query SQL.',
  'defense.pack.sqli.what':
    'Rompe la sintassi della query (virgolette, OR, UNION, commenti) per alterarne la logica.',
  'defense.pack.sqli.where':
    'Query costruite concatenando input: login, ricerche, filtri, ordinamenti.',
  'defense.pack.sqli.notProve':
    'Le sonde (OR 1=1, UNION NULL) mostrano l’iniezione, non estraggono dati: sono inerti.',
  'defense.pack.sqli.defense':
    'Usa sempre query parametrizzate/prepared statement; allowlist per gli identificatori (colonne/ORDER BY); privilegi minimi del DB. Mai concatenare input.',

  'pack.ssti.label': 'SSTI (template)',
  'pack.ssti.description':
    'Input valutato da un motore di template server-side.',
  'defense.pack.ssti.what':
    'L’input viene valutato dal motore di template: {{7*7}} diventa 49.',
  'defense.pack.ssti.where':
    'Template che interpolano input non fidato (Jinja2, Twig, Freemarker, ERB).',
  'defense.pack.ssti.notProve':
    'Le sonde calcolano solo 7*7: dimostrano la valutazione, non l’esecuzione di codice.',
  'defense.pack.ssti.defense':
    'Non passare input come template; usa template statici con contesto dati. Sandbox del motore e logica fuori dai template.',

  'pack.lfi.label': 'LFI / Path traversal',
  'pack.lfi.description':
    'Input che risale il filesystem per includere o leggere file.',
  'defense.pack.lfi.what':
    'Sequenze ../ (anche codificate) risalgono le cartelle per raggiungere file fuori dalla radice.',
  'defense.pack.lfi.where':
    'Parametri che indicano file o path: include, download, template, lingua.',
  'defense.pack.lfi.notProve':
    'Il path di /etc/passwd è la sonda classica: qui è solo una stringa, non un accesso reale.',
  'defense.pack.lfi.defense':
    'Allowlist di file/ID; risolvi il path canonico e verifica che resti nella radice consentita; niente path da input.',

  'pack.cmd-injection.label': 'Command injection',
  'pack.cmd-injection.description': 'Input che inietta comandi nella shell.',
  'defense.pack.cmd-injection.what':
    'Metacaratteri di shell (; | $() ` &&) aggiungono comandi a quello previsto.',
  'defense.pack.cmd-injection.where':
    'Chiamate a comandi di sistema costruite con input: ping, conversioni, archivi.',
  'defense.pack.cmd-injection.notProve':
    'I comandi mostrati (id/whoami) sono benigni: evidenziano l’iniezione, non danneggiano nulla.',
  'defense.pack.cmd-injection.defense':
    'Evita la shell: usa API con argomenti separati (execFile) e allowlist; mai passare input a una shell.',

  'pack.ssrf.label': 'SSRF',
  'pack.ssrf.description':
    'Input che fa partire richieste dal server verso risorse interne.',
  'defense.pack.ssrf.what':
    'Un URL fornito dall’utente fa eseguire al server richieste verso host interni o metadata cloud.',
  'defense.pack.ssrf.where':
    'Funzioni che scaricano URL forniti: webhook, anteprime, import, proxy.',
  'defense.pack.ssrf.notProve':
    'Gli URL (127.0.0.1, 169.254.169.254) sono sonde: qui non viene fatta alcuna richiesta.',
  'defense.pack.ssrf.defense':
    'Allowlist di host e schemi; risolvi e blocca IP privati/link-local; disabilita i redirect; usa un egress proxy dedicato.',

  'pack.open-redirect.label': 'Open redirect',
  'pack.open-redirect.description':
    'Input usato come destinazione di un redirect.',
  'defense.pack.open-redirect.what':
    'L’input diventa la destinazione di un redirect, portando l’utente su un dominio esterno.',
  'defense.pack.open-redirect.where':
    'Parametri returnUrl/next/redirect dopo login o azioni.',
  'defense.pack.open-redirect.notProve':
    'Le destinazioni usano domini di esempio: mostrano il vettore, non un attacco reale.',
  'defense.pack.open-redirect.defense':
    'Allowlist di destinazioni relative o di host noti; non redirigere verso URL assoluti da input; valida schema e host.',

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
  'defense.fix': 'Fix copy-paste',
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
  'op.sha-1.label': 'SHA-1',
  'op.sha-1.description':
    'Digest SHA-1 dei byte dell’input (hex). Algoritmo deprecato.',
  'op.sha-384.label': 'SHA-384',
  'op.sha-384.description': 'Digest SHA-384 dei byte dell’input (hex).',
  'op.sha-512.label': 'SHA-512',
  'op.sha-512.description': 'Digest SHA-512 dei byte dell’input (hex).',
  'defense.sha-1.what':
    'Calcola un digest a 160 bit, deterministico e a senso unico, dei byte dell’input.',
  'defense.sha-1.where':
    'Integrità e fingerprint legacy; compatibilità con sistemi datati.',
  'defense.sha-1.notProve':
    'SHA-1 è debole alle collisioni: non usarlo per firme o integrità contro un avversario.',
  'defense.sha-1.defense':
    'Usa SHA-256 o superiore. Per le password un KDF lento con sale (argon2/bcrypt), mai SHA grezzo.',
  'defense.sha-384.what':
    'Calcola un digest a 384 bit, deterministico e a senso unico, dei byte dell’input.',
  'defense.sha-384.where':
    'Integrità, fingerprint, confronto di digest; non serve a cifrare.',
  'defense.sha-384.notProve':
    'Hashing non è cifratura né, da solo, sicurezza delle password.',
  'defense.sha-384.defense':
    'Per le password usa un KDF lento con sale (argon2/bcrypt/scrypt). Confronta i digest a tempo costante.',
  'defense.sha-512.what':
    'Calcola un digest a 512 bit, deterministico e a senso unico, dei byte dell’input.',
  'defense.sha-512.where':
    'Integrità, fingerprint, confronto di digest; non serve a cifrare.',
  'defense.sha-512.notProve':
    'Hashing non è cifratura né, da solo, sicurezza delle password.',
  'defense.sha-512.defense':
    'Per le password usa un KDF lento con sale (argon2/bcrypt/scrypt). Confronta i digest a tempo costante.',

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

  'op.jwt-inspect.label': 'JWT — ispeziona',
  'op.jwt-inspect.description':
    'Decodifica header e claim di un JWT (NON verifica la firma).',
  'defense.jwt-inspect.what':
    'Decodifica le parti Base64URL del token e mostra header e claim come report. Non verifica nulla.',
  'defense.jwt-inspect.where':
    'Ispezione di token di sessione/accesso: capire alg, scadenza, issuer, audience.',
  'defense.jwt-inspect.notProve':
    'Decodificare NON è verificare: un token leggibile può avere firma non valida, essere scaduto o usare alg:none.',
  'defense.jwt-inspect.defense':
    'Verifica la firma lato server con una allowlist di algoritmi (mai “none”), poi valida exp/nbf/iss/aud. Non fidarti dei claim prima della verifica.',

  'op.cookie-inspect.label': 'Set-Cookie — ispeziona',
  'op.cookie-inspect.description':
    'Analizza un header Set-Cookie ed evidenzia i flag di sicurezza mancanti.',
  'defense.cookie-inspect.what':
    'Scompone nome, valore e attributi del cookie e segnala HttpOnly, Secure e SameSite assenti.',
  'defense.cookie-inspect.where':
    'Revisione delle risposte HTTP: cookie di sessione e token.',
  'defense.cookie-inspect.notProve':
    'L’analisi è sintattica: la presenza di un flag non garantisce una configurazione sicura nel contesto.',
  'defense.cookie-inspect.defense':
    'Per i cookie sensibili imposta HttpOnly, Secure e SameSite (Lax/Strict); usa il prefisso __Host- e una scadenza breve.',

  'op.csp-analyze.label': 'CSP — analizza',
  'op.csp-analyze.description':
    'Analizza una Content-Security-Policy ed evidenzia le debolezze comuni.',
  'defense.csp-analyze.what':
    'Elenca le direttive e segnala unsafe-inline/unsafe-eval, sorgenti jolly e l’assenza di default-src/object-src.',
  'defense.csp-analyze.where':
    'Revisione degli header di risposta: hardening contro XSS e injection.',
  'defense.csp-analyze.notProve':
    'La CSP è una difesa aggiuntiva: una policy presente non sostituisce l’output encoding contestuale.',
  'defense.csp-analyze.defense':
    "Evita unsafe-inline/unsafe-eval (usa nonce o hash), imposta default-src e object-src 'none', restringi le sorgenti ed evita i jolly.",

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

  'tab.context': 'XSS context',
  'xss.title': 'Understand an XSS context',
  'xss.intro':
    'Choose where your input is reflected: WebFang shows pertinent inert payloads, the prerequisites and the contextual defense.',
  'xss.pickContext': 'Reflection context',
  'xss.payloads': 'Didactic payloads (inert)',
  'xss.prereqLabel': 'Prerequisites',
  'xss.copy': 'Copy',

  'mode.label': 'Mode',
  'mode.guided': 'Guided',
  'mode.expert': 'Expert',
  'help.open': 'Help',
  'wizard.open': 'I don’t know what I need',
  'wizard.title': 'I don’t know what I need',
  'wizard.q1': 'Where is your input reflected?',
  'wizard.hint':
    'Pick the context: I’ll take you to the inert examples and the right defense.',
  'wizard.close': 'Close',
  'onboarding.title.1': 'Welcome to WebFang',
  'onboarding.body.1':
    'Transform a string and, for each step, see what it does, where it is relevant, what it does not prove and how to defend.',
  'onboarding.title.2': 'Compose and share',
  'onboarding.body.2':
    'Chain operations into a recipe, with intermediate results and undo/redo. Share via link: only operations and parameters, never input or secrets.',
  'onboarding.title.3': 'Privacy and security',
  'onboarding.body.3':
    'Everything runs in the browser: input and keys never leave the device. Payloads are inert and didactic: they do not prove a vulnerability.',
  'onboarding.step': '{n} / {total}',
  'onboarding.next': 'Next',
  'onboarding.back': 'Back',
  'onboarding.done': 'Start',
  'onboarding.skip': 'Skip',
  'guide.transform':
    'Pick an operation and watch the output and defense change in real time.',
  'guide.compose':
    'Add steps to chain transformations; each one shows its own result.',
  'guide.context': 'Not sure where to start? Use “I don’t know what I need”.',
  'guide.payloads':
    'Pick an attack family: inert payloads on the left, defense below.',

  'xss.html-body.label': 'HTML body',
  'xss.html-body.description':
    'The input ends up between tags, in the page body.',
  'xss.html-body.prereq':
    'Output not encoded as HTML and no CSP blocking inline scripts.',
  'defense.xss.html-body.what':
    'The browser interprets the input as markup: a <script> or an event handler runs.',
  'defense.xss.html-body.where':
    'Values reflected in the HTML body without escaping (comments, messages, searches).',
  'defense.xss.html-body.notProve':
    'The payload is inert (alerts the domain): it shows the context, not real impact.',
  'defense.xss.html-body.defense':
    'Contextual HTML encoding at the output point (React/Blade/Twig/Go). CSP is an additional defense, not a substitute for encoding.',

  'xss.attribute.label': 'HTML attribute',
  'xss.attribute.description':
    'The input ends up in an attribute value (e.g. value="…").',
  'xss.attribute.prereq':
    'Unquoted attribute, or input that can close the quotes.',
  'defense.xss.attribute.what':
    'Breaking out of the value (with " or >) injects a new attribute/handler or a tag.',
  'defense.xss.attribute.where':
    'Attribute values built from input: value, title, alt, href.',
  'defense.xss.attribute.notProve':
    'Inert: it shows how the context breaks, not an exploit.',
  'defense.xss.attribute.defense':
    'Always quote attributes and apply attribute-encoding; never build attributes by concatenation.',

  'xss.js-string.label': 'JavaScript string',
  'xss.js-string.description':
    'The input ends up inside a string in an inline <script>.',
  'xss.js-string.prereq':
    'Input placed in JS without escaping, with the ability to close the string.',
  'defense.xss.js-string.what':
    'Closing the string (with \' or ") and adding ; runs arbitrary JS.',
  'defense.xss.js-string.where':
    'Templates that interpolate input into inline JavaScript.',
  'defense.xss.js-string.notProve':
    'Inert: it highlights the JS context, not impact.',
  'defense.xss.js-string.defense':
    'Do not build JS from input: pass data via JSON.stringify or a data attribute and read it from the DOM; CSP without unsafe-inline.',

  'xss.url.label': 'URL / href',
  'xss.url.description': 'The input becomes a URL (e.g. href, src).',
  'xss.url.prereq': 'URL scheme not validated (accepts javascript:).',
  'defense.xss.url.what': 'A javascript: scheme in href runs code on click.',
  'defense.xss.url.where': 'Links and redirects built from input.',
  'defense.xss.url.notProve':
    'Inert: it shows the dangerous scheme, not an attack.',
  'defense.xss.url.defense':
    'Allowlist schemes (http/https/mailto); reject javascript:/data: where not needed; validate and normalize the URL.',

  'xss.svg.label': 'SVG',
  'xss.svg.description':
    'The input ends up in an SVG context (inline or loaded).',
  'xss.svg.prereq':
    'SVG rendered inline or unsanitized, with event handlers allowed.',
  'defense.xss.svg.what':
    'SVG elements run JS via handlers (onload) even without <script>.',
  'defense.xss.svg.where':
    'Uploading/previewing SVG, icons or charts built from input.',
  'defense.xss.svg.notProve': 'Inert: it shows the SVG vector, not impact.',
  'defense.xss.svg.defense':
    'Sanitize the SVG with DOMPurify (SVG profile) removing handlers; serve it as an image, not inline in the DOM.',

  'tab.payloads': 'Payloads',
  'payloads.title': 'Payload packs',
  'payloads.intro':
    'Attack families with inert payloads and their defense. The examples are didactic: they do not prove a vulnerability.',
  'payloads.pick': 'Family',
  'payloads.list': 'Inert payloads',
  'payloads.copy': 'Copy',

  'tab.playground': 'Playground',
  'playground.title': 'Defense Playground',
  'playground.intro':
    'Paste a payload and run it through a defense: see whether an executable vector survives. The output is text only and is never executed.',
  'playground.inputLabel': 'Payload',
  'playground.mode': 'Defense',
  'playground.mode.none': 'No defense',
  'playground.mode.purify-default': 'DOMPurify (default)',
  'playground.mode.purify-strict': 'DOMPurify (strict)',
  'playground.mode.escape': 'HTML escape',
  'playground.output': 'Sanitized output',
  'playground.survives': 'Executable vector survived',
  'playground.neutralized': 'Neutralized: no executable vector',
  'playground.note':
    'A “neutralized” result here is not a universal guarantee: it depends on configuration and rendering context.',
  'guide.playground': 'Try a defense on a payload and watch what remains.',

  'tab.regex': 'Regex',
  'regex.intro':
    'Test a regular expression in an isolated worker: a catastrophic pattern does not freeze the UI.',
  'regex.pattern': 'Pattern',
  'regex.flags': 'Flags',
  'regex.flag.g': 'g (global)',
  'regex.flag.i': 'i (ignore case)',
  'regex.flag.m': 'm (multiline)',
  'regex.flag.s': 's (dotall)',
  'regex.testString': 'Test string',
  'regex.results': 'Results',
  'regex.matches': '{n} matches',
  'regex.noMatch': 'No match.',
  'regex.timeout':
    'Timeout: pattern too expensive (possible ReDoS). The worker was terminated to protect the UI.',
  'regex.invalid': 'Invalid pattern',
  'regex.tooLarge': 'Input exceeds the limit of {max} characters.',
  'defense.regex.what':
    'Matches a pattern against text and returns matches and captured groups.',
  'defense.regex.where':
    'Input validation, parsing, routing, filters — anywhere regex runs on untrusted data.',
  'defense.regex.notProve':
    'A match does not validate security: patterns with nested backtracking can blow up (ReDoS) on crafted input.',
  'defense.regex.defense':
    'Avoid nested/ambiguous quantifiers; use anchors and specific classes; enforce length limits and timeouts; consider linear engines (RE2) server-side.',
  'guide.regex':
    'Write a pattern and a string: matches appear below, safely inside a worker.',

  'pack.sqli.label': 'SQL injection',
  'pack.sqli.description': 'Input that alters a SQL query.',
  'defense.pack.sqli.what':
    'Breaks the query syntax (quotes, OR, UNION, comments) to alter its logic.',
  'defense.pack.sqli.where':
    'Queries built by concatenating input: login, search, filters, ordering.',
  'defense.pack.sqli.notProve':
    'The probes (OR 1=1, UNION NULL) show injection, they do not extract data: inert.',
  'defense.pack.sqli.defense':
    'Always use parameterized/prepared statements; allowlist identifiers (columns/ORDER BY); least-privilege DB. Never concatenate input.',

  'pack.ssti.label': 'SSTI (templates)',
  'pack.ssti.description': 'Input evaluated by a server-side template engine.',
  'defense.pack.ssti.what':
    'The input is evaluated by the template engine: {{7*7}} becomes 49.',
  'defense.pack.ssti.where':
    'Templates interpolating untrusted input (Jinja2, Twig, Freemarker, ERB).',
  'defense.pack.ssti.notProve':
    'The probes only compute 7*7: they show evaluation, not code execution.',
  'defense.pack.ssti.defense':
    'Do not pass input as a template; use static templates with a data context. Sandbox the engine and keep logic out of templates.',

  'pack.lfi.label': 'LFI / Path traversal',
  'pack.lfi.description':
    'Input that climbs the filesystem to include or read files.',
  'defense.pack.lfi.what':
    '../ sequences (also encoded) climb directories to reach files outside the root.',
  'defense.pack.lfi.where':
    'Parameters naming a file or path: include, download, template, language.',
  'defense.pack.lfi.notProve':
    'Reading /etc/passwd is the classic probe: here it is just a string, not real access.',
  'defense.pack.lfi.defense':
    'Allowlist files/IDs; resolve the canonical path and verify it stays within the allowed root; no paths from input.',

  'pack.cmd-injection.label': 'Command injection',
  'pack.cmd-injection.description':
    'Input that injects commands into the shell.',
  'defense.pack.cmd-injection.what':
    'Shell metacharacters (; | $() ` &&) append commands to the intended one.',
  'defense.pack.cmd-injection.where':
    'System-command calls built from input: ping, conversions, archives.',
  'defense.pack.cmd-injection.notProve':
    'The shown commands (id/whoami) are benign: they show injection, they harm nothing.',
  'defense.pack.cmd-injection.defense':
    'Avoid the shell: use APIs with separate arguments (execFile) and an allowlist; never pass input to a shell.',

  'pack.ssrf.label': 'SSRF',
  'pack.ssrf.description':
    'Input that makes the server issue requests to internal resources.',
  'defense.pack.ssrf.what':
    'A user-supplied URL makes the server request internal hosts or cloud metadata.',
  'defense.pack.ssrf.where':
    'Functions that fetch supplied URLs: webhooks, previews, imports, proxies.',
  'defense.pack.ssrf.notProve':
    'The URLs (127.0.0.1, 169.254.169.254) are probes: no request is made here.',
  'defense.pack.ssrf.defense':
    'Allowlist hosts and schemes; resolve and block private/link-local IPs; disable redirects; use a dedicated egress proxy.',

  'pack.open-redirect.label': 'Open redirect',
  'pack.open-redirect.description': 'Input used as a redirect destination.',
  'defense.pack.open-redirect.what':
    'The input becomes a redirect destination, taking the user to an external domain.',
  'defense.pack.open-redirect.where':
    'returnUrl/next/redirect parameters after login or actions.',
  'defense.pack.open-redirect.notProve':
    'The destinations use example domains: they show the vector, not a real attack.',
  'defense.pack.open-redirect.defense':
    'Allowlist relative destinations or known hosts; do not redirect to absolute URLs from input; validate scheme and host.',

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
  'defense.fix': 'Copy-paste fix',
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
  'op.sha-1.label': 'SHA-1',
  'op.sha-1.description':
    'SHA-1 digest of the input bytes (hex). Deprecated algorithm.',
  'op.sha-384.label': 'SHA-384',
  'op.sha-384.description': 'SHA-384 digest of the input bytes (hex).',
  'op.sha-512.label': 'SHA-512',
  'op.sha-512.description': 'SHA-512 digest of the input bytes (hex).',
  'defense.sha-1.what':
    'Computes a deterministic, one-way 160-bit digest of the input bytes.',
  'defense.sha-1.where':
    'Legacy integrity and fingerprints; compatibility with dated systems.',
  'defense.sha-1.notProve':
    'SHA-1 is collision-weak: do not use it for signatures or integrity against an adversary.',
  'defense.sha-1.defense':
    'Use SHA-256 or stronger. For passwords use a slow salted KDF (argon2/bcrypt), never raw SHA.',
  'defense.sha-384.what':
    'Computes a deterministic, one-way 384-bit digest of the input bytes.',
  'defense.sha-384.where':
    'Integrity, fingerprints, digest comparison; not for encryption.',
  'defense.sha-384.notProve':
    'Hashing is not encryption, nor on its own password security.',
  'defense.sha-384.defense':
    'For passwords use a slow salted KDF (argon2/bcrypt/scrypt). Compare digests in constant time.',
  'defense.sha-512.what':
    'Computes a deterministic, one-way 512-bit digest of the input bytes.',
  'defense.sha-512.where':
    'Integrity, fingerprints, digest comparison; not for encryption.',
  'defense.sha-512.notProve':
    'Hashing is not encryption, nor on its own password security.',
  'defense.sha-512.defense':
    'For passwords use a slow salted KDF (argon2/bcrypt/scrypt). Compare digests in constant time.',

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

  'op.jwt-inspect.label': 'JWT — inspect',
  'op.jwt-inspect.description':
    'Decodes a JWT header and claims (does NOT verify the signature).',
  'defense.jwt-inspect.what':
    'Decodes the Base64URL parts of the token and shows header and claims as a report. It verifies nothing.',
  'defense.jwt-inspect.where':
    'Inspecting session/access tokens: understanding alg, expiry, issuer, audience.',
  'defense.jwt-inspect.notProve':
    'Decoding is NOT verifying: a readable token may have an invalid signature, be expired or use alg:none.',
  'defense.jwt-inspect.defense':
    'Verify the signature server-side with an algorithm allowlist (never “none”), then validate exp/nbf/iss/aud. Do not trust claims before verification.',

  'op.cookie-inspect.label': 'Set-Cookie — inspect',
  'op.cookie-inspect.description':
    'Parses a Set-Cookie header and flags missing security attributes.',
  'defense.cookie-inspect.what':
    'Breaks down the cookie name, value and attributes and flags missing HttpOnly, Secure and SameSite.',
  'defense.cookie-inspect.where':
    'Reviewing HTTP responses: session cookies and tokens.',
  'defense.cookie-inspect.notProve':
    'The analysis is syntactic: a present flag does not guarantee a secure configuration in context.',
  'defense.cookie-inspect.defense':
    'For sensitive cookies set HttpOnly, Secure and SameSite (Lax/Strict); use the __Host- prefix and a short lifetime.',

  'op.csp-analyze.label': 'CSP — analyze',
  'op.csp-analyze.description':
    'Parses a Content-Security-Policy and flags common weaknesses.',
  'defense.csp-analyze.what':
    'Lists the directives and flags unsafe-inline/unsafe-eval, wildcard sources and missing default-src/object-src.',
  'defense.csp-analyze.where':
    'Reviewing response headers: hardening against XSS and injection.',
  'defense.csp-analyze.notProve':
    'CSP is an additional defense: a present policy does not replace contextual output encoding.',
  'defense.csp-analyze.defense':
    "Avoid unsafe-inline/unsafe-eval (use nonces or hashes), set default-src and object-src 'none', restrict sources and avoid wildcards.",

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
