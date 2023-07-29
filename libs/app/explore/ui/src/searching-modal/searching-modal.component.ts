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
  editExplore !: IExplore;


  @Output() closeFunc: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store) {
    this.explore$.pipe(take(1)).subscribe(explore => this.editExplore = Object.create(explore));
  }

  close() {
    this.closeFunc.emit();
  }

  search() {

    this.editExplore.search = this.searchText;
 
    this.store.dispatch(new CategorySearch(this.editExplore));

  }

}
