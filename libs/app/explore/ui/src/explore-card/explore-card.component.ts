import { Component, Input } from '@angular/core';
import { IExplore } from '@fridge-to-plate/app/explore/utils';
import { Store } from '@ngxs/store';
import { IonicModule } from '@ionic/angular';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'explore-card',
  templateUrl: './explore-card.component.html',
  styleUrls: ['./explore-card.component.scss'],
})
export class ExploreCardComponent {

  //explore : IExplore;
  bookmarked = false;
  editable = false;
  @Input() explore !: any;


  constructor() {
    return;
  }

}
