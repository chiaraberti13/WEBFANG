import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DefensePanel } from './DefensePanel.tsx';
import { OPERATION_BY_ID } from '../content/operations.ts';
import { translate } from '../i18n/index.ts';

const meta = OPERATION_BY_ID.get('base64-encode')!;

describe('DefensePanel', () => {
  it('renders the four defense answers with their labels', () => {
    render(<DefensePanel meta={meta} lang="it" />);
    for (const field of ['what', 'where', 'notProve', 'defense'] as const) {
      expect(
        screen.getByText(translate('it', `defense.${field}`)),
      ).toBeInTheDocument();
      expect(
        screen.getByText(translate('it', `defense.${meta.i18nBase}.${field}`)),
      ).toBeInTheDocument();
    }
  });

  it('shows CWE/OWASP references and the inert-payload disclaimer', () => {
    render(<DefensePanel meta={meta} lang="en" />);
    expect(screen.getByText(/CWE-116/)).toBeInTheDocument();
    expect(screen.getByText(/A03:2021/)).toBeInTheDocument();
    expect(
      screen.getByText(translate('en', 'defense.disclaimer')),
    ).toBeInTheDocument();
  });

  it('uses an accessible labelled region', () => {
    render(<DefensePanel meta={meta} lang="en" />);
    expect(
      screen.getByRole('region', { name: translate('en', 'defense.title') }),
    ).toBeInTheDocument();
  });
});
