import { Component} from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'results-modal',
  templateUrl: './results-modal.component.html',
  styleUrls: ['./results-modal.component.scss'],
})

export class ResultsModalComponent {

  constructor(private store: Store) { }
  
  // viewRecipe() {
  //   return;
  // }

}
