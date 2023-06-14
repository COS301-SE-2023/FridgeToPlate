import { Component } from '@angular/core';
import {IngredientItem} from "@fridge-to-plate/app/recommend/data-access";
import {getAllIngredients, removeIngredient} from "@fridge-to-plate/app/recommend/data-access";
import {Observable, BehaviorSubject} from "rxjs";

@Component({
  selector: 'item-edit-step',
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
