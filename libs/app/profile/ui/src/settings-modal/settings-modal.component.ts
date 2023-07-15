import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PreferencesState } from '@fridge-to-plate/app/preferences/data-access';
import { IPreferences, UpdatePreferences } from '@fridge-to-plate/app/preferences/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();

  @Select(PreferencesState.getPreference) preferences$ !: Observable<IPreferences>;
  editablePreferences !: IPreferences;

  constructor(private store: Store) {
    this.preferences$.pipe(take(1)).subscribe(preferences => this.editablePreferences = Object.create(preferences));
  }

  close() {
    this.closeFunc.emit();
  }

  save() {
    this.store.dispatch(new UpdatePreferences(this.editablePreferences));
  }
}
