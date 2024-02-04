import { useEffect, useState } from 'react';
import { DataProp, Ingredient } from '../../types';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState<DataProp | null>(null);
  const [recipeType, setRecipeType] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const recipeId = window.location.pathname.split('/')[2];

  const getIngredients = (obj:any) => {
    const ingArray = [];
    for (let index = 1; index <= 20; index++) {
      if (typeof obj[`strIngredient${index}`] === 'string') {
        ingArray.push(obj[`strIngredient${index}`]);
      }
    }
    setIngredients(ingArray);
  };

  useEffect(() => {
    const fetchApi = async () => {
      if (window.location.pathname.includes('drinks')) {
        const getDrink = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
        );
        const drinkData = await getDrink.json();
        getIngredients(drinkData.drinks[0]);
        console.log(drinkData.drinks[0]);

        setRecipeType('drinks');
        setRecipe(drinkData.drinks[0]);
      }
      if (window.location.pathname.includes('meals')) {
        const getMeal = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
        );
        const mealData = await getMeal.json();
        getIngredients(mealData.meals[0]);
        setRecipeType('meals');
        setRecipe(mealData.meals[0]);
      }
    };
    fetchApi();
  }, []);

  return (
    <section>
      <img
        src={ recipeType === 'meals' ? recipe?.strMealThumb : recipe?.strDrinkThumb }
        alt="foto da receita"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        {recipeType === 'meals' ? recipe?.strMeal : recipe?.strDrink}
      </h1>
      <h2 data-testid="recipe-category">{recipe?.strCategory}</h2>
      <p data-testid="instructions">{recipe?.strInstructions}</p>
      {ingredients.filter((ingr:any) => ingr !== '').map((ing:any, index:any) => (
        <label key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            type="checkbox"
            onClick={ ({ target }:any) => {
              if (target.checked) {
                target
                  .parentNode
                  .style.textDecoration = 'line-through solid rgb(0, 0, 0)';
              }
              if (!target.checked) {
                target
                  .parentNode
                  .style.textDecoration = '';
              }
              console.log(target.checked);
            } }
          />
          {ing}
        </label>
      ))}
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </section>
  );
}

export default RecipeInProgress;
