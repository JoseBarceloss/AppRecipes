import { DoneRecipesProps } from '../types';

export function doneRecipesStorage() {
  return JSON.parse(localStorage.getItem('doneRecipes') || '[]') as DoneRecipesProps[];
}
