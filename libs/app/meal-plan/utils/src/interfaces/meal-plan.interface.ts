import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';

export interface IMealPlan {
  username: string;
  date: string;
  breakfast: IRecipeDesc | null;
  lunch: IRecipeDesc | null;
  dinner: IRecipeDesc | null;
  snack: IRecipeDesc | null;
}

