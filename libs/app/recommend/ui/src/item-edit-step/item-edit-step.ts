import { Component, ElementRef, ViewChild } from '@angular/core';
import { IQuantityIngredient } from '@fridge-to-plate/app/ingredient/utils';
import {
  IngredientItem,
  RecommendDataAccessModule,
  ingredientsArray,
} from '@fridge-to-plate/app/recommend/data-access';
//import {getAllIngredients, removeIngredient} from "@fridge-to-plate/app/recommend/data-access";

import { getAllIngredients } from '@fridge-to-plate/app/recommend/data-access';
import { RecommendApi } from '../../../data-access/src/recommend.api';

import { Observable, BehaviorSubject, switchMap, Subscription } from 'rxjs';

@Component({
  selector: 'item-edit-step',
  templateUrl: './item-edit-step.html',
  styleUrls: ['item-edit-step.scss'],
})
export class ItemEditStep {
  constructor(private recommendApiClient: RecommendApi) {}

  ingredientList: IQuantityIngredient[] | undefined;

  ingredientsToBeDeleted: string[] = [];

  order = '';

  @ViewChild('teams') orderBy!: ElementRef;

  ingredientItems$: Subscription = this.recommendApiClient
    .getUserIngredientsList()
    .subscribe({
      next: (userIngredients) => {
        this.ingredientList = userIngredients;
      },
      error: (error) => {
        this.ingredientList = [];
        console.log(error);
      },
    });

  removeItem(item: IQuantityIngredient) {
    //this.recommendApiClient.removeIngredient(item);
    this.ingredientsToBeDeleted.push(item.id);
    const updatedList = this.ingredientList?.filter(
      (item) => !this.ingredientsToBeDeleted.includes(item.id)
    );
    this.ingredientList = updatedList;
  }

  onChangeOrder() {
    if (this.order === '') return;
    else {
      switch (this.order) {
        case 'name-asc':
          this.ingredientList = this.ingredientList?.sort((a, b) =>
            a.name < b.name ? -1 : 1
          );
          break;
        case 'name-des':
          this.ingredientList = this.ingredientList?.sort((a, b) =>
            a.name > b.name ? -1 : 1
          );
          break;
        case 'quantity-asc':
          this.ingredientList = this.ingredientList?.sort(
            (a, b) => a.quantity - b.quantity
          );
          break;
        default:
          this.ingredientList = this.ingredientList?.sort(
            (a, b) => b.quantity - a.quantity
          );
          break;
      }
    }
  }
}
