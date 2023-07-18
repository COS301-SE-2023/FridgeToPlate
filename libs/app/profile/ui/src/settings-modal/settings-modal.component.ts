import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Logout } from '@fridge-to-plate/app/auth/utils';
import { PreferencesState } from '@fridge-to-plate/app/preferences/data-access';
import { IPreferences, UpdatePreferences } from '@fridge-to-plate/app/preferences/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { ProfileState } from "@fridge-to-plate/app/profile/data-access";
import { IProfile } from '@fridge-to-plate/app/profile/utils';



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile>;

  @Select(PreferencesState.getPreference) preferences$ !: Observable<IPreferences>;

  editablePreferences !: IPreferences;
  tempProfile !: IProfile;

  constructor(private store: Store) {
    this.preferences$.pipe(take(1)).subscribe(preferences => this.editablePreferences = Object.create(preferences));
  }

  close() {
    this.closeFunc.emit();
  }

  save() {
    this.profile$.pipe(take(1)).subscribe(profile => this.tempProfile = Object.create(profile));

    if(this.tempProfile)
      this.editablePreferences.username = this.tempProfile.username;
      
    this.store.dispatch(new UpdatePreferences(this.editablePreferences));
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
