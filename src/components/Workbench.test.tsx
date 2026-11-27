import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Workbench } from './Workbench.tsx';
import { translate } from '../i18n/index.ts';

function setInput(value: string) {
  const textarea = screen.getByLabelText(
    translate('it', 'app.inputLabel'),
  ) as HTMLTextAreaElement;
  fireEvent.change(textarea, { target: { value } });
}

function selectOperation(id: string) {
  const select = screen.getByLabelText(translate('it', 'app.operationLabel'));
  fireEvent.change(select, { target: { value: id } });
}

describe('Workbench', () => {
  it('encodes the default input to Base64 end-to-end', async () => {
    render(<Workbench lang="it" />);
    expect(await screen.findByText('V2ViRmFuZw==')).toBeInTheDocument();
  });

  it('decodes a valid Base64 string back to text', async () => {
    render(<Workbench lang="it" />);
    selectOperation('base64-decode');
    setInput('Zm9v');
    expect(await screen.findByText('foo')).toBeInTheDocument();
  });

  it('shows a gentle, structured error on invalid Base64 input', async () => {
    render(<Workbench lang="it" />);
    selectOperation('base64-decode');
    setInput('@@@invalid');
    const alert = await screen.findByRole('alert');
    expect(alert.textContent ?? '').not.toMatch(/WfError|stack|undefined/i);
    expect(alert.textContent ?? '').toMatch(/Decodifica fallita/);
  });

  it('shows the defense panel next to the operation', () => {
    render(<Workbench lang="it" />);
    expect(
      screen.getByRole('region', { name: translate('it', 'defense.title') }),
    ).toBeInTheDocument();
  });
});
