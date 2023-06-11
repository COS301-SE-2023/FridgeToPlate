import { Ingredient } from './ingredient';
import { IRecipeStep } from './irecipe-step';

export interface IRecipe {
  id: string;
  name: string;
  recipeImage: string;
  ingredients: Ingredient[];
  steps: IRecipeStep[];
  rating?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  meta?: {
    prepTime?: number;
    numberOfServings?: number;
    tags: string[];
  };
}
