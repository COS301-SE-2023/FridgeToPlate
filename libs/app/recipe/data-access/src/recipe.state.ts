import { IRecipe, IncreaseViews, RetrieveMealPlanIngredients, UpdateRecipeRatingAndViews } from '@fridge-to-plate/app/recipe/utils';
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
} from '@fridge-to-plate/app/recipe/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { catchError, tap } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { AddCreatedRecipe } from '@fridge-to-plate/app/profile/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { MealPlanAPI } from '@fridge-to-plate/app/meal-plan/data-access';

export interface RecipeStateModel {
  recipe: IRecipe | null;
}

export interface IngredientsStateMeal {
  ingredients: IIngredient[] | null;
}


@State<RecipeStateModel>({
  name: 'recipe',
  defaults: {
    recipe: null
  }
})

@State<IngredientsStateMeal> ({
  name: 'ingredients',
  defaults: {
    ingredients: null
    }
})

@Injectable()
export class RecipeState {

  constructor(private api: RecipeAPI, private mealPlanAPI: MealPlanAPI, private store: Store) {}

  @Selector()
  static getRecipe(state: RecipeStateModel) {
    return state.recipe;
  }

  @Selector()
  static getIngredients(state: IngredientsStateMeal) {
    return state.ingredients;
  }

  @Action(RetrieveRecipe)
  async retrieveRecipe(
    { setState }: StateContext<RecipeStateModel>,
    { recipeId }: RetrieveRecipe
  ) {

    this.api.getRecipeById(recipeId).subscribe(
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
  @Action(UpdateRecipeRatingAndViews)
  updateRecipeRatingAndViews(
    { patchState }: StateContext<RecipeStateModel>,
    { recipe }: UpdateRecipeRatingAndViews
  ) {
    patchState({
      recipe: recipe,
    });

    this.api.updateRecipeRatingAndViews(recipe).subscribe(
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

  @Action(IncreaseViews)
  increaseViews(
    { getState }: StateContext<RecipeStateModel>,
    { viewNum }: IncreaseViews
  ) {
    const updatedRecipe = getState().recipe;

    if (updatedRecipe) {
      this.store.dispatch(new UpdateRecipeRatingAndViews(updatedRecipe));
    }
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

            if (updatedRecipe.rating == null) {
              updatedRecipe.rating = data.rating;
            }
            else {

              if (updatedRecipe.reviews) {

                let sumRatings = 0;

                for (let i = 0; i < updatedRecipe.reviews?.length; i++) {
                  sumRatings += updatedRecipe.reviews[i].rating;
                }

                updatedRecipe.rating = Number((sumRatings / updatedRecipe.reviews.length).toFixed(2));
              }
            }

            this.store.dispatch(new UpdateRecipeRatingAndViews(updatedRecipe));
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

      if (updatedRecipe.reviews) {

        let sumRatings = 0;

        for (let i = 0; i < updatedRecipe.reviews?.length; i++) {
          sumRatings += updatedRecipe.reviews[i].rating;
        }

        updatedRecipe.rating = sumRatings / updatedRecipe.reviews.length;
      }

      this.store.dispatch(new UpdateRecipeRatingAndViews(updatedRecipe));

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

  @Action(RetrieveMealPlanIngredients)
  async retrieveIngredients( { setState }: StateContext<IngredientsStateMeal>, { username }: RetrieveMealPlanIngredients ) {
    this.mealPlanAPI.getMealPlanShoppingList(username).subscribe(
      (ingredients) => {
        if (ingredients) {
          setState({
            ingredients: ingredients
          });
        } else {
          this.store.dispatch(
            new ShowError(
              'Error: Something is wrong with the ingredients: ' + ingredients
            )
          );
        }
      },
      (error: Error) => {
        console.error('Failed to retrieve ingredients:', error);
        this.store.dispatch(new ShowError(error.message));
      }
    );
  }
}
