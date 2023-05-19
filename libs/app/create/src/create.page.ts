import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
//   styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  ingredientsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ingredientsForm = this.formBuilder.group({
      recipeName: ['', Validators.required],
      ingredients: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ])
    });
  }

  get ingredientControls() {
    return (this.ingredientsForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    this.ingredientControls.push(this.formBuilder.control(''));
  }

  submitForm() {
    console.log(this.ingredientsForm.value);
    // Send form data to server here
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
}