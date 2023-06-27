import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientCardComponent } from './ingredient-card.component';
import { IonicModule } from '@ionic/angular';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

describe('IngredientCardComponent', () => {
  let component: IngredientCardComponent;
  let fixture: ComponentFixture<IngredientCardComponent>;
  let testIngredient: IIngredient;

  testIngredient = {
    ingredientId: "test-id",
    name: "Carrot"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientCardComponent],
      imports: [IonicModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientCardComponent);
    component = fixture.componentInstance;
    component.ingredient = testIngredient;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
