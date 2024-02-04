import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import { DoneRecipesProps } from '../../types';
import { doneRecipesStorage } from '../../utils/localstorage';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesProps[]>([]);
  const [msgIndex, setMsgIndex] = useState<number>();
  const [recipeList, setRecipeList] = useState<DoneRecipesProps[]>([]);

  const [meal, setMeal] = useState<DoneRecipesProps[]>([]);
  const [drink, setDrink] = useState<DoneRecipesProps[]>([]);

  useEffect(() => {
    setDoneRecipes(doneRecipesStorage());
    setRecipeList(doneRecipesStorage());
  }, []);

  useEffect(() => {
    doneRecipes.forEach((recipe) => {
      if (recipe.type === 'meal') {
        setMeal((recipeData) => [
          ...recipeData,
          recipe,
        ]);
      } else {
        setDrink((recipeData) => [
          ...recipeData,
          recipe,
        ]);
      }
    });
  }, [doneRecipes]);

  const filterRecipes = (type: string) => {
    if (type === 'meal') {
      setRecipeList(meal);
    } else if (type === 'drink') {
      setRecipeList(drink);
    } else {
      setRecipeList(doneRecipes);
    }
  };

  const shareButton = (id: string, type: string, index: number) => {
    const url = window.location.href;
    const newurl = `${url.slice(0, url.length - 12)}${type}s/${id}`;
    navigator.clipboard.writeText(newurl);
    setMsgIndex(index);
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

        {recipeList.map((recipe, index) => (
          <div key={ recipe.id }>

            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>

            {recipe.type === 'meal' ? (

              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>

            ) : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
            )}

            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

            <button
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => shareButton(recipe.id, recipe.type, index) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src="src/images/shareIcon.svg"
                alt="Share recipe"
              />
            </button>

            {recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
            {index === msgIndex && <span>Link copiado!</span>}
          </div>
        ))}

      </div>
    </div>
  );
}

export default DoneRecipes;
