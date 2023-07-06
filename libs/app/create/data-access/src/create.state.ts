import { Injectable } from "@angular/core";
import { Action, State } from "@ngxs/store";
import { CreateRecipe } from "@fridge-to-plate/app/create/utils";
import { CreateAPI } from "./create.api";

@State({
    name: 'create',
    defaults: {}
})

@Injectable()
export class CreateState {
    constructor(private api: CreateAPI) {}

    @Action(CreateRecipe)
    createRecipe({ recipe } : CreateRecipe) {
        this.api.createNewRecipe(recipe);
    }
}