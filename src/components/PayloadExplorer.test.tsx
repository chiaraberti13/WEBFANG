import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { PayloadExplorer } from './PayloadExplorer.tsx';
import { translate } from '../i18n/index.ts';

function Harness() {
  const [id, setId] = useState('sqli');
  return <PayloadExplorer lang="it" packId={id} onPackChange={setId} />;
}

describe('PayloadExplorer', () => {
  it('shows inert payloads for the default pack and the defense panel', () => {
    render(<Harness />);
    expect(screen.getByText("' OR 1=1--")).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: translate('it', 'defense.title') }),
    ).toBeInTheDocument();
  });

  it('switches payloads when the family changes', () => {
    render(<Harness />);
    fireEvent.change(screen.getByLabelText(translate('it', 'payloads.pick')), {
      target: { value: 'ssti' },
    });
    expect(screen.getByText('{{7*7}}')).toBeInTheDocument();
  });
});
