import { Injectable } from '@angular/core';
import {
  Action,
  Select,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import {
  AddIngredient,
  AddRecommendation,
  ClearRecommend,
  GetRecipeRecommendations,
  GetUpdatedRecommendation,
  RemoveIngredient,
  UpdateIngredients,
  UpdateRecipePreferences,
  UpdateRecipeRecommendations,
} from '@fridge-to-plate/app/recommend/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { RecommendApi } from './recommend.api';
import {
  IRecipePreferences,
  IRecommend,
} from '@fridge-to-plate/app/recommend/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { Observable, catchError } from 'rxjs';
import { IProfile } from '@fridge-to-plate/app/profile/utils';

export interface RecommendStateModel {
  recommendRequest: IRecommend;
  recipes: IRecipe[];
}
@State<RecommendStateModel>({
  name: 'recommend',
  defaults: {
    recommendRequest:
      environment.TYPE === 'production'
        ? {
            username: '',
            ingredients: [],
            recipePreferences: {
              keywords: [],
              difficulty: '',
              rating: '',
              meal: '',
              servings: '',
              prepTime: '',
            },
          }
        : {
            username: '',
            ingredients: [],
            recipePreferences: {
              keywords: [],
              difficulty: '',
              rating: '',
              meal: '',
              servings: '',
              prepTime: '',
            },
          },
    recipes: [],
  },
})
@Injectable()
export class RecommendState {
  constructor(private recommendApi: RecommendApi, private store: Store) {}

  @Select(ProfileState.getProfile) profile$!: Observable<IProfile>;

  @Selector()
  static getIngredients(state: RecommendStateModel): IIngredient[] {
    return state.recommendRequest.ingredients;
  }

  @Selector()
  static getRecipePreferences(state: RecommendStateModel): IRecipePreferences {
    return state.recommendRequest.recipePreferences;
  }

  @Selector()
  static getRecipes(state: RecommendStateModel): IRecipe[] {
    return state.recipes;
  }

  @Action(RemoveIngredient)
  removeIngredient(
    { patchState, getState }: StateContext<RecommendStateModel>,
    { ingredient }: RemoveIngredient
  ) {
    const updatedRecommendRequest = getState().recommendRequest;

    if (updatedRecommendRequest) {
      updatedRecommendRequest.ingredients =
        updatedRecommendRequest.ingredients.filter((item) => {
          return item.name !== ingredient.name;
        });
      patchState({
        recommendRequest: updatedRecommendRequest,
      });

      //CALL API
      this.store.dispatch(
        new UpdateRecipeRecommendations(updatedRecommendRequest)
      );
    }
  }

  @Action(AddIngredient)
  addIngredient(
    { patchState, getState }: StateContext<RecommendStateModel>,
    { ingredient }: AddIngredient
  ) {
    const updatedRecommendRequest = getState().recommendRequest;

    if (updatedRecommendRequest) {
      for (let i = 0; i < updatedRecommendRequest.ingredients.length; i++) {
        if (updatedRecommendRequest.ingredients[i].name === ingredient.name) {
          this.store.dispatch(new ShowError('Ingredient Already Added'));
          return;
        }
      }

      updatedRecommendRequest.ingredients.push(ingredient);
      patchState({
        recommendRequest: updatedRecommendRequest,
      });

      //CALL API - add on remote
      this.store.dispatch(
        new UpdateRecipeRecommendations(updatedRecommendRequest)
      );
    }
  }

  @Action(UpdateRecipePreferences)
  updatePreferences(
    { getState, patchState }: StateContext<RecommendStateModel>,
    { recipePreference }: UpdateRecipePreferences
  ) {
    const updatedRecommendRequest = getState().recommendRequest;

    if (updatedRecommendRequest) {
      updatedRecommendRequest.recipePreferences = recipePreference;

      patchState({
        recommendRequest: updatedRecommendRequest,
      });

      this.store.dispatch(
        new UpdateRecipeRecommendations(updatedRecommendRequest)
      );
    }
  }

  @Action(GetRecipeRecommendations)
  getRecommendations({
    patchState,
    getState,
  }: StateContext<RecommendStateModel>) {
    const recommendRequest = getState().recommendRequest;
    this.recommendApi.getRecommendations(recommendRequest).subscribe({
      next: (data) => {
        patchState({
          recipes: data,
        });
      },
      error: (error) => {
        this.store.dispatch(new ShowError(error));
      },
    });
  }

  @Action(GetUpdatedRecommendation)
  getUpdatedPreferences(
    { patchState }: StateContext<RecommendStateModel>,
    { username }: GetUpdatedRecommendation
  ) {
    this.recommendApi.getUpdatedPreferences(username).subscribe(
      (updatedPreferences) => {
        if (updatedPreferences?.username) {
          this.store.dispatch(
            new UpdateIngredients(updatedPreferences.ingredients)
          );

          patchState({
            recommendRequest: updatedPreferences,
          });
        } else throw new Error('User Recommend preferences do not exist');
      },
      catchError((error) => {
        return this.store.dispatch(new ShowError(error));
      })
    );
  }

  @Action(AddRecommendation)
  addRecipePreferences({ getState }: StateContext<RecommendStateModel>) {
    this.profile$.subscribe((currentUserProfile) => {
      const currentState = getState();

      if (currentState) {
        const newPreferences: IRecommend = {
          ingredients: currentState.recommendRequest.ingredients,
          username: currentUserProfile.username,
          recipePreferences: currentState.recommendRequest.recipePreferences,
        };

        this.recommendApi.addPreferences(newPreferences).subscribe((res) => {});
      }
    });
  }

  @Action(UpdateRecipeRecommendations)
  updateRecipeRecommendations({ getState }: StateContext<RecommendStateModel>) {
    const currentState = getState();

    if (currentState) {
      this.recommendApi
        .updateRecommendations(currentState.recommendRequest)
        .subscribe({
          error: (error) => {
            this.store.dispatch(new ShowError('Unable to retrieve recommend'));
          },
        });
    }
  }

  @Action(ClearRecommend)
  clearRecommendState({ patchState }: StateContext<RecommendStateModel>) {
    patchState({
      recipes: undefined,
      recommendRequest: undefined,
    });
  }
}
