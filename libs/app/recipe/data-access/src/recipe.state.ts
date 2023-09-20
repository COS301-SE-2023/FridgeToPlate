import { ChangeMeasurementType, IRecipe, IncreaseViews, RetrieveMealPlanIngredients } from '@fridge-to-plate/app/recipe/utils';
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
import { ShowInfo, ShowSuccess } from '@fridge-to-plate/app/info/utils';

export interface RecipeStateModel {
  recipe: IRecipe | null;
  measurementType: string;
}

export interface IngredientsStateMeal {
  ingredients: IIngredient[] | null;
}


@State<RecipeStateModel>({
  name: 'recipe',
  defaults: {
    recipe: null,
    measurementType: "metric"
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
    { patchState, getState }: StateContext<RecipeStateModel>,
    { recipeId }: RetrieveRecipe
  ) {

    patchState({
      recipe: null
    });

    this.api.getRecipeById(recipeId).subscribe(
      (recipe) => {
        if (recipe) {
          recipe.ingredients = this.convertIngredients(recipe.ingredients, getState().measurementType);
          patchState({
            recipe: recipe,
          });
        } 
      },
      (error: Error) => {
        this.store.dispatch(new ShowError("Could Not Retrieve Recipe"));
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
        this.store.dispatch(new ShowSuccess('Successfully Updated Recipe'));
      },
      (error: Error) => {
        this.store.dispatch(new ShowError("Failed to Update Recipe"));
      }
    );
  }

  @Action(IncreaseViews)
  increaseViews(
    { recipeId }: IncreaseViews
  ) {
    this.api.increaseViews(recipeId).subscribe();
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

            this.store.dispatch(new ShowSuccess('Successfully Added Review'));
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

      (await this.api.deleteReview(updatedRecipe.recipeId as string, reviewId)).subscribe();
      this.store.dispatch(new ShowInfo('Review Deleted'));
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

    this.api.deleteRecipe(recipeId).pipe(
      tap(
        (response: string) => {
          console.log(response)
          this.store.dispatch(new ShowInfo('Recipe Deleted'));
        },
        catchError(
          () => this.store.dispatch(new ShowError('Unfortunately, the recipe was not deleted successfully'))
        )
      )).subscribe()
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
          this.store.dispatch(new AddCreatedRecipe(recipe));
          this.store.dispatch(new ShowSuccess('Recipe Created Successfully'));
        },
      catchError (
        () => this.store.dispatch(new ShowError('Unfortunately, the recipe was not created successfully'))
      ))).subscribe();
  }

  @Action(RetrieveMealPlanIngredients)
  async retrieveIngredients( { setState }: StateContext<IngredientsStateMeal>, { mealPlan }: RetrieveMealPlanIngredients ) {
    this.mealPlanAPI.getMealPlanShoppingList(mealPlan).subscribe(
      (ingredients) => {
        if (ingredients) {
          setState({
            ingredients: ingredients
          });
        }
      },
      (error: Error) => {
        console.error('Failed to retrieve ingredients:', error);
        this.store.dispatch(new ShowError(error.message));
      }
    );
  }

  @Action(ChangeMeasurementType)
  changeMeasurementType( { setState, getState, patchState }: StateContext<RecipeStateModel>, { measurementType }: ChangeMeasurementType ) {
    const recipe = getState().recipe;
    
    if (recipe) {
      recipe.ingredients = this.convertIngredients(recipe.ingredients, measurementType);

      setState({
        recipe: recipe,
        measurementType: measurementType
      });
    } else {
      patchState({
        measurementType: measurementType
      })
    }

    this.store.dispatch(new ShowSuccess('Measurements Changed Successfully'));
  }

  convertIngredients(ingredients: IIngredient[], type: string): IIngredient[] {
    ingredients.forEach(element => {
        if (type === "imperial") {
            switch (element.unit) {
                case "ml":
                    if (element.amount < 15) {
                        element.amount /= 5;
                        element.unit = "tsp";
                    } else if (element.amount < 60) {
                      element.amount /= 15;
                      element.unit = "tbsp";
                    } else {
                        element.amount /= 250;
                        element.unit = "cup";
                    }
                    break;
                case "l":
                    element.amount /= 250;
                    element.unit = "cup";
                    break;
                case "g":
                    if (element.amount < 454) {
                        element.amount /= 28;
                        element.unit = "oz";
                    } else {
                        element.amount /= 454;
                        element.unit = "lb";
                    }
            }
        } else {
            switch (element.unit) {
                case "cup":
                    element.amount *= 250;
                    element.unit = "ml";
                    break;
                case "lb":
                    element.amount *= 454;
                    element.unit = "g";
                    break;
                case "oz": 
                    element.amount *= 28;
                    element.unit = "g";
            }
        }
    });

    return ingredients;
}
}
