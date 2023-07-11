import { TestBed } from "@angular/core/testing";
import { ProfilePage } from "./profile.page";
import { IonicModule } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";
import { NavigationBarModule } from "@fridge-to-plate/app/navigation/feature";
import { IProfile } from "@fridge-to-plate/app/profile/utils";
import { NgxsModule, State } from "@ngxs/store";
import { of, take } from "rxjs";
import { Injectable } from "@angular/core";

describe("ProfilePage", () => {
  
  const testProfile: IProfile = {
    profileId: "1",
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
});
