import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ItemEditStep} from "./item-edit-step";
import { IonicModule } from '@ionic/angular';

describe('ItemEditStep', () => {
  let component: ItemEditStep;
  let fixture: ComponentFixture<ItemEditStep>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemEditStep],
      imports: [IonicModule],
    });
    fixture = TestBed.createComponent(ItemEditStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
