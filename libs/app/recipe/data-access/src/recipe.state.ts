import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store} from "@ngxs/store";
import { CreateRecipe, DeleteRecipe, RetrieveRecipe, UpdateRecipe } from "@fridge-to-plate/app/recipe/utils"
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { RecipeAPI } from "./recipe.api";
import { Location } from "@angular/common";

export interface RecipeStateModel{
    recipe: IRecipe | null;
}

@State<RecipeStateModel>({
    name: 'recipe',
    defaults: {
        recipe: {
            recipeId : 'b6df9e16-4916-4869-a7d9-eb0293142f1f',
            name: 'Hello world',
            tags: [],
            difficulty: 'Medium',
            recipeImage: 'https://img.freepik.com/free-photo/frying-pan-empty-with-various-spices-black-table_1220-561.jpg',
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

    constructor(private api: RecipeAPI, private store: Store, private location: Location) {}

    @Selector()
    static getRecipe(state: RecipeStateModel) {
        return state.recipe;
    }


    @Action(UpdateRecipe)
    updatedRecipe({ patchState } : StateContext<RecipeStateModel>, { recipe }: UpdateRecipe) {


        this.api.UpdateRecipe(recipe).subscribe( (response) => {
            console.log(response)
            patchState({
                recipe : recipe
            })
            this.location.back();
        },
        (error: Error) => {
            console.error('Failed to update recipe:', error);
            this.store.dispatch(new ShowError(error.message))
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
        this.api.createNewRecipe(recipe).subscribe({
            error: error => {
              this.store.dispatch(new ShowError(error.message));
            }
          });
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