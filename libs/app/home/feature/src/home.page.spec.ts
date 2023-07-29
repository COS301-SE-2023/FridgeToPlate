import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
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
    expect(spy).toHaveBeenCalledWith(['/recommend'])
  });

  it('should be meal time for breakfast', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('March 13, 10:04:20'));
    
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mealType).toBe('Breakfast');
    expect(component.messageHeader).toBe(`Good morning! What's on the menu for breakfast?`);
  });

  it('should be meal time for lunch', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('March 13, 13:04:20'));
    
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mealType).toBe('Lunch');
    expect(component.messageHeader).toBe(`Hungry for a delicious lunch? Let's get cooking!`);
  });

  it('should be meal time for dinner', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('March 13, 19:04:20'));
    
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mealType).toBe('Dinner');
    expect(component.messageHeader).toBe(`It's dinner time! Enjoy a tasty meal tonight.`);
  });

  it('should be meal time for snack', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('March 13, 23:04:20'));
    
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mealType).toBe('Snack');
    expect(component.messageHeader).toBe(`Time for a snack! What do you feel like making?`);
  });
});
