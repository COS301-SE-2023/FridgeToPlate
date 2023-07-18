import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemEditStep} from "../item-edit-step/item-edit-step";
import {Select, Store} from "@ngxs/store";
import {RecommendState} from "../../../data-access/src/recommend.state";
import {Observable} from "rxjs";
import {PreferenceFormInterface} from "../../../data-access/src/recommend.actions";

@Component({
  selector: 'stepper-form',
  templateUrl: './stepper-form.html',
  styleUrls: ['./stepper-form.scss']
})

export class StepperForm implements OnInit{

  currentStep = 1;

  recipeRecommendForm!: FormGroup;

  stepContent = `Edit Your Ingredients`;
  stepContentDesktop = `Edit Your Ingredients and Preferences`;

  step = ItemEditStep;

  recipePreferencesForm!: FormGroup;
  changeContent(): void {
    switch (this.currentStep) {
      case 1: {
        this.stepContent = 'Edit Your Ingredients'
        this.stepContentDesktop = `Edit Your Ingredients and Preferences`;
        break;
      }
      case 2: {
        this.stepContent = 'Choose Preferences'
        this.stepContentDesktop = `Recipe Suggestions`;
        break;
      }
      case 3: {
        this.stepContent = 'Suggestions'
        this.stepContentDesktop = `error`;
        break;
      }
      default: {
        this.stepContent = 'error'
        this.stepContentDesktop = `error`;
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
