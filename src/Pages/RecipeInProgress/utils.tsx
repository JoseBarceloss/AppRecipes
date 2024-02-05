export const criarObjetoDeReceita = (recipe:any) => {
  const data = recipe;

  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1;
  const ano = hoje.getFullYear();

  const dataAtualFormatada = `${ano}-${mes < 10 ? `0${mes}`
    : mes}-${dia < 10 ? `0${dia}` : dia}`;

  return {
    id: window.location.pathname.split('/')[2],
    type: window.location.pathname.split('/')[1] === 'meals' ? 'meal' : 'drink',
    nationality: data?.strArea || '',
    category: data?.strCategory || '',
    alcoholicOrNot: data?.strAlcoholic || '',
    name: data?.strDrink || data?.strMeal,
    image: data?.strDrinkThumb || data?.strMealThumb,
  };
};
