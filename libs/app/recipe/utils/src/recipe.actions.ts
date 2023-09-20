import { IReview } from "@fridge-to-plate/app/review/utils";
import { IRecipe } from "./interfaces";
import { IMealPlan } from "@fridge-to-plate/app/meal-plan/utils";

export class DeleteRecipe {
    static readonly type = "[EditRecipe] DeleteRecipe";
    constructor(public readonly recipeId: string) {}
}

export class CreateRecipe {
    static readonly type = "[Create] CreateRecipe";
    constructor(public readonly recipe: IRecipe) {}
}

export class RetrieveRecipe {
    static readonly type = "[Retrieve] RetrieveRecipe";
    constructor(public readonly recipeId: string) {}
}

export class UpdateRecipe {
  static readonly type = '[Recipe] Update Recipe';
  constructor(public readonly recipe: IRecipe) {}
}

export class IncreaseViews {
  static readonly type = '[Recipe] IncreaseViews';
  constructor(public readonly recipeId: string) {}
}

export class AddReview {
  static readonly type = '[Recipe] AddReview';
  constructor(public readonly review: IReview) {}
}

export class DeleteReview {
  static readonly type = '[Recipe] DeleteReview';
  constructor(public readonly reviewId: string) {}
}

export class RetrieveMealPlanIngredients {
  static readonly type = '[Recipe] RetrieveMealPlanIngredients';
  constructor(public readonly mealPlan: IMealPlan | null) {}
}

export class ChangeMeasurementType {
  static readonly type = '[Recipe] ChangeMeasurementType';
  constructor(public readonly measurementType: string) {}
}