import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendPage } from './recommend.page';
import { IonicModule } from '@ionic/angular';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { RecommendUIModule } from '../../ui/src/recommend.module';
// import { AppRecipeRecommendationModule} from "@fridge-to-plate/app/recommend/feature";

describe('RecipeRecommendationPage', () => {
  let component: RecommendPage;
  let fixture: ComponentFixture<RecommendPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendPage],
      imports: [IonicModule, NavigationBarModule, RecommendUIModule],
    });
    fixture = TestBed.createComponent(RecommendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
