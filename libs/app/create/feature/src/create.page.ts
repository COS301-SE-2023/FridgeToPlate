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
  imageUrl = 'https://img.freepik.com/free-photo/frying-pan-empty-with-various-spices-black-table_1220-561.jpg';
  selectedMeal!: string;
  tags: string[] = [];

  constructor(private fb: FormBuilder, private api: CreateAPI) {
    this.createForm();
  }

  createForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      servings: ['', Validators.required],
      meal: ['', Validators.required],
      preparationTime: ['', Validators.required],
      ingredients: this.fb.array([]),
      instructions: this.fb.array([]),
      tag: ['', Validators.required]
    });
  }
  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    const ingredientGroup = this.fb.group({
      ingredient: ['', Validators.required],
      amount: ['', Validators.required],
      unit: ['', Validators.required]
    });

    (this.recipeForm.get('ingredients') as FormArray).push(ingredientGroup);
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

  getAmountControlName(index: number) {
    return `amount-${index}`;
  }

  getUnitControlName(index: number) {
    return `unit-${index}`;
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

    this.displayIngredientValues()
    alert(this.imageUrl)
    // Ingredients array
    const ingredients: IIngredient[] = [];
    


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
        difficulty: 'Easy',
        prepTime: this.recipeForm.get('preparationTime')?.value as number,
        numberOfServings: this.recipeForm.get('servings')?.value as number,
        tags: [],
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


  // TODO: Do not forget to test
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



  // Test
  toggleMeal(option: string) {
    this.selectedMeal = option;
  }


  // Unit test
  getMealPlan(option: string) {
    return {
      'bg-primary': this.selectedMeal === option,
      'bg-gray-200': this.selectedMeal !== option,
      'text-gray-700': true,
      'py-2': true,
      'px-4': true,
      'rounded-md': true,
      'mr-2': true
    };
  }

  // Test
  addTag() {
    const tagValue = this.recipeForm.get('tag')?.value;
    if (tagValue) {
      
      this.tags.push(tagValue);
    }
  }

  deleteTag(index: number) {
    this.tags.splice(index, 1);
  }

  displayIngredientValues(): void {
    for (let i = 0; i < this.ingredientControls.length; i++) {
      alert(this.ingredientControls.length)
      const ingredientGroup = this.ingredientControls[i] as FormGroup;
      const ingredientValue = ingredientGroup.get('ingredient')?.value;
      const amountValue = ingredientGroup.get('amount')?.value;
      const unitValue = ingredientGroup.get('unit')?.value;
      
      console.log(`Ingredient ${i + 1}: ${ingredientValue}`);
      console.log(`Amount ${i + 1}: ${amountValue}`);
      console.log(`Unit ${i + 1}: ${unitValue}`);
    }
  }

}
