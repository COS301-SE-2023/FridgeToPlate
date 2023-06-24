import { Component } from '@angular/core';
import { QuantityIngredient } from '@fridge-to-plate/app/ingredient/utils';
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

  ingredientList: QuantityIngredient[] | undefined;
  ingredientsToBeDeleted: string[] = [];

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

  removeItem(item: QuantityIngredient) {
    //this.recommendApiClient.removeIngredient(item);
    this.ingredientsToBeDeleted.push(item.id);
    const updatedList = this.ingredientList?.filter(
      (item) => !this.ingredientsToBeDeleted.includes(item.id)
    );
    this.ingredientList = updatedList;
  }
}
