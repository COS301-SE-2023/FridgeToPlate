import { Component } from "@angular/core";
import { IProfile, SortCreatedByDifficulty, SortCreatedByNameAsc, SortCreatedByNameDesc, SortSavedByDifficulty, SortSavedByNameAsc, SortSavedByNameDesc, UpdateProfile } from '@fridge-to-plate/app/profile/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from "rxjs";
import { ProfileState } from "@fridge-to-plate/app/profile/data-access";
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

  displayEditProfile = "none";
  displaySettings = "none";
  displaySort = "none";
  subpage = "saved";

  editableProfile !: IProfile;

  constructor(private store: Store) {
    this.profile$.pipe(take(1)).subscribe(profile => this.editableProfile = Object.create(profile));
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

  sortSavedBy(type: string) {
    if (type === 'difficulty') {
      this.store.dispatch(new SortSavedByDifficulty());
    } else if (type === 'nameAsc') {
      this.store.dispatch(new SortSavedByNameAsc());
    } else if (type === 'nameDesc') {
      this.store.dispatch(new SortSavedByNameDesc());
    }

    this.closeSort();
  }

  sortCreatedBy(type: string) {
    if (type === 'difficulty') {
      this.store.dispatch(new SortCreatedByDifficulty());
    } else if (type === 'nameAsc') {
      this.store.dispatch(new SortCreatedByNameAsc());
    } else if (type === 'nameDesc') {
      this.store.dispatch(new SortCreatedByNameDesc());
    }

    this.closeSort();
  }
}
