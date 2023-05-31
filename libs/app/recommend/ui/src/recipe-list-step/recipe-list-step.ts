import { Component } from '@angular/core';
import {getRecommenedRecipes} from "@fridge-to-plate/app/recommend/data-access";
import {BehaviorSubject, debounceTime, map} from "rxjs";
import {IRecipe} from "@fridge-to-plate/app/recommend/data-access";

@Component({
  selector: 'recipe-list-step',
  templateUrl: './recipe-list-step.html',
  styleUrls: ['recipe-list-step.scss']
})
export class RecipeListStep {
  recipes: IRecipe[] = getRecommenedRecipes();

  recipeRecommendation$ = new BehaviorSubject<IRecipe[]>(this.recipes).pipe(
    debounceTime(1000),
    map( recipes => recipes)
  );

  constructor() {

  }
}
