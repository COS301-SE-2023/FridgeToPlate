import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TempRecipeCardComponent } from './temp-recipe-card.component';

describe('TempRecipeCardComponent', () => {
  let component: TempRecipeCardComponent;
  let fixture: ComponentFixture<TempRecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TempRecipeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TempRecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
