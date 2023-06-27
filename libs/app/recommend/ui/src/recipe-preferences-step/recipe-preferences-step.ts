import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RecommendApi } from 'libs/app/recommend/data-access/src/recommend.api';
import { Observable } from 'rxjs';

@Component({
  selector: 'recipe-preferences-step',
  templateUrl: './recipe-preferences-step.html',
  styleUrls: ['recipe-preferences-step.scss'],
})
export class RecipePreferencesStep {
  dietCategories: string[] = [];

  dietList$: Observable<string[]> = this.recommendApi.getDietList();

  recipePreferences = new FormGroup({
    diet: new FormControl(this.dietCategories),
    keywords: new FormControl([]),
    other: new FormGroup({
      difficulty: new FormControl('easy'),
      rating: new FormControl(3),
      numberOfServings: new FormControl(1),
    }),
  });

  dietSelect(dietPill: string) {
    if (typeof dietPill === 'string') {
      this.dietCategories?.push(dietPill);
      this.recipePreferences.controls['diet'].setValue(this.dietCategories);
    }
  }

  constructor(formBuilder: FormBuilder, private recommendApi: RecommendApi) {}
}
