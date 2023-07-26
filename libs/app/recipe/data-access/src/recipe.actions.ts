import {IReview} from "@fridge-to-plate/app/review/utils";
import {IRecipe} from "@fridge-to-plate/app/recipe/utils";

export class GetRecipe {
  static readonly type = '[Recipe] Get Recipe';
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
