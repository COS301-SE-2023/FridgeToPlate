import {Component, Input} from '@angular/core';
import {IRecipe} from "../../../../../../../models/irecipe";

@Component({
  selector: 'fridge-to-plate-recipe-info-card',
  templateUrl: './recipe-info-card.component.html',
  styleUrls: ['./recipe-info-card.component.css'],
})
export class RecipeInfoCardComponent {
  @Input() recipe: IRecipe | undefined;
}
