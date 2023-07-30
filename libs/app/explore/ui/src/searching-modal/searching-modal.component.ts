import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Logout } from '@fridge-to-plate/app/auth/utils';
import { ExploreState } from '@fridge-to-plate/app/explore/data-access';
import { IPreferences, UpdatePreferences } from '@fridge-to-plate/app/preferences/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { Navigate } from "@ngxs/router-plugin";
import { RetrieveProfile } from '@fridge-to-plate/app/profile/utils';
import { CategorySearch, IExplore, RetrieveRecipe } from '@fridge-to-plate/app/explore/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'searching-modal',
  templateUrl: './searching-modal.component.html',
  styleUrls: ['./searching-modal.component.scss'],
})
export class SearchingModalComponent {

  @Select(ExploreState.getExplore) explore$ !: Observable<IExplore>;
  searchText = "";
  result = "";


  @Output() newSearchEvent = new EventEmitter<string>();

  constructor(private store: Store) {
  }

  explorers() {

    this.newSearchEvent.emit(this.searchText);

  }

}
