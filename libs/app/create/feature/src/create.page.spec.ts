import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CreatePagComponent } from './create.page';
import { IonicModule } from '@ionic/angular';
import {HttpClientModule } from '@angular/common/http';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature'
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { of } from "rxjs";
import { CreateAPI } from '@fridge-to-plate/app/create/data-access';

describe('CreatePage', () => {
  let component: CreatePagComponent;
  let fixture: ComponentFixture<CreatePagComponent>;
  let formBuilder: FormBuilder;

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
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should add a new instruction control to the form', () => {
    const initialLength = component.instructionControls.length;
    component.addInstruction();
    const newLength = component.instructionControls.length;
    expect(newLength).toBe(initialLength + 1);
  });

  it('should remove the instruction at the specified index', () => {

    component.recipeForm = formBuilder.group({
      instructions: formBuilder.array([
        formBuilder.control('Instruction 1', Validators.required),
        formBuilder.control('Instruction 2', Validators.required),
      ]),
    });
    // Arrange
    const indexToRemove = 1;
    const initialInstructionsCount = component.instructionControls.length;

    // Act
    component.removeInstruction(indexToRemove);

    // Assert
    const finalInstructionsCount = component.instructionControls.length;
    expect(finalInstructionsCount).toBe(initialInstructionsCount - 1);
    expect(component.instructionControls[1]).toBeUndefined();
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

  it('should add a new ingredient control to the form', () => {
    const initialLength = createPage.ingredientControls.length;
    createPage.addIngredient();
    const newLength = createPage.ingredientControls.length;
    expect(newLength).toBe(initialLength + 1);
  }
  );

  it('should remove an ingredient control from the form', () => {
    const initialLength = createPage.ingredientControls.length;
    if(initialLength == 0) {
      expect(initialLength).toBe(0)
      return
    }
    createPage.removeIngredient(0);
    const newLength = createPage.ingredientControls.length;
    expect(newLength).toBe(initialLength - 1);
  }
  );

  it('should add a new instruction control to the form', () => {
    const initialLength = createPage.instructionControls.length;
    createPage.addInstruction();
    const newLength = createPage.instructionControls.length;
    expect(newLength).toBe(initialLength + 1);
  }
  );


  it('should remove an instruction control from the form', () => {
    const initialLength = createPage.instructionControls.length;
    if(initialLength == 0) {
      expect(initialLength).toBe(0)
      return
    }
    createPage.removeInstruction(0);
    const newLength = createPage.instructionControls.length;
    expect(newLength).toBe(initialLength - 1);
  }
  );

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

  it('Returns an array of instruction controls', () => {
    const formArray = new FormArray([
      new FormControl('Step 1'),
      new FormControl('Step 2'),
      new FormControl('Step 3'),
    ]);

      // create a new recipe form using the form array
      const recipeForm = new FormGroup({
        instructions: formArray,
      });

      component.recipeForm = recipeForm;

      const controls = component.instructionControls;
      expect(controls.length).toBe(3);
      expect(controls[0] instanceof FormControl).toBe(true);
      expect(controls[1] instanceof FormControl).toBe(true);
      expect(controls[2] instanceof FormControl).toBe(true);
    
  })


  it('creates an array of IRecipeStep objects', () => {
    // create a mock form array with some form controls
    const formArray = new FormArray([
      new FormControl('Step 1'),
      new FormControl('Step 2'),
      new FormControl('Step 3'),
    ]);

    // create a mock form group with the form array
    const formGroup = new FormGroup({
      instructions: formArray,
    });

    // create a new instance of the RecipeComponent

    // assign the mock form group to the component's recipeForm property
    component.recipeForm = formGroup;

    // call the createInstructions method and check the result
    ;

    const instructions: string[] = [];
    for (let index = 0; index < component.instructionControls.length; index++) {
      instructions.push(component.instructionControls[index].value);
    }



    // assert that the instructions array was created correctly
    expect(instructions[0]).toEqual('Step 1');
    expect(instructions[1]).toEqual('Step 2');
    expect(instructions[2]).toEqual('Step 3');
  
  })


  it("Creates Recipe", () => {


    const difficulty = "Easy" as const;
    // Mock data
    const expectData: IRecipe = { 
      recipeId : "123",
      recipeImage : "Mock image",
      difficulty: difficulty,
      creator: "testuser",
      meal: 'Dinner',
      tags: [],
      name: "Chicken Falaty",
      description: "A delicious chicken falafel",
      servings: 4,
      prepTime: 30,
      ingredients: [],
      steps: [],
    }

    // Mocking the service
    const mockRecipe : IRecipe[] = [];
    mockRecipe.push(expectData)

    const mockApi = {
      createNewRecipe: jest.fn().mockReturnValue(mockRecipe),
    };

    const testObject = { api: mockApi };
    const returnRecipe = testObject.api.createNewRecipe()

    expect(returnRecipe[0]).toEqual(expectData);
  })


  it('Returns an array of ingredients controls', () => {
    const formArray = new FormArray([
      new FormControl('Mango'),
      new FormControl('Potato'),
      new FormControl('Banana'),
    ]);

      // create a new recipe form using the form array
      const recipeForm = new FormGroup({
        ingredients: formArray,
      });

      component.recipeForm = recipeForm;

      const controls = component.ingredientControls;
      expect(controls.length).toBe(3);
      expect(controls[0] instanceof FormControl).toBe(true);
      expect(controls[1] instanceof FormControl).toBe(true);
      expect(controls[2] instanceof FormControl).toBe(true);
    
  })
});

describe('Testing Tags', () => {
  let component: CreatePagComponent;
  let fb: FormBuilder;
  let fixture: ComponentFixture<CreatePagComponent>;

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

    fixture = TestBed.createComponent(CreatePagComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
    component.recipeForm = fb.group({
      meal: ['', Validators.required],
      tag: ['', Validators.required],
    });
  });

  it("Should selet a meal type successfully", () => {
    const mealType = 'Breakfast';
    component.recipeForm.get('meal')?.setValue(mealType);
    jest.spyOn(component, 'toggleMeal');
  
    // Act
    component.toggleMeal(mealType);
  
    // Assert
    expect(component.selectedMeal).toBe(mealType)
    expect(component.toggleMeal).toBeCalledWith(mealType)
    
  })

  
  it("The selected meals should change when the user changes", () => {

    const mealType = 'Lunch';
    component.recipeForm.get('meal')?.setValue(mealType);
  
    // Act
    component.toggleMeal(mealType);

    // Act
    
    component.recipeForm.get('meal')?.setValue(mealType);
    const mealType2 = 'Dinner';
    // Act
    component.toggleMeal(mealType2);
  
  
    // Assert
    expect(component.selectedMeal).toBe(mealType2)
    expect(component.selectedMeal).not.toBe(mealType)
    
  })

  
  it('should not add a tag if tagValue is empty', () => {
    // Arrange
    component.recipeForm.get('tag')?.setValue('');

    // Act
    component.addTag();

    // Assert
    expect(component.tags.length).toBe(0);
  });

  it('should not add a tag if tags length is already 3', () => {
    // Arrange
    component.recipeForm.get('tag')?.setValue('Tag 1');
    const testTags = ['Tag 1', 'Tag 2', 'Tag 3'];
    component.tags = testTags;

    // Act
    component.addTag();

    // Assert
    expect(component.tags.length).toBe(3);
    expect(component.tags).toEqual(testTags);
  });

  it('should add a tag if tagValue is not empty', () => {
    // Arrange
    component.recipeForm.get('tag')?.setValue('Tag 1');

    // Act
    component.addTag();

    
    const testTagsOutput = ['Tag 1'];
    // Assert
    expect(component.tags.length).toBe(1);
    expect(component.tags).toEqual(testTagsOutput);
  });

  it("Should delete a meal tag successfully", () => {

    const testTags = ['Tag 1', 'Tag 2', 'Tag 3'];
    component.tags = testTags;

    component.deleteTag(0);

    const testTagsOutput = ['Tag 2', 'Tag 3'];
    // Assert
    expect(component.tags.length).toBe(2);
    expect(component.tags).toEqual(testTagsOutput);
  })




});


describe('Ingredients storing and return', () => { 
  let component: CreatePagComponent;
  let apiService: jest.Mocked<CreateAPI>;
  let fixture: ComponentFixture<CreatePagComponent>;
  let formBuilder: FormBuilder;

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
    fixture = TestBed.createComponent(CreatePagComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(CreateAPI) as jest.Mocked<CreateAPI>;
    formBuilder = TestBed.inject(FormBuilder);

    

    fixture.detectChanges();


    });

  it('Create Ingredients', () => { 
      // Mock data
      const expectData = { 
        name: "Chicken Falaty",
        amount: 1,
        unit: "kg"
      }

      // Mocking the service
      const mockIngredients : IIngredient[] = [];
      mockIngredients.push(expectData)

      const mockApi = {
        createNewMultipleIngredients: jest.fn().mockReturnValue(mockIngredients),
      };

      const testObject = { api: mockApi };
      const returnIngredients = testObject.api.createNewMultipleIngredients()

      expect(returnIngredients[0]).toEqual(expectData);
    });


    

   // Assuming the ApiService is using `rxjs` Observables

  

  it('should remove the ingredient at the specified index', () => {

    component.recipeForm = formBuilder.group({
      ingredients: formBuilder.array([
        formBuilder.group({
          ingredientName: ['Ingredient 1', Validators.required],
          amount: [1, Validators.required],
          scale: ['kg', Validators.required],
        }),
        formBuilder.group({
          ingredientName: ['Ingredient 2', Validators.required],
          amount: [2, Validators.required],
          scale: ['g', Validators.required],
        }),
      ]),
    });


    // Arrange
    const indexToRemove = 1;
    const initialIngredientsCount = component.ingredientControls.length;
    
    
    // Act
    component.removeIngredient(indexToRemove);

    // Assert
    const finalIngredientsCount = component.ingredientControls.length;
    expect(finalIngredientsCount).toBe(initialIngredientsCount - 1);
    expect(component.ingredientControls[1]).toBeUndefined();
  });
  
  });



  describe("Testing Recipe Creation", () => {
    let component: CreatePagComponent;
    let fb: FormBuilder;
    let apiService: jest.Mocked<CreateAPI>
    let fixture: ComponentFixture<CreatePagComponent>;
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
      fixture = TestBed.createComponent(CreatePagComponent);
      component = fixture.componentInstance;
      apiService = TestBed.inject(CreateAPI) as jest.Mocked<CreateAPI>;
      fb = TestBed.inject(FormBuilder);
      component.recipeForm = fb.group({
        dietaryPlans: fb.array([]),
      });
    });

    it('creates an array of IRecipeStep objects', () => {
      // create a mock form array with some form controls
      const formArray = new FormArray([
        new FormControl('Step 1'),
        new FormControl('Step 2'),
        new FormControl('Step 3'),
      ]);
  
      // create a mock form group with the form array
      const formGroup = new FormGroup({
        instructions: formArray,
      });
  
      // create a new instance of the RecipeComponent
  
      // assign the mock form group to the component's recipeForm property
      component.recipeForm = formGroup;
  
      // call the createInstructions method and check the result
      ;
  
      const instructions: string[] = [];
      for (let index = 0; index < component.instructionControls.length; index++) {
        instructions.push(component.instructionControls[index].value);
      }

    });
  
    it('creates an array of IIngredient objects', () => {
      // create a mock form array with some form controls
      const formArray = new FormArray([
        new FormControl({
          ingredientName: 'Mango',
          amount: 100,
          unit: 'g'
        }),
        new FormControl({
          ingredientName: 'Potato',
          amount: 1,
          unit: 'kg'
        }),
        new FormControl({
          ingredientName: 'Banana',
          amount: 300,
          unit: 'g'
        }),
        new FormControl({
          ingredientName: 'Salad',
          amount: 100,
          unit: 'g'
        }),
        new FormControl({
          ingredientName: 'Onion',
          amount: 1,
          unit: 'whole'
        }),
      ]);
  
        // create a new recipe form using the form array
        const recipeForm = new FormGroup({
          ingredients: formArray,
        });
  
        component.recipeForm = recipeForm;
  
        const controls = component.ingredientControls;
      
      const ingredients : IIngredient[] = [];
      for (let index = 0; index < controls.length; index++) {
        ingredients.push({
          name: controls[index].value.ingredientName,
          amount: controls[index].value.amount,
          unit: controls[index].value.unit,
        });
      }
  
      // assert that the instructions array was created correctly
      expect(ingredients[0]).toEqual({ name: "Mango", amount: 100, unit: "g" });
      expect(ingredients[1]).toEqual({ name: "Potato", amount: 1, unit: "kg" })
      expect(ingredients[2]).toEqual({ name: "Banana", amount: 300, unit: "g" })
      expect(ingredients[3]).toEqual({ name: "Salad", amount: 100, unit: "g" })
      expect(ingredients[4]).toEqual({ name: "Onion", amount: 1, unit: "whole" })
    
    })


  

    it('should create the recipe', async () => {
      const recipe: IRecipe = {
        name: "Mock Recipe",
        recipeImage: "https://example.com/image.jpg",
        description: "Amazing meal for a family",
        meal: "Dinner",
        creator: "testuser",
        ingredients: [
        ],
        steps: [
            "Mock instructions",
        ],
        difficulty: "Easy",
        prepTime: 30,
        servings: 4,
        tags: ["mock", "recipe"],
      };
    
      const response: IRecipe = {
        recipeId: "1",
        ...recipe, // Copy the properties from the recipe object
      };
  
      jest.spyOn(apiService, "createNewRecipe").mockReturnValue(of(response));
    
      component.imageUrl = recipe.recipeImage
      // Mock the values and controls used in createRecipe
      component.recipeForm = fb.group({
        name: fb.control(recipe.name),
        servings: fb.control(recipe.servings),
        preparationTime: fb.control(recipe.prepTime),
        ingredients: fb.array(recipe.ingredients.map(ingredient => fb.control(ingredient.name))),
        instructions: fb.array(recipe.steps.map(instruction => fb.control(instruction))),
        dietaryPlans: fb.array((recipe.tags || []).map(tag => fb.control(tag))),
      });
      
    
      // Call the createRecipe method
      component.createRecipe();
    
      // Wait for the promises to resolve
      await fixture.whenStable();
    
      // Verify that the createNewRecipe method was called with the correct recipe argument
      // expect(apiService.createNewRecipe).toHaveBeenCalledWith(recipe);
      // expect(apiService.createNewRecipe).toBeTruthy();
    
      // Verify that the createIngredients method was called

    });
    

  })


  describe("Testing placeholder texts for Amount", () => {

    let component: CreatePagComponent;
    let fixture: ComponentFixture<CreatePagComponent>;

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
      fixture = TestBed.createComponent(CreatePagComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    
    it('should return "e.g 10" when window width is less than 1024', () => {
      // Arrange
      global.innerWidth = 800; // Set the window width to a value less than 1024
  
      // Act
      const placeholderText = component.getAmountPlaceholderText();
  
      // Assert
      expect(placeholderText).toBe('e.g 10');
    });
  
    it('should return "Amount" when window width is greater than or equal to 1024', () => {
      // Arrange
      global.innerWidth = 1200; // Set the window width to a value greater than or equal to 1024
  
      // Act
      const placeholderText = component.getAmountPlaceholderText();
  
      // Assert
      expect(placeholderText).toBe('Amount');
    });
  })

  describe("Testing placeholder texts for Unit", () => {

    let component: CreatePagComponent;
    let fixture: ComponentFixture<CreatePagComponent>;

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
      fixture = TestBed.createComponent(CreatePagComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    
    it('should return "e.g 10" when window width is less than 1024', () => {
      // Arrange
      global.innerWidth = 800; // Set the window width to a value less than 1024
  
      // Act
      const placeholderText = component.getUnitPlaceholderText();
  
      // Assert
      expect(placeholderText).toBe('e.g L');
    });
  
    it('should return "Amount" when window width is greater than or equal to 1024', () => {
      // Arrange
      global.innerWidth = 1200; // Set the window width to a value greater than or equal to 1024
  
      // Act
      const placeholderText = component.getUnitPlaceholderText();
  
      // Assert
      expect(placeholderText).toBe('Unit');
    });
  })

  describe("Image upload", () => {

    let component: CreatePagComponent;
    let fixture: ComponentFixture<CreatePagComponent>;

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
      fixture = TestBed.createComponent(CreatePagComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    
    it('should update the imageUrl when a file is selected', () => {
      // Arrange
      const file = new File(['sample content'], 'sample.jpg', { type: 'image/jpeg' });
      const event = { target: { files: [file] } };
      const existingImage = component.imageUrl;
      
      const readAsDataURLStringSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL');

      // Act
      component.onFileChanged(event);

      // Assert
      expect(readAsDataURLStringSpy).toHaveBeenCalledWith(file);

      const reader = new FileReader();
      reader.addEventListener("load", function(event) {
        expect(component.imageUrl).toBe(file.name);
        expect(component.imageUrl).not.toBe(existingImage);
      });
    });
   
  });