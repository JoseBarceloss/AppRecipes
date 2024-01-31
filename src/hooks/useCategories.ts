import { useState, useEffect } from 'react';

export const useCategories = (isDrinks: boolean) => {
  const [categories, setCategories] = useState<any[]>([]);

  const endpoint = isDrinks
    ? 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  const param = isDrinks ? 'drinks' : 'meals';

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const result = data[param].slice(0, 5);
      setCategories(result);
    };
    fetchCategories();
  }, []);

  return categories;
};
