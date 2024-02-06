const fetchFirst12Recipes = async (place: string) => {
  const urlToFetch = place === 'meals' ? ('https://www.themealdb.com/api/json/v1/1/search.php?s=') : ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const response = await fetch(urlToFetch);
  const data: { [x:string]: [] } = await response.json();
  if (data[place]) {
    const first12Recipes = data[place].slice(0, 12);
    return first12Recipes;
  }
};

export default fetchFirst12Recipes;
