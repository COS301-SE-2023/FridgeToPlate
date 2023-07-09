import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAPI } from '@fridge-to-plate/app/create/data-access';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

@Component({
  selector: 'fridge-to-plate-app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePagComponent {
  recipeForm!: FormGroup;
  imageUrl = 'https://img.icons8.com/ios-filled/50/cooking-book--v1.png';
  instructions: any;

  constructor(private fb: FormBuilder, private api: CreateAPI) {
    this.createForm();
  }

  createForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      numberOfServings: ['', Validators.required],
      prepTime: ['', Validators.required],
      meal: ['', Validators.required],
      creator: ['', Validators.required],
      recipeImage: ['', Validators.required],
      difficulty: ['', Validators.required],
      ingredients: this.fb.array([]),
      steps: this.fb.array([]),
      tags: this.fb.array([]),
      instructions: this.fb.array([]),
      dietaryPlans: this.fb.array([]),
    });
        
  }
  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get nameControl() {
    return (this.recipeForm.get('name') as FormArray).controls;
  }

  get numberOfServingsControl() {
    return (this.recipeForm.get('numberOfServings') as FormArray).controls;
  }

  get descriptionControl() {
    return (this.recipeForm.get('description') as FormArray).controls;
  }

  get preparationTimeControl() {
    return (this.recipeForm.get('prepTime') as FormArray).controls;
  }

  get mealControl() {
    return (this.recipeForm.get('meal') as FormArray).controls;
  }

  get stepsControl() {
    return (this.recipeForm.get('steps') as FormArray).controls;
  }

  get creatorTimeControl() {
    return (this.recipeForm.get('creator') as FormArray).controls;
  }

  get tagsControl() {
    return (this.recipeForm.get('tags') as FormArray).controls;
  }

  get difficultyControl() {
    return (this.recipeForm.get('difficulty') as FormArray).controls;
  }

  get recipeImageControl() {
    return (this.recipeForm.get('recipeImage') as FormArray).controls;
  }

  get dietaryPlans() {
    return (this.recipeForm.get('dietaryPlans') as FormArray).controls;
  }

  addIngredient() {
    this.ingredientControls.push(this.fb.control(''));
  }

  get instructionControls() {
    if(this.recipeForm)
      if((this.recipeForm.get('steps') as FormArray))
        return (this.recipeForm.get('steps') as FormArray).controls;
    return null;
  }

  addInstruction(): void {
    if(this.instructionControls)
      this.instructionControls.push(this.fb.control(''));
  }

  removeIngredient(index: number): void {
    if(this.ingredientControls)
      this.ingredientControls.splice(index, 1);
  }

  removeInstruction(index: number) : void{
    if(this.ingredientControls)
      this.ingredientControls.splice(index, 1);
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
    return this.isDietaryPlanSelected(plan)
      ? 'bg-gray-600 text-white'
      : 'bg-gray-300 text-gray-700';
  }

  isDietaryPlanSelected(plan: string): boolean {
    const dietaryPlans = this.recipeForm.get('dietaryPlans')?.value;

    return dietaryPlans.includes(plan);
  }

  createRecipe() : void {
    // Ingredients array
    const ingredients: IIngredient[] = [];
    
    let tags = new Array(this.dietaryPlans.length);
    let count = 0;
    this.ingredientControls.forEach((element) => {
      if (element.value !== null) {
        
         ingredients.push({
          name: element.value,
          ingredientId : (count++).toString(),
          unit: "kg",
          amount: 2,
        });
      }
    });

    // Instructions array
    const instructions: string[] = [];

    if(this.instructionControls)
      this.instructionControls.forEach((element) => {
        if (element.value) {
          instructions.push(element.value);
        }
      });

    // Dietary plans array
    this.dietaryPlans.forEach((element) => {
      if (element.value !== null) {
        tags.push(element.value);
      }
    });

    tags = tags.filter((value) => value !== null);

    // We store the ingredients and return ingredients
    const createdIngredients = this.createIngredients(ingredients);

    // After now having stored or created the ingredients, we create the recipe.
    createdIngredients.then((ingredientsArray) => {

      // The, create the recipe object
      const recipe: IRecipe = {
        recipeId : "123",
        name: this.recipeForm.get('name')?.value,
        recipeImage: this.imageUrl,
        ingredients: ingredientsArray,
        steps: instructions,
        description: "A delicious chicken falafel",
        difficulty: 'Easy',
        prepTime: this.recipeForm.get('prepTime')?.value as number,
        numberOfServings: this.recipeForm.get('numberOfServings')?.value as number,
        tags: tags,
        meal: "Snack",
        creator: "Kristap P",

      };

      // Store the recipe to the database
      this.api.createNewRecipe(recipe).subscribe((response) => {
        if (!response) {
          return response;
        }
        return response;
      });
      
    });
  }

  createIngredients(ingredients: IIngredient[]) : Promise<IIngredient[]> {
    const recipe = new Promise<IIngredient[]>((resolve, reject) => {
      this.api
        .createNewMultipleIngredients(ingredients)
        .subscribe((response) => {
          if (!response) {
            reject(response);
          }
          resolve(response);
        });
    })

    return recipe;
  }


}
