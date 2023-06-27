import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfilePage } from "./profile.page";
import { IonicModule } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";
import { ProfileAPI } from "../../data-access/src/profile.api";
import { NavigationBarModule } from "@fridge-to-plate/app/navigation/feature";

describe("ProfilePage", () => {
  const mockProfileAPI = {
    editProfile: jest.fn()
  }

  let testProfile = {
    name: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
    saved_recipes: [
      {
        id: "1",
        name: "Shrimp Pasta",
        difficulty: "Medium",
        tags: ["Seafood", "Pasta"]
      },
      {
        id: "2",
        name: "Pizza",
        difficulty: "Easy",
        tags: ["Italian", "Pizza"]
      },
      {
        id: "3",
        name: "Mushroom Pie",
        difficulty: "Medium",
        tags: ["Quick"]
      },
      {
        id: "4",
        name: "Beef Stew",
        difficulty: "Easy",
        tags: ["Winter", "Hearty"]
      },
      {
        id: "5",
        name: "Beef Stew",
        difficulty: "Easy",
        tags: ["Winter", "Hearty"]
      },
      {
        id: "6",
        name: "Beef Stew",
        difficulty: "Easy",
        tags: ["Winter", "Hearty"]
      },
    ],
    ingredients: [
      {
        name: "Tomato",
        amount: "3"
      },
      {
        name: "Cucumber",
        amount: "1"
      },
      {
        name: "Beef",
        amount: "200g"
      },
      {
        name: "Chicken Stock",
        amount: "500ml"
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, HttpClientModule, NavigationBarModule],
      declarations: [ProfilePage],
      providers: [{ provide: ProfileAPI, useValue: mockProfileAPI }]
    }).compileComponents();
  });

  it("should render users name", () => {
    const fixture = TestBed.createComponent(ProfilePage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const page = fixture.componentInstance;
    page.profile = testProfile;
    expect(compiled.querySelector("h2")?.textContent).toContain(page.profile.name);
  });

  it("should render users email", () => {
    const fixture = TestBed.createComponent(ProfilePage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const page = fixture.componentInstance;
    page.profile = testProfile;
    expect(compiled.querySelector("p")?.textContent).toContain(page.profile.username);
  });

  it("should start on saved subpage", () => {
    const fixture = TestBed.createComponent(ProfilePage);
    const page = fixture.componentInstance;
    expect(page.subpage).toEqual("saved");
  });

  it("should change subpage to saved", () => {
    const fixture = TestBed.createComponent(ProfilePage);
    const page = fixture.componentInstance;
    page.displaySubpage("saved");
    expect(page.subpage).toEqual("saved");
  });

  it("should change subpage to ingredients", () => {
    const fixture = TestBed.createComponent(ProfilePage);
    const page = fixture.componentInstance;
    page.displaySubpage("ingredients");
    expect(page.subpage).toEqual("ingredients");
  });

  it("should remove correct ingredient from ingredients", () => {
    const fixture = TestBed.createComponent(ProfilePage);
    const page = fixture.componentInstance;

    const updatedIngredients = [
      {
        name: "Tomato",
        amount: "3"
      },
      {
        name: "Cucumber",
        amount: "1"
      },
      {
        name: "Chicken Stock",
        amount: "500ml"
      },
    ];

    page.profile = testProfile;

    page.removeIngredient(testProfile.ingredients[2]);

    expect(page.profile.ingredients).toEqual(updatedIngredients);
  });

  it("should change display to block", () => {
    const fixture = TestBed.createComponent(ProfilePage);
    const page = fixture.componentInstance;

    page.profile = testProfile;
    page.openEditProfile();

    expect(page.displayEditProfile).toEqual("block");
  });

  it("should change display to none", () => {
    const fixture = TestBed.createComponent(ProfilePage);
    const page = fixture.componentInstance;

    page.profile = testProfile;
    page.openEditProfile();
    page.closeEditProfile();

    expect(page.displayEditProfile).toEqual("none");
  });

  it("should remove save profile", () => {
    const fixture = TestBed.createComponent(ProfilePage);
    const page = fixture.componentInstance;
    
    mockProfileAPI.editProfile.mockReturnValue(true);

    page.profile = testProfile;
    page.openEditProfile();
    page.editableProfile.name = "JD";
    page.saveProfile();

    expect(page.profile).toEqual(page.editableProfile);
  });
});
