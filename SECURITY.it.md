# Politica di sicurezza

> English version: [SECURITY.md](SECURITY.md).

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
