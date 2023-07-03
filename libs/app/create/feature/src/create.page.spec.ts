import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { CreatePagComponent } from './create.page';
import { IonicModule } from '@ionic/angular';
import {HttpClientModule } from '@angular/common/http';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature'
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipe, IRecipeStep } from '@fridge-to-plate/app/recipe/utils';
import { CreateAPI } from '@fridge-to-plate/app/create/data-access';

describe('CreatePage', () => {
  let component: CreatePagComponent;
  let fixture: ComponentFixture<CreatePagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePagComponent ],
      imports: [
        ReactiveFormsModule,
        IonicModule,
        HttpClientModule,
        NavigationBarModule
      ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a new instruction control to the form', () => {
    const initialLength = component.instructionControls.length;
    component.addInstruction();
    const newLength = component.instructionControls.length;
    expect(newLength).toBe(initialLength + 1);
  });
});

describe('CreatePagComponent', () => {
  let createPage: CreatePagComponent;
  let fixture: ComponentFixture<CreatePagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePagComponent ],
      imports: [
        ReactiveFormsModule,
        IonicModule,
        HttpClientModule,
        NavigationBarModule
      ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePagComponent);
    createPage = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a recipe form with the correct fields', () => {
    createPage.createForm();

    expect(createPage.recipeForm.contains('name')).toBe(true);
    expect(createPage.recipeForm.contains('description')).toBe(true);
    expect(createPage.recipeForm.contains('servings')).toBe(true);
    expect(createPage.recipeForm.contains('preparationTime')).toBe(true);
    expect(createPage.recipeForm.contains('ingredients')).toBe(true);
    expect(createPage.recipeForm.contains('instructions')).toBe(true);
    expect(createPage.recipeForm.contains('dietaryPlans')).toBe(true);
  });

  it('should set the name, description, servings, and preparationTime fields as required', () => {
    createPage.createForm();

    const nameControl = createPage.recipeForm.get('name');
    const descriptionControl = createPage.recipeForm.get('description');
    const servingsControl = createPage.recipeForm.get('servings');
    const preparationTimeControl = createPage.recipeForm.get('preparationTime');

    expect(nameControl?.errors?.['required']).toBe(true);
    expect(descriptionControl?.errors?.['required']).toBe(true);
    expect(servingsControl?.errors?.['required']).toBe(true);
    expect(preparationTimeControl?.errors?.['required']).toBe(true);
  });

  it('should create an empty array for the ingredients and instructions fields', () => {
    createPage.createForm();

    const ingredientsArray = createPage.recipeForm.get('ingredients');
    const instructionsArray = createPage.recipeForm.get('instructions');

    expect(ingredientsArray?.value).toEqual([]);
    expect(instructionsArray?.value).toEqual([]);
  });

  it('should create an empty array for the dietaryPlans field', () => {
    createPage.createForm();

    const dietaryPlansArray = createPage.recipeForm.get('dietaryPlans');

    expect(dietaryPlansArray?.value).toEqual([]);
  });

  


});

describe('toggleDietaryPlan', () => {
  let component: CreatePagComponent;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePagComponent ],
      providers: [FormBuilder],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        NavigationBarModule
      ]
    });
    component = TestBed.createComponent(CreatePagComponent).componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.recipeForm = fb.group({
      dietaryPlans: fb.array([]),
    });
  });

  it('should remove the dietary plan if it is already selected', () => {

    const plan = 'Vegetarian';
    const dietaryPlans = component.recipeForm.get('dietaryPlans') as FormArray;
    dietaryPlans.push(fb.control(plan));

    component.toggleDietaryPlan(plan);

    expect(dietaryPlans.length).toBe(0);
  });

  it('should add the dietary plan if it is not selected', () => {

    const plan = 'Vegan';
    const dietaryPlans = component.recipeForm.get('dietaryPlans') as FormArray;

    component.toggleDietaryPlan(plan);

    expect(dietaryPlans.length).toBe(1);
    expect(dietaryPlans.value).toContain(plan);
  });
});

describe('Testing Tags', () => {
  let component: CreatePagComponent;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePagComponent ],
      providers: [FormBuilder],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        NavigationBarModule
      ]
    });


    component = TestBed.createComponent(CreatePagComponent).componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.recipeForm = fb.group({
      dietaryPlans: fb.array([]),
    });
  });

  it('It should not add null values to tags array', () => {

    const plan1 = 'Vegetarian';
    const plan2 = 'Vegan';
    const plan3 = null;
    const dietaryPlans = component.recipeForm.get('dietaryPlans') as FormArray;
    dietaryPlans.push(fb.control(plan1));
    dietaryPlans.push(fb.control(plan2));
    dietaryPlans.push(fb.control(plan3));
    const tags = [];

  for (let index = 0; index < dietaryPlans.length; index++) {
    if(dietaryPlans.controls[index].value !== null){
      tags.push(dietaryPlans.controls[index].value)
    }
    
  }

    expect(tags.length).toBe(2);
    expect(tags).not.toContain(null);
    expect(tags).toContain("Vegetarian");
    expect(tags).toContain("Vegan");
    
  });
});


describe('Ingredients storing and return', () => { 

  let component: CreatePagComponent;
  let api: CreateAPI

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePagComponent ],
      providers: [FormBuilder],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        NavigationBarModule
      ]
    });
    component = TestBed.createComponent(CreatePagComponent).componentInstance;
    api = TestBed.inject(CreateAPI);

    });

  it('It should return the stored ingredients and recipe Creation', () => { 

      // Mock data
      const data = { 
        ingredientId : "123",
        name: "Chicken Falaty"
      }

      // Mocking the service
      const mockIngredients : IIngredient[] = [];
      mockIngredients.push(data)
      
      const ingredients = component.createIngredients(mockIngredients);
      return ingredients.then( (returnIngredients) => {
      expect(returnIngredients).toEqual(mockIngredients);
    });
    
  });

  
  it('The returned Ingredient object should not be null', () => { 

      // Mock data
      const data = { 
        ingredientId : "123",
        name: "Chicken Falaty"
      }

      // Mocking the service
      const mockIngredients : IIngredient[] = [];
      mockIngredients.push(data)
      
      const ingredients = component.createIngredients(mockIngredients);
      return ingredients.then( (returnIngredients) => {
      expect(returnIngredients).not.toBe(null);
      expect(returnIngredients.length).not.toBe(0);
    });
    
  });

  it('Checking the equality of sent data and returned data by size of the object', () => { 

    // Mock data
    const data = { 
      ingredientId : "123",
      name: "Chicken Falaty"
    }

    // Mocking the service
    const mockIngredients : IIngredient[] = [];
    mockIngredients.push(data)
    
    const ingredients = component.createIngredients(mockIngredients);
    return ingredients.then( (returnIngredients) => {
    expect(returnIngredients.length).toBe(1);
    expect(returnIngredients.length).not.toBe(0);
  });
  
});

it('Recipe should be successfully created', (done) => { 

  // Mock data
  const data = { 
    ingredientId : "123",
    name: "Chicken Falaty"
  }

  // Mocking the service
  const mockIngredients : IIngredient[] = [];
  mockIngredients.push(data)

  const steps : IRecipeStep[] = [];
  steps.push({instructionHeading: "N/A", instructionBody: "Cook the chicken"});
  steps.push({instructionHeading: "N/A", instructionBody: "Eat the chicken"}); 

  const recipe : IRecipe = {
    recipeId : "recipeID123",
    name: "Chicken Falafel",
    recipeImage: "https://example.com/recipe-image.jpg",
    numberOfServings: 4,
    prepTime: 30,
    ingredients: mockIngredients,
    instructions: steps,
    difficulty: 'easy',
    tags: ["Vegetarian", "Vegan"]
  }


    api.createNewRecipe(recipe).subscribe((response) => {
      expect(response).toBeDefined();
      expect(response.name).toEqual(recipe.name);
      expect(response.recipeId).toEqual(recipe.recipeId);
      expect(response.ingredients).toEqual(recipe.ingredients);
      expect(response.instructions).toEqual(recipe.instructions);
      done();
    }, (error) => {
      fail(error);
    });
  });


});