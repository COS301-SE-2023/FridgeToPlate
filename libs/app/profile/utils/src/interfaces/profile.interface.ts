import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';

export interface IProfile {
    profileId: string;
    displayName: string;
    username: string;
    profilePic: string;
    email: string;
    ingredients: IIngredient[];
    // preferences: IPreference[];
    saved_recipes: IRecipe[];
    created_recipes: IRecipe[];
}