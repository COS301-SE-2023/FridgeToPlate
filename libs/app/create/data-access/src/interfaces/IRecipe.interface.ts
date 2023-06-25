import { IQuantityIngredient } from "./IQuantityIngredient.interface";
import { IRecipeStep } from "./IRecipeStep.interface";

export interface IRecipe {
    id: number;
    name: string;
    recipeImage: string;
    ingredients : IQuantityIngredient[];
    steps: IRecipeStep[];
    difficulty: string;
    prepTime: number;
    numberOfServings: number;
    tags?: string[];
  }