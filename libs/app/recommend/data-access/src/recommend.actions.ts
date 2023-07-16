import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

export interface PreferenceFormInterface {}

export class RefreshIngredientsList {
  static readonly type = '[Recommend] Refresh Ingredients List';
  constructor() {}
}

export class UpdateIngredients {
  static readonly type = '[Recommend] Update Ingredients';
  constructor(public newIngredientsList: IIngredient[]) {}
}

export class UpdateRecipePreferences {
  static readonly type = '[Recommend] Update Recipe Preferences';
  constructor(public updatedFormData: PreferenceFormInterface) {}
}

export class GetRecipeRecommendations {
  static readonly type = '[Recommend] Get Recommendations';
  constructor(public recipePreferenceList: PreferenceFormInterface) {}
}
