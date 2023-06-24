import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientCardComponent } from './ingredient-card.component';
import { IonicModule } from '@ionic/angular';

describe('IngredientCardComponent', () => {
  let component: IngredientCardComponent;
  let fixture: ComponentFixture<IngredientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientCardComponent],
      imports: [IonicModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
