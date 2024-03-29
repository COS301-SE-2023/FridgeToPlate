import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { Select, Store } from '@ngxs/store';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { CreateRecipe } from '@fridge-to-plate/app/recipe/utils';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { Observable } from 'rxjs';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';
import { ShowInfo } from '@fridge-to-plate/app/info/utils';

@Component({
  selector: 'fridge-to-plate-app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePagComponent implements OnInit {
  @Select(ProfileState.getProfile) profile$!: Observable<IProfile>;
  @Select(RecipeState.getRecipe) recipe$!: Observable<IRecipe>;

  recipeForm!: FormGroup;
  imageUrl =
    'https://img.freepik.com/free-photo/frying-pan-empty-with-various-spices-black-table_1220-561.jpg';
  videoUrl =
    'https://img.freepik.com/free-photo/female-food-blogger-streaming-home-while-cooking_23-2148771599.jpg';
  selectedMeal = 'breakfast';
  difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy';
  tags: string[] = [];
  profile!: IProfile;
  selectedVideo: File | null = null;
  displayVideo = 'none';
  displayImage = 'block';
  videoLink: string;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.createForm();
    this.profile$.subscribe((profile) => (this.profile = profile));
  }

  createForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      servings: ['', Validators.required],
      preparationTime: ['', Validators.required],
      ingredients: this.fb.array([], Validators.required),
      instructions: this.fb.array([], Validators.required),
      tag: [''],
    });
  }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    const ingredientGroup = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      unit: ['', Validators.required],
    });

    // Add the new ingredient group to the FormArray
    (this.recipeForm.get('ingredients') as FormArray).push(ingredientGroup);
  }

  get instructionControls() {
    return (this.recipeForm.get('instructions') as FormArray).controls;
  }

  addInstruction(): void {
    const instructionControl = this.fb.control('', Validators.required);

    console.log(this.recipeForm.get('instructions')?.value);
    (this.recipeForm.get('instructions') as FormArray).push(instructionControl);
  }

  removeIngredient(index: number): void {
    this.ingredientControls.splice(index, 1);
  }

  removeInstruction(index: number): void {
    this.instructionControls.splice(index, 1);
  }

  getAmountPlaceholderText() {
    if (window.innerWidth < 1024) {
      return 'e.g 10';
    } else {
      return 'Amount';
    }
  }

  getUnitPlaceholderText() {
    if (window.innerWidth < 1024) {
      return 'e.g L';
    } else {
      return 'Unit';
    }
  }

  createRecipe(): void {
    // Check first if the form is completely valid
    if (!this.isFormValid()) return;

    // Ingredients array
    const ingredients = this.getIngredients();

    // Instructions array
    const instructions = this.getInstructions();

    // Create Recipe details
    const recipe: IRecipe = {
      name: this.recipeForm.get('name')?.value,
      recipeImage: this.imageUrl,
      description: this.recipeForm.get('description')?.value,
      meal: this.selectedMeal,
      creator: this.profile.username,
      ingredients: ingredients,
      steps: instructions,
      difficulty: this.difficulty,
      prepTime: this.recipeForm.get('preparationTime')?.value as number,
      servings: this.recipeForm.get('servings')?.value as number,
      tags: this.tags,
      rating: null,
      youtubeId: this.videoLink
    };

    this.store.dispatch(new CreateRecipe(recipe));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileChanged(event: any) {
    const file = event.target.files[0];
    const fileSize = event.target.files[0].size;

    if (fileSize > 300000) {
      this.store.dispatch(
        new ShowInfo('Can Not Upload Image Larger Than 300KB')
      );
      return;
    }
    const reader = new FileReader();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  toggleMeal(option: string) {
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
      'mr-2': true,
    };
  }

  toggleDifficulty(option: 'Easy' | 'Medium' | 'Hard') {
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
      'mr-2': true,
    };
  }

  addTag() {
    const tagValue = this.recipeForm.get('tag')?.value as string;
    if (!tagValue) {
      this.store.dispatch(new ShowInfo('Please enter valid tag'));
    } else if (this.tags.length < 3) {
      if (this.tags.includes(tagValue)) {
        this.store.dispatch(
          new ShowInfo('No duplicates: Tag already selected')
        );
        return;
      }
      this.tags.push(tagValue);
    } else {
      this.store.dispatch(new ShowInfo('Only a maximum of three tags'));
    }
    // reset the form value after adding it to array
    this.recipeForm.get('tag')?.reset();
  }

  deleteTag(index: number) {
    this.tags.splice(index, 1);
  }

  isFormValid(): boolean {
    if (!this.recipeForm.valid) {
      this.store.dispatch(
        new ShowError(
          'Invalid Form. Missing instructions or Ingredient details.'
        )
      );
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
      if (ingredient) {
        ingredients.push({
          name: ingredient.value.name,
          amount: ingredient.value.amount,
          unit: ingredient.value.unit,
        });
      }
    });

    return ingredients;
  }

  getInstructions(): string[] {
    const instructions: string[] = [];
    this.instructionControls.forEach((element) => {
      if (element.value) {
        instructions.push(element.value);
      }
    });

    return instructions;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onVideoChanged(event: any) {
    const file = event.target.files;

    if (file) {
      this.selectedVideo = file[0];
      this.displayVideo = 'block';
      this.displayImage = 'none';
      this.previewVideo();
    }
  }

  previewVideo() {
    const videoPlayer = document.getElementById('video-player') as HTMLVideoElement;

    if (videoPlayer && this.selectedVideo) {
      videoPlayer.src = URL.createObjectURL(this.selectedVideo);
    }
  }
}
