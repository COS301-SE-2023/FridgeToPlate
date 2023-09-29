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
  ClearRecommend,
  GetRecipeRecommendations,
  GetUpdatedRecommendation,
  RemoveIngredient,
  SetRecommend,
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
} from '@fridge-to-plate/app/profile/utils';
import { ShowInfo } from '@fridge-to-plate/app/info/utils';

export interface RecommendStateModel {
  recommendRequest: IRecommend | null;
  recipes: IRecipe[] | null;
}
@State<RecommendStateModel>({
  name: 'recommend',
  defaults: {
    recommendRequest:
      environment.TYPE === 'production'
        ? null
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
    recipes: null,
  },
})
@Injectable()
export class RecommendState {
  constructor(private recommendApi: RecommendApi, private store: Store) {}

  @Select(ProfileState.getProfile) profile$!: Observable<IProfile>;

  @Selector()
  static getRecommendRequest(state: RecommendStateModel): IRecommend | null {
    return state.recommendRequest;
  }

  @Selector()
  static getIngredients(state: RecommendStateModel): IIngredient[] {
    if (state.recommendRequest) {
      return state.recommendRequest.ingredients;
    } else {
      return [];
    }
  }

  @Selector()
  static getRecipePreferences(state: RecommendStateModel): IRecipePreferences {
    if (state.recommendRequest) {
      return state.recommendRequest.recipePreferences;
    } else {
      return {
        keywords: [],
        difficulty: 'Easy',
        rating: '',
        meal: '',
        servings: '',
        prepTime: '30 - 60 Minutes',
      };
    }
  }

  @Selector()
  static getRecipes(state: RecommendStateModel): IRecipe[] | null {
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
          updatedRecommendRequest.ingredients[i].amount += ingredient.amount;
          this.store.dispatch(new ShowInfo("Added " + ingredient.name + " to Ingredients"));
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
      this.store.dispatch(new ShowInfo("Added " + ingredient.name + " to Ingredients"));
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

    patchState({
      recipes: null
    })

    if (recommendRequest) {
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
  }

  @Action(GetUpdatedRecommendation)
  getUpdatedPreferences({
    patchState
  }: StateContext<RecommendStateModel>, { username } : GetUpdatedRecommendation) {
    this.recommendApi
        .getUpdatedPreferences(username)
        .subscribe((updatedPreferences) => {
          patchState({
            recommendRequest: updatedPreferences,
          });
        });
  }

  @Action(SetRecommend) 
  setRecommend({ patchState }: StateContext<RecommendStateModel>, { recommend }: SetRecommend) {
    patchState({
      recommendRequest: recommend
    });

    if (recommend) {
      this.recommendApi
        .updateRecommendations(recommend)
        .subscribe({
          error: error => {
            this.store.dispatch(new ShowError("Unable to create recommend"))
          }
        });
    }
  }

  @Action(UpdateRecipeRecommendations)
  updateRecipeRecommendations({ getState }: StateContext<RecommendStateModel>) {
    const currentState = getState();

    if (currentState) {
      this.recommendApi
        .updateRecommendations(currentState.recommendRequest as IRecommend)
        .subscribe({
          error: error => {
            this.store.dispatch(new ShowError("Unable to retrieve recommend"))
          }
        });
    }
  }

  @Action(ClearRecommend)
  clearRecommendState({ setState }: StateContext<RecommendStateModel>) {
    setState({
      recipes: null,
      recommendRequest: null,
    });
  }
}
