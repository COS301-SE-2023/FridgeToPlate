import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { RecipeAPI } from './recipe.api';
import {
  CreateRecipe,
  DeleteRecipe,
  RetrieveRecipe,
  UpdateRecipe,
  AddReview,
  DeleteReview,
  GetRecipe,
} from '@fridge-to-plate/app/recipe/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { catchError, take, tap } from 'rxjs';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { Navigate } from '@ngxs/router-plugin';
import { AddCreatedRecipe } from '@fridge-to-plate/app/profile/utils';

export interface RecipeStateModel {
  recipe: IRecipe | null;
}

const initialState:IRecipe = {
  description: '',
  servings: 0,
  prepTime: 0,
  meal: 'Breakfast',
  ingredients: [],
  steps: [],
  creator: '',
  name: '',
  tags: [],
  difficulty: 'Easy',
  recipeImage: ''
};
@State<RecipeStateModel>({
  name: 'recipe',
  defaults: {
    recipe: environment.TYPE === "production" ? null : initialState,
  },
})
@Injectable()
export class RecipeState {

  constructor(private api: RecipeAPI, private store: Store) {}

  @Selector()
  static getRecipe(state: RecipeStateModel) {
    return state.recipe;
  }

  @Action(GetRecipe)
  getRecipe(
    { patchState }: StateContext<RecipeStateModel>,
    { recipeId }: GetRecipe
  ) {
    this.api
      .getRecipeById(recipeId)
      .pipe(take(1))
      .subscribe((recipeData: IRecipe) => {
        patchState({
          recipe: recipeData,
        });
      });
  }

  @Action(UpdateRecipe)
  updateRecipe(
    { patchState }: StateContext<RecipeStateModel>,
    { recipe }: UpdateRecipe
  ) {
    patchState({
      recipe: recipe,
    });

    this.api.updateRecipe(recipe).subscribe(
      () => {
        patchState({
          recipe: recipe,
        });
      },
      (error: Error) => {
        console.error('Failed to update recipe:', error);
        this.store.dispatch(new ShowError(error.message));
      }
    );
  }

  @Action(AddReview)
  async addRecipeReview(
    { getState }: StateContext<RecipeStateModel>,
    { review }: AddReview
  ) {
    const updatedRecipe = getState().recipe;

    if (updatedRecipe) {
      (await this.api.createNewReview(review)).subscribe({
        next: data => {
            updatedRecipe.reviews?.unshift(data);

            this.store.dispatch(new UpdateRecipe(updatedRecipe));
        },
        error: error => {
            this.store.dispatch(new ShowError(error.message));
        }
      });
    }
  }

  @Action(DeleteReview)
  async removeRecipeReview(
    { getState }: StateContext<RecipeStateModel>,
    { reviewId }: DeleteReview
  ) {
    const updatedRecipe = getState().recipe;

    if (updatedRecipe) {
      updatedRecipe.reviews = updatedRecipe?.reviews?.filter(
        (currentReview) => currentReview.reviewId !== reviewId
      );

      this.store.dispatch(new UpdateRecipe(updatedRecipe));

      (await this.api.deleteReview(updatedRecipe.recipeId as string, reviewId)).subscribe({
        error: error => {
            this.store.dispatch(new ShowError(error.message));
        }
      });
    }
  }

  @Action(DeleteRecipe)
  deleteRecipe(
    { patchState }: StateContext<RecipeStateModel>,
    { recipeId }: DeleteRecipe
  ) {
    patchState({
      recipe: null,
    });

    this.api.deleteRecipe(recipeId).subscribe(
      (response) => {
        console.log(response);
      },
      (error: Error) => {
        console.error('Failed to delete recipe:', error);
        this.store.dispatch(new ShowError(error.message));
      }
    );
  }

  @Action(CreateRecipe)
  createRecipe(
    { patchState }: StateContext<RecipeStateModel>,
    { recipe }: CreateRecipe
  ) {
    this.api.createNewRecipe(recipe).pipe(
      tap(
        (recipe) => {
          patchState({
            "recipe": recipe
          })

          this.store.dispatch(new Navigate([`/recipe/${recipe.recipeId}`]));
          this.store.dispatch (new AddCreatedRecipe(recipe));
        },
      catchError (
        () => this.store.dispatch(new ShowError('Unfortunately, the recipe was not created successfully'))
      ))).subscribe();
  }

  @Action(RetrieveRecipe)
  async retrieveRecipe(
    { setState }: StateContext<RecipeStateModel>,
    { recipeId }: RetrieveRecipe
  ) {
    await this.api.getRecipeById(recipeId).subscribe(
      (recipe) => {
        if (recipe) {
          setState({
            recipe: recipe,
          });
        } else {
          this.store.dispatch(
            new ShowError(
              'Error: Something is wrong with the recipe: ' + recipe
            )
          );
        }
      },
      (error: Error) => {
        console.error('Failed to retrieve recipe:', error);
        this.store.dispatch(new ShowError(error.message));
      }
    );
  }
}