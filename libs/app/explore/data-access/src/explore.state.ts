import { Injectable } from "@angular/core";
import { RetrieveProfile, RetrieveIngredient, RetrieveRecipe } from "@fridge-to-plate/app/explore/utils";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ExploreAPI } from "./explore.api";
import { IProfile } from "@fridge-to-plate/app/profile/utils";
import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";

export interface ExploreStateModel {
    profiles: IProfile | null;
    ingredients: IIngredient | null;
    recipes: IRecipe | null;
}

@State<ExploreStateModel>({
    name: 'explore',
    defaults: {
        profiles: null,
        ingredients: null,
        recipes: null,
    }
})

@Injectable()
export class ExploreState {

    constructor(private api: ExploreAPI) {}
    
    @Selector()
    static getProfiles(state: ExploreStateModel) {
        return state.profiles;
    }

    @Selector()
    static getIngredients(state: ExploreStateModel) {
        return state.ingredients;
    }

    @Selector()
    static getRecipes(state: ExploreStateModel) {
        return state.recipes;
    }
    

    // @Action(RetrieveProfile)
    // retrieveSearch({ getState } : StateContext<ExploreStateModel>, { type } : number) {
        
    //     this.api.retrieveSearch(type);
    // }
}