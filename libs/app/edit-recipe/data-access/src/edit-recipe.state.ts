import { Injectable } from "@angular/core";
import { RecipeAPI } from "@fridge-to-plate/app/recipe/data-access";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";
import { Selector, Store, State, StateContext, Action} from "@ngxs/store";
import { LoadRecipe } from '@fridge-to-plate/app/edit-recipe/utils'
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { Navigate } from "@ngxs/router-plugin";

export interface EditRecipeStateModel {
  editRecipe: IRecipe | null;
}


  @State<EditRecipeStateModel>({
    name: 'editRecipe',
    defaults: {
      editRecipe: null,
    }
  })

  @Injectable()
  export class RecipeState {

    constructor(private api: RecipeAPI, private store: Store) {}

    @Selector()
    static getEditRecipe(state: EditRecipeStateModel) {
      return state.editRecipe;
    }

    @Action(LoadRecipe)
    loadRecipe({setState}: StateContext<EditRecipeStateModel>, {recipeId}: LoadRecipe) {

         this.api.getRecipeById(recipeId).subscribe((recipe) => {
            setState({
              editRecipe: recipe,
            });
            this.store.dispatch(new Navigate(['/edit-recipe']));
          },
          (error: Error) => {
            this.store.dispatch(new ShowError("An Error Occurred While Loading Recipe"));
          }
        );
    }

  }
