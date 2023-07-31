import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { RetrieveFeaturedRecipes } from '../../utils/src/home.actions';
import { RecipeAPI } from '@fridge-to-plate/app/recipe/data-access';

export interface HomeStateModel {
  featuredRecipes: IRecipe[];
}

@State<HomeStateModel>({
  name: 'recipe',
  defaults: {
    featuredRecipes: []
  }
})
@Injectable()
export class HomeState {

  constructor(private api: RecipeAPI, private store: Store) {}

  @Selector()
  static getFeaturedRecipes(state: HomeStateModel) {
    return state.featuredRecipes;
  }


  @Action(RetrieveFeaturedRecipes)
  async getRecipe({ setState }: StateContext<HomeStateModel>, { meal }: RetrieveFeaturedRecipes) {

    // (await this.api.getProfile(meal)).subscribe({
    //     next: data => {
    //         setState({
    //             featuredRecipes: data
    //         });
    //     },
    //     error: error => {
    //         this.store.dispatch(new ShowError('Failed to retrieved featured recipes'));
    //     }
    // });
    
  }
}