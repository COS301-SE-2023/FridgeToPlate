import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select } from "@ngxs/store";
import { RecommendState } from "../../../data-access/src/recommend.state";
import { IRecipePreferences } from '@fridge-to-plate/app/recommend/utils';

@Component({
  selector: 'recipe-preferences-step',
  templateUrl: './recipe-preferences-step.html',
  styleUrls: ['recipe-preferences-step.scss'],
})
export class RecipePreferencesStep {

  @Select(RecommendState.getRecipePreferences) recipePreferences$ !: Observable<IRecipePreferences>;

  recipePreferences: FormGroup;

  keywordTerm: string;
}
