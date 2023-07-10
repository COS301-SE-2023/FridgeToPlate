import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientCardComponent } from './ingredient-card.component';
import { IonicModule } from '@ionic/angular';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('IngredientCardComponent', () => {
  let component: IngredientCardComponent;
  let fixture: ComponentFixture<IngredientCardComponent>;
  const testIngredient: IIngredient = {
    name: "Carrot",
    unit: "mg",
    amount: 15,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientCardComponent],
      imports: [IonicModule, FormsModule, ReactiveFormsModule],
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
