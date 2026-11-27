import { defineConfig } from 'vitest/config';

// Config dei test separata da vite.config.ts: i test unitari di `core`/`lib`
// sono TypeScript puro + jsdom e non richiedono i plugin di build (React,
// Tailwind, PWA), così si evita il conflitto di tipi fra le versioni di Vite.
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      // la soglia vincolante del progetto è su lib/ e core/ (logica pura)
      include: ['src/lib/**', 'src/core/**', 'src/recipes/**'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
