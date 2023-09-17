import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipePreferences, IRecommend } from './interfaces';

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

export class AddRecommendation {
  static readonly type = '[Recommend] AddRecipeRecommendation';
  constructor(public recipePreference: IRecipePreferences) {}
}

export class GetUpdatedRecommendation {
  static readonly type = '[Recommend] GetUpdatedRecommendation';
  constructor(public readonly username: string){}
}

export class UpdateRecipeRecommendations {
  static readonly type = '[Recommend] UpdateRecipeRecommendations';
  constructor(public recipePreference: IRecommend) {}
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

export class ClearRecommend {
  static readonly type = '[Recommend] Clear Recommend State';
}
