import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { IPreference } from '@fridge-to-plate/app/preference/utils';
import { IMealPlan } from '@fridge-to-plate/app/meal-plan/utils';

export interface IProfile {
    profileId: string;
    username: string;
    email: string;
    displayName: string;
    profilePic: string;
    ingredients: IIngredient[];
    currMealPlan: IMealPlan[] | null;
    preferences: IPreference[];
    savedRecipes: IRecipeDesc[];
    createdRecipes: IRecipeDesc[];
}