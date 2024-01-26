import React, { useContext, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import RecipesContext from '../../context/AppRecipesContext';
import searchIcon from '../../images/searchIcon.svg';

function SearchBar() {
  /**
  |--------------------------------------------------
  | ESTADOS
  |--------------------------------------------------
  */
  const [searchInput, setSearchInput] = useState(false);
  const [searchOption, setSearchOption] = useState('');
  const [searchData, setSearchData] = useState('');
  const { recipes, setRecipes } = useContext(RecipesContext);
  // const location = useLocation();
  // const navigate = useNavigate();
  /**
|--------------------------------------------------
| CONSTANTES
|--------------------------------------------------
*/
  // const ALERT_MESSAGE_FOUND = "Sorry, we haven't found any recipes for these filters.";
  const ALERT_MESSAGE_ONE_CHAR = 'Your search must have only 1 (one) character';
  const FIRST_LETTER = 'first-letter';
  const INGREDIENT = 'ingredient';
  const NAME = 'name';
  /**
|--------------------------------------------------
| Funções
|--------------------------------------------------
*/
  const handleRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };
  const handleSearch = async () => {
    if (searchOption === FIRST_LETTER && searchData.length !== 1) {
      window.alert(ALERT_MESSAGE_ONE_CHAR);
      return;
    }

    let endpoint = '';
    if (searchOption === INGREDIENT) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchData}`;
    } else if (searchOption === NAME) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`;
    } else if (searchOption === FIRST_LETTER) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchData}`;
    }
    console.log(endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error) {
      console.error(error);
    }
    console.log(recipes);
  };
  return (
    <div>
      {searchInput && (
        <div>
          <div>
            <input
              type="text"
              id="search"
              data-testid="search-input"
              placeholder="Search"
              value={ searchData }
              onChange={ (e) => setSearchData(e.target.value) }
            />
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ handleSearch }
            >
              Search
            </button>
          </div>
          <div>
            <label>
              <input
                type="radio"
                id="ingredient-search-radio"
                data-testid="ingredient-search-radio"
                placeholder="Search"
                value="ingredient"
                checked={ searchOption === INGREDIENT }
                onChange={ handleRadioButton }
              />
              Search by ingredient
            </label>
            <label>
              <input
                type="radio"
                id="name"
                data-testid="name-search-radio"
                placeholder="Search"
                value="name"
                checked={ searchOption === NAME }
                onChange={ handleRadioButton }
              />
              Search by name
            </label>
            <label>
              <input
                type="radio"
                id="first-letter"
                data-testid="first-letter-search-radio"
                placeholder="Search"
                value="first-letter"
                checked={ searchOption === FIRST_LETTER }
                onChange={ handleRadioButton }
              />
              Search by first letter
            </label>
          </div>
        </div>
      )}
      <button
        onClick={ () => setSearchInput(!searchInput) }
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search icon"
        />
      </button>
    </div>
  );
}

export default SearchBar;
