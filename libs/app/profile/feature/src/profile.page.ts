import { Component, DoCheck, OnInit } from "@angular/core";
import { CloseSettings, IProfile, OpenSettings, SortCreatedByDifficulty, SortCreatedByNameAsc, SortCreatedByNameDesc, SortSavedByDifficulty, SortSavedByNameAsc, SortSavedByNameDesc, UpdateProfile } from '@fridge-to-plate/app/profile/utils';
import { IPreferences, UpdatePreferences } from '@fridge-to-plate/app/preferences/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from "rxjs";
import { ProfileState } from "@fridge-to-plate/app/profile/data-access";
import { PreferencesState } from "@fridge-to-plate/app/preferences/data-access";
import { Navigate } from "@ngxs/router-plugin";
import { IMealPlan } from "@fridge-to-plate/app/meal-plan/utils";
import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";
import { IRecipe, RetrieveMealPlanIngredients } from "@fridge-to-plate/app/recipe/utils";
import { RecipeState } from "@fridge-to-plate/app/recipe/data-access";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "profile-page",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ProfilePage {

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile>;
  @Select(ProfileState.getSettings) settings$ !: Observable<string>;
  @Select(RecipeState.getIngredients) ingredients$ !: Observable<IIngredient[]>;

  displayShoppinglist = "none"
  displayEditProfile = "none";
  displaySort = "none";
  subpage = "saved";
  editableProfile !: IProfile;
  mealPlan!: IMealPlan;

  constructor(private store: Store) {
    this.profile$.pipe(take(1)).subscribe(profile => this.editableProfile = Object.create(profile));
    this.store.dispatch( new RetrieveMealPlanIngredients(this.editableProfile.username) )
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

  openShoppingList() {
    this.ingredients$.pipe(take(1)).subscribe(
      () => {
        this.displayShoppinglist = "block";
      }
    );
  }
  
  closeShoppingList() {
    this.displayShoppinglist = "none";
  }

  openSettings() {
    this.profile$.pipe(take(1)).subscribe(profile => this.editableProfile = Object.create(profile));
    this.store.dispatch(new OpenSettings());
  }

  closeSettings() {
    this.store.dispatch(new CloseSettings());
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
