import { useEffect, useState } from 'react';
import { DataProp, Ingredient } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './index.css';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState<DataProp | null>(null);
  const [recipeType, setRecipeType] = useState('');
  const [ingredients, setIngredients] = useState<any>([]);
  const [markedIngs, setMarkedIngs] = useState<any>([]);
  const [linkCopiedMessage, setLinkCopiedMessage] = useState<boolean>(false);
  const [favoritado, setFavoritado] = useState(false);
  const [favRecipe, setFavRecipe] = useState<any>([]);

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

  const handleFinishDisable = () => {
    // const getCheckboxs = document.querySelectorAll('markcheckbox');
    // const verificaChecados = getCheckboxs.every((item) => item.checked);
    // console.log(verificaChecados);
    console.log();
  };

  const getStoredMarkedIngs = () => {
    const getList = JSON.parse(localStorage.getItem('markedItens') || '[]');
    setMarkedIngs(getList);
  };

  const getStoredFav = () => {
    const getFav = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavRecipe(getFav);
    if (getFav.length > 0) {
      setFavoritado(true);
    }
    if (getFav.length === 0) {
      setFavoritado(false);
    }
  };

  const copyToClipboard = () => {
    const recipeLink = window.location.href.split('/in-progress')[0];
    navigator.clipboard.writeText(recipeLink).then(() => {
      setLinkCopiedMessage(true);
      setTimeout(() => {
        setLinkCopiedMessage(false);
      }, 3000);
    });
  };

  const criarObjetoDeReceita = () => {
    const data = recipe;

    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth() + 1;
    const ano = hoje.getFullYear();

    const dataAtualFormatada = `${ano}-${mes < 10 ? `0${mes}`
      : mes}-${dia < 10 ? `0${dia}` : dia}`;

    return {
      id: window.location.pathname.split('/')[2],
      type: window.location.pathname.split('/')[1] === 'meals' ? 'meal' : 'drink',
      nationality: data?.strArea || '',
      category: data?.strCategory || '',
      alcoholicOrNot: data?.strAlcoholic || '',
      name: data?.strDrink || data?.strMeal,
      image: data?.strDrinkThumb || data?.strMealThumb,
    };
  };

  const toggleFavorito = () => {
    const receitaFavorita = criarObjetoDeReceita();
    const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const novaListaFavorita = favoritado
      ? receitasFavoritas.filter((recip: any) => recip.id !== receitaFavorita.id)
      : [...receitasFavoritas, receitaFavorita];
    localStorage.setItem('favoriteRecipes', JSON.stringify(novaListaFavorita));
    setFavoritado(!favoritado);
  };

  useEffect(() => {
    const fetchApi = async () => {
      if (window.location.pathname.includes('drinks')) {
        const getDrink = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
        );
        const drinkData = await getDrink.json();
        getIngredients(drinkData.drinks[0]);
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
    getStoredMarkedIngs();
    getStoredFav();
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
      { ingredients.filter((ingr:any) => ingr !== '').map((ing:any, index:any) => (
        <label key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            name={ ing }
            id="markcheckbox"
            className="markcheckbox"
            type="checkbox"
            checked={ markedIngs.some((markedName:any) => markedName === ing) }
            onClick={ ({ target }:any) => {
              if (target.checked) {
                target
                  .parentNode
                  .style
                  .textDecoration = 'line-through solid rgb(0, 0, 0)';
                const markedItens = [...markedIngs, ing];
                setMarkedIngs(markedItens);
                localStorage.setItem('markedItens', JSON.stringify(markedItens));
              }
              if (!target.checked) {
                target.parentNode.style.textDecoration = 'none';
                const filterIngs = markedIngs.filter((marked:string) => marked !== ing);
                setMarkedIngs(filterIngs);
                localStorage.setItem('markedItens', JSON.stringify(filterIngs));
              }
            } }
          />
          {ing}
        </label>
      ))}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copyToClipboard }
      >
        <img src={ shareIcon } alt="Share icon" />
        Compartilhar
      </button>
      {linkCopiedMessage && <p data-testid="link-copied-message">Link copied!</p>}
      <button onClick={ toggleFavorito }>
        <img
          data-testid="favorite-btn"
          src={ favoritado ? blackHeartIcon : whiteHeartIcon }
          alt={ favoritado ? 'black-heart' : 'white-heart' }
        />
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={
          markedIngs.length < ingredients.filter((ing:any) => ing !== '').length
}
        onClick={ handleFinishDisable }
      >
        Finalizar
      </button>
    </section>
  );
}

export default RecipeInProgress;
