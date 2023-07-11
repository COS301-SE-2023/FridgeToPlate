import { Component, ElementRef, ViewChild } from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

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

  ingredientList: II[] | undefined ;

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

  removeItem(deleteItem: IIngredient) {
    console.log(deleteItem);

    console.log('To be deleted: ', deleteItem.name);
    const updatedList = this.ingredientList?.filter((item) => {
        return item.name !== deleteItem.name;
    });
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
        default:
          this.ingredientList = this.ingredientList?.sort((a, b) =>
            a.name > b.name ? -1 : 1
          );
          break;
      }
    }
  }
}
