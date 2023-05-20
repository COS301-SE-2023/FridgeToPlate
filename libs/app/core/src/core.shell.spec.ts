import { TestBed } from "@angular/core/testing";
import { CoreShell } from "./core.shell";
import { NxWelcomeComponent } from "./nx-welcome.component";

describe("CoreShell", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [CoreShell, NxWelcomeComponent],
    }).compileComponents();
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(CoreShell);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h1")?.textContent).toContain("Spice Girls");
  });

  it(`should have as title 'FridgeToPlate'`, () => {
    const fixture = TestBed.createComponent(CoreShell);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("FridgeToPlate");
  });
});
