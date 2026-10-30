import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from './i18n/index.ts';

export type Theme = 'dark' | 'light';

interface AppState {
  lang: Lang;
  theme: Theme;
  setLang: (lang: Lang) => void;
  toggleTheme: () => void;
}

/**
 * Stato dell'app. Persiste SOLO le preferenze (lingua, tema) — mai input, token
 * o chiavi (vedi promessa di privacy in SECURITY.md).
 */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      lang: 'it',
      theme: 'dark',
      setLang: (lang) => set({ lang }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'webfang-preferences' },
  ),
);
