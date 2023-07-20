import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Logout } from '@fridge-to-plate/app/auth/utils';
import { ExploreState } from '@fridge-to-plate/app/explore/data-access';
import { IPreferences, UpdatePreferences } from '@fridge-to-plate/app/preferences/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { Navigate } from "@ngxs/router-plugin";
import { RetrieveProfile } from '@fridge-to-plate/app/profile/utils';
import { RetrieveRecipe } from '@fridge-to-plate/app/explore/utils';

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
        this.store.dispatch(new RetrieveRecipe(this.searchText));
        this.store.dispatch(new RetrieveProfile(this.searchText));
        break;
      case 'Recipe':
        this.store.dispatch(new RetrieveRecipe(this.searchText));
        break;
      case 'People':
        this.store.dispatch(new RetrieveProfile(this.searchText));
        break;
    }

  }

}
