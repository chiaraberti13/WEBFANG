import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { RecipeBoard } from './RecipeBoard.tsx';
import { translate } from '../i18n/index.ts';

const t = (key: string) => translate('it', key);

describe('RecipeBoard', () => {
  it('starts empty with a guiding hint', () => {
    render(<RecipeBoard lang="it" />);
    expect(screen.getByText(t('recipe.empty'))).toBeInTheDocument();
  });

  it('adds a step and runs the chain end-to-end', async () => {
    render(<RecipeBoard lang="it" />);
    fireEvent.click(screen.getByRole('button', { name: /Aggiungi passaggio/ }));
    // default input "WebFang" + base64-encode → V2ViRmFuZw==
    expect(await screen.findAllByText('V2ViRmFuZw==')).not.toHaveLength(0);
    expect(screen.getByText(t('recipe.finalOutput'))).toBeInTheDocument();
  });

  it('undoes an added step back to the empty state', () => {
    render(<RecipeBoard lang="it" />);
    fireEvent.click(screen.getByRole('button', { name: /Aggiungi passaggio/ }));
    expect(screen.queryByText(t('recipe.empty'))).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Annulla/ }));
    expect(screen.getByText(t('recipe.empty'))).toBeInTheDocument();
  });

  it('shows the defense panel for the last step', async () => {
    render(<RecipeBoard lang="it" />);
    fireEvent.click(screen.getByRole('button', { name: /Aggiungi passaggio/ }));
    await screen.findAllByText('V2ViRmFuZw==');
    expect(
      screen.getByRole('region', { name: translate('it', 'defense.title') }),
    ).toBeInTheDocument();
  });
});
