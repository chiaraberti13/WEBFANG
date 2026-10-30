# Contributing to WebFang

<p align="center"><a href="#english">🇬🇧 English</a> · <a href="#italiano">🇮🇹 Italiano</a></p>

## English

This repository covers a client-side offensive web security toolkit that binds
every transformation to its context of use and its defensive countermeasure.

### Before you start

1. Read `README.md`, `SECURITY.md` and [`docs/ROADMAP.md`](docs/ROADMAP.md).
2. Search existing issues and use a dedicated branch (`feat/…`, `fix/…`).
3. Keep each pull request focused and avoid unrelated refactors.
4. Never commit secrets, private data or real target information. Payloads must
   stay didactic and inert (e.g. `alert(document.domain)`, `' OR 1=1--`).
5. Report vulnerabilities privately (see `SECURITY.md`).

### Setup

```bash
corepack enable
pnpm install --frozen-lockfile
```

### Checks

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
```

At the current scaffold stage, do not document planned transformations, defense
panels or runtime controls as implemented.

### Engineering expectations

Honour the four non-negotiable constraints: **security/ethics** (every attack
ships with its defense; no weaponized exploits), **privacy** (local processing;
no secret leaves the browser), **the text/byte data contract**, and the **design
system and AA accessibility**. Keep logic pure and separate from the UI; adding a
payload means adding **data**, not code. Validate untrusted input, fail safely,
keep dependencies minimal and justified, and add tests for behavioural changes.
Update English documentation first and keep Italian public documentation
semantically aligned.

### Pull requests

Describe what changed, why, verification performed, security/privacy impact,
compatibility implications and rollback/migration notes. CI (lint, typecheck,
tests, build) must be green. Participation follows `CODE_OF_CONDUCT.md`.

## Italiano

Questo repository riguarda un toolkit lato client di sicurezza web offensiva che
lega ogni trasformazione al suo contesto d'uso e alla sua contromisura difensiva.

### Prima di iniziare

1. Leggi `README.md`, `SECURITY.md` e [`docs/ROADMAP.md`](docs/ROADMAP.md).
2. Controlla le issue esistenti e usa un branch dedicato (`feat/…`, `fix/…`).
3. Mantieni ogni pull request focalizzata, senza refactor non correlati.
4. Non committare segreti, dati privati o informazioni su target reali. I payload
   devono restare didattici e inerti (es. `alert(document.domain)`, `' OR 1=1--`).
5. Segnala privatamente le vulnerabilità (vedi `SECURITY.md`).

### Setup

```bash
corepack enable
pnpm install --frozen-lockfile
```

### Controlli

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
```

Nella fase attuale di scaffold, non documentare come implementate trasformazioni,
pannelli Difesa o controlli a runtime ancora pianificati.

### Aspettative tecniche

Rispetta i quattro vincoli non negoziabili: **sicurezza/etica** (ogni attacco con
la sua difesa; nessun exploit armato), **privacy** (elaborazione locale; nessun
segreto fuori dal browser), **contratto dati testo/byte** e **design system +
accessibilità AA**. Mantieni la logica pura e separata dalla UI; aggiungere un
payload significa aggiungere **dati**, non codice. Valida gli input non fidati,
usa comportamenti fail-safe, mantieni le dipendenze minime e motivate e aggiorna i
test. Aggiorna prima la documentazione inglese e mantieni quella pubblica italiana
semanticamente equivalente.

### Pull request

Descrivi cosa cambia, perché, verifiche eseguite, impatto sicurezza/privacy,
compatibilità e note di rollback/migrazione. La CI (lint, typecheck, test, build)
deve essere verde. Si applica `CODE_OF_CONDUCT.md`.
