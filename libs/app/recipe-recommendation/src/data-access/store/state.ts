import {IngredientItem, ingredientsArray} from "../mock-data/ingredients";

export function getAllIngredients() {
  return ingredientsArray;
}

export function addIngredient(ingredient: IngredientItem, ingredents: IngredientItem[]){
  if(!ingredient) return;

  const item = ingredents.find( (item) => item.id === ingredient.id);

  if(item) return;

  ingredents.push(ingredient);
}

export function removeIngredient(ingredient: IngredientItem, ingredients: IngredientItem[]): IngredientItem[]{
  if(!ingredient) return ingredients;

  const item = ingredients.find( (item) => item.id === ingredient.id);

  if(!item) return ingredients;

  ingredients = ingredients.filter( (ing) => ing.id !== item.id);

  return ingredients;
}

