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
      if(!this.dietCategories.includes(dietPill)){
        this.dietCategories?.push(dietPill);
        this.recipePreferences.controls['diet'].setValue(this.dietCategories);
        return;
      } else {
        this.recipePreferences.controls['diet'].setValue( this.dietCategories.filter( diet => diet !== dietPill));
      }
    }
  }

  submitChanges(){

  }

  onFormChanges() {
    this.recipePreferences.valueChanges.subscribe( value => {
      console.log('Updated Values: ', value);
    })
  }

  constructor(formBuilder: FormBuilder, private recommendApi: RecommendApi,  private store: Store) {
    this.preferences$
      .pipe(
        take(1)
      ).subscribe( formData => {

      this.recipePreferences = formBuilder.group({
        diet: [formData.diet],
        keywords: [formData.keywords],
        other: formBuilder.group({
          difficulty: [formData.other.difficulty],
          rating: [formData.other.rating],
          servings: [formData.other.servings],
        }),
      });

      this.onFormChanges();
    })
  }
}
