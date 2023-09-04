import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { IProfile } from './interfaces';
import { IMealPlan } from '@fridge-to-plate/app/meal-plan/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

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

export class AddCreatedRecipe {
    static readonly type = '[Profile] AddCreatedRecipe';
    constructor(public readonly recipe: IRecipeDesc) {}
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
  static readonly type = '[Profile] UpdateMealPlan';
  constructor(public readonly mealPlan: IMealPlan) {}
}

export class RemoveFromMealPlan {
  static readonly type = '[Profile] RemoveFromMealPlan';
  constructor(public readonly recipeId: string) {}
}

export class AddToMealPlan {
  static readonly type = '[Profile] AddToMealPlan';
  constructor(
    public readonly recipe: IRecipeDesc,
    public readonly mealType: string
  ) {}
}

export class UpdateUserIngredients {
  static readonly type = '[Profile] UpdateUserIngredients';
  constructor(public readonly updatedIngredientsList: IIngredient[]) {}
}

export class RetrieveMealPlan {
  static readonly type = '[Profile] RetrieveMealPlan';
  constructor(public readonly date: Date) {}
}
