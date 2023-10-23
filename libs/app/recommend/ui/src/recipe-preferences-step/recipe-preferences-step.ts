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
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-preferences-step',
  templateUrl: './recipe-preferences-step.html',
  styleUrls: ['recipe-preferences-step.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RecipePreferencesStep {
  @Select(RecommendState.getRecipePreferences) recipePreferences$!: Observable<IRecipePreferences>;
  keywordOptions = keywordsArray;
  selectedKeywords: string[] = [];
  editableRecipePreferences!: IRecipePreferences;

  constructor(private store: Store) {
    this.recipePreferences$
      .pipe(take(1))
      .subscribe(
        (recipePreferences) =>
          (this.editableRecipePreferences = Object.create(recipePreferences))
      );
  }
  
  keywordSelected(selectedKeyword: string) {
    if (this.selectedKeywords.includes(selectedKeyword)) {
      this.selectedKeywords = this.selectedKeywords.filter(
        (currentKeyword) => currentKeyword !== selectedKeyword
      );
    } else {
      this.selectedKeywords.push(selectedKeyword);
    }

    this.store.dispatch(
      new UpdateRecipePreferences({
        ...this.editableRecipePreferences,
        keywords: this.selectedKeywords,
      })
    );
  }

  filterKeywordsList(searchText: string) {
    this.keywordOptions = keywordsArray.filter((keyword) =>
      keyword.includes(searchText)
    );
  }

  updateRecipePreferences() {
    this.store.dispatch(
      new UpdateRecipePreferences(this.editableRecipePreferences)
    );
  }
}
