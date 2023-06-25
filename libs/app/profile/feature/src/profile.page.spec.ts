import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfilePage } from "./profile.page";
import { IonicModule } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";

describe("ProfilePage", () => {
  let testProfile = {
    name: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, HttpClientModule],
      declarations: [ProfilePage],
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
    const mockIngredients = [
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
    ];

    const mockFinalIngredients = [
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
    ];

    page.ingredients = mockIngredients;

    page.removeIngredient(0);

    expect(page.ingredients).toEqual(mockFinalIngredients);
  });
});
