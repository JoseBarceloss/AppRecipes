import React, { useEffect, useState } from 'react';
import './RecipeDetails.css';
import { useNavigate } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

interface DataProp {
  strMeal: string;
  strDrink: string;
  strMealThumb: string;
  strDrinkThumb: string;
  strCategory: string;
  strAlcoholic: string;
  strInstructions: string;
  strYoutube: string | null;
  [index: string]: any;
}

function RecipeDetails() {
  const [recipeData, setRecipeData] = useState<DataProp | null>(null);
  const [recommendationData, setRecommendationData] = useState<DataProp[]>([]);
  const [recipeDone, setRecipeDone] = useState<boolean>(false);
  const [recipeInProgress, setRecipeInProgress] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [linkCopiedMessage, setLinkCopiedMessage] = useState<boolean>(false);

  const fetchRecommendation = async () => {
    const recommendationApiUrl = window.location.pathname.split('/')[1] === 'meals'
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const recommendationResult = await fetch(recommendationApiUrl);
    const recommendationResponse = await recommendationResult.json();

    setRecommendationData(
      recommendationResponse.drinks
        ? recommendationResponse.drinks.slice(0, 6)
        : recommendationResponse.meals.slice(0, 6),
    );
  };

  const navigate = useNavigate();

  const fetchData = async () => {
    const id = window.location.pathname.split('/')[2];
    let apiUrl;

    if (window.location.pathname.split('/')[1] === 'meals') {
      apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }

    const result = await fetch(apiUrl);
    const response = await result.json();
    setRecipeData(response.meals ? response.meals[0] : response.drinks[0]);
  };

  useEffect(() => {
    fetchData();
    const checkDone = () => {
      const inProgressRecipes = localStorage.getItem('inProgressRecipes');
      if (inProgressRecipes) {
        const page = window.location.pathname.split('/')[1];
        const Name = JSON.parse(inProgressRecipes)[page];
        const bolean = Object.keys(Name).includes(window.location.pathname.split('/')[2]);
        setRecipeInProgress(bolean);
      }
    };
    checkDone();
  }, []);

  useEffect(() => {
    if (recipeData) {
      fetchRecommendation();
    }
  }, [recipeData]);

  const copyToClipboard = () => {
    const recipeLink = window.location.href;

    navigator.clipboard.writeText(recipeLink).then(() => {
      setLinkCopiedMessage(true);
      setTimeout(() => {
        setLinkCopiedMessage(false);
      }, 3000);
    });
  };

  console.log(recipeData);

  // const saveLocalStorage = (recipeData: Array<any>) => {
  //   const saveRecipes = recipeData.map((recipe) => ({
  //     id: window.location.pathname.split('/')[2],
  //     type: window.location.pathname.split('/')[1],
  //     nationality: recipe.

  //   }));
  // }

  return (
    <div>
      {linkCopiedMessage && <p data-testid="link-copied-message">Link copied!</p>}
      {recipeData ? (
        <div>
          <h1 data-testid="recipe-title">{recipeData.strMeal || recipeData.strDrink}</h1>
          <img
            src={ recipeData.strMealThumb || recipeData.strDrinkThumb }
            alt={ recipeData.strMealThumb || recipeData.strDrinkThumb }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-category">
            {window.location.pathname.split('/')[1] === 'meals'
              ? `Categoria: ${recipeData.strCategory}`
              : `Alcoólica: ${recipeData.strAlcoholic
              === 'Alcoholic' ? 'Alcoholic' : 'Não'}`}
          </h2>
          <h3>Ingredientes:</h3>
          <ul>
            {Object.keys(recipeData)
              .filter((key) => key.includes('strIngredient') && recipeData[key])
              .map((key, index) => (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {recipeData[key]}
                  {' '}
                  -
                  {recipeData[`strMeasure${index + 1}` as keyof DataProp]}
                </li>
              ))}
          </ul>
          <p data-testid="instructions">{recipeData.strInstructions}</p>
          {window.location.pathname.split('/')[1]
          === 'meals' && recipeData.strYoutube && (
            <div>
              <h3>Vídeo:</h3>
              <iframe
                width="560"
                height="315"
                src={ `https://www.youtube.com/embed/${recipeData.strYoutube.split('v=')[1]}` }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay;
                clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="video"
              />
            </div>
          )}
          {recommendationData.length > 0 && (
            <div className="recommendation-container">
              <h3>Recomendações:</h3>
              <div className="recommendation-carousel">
                {recommendationData.map((recommendation, index) => (
                  <div
                    key={ index }
                    data-testid={ `${index}-recommendation-card` }
                    className="recommendation-card"
                  >
                    <p data-testid={ `${index}-recommendation-title` }>
                      {recommendation.strMeal || recommendation.strDrink}
                    </p>
                    <img
                      src={ recommendation.strMealThumb || recommendation.strDrinkThumb }
                      alt={ recommendation.strMealThumb || recommendation.strDrinkThumb }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
      {recipeDone ? null : (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          onClick={ () => {
            navigate(`/${window.location.pathname
              .split('/')[1]}/${window.location.pathname.split('/')[2]}/in-progress`);
          } }
        >
          {recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
      <button data-testid="share-btn" onClick={ copyToClipboard }>
        <img src={ shareIcon } alt="Share icon" />
        Compartilhar
      </button>
      <button data-testid="favorite-btn">favoritar</button>
    </div>
  );
}

export default RecipeDetails;
