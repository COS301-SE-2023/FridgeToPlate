import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ExploreState } from '@fridge-to-plate/app/explore/data-access';
import { Select, Store } from '@ngxs/store';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { IExplore } from '@fridge-to-plate/app/explore/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'searching-modal',
  templateUrl: './searching-modal.component.html',
  styleUrls: ['./searching-modal.component.scss'],
})
export class SearchingModalComponent {

  @Input() searchTermFromParent : string;

  @Input() filterCount: number

  @Select(ExploreState.getExplore) explore$ !: Observable<IExplore>;
  searchText = "";

  result = "";

  @Output() newSearchEvent = new EventEmitter<string>();

  @Output() toggleSearchOverlayEvent = new EventEmitter<boolean>();

  @ViewChild('input') input: ElementRef;

  constructor(private store: Store) {
    this.searchText = this.searchTermFromParent ?? '';
  }

  explorer() {

    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(1100),
      distinctUntilChanged(),
        tap( (text) => {
          this.newSearchEvent.emit(this.searchText)
        })
    ).subscribe()
  }

  showSearchOverlay(){
    this.toggleSearchOverlayEvent.emit(true);
  }
}
