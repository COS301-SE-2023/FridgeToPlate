import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { Select } from '@ngxs/store';
import { RecommendState } from '@fridge-to-plate/app/recommend/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-list-step',
  templateUrl: './recipe-list-step.html',
  styleUrls: ['recipe-list-step.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RecipeListStep {
  @Select(RecommendState.getRecipes) recipes$!: Observable<IRecipeDesc[]>;
}
