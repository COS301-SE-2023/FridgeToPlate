import { Component } from '@angular/core';
import { getRecommenedRecipes } from '@fridge-to-plate/app/recommend/data-access';
import { BehaviorSubject, Observable, debounceTime, map } from 'rxjs';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { RecommendApi } from 'libs/app/recommend/data-access/src/recommend.api';

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

  constructor(private recommendApiClient: RecommendApi) {}
}
