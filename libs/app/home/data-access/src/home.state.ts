import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ClearFeaturedRecipes, RetrieveFeaturedRecipes } from '@fridge-to-plate/app/home/utils';
import { ExploreAPI } from '@fridge-to-plate/app/explore/data-access';
import { IExplore } from '@fridge-to-plate/app/explore/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';

export interface HomeStateModel {
  meal: string
  featuredRecipes: IRecipe[] | null;
}

@State<HomeStateModel>({
  name: 'home',
  defaults: {
    meal: '',
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
  async getRecipe({ setState, getState }: StateContext<HomeStateModel>, { meal }: RetrieveFeaturedRecipes) {

    if (getState().meal !== meal) {
      const explore : IExplore = {
        type: meal,
        search: "",
        tags: [],
        difficulty: "",
      };

      (await this.api.searchCategory(explore)).subscribe({
          next: data => {
              setState({
                  meal: meal,
                  featuredRecipes: data
              });
          },
          error: error => {
              this.store.dispatch(new ShowError('Failed to retrieved featured recipes'));
          }
      });
    }

  }

  @Action(ClearFeaturedRecipes)
  async  clearAllRecipes({ setState }: StateContext<HomeStateModel>){
    setState({
      meal: '',
      featuredRecipes: null
    })
  }
}
