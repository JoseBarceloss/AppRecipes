import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';
import RecipeDetails from '../Pages/RecipeDetails';

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

describe('Testa o componente Header', () => {
  const PAGE_TITLE_TESTID = 'page-title';

  it('Verifica se o header é renderizado corretamente', () => {
    renderWithRouter(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
  it('Verifica a atualização do título ao navegar para uma rota desconhecida', () => {
    render(
      <MemoryRouter initialEntries={ ['/unknown-route'] }>
        <Header />
      </MemoryRouter>,
    );
    const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);
    expect(pageTitle).toHaveTextContent('');
  });

  it('Verifica a atualização do título ao navegar para uma rota não mapeada', () => {
    const { getByTestId } = renderWithRouter(<Header />, { route: '/unknown-route' });

    const pageTitle = getByTestId(PAGE_TITLE_TESTID);
    expect(pageTitle).toHaveTextContent('');
  });

  it('Verifica exibição do título correto para a rota padrão', () => {
    const { getByTestId } = renderWithRouter(<Header />, { route: '/' });

    const pageTitle = getByTestId(PAGE_TITLE_TESTID);
    expect(pageTitle).toHaveTextContent('');
  });

  it('Verifica exibição do título correto para a rota de bebidas', () => {
    const { getByTestId } = renderWithRouter(<Header />, { route: '/drinks' });

    const pageTitle = getByTestId(PAGE_TITLE_TESTID);
    expect(pageTitle).toHaveTextContent('Drinks');
  });

  it('Verifica se a rota do header para drinks está adequada', () => {
    renderWithRouter(<App />, { route: '/drinks' });
    expect(window.location.pathname).toBe('/drinks');
    const tittle = screen.getByRole('heading', { name: 'Drinks', level: 1 });
    expect(tittle).toBeInTheDocument();
  });

  it('Verifica se a rota do header para DoneRecipes está adequada', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });
    expect(window.location.pathname).toBe('/done-recipes');
    const tittle = screen.getByRole('heading', { name: 'Done Recipes', level: 1 });
    expect(tittle).toBeInTheDocument();
  });

  it('Verifica se a rota do header para meals está adequada', () => {
    renderWithRouter(<App />, { route: '/meals' });
    expect(window.location.pathname).toBe('/meals');
    const tittle = screen.getByRole('heading', { name: 'Meals', level: 1 });
    expect(tittle).toBeInTheDocument();
  });

  it('Verifica rota e exibição do header para favorite-recipes', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });
    expect(window.location.pathname).toBe('/favorite-recipes');
    const tittle = screen.getByRole('heading', { name: 'Favorite Recipes', level: 1 });
    expect(tittle).toBeInTheDocument();
  });

  it('Verifica rota e exibição do header para profile', () => {
    renderWithRouter(<App />, { route: '/profile' });
    expect(window.location.pathname).toBe('/profile');
    const tittle = screen.getByRole('heading', { name: 'Profile', level: 1 });
    expect(tittle).toBeInTheDocument();
  });

  it('Testa o Header nas rotas', async () => {
    const routes = [
      '',
      'meals',
      'drinks',
      'meals/1',
      'drinks/1',
      'meals/1/in-progress',
      'drinks/1/in-progress',
      'profile',
      'done-recipes',
      'favorite-recipes',
    ];
    routes.forEach((route) => {
      render(
        <MemoryRouter initialEntries={ [`/${route}`] }>
          <App />
        </MemoryRouter>,
      );
    });
  });

  it('Verifica se o header renderiza o botão de perfil', () => {
    renderWithRouter(<Header />);
    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });

  describe('Testes Adicionais para o Componente SearchBar', () => {
    it('Renderiza o componente SearchBar', () => {
      render(<SearchBar />);
      const entradaPesquisa = screen.getByTestId('search-input');

      expect(entradaPesquisa).toBeInTheDocument();
    });

    it('Verifica se o componente SearchBar possui um input', () => {
      render(<SearchBar />);
      const entradaPesquisa = screen.getByTestId('search-input');

      expect(entradaPesquisa).toBeInTheDocument();
    });
  });
});
describe('Testa o componente SearchBar', () => {
  it('Renderiza o componente SearchBar', () => {
    render(<SearchBar />);
    const entradaPesquisa = screen.getByTestId('search-input');
    expect(entradaPesquisa).toBeInTheDocument();
  });

  it('Verifica se o componente SearchBar possui um input', () => {
    render(<SearchBar />);
    const entradaPesquisa = screen.getByTestId('search-input');
    expect(entradaPesquisa).toBeInTheDocument();
  });

  it('Verifica se o botão de pesquisa está funcionando corretamente', () => {
    render(<SearchBar />);
    const botaoPesquisa = screen.getByTestId('exec-search-btn');
    expect(botaoPesquisa).toBeInTheDocument();
    fireEvent.click(botaoPesquisa);
  });

  it('Verifica se os botões de rádio estão funcionando corretamente', () => {
    render(<SearchBar />);
    const botaoRadioIngrediente = screen.getByTestId('ingredient-search-radio');
    const botaoRadioNome = screen.getByTestId('name-search-radio');
    const botaoRadioPrimeiraLetra = screen.getByTestId('first-letter-search-radio');
    expect(botaoRadioIngrediente).toBeInTheDocument();
    expect(botaoRadioNome).toBeInTheDocument();
    expect(botaoRadioPrimeiraLetra).toBeInTheDocument();
    fireEvent.click(botaoRadioIngrediente);
    fireEvent.click(botaoRadioNome);
    fireEvent.click(botaoRadioPrimeiraLetra);
  });
});

describe('Componente Footer', () => {
  it('renderiza o footer com estilos corretos', () => {
    render(<Footer />);

    const footer = screen.getByTestId('footer');

    expect(footer).toHaveStyle({
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      backgroundColor: '#f2f2f2',
      textAlign: 'center',
      padding: '10px 0',
      zIndex: '999',
    });
  });

  it('renderiza links de bebidas e refeições com atributos corretos', () => {
    act(() => {
      render(<Footer />);
    });

    const drinksLink = screen.getByTestId('drinks-bottom-btn').closest('a');
    const mealsLink = screen.getByTestId('meals-bottom-btn').closest('a');

    expect(drinksLink).toHaveAttribute('href', '/drinks');
    expect(mealsLink).toHaveAttribute('href', '/meals');
  });
});
