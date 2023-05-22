import { Component } from '@angular/core';
import {IngredientItem} from "../../data-access/mock-data/ingredients";
import {getAllIngredients, getRecommenedRecipes} from "../../data-access/store/state";
import {BehaviorSubject, debounceTime, map} from "rxjs";
import {IRecipe} from "../../data-access/mock-data/recipes";

@Component({
  selector: 'app-recipe-list-step',
  templateUrl: './recipe-list-step.html',
  styleUrls: ['recipe-list-step.scss']
})
export class RecipeListStep {
  recipes: IRecipe[] = getRecommenedRecipes();

  recipeRecommendation$ = new BehaviorSubject<IRecipe[]>(this.recipes).pipe(
    //debounceTime(1000),
    map( recipes => recipes)
  );

  constructor() {

  }
}
