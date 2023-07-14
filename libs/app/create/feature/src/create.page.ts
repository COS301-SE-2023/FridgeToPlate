import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { Select, Store } from '@ngxs/store';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { CreateRecipe } from '@fridge-to-plate/app/create/utils';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { Observable } from 'rxjs';
import { IProfile } from '@fridge-to-plate/app/profile/utils';

@Component({
  selector: 'fridge-to-plate-app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePagComponent implements OnInit  {

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile>;

  recipeForm!: FormGroup;
  imageUrl = 'https://img.freepik.com/free-photo/frying-pan-empty-with-various-spices-black-table_1220-561.jpg';
  selectedMeal!: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Dessert";
  tags: string[] = [];
  profile !: IProfile;

  constructor(private fb: FormBuilder, private store : Store) {}

  ngOnInit() {
    this.createForm();
    this.profile$.subscribe(profile => {
      this.profile = profile;
    });
  }

  createForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      servings: ['', Validators.required, Validators.min(1)],
      preparationTime: ['', Validators.required],
      ingredients: this.fb.array([]),
      instructions: this.fb.array([]),
      tag: ['']
    });
  }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    const ingredientGroup = this.fb.group({
      ingredientName: ['', Validators.required],
      amount: ['', Validators.required],
      scale: ['', Validators.required]
    });
  
    // Add the new ingredient group to the FormArray
    (this.recipeForm.get('ingredients') as FormArray).push(ingredientGroup);
  }

  get instructionControls() {
    return (this.recipeForm.get('instructions') as FormArray).controls;
  }

  addInstruction(): void {
    this.instructionControls.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number): void {
    this.ingredientControls.splice(index, 1);
  }

  removeInstruction(index: number) : void{
    this.instructionControls.splice(index, 1);
  }

  getAmountPlaceholderText() {
    if (window.innerWidth < 1024) {
      return "e.g 10";
    } else {
      return "Amount";
    }
  }

  getUnitPlaceholderText() {
    if (window.innerWidth < 1024) {
      return "e.g L";
    } else {
      return "Unit";
    }
  }

  createRecipe() : void {

    // Check first if the form is completely valid
    if(!this.isFormValid())
        return;
    
    // Ingredients array
    const ingredients = this.getIngredients();
    
    // Instructions array
    const instructions = this.getInstructions()

    // Create Recipe details
    const recipe: IRecipe = {
      name: this.recipeForm.get('name')?.value,
      recipeImage: this.imageUrl,
      description: this.recipeForm.get('description')?.value,
      meal: this.selectedMeal,
      creator: this.profile.username,
      ingredients: ingredients,
      steps: instructions,
      difficulty:this.recipeForm.get('difficulty')?.value,
      prepTime: this.recipeForm.get('preparationTime')?.value as number,
      servings: this.recipeForm.get('servings')?.value as number,
      tags: this.tags,
    };

    this.store.dispatch( new CreateRecipe(recipe) )
  }


 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileChanged(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    
    reader.readAsDataURL(file);
  }

  toggleMeal(option: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Dessert") {
    this.selectedMeal = option;
  }

  getMealPlan(option: string) {
    return {
      'bg-primary': this.selectedMeal === option,
      'bg-gray-200': this.selectedMeal !== option,
      'text-white': this.selectedMeal === option,
      'text-gray-700': this.selectedMeal !== option,
      'py-2': true,
      'px-4': true,
      'rounded-md': true,
      'mr-2': true
    };
  }

  addTag() {
    const tagValue = this.recipeForm.get('tag')?.value as string;
    if(!tagValue) {
      this.store.dispatch( new ShowError("Please enter valid tag"))
    }
    else if (this.tags.length < 3) {
      if(this.tags.includes(tagValue)){
        this.store.dispatch( new ShowError("No duplicates: Tag already exists"))
        return;
      }
      this.tags.push(tagValue);
    }
    else {
      this.store.dispatch( new ShowError("Only a maximum of three tags"))
    }
    // reset the form value after adding it to array
    this.recipeForm.get('tag')?.reset();
  }

  deleteTag(index: number) {
    this.tags.splice(index, 1);
  }

  isFormValid(): boolean {

    if(!this.recipeForm.valid){
      this.store.dispatch( new ShowError("Incomplete Form. Please fill out every field."))
      return false;
    }

    if(this.ingredientControls.length < 1) {
      this.store.dispatch( new ShowError("No Ingredients"))
      return false;
    }

    if(this.instructionControls.length < 1) {
      this.store.dispatch( new ShowError("No Instructions"))
      return false;
    }

    if(this.tags.length < 1) {
      this.store.dispatch( new ShowError("No Tags"))
      return false;
    }

    if(!this.selectedMeal){
      this.store.dispatch( new ShowError("Please select a meal"))
      return false;
    }

    if(!this.profile){
      this.store.dispatch( new ShowError("Please login to create a recipe"))
      return false;
    }

    return true;
  }

  getIngredients(): IIngredient[] {
    const ingredients: IIngredient[] = [];
    this.ingredientControls.forEach((ingredient) => {
      if (ingredient.value) {
        ingredients.push(ingredient.value);
      }
    });

    return ingredients;
  }

  getInstructions() : string[] {
    const instructions: string[] = [];
    this.instructionControls.forEach((element) => {
      if (element.value) {
        instructions.push(element.value);
      }
    });

    return instructions;
  }



}