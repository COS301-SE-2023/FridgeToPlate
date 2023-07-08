import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IReview } from '@fridge-to-plate/app/review/utils';

export interface IRecipeDesc {
  recipeId?: string;
  name: string;
  tags?: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  recipeImage: string;
}

export interface IRecipe extends IRecipeDesc {
  description: string;
  numberOfServings: number;
  prepTime: number;
  meal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
  ingredients: IIngredient[];
  steps: string[];
  creator: string;
  reviews: IReview[];
}