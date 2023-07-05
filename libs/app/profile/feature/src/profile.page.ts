import { Component } from "@angular/core";
import { IProfile, UpdateProfile } from '@fridge-to-plate/app/profile/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from "rxjs";
import { ProfileState } from "@fridge-to-plate/app/profile/data-access";

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
  subpage = "saved";

  editableProfile !: IProfile;

  constructor(private store: Store) {
    this.profile$.pipe(take(1)).subscribe(profile => this.editableProfile = profile);
  }

  displaySubpage(subpageName : string) {
    this.subpage = subpageName;
  }

  openEditProfile() {
    // this.editableProfile = Object.create(this.profile$);
    this.displayEditProfile = "block";
  }

  closeEditProfile() {
    this.displayEditProfile = "none";
  }

  saveProfile() {
    this.store.dispatch(new UpdateProfile(this.editableProfile));
  }
}
