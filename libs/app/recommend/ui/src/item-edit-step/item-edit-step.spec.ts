import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditStep } from './item-edit-step';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RecommendUIModule } from '../recommend.module';

describe('ItemEditStep', () => {
  let component: ItemEditStep;
  let fixture: ComponentFixture<ItemEditStep>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEditStep],
      imports: [IonicModule, HttpClientModule, RecommendUIModule],
      providers: [HttpClientModule],
    });
    fixture = TestBed.createComponent(ItemEditStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort ingredientList in ascending order by name when order is "name-asc"', () => {
    // Arrange
    component.ingredientList = [
      { name: 'B', unit: "mg", amount: 20 },
      { name: 'A', unit: "mg", amount: 10 },
      { name: 'C', unit: "mg", amount: 30 }
    ];
    component.order = 'name-asc';

    // Act
    component.onChangeOrder();

    // Assert
    expect(component.ingredientList).toEqual([
      { name: 'A', unit: "mg", amount: 10 },
      { name: 'B', unit: "mg", amount: 20 },
      { name: 'C', unit: "mg", amount: 30 }
    ]);
  });

  it('should sort ingredientList in descending order by name when order is not "name-asc"', () => {
    // Arrange
    component.ingredientList = [
      { name: 'B', unit: "mg", amount: 20 },
      { name: 'A', unit: "mg", amount: 10 },
      { name: 'C', unit: "mg", amount: 30 }
    ];
    component.order = 'unknown';

    // Act
    component.onChangeOrder();

    // Assert
    expect(component.ingredientList).toEqual([
      { name: 'C', unit: "mg", amount: 30 },
      { name: 'B', unit: "mg", amount: 20 },
      { name: 'A', unit: "mg", amount: 10 }
    ]);
  });

  it('should remove an item from the ingredientList', () => {
    // Arrange
    component.ingredientList = [
      { name: 'B', unit: "mg", amount: 20 },
      { name: 'A', unit: "mg", amount: 10 },
      { name: 'C', unit: "mg", amount: 30 }
    ];
    const item = { name: 'B', unit: "mg", amount: 20 };

    // Act
    component.removeItem(item);

    // Assert
    expect(component.ingredientList).toEqual([
      { name: 'A', unit: "mg", amount: 10 },
      { name: 'C', unit: "mg", amount: 30 }
    ]);
  });


});
