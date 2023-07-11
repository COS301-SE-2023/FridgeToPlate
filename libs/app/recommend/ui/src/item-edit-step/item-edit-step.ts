import { Component, ElementRef, ViewChild } from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { AddIngredient, IProfile, RemoveIngredient } from '@fridge-to-plate/app/profile/utils';
import { RecommendApi } from '@fridge-to-plate/app/recommend/data-access';
import { Select, Store } from '@ngxs/store';

import { Observable, BehaviorSubject, switchMap, Subscription } from 'rxjs';

@Component({
  selector: 'item-edit-step',
  templateUrl: './item-edit-step.html',
  styleUrls: ['item-edit-step.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ItemEditStep {
  
  constructor(private store: Store) {}

  order = '';
  ingredientName: string = '';
  ingredientAmount: number | null = null;
  ingredientScale: string = '';

  @ViewChild('teams') orderBy!: ElementRef;
  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile>;

  removeItem(deleteItem: IIngredient) {
    this.store.dispatch(new RemoveIngredient(deleteItem));
  }

  onChangeOrder() {
    // if (this.order === '') return;
    // else {
    //   switch (this.order) {
    //     case 'name-asc':
    //       this.ingredientList = this.ingredientList?.sort((a, b) =>
    //         a.name < b.name ? -1 : 1
    //       );
    //       break;
    //     default:
    //       this.ingredientList = this.ingredientList?.sort((a, b) =>
    //         a.name > b.name ? -1 : 1
    //       );
    //       break;
    //   }
    // }
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
