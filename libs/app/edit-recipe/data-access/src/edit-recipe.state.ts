import { Injectable } from "@angular/core";
import { RecipeAPI } from "@fridge-to-plate/app/recipe/data-access";
import { IRecipe } from "@fridge-to-plate/app/recipe/utils";
import { Selector, Store, State, StateContext, Action} from "@ngxs/store";
import { environment } from '@fridge-to-plate/app/environments/utils';
import { LoadRecipe } from '@fridge-to-plate/app/edit-recipe/utils'

export interface EditRecipeStateModel {
    recipe: IRecipe | null;
}

const initialState:IRecipe = {
    description: '',
    servings: 0,
    prepTime: 0,
    meal: 'Breakfast',
    ingredients: [],
    steps: [],
    creator: '',
    name: '',
    tags: [],
    difficulty: 'Easy',
    recipeImage: ''
  };

  @State<EditRecipeStateModel>({
    name: 'recipe',
    defaults: {
      recipe: environment.TYPE === "production" ? null : initialState,
    }
  })

  @Injectable()
  export class RecipeState {
  
    constructor(private api: RecipeAPI, private store: Store) {}
  
    @Selector()
    static getRecipe(state: EditRecipeStateModel) {
      return state.recipe;
    }

    @Action(LoadRecipe)
    loadRecipe({setState}: StateContext<EditRecipeStateModel>, {recipe}: LoadRecipe) {
       setState({
              recipe: recipe
       })
    }
  
  }  
  