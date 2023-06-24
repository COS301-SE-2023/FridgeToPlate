import { Component } from '@angular/core';
import { QuantityIngredient } from '@fridge-to-plate/app/ingredient/utils';
import {
  IngredientItem,
  RecommendDataAccessModule,
} from '@fridge-to-plate/app/recommend/data-access';
//import {getAllIngredients, removeIngredient} from "@fridge-to-plate/app/recommend/data-access";

import { getAllIngredients } from '@fridge-to-plate/app/recommend/data-access';
import { RecommendApi } from '../../../data-access/src/recommend.api';

import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'item-edit-step',
  templateUrl: './item-edit-step.html',
  styleUrls: ['item-edit-step.scss'],
})
export class ItemEditStep {
  constructor(private recommendApiClient: RecommendApi) {}

  ingredientItems$ = this.recommendApiClient.getUserIngredientsList();

  removeItem(item: QuantityIngredient) {
    this.recommendApiClient.removeIngredient(item);
  }
}
