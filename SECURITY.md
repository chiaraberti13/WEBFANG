# Security Policy

<p align="center"><a href="#english">🇬🇧 English</a> · <a href="#italiano">🇮🇹 Italiano</a></p>

## English

### Supported versions

Security fixes target the latest revision on the default branch unless a release
is explicitly documented as supported.

### Scope

The client-side application and its data contract; the recipe engine and URL
serialization (`#recipe=`); recipe import/export (JSON); the didactic payload
catalogue and defense content; the build, single-file and PWA pipelines; and the
dependency/build supply chain.

### Threat model (summary)

WebFang protects the user (input, tokens and keys must not leave the browser) and
the app itself (it must not be turned against whoever opens it). Critical inputs:
user input, imported recipes, the URL fragment, and future community content.
Hostile recipes/URLs, malicious community content and self-XSS are in scope.

### Privacy promise

Input, tokens and keys are processed locally and are **not** transmitted to remote
services. No third-party font, script or asset is loaded at runtime. By default no
input, JWT or key is persisted; only preferences and explicitly saved recipes are.
Keys and secrets are **never** serialized into the URL; including the input in a
shared link requires explicit consent with a preview.

### Reporting

Do not open a public issue for an unpatched vulnerability. Use GitHub private
vulnerability reporting / Security Advisories when available. Include the affected
commit/version, impact, reproducible steps or a minimal proof of concept,
environment assumptions and possible mitigations. Remove unrelated sensitive data.

### Security requirements

Never commit secrets, credentials, private keys or private data. The UI must never
execute payloads (render as text; sanitize HTML with DOMPurify only where a live
preview is required). Keep the CSP strict, with no `eval` and no un-hashed inline
scripts. Heavy/regex work runs in a worker with timeout and size limits
(anti-ReDoS, anti-zip-bomb). A generated payload must never be presented as proof
of a vulnerability.

### Responsible testing

Test only systems, files and accounts you own or are explicitly authorized to use.
No destructive testing, denial of service, unauthorized access or collection of
third-party data.

## Italiano

### Versioni supportate

Le correzioni riguardano la revisione più recente del branch predefinito, salvo
release esplicitamente documentate come supportate.

### Ambito

L'applicazione lato client e il suo contratto dati; il motore ricetta e la
serializzazione URL (`#recipe=`); import/export delle ricette (JSON); il catalogo
di payload didattici e i contenuti di difesa; le pipeline di build, single-file e
PWA; la supply chain di dipendenze e build.

### Threat model (sintesi)

WebFang protegge l'utente (input, token e chiavi non devono uscire dal browser) e
l'app stessa (non deve essere usata contro chi la apre). Ingressi critici: input
dell'utente, ricette importate, fragment URL e futuri contenuti community. Sono in
ambito ricette/URL ostili, contenuti community malevoli e self-XSS.

### Promessa di privacy

Input, token e chiavi vengono elaborati localmente e **non** trasmessi a servizi
remoti. Nessun font, script o asset di terze parti viene caricato a runtime. Per
default non si persistono input, JWT o chiavi; solo preferenze e ricette salvate
esplicitamente. Chiavi e segreti **non** vengono mai serializzati nell'URL;
includere l'input in un link condiviso richiede consenso esplicito con anteprima.

### Segnalazione

Non aprire issue pubbliche per vulnerabilità non corrette. Usa la segnalazione
privata / Security Advisories quando disponibile. Indica commit/versione, impatto,
passaggi riproducibili o PoC minimo, assunzioni ambientali e mitigazioni,
rimuovendo dati sensibili non necessari.

### Requisiti di sicurezza

Non committare segreti, credenziali, chiavi private o dati privati. La UI non deve
mai eseguire i payload (render come testo; sanificare l'HTML con DOMPurify solo
dove serve un'anteprima live). Mantieni la CSP stringente, senza `eval` e senza
script inline non hashati. Il lavoro pesante/regex gira in un worker con timeout e
limiti di dimensione (anti-ReDoS, anti-zip-bomb). Un payload generato non deve mai
essere presentato come prova di una vulnerabilità.

### Test responsabili

Esegui test solo su sistemi, file e account propri o esplicitamente autorizzati.
Sono esclusi test distruttivi, DoS, accessi non autorizzati e raccolta di dati di
terzi.

## Percorso operativo di segnalazione

1. Consulta [la sezione sicurezza del repository](https://github.com/chiaraberti13/WEBFANG/security) e usa la funzione di segnalazione privata se disponibile. La presenza di questo documento non implica che tale funzione sia abilitata.
2. Se la funzione non è disponibile, usa un canale privato già verificato con la manutentrice. In assenza di un contatto, chiedi soltanto l'attivazione di un canale riservato in una issue, senza dettagli tecnici, nomi di soggetti coinvolti o allegati sensibili. Se le issue sono disabilitate, usa un contatto verificato già disponibile; attendi un canale riservato prima di condividere dettagli.
3. Nel canale riservato indica versione o commit, componente, impatto, prerequisiti, riproduzione minima con dati sintetici ed eventuale mitigazione.
4. Concorda la pubblicazione dei dettagli dopo la valutazione e la correzione. Restano valide le eventuali tempistiche specifiche già indicate sopra; questa integrazione non introduce nuove garanzie sui tempi.

I bug ordinari e le richieste di accessibilità possono usare i modelli delle issue. Non allegare credenziali, dati di produzione o dati personali, neppure ai report tecnici quando non necessari.
