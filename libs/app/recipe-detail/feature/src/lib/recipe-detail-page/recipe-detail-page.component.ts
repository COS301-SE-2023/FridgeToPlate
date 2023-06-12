import { Component } from '@angular/core';
import { recipeList} from "../../../../data-access/mock-data/mock-recipe-data";
import { IRecipe} from "../../../../../../../models/irecipe";

@Component({
  selector: 'fridge-to-plate-recipe-detail-page',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.css']
})
export class RecipeDetailPageComponent {
  recipe: IRecipe = recipeList[0];
}
