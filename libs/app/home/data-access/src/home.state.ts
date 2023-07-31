import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { RetrieveFeaturedRecipes } from '../../utils/src/home.actions';
import { ExploreAPI } from '@fridge-to-plate/app/explore/data-access';
import { IExplore } from '@fridge-to-plate/app/explore/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';

export interface HomeStateModel {
  featuredRecipes: IRecipe[] | null;
}

@State<HomeStateModel>({
  name: 'home',
  defaults: {
    featuredRecipes: []
  }
})
@Injectable()
export class HomeState {

  constructor(private api: ExploreAPI, private store: Store) {}

  @Selector()
  static getFeaturedRecipes(state: HomeStateModel) {
    return state.featuredRecipes;
  }


  @Action(RetrieveFeaturedRecipes)
  async getRecipe({ setState }: StateContext<HomeStateModel>, { meal }: RetrieveFeaturedRecipes) {
    
    const explore : IExplore = {
      type: meal,
      search: "",
      tags: [],
      difficulty: "Any",
    };

    (await this.api.searchCategory(explore)).subscribe({
        next: data => {
            setState({
                featuredRecipes: data
            });
        },
        error: error => {
            this.store.dispatch(new ShowError('Failed to retrieved featured recipes'));
        }
    });
    
  }
}