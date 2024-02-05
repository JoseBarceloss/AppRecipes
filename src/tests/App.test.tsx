import { RenderResult, render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Login from '../Pages/Login';
import Header from '../Components/Header';
import Profile from '../Pages/Profile';
import RecipeDetails from '../Pages/RecipeDetails';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

describe('Componente de login', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
  });

  it(' deve renderizar o input de email com o atributo data-testid".', () => {
    const emailInput = component.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  it('deve renderizar o input de senha com o atributo data-testid', () => {
    const passwordInput = component.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  it('deve renderizar o botão de submit do login com o atributo data-testid', () => {
    const submitButton = component.getByTestId('login-submit-btn');
    expect(submitButton).toBeInTheDocument();
  });
});

describe('Login component validation', () => {
  let component: RenderResult;
  let emailInput: Node | Window;
  let submitButton: Node | Window;
  let passwordInput: Node | Window;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    emailInput = component.getByTestId('email-input');
    submitButton = component.getByTestId('login-submit-btn');
    passwordInput = component.getByTestId('password-input');
  });

  it('deve desabilitar o botão de submit quando o email é inválido', () => {
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });

    expect(submitButton).toBeDisabled();
  });

  it('deve desabilita o botão de submit quando a senha tem 6 caracteres ou menos', () => {
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(submitButton).toBeDisabled();
  });

  it('deve habilitar o botão de submit quando o email e a senha são válidos', () => {
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
  });
});

describe('90% tela profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify([{ email: '' }]));
  });
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );
  });
  it('botao recipes', async () => {
    const doneRecipesButton = screen.getByTestId('profile-done-btn');

    await userEvent.click(doneRecipesButton);
  });
  it('testa botao favorito', async () => {
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    await userEvent.click(favoriteRecipesButton);
  });
  it('testa botao logout', async () => {
    const logoutButton = screen.getByTestId('profile-logout-btn');
    await userEvent.click(logoutButton);
  });
});

describe('Header', () => {
  it('Verifica se o botão de perfil está renderizado', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Header />
      </MemoryRouter>,
    );

    const profileButton = screen.getByTestId('profile-top-btn');

    expect(profileButton).toBeInTheDocument();
  });

  it('Verifica se o título da página é "Meals" para a rota /meals', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('page-title')).toHaveTextContent('Meals');
  });

  it('Verifica se o título da página é "Drinks" para a rota /drinks', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('page-title')).toHaveTextContent('Drinks');
  });
});
