import {ingredientsArray} from './ingredients.mock';
import {IRecipe} from "@fridge-to-plate/app/recipe/utils";
import {IIngredient} from "@fridge-to-plate/app/ingredient/utils";

export interface Interface {
  ingredients: IIngredient[];
  diet: string[];
  meta?: {
    difficulty?: 'easy' | 'medium' | 'hard';
    rating?: number;
    numberOfServings?: number;
  }
}
export class RecommendApi {

  //Step 1
  getUserngredientsList(): IRecipe[] {
  }
  removeIngredient(recipe: IRecipe){
  }

  //Step 2
  getDietList(): string [] {}

  //Step 3
  getRecommendations(recomendationParams: )
}
