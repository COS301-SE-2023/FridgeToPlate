import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';

export interface IProfile {
    profileId: string;
    username: string;
    profilePic: string;
    ingredients: IIngredient[];
    // preferences: IPreference[];
    created_recipes: IRecipe[];
}