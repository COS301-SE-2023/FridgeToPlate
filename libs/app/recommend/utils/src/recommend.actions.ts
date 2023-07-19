import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipePreferences } from './interfaces';

export class RefreshIngredientsList {
  static readonly type = '[Recommend] RefreshIngredientsList';
}

export class UpdateIngredients {
  static readonly type = '[Recommend] UpdateIngredients';
  constructor(public newIngredientsList: IIngredient[]) {}
}

export class UpdateRecipePreferences {
  static readonly type = '[Recommend] UpdateRecipePreferences';
  constructor(public recipePreference: IRecipePreferences) {}
}

export class GetRecipeRecommendations {
  static readonly type = '[Recommend] GetRecipeRecommendations';
}

export class RemoveIngredient {
  static readonly type = '[Recommend] RemoveIngredient';
  constructor(public readonly ingredient: IIngredient) {}
}

export class AddIngredient {
  static readonly type = '[Recommend] AddIngredient';
  constructor(public readonly ingredient: IIngredient) {}
}