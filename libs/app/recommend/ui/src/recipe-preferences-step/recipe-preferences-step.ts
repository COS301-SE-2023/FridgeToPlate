import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { RecommendState } from '@fridge-to-plate/app/recommend/data-access';
import {
  IRecipePreferences,
  UpdateRecipePreferences,
} from '@fridge-to-plate/app/recommend/utils';
import { keywordsArray } from '@fridge-to-plate/app/recommend/utils';
@Component({
  selector: 'recipe-preferences-step',
  templateUrl: './recipe-preferences-step.html',
  styleUrls: ['recipe-preferences-step.scss'],
})
export class RecipePreferencesStep {
  @Select(RecommendState.getRecipePreferences)
  recipePreferences$!: Observable<IRecipePreferences>;
  keywordOptions = keywordsArray;

  editableRecipePreferences!: IRecipePreferences;

  constructor(private store: Store) {
    this.recipePreferences$
      .pipe(take(1))
      .subscribe(
        (recipePreferences) =>
          (this.editableRecipePreferences = Object.create(recipePreferences))
      );
  }

  updateRecipePreferences() {
    this.store.dispatch(
      new UpdateRecipePreferences(this.editableRecipePreferences)
    );
  }
}
