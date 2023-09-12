import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { RecipePreferencesStep } from './recipe-preferences-step';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RecommendUIModule } from '../recommend.module';
import { NgxsModule } from '@ngxs/store';
import { UpdateRecipePreferences } from '@fridge-to-plate/app/recommend/utils';

describe('RecipePreferencesStep', () => {
  let component: RecipePreferencesStep;
  let fixture: ComponentFixture<RecipePreferencesStep>;
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipePreferencesStep],
      imports: [
        IonicModule,
        HttpClientModule,
        RecommendUIModule,
        NgxsModule.forRoot(),
      ],
      providers: [HttpClientModule],
    });
    fixture = TestBed.createComponent(RecipePreferencesStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('update preferences should dispatch an update', () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    component.updateRecipePreferences();
    expect(dispatchSpy).toBeCalledWith(
      new UpdateRecipePreferences(component.editableRecipePreferences)
    );
  });

  it('should update preferences with new keyword', () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    component.keywordSelected('test');

    expect(dispatchSpy).toBeCalledWith(
      new UpdateRecipePreferences({
        ...component.editableRecipePreferences,
        keywords: ['test'],
      })
    );
  });

  it('should update preferences with removed keyword', () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    component.selectedKeywords = ['test', 'test2'];
    component.keywordSelected('test');

    expect(component.selectedKeywords).toStrictEqual(['test2']);
    expect(dispatchSpy).toBeCalledWith(
      new UpdateRecipePreferences({
        ...component.editableRecipePreferences,
        keywords: ['test2'],
      })
    );
  });

  it('should filter keywordsList', () => {
    component.filterKeywordsList('Asian');
    expect(component.keywordOptions).toStrictEqual(['Asian']);
  });
});
