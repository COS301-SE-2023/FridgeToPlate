import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { Select } from "@ngxs/store";
import { RecommendState } from "../../../data-access/src/recommend.state";

@Component({
  selector: 'recipe-list-step',
  templateUrl: './recipe-list-step.html',
  styleUrls: ['recipe-list-step.scss'],
})
export class RecipeListStep {

  @Select(RecommendState.getRecipes) recipes$ !: Observable<IRecipeDesc[]>;

}
