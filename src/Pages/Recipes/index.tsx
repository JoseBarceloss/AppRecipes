import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import { Recipe } from '../../types';
import Footer from '../../Components/Footer';

import Header from '../../Components/Header';

import FilterButtons from '../../Components/FilterButtons';
import fetchFirst12Recipes from '../../utils/fetchFirst12Recipes';


function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesKey, setRecipesKeys] = useState({ image: '', name: '', id: '' });
  // const navigate = useNavigate();
  const { name, image, id } = recipesKey;
  const place = window.location.pathname.split('/')[1];

  const set12First = async () => {
    const TwelveFirst = await fetchFirst12Recipes(place);
    setRecipes(TwelveFirst);
  };

  useEffect(() => {
    set12First();
    const actualImage = place === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
    const actualName = place === 'meals' ? 'strMeal' : 'strDrink';
    const actaulID = place === 'meals' ? 'idMeal' : 'idDrink';

    setRecipesKeys({
      image: actualImage,
      name: actualName,
      id: actaulID,
    });
  }, [place]);

  return (
    <div>
      <Header setRecipes={ setRecipes } />
      <FilterButtons
        place={ place }
        setRecipes={ setRecipes }
        set12First={ set12First }
      />
      {recipes.map((recipe, index) => (
        <Link
          to={ `/${place}/${recipe[id]}` }
          key={ index }
          // onClick={ () => navigate(`/${place}/${recipe[id]}`) }
          data-testid={ `${index}-recipe-card` }
        >
          <p data-testid={ `${index}-card-name` }>{recipe[name]}</p>
          <img
            src={ recipe[image] }
            alt="Foto da receita"
            data-testid={ `${index}-card-img` }
          />
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default Recipes;
