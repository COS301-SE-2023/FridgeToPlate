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
      { name: 'B', ingredientId: '2' },
      { name: 'A', ingredientId: '1' },
      { name: 'C', ingredientId: '3' }
    ];
    component.order = 'name-asc';

    // Act
    component.onChangeOrder();

    // Assert
    expect(component.ingredientList).toEqual([
      { name: 'A', ingredientId: '1' },
      { name: 'B', ingredientId: '2' },
      { name: 'C', ingredientId: '3' }
    ]);
  });

  it('should sort ingredientList in descending order by name when order is not "name-asc"', () => {
    // Arrange
    component.ingredientList = [
      { name: 'B', ingredientId: '2' },
      { name: 'A', ingredientId: '1' },
      { name: 'C', ingredientId: '3' }
    ];
    component.order = 'unknown';

    // Act
    component.onChangeOrder();

    // Assert
    expect(component.ingredientList).toEqual([
      { name: 'C', ingredientId: '3' },
      { name: 'B', ingredientId: '2' },
      { name: 'A', ingredientId: '1' }
    ]);
  });

  it('should remove an item from the ingredientList', () => {
    // Arrange
    component.ingredientList = [
      { name: 'B', ingredientId: '2' },
      { name: 'A', ingredientId: '1' },
      { name: 'C', ingredientId: '3' }
    ];
    const item = { name: 'B', ingredientId: '2' };

    // Act
    component.removeItem(item);

    // Assert
    expect(component.ingredientList).toEqual([
      { name: 'A', ingredientId: '1' },
      { name: 'C', ingredientId: '3' }
    ]);
  });


});
