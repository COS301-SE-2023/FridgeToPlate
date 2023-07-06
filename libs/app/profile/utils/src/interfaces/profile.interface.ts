import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IPreference } from '@fridge-to-plate/app/preference/utils';

export interface IProfile {
    profileId: string;
    displayName: string;
    username: string;
    profilePic: string;
    email: string;
    ingredients: IIngredient[];
    preferences: IPreference[];
    saved_recipes: IRecipe[];
    created_recipes: IRecipe[];
    mealPlan: {
        breakfast: IRecipe | null;
        lunch: IRecipe | null;
        dinner: IRecipe | null;
        snack: IRecipe | null;
    }
}