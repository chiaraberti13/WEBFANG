import { useEffect } from 'react';
import { useAppStore } from './store.ts';
import { translate, type Lang } from './i18n/index.ts';
import { Workbench } from './components/Workbench.tsx';

export default function App() {
  const { lang, setLang, theme, toggleTheme } = useAppStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
  }, [theme, lang]);

  const t = (key: string) => translate(lang, key);

  return (
    <div className="wf-app">
      <header className="wf-header">
        <div className="wf-brand">
          <h1 className="wf-brand__name">
            Web<span className="wf-brand__fang">Fang</span>
          </h1>
          <p className="wf-brand__tagline">{t('app.tagline')}</p>
        </div>
        <div className="wf-header__controls">
          <label className="wf-field">
            <span className="wf-visually-hidden">{t('lang.switch')}</span>
            <select
              aria-label={t('lang.switch')}
              value={lang}
              onChange={(event) => setLang(event.target.value as Lang)}
              className="wf-select wf-select--compact"
            >
              <option value="it">IT</option>
              <option value="en">EN</option>
            </select>
          </label>
          <button
            type="button"
            className="wf-button"
            onClick={toggleTheme}
            aria-label={t('theme.toggle')}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </header>

      <main className="wf-main">
        <Workbench lang={lang} />
      </main>

      <footer className="wf-footer">
        <p className="wf-footer__disclaimer">{t('app.footerDisclaimer')}</p>
        <p className="wf-footer__author">
          {t('app.builtBy')} ·{' '}
          <a
            href="https://github.com/chiaraberti13/WEBFANG"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
