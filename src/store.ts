import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from './i18n/index.ts';

export type Theme = 'dark' | 'light';
export type Mode = 'guided' | 'expert';

interface AppState {
  lang: Lang;
  theme: Theme;
  mode: Mode;
  onboardingSeen: boolean;
  setLang: (lang: Lang) => void;
  toggleTheme: () => void;
  setMode: (mode: Mode) => void;
  dismissOnboarding: () => void;
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
      mode: 'guided',
      onboardingSeen: false,
      setLang: (lang) => set({ lang }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setMode: (mode) => set({ mode }),
      dismissOnboarding: () => set({ onboardingSeen: true }),
    }),
    { name: 'webfang-preferences' },
  ),
);
