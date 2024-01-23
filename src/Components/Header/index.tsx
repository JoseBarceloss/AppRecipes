import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import iconPerfil from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';

function Header() {
  const [searchInput, setSearchInput] = React.useState(false);
  const [titlePage, setTitlePage] = React.useState('');
  const location = useLocation();
  React.useEffect(() => {
    switch (location.pathname) {
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
  }, [location.pathname]);

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
        {(location.pathname === '/meals'
          || location.pathname === '/drinks') && (
            <button
              onClick={ () => {
                setSearchInput(!searchInput);
              } }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="searchIcon"
              />
            </button>
        )}
      </div>
      <h1 data-testid="page-title">{titlePage}</h1>
      {searchInput && <SearchBar />}
    </header>
  );
}

export default Header;
