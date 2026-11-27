import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { XssExplorer } from './XssExplorer.tsx';
import { translate } from '../i18n/index.ts';

describe('XssExplorer', () => {
  it('shows inert payloads for the default context and the defense panel', () => {
    render(<XssExplorer lang="it" />);
    expect(
      screen.getByText('<script>alert(document.domain)</script>'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: translate('it', 'defense.title') }),
    ).toBeInTheDocument();
  });

  it('switches payloads when the context changes', () => {
    render(<XssExplorer lang="it" />);
    fireEvent.change(
      screen.getByLabelText(translate('it', 'xss.pickContext')),
      { target: { value: 'url' } },
    );
    expect(
      screen.getByText('javascript:alert(document.domain)'),
    ).toBeInTheDocument();
  });
});
