import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditStep } from './item-edit-step';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { RemoveIngredient } from '@fridge-to-plate/app/recommend/utils';
import { FormsModule } from '@angular/forms';

describe('ItemEditStep', () => {
  let component: ItemEditStep;
  let fixture: ComponentFixture<ItemEditStep>;
  let store: Store;

  @State({
    name: 'recommend',
    defaults: {},
  })
  @Injectable()
  class MockRecommendState {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEditStep],
      imports: [
        FormsModule,
        IonicModule,
        HttpClientModule,
        NgxsModule.forRoot([MockRecommendState]),
      ],
      providers: [HttpClientModule],
    });
    fixture = TestBed.createComponent(ItemEditStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close scanner', () => {
    component.closeScanner();
    expect(component.scannerOpened).toBe(false);
  });

  it('should open scanner', () => {
    component.openScanner();
    expect(component.scannerOpened).toBe(true);
  });

  it('should should dispatch remove', () => {
    store = TestBed.inject(Store);
    const dispatchSpy = jest.spyOn(store, 'dispatch');


    const testIngredient: IIngredient = {
      name: 'Carrot',
      amount: 2,
      unit: 'g',
    };

    component.removeItem(testIngredient);
    component.removeItem(testIngredient);
    expect(dispatchSpy).toBeCalledWith(new RemoveIngredient(testIngredient));
  });

  it('should should dispatch add', () => {
    store = TestBed.inject(Store);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const testIngredient: IIngredient = {
      name: 'Carrot',
      amount: 0,
      unit: '',
    };

    component.ingredientName = testIngredient.name;

    component.addIngredient();
    component.addIngredient();
    expect(dispatchSpy).toBeCalledWith(new RemoveIngredient(testIngredient));
  });

});
