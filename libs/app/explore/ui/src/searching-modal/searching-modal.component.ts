import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { ExploreState } from '@fridge-to-plate/app/explore/data-access';
import { Select, Store } from '@ngxs/store';
import {
  pipe,
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  fromEvent,
  takeUntil,
  tap,
} from 'rxjs';
import { IExplore } from '@fridge-to-plate/app/explore/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'searching-modal',
  templateUrl: './searching-modal.component.html',
  styleUrls: ['./searching-modal.component.scss'],
})
export class SearchingModalComponent implements AfterViewInit, OnDestroy {
  @Input() searchTermFromParent: string;

  @Input() filterCount: number;

  @Input() clearSearchTermObservable$: Observable<boolean>;

  @Select(ExploreState.getExplore) explore$!: Observable<IExplore>;
  searchText = '';

  result = '';

  @Output() newSearchEvent = new EventEmitter<string>();

  @Output() toggleSearchOverlayEvent = new EventEmitter<boolean>();

  @ViewChild('input') input: ElementRef;

  emitSearchTermEvent$: Observable<unknown>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  clearSearchTermEventObservable$: Observable<boolean>;

  constructor(private store: Store) {
    this.searchText = this.searchTermFromParent ?? '';
  }

  ngAfterViewInit(): void {
    this.emitSearchTermEvent$ = fromEvent<KeyboardEvent>(
      this.input.nativeElement,
      'keyup'
    ).pipe(
      filter((e: KeyboardEvent) => e.key === 'Enter'),
      distinctUntilChanged(),
      tap(() => {
        this.newSearchEvent.emit(this.searchText);
      })
    );

    this.clearSearchTermEventObservable$ = this.clearSearchTermObservable$.pipe(
      takeUntil(this.destroy$),
      filter((signal) => signal === true)
    );

    this.clearSearchTermObservable$.subscribe(() => {
      this.searchText = '';
    });
  }
  explorer() {
    this.emitSearchTermEvent$.subscribe();
  }

  searchClick() {
    if (this.searchText !== '') {
      this.newSearchEvent.emit(this.searchText);
    }
  }
  showSearchOverlay() {
    this.toggleSearchOverlayEvent.emit(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
