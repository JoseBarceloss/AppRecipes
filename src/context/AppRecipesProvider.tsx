import React, { useState } from 'react';
import RecipesContext from './AppRecipesContext';

type ProviderProps = {
  children: React.ReactNode;
};

function Provider({ children }: ProviderProps) {
  const [recipes, setRecipes] = useState([]);

  const info = {
    recipes,
    setRecipes,
  };

  return (
    <RecipesContext.Provider value={ info }>
      <div>
        { children }
      </div>
    </RecipesContext.Provider>
  );
}

export default Provider;
