import { Component } from "@angular/core";
import { IProfile,
  RetrieveMealPlan,
  SortCreatedByDifficulty,
  SortCreatedByNameAsc,
  SortCreatedByNameDesc,
  SortSavedByDifficulty,
  SortSavedByNameAsc,
  SortSavedByNameDesc,
  UpdateProfile,
  OpenSettings,
  CloseSettings
} from '@fridge-to-plate/app/profile/utils';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from "rxjs";
import { ProfileState } from "@fridge-to-plate/app/profile/data-access";
import { Navigate } from "@ngxs/router-plugin";
import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";
import { RetrieveMealPlanIngredients } from "@fridge-to-plate/app/recipe/utils";
import { RecipeState } from "@fridge-to-plate/app/recipe/data-access";
import { ChartData } from "chart.js";
import { MealPlanState } from "@fridge-to-plate/app/meal-plan/data-access";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "profile-page",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ProfilePage {

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile>;
  @Select(MealPlanState.getMealPlanChartData) mealPlanChartData$ !: Observable<ChartData>;
  @Select(ProfileState.getSettings) settings$ !: Observable<string>;
  @Select(RecipeState.getIngredients) ingredients$ !: Observable<IIngredient[]>;

  displayShoppinglist = "none"
  displayEditProfile = "none";
  displaySort = "none";
  subpage = "saved";
  dateSelected !: string;

  editableProfile !: IProfile;

  constructor(private store: Store) {
    this.profile$.pipe(take(1)).subscribe(profile => {
      this.editableProfile = Object.create(profile);
    });
    this.store.dispatch( new RetrieveMealPlanIngredients(this.editableProfile.currMealPlan) );
    this.dateSelected = new Date().toISOString().slice(0, 10);
  }

  displaySubpage(subpageName : string) {
    if (subpageName == 'meal plan') {
      this.profile$.pipe(take(1)).subscribe(profile => {
        if (profile.currMealPlan) {
          this.dateSelected = profile.currMealPlan.date;
        }
      });
    }

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

  getMealPlan() {
    this.store.dispatch(new RetrieveMealPlan(this.dateSelected));
  }
}
