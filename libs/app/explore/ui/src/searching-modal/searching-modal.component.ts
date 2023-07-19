import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Logout } from '@fridge-to-plate/app/auth/utils';
import { ExploreState } from '@fridge-to-plate/app/explore/data-access';
import { IPreferences, UpdatePreferences } from '@fridge-to-plate/app/preferences/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { Navigate } from "@ngxs/router-plugin";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'searching-modal',
  templateUrl: './searching-modal.component.html',
  styleUrls: ['./searching-modal.component.scss'],
})
export class SearchingModalComponent {

  searchText = "";
  result = "";


  @Output() closeFunc: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store) {
    return;
  }

  close() {
    this.closeFunc.emit();
  }

  search() {
    alert(this.result);

    switch (this.result) {
      case 'All':

        break;
      case 'Recipe':
        
        break;
      case 'People':
        
        break;
    }

  }

}
