import { createContext } from 'react';

type RecipesContextType = {
  recipes:any;
  setRecipes:any;
};

const RecipesContext = createContext({} as RecipesContextType);

export default RecipesContext;
