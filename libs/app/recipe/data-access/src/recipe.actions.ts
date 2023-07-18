import {IReview} from "@fridge-to-plate/app/review/utils";

export class GetRecipe {
  static readonly type = '[Recipe] Get Recipe';
  constructor(public readonly recipeId: string) {}
}

export class AddReview {
  static readonly type = '[Recipe] Add Recipe Review';
  constructor(public readonly review: IReview) {}
}
