import { Component } from '@angular/core';
import { recipeList } from "@fridge-to-plate/app/recipe/data-access";
import { IRecipe} from "@fridge-to-plate/app/recipe/utils";

@Component({
  selector: 'recipe-page',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss']
})
export class RecipePage {
  recipe: IRecipe = recipeList[0];
}
