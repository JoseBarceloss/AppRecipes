import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';
import { useCategories } from '../../hooks/useCategories';
import Footer from '../../Components/Footer';

function Recipes({ isDrinks }: { isDrinks: boolean }) {
  const { recipes, setRecipes } = useRecipes(isDrinks);
  const categories = useCategories(isDrinks);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [initialRecipes, setInitialRecipes] = useState<any[]>([]);

  const handleClick = (event: any) => {
    const category = event.target.value;
    setSelectedCategory((prevCategory) => (prevCategory === category
      ? handleClearFilter() : category));
  };

  const handleClearFilter = () => {
    setSelectedCategory('');
    setRecipes(initialRecipes);
  };

  useEffect(() => {
    if (selectedCategory === '') return;
    if (isDrinks) {
      setInitialRecipes(recipes);
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`,
      )
        .then((response) => response.json())
        .then((data) => data.drinks.slice(0, 12))
        .then((data) => setRecipes(data));
    } else {
      setInitialRecipes(recipes);
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`,
      )
        .then((response) => response.json())
        .then((data) => data.meals.slice(0, 12))
        .then((data) => setRecipes(data));
    }
  }, [selectedCategory]);

  if (isDrinks) {
    return (
      <div>
        <h1>Drinks</h1>
        {categories.map((category, index) => (
          <button
            key={ index }
            type="button"
            value={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ handleClick }
          >
            {category.strCategory}
          </button>
        ))}
        <button data-testid="All-category-filter" onClick={ handleClearFilter }>
          All
        </button>
        {recipes.map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idDrink }>
            <Link to={ `/drinks/${recipe.idDrink}` }>
              <h1 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h1>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
              />
            </Link>
          </div>
        ))}
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <h1>Meals</h1>
      {categories.map((category, index) => (
        <button
          key={ index }
          type="button"
          value={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {category.strCategory}
        </button>
      ))}
      <button data-testid="All-category-filter" onClick={ handleClearFilter }>
        All
      </button>
      {recipes.map((recipe, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ recipe.idMeal }>
          <Link to={ `/meals/${recipe.idMeal}` }>
            <h1 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h1>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
          </Link>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Recipes;
