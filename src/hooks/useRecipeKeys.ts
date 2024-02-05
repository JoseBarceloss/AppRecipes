const useRecipeKeys = (place: string) => {
  const recipeKeys = {
    name: place === 'meals' ? 'strMeal' : 'strDrink',
    id: place === 'meals' ? 'strMeal' : 'strDrink',
    image: place === 'meals' ? 'strMealThumb' : 'strDrinkThumb',
    category: 'strCategory',
    ingredients: 'strIngredient',
    instructions: 'strInstructions',
    video: place === 'meals' ? 'strYoutube' : null,
  };

  return recipeKeys;
};

export default useRecipeKeys;
