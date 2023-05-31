import { Component } from '@angular/core';
import {IngredientItem} from "../../../feature/src/data-access/mock-data/ingredients";
import {getAllIngredients, removeIngredient} from "../../../feature/src/data-access/store/state";
import {Observable, BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-item-edit-step',
  templateUrl: './item-edit-step.html',
  styleUrls: ['item-edit-step.scss']
})
export class ItemEditStep {

  items: IngredientItem[] = getAllIngredients();

  ingredientItems$ = new BehaviorSubject<IngredientItem[]>(this.items);

  removeItem(item: IngredientItem){
    this.ingredientItems$.next(removeIngredient(item, this.items));
  }

  constructor() {
  }
}
