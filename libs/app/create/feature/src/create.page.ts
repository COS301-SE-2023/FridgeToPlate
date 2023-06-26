import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationBar } from "@fridge-to-plate/app/navigation/feature";
import { CreateAPI } from '@fridge-to-plate/app/create/data-access'
import { JsonPipe } from '@angular/common';
import { IRecipe, IRecipeStep } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils'

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

  constructor(private fb: FormBuilder, private api: CreateAPI) {
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

  get dietaryPlans(){
    return  (this.recipeForm.get('dietaryPlans') as FormArray).controls
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

      // Ingredients array
      let ingredients = new Array(this.ingredientControls.length);
      let tags = new Array(this.dietaryPlans.length);
      this.ingredientControls.forEach(element => {

      if(element.value != null) {
        ingredients.push(element.value);
      }
          
      });

    // Instructions array
      let instructions = new Array(this.instructionControls.length);

      this.instructionControls.forEach(element => {
      if(element.value) {
          instructions.push(element.value)
      }
    });

      // Dietary plans array
      this.dietaryPlans.forEach(element => {
      if(element.value != null) {
          tags.push(element.value)
      }
    });


    const recipe: IRecipe = {
      name: this.recipeForm.get('name')?.value,
      recipeImage: this.imageUrl,
      ingredients: ingredients,
      steps: instructions,
      rating: 0,
      difficulty: 'easy',
      prepTime: (this.recipeForm.get('preparationTime')?.value as number),
      numberOfServings: (this.recipeForm.get('servings')?.value as number),
      tags: tags
    }


    this.api.createNewRecipe(recipe)
    .subscribe( response => {
      if(!response){
        console.log("Error creating recipe")
        return response;
      } 
      console.log("Recipe created successfully")
      return response
    })
    
    // const ingredients: IIngredient[] = this.ingredientControls as IIngredient[];

    // const result = this.api.createNewRecipe();
    // alert(JSON.stringify(result));

    this.getIngredientsContent()
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
