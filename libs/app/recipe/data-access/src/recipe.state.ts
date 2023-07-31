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
  featuredRecipes: IRecipe[];
}

@State<RecipeStateModel>({
  name: 'recipe',
  defaults: {
    recipe: null,
    featuredRecipes: [
      {
        recipeImage: "https://example.com/recipe5.jpg",
        name: "Savory Stuffed Bell Peppers",
        description: "Delicious and colorful stuffed bell peppers",
        tags: ["stuffed", "bell peppers", "dinner"],
        meal: "Dinner",
        ingredients: [
          { name: "Bell Peppers", amount: 4, unit: "large" },
          { name: "Ground Beef", amount: 1, unit: "lb" },
          { name: "Rice", amount: 1, unit: "cup" },
          { name: "Onion", amount: 1, unit: "medium" },
          { name: "Tomatoes", amount: 2, unit: "medium" },
          { name: "Cheese", amount: 1, unit: "cup" },
          { name: "Salt", amount: 1, unit: "teaspoon" },
          { name: "Pepper", amount: 1, unit: "teaspoon" }
        ],
        steps: [
          "Cook the rice according to package instructions.",
          "Preheat the oven to 375°F (190°C).",
          "Cut the tops off the bell peppers and remove the seeds and membranes.",
          "In a skillet, cook the ground beef and onion until the beef is browned.",
          "Stir in the cooked rice, tomatoes, cheese, salt, and pepper.",
          "Stuff each bell pepper with the mixture.",
          "Place the stuffed bell peppers in a baking dish and bake for 25-30 minutes or until the peppers are tender.",
          "Enjoy these delicious and colorful stuffed bell peppers!"
        ],
        prepTime: 35,
        servings: 4,
        difficulty: "Medium",
        creator: "Michael"
      },
      {
        recipeImage: "https://example.com/recipe4.jpg",
        name: "Mouthwatering Smoothie",
        description: "A refreshing and delicious smoothie recipe",
        tags: ["smoothie", "healthy", "breakfast"],
        meal: "Breakfast",
        ingredients: [
          { name: "Banana", amount: 2, unit: "ripe" },
          { name: "Strawberries", amount: 1, unit: "cup" },
          { name: "Greek Yogurt", amount: 1, unit: "cup" },
          { name: "Honey", amount: 1, unit: "tablespoon" },
          { name: "Milk", amount: 1, unit: "cup" }
        ],
        steps: [
          "Blend the banana, strawberries, Greek yogurt, honey, and milk together until smooth.",
          "Pour the smoothie into a glass and enjoy!",
          "This refreshing smoothie is perfect for breakfast or as a healthy snack."
        ],
        prepTime: 10,
        servings: 2,
        difficulty: "Easy",
        creator: "Sophia",
      }
      

      
    ]
  }
})
@Injectable()
export class RecipeState {

  constructor(private api: RecipeAPI, private store: Store) {}

  @Selector()
  static getRecipe(state: RecipeStateModel) {
    return state.recipe;
  }

  @Selector()
  static getFeaturedRecipes(state: RecipeStateModel) {
    return state.featuredRecipes;
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
    { setState, getState}: StateContext<RecipeStateModel>,
    { recipeId }: RetrieveRecipe
  ) {

    const recipes = getState().featuredRecipes
    this.api.getRecipeById(recipeId).subscribe(
      (recipe) => {
        setState({
          recipe: recipe,
          featuredRecipes: recipes
        });
        
      },
      (error: Error) => {
        console.error('Failed to retrieve recipe:', error);
        this.store.dispatch(new ShowError(error.message));
      }
    );
  }
}