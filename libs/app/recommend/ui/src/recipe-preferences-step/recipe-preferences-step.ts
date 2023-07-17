import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RecommendApi } from 'libs/app/recommend/data-access/src/recommend.api';
import {Observable, take} from 'rxjs';
import {Select, Store} from "@ngxs/store";
import {RecommendState} from "../../../data-access/src/recommend.state";
import {PreferenceFormInterface} from "../../../data-access/src/recommend.actions";

@Component({
  selector: 'recipe-preferences-step',
  templateUrl: './recipe-preferences-step.html',
  styleUrls: ['recipe-preferences-step.scss'],
})
export class RecipePreferencesStep {
  dietCategories: string[] = [];

  dietList$: Observable<string[]> = this.recommendApi.getDietList();

  @Select(RecommendState.getPreferences) preferences$ !: Observable<PreferenceFormInterface>;

  recipePreferences: FormGroup;

  dietSelect(dietPill: string) {
    if (typeof dietPill === 'string') {
      this.dietCategories?.push(dietPill);
      this.recipePreferences.controls['diet'].setValue(this.dietCategories);
    }
  }

  submitChanges(){

  }

  constructor(formBuilder: FormBuilder, private recommendApi: RecommendApi,  private store: Store) {
    this.preferences$
      .pipe(
        take(1)
      ).subscribe( formData => {

      this.recipePreferences = new FormGroup({
        diet: new FormControl(this.dietCategories),
        keywords: new FormControl(formData.keywords),
        other: new FormGroup({
          difficulty: new FormControl(formData.other.difficulty),
          rating: new FormControl(formData.other.rating),
          servings: new FormControl(formData.other.servings),
        }),
      });
    })
  }
}
