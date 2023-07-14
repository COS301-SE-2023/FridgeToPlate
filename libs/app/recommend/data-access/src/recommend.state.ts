import { Injectable } from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import { PreferenceFormInterface } from "./recommend.actions";
import {IIngredient} from "@fridge-to-plate/app/ingredient/utils";
import * as RecommendAction from './recommend.actions';

export class RecommendStateModel {
  ingredients: [],
  preferences: PreferenceFormInterface,
  recommendations: {},
}
@State<RecommendStateModel>({
  name: 'recommend',
  defaults: {
    ingredients: [],
    preferences: PreferenceFormInterface,
    recommendations: {},
  }
})

export class RecommendState {
  @Selector()
  static getIngredients(state: RecommendStateModel): IIngredient[] {
    return state.ingredients;
  }

  @Action(RecommendAction.UpdateRecipePreferences)
  getRecommendations({ getState, patchState}: StateContext<RecommendStateModel>, {updatedFormData}: RecommendAction.UpdateRecipePreferences): any{
    const state = getState();
    patchState({ preferences: [...state.preferences , updatedFormData]
    });
  }

  static updatePreferences(state: RecommendStateModel){
    return state.ingredients;
  }
}
