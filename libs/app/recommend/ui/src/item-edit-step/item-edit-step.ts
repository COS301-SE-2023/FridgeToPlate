import { Component } from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import {
  AddIngredient,
  RemoveIngredient,
} from '@fridge-to-plate/app/recommend/utils';
import { Select, Store } from '@ngxs/store';
import { RecommendState } from '@fridge-to-plate/app/recommend/data-access';
import { Observable } from 'rxjs';
import { measurementUnits } from '@fridge-to-plate/app/recommend/utils';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'item-edit-step',
  templateUrl: './item-edit-step.html',
  styleUrls: ['item-edit-step.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ItemEditStep {
  ingredientName = "";
  scannerOpened = false;
  isAddIngredientDisabled = true;
  unitsList = measurementUnits;

  @Select(RecommendState.getIngredients) ingredients$!: Observable<
    IIngredient[]
  >;

  constructor(private store: Store) {}

  removeItem(deleteItem: IIngredient) {
    this.store.dispatch(new RemoveIngredient(deleteItem));
  }

  addIngredient() {
    if (this.ingredientName != "") {
      const newIngredient: IIngredient = {
        name: this.ingredientName,
        amount: 0,
        unit: ''
      }
      
      this.store.dispatch(new AddIngredient(newIngredient));

      this.ingredientName = '';
    }
  }

  closeScanner() {
    this.scannerOpened = false;
  }

  openScanner() {
    this.scannerOpened = true;
  }
  //Function to simulate Reactive forms.
  checkIsFormValid() {
    if (
      this.ingredientName !== "" 
    ) {
      this.isAddIngredientDisabled = false;
    }
  }
}
