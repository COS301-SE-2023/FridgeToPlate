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
import { Observable } from 'rxjs';
import {
  IProfile,
  UpdateUserIngredients,
} from '@fridge-to-plate/app/profile/utils';
import { UpdatePreferences } from '@fridge-to-plate/app/preferences/utils';

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
            username: 'joe',
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
            username: 'joe',
            ingredients: [
              {
                name: 'Tomato',
                amount: 2,
                unit: 'kg',
              },
              {
                name: 'Onion',
                amount: 1,
                unit: 'kg',
              },
              {
                name: 'Rice',
                amount: 3,
                unit: 'kg',
              },
              {
                name: 'Chicken',
                amount: 2,
                unit: 'kg',
              },
              {
                name: 'Rump Steak',
                amount: 3,
                unit: 'kg',
              },
              {
                name: 'Rice',
                amount: 3,
                unit: 'kg',
              },
              {
                name: 'Flour',
                amount: 2,
                unit: 'kg',
              },
              {
                name: 'Egg',
                amount: 500,
                unit: 'g',
              },
              {
                name: 'Peppers',
                amount: 2,
                unit: 'kg',
              },
              {
                name: 'Sunflower Oil',
                amount: 2,
                unit: 'l',
              },
              {
                name: 'Milk',
                amount: 4,
                unit: 'l',
              },
              {
                name: 'Soy Sauce',
                amount: 500,
                unit: 'ml',
              },
              {
                name: 'Beef Stock',
                amount: 200,
                unit: 'ml',
              },
              {
                name: 'Pasta',
                amount: 2,
                unit: 'kg',
              },
              {
                name: 'Salt',
                amount: 200,
                unit: 'g',
              },
              {
                name: 'Salmon',
                amount: 1,
                unit: 'kg',
              },
            ],
            recipePreferences: {
              keywords: [],
              difficulty: 'Easy',
              rating: '',
              meal: '',
              servings: '',
              prepTime: '30 - 60 Minutes',
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
  getUpdatedPreferences({
    patchState,
    getState,
  }: StateContext<RecommendStateModel>) {
    this.profile$.subscribe((userProfile) => {
      this.recommendApi
        .getUpdatedPreferences(userProfile.username)
        .subscribe((updatedPreferences) => {
          //Case 1: User has preferences already - update on store
          // if (
          //   updatedPreferences.ingredients !== null &&
          //   updatedPreferences.ingredients.length > 0 &&
          //   updatedPreferences.recipePreferences !== null
          // ) {
          //   //1. Update ingredients
          //   this.store.dispatch(
          //     new UpdateIngredients(updatedPreferences.ingredients)
          //   );

          //   //2. Update preferences
          //   patchState({
          //     recommendRequest: updatedPreferences,
          //   });
          // }
          // //Case 2: User has no preferences stored - set current as on remote (Demo Purposes)
          // else {
          //   this.store.dispatch(
          //     new AddRecommendation(
          //       getState().recommendRequest.recipePreferences
          //     )
          //   );
          // }

          //   //1. Update ingredients
          this.store.dispatch(
            new UpdateIngredients(updatedPreferences.ingredients)
          );

          //   //2. Update preferences
          patchState({
            recommendRequest: updatedPreferences,
          });
        });
    });
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
        .subscribe((newRecommendations) => {});
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
