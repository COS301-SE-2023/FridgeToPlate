import { Injectable } from '@angular/core';
import {Action, Select, Selector, State, StateContext} from '@ngxs/store';
import {PreferenceFormInterface, RefreshIngredientsList, UpdateRecipePreferences} from './recommend.actions';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import * as RecommendAction from './recommend.actions';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import {RecommendApi} from "./recommend.api";
import {Observable, take, tap} from "rxjs";
import {ProfileState} from "@fridge-to-plate/app/profile/data-access";
import {IProfile, UpdateProfile} from "@fridge-to-plate/app/profile/utils";

export interface RecommendStateModel {
  ingredients: IIngredient[];
  preferences: PreferenceFormInterface;
  recommendations: IRecipe[];
}
@State<RecommendStateModel>({
  name: 'recommend',
  defaults: {
    ingredients: [],
    preferences: {
      diet: [],
      keywords: [],
      other: {
        difficulty: 'easy',
        rating: 1,
        servings: 1
      },

    },
    recommendations: [],
  },
})
@Injectable()
export class RecommendState {

  constructor(private recommendApi: RecommendApi) {
  }

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile>;

  @Selector()
  static getPreferences(state: RecommendStateModel): PreferenceFormInterface {
    return state.preferences;
  }

  @Selector()
  static getIngredients(state: RecommendStateModel): IIngredient[] {
    return state.ingredients;
  }

  @Selector()
  static getRecommendations(state: RecommendStateModel): IRecipe[] {
    return state.recommendations;
  }

  @Action(RecommendAction.UpdateIngredients)
  updateIngredients(ctx : StateContext<RecommendStateModel>, { newIngredientsList }: RecommendAction.UpdateIngredients)
  {
    this.profile$
      .pipe(
        take(1)
      ).subscribe(currentUserProfile => {
        const newUserProfile: IProfile = {
          ...currentUserProfile,
          ingredients: newIngredientsList
        };

        ctx.dispatch(new UpdateProfile(newUserProfile))
        ctx.dispatch(new RefreshIngredientsList())
    })
  }

  @Action(RecommendAction.RefreshIngredientsList)
  refreshIngredients( { patchState } : StateContext<RecommendStateModel>){
    this.profile$
      .pipe(
        take(1)
      ).subscribe( userProfile => {
        console.log("User Profile: ", userProfile);
        patchState({
          ingredients: userProfile.ingredients
        });
    })
  }

  @Action(RecommendAction.UpdateRecipePreferences)
  updatePreferences(
    { patchState } : StateContext<RecommendStateModel>,
    { updatedFormData } : UpdateRecipePreferences
  ){
    patchState({ preferences: updatedFormData})
  }
}
