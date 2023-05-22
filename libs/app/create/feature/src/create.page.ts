import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {

  recipeForm!: FormGroup;
  imageUrl: string = "https://img.icons8.com/ios-filled/50/cooking-book--v1.png";
  editableIndex: number = -1;
  edit = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      servings: ['', Validators.required],
      preparationTime: ['', Validators.required],
      ingredients: this.fb.array([
      
      ]),
      instructions: this.fb.array([
      ]),
      dietaryPlans: this.fb.array([])
      
    });
  }
  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    this.ingredientControls.push(this.fb.control(''));
  }

  get instructionControls() {
    return (this.recipeForm.get('instructions') as FormArray).controls;
  }

  addInstruction() {
    this.instructionControls.push(this.fb.control(''))
  }

  removeIngredient(index: number) {
    this.ingredientControls.splice(index, 1);
  }

  removeInstruction(index: number) {
    this.instructionControls.splice(index, 1);
  }

  toggleDietaryPlan(plan: string): void {
    const dietaryPlans = this.recipeForm.get('dietaryPlans') as FormArray;
  
    if (dietaryPlans != null && this.isDietaryPlanSelected(plan)) {
      // Remove the dietary plan if it's already selected
      dietaryPlans.removeAt(dietaryPlans.value.indexOf(plan));
    } else {
      // Add the dietary plan if it's not selected
      dietaryPlans.push(this.fb.control(plan));
    }
  }

  getDietaryPlanButtonClasses(plan: string): string {
    return this.isDietaryPlanSelected(plan) ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700';
  }

  
  isDietaryPlanSelected(plan: string): boolean {
  
    const dietaryPlans = this.recipeForm.get('dietaryPlans')?.value;
    return dietaryPlans.includes(plan);
  }


  onSubmit() {
    console.log(this.recipeForm.value);
    
    this.getIngredientsContent()
  }

  handleImageUpload(event: any) {
    // Retrieve the selected or uploaded image file
    const file: File = event.target.files[0];
    this.imageUrl = file.name
  }

  getIngredientsContent() {

    for (let i = 0; i < this.ingredientControls.length; i++) {
      const ingredientControl = this.ingredientControls[i];
      console.log(ingredientControl.value)
      // do something with the ingredient control
    }
  }

  editIngredient(index: number): void {
    this.editableIndex = index;
    this.edit = true;
  }
  
  editInstruction(index: number): void {
    this.editableIndex = index;
    this.edit = true;
  }

  cancelEditIngredients(): void {
    this.editableIndex = -1;
    this.edit = true;
  }

  done() {
      this.edit = false;
  }


    
}