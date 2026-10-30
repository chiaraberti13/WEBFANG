# WebFang — Descrizione del progetto

> Documento pensato per accompagnare il curriculum. Spiega **cosa fa** l'applicazione,
> **come è stata sviluppata** dal punto di vista tecnico e **quale è stato il mio ruolo**
> e le competenze che il progetto dimostra.

---

## 1. In una frase

**WebFang** è un "coltellino svizzero" per la **sicurezza offensiva del web** che gira
**interamente nel browser**: trasforma stringhe (encode/decode, hashing, payload didattici)
e, per ogni passaggio, lega la trasformazione al suo **contesto d'uso** e alla sua
**contromisura difensiva**. Input, token e chiavi **non lasciano il browser**: nessun
backend, nessun upload.

L'idea è trasformare operazioni normalmente da esperti — capire cosa cambia in una stringa
e perché un payload è pertinente in un certo contesto — in uno strumento **trasparente e
didattico**, usabile anche da chi non è esperto, che mostra sempre *cosa fa*, *dove è
pertinente*, *cosa non dimostra* e *come ci si difende*.

---

## 2. Cosa fa l'app (funzionalità per l'utente)

- **Capire una stringa:** Base64/Base64URL, URL-encode (singolo/doppio), HTML entities,
  Hex, SHA-256 — sul contratto a byte, con risultato immediato.
- **Comporre trasformazioni:** una catena di operazioni ("ricetta") con risultati
  intermedi, riordino accessibile, undo/redo, salvabile e condivisibile via URL compresso
  (sicuro per default: segreti mai serializzati).
- **Capire un contesto XSS:** esempi didattici per contesto (HTML, attributo, JS, URL, SVG)
  con prerequisiti e **difesa contestuale** accanto.
- **Difesa sempre in primo piano:** per ogni attacco una fix *copy-paste* nel linguaggio
  dell'utente e un riferimento CWE/OWASP. Un payload generato è inerte: **non prova una
  vulnerabilità**.
- **Per tutti:** modalità guidata, wizard "non so cosa mi serve", glossario, bilingue IT/EN,
  tema chiaro/scuro, usabile **offline** (PWA / file HTML singolo).

---

## 3. Come è sviluppata (punto di vista tecnico)

- **100% client-side**, nessun backend: l'elaborazione avviene nel browser; nessun asset di
  terze parti a runtime.
- **Stack:** TypeScript (strict), React 19, Vite, Tailwind CSS, Zustand, Zod, Vitest.
- **Contratto dati testo/byte** (`src/core`): ogni valore è esplicitamente testo o byte,
  con encoding dichiarato, errori strutturati e traducibili, limiti di esecuzione e
  annullamento (`AbortSignal`). La logica è pura e separata dalla UI: aggiungere un payload
  significa aggiungere **dati**, non codice.
- **Due varianti di build:** app installabile come **PWA offline** e **file HTML singolo**
  eseguibile da `file://` (uso in VM isolate durante i pentest). I Web Worker sono inlineati;
  la Content-Security-Policy è stringente (niente `eval`, script inline hashati nel single-file).
- **Qualità:** ESLint con regole AppSec (no-`eval`, no-`any`), Prettier, test unitari, build
  verificate; la roadmap a fasi parte da una **prova di fattibilità**.

---

## 4. Il mio ruolo e le competenze dimostrate

Progetto ideato e sviluppato da **Chiara Berti**, indossando a rotazione tre "cappelli":

- **Product & AppSec** — correttezza e liceità dei payload, mapping OWASP/CWE, threat model,
  contenuti didattici attacco/difesa.
- **Frontend & DX** — architettura client-side, React e stato, accessibilità (WCAG 2.1 AA),
  Web Worker, build single-file/PWA, contratto dati.
- **Growth & Delivery** — CI/CD, deploy, documentazione e cura della presentazione.

Competenze dimostrate: sicurezza web offensiva **in ottica difensiva**, sviluppo full-stack
front-end moderno e sicuro, progettazione orientata alla privacy e all'accessibilità, cura
della qualità e della documentazione.
