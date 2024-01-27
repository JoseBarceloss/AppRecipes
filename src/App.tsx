import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Login from './Pages/Login';
import Recipes from './Pages/Recipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Profile from './Pages/Profile';
import RecipeDetails from './Pages/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';
import DoneRecipes from './Pages/Done Recipes';
import Provider from './context/AppRecipesProvider';

function App() {
  return (
    <Provider>

      <div>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/meals" element={ <Recipes /> } />
          <Route path="/drinks" element={ <Recipes /> } />
          <Route path="/meals/:id" element={ <RecipeDetails /> } />
          <Route path="/drinks/:id" element={ <RecipeDetails /> } />
          <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
          <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
          <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="*" element={ <h1>Not Found</h1> } />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
