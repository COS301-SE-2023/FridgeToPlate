import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemEditStep} from "../item-edit-step/item-edit-step";

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.html',
  styleUrls: ['./stepper-form.scss']
})

export class StepperForm implements OnInit{

  currentStep = 2;

  recipeRecommendForm!: FormGroup;

  stepContent = `Edit Fridge Items`;

  step = ItemEditStep;

  recipePreferencesForm!: FormGroup;
  changeContent(): void {
    switch (this.currentStep) {
      case 1: {
        this.stepContent = 'Edit Fridge Items'
        break;
      }
      case 2: {
        this.stepContent = 'Verify Preferences'
        break;
      }
      case 3: {
        this.stepContent = 'Suggestions'
        break;
      }
      default: {
        this.stepContent = 'error'
      }
    }
  }

  previousStep(): void {
    if(this.currentStep <= 1) return;
    this.currentStep -=1;
    this.changeContent();
  }

  nextStep(): void {
    if(this.currentStep >= 3) return;
    this.currentStep +=1;
    this.changeContent();
  }

  attemptRecommendation(): void {
    console.log(this.recipeRecommendForm.value)
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.recipeRecommendForm = this.formBuilder.group({
      items: [[], [Validators.required]],
      preferences: this.formBuilder.group({
        diet: [[]],
        keywords: [[]],
        difficulty: [''],
        rating: [5]
      }),
    })
  }
}
