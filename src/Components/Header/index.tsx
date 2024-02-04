import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import iconPerfil from '../../images/profileIcon.svg';
// import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import { Recipe } from '../../types';
// import { pathsWithoutSearchIcon } from '../../types';

type HeaderProps = {
  setRecipes?: React.Dispatch<React.SetStateAction<Recipe[]>> | null
};

function Header({ setRecipes = null }: HeaderProps) {
  // const [searchInput, setSearchInput] = React.useState(false); retirado do componente
  const [titlePage, setTitlePage] = useState('');
  const { pathname } = useLocation();
  /**
|--------------------------------------------------
| A função abaixo verifica se o pathname é diferente de /profile, /done-recipes e /favorite-recipes
| e se sim retorna True, caso contrário retorna False
|--------------------------------------------------
*/
  const shouldShowSearchIcon = () => {
    return !['/profile', '/done-recipes', '/favorite-recipes'].includes(pathname);
  };

  useEffect(() => {
    switch (pathname) {
      case '/drinks':
        setTitlePage('Drinks');
        break;
      case '/meals':
        setTitlePage('Meals');
        break;
      case '/profile':
        setTitlePage('Profile');
        break;
      case '/done-recipes':
        setTitlePage('Done Recipes');
        break;
      case '/favorite-recipes':
        setTitlePage('Favorite Recipes');
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <header>
      <div>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ iconPerfil }
            alt="Imagem do Perfil"
          />
        </Link>
        {/* Alterei a posição do título que estava antes do botão pesquisar */}

        {(pathname === '/meals'
          || pathname === '/drinks')
          ? (<h1 data-testid="page-title">{titlePage}</h1>)
          : (<h1 data-testid="page-title">{titlePage}</h1>)}
        {shouldShowSearchIcon() && (
          <span>
            <SearchBar setRecipes={ setRecipes } />
          </span>
        )}
      </div>
      {/* Alterei a lógica da barra de pesquisa e passei a responsabilidade para o componente SearchBar */}
    </header>
  );
}

export default Header;
