import { ingredientsArray } from './ingredients.mock';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

export function getAllIngredients() {
  return ingredientsArray;
}

export function addIngredient(
  ingredient: IIngredient,
  ingredents: IIngredient[]
) {
  if (!ingredient) return;

  const item = ingredents.find(
    (item) => item.name === ingredient.name
  );

  if (item) return;

  ingredents.push(ingredient);
}

export function removeIngredient(
  ingredient: IIngredient,
  ingredients: IIngredient[]
): IIngredient[] {
  if (!ingredient) return ingredients;

  const item = ingredients.find(
    (item) => item.name === ingredient.name
  );

  if (!item) return ingredients;

  ingredients = ingredients.filter(
    (ing) => ing.name !== item.name
  );

  return ingredients;
}

export function getRecommenedRecipes() {
  return null;
}
