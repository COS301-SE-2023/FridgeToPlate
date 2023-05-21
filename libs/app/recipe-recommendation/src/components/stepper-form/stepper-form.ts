import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.html',
  styleUrls: ['./stepper-form.scss']
})

export class StepperForm implements OnInit{

  currentStep = 1;

  recipeRecommendForm!: FormGroup;

  stepContent = `Start`;

  recipePreferencesForm!: FormGroup;
  changeContent(): void {
    switch (this.currentStep) {
      case 1: {
        this.stepContent = 'Step 1'
        break;
      }
      case 2: {
        this.stepContent = 'Step 2'
        break;
      }
      case 3: {
        this.stepContent = 'Step 3'
        break;
      }
      default: {
        this.stepContent = 'error'
      }
    }
  }

  previousStep(): void {
    this.currentStep -=1;
    this.changeContent();
  }

  nextStep(): void {
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
