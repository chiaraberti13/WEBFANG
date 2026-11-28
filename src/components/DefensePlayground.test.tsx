import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DefensePlayground } from './DefensePlayground.tsx';
import { translate } from '../i18n/index.ts';

describe('DefensePlayground', () => {
  it('shows the payload surviving with no defense, then neutralized by DOMPurify', () => {
    render(<DefensePlayground lang="it" />);
    expect(
      screen.getByText(translate('it', 'playground.survives')),
    ).toBeInTheDocument();

    fireEvent.change(
      screen.getByLabelText(translate('it', 'playground.mode')),
      {
        target: { value: 'purify-default' },
      },
    );
    expect(
      screen.getByText(translate('it', 'playground.neutralized')),
    ).toBeInTheDocument();
  });
});
