import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { RecipeAPI } from './recipe.api';
import { CreateRecipe, DeleteRecipe, RetrieveRecipe, UpdateRecipe, AddReview, DeleteReview, GetRecipe, } from "@fridge-to-plate/app/recipe/utils"
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { Location } from "@angular/common";
import { take } from 'rxjs';

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

    this.api.updateRecipe(recipe).subscribe( (response) => {
        patchState({
            recipe : recipe
        })
    },
    (error: Error) => {
        console.error('Failed to update recipe:', error);
        this.store.dispatch(new ShowError(error.message))
    });
  }

  @Action(AddReview)
  addRecipeReview(
    { getState }: StateContext<RecipeStateModel>,
    { review }: AddReview
  ) {
    const newRecipe = getState().recipe;

    if(newRecipe){
      newRecipe?.reviews?.unshift(review);

      this.store.dispatch(new UpdateRecipe(newRecipe));
    }
  }

  @Action(DeleteReview)
  removeRecipeReview(
    { getState }: StateContext<RecipeStateModel>,
    { reviewId }: DeleteReview
  ) {
    const newRecipe = getState().recipe;

    if (newRecipe) {
      newRecipe.reviews = newRecipe?.reviews?.filter(
        (currentReview) => currentReview.reviewId !== reviewId
      );

      this.store.dispatch(new UpdateRecipe(newRecipe));
    }
  }

  @Action(DeleteRecipe)
    deleteRecipe({ patchState } : StateContext<RecipeStateModel>, { recipeId }: DeleteRecipe) {
        patchState({
            recipe : null
        })

        this.api.deleteRecipe(recipeId).subscribe( (response) => {
                console.log(response)
            },
            (error: Error) => {
                console.error('Failed to delete recipe:', error);
                this.store.dispatch(new ShowError(error.message))
            });
    }


    @Action(CreateRecipe)
    createRecipe({ patchState } : StateContext<RecipeStateModel>, { recipe } : CreateRecipe) {

        patchState({
            recipe : recipe
        })
        this.api.createNewRecipe(recipe);
    }

    @Action(RetrieveRecipe)
    retrieveRecipe( { setState } : StateContext<RecipeStateModel>, { recipeId } : RetrieveRecipe){
            this.api.getRecipeById(recipeId).subscribe( (recipe) => {
                if(recipe){
                    setState({
                        recipe : recipe
                    })
                }
                else {
                    this.store.dispatch( new ShowError("Error: Something is wrong with the recipe: " + recipe))
                }

            },
            (error: Error) => {
                console.error('Failed to retrieve recipe:', error);
                this.store.dispatch(new ShowError(error.message))
            })

    }
}
