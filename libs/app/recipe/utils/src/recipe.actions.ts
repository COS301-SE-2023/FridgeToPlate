import { IReview } from "@fridge-to-plate/app/review/utils";
import { IRecipe } from "./interfaces";

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

export class AddReview {
  static readonly type = '[Recipe] Add Recipe Review';
  constructor(public readonly review: IReview) {}
}

export class DeleteReview {
  static readonly type = '[Recipe] Delete Recipe Review';
  constructor(public readonly reviewId: string) {}
}
