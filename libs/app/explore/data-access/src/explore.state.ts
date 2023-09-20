import { Injectable } from "@angular/core";
import { CategorySearch } from "@fridge-to-plate/app/explore/utils";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ExploreAPI } from "./explore.api";
import { IExplore } from "@fridge-to-plate/app/explore/utils";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { patch } from "@ngxs/store/operators";

export interface ExploreStateModel {
    explore: IExplore | null;
    recipes: IRecipe[] | null;

}

@State<ExploreStateModel>({
    name: 'explore',
    defaults: {
        explore: {
            type: "",
            search : "",
            tags : [],
            difficulty : "",
        },
        recipes: [],
    }
})


@Injectable()
export class ExploreState {

    constructor(private store: Store, private exploreAPI: ExploreAPI) {}

    @Selector()
    static getExplore(state: ExploreStateModel) {
        return state.explore;
    }

    @Selector()
    static getRecipes(state: ExploreStateModel) {
        return state.recipes;
    }

    @Action(CategorySearch)
    async CategorySearch({ setState, patchState } : StateContext<ExploreStateModel>, { search } : CategorySearch) {

        setState({
            explore: search,
            recipes: null
        });

        (await this.exploreAPI.searchCategory(search)).subscribe({
            next: data => {

              patchState({
                    recipes: data
                });

            },
            error: error => {
                this.store.dispatch(new ShowError("Unable to Retrieve Search Results"));
                console.log(error);
            }
        });

  }

}
