import { RenderResult, render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, json } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import Login from '../Pages/Login';
import Header from '../Components/Header';
import Profile from '../Pages/Profile';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';
import Recipes from '../Pages/Recipes';
import mealsByIngredient from './mocks/meals.mock';
import renderWithRouter from './helpers/renderWithRouter';

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

describe('SearchBar', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mealsByIngredient),
    });
    window.alert = vi.fn(() => {});
  });
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('testar botao lupa SearchBar', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    await userEvent.click(searchBtn);
    const input1 = screen.getByTestId('ingredient-search-radio');
    const input2 = screen.getByTestId('name-search-radio');
    const input3 = screen.getByTestId('first-letter-search-radio');
    const btn = screen.getByTestId('exec-search-btn');
    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(input3).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
  it('Testa o ingrediente', async () => {
    renderWithRouter(<App />, { route: '/meals' });
    const searchBtn = screen.getByTestId('search-top-btn');
    await userEvent.click(searchBtn);
    const search = screen.getByTestId('search-input');
    await userEvent.type(search, 'Chicken');
    const input1 = screen.getByTestId('ingredient-search-radio');
    await userEvent.click(input1);
    const btn = screen.getByTestId('exec-search-btn');
    await userEvent.click(btn);
    expect(await screen.findByText('Chicken Congee')).toBeInTheDocument();
  });

  it('testa o alert', async () => {
    vi.spyOn(window, 'alert');
    renderWithRouter(<App />, { route: '/meals' });
    const searchBtn = screen.getByTestId('search-top-btn');
    await userEvent.click(searchBtn);
    const search = screen.getByTestId('search-input');
    await userEvent.type(search, 'asdasasdasdasd');
    const input3 = screen.getByTestId('first-letter-search-radio');
    await userEvent.click(input3);
    const btn = screen.getByTestId('exec-search-btn');
    await userEvent.click(btn);
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});
