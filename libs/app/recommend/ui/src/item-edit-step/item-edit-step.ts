import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

import { getAllIngredients } from '@fridge-to-plate/app/recommend/data-access';
import { RecommendApi } from '../../../data-access/src/recommend.api';

import {Observable, BehaviorSubject, switchMap, Subscription, tap, take} from 'rxjs';
import {Select, Store} from "@ngxs/store";
import {RecommendState} from "../../../data-access/src/recommend.state";
import {RefreshIngredientsList, UpdateIngredients} from "../../../data-access/src/recommend.actions";

@Component({
  selector: 'item-edit-step',
  templateUrl: './item-edit-step.html',
  styleUrls: ['item-edit-step.scss'],
})
export class ItemEditStep {

  ingredientList: IIngredient[] | undefined;

  ingredientsToBeDeleted: string[] = [];

  @Select(RecommendState.getIngredients) ingredientItem$ !: Observable<IIngredient[]>;


  constructor(private recommendApiClient: RecommendApi, private store: Store) {
    store.dispatch(new RefreshIngredientsList());
  }


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
    this.ingredientItem$
      .pipe(
        take(1)
      ).subscribe(
      ingredientsList => {

        const newIngredientsArray = ingredientsList.filter(item => item.name !== deleteItem.name)

        this.store.dispatch(new UpdateIngredients(newIngredientsArray))
      }
    )
  }

  onChangeOrder() {
    if (this.order === '') return;
    else{
      this.ingredientItem$
        .pipe(
          take(1)
        ).subscribe( ingredientsList => {

          let newTempList = ingredientsList;

          switch (this.order) {
            case 'name-asc':
              newTempList = ingredientsList.sort((a, b) =>
                a.name < b.name ? -1 : 1
              );
              this.store.dispatch(new UpdateIngredients(newTempList))
              break;
            case 'name-des':
              newTempList = ingredientsList.sort((a, b) =>
                a.name > b.name ? -1 : 1
              );
              this.store.dispatch(new UpdateIngredients(newTempList))
              break;
            case 'quantity-asc':
              this.ingredientList = ingredientsList.sort((a, b) =>
                a.amount < b.amount ? -1 : 1
              );
              this.store.dispatch(new UpdateIngredients(newTempList))
              break;
            default:
              this.ingredientList = ingredientsList.sort((a, b) =>
                a.amount > b.amount ? -1 : 1
              );
              this.store.dispatch(new UpdateIngredients(newTempList))
              break;
          }
      })
    }

    //else {

    // }
  }

}
