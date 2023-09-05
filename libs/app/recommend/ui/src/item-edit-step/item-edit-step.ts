import { Component } from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { AddIngredient, RemoveIngredient } from '@fridge-to-plate/app/recommend/utils';
import { Select, Store } from '@ngxs/store';
import { RecommendState } from '@fridge-to-plate/app/recommend/data-access';
import {Observable } from 'rxjs';

@Component({
  selector: 'item-edit-step',
  templateUrl: './item-edit-step.html',
  styleUrls: ['item-edit-step.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ItemEditStep {

  order = '';
  ingredientName = '';
  ingredientAmount = 1;
  ingredientScale = '';

  torch = false;
  barcodeValue: any;
  scannerOpened = true;

  @Select(RecommendState.getIngredients) ingredients$ !: Observable<IIngredient[]>;
  
  constructor(private store: Store) {}

  removeItem(deleteItem: IIngredient) {
    this.store.dispatch(new RemoveIngredient(deleteItem));
  }

  addIngredient() {
    const testIngredient: IIngredient = {
      name: this.ingredientName,
      amount: this.ingredientAmount as number,
      unit: this.ingredientScale
    }
    
    this.store.dispatch(new AddIngredient(testIngredient));
  }

  closeScanner() {
    this.scannerOpened = false;
  }

  openScanner() {
    this.scannerOpened = true;
  }
}