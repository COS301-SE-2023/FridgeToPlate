import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";
import { IRecipePreferences } from "./recipe-preference.interface";

export interface IRecommend {
    username: string;
    ingredients: IIngredient[];
    recipePreferences: IRecipePreferences
}