import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { RecipeService } from "./recipe.api";
import {AddReview, DeleteReview, GetRecipe, UpdateRecipe} from "./recipe.actions";

import {take} from "rxjs";

export interface RecipeStateModel {
  recipe: IRecipe | null;
}

@State<RecipeStateModel>({
  name: 'recipe',
  defaults: {
      recipe: null,
  },
})
@Injectable()
export class RecipeState {

  constructor(private api: RecipeService, private store: Store) {
  }

  @Selector()
  static getRecipe(state: RecipeStateModel) {
    return state.recipe;
  }

  @Action(GetRecipe)
  getRecipe({ patchState } : StateContext<RecipeStateModel>, { recipeId } : GetRecipe) {
    this.api.getRecipeById(recipeId)
      .pipe( take(1) )
      .subscribe( recipeData => {
        patchState({
          recipe: recipeData
        })
      })
  }

  @Action(UpdateRecipe)
  updateRecipe({ patchState } : StateContext<RecipeStateModel>, { recipe } : UpdateRecipe) {
    patchState({
      recipe: recipe
    });

    this.api.updateRecipe(recipe);
  }

  @Action(AddReview)
  addRecipeReview({ getState } : StateContext<RecipeStateModel>, { review } : AddReview) {

    let newRecipe = getState().recipe;

    if(newRecipe){
      newRecipe?.reviews?.unshift(review);

      this.store.dispatch(new UpdateRecipe(newRecipe));

    }
  }

  @Action(DeleteReview)
  removeRecipeReview({ getState } : StateContext<RecipeStateModel>, { reviewId } : DeleteReview) {

    let newRecipe = getState().recipe;

    if(newRecipe){
      newRecipe.reviews = newRecipe?.reviews?.filter( currentReview => currentReview.reviewId !== reviewId);

      this.store.dispatch(new UpdateRecipe(newRecipe));

    }
  }

}
