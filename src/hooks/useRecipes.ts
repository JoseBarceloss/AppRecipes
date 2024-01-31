import { useEffect, useState } from 'react';

export const useRecipes = (isDrinks: boolean) => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const endpoint = isDrinks
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const param = isDrinks ? 'drinks' : 'meals';

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const result = data[param].slice(0, 12);
      setRecipes(result);
    };
    fetchRecipes();
  }, []);

  return { recipes, setRecipes };
};
