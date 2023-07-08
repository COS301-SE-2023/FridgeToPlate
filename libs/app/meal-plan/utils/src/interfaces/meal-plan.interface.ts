import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';

export interface IMealPlan {
  mealplanId?: string;
  username: string;
  date: Date;
  Breakfast: IRecipeDesc | null;
  Lunch: IRecipeDesc | null;
  Dinner: IRecipeDesc | null;
  Snack: IRecipeDesc | null;
  Dessert: IRecipeDesc | null;
}

