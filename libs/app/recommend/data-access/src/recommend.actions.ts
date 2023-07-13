import {IIngredient} from "@fridge-to-plate/app/ingredient/utils";

interface PreferenceFormInterface {

}
export class GetIngredients {
  static readonly type = '[Recommend] Get Ingredients';
  constructor() {
  }
}

export class UpdateIngredients {
  static readonly type = '[Recommend] Update Ingredients';
  constructor(newIngredientsList: IIngredient []) {
  }
}

export class UpdateRecipePreferences {
  static readonly type = '[Recommend] Update Recipe Preferences';
  constructor(updatedFormData: PreferenceFormInterface) {
  }
}

export class GetRecipeRecommendations {
  static readonly type = '[Recommend] Get Recommendations';
  constructor(recipePreferenceList: PreferenceFormInterface) {
  }
}
