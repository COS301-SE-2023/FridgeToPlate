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

  recipePreferencesForm!: FormGroup;
  changeContent(): void {}
  previousStep(): void {
    this.currentStep -=1;
    this.changeContent();
  }

  nextStep(): void {
    this.currentStep +=1;
    this.changeContent();
  }

  attemptRecommendation(): void {}

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
