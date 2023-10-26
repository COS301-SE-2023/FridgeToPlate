import { Injectable } from "@angular/core";
import { CategorySearch } from "@fridge-to-plate/app/explore/utils";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ExploreAPI } from "./explore.api";
import { IExplore } from "@fridge-to-plate/app/explore/utils";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";

export interface ExploreStateModel {
    pastSearches: string[];
    explore: IExplore | null;
    recipes: IRecipe[] | null;
}

@State<ExploreStateModel>({
    name: 'explore',
    defaults: {
        pastSearches: [],
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
    static getPastSearches(state: ExploreStateModel) {
        return state.pastSearches;
    }

    @Selector()
    static getExplore(state: ExploreStateModel) {
        return state.explore;
    }

    @Selector()
    static getRecipes(state: ExploreStateModel) {
        return state.recipes;
    }

    @Action(CategorySearch)
    async CategorySearch({ patchState, getState } : StateContext<ExploreStateModel>, { search } : CategorySearch) {

        patchState({
            explore: search,
            recipes: null
        });

        if (search.search !== "" && search.search !== null) {
            let searchHistoryArr = getState().pastSearches;

            searchHistoryArr = searchHistoryArr.filter((value) => value !== search.search);
            searchHistoryArr.unshift(search.search);
            searchHistoryArr = searchHistoryArr.slice(0, 3);

            patchState({
                pastSearches: searchHistoryArr
            })
        }

        (await this.exploreAPI.searchCategory(search)).subscribe({
            next: data => {

              patchState({
                    recipes: data
                });

            },
            error: error => {
                this.store.dispatch(new ShowError("Unable to Retrieve Search Results"));
            }
        });

  }

}
