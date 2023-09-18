import { Component, OnInit } from '@angular/core';
import { NavigationBar } from '@fridge-to-plate/app/navigation/feature';
import { Store } from '@ngxs/store';
import { GetUpdatedRecommendation } from '@fridge-to-plate/app/recommend/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-recipe-recommendation',
  templateUrl: './recommend.page.html',
  styleUrls: ['./recommend.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RecommendPage {
  constructor(private store: Store) {}
}
