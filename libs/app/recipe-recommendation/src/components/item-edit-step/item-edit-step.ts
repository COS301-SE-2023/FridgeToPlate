import { Component } from '@angular/core';
import {IngredientItem} from "../../data-access/mock-data/ingredients";
import {getAllIngredients} from "../../data-access/store/state";
import {Observable, BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-item-edit-step',
  templateUrl: './item-edit-step.html',
  styleUrls: ['item-edit-step.scss']
})
export class ItemEditStep {

  items: IngredientItem[] = getAllIngredients();

  ingredientItems$ = new BehaviorSubject<IngredientItem[]>(this.items);

  constructor() {
    console.log(this.items);
  }
}
