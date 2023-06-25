import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";

export interface IRecipe {
    recipeId: string;
    name: string;
    ingredients: IIngredient[];
    instructions: String[];
}