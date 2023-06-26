import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePage } from './recipe.page';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeUIModule } from '../../ui/src/recipe.module';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
describe('RecipeDetailPageComponent', () => {
  let component: RecipePage;
  let fixture: ComponentFixture<RecipePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipePage],
      imports: [IonicModule, HttpClientModule, RouterTestingModule, RecipeUIModule, NavigationBarModule],
      providers: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
