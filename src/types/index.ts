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

export type DoneRecipesProps = {
  alcoholicOrNot: string,
  category: string,
  doneDate: string,
  image: string,
  name: string,
  nationality: string,
  type: string,
  tags: [string],
};
