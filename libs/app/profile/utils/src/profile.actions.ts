import { IRecipeDesc } from "@fridge-to-plate/app/recipe/utils";
import { IProfile } from "./interfaces";
import { IMealPlan } from "@fridge-to-plate/app/meal-plan/utils";

export class UpdateProfile {
    static readonly type = '[Profile] UpdateProfile';
    constructor(public readonly profile: IProfile) {}
}

export class ResetProfile {
    static readonly type = '[Profile] ResetProfile';
}

export class CreateNewProfile {
    static readonly type = '[Profile] CreateNewProfile';
    constructor(public readonly profile: IProfile) {}
}

export class RetrieveProfile {
    static readonly type = '[Profile] RetrieveProfile';
    constructor(public readonly username: string) {}
}

export class SaveRecipe {
    static readonly type = '[Profile] SaveRecipe';
    constructor(public readonly recipe: IRecipeDesc) {}
}

export class RemoveSavedRecipe {
    static readonly type = '[Profile] RemoveSavedRecipe';
    constructor(public readonly recipe: IRecipeDesc) {}
}

export class UndoRemoveSavedRecipe {
    static readonly type = '[Profile] UndoRemoveSavedRecipe';
    constructor(public readonly savedRecipes: IRecipeDesc[]) {}
}

export class SortSavedByDifficulty {
    static readonly type = '[Profile] SortSavedByDifficulty';
}

export class SortSavedByNameAsc {
    static readonly type = '[Profile] SortSavedByNameAsc';
}

export class SortSavedByNameDesc {
    static readonly type = '[Profile] SortSavedByNameDesc';
}

export class SortCreatedByDifficulty {
    static readonly type = '[Profile] SortCreatedByDifficulty';
}

export class SortCreatedByNameAsc {
    static readonly type = '[Profile] SortCreatedByNameAsc';
}

export class SortCreatedByNameDesc {
    static readonly type = '[Profile] SortCreatedByNameDesc';
}

export class UpdateMealPlan {
    static readonly type = '[Profile] Update the Meal Plan';
    constructor(public readonly mealPlan: IMealPlan){}
}

export class RemoveFromMealPlan {
    static readonly type = '[Profile] Remove from Meal Plan';
    constructor(public readonly recipeId: string){}
}

export class AddToMealPlan {
    static readonly type = '[Profile] Add to Meal Plan';
    constructor(public readonly recipe: IRecipeDesc, public readonly mealType: string){}
}