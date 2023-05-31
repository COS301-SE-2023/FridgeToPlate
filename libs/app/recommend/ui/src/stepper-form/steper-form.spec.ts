import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperForm } from './stepper-form';
describe('StepperForm', () => {
  let component: StepperForm;
  let fixture: ComponentFixture<StepperForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepperForm]
    });
    fixture = TestBed.createComponent(StepperForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
