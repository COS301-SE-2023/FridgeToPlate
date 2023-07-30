import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Logout } from '@fridge-to-plate/app/auth/utils';
import { ExploreState } from '@fridge-to-plate/app/explore/data-access';
import { IPreferences, UpdatePreferences } from '@fridge-to-plate/app/preferences/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, debounceTime, distinctUntilChanged, filter, fromEvent, take, tap } from 'rxjs';
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

  @ViewChild('input') input: ElementRef;

  constructor(private store: Store) {
  }

  explorer() {

    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
        tap( (text) => {
          this.newSearchEvent.emit(this.searchText)
        })
    ).subscribe()
  }

}
