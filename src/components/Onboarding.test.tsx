import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Onboarding } from './Onboarding.tsx';
import { translate } from '../i18n/index.ts';

describe('Onboarding', () => {
  it('advances through the three steps and finishes', () => {
    const onDone = vi.fn();
    render(<Onboarding lang="it" onDone={onDone} />);
    expect(
      screen.getByText(translate('it', 'onboarding.title.1')),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: translate('it', 'onboarding.next') }),
    );
    expect(
      screen.getByText(translate('it', 'onboarding.title.2')),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', { name: translate('it', 'onboarding.next') }),
    );
    fireEvent.click(
      screen.getByRole('button', { name: translate('it', 'onboarding.done') }),
    );
    expect(onDone).toHaveBeenCalled();
  });

  it('can be skipped from the first step', () => {
    const onDone = vi.fn();
    render(<Onboarding lang="it" onDone={onDone} />);
    fireEvent.click(
      screen.getByRole('button', { name: translate('it', 'onboarding.skip') }),
    );
    expect(onDone).toHaveBeenCalled();
  });
});
