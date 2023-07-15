import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store} from "@ngxs/store";
import { DeleteRecipe, UpdateRecipe } from "@fridge-to-plate/app/recipe/utils"
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { RecipeAPI } from "./recipe.api";


export interface RecipeStateModel{
    recipe: IRecipe | null;
}

@State<RecipeStateModel>({
    name: 'edit-recipe',
    defaults: {
        recipe: {
            name: '',
            tags: [],
            difficulty: 'Medium',
            recipeImage: '',
            description: '',
            servings: 1,
            prepTime: 0,
            meal: 'Lunch',
            ingredients: [],
            steps: [],
            creator: '',
            reviews: [],
        }
    }
})

@Injectable()
export class RecipeState {

    constructor(private api: RecipeAPI, private store: Store) {}

    @Selector()
    static getRecipe(state: RecipeStateModel) {
        return state.recipe;
    }


    @Action(UpdateRecipe)
    updatedRecipe({ patchState } : StateContext<RecipeStateModel>, { recipe }: UpdateRecipe) {
        patchState({
            recipe : recipe
        })

        this.api.UpdateRecipe(recipe).subscribe( (response) => {
            console.log(response)
        },
        (error) => {
            console.error('Failed to update recipe:', error);
            this.store.dispatch(new ShowError(error.error.message))
        });
    }

    @Action(DeleteRecipe)
    deleteRecipe({ patchState } : StateContext<RecipeStateModel>, { recipeId }: DeleteRecipe) {
        patchState({
            recipe : null
        })

        this.api.deleteRecipe(recipeId).subscribe( (response) => {
                console.log(response)
            },
            (error) => {
                console.error('Failed to delete recipe:', error);
                this.store.dispatch(new ShowError(error.error.message))
            });
    }
}