import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PreferenceFormInterface } from './recommend.actions';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import * as RecommendAction from './recommend.actions';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';

export interface RecommendStateModel {
  ingredients: IIngredient[];
  preferences: PreferenceFormInterface[];
  recommendations: IRecipe[];
}
@State<RecommendStateModel>({
  name: 'recommend',
  defaults: {
    ingredients: [],
    preferences: [],
    recommendations: [],
  },
})
@Injectable()
export class RecommendState {
  @Selector()
  static getIngredients(state: RecommendStateModel): IIngredient[] {
    return state.ingredients;
  }

  @Selector()
  static getPreferences(state: RecommendStateModel): PreferenceFormInterface {
    return state.ingredients;
  }

  @Selector()
  static getReccommendations(state: RecommendStateModel): IRecipe[] {
    return state.recommendations;
  }

  @Action(RecommendAction.UpdateIngredients)
  updateIngredients(
    ctx: StateContext<RecommendStateModel>,
    action: RecommendAction.UpdateIngredients
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      ingredients: [...state.ingredients, action.newIngredientsList],
    });
  }

  @Action(RecommendAction.UpdateRecipePreferences)
  updatePreferences(
    ctx: StateContext<RecommendStateModel>,
    action: RecommendAction.UpdateRecipePreferences
  ): any {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      preferences: [...state.preferences, action.updatedFormData],
    });
  }
}
