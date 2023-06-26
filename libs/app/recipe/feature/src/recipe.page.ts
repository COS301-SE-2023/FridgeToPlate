import { Component } from '@angular/core';
import { recipeList } from "@fridge-to-plate/app/recipe/data-access";
import { IRecipe} from "@fridge-to-plate/app/recipe/utils";
import { NavigationBar } from "@fridge-to-plate/app/navigation/feature";
import { Location } from '@angular/common';

@Component({
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss']
})
export class RecipePage {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  recipe: IRecipe = recipeList[0];
}
