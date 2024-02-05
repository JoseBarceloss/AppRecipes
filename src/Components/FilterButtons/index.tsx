import { useEffect, useState } from 'react';
import { Recipe } from '../../types';

type FilterButtonsProps = {
  place: string,
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
  set12First: () => void;
};

function FilterButtons({ place, setRecipes, set12First }: FilterButtonsProps) {
  const [buttonCategory, setButtonCategory] = useState('');
  const [categories, setCategories] = useState<{ strCategory: string }[]>([]);
  const urlToFetch = `https://www.the${place === 'meals' ? 'meal' : 'cocktail'}db.com/api/json/v1/1/list.php?c=list`;

  const fetchCategories = async () => {
    const response = await fetch(urlToFetch);
    const data = await response.json();
    setCategories([...data[place].slice(0, 5), { strCategory: 'All' }]);
  };

  const fetchRecipesCategory = async (category: string) => {
    if (category === 'All') {
      set12First();
      setButtonCategory('');
      return;
    }
    const response = await fetch(`https://www.the${place === 'meals' ? 'meal' : 'cocktail'}db.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    if (category === buttonCategory) {
      set12First();
      setButtonCategory('');
    } else {
      setButtonCategory(category);
      setRecipes(data[place].slice(0, 12));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [place]);

  return (
    <div>
      {categories.map((category) => (
        <button
          key={ category.strCategory }
          onClick={ () => fetchRecipesCategory(category.strCategory) }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
