import React, { useState } from 'react';
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
  const handleRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
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
                checked={ searchOption === 'ingredient' }
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
                checked={ searchOption === 'name' }
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
                checked={ searchOption === 'first-letter' }
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
