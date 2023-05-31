import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-recipe-preferences-step',
  templateUrl: './recipe-preferences-step.html',
  styleUrls: ['recipe-preferences-step.scss']
})
export class RecipePreferencesStep {

  dietCategories = ['Vegan','Vegetarian','Ketogenic','Paleo-tonic','Low-carb','Pescatarian']

  recipePreferences = new FormGroup({
    diet: new FormControl(''),
    keywords: new FormControl([]),
    other: new FormGroup({
      difficulty: new FormControl('easy'),
      rating: new FormControl(3),
      numberOfServings: new FormControl(1)
    })
  })
  constructor(formBuilder:FormBuilder) {
  }
}
