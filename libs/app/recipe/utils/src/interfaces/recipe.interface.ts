import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipeStep } from './recipe-step.interface';

export interface IRecipe {
  id: string;
  name: string;
  recipeImage: string;
  ingredients: IIngredient[];
  steps: IRecipeStep[];
  rating?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime?: number;
  numberOfServings?: number;
  tags: string[];
}