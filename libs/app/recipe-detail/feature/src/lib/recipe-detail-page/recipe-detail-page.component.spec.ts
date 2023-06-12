import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailPageComponent } from './recipe-detail-page.component';

describe('RecipeDetailPageComponent', () => {
  let component: RecipeDetailPageComponent;
  let fixture: ComponentFixture<RecipeDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
