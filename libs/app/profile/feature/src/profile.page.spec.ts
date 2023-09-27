import { TestBed } from "@angular/core/testing";
import { ProfilePage } from "./profile.page";
import { IonicModule } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";
import { NavigationBarModule } from "@fridge-to-plate/app/navigation/feature";
import { CloseSettings, IProfile, OpenSettings, RetrieveMealPlan, SortCreatedByDifficulty, SortCreatedByNameAsc, SortCreatedByNameDesc, SortSavedByDifficulty, SortSavedByNameAsc, SortSavedByNameDesc } from "@fridge-to-plate/app/profile/utils";
import { NgxsModule, State, Store } from "@ngxs/store";
import { take } from "rxjs";
import { Injectable } from "@angular/core";
import { ProfileUiModule } from "@fridge-to-plate/app/profile/ui";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RecipeCardComponent } from "libs/app/recipe/ui/src/recipe-card/recipe-card.component";
import { NgChartsModule } from 'ng2-charts';

describe("ProfilePage", () => {

  const testProfile: IProfile = {
    displayName: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
    savedRecipes: [],
    ingredients: [],
    profilePic: "image-url",
    createdRecipes: [],
    currMealPlan: {
      username: "jdoe",
      date: "2022-01-01",
      breakfast: null,
      lunch: null,
      dinner: null,
      snack: null,
    },
  };

  @State({
    name: 'profile',
    defaults: {
      profile: testProfile
    }
  })
  @Injectable()
  class MockProfileState {}

  let page: any;
  let compiled: any;
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, HttpClientModule, NavigationBarModule, NgxsModule.forRoot([MockProfileState]), ProfileUiModule, NgChartsModule],
      declarations: [ProfilePage, RecipeCardComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProfilePage);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    page = fixture.componentInstance;
  });

  it("should render users name", () => {
    page.profile$.pipe(take(1)).subscribe((profile: IProfile) => {
      expect(compiled.querySelector("h2")?.textContent).toContain(profile.displayName);
    })
  });

  it("should render users username", () => {
    page.profile$.pipe(take(1)).subscribe((profile: IProfile) => {
      expect(compiled.querySelector("h2")?.textContent).toContain(profile.username);
    })
  });

  it("should start on saved subpage", () => {
    expect(page.subpage).toEqual("saved");
  });

  it("should change subpage to saved", () => {
    page.displaySubpage("saved");
    expect(page.subpage).toEqual("saved");
  });

  it('should display meal plan subpage when subpageName is "meal plan" and currMealPlan is present in profile', () => {
      page.displaySubpage("meal plan");
      expect(page.subpage).toBe("meal plan");

      page.profile$.pipe(take(1)).subscribe((profile: IProfile) => {
      expect(profile.currMealPlan?.date).toBe(page.dateSelected);
      })
  });

  it("should change subpage to ingredients", () => {
    page.displaySubpage("ingredients");
    expect(page.subpage).toEqual("ingredients");
  });

  it("should change edit display to block", () => {
    page.openEditProfile();

    expect(page.displayEditProfile).toEqual("block");
  });

  it("should change edit display to none", () => {
    page.openEditProfile();
    page.closeEditProfile();

    expect(page.displayEditProfile).toEqual("none");
  });

  it("should change sort display to block", () => {
    page.openSort();

    expect(page.displaySort).toEqual("block");
  });

  it("should change sort display to none", () => {
    page.openSort();
    page.closeSort();

    expect(page.displaySort).toEqual("none");
  });

  it("should change shopping list display to block", () => {
    page.openShoppingList();

    expect(page.displayShoppinglist).toEqual("block");
  });

  it("should change shopping list display to none", () => {
    page.openShoppingList();
    page.closeShoppingList();

    expect(page.displayShoppinglist).toEqual("none");
  });

  it("should save profile", () => {
    page.openEditProfile();
    page.editableProfile.name = "JD";
    page.saveProfile();

    page.profile$.pipe(take(1)).subscribe((profile: IProfile) => {
      expect(profile).toEqual(page.editableProfile);
    })
  });

  it("Should dispatch Open Settings", () => {
    store = TestBed.inject(Store);
    const openSpy = jest.spyOn(store, 'dispatch');

    page.openSettings();
    expect(openSpy).toBeCalledWith(new OpenSettings());
  })

  it("Should dispatch Close Settings", () => {
    store = TestBed.inject(Store);
    const closeSpy = jest.spyOn(store, 'dispatch');
    page.openSettings();
    page.closeSettings();
    expect(closeSpy).toBeCalledWith(new CloseSettings());

  })

  it("should dispatch sort saved by difficulty", () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    page.sortSavedBy('difficulty');
    expect(dispatchSpy).toBeCalledWith(new SortSavedByDifficulty());
  });

  it("should dispatch sort saved by name ascending", () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    page.sortSavedBy('nameAsc');
    expect(dispatchSpy).toBeCalledWith(new SortSavedByNameAsc());
  });

  it("should dispatch sort saved by name descending", () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    page.sortSavedBy('nameDesc');
    expect(dispatchSpy).toBeCalledWith(new SortSavedByNameDesc());
  });

  it("should dispatch sort created by difficulty", () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    page.sortCreatedBy('difficulty');
    expect(dispatchSpy).toBeCalledWith(new SortCreatedByDifficulty());
  });

  it("should dispatch sort created by name ascending", () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    page.sortCreatedBy('nameAsc');
    expect(dispatchSpy).toBeCalledWith(new SortCreatedByNameAsc());
  });

  it("should dispatch sort created by name descending", () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    page.sortCreatedBy('nameDesc');
    expect(dispatchSpy).toBeCalledWith(new SortCreatedByNameDesc());
  });

  it("should open notifications page when notifications button is clicked", () => {
    const openNotificationsSpy = jest.spyOn(page, 'openNotifications');
    const notificationsButton = compiled.querySelector("#notifications-button");
    notificationsButton.click();
    expect(openNotificationsSpy).toHaveBeenCalled();
  });

  it("should dispatch retrieve meal plan", () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    const tempDate = '2022-09-12';
    page.dateSelected = tempDate;
    page.getMealPlan();
    expect(dispatchSpy).toBeCalledWith(new RetrieveMealPlan(tempDate));
  });
});

