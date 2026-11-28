import { useEffect, useState, type KeyboardEvent } from 'react';
import { useAppStore } from './store.ts';
import { translate, type Lang } from './i18n/index.ts';
import { XSS_CONTEXTS } from './content/xss.ts';
import { PAYLOAD_PACKS } from './content/payloads.ts';
import { Workbench } from './components/Workbench.tsx';
import { RecipeBoard } from './components/RecipeBoard.tsx';
import { XssExplorer } from './components/XssExplorer.tsx';
import { PayloadExplorer } from './components/PayloadExplorer.tsx';
import { DefensePlayground } from './components/DefensePlayground.tsx';
import { RegexTester } from './components/RegexTester.tsx';
import { Wizard } from './components/Wizard.tsx';
import { Onboarding } from './components/Onboarding.tsx';

const TABS = [
  'transform',
  'compose',
  'context',
  'payloads',
  'playground',
  'regex',
] as const;
type Tab = (typeof TABS)[number];

const FIRST_CONTEXT_ID = XSS_CONTEXTS[0]?.id ?? '';
const FIRST_PACK_ID = PAYLOAD_PACKS[0]?.id ?? '';

export default function App() {
  const {
    lang,
    setLang,
    theme,
    toggleTheme,
    mode,
    setMode,
    onboardingSeen,
    dismissOnboarding,
  } = useAppStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
  }, [theme, lang]);

  const [tab, setTab] = useState<Tab>('transform');
  const [composeVisited, setComposeVisited] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(!onboardingSeen);
  const [xssContextId, setXssContextId] = useState(FIRST_CONTEXT_ID);
  const [packId, setPackId] = useState(FIRST_PACK_ID);

  const t = (key: string) => translate(lang, key);

  function selectTab(id: Tab) {
    setTab(id);
    if (id === 'compose') setComposeVisited(true);
  }

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number;
    switch (event.key) {
      case 'ArrowLeft':
        nextIndex = (index + TABS.length - 1) % TABS.length;
        break;
      case 'ArrowRight':
        nextIndex = (index + 1) % TABS.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = TABS.length - 1;
        break;
      default:
        return;
    }

    const nextTab = TABS[nextIndex];
    if (!nextTab) return;
    event.preventDefault();
    selectTab(nextTab);
    document.getElementById(`wf-tab-${nextTab}`)?.focus();
  }

  function pickFromWizard(contextId: string) {
    setXssContextId(contextId);
    setTab('context');
    setWizardOpen(false);
  }

  function finishOnboarding() {
    setOnboardingOpen(false);
    dismissOnboarding();
  }

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
          <div
            className="wf-segmented"
            role="group"
            aria-label={t('mode.label')}
          >
            {(['guided', 'expert'] as const).map((m) => (
              <button
                key={m}
                type="button"
                className={`wf-button ${mode === m ? 'wf-button--active' : ''}`}
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
              >
                {t(`mode.${m}`)}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="wf-button"
            onClick={() => setWizardOpen(true)}
          >
            {t('wizard.open')}
          </button>
          <button
            type="button"
            className="wf-button"
            onClick={() => setOnboardingOpen(true)}
            aria-label={t('help.open')}
          >
            ?
          </button>
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

      <nav className="wf-tabs" role="tablist" aria-label="WebFang">
        {TABS.map((id, index) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`wf-tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`wf-panel-${id}`}
            className={`wf-tab ${tab === id ? 'wf-tab--active' : ''}`}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => selectTab(id)}
            onKeyDown={(event) => handleTabKey(event, index)}
          >
            {t(`tab.${id}`)}
          </button>
        ))}
      </nav>

      {mode === 'guided' && <p className="wf-guide">{t(`guide.${tab}`)}</p>}

      <main className="wf-main">
        {TABS.map((id) => (
          <section
            key={id}
            id={`wf-panel-${id}`}
            role="tabpanel"
            aria-labelledby={`wf-tab-${id}`}
            tabIndex={0}
            hidden={tab !== id}
          >
            {id === 'transform' && <Workbench lang={lang} />}
            {id === 'compose' && composeVisited && <RecipeBoard lang={lang} />}
            {id === 'context' && tab === id && (
              <XssExplorer
                lang={lang}
                contextId={xssContextId}
                onContextChange={setXssContextId}
              />
            )}
            {id === 'payloads' && tab === id && (
              <PayloadExplorer
                lang={lang}
                packId={packId}
                onPackChange={setPackId}
              />
            )}
            {id === 'playground' && tab === id && (
              <DefensePlayground lang={lang} />
            )}
            {id === 'regex' && tab === id && <RegexTester lang={lang} />}
          </section>
        ))}
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

      {wizardOpen && (
        <Wizard
          lang={lang}
          onPick={pickFromWizard}
          onClose={() => setWizardOpen(false)}
        />
      )}
      {onboardingOpen && <Onboarding lang={lang} onDone={finishOnboarding} />}
    </div>
  );
}
