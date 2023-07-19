import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditStep } from './item-edit-step';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RecommendUIModule } from '../recommend.module';
import { NgxsModule } from '@ngxs/store';

describe('ItemEditStep', () => {
  let component: ItemEditStep;
  let fixture: ComponentFixture<ItemEditStep>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEditStep],
      imports: [IonicModule, HttpClientModule, RecommendUIModule, NgxsModule.forRoot()],
      providers: [HttpClientModule],
    });
    fixture = TestBed.createComponent(ItemEditStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
