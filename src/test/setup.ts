// Setup globale dei test (Vitest + jsdom).
// - jest-dom aggiunge matcher DOM (toBeInTheDocument, ecc.).
// - cleanup() smonta i componenti montati da React Testing Library dopo ogni test.
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
