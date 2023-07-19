import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { CreateRecipe } from "@fridge-to-plate/app/create/utils";
import { CreateAPI } from "./create.api";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";


export interface CreateStateModel {
    recipe: IRecipe
}
@State<CreateStateModel>({
    name: 'create',
    defaults: {
        recipe : {
            recipeId : "",
            name : "",
            tags : [],
            difficulty : "Easy",
            recipeImage : "",
            description : "",
            servings : 0,
            prepTime : 0,
            meal : "Breakfast",
            ingredients : [],
            steps : [],
            creator : "",
            reviews : []
        }
    }
})

@Injectable()
export class CreateState {
    constructor(private api: CreateAPI) {}

    @Action(CreateRecipe)
    createRecipe({ patchState } : StateContext<CreateStateModel>, { recipe } : CreateRecipe) {

        patchState({
            recipe : recipe
        })
        this.api.createNewRecipe(recipe);
    }
}