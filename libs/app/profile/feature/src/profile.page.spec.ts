import {ComponentFixture, TestBed} from "@angular/core/testing";
import { ProfilePage } from "./profile.page";
import { IonicModule } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";
import { NavigationBarModule } from "@fridge-to-plate/app/navigation/feature";
import { IProfile, SortCreatedByDifficulty, SortCreatedByNameAsc, SortCreatedByNameDesc, SortSavedByDifficulty, SortSavedByNameAsc, SortSavedByNameDesc } from "@fridge-to-plate/app/profile/utils";
import { NgxsModule, State, Store } from "@ngxs/store";
import { of, take } from "rxjs";
import { Injectable } from "@angular/core";
import {NotificationsPage} from "../../../notifications/feature/src/notifications.page";
import {Router, Routes} from "@angular/router";
import {NotificationsUiModule} from "@fridge-to-plate/app/notifications/ui";
import {RouterTestingModule} from "@angular/router/testing";
import {TabbedComponent} from "../../../core/src/tabbed-component/tabbed-component";
import {TabComponent} from "../../../notifications/ui/src/tab/tab.component";

describe("ProfilePage", () => {

  const testProfile: IProfile = {
    displayName: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
    savedRecipes: [],
    ingredients: [],
    profilePic: "image-url",
    createdRecipes: [],
    currMealPlan: null,
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
      imports: [IonicModule, HttpClientModule, NavigationBarModule, NgxsModule.forRoot([MockProfileState])],
      declarations: [ProfilePage],
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

  it("should change setting display to block", () => {
    page.openSettings();

    expect(page.displaySettings).toEqual("block");
  });

  it("should change setting display to none", () => {
    page.openSettings();
    page.closeSettings();

    expect(page.displaySettings).toEqual("none");
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

  it("should save profile", () => {
    page.openEditProfile();
    page.editableProfile.name = "JD";
    page.saveProfile();

    page.profile$.pipe(take(1)).subscribe((profile: IProfile) => {
      expect(profile).toEqual(page.editableProfile);
    })
  });

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
});


let component: NotificationsPage;
let fixture: ComponentFixture<NotificationsPage>;
let router: Router;

const routes: Routes = [
  {
    path: 'recipe/:id',
    component: NotificationsPage,
  },
];
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [NotificationsUiModule, RouterTestingModule.withRoutes(routes)],
    declarations: [NotificationsPage, TabbedComponent, TabComponent],
    providers: [],
  }).compileComponents();

  fixture = TestBed.createComponent(NotificationsPage);
  component = fixture.componentInstance;
  fixture.detectChanges();

  router = TestBed.inject(Router);
});
