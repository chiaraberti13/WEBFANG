# Panoramica

[English](overview.md) · [Italiano](overview.it.md)

WebFang è un toolkit lato client per la sicurezza offensiva del web. La sua identità
è una sola idea: **contesto → trasformazione → difesa**. Per ogni passaggio mostra
cosa fa la trasformazione, dove è pertinente e con quali prerequisiti, cosa _non_
dimostra e come difendersi — con un esempio sicuro e un riferimento CWE/OWASP.

## Utenti di riferimento

- **Bug-bounty hunter / pentester** — costruisce, prova e salva ricette in velocità.
- **Studente di web security** — impara il _perché_, il _contesto_ e la _difesa_.
- **Sviluppatore back-end** — decodifica un token o un encoding strano e copia la fix.

## Principi

- **Elaborazione locale.** Input, token e chiavi non vengono trasmessi a servizi
  remoti; nessun asset di terze parti è caricato a runtime.
- **Ricette componibili e condivisibili** via URL compresso, sicure per default
  (i segreti non vengono mai serializzati).
- **Doppio livello: esperto e principiante** — modalità guidata, wizard e glossario.
- **Remediation azionabile** — una fix copy-paste nel linguaggio dell'utente, non
  solo teoria.
- **Bilingue IT/EN, accessibile, usabile offline** (PWA / single-file).

Vedi la [specifica di prodotto](../../project.md) e la
[roadmap](../../roadmap.md) per il dettaglio.
