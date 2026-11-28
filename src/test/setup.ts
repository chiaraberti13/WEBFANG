// Setup globale dei test (Vitest + jsdom).
// - jest-dom aggiunge matcher DOM (toBeInTheDocument, ecc.).
// - cleanup() smonta i componenti montati da React Testing Library dopo ogni test.
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

// jsdom models the open attribute but leaves the native dialog methods out.
// Browser tests exercise focus, modality and Escape with the real dialog.
if (
  typeof HTMLDialogElement !== 'undefined' &&
  !HTMLDialogElement.prototype.showModal
) {
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
}
