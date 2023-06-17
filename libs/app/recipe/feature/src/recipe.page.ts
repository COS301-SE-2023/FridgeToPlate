import {Component, OnInit} from '@angular/core';
import { recipeList } from "@fridge-to-plate/app/recipe/data-access";
import { IRecipe} from "@fridge-to-plate/app/recipe/utils";

@Component({
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss']
})
export class RecipePage implements OnInit {
  recipe: IRecipe = recipeList[0];

  ngOnInit() {
    console.log('Hello from here')
  }
}
