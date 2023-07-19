import { Injectable } from "@angular/core";
import { RetrieveProfile, RetrieveRecipe } from "@fridge-to-plate/app/explore/utils";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ExploreAPI } from "./explore.api";
import { IProfile } from "@fridge-to-plate/app/profile/utils";
import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";

export interface ExploreStateModel {
    profiles: IProfile | null;
    recipes: IRecipe | null;
}

@State<ExploreStateModel>({
    name: 'explore',
    defaults: {
        profiles: null,
        recipes: null,
    }
})

@Injectable()
export class ExploreState {

    constructor(private store: Store, private api: ExploreAPI) {}
    
    @Selector()
    static getProfiles(state: ExploreStateModel) {
        return state.profiles;
    }

    @Selector()
    static getRecipes(state: ExploreStateModel) {
        return state.recipes;
    }
    

    @Action(RetrieveProfile)
    async retrieveProfile({ setState } : StateContext<ExploreStateModel>, { username } : RetrieveProfile) {
        (await this.api.getProfile(username)).subscribe({
            next: data => {
                setState({
                    profiles: data,
                    recipes: null,
                });
            },
            error: error => {
                this.store.dispatch(new ShowError(error));
            }
        });
    }

    @Action(RetrieveRecipe)
    async retrieveRecipe({ setState } : StateContext<ExploreStateModel>, { recipename } : RetrieveRecipe) {
        (await this.api.getRecipes(recipename)).subscribe({
            next: data => {
                setState({
                    profiles: null,
                    recipes: data,
                });
            },
            error: error => {
                this.store.dispatch(new ShowError(error));
            }
        });
    }
}