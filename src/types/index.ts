export type FormLoginType = {
  email: string;
  password: string;
};

export type Ingredient = {
  ingredients: string[],
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
