import { Component, OnInit } from '@angular/core';
import { NavigationBar } from '@fridge-to-plate/app/navigation/feature';
import { Store } from '@ngxs/store';
import { GetUpdatedRecommendation } from '../../utils/src/recommend.actions';

@Component({
  selector: 'app-recipe-recommendation',
  templateUrl: './recommend.page.html',
  styleUrls: ['./recommend.page.scss'],
})
export class RecommendPage {
  constructor(private store: Store) {}
}
