import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditStep } from './item-edit-step';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { RemoveIngredient } from '@fridge-to-plate/app/recommend/utils';
import { FormsModule } from '@angular/forms';
import { RecommendUIModule } from '../recommend.module';

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

  it('should not mutate AddIngredient', () => {
    expect(component.isAddIngredientDisabled).toBe(true);
    component.checkIsFormValid();
    expect(component.isAddIngredientDisabled).toBe(true);
  });

  it('should mutate AddIngredient', () => {
    const ingredientName = "Test";
    const ingredientAmount = 5;
    const ingredientScale = "mg";

    component.ingredientName = ingredientName;
    component.ingredientAmount = ingredientAmount;
    component.ingredientScale = ingredientScale;

    expect(component.isAddIngredientDisabled).toBe(true);
    component.checkIsFormValid();
    expect(component.isAddIngredientDisabled).toBe(false);
  });

  it('should not mutate AddIngredient initally but eventually', () => {
    const ingredientName = "Test";
    const ingredientAmount = 5;
    const ingredientScale = "mg";

    component.ingredientName = ingredientName;
    expect(component.isAddIngredientDisabled).toBe(true);
    component.checkIsFormValid();
    expect(component.isAddIngredientDisabled).toBe(true);

    component.ingredientAmount = ingredientAmount;
    expect(component.isAddIngredientDisabled).toBe(true);
    component.checkIsFormValid();
    expect(component.isAddIngredientDisabled).toBe(true);

    component.ingredientScale = ingredientScale;
    expect(component.isAddIngredientDisabled).toBe(true);
    component.checkIsFormValid();
    expect(component.isAddIngredientDisabled).toBe(false);

  });

});
