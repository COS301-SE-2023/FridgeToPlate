import { Injectable } from "@angular/core";
import { CategorySearch, RetrieveProfile, RetrieveRecipe } from "@fridge-to-plate/app/explore/utils";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ExploreAPI } from "./explore.api";
import { IExplore } from "@fridge-to-plate/app/explore/utils";
import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { Navigate } from "@ngxs/router-plugin";

export interface ExploreStateModel {
    explore: IExplore | null;
    recipes: IRecipe[] | null;

}

@State<ExploreStateModel>({
    name: 'explore',
    defaults: {
        explore: null,
        recipes: [],
    }
})


@Injectable()
export class ExploreState {

    constructor(private store: Store, private api: ExploreAPI) {}
    
    @Selector()
    static getExplore(state: ExploreStateModel) {
        return state.explore;
    }

    @Selector()
    static getRecipes(state: ExploreStateModel) {
        return state.recipes;
    }

    @Action(CategorySearch)
    CategorySearch({ setState } : StateContext<ExploreStateModel>, { category } : CategorySearch) {

        const result1 = this.api.searchCategory(category);

        setState({
            explore: null,
            recipes: result1 
          });

          this.store.dispatch(new Navigate(['/explore/results']));
    
  }
    

}