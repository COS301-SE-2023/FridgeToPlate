import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListStep } from './recipe-list-step';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

describe('RecipeListStep', () => {
  let component: RecipeListStep;
  let fixture: ComponentFixture<RecipeListStep>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListStep],
      imports: [IonicModule, HttpClientModule],
      providers: [HttpClientModule],
    });
    fixture = TestBed.createComponent(RecipeListStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
