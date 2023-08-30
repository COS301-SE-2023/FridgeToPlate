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
} from '@fridge-to-plate/app/recipe/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { catchError, take, tap } from 'rxjs';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { Navigate } from '@ngxs/router-plugin';
import { AddCreatedRecipe } from '@fridge-to-plate/app/profile/utils';

export interface RecipeStateModel {
  recipe: IRecipe | null;
}

@State<RecipeStateModel>({
  name: 'recipe',
  defaults: {
    recipe:
    {
      recipeId: '123',
      name: "Mock Recipe",
      recipeImage: "https://example.com/image.jpg",
      description: "Indulge in the comforting flavors of a hearty vegetable stew accompanied by fluffy, herbed dumplings. This versatile recipe combines an array of colorful vegetables, aromatic herbs, and tender dumplings to create a satisfying and wholesome meal. Perfect for chilly evenings or when you crave a nourishing dish, this vegetable stew with herbed dumplings is sure to delight your taste buds and warm your soul.",
      meal: "Dinner",
      creator: 'Paul Pilane',
      ingredients: [ {name: 'ingredient1' , amount : 5, unit : 'L'},{name: 'ingredient1' , amount : 5, unit : 'L'},{name: 'ingredient1' , amount : 5, unit : 'L'}, {name: 'ingredient2' , amount : 65, unit : 'ml'},{name: 'ingredient2' , amount : 3, unit : 'g'}
      ],
      steps: [
        "Preheat oven to 450 degrees F (230 C)",
        "Mix ingredients together",
        "Bake for 20 minutes",
        "Mock instructions",
        "Mock instructions",
      ],
      difficulty: "Easy",
      prepTime: 30,
      servings: 4,
      tags: ["mock", "recipe"],
      reviews: [
        { reviewId: "123_1", recipeId: "123", username: "Simphiwe",  rating: 4, description: "Amazing" },
        { reviewId: "123_2", recipeId: "123", username: "Azola",  rating: 1, description: "Terrible" },
        { reviewId: "123_3", recipeId: "123", username: "Kopano",  rating: 3, description: "Mid" },
      ],
      youtubeId: "https://www.youtube.com/watch?v=I5ER9pWl8Nw&ab_channel=ReelGo-Getters"
    }, // set back to null
  }
})
@Injectable()
export class RecipeState {

  constructor(private api: RecipeAPI, private store: Store) {}

  @Selector()
  static getRecipe(state: RecipeStateModel) {
    return state.recipe;
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
}
