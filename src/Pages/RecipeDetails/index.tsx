import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeDetails.css';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { DataProp } from '../../types';

function RecipeDetails() {
  const [recipeData, setRecipeData] = useState<DataProp | null>(null);
  const [recommendationData, setRecommendationData] = useState<DataProp[]>([]);
  const [recipeDone, setRecipeDone] = useState<boolean>(false);
  const [recipeInProgress, setRecipeInProgress] = useState<boolean>(false);
  const [linkCopiedMessage, setLinkCopiedMessage] = useState<boolean>(false);
  const [favoritado, setFavoritado] = useState(false);

  const fetchRecommendation = async () => {
    const recommendationApiUrl = window.location.pathname.split('/')[1] === 'meals'
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const recommendationResult = await fetch(recommendationApiUrl);
    const recommendationResponse = await recommendationResult.json();
    console.log(recommendationResponse);

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

    try {
      const result = await fetch(apiUrl);

      if (!result.ok) {
        throw new Error(`Error fetching data: ${result.statusText}`);
      }

      const response = await result.json();

      if (response.meals || response.drinks) {
        setRecipeData(response.meals ? response.meals[0] : response.drinks[0]);
      } else {
        console.error('Invalid response:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const checkDone = () => {
      const inProgressRecipes = localStorage.getItem('inProgressRecipes');
      if (inProgressRecipes) {
        const page = window.location.pathname.split('/')[1];
        const Name = JSON.parse(inProgressRecipes)[page];
        if (Name) {
          const bolean = Object.keys(Name)
            .includes(window.location.pathname.split('/')[2]);
          setRecipeInProgress(bolean);
        }
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

  useEffect(() => {
    const fetchDataAndCheckStatus = async () => {
      await fetchData();
      const receitasFavoritas = JSON
        .parse(localStorage.getItem('favoriteRecipes') || '[]');
      const isFavorite = receitasFavoritas
        .some((recipe: any) => recipe.id === criarObjetoDeReceita().id);
      setFavoritado(isFavorite);
      const inProgressRecipes = JSON.parse(localStorage
        .getItem('inProgressRecipes') || '{}');
      const page = window.location.pathname.split('/')[1];
      const bolean = Object.keys(inProgressRecipes[page] || {})
        .includes(window.location.pathname.split('/')[2]);
      setRecipeInProgress(bolean);
    };
    fetchDataAndCheckStatus();
  }, []);

  const toggleFavorito = () => {
    const receitaFavorita = criarObjetoDeReceita();
    const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    const novaListaFavorita = favoritado
      ? receitasFavoritas.filter((recipe: any) => recipe.id !== receitaFavorita.id)
      : [...receitasFavoritas, receitaFavorita];

    localStorage.setItem('favoriteRecipes', JSON.stringify(novaListaFavorita));
    setFavoritado(!favoritado);
  };
  function criarObjetoDeReceita() {
    const data = recipeData;
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
  }
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
      <button onClick={ toggleFavorito }>
        {favoritado ? (
          <img
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            alt="Favorito preenchido"
          />
        ) : (
          <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="Favorito vazio" />
        )}
      </button>
    </div>
  );
}
export default RecipeDetails;
