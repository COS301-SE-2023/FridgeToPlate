import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendPage } from './recommend.page';
import { IonicModule } from '@ionic/angular';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { RecommendUIModule } from '@fridge-to-plate/app/recommend/ui';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

describe('RecipeRecommendationPage', () => {
  let component: RecommendPage;
  let fixture: ComponentFixture<RecommendPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendPage],
      imports: [
        IonicModule, 
        NavigationBarModule, 
        RecommendUIModule,
        HttpClientModule,
        NgxsModule.forRoot(),
      ],
    });
    fixture = TestBed.createComponent(RecommendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
