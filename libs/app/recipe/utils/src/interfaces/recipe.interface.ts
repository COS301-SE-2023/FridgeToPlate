import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IReview } from '@fridge-to-plate/app/review/utils';

export interface IRecipeDesc {
  recipeId?: string;
  name: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  recipeImage: string;
  rating: number | null;
}

export interface IRecipe extends IRecipeDesc {
  description: string;
  servings: number;
  prepTime: number;
  meal: string;
  ingredients: IIngredient[];
  steps: string[];
  creator: string;
  reviews?: IReview[];
  youtubeId?: string;
}
