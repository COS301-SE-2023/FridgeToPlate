import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperForm } from './stepper-form';
import { IonicModule } from '@ionic/angular';
describe('StepperForm', () => {
  let component: StepperForm;
  let fixture: ComponentFixture<StepperForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepperForm],
      imports: [IonicModule],
    });
    fixture = TestBed.createComponent(StepperForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
