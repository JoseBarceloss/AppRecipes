import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import { DoneRecipesProps } from '../../types';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesProps[]>();

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setDoneRecipes(doneRecipesStorage);
  }, []);

  const filterRecipes = (type: string) => {
    if (type === 'all') {
      const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      setDoneRecipes(doneRecipesStorage);
    } else {
      const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      const filteredRecipes = doneRecipesStorage.filter(
        (recipe: any) => recipe.type === type,
      );
      setDoneRecipes(filteredRecipes);
    }
  };

  return (
    <div>
      <Header />
      <div>

        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drink') }
        >
          Drinks
        </button>

        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => filterRecipes('meal') }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('all') }
        >
          All
        </button>

        {/* Renderização das receitas */}

        {doneRecipes && doneRecipes.map((recipe: DoneRecipesProps, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

            <button data-testid={ `${index}-horizontal-share-btn` }>Share</button>

            {recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}

          </div>
        ))}

      </div>
    </div>
  );
}

export default DoneRecipes;
