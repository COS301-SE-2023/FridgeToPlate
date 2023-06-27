import { IngredientItem, ingredientsArray } from './ingredients.mock';
// import {recipeArray} from "./recipes.mock";

export function getAllIngredients() {
  return ingredientsArray;
}

export function addIngredient(
  ingredient: IngredientItem,
  ingredents: IngredientItem[]
) {
  if (!ingredient) return;

  const item = ingredents.find(
    (item) => item.ingredientId === ingredient.ingredientId
  );

  if (item) return;

  ingredents.push(ingredient);
}

export function removeIngredient(
  ingredient: IngredientItem,
  ingredients: IngredientItem[]
): IngredientItem[] {
  if (!ingredient) return ingredients;

  const item = ingredients.find(
    (item) => item.ingredientId === ingredient.ingredientId
  );

  if (!item) return ingredients;

  ingredients = ingredients.filter(
    (ing) => ing.ingredientId !== item.ingredientId
  );

  return ingredients;
}

export function getRecommenedRecipes() {
  return null;
}
