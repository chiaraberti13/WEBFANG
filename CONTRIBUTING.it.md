# Contribuire a WebFang

> English version: [CONTRIBUTING.md](CONTRIBUTING.md).

Questo repository riguarda un toolkit lato client di sicurezza web offensiva che
lega ogni trasformazione al suo contesto d'uso e alla sua contromisura difensiva.

### Prima di iniziare

1. Leggi `README.it.md`, `SECURITY.it.md`, [`roadmap.md`](roadmap.md),
   [`project.md`](project.md) e gli ADR pertinenti.
2. Controlla le issue esistenti e usa un branch dedicato (`feat/…`, `fix/…`).
3. Mantieni ogni pull request focalizzata, senza refactor non correlati.
4. Non committare segreti, dati privati o informazioni su target reali. I payload
   devono restare didattici e inerti (es. `alert(document.domain)`, `' OR 1=1--`).
5. Segnala privatamente le vulnerabilità (vedi `SECURITY.it.md`).

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
