import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa página de Login', () => {
  it('Verifica se a página Login renderiza o formulário de usuário corretamente e se comporta como o esperado', async () => {
    renderWithRouter(<App />);
    const user = userEvent.setup();

    const emailType = 'test@test.com';
    const passwordType = 'senha123@';

    const email = screen.getByLabelText(/email:/i);
    expect(email).toBeInTheDocument();

    const password = screen.getByLabelText(/senha:/i);
    expect(password).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();

    expect(button).toBeDisabled();

    await user.type(email, emailType);
    await user.type(password, passwordType);

    expect(button).toBeEnabled();

    await user.click(button);
  });
});
