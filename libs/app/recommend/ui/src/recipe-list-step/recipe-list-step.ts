import { Component } from '@angular/core';
import { getRecommenedRecipes } from '@fridge-to-plate/app/recommend/data-access';
import {BehaviorSubject, Observable, debounceTime, map, take} from 'rxjs';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { RecommendApi } from 'libs/app/recommend/data-access/src/recommend.api';
import {Select, Store} from "@ngxs/store";
import {GetRecipeRecommendations, PreferenceFormInterface} from "../../../data-access/src/recommend.actions";
import {RecommendState} from "../../../data-access/src/recommend.state";

@Component({
  selector: 'recipe-list-step',
  templateUrl: './recipe-list-step.html',
  styleUrls: ['recipe-list-step.scss'],
})
export class RecipeListStep {
  recipes: IRecipe[] = [];

  recipeRecommendation$ = this.recommendApiClient.getRecommendations({}).pipe(
    debounceTime(1000),
    map((rec) => (this.recipes = rec))
  );

  @Select(RecommendState.getPreferences) preferences$ !: Observable<PreferenceFormInterface>;

  constructor(private recommendApiClient: RecommendApi, private state: Store) {
    this.preferences$
      .pipe(
        take(1))
      .subscribe( (userPreferences => {
        this.state.dispatch(new GetRecipeRecommendations(userPreferences));
      }));
  }
}
