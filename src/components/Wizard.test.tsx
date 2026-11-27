import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Wizard } from './Wizard.tsx';
import { translate } from '../i18n/index.ts';

describe('Wizard', () => {
  it('routes the chosen reflection context to onPick', () => {
    const onPick = vi.fn();
    render(<Wizard lang="it" onPick={onPick} onClose={() => {}} />);
    fireEvent.click(
      screen.getByRole('button', { name: translate('it', 'xss.url.label') }),
    );
    expect(onPick).toHaveBeenCalledWith('url');
  });

  it('closes without choosing', () => {
    const onClose = vi.fn();
    render(<Wizard lang="it" onPick={() => {}} onClose={onClose} />);
    fireEvent.click(
      screen.getByRole('button', { name: translate('it', 'wizard.close') }),
    );
    expect(onClose).toHaveBeenCalled();
  });
});
