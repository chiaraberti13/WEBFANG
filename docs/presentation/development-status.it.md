# Stato dello sviluppo

[English](development-status.md) · [Italiano](development-status.it.md)

> **Sviluppo iniziale — fase di scaffold.** Non dedurre la sicurezza a runtime o la
> copertura funzionale dai controlli di scaffold.

## Esiste oggi

- Il **contratto dati testo/byte** (`src/core`): testo e byte espliciti, encoding
  dichiarato, errori strutturati e traducibili, limiti di esecuzione e annullamento.
- Tooling di qualità: TypeScript severo, ESLint (regole AppSec), Prettier, Vitest.
- Hardening supply-chain: tooling pinnato, `.npmrc` con script di lifecycle disabilitati.
- Un'impalcatura Vite + React 19 con due varianti di build (PWA e single-file).
- Documentazione di progetto: specifica, roadmap, ADR, presentazione bilingue.
- CI (lint, typecheck, format, test, build) e il workflow delle label gestite.

## Non ancora operativo

- Il motore ricetta (comporre, riordinare, undo/redo, serializzazione URL).
- Il catalogo delle trasformazioni oltre le operazioni campione di Fase 0/1.
- I pannelli Difesa, i contenuti sul contesto XSS e la modalità guidata / wizard.
- JWT Workbench, payload pack estesi, toolkit HTTP, regex tester, importer CyberChef,
  Defense Playground (rimandati — vedi la roadmap).

## Prossimi passi

Prova di fattibilità Fase 0 (worker inline + `file://` + PWA + CSP) e vertical slice
di Fase 1 (Base64 end-to-end con pannello Difesa) come template per ogni altra
operazione. Vedi [`roadmap.md`](../../roadmap.md).
