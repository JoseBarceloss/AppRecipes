export type FormLoginType = {
  email: string;
  password: string;
};

export interface DataProp {
  strMeal: string;
  strDrink: string;
  strMealThumb: string;
  strDrinkThumb: string;
  strCategory: string;
  strAlcoholic: string;
  strInstructions: string;
  strYoutube: string | null;
  [index: string]: any;
}

export type Recipe = {
  [x: string]: string
};

export type RecipeKeys = {
  name: string,
  id: string,
  image: string
  category: string,
  ingredients: string,
  instructions: string
  video: string
};

export const RecipeInitialValue = {
  name: '',
  id: '',
  image: '',
  category: '',
  ingredients: '',
  instructions: '',
  video: '',
};
