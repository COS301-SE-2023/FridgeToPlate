import { Component } from "@angular/core";
import { IProfile, UpdateProfile } from '@fridge-to-plate/app/profile/utils';
import { IPreferences, UpdatePreferences } from '@fridge-to-plate/app/preferences/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from "rxjs";
import { ProfileState } from "@fridge-to-plate/app/profile/data-access";
import { PreferencesState } from "@fridge-to-plate/app/preferences/data-access";
import { Navigate } from "@ngxs/router-plugin";
import { ShowError } from "@fridge-to-plate/app/error/utils";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "profile-page",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ProfilePage {

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile>;
  @Select(PreferencesState.getPreference) preferences$ !: Observable<IPreferences>;

  displayEditProfile = "none";
  displaySettings = "none";
  displaySort = "none";
  subpage = "saved";

  editableProfile !: IProfile;
  editablePreference !: IPreferences;

  constructor(private store: Store) {
    this.profile$.pipe(take(1)).subscribe(profile => this.editableProfile = Object.create(profile));
    this.preferences$.pipe(take(1)).subscribe(preferences => this.editablePreference = Object.create(preferences));
  }

  displaySubpage(subpageName : string) {
    this.subpage = subpageName;
  }

  openEditProfile() {
    this.profile$.pipe(take(1)).subscribe(profile => this.editableProfile = Object.create(profile));
    this.displayEditProfile = "block";
  }

  closeEditProfile() {
    this.displayEditProfile = "none";
  }

  openSettings() {
    this.profile$.pipe(take(1)).subscribe(profile => this.editableProfile = Object.create(profile));
    this.preferences$.pipe(take(1)).subscribe(preferences => this.editablePreference = Object.create(preferences));
    this.displaySettings = "block";
  }

  closeSettings() {
    this.displaySettings = "none";
  }

  saveProfile() {
    this.store.dispatch(new UpdateProfile(this.editableProfile));
  }

  openNotifications() {
    this.store.dispatch(new Navigate(['/profile/notifications']));
  }

  openSort() {
    this.displaySort = "block";
  }

  closeSort() {
    this.displaySort = "none";
  }

  save() {
    //this.store.dispatch(new UpdatePreferences(this.editablePreference));
    alert("SOMETHING HAPPENED");
  }
}
