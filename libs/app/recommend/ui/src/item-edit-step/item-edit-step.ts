import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { AddIngredient, IProfile, RemoveIngredient } from '@fridge-to-plate/app/profile/utils';
import { Select, Store } from '@ngxs/store';
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
  
  constructor(private store: Store) {}

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile>;

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
}
