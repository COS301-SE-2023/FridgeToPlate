import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(), RecipeUIModule, HttpClientTestingModule],
      declarations: [HomePage],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to RecommendPage', () => {
    const spy = jest.spyOn(TestBed.inject(Router), 'navigate');
    component.goToRecommend();
    expect(spy).toHaveBeenCalledWith(['/recommend']);
  });

  it('should be meal time for breakfast', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('March 13, 10:04:20'));

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mealType).toBe('breakfast');
    expect(component.messageHeader).toBe(
      `Good morning!\nWhat's on the menu for breakfast?`
    );
  });

  it('should be meal time for lunch', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('March 13, 13:04:20'));

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mealType).toBe('lunch');
    expect(component.messageHeader).toBe(
      `Hungry for a delicious lunch?\nLet's get cooking!`
    );
  });

  it('should be meal time for dinner', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('March 13, 19:04:20'));

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mealType).toBe('dinner');
    expect(component.messageHeader).toBe(
      `It's dinner time!\nEnjoy a tasty meal tonight.`
    );
  });

  it('should be meal time for snack', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('March 13, 23:04:20'));

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mealType).toBe('snack');
    expect(component.messageHeader).toBe(
      `Time for a snack!\nWhat do you feel like making?`
    );
  });
});
