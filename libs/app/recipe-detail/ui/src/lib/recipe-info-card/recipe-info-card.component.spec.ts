import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeInfoCardComponent } from './recipe-info-card.component';

describe('RecipeInfoCardComponent', () => {
  let component: RecipeInfoCardComponent;
  let fixture: ComponentFixture<RecipeInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeInfoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
