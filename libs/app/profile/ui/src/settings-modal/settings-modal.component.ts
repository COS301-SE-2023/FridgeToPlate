import { Component, EventEmitter, Output } from '@angular/core';
import { Logout } from '@fridge-to-plate/app/auth/utils';
import { PreferencesState } from '@fridge-to-plate/app/preferences/data-access';
import { IPreferences, ChangePreference } from '@fridge-to-plate/app/preferences/utils';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent {
  @Output() closeFunc: EventEmitter<any> = new EventEmitter();

  @Select(PreferencesState.getPreference) preferences$ !: Observable<IPreferences>;

  constructor(private store: Store) { }

  displayChangePassword = "none";

  close() {
    this.closeFunc.emit();
  }

  save(option: string) {      
    this.store.dispatch(new ChangePreference(option));
  }

  logout() {
    this.store.dispatch(new Logout());
    this.close();
  }

  openPassword(){
    this.displayChangePassword = "block";
  }

  openHelp(){
      this.store.dispatch(new Navigate(['/help']));
  }

  closeChangePassword() {
    this.displayChangePassword = "none";
  }

}
