import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAPI } from '@fridge-to-plate/app/create/data-access';
import { IRecipe, IRecipeStep } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

@Component({
  selector: 'fridge-to-plate-app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePagComponent {
  recipeForm!: FormGroup;
  imageUrl = 'https://img.icons8.com/ios-filled/50/cooking-book--v1.png';

  constructor(private fb: FormBuilder, private api: CreateAPI) {
    this.createForm();
  }

  createForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      servings: ['', Validators.required],
      preparationTime: ['', Validators.required],
      ingredients: this.fb.array([]),
      instructions: this.fb.array([]),
      dietaryPlans: this.fb.array([]),
    });
  }
  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get dietaryPlans() {
    return (this.recipeForm.get('dietaryPlans') as FormArray).controls;
  }

  addIngredient() {
    this.ingredientControls.push(this.fb.control(''));
  }

  get instructionControls() {
    return (this.recipeForm.get('instructions') as FormArray).controls;
  }

  addInstruction(): void {
    this.instructionControls.push(this.fb.control(''));
  }

  removeIngredient(index: number): void {
    this.ingredientControls.splice(index, 1);
  }

  removeInstruction(index: number) : void{
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
    this.ingredientControls.forEach((element) => {
      if (element.value !== null) {
        
         ingredients.push({
          name: element.value
        });
      }
    });

    // Instructions array
    const instructions: IRecipeStep[] = [];
    this.instructionControls.forEach((element) => {
      if (element.value) {
        instructions.push({
          instructionHeading: 'N/A',
          instructionBody: element.value,
        });
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
        name: this.recipeForm.get('name')?.value,
        recipeImage: this.imageUrl,
        ingredients: ingredientsArray,
        instructions: instructions,
        rating: 0,
        difficulty: 'easy',
        prepTime: this.recipeForm.get('preparationTime')?.value as number,
        numberOfServings: this.recipeForm.get('servings')?.value as number,
        tags: tags,
      };

      // Store the recipe to the database
      this.api.createNewRecipe(recipe).subscribe((response) => {
        if (!response) {
          console.error('Error creating recipe');
          return response;
        }
        console.log('Recipe created successfully');
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
            console.log('Error creating ingredients');
            reject(response);
          }
          console.log('ingredients created successfully');
          resolve(response);
        });
    })

    return recipe;
  }

  getIngredientsContent(): void {
    for (let i = 0; i < this.ingredientControls.length; i++) {
      const ingredientControl = this.ingredientControls[i];
      console.log(ingredientControl.value);
      // do something with the ingredient control
    }
  }


}
