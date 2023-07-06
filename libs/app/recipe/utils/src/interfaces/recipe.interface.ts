import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipeStep } from './recipe-step.interface';

export interface IRecipe {
  recipeId?: string;
  name: string;
  recipeImage: string;
  ingredients: IIngredient[];
  instructions: IRecipeStep[];
  rating?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime?: number;
  numberOfServings?: number;
  tags?: string[];
}
