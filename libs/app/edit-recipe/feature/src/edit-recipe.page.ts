import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteRecipe, IRecipe, RetrieveRecipe, UpdateRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { Select, Store } from '@ngxs/store';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'fridge-to-plate-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.css'],
})
export class EditRecipeComponent implements OnInit {

  recipeForm!: FormGroup;
  imageUrl = 'https://img.freepik.com/free-photo/frying-pan-empty-with-various-spices-black-table_1220-561.jpg';
  selectedMeal!: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Dessert";
  difficulty: "Easy" | "Medium" | "Hard" = "Easy";
  tags: string[] = [];
  profile !: IProfile;
  recipeId !: string;
  recipe !: IRecipe | null;

  @Select(RecipeState.getRecipe) recipe$ !: Observable<IRecipe>;

  constructor(private fb: FormBuilder, private store : Store, private location: Location, public route: ActivatedRoute) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.initialize();
    this.recipeForm = this.fb.group({
      name: [this.recipe?.name, Validators.required],
      description: [this.recipe?.description, Validators.required],
      servings: [this.recipe?.servings, Validators.required],
      preparationTime: [this.recipe?.prepTime, Validators.required],
      ingredients: this.fb.array([]),
      instructions: this.fb.array([]),
      tags: [''],
    });
    this.populateForm();
  }

  initialize(): void {
    this.route.queryParams.subscribe((params) => {
      this.recipeId = JSON.parse(params['recipeId']) as string;
    });
    this.store.dispatch(new RetrieveRecipe(this.recipeId));
    this.recipe$.pipe(take(1)).subscribe(recipe => {  this.recipe = recipe;});
  }

  populateForm(): void {

    this.recipe?.ingredients.forEach((ingredient) => {
      const ingredientGroup = this.fb.group({
        name: [ingredient.name, Validators.required],
        amount: [ingredient.amount, Validators.required],
        unit: [ingredient.unit, Validators.required]
      });

      (this.recipeForm.get('ingredients') as FormArray).push(ingredientGroup);
    }
    );

    this.recipe?.steps.forEach((step) => {
      this.instructionControls.push(this.fb.control(step, Validators.required));
    }
    );
    this.tags = this.recipe?.tags ?? this.tags;
    this.selectedMeal = this.recipe?.meal ?? this.selectedMeal;
    this.imageUrl = this.recipe?.recipeImage ?? this.imageUrl
    this.difficulty = this.recipe?.difficulty ?? this.difficulty;
  }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    const ingredientGroup = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      unit: ['', Validators.required]
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

  updateRecipe() : void {
    // Check first if the form is completely valid
    if(!this.isFormValid())
        return;

    // Ingredients array
    const ingredients = this.getIngredients();

    // Instructions array
    const instructions = this.getInstructions()

    // Create Recipe details
    const recipe: IRecipe = {
      recipeId: this.recipe?.recipeId,
      name: this.recipeForm.value.name,
      recipeImage: this.imageUrl,
      description: this.recipeForm.value.description,
      meal: this.selectedMeal,
      creator: this.recipe?.creator ?? '',
      ingredients: ingredients,
      steps: instructions,
      difficulty: this.difficulty,
      prepTime: this.recipeForm.value.preparationTime as number,
      servings: this.recipeForm.value.servings as number,
      tags: this.tags,
    };
    this.store.dispatch( new UpdateRecipe(recipe) )
    this.location.back();
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

  deleteRecipe() {

    if(!this.recipe?.recipeId) {
      this.store.dispatch( new ShowError('Could not delete recipe'));
    }

    this.store.dispatch( new DeleteRecipe( this.recipe?.recipeId as string ))
    this.location.back()
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

  toggleDifficulty(option: "Easy" | "Medium" | "Hard") {
    this.difficulty = option;
  }

  getDifficulty(option: string) {
    return {
      'bg-primary': this.difficulty === option,
      'bg-gray-200': this.difficulty !== option,
      'text-white': this.difficulty === option,
      'text-gray-700': this.difficulty !== option,
      'py-2': true,
      'px-4': true,
      'rounded-md': true,
      'mr-2': true
    };
  }


  addTag() {
    const tagValue = this.recipeForm.get('tags')?.value as string;
    if(!tagValue) {
      this.store.dispatch( new ShowError("Please enter valid tag"))
    }
    else if (this.tags.length < 3) {
      if(this.tags.includes(tagValue)){
        this.store.dispatch( new ShowError("No duplicates: Tag already selected"))
        return;
      }
      this.tags.push(tagValue);
    }
    else {
      this.store.dispatch( new ShowError("Only a maximum of three tags"))
    }
    // reset the form value after adding it to array
    this.recipeForm.get('tags')?.reset();
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

  cancelEdit(): void {
    this.location.back();
  }

}