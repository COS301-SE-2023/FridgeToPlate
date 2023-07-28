import { Injectable } from "@angular/core";
import { CategorySearch, RetrieveProfile, RetrieveRecipe } from "@fridge-to-plate/app/explore/utils";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ExploreAPI } from "./explore.api";
import { IExplore } from "@fridge-to-plate/app/explore/utils";
import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";
import { IRecipeDesc } from "@fridge-to-plate/app/recipe/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";

export interface ExploreStateModel {
    explore: IExplore | null;
    recipes: IRecipeDesc[] ;

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
    CategorySearch({ getState } : StateContext<ExploreStateModel>, { category } : CategorySearch) {

        if(getState().accessToken != "none") {
        const accessToken = getState().accessToken;
        const params = {
            PreviousPassword: oldPassword,
            ProposedPassword: newPassword,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            AccessToken: accessToken!,
        };

        const region = 'eu-west-3';
        const cognito = new CognitoIdentityServiceProvider({ region });

        cognito.changePassword(params, (err, data) => {
            if (err) {
            console.error('Password change error:', err);
            } else {
            console.log('Password changed successfully.');
            }
        });
        
        
        }
    
  }
    

}