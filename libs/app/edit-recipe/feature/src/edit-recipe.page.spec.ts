import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRecipeComponent } from './edit-recipe.page';
import { NgxsModule, State, Store } from '@ngxs/store';
import { DeleteRecipe, IRecipe, UpdateRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { BehaviorSubject, of } from 'rxjs';
import { Location } from '@angular/common';

import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { Navigate } from '@ngxs/router-plugin';

describe('EditRecipeComponent', () => {
  let component: EditRecipeComponent;
  let fixture: ComponentFixture<EditRecipeComponent>;

  const testProfile: IProfile = {
    displayName: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
    savedRecipes: [],
    ingredients: [],
    profilePic: "image-url",
    createdRecipes: [],
    currMealPlan: null,
  };

  @State({ 
    name: 'profile', 
    defaults: {
      profile: testProfile
    } 
  })

  @Injectable()
  class MockProfileState {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, HttpClientModule, NavigationBarModule, RouterTestingModule, NgxsModule.forRoot([MockProfileState])],
      declarations: [EditRecipeComponent],
      providers: [
        
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should go to Home Page', ()=> {
      const storeDispatchSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
      component.goHome();
      expect(storeDispatchSpy).toHaveBeenCalledWith(new Navigate(['/home']));
    })

    it('test delete recipe with valid recipe id', () => {
      const recipeId = 'valid_recipe_id';
      const deleteRecipeSpy = jest.spyOn(EditRecipeComponent.prototype, 'deleteRecipe');
      const storeDispatchSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
      const component = fixture.componentInstance;
      component.recipe = { recipeId } as IRecipe;
      fixture.detectChanges();
      component.deleteRecipe();

      expect(deleteRecipeSpy).toHaveBeenCalled();
      expect(storeDispatchSpy).toHaveBeenCalledWith(new DeleteRecipe(recipeId));
  });

  it('test show error message if recipe id is not available', () => {
    const showErrorSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
    const component = fixture.componentInstance;
    component.recipe = null;
    fixture.detectChanges();

    component.deleteRecipe();

    expect(showErrorSpy).toHaveBeenCalledWith(new ShowError('Could not delete recipe'));
  });

      // Tests that DeleteRecipe action is dispatched with recipeId
    it('test dispatch delete recipe action with recipe id', () => {
      const recipeId = 'valid_recipe_id';
      const storeDispatchSpy = jest.spyOn(TestBed.inject(Store), 'dispatch').mockReturnValue(of(null));
      const locationBackSpy = jest.spyOn(TestBed.inject(Location), 'back');
      const component = fixture.componentInstance;
      component.recipe = { recipeId } as IRecipe;
      fixture.detectChanges();

      component.deleteRecipe();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new DeleteRecipe(recipeId));
      expect(locationBackSpy).toHaveBeenCalled();
  });

  it('test cancel edit calls location back', () => {
    const locationBackSpy = jest.spyOn(TestBed.inject(Location), 'back');
    component.cancelEdit();
    expect(locationBackSpy).toHaveBeenCalled();
});

it('test populateForm with recipe', () => {
  component.recipe = {
      recipeId: '1',
      name: 'Test Recipe',
      recipeImage: 'https://img.freepik.com/free-photo/frying-pan-empty-with-various-spices-black-table_1220-561.jpg',
      description: 'Test Recipe Description',
      meal: 'Breakfast',
      creator: '',
      ingredients: [
          {
              name: 'Test Ingredient',
              amount: 1,
              unit: 'Test Unit'
          }
      ],
      steps: ['Test Step'],
      difficulty: 'Easy',
      prepTime: 10,
      servings: 2,
      tags: ['Test Tag']
  };

  component.populateForm();
  expect(component.ingredientControls.length).toEqual(1);
  expect(component.instructionControls.length).toEqual(1);
  expect(component.tags).toEqual(['Test Tag']);
  expect(component.selectedMeal).toEqual('Breakfast');
  expect(component.imageUrl).toEqual('https://img.freepik.com/free-photo/frying-pan-empty-with-various-spices-black-table_1220-561.jpg');
  expect(component.difficulty).toEqual('Easy');
});


});
@State({
  name: 'create',
  defaults: {
    recipe: null,
  }
})

@Injectable()
class MockCreateState {}



describe('Edit Recipe Page', () => {
  let editRecipePage: EditRecipeComponent;
  let fixture: ComponentFixture<EditRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecipeComponent ],
      imports: [
        ReactiveFormsModule,
        IonicModule,
        HttpClientModule,
        NavigationBarModule,
        RouterTestingModule,
        NgxsModule.forRoot([MockCreateState])
      ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecipeComponent);

    editRecipePage = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the name, description, servings, and preparationTime fields', () => {
    
    const populateFormSpy = jest.spyOn(EditRecipeComponent.prototype, 'populateForm');

    const recipe = {
      recipeId: '1',
      name: 'Test Recipe',
      recipeImage: 'https://img.freepik.com/free-photo/frying-pan-empty-with-various-spices-black-table_1220-561.jpg',
      description: 'Test Recipe Description',
      meal: 'Breakfast',
      creator: 'Test Creator',
      ingredients: [
          {
              name: 'Test Ingredient 1',
              amount: 1,
              unit: 'Test Unit 1'
          },
          {
              name: 'Test Ingredient 2',
              amount: 2,
              unit: 'Test Unit 2'
          }
      ],
      steps: ['Test Step 1', 'Test Step 2'],
      difficulty: 'Easy',
      prepTime: 10,
      servings: 2,
      tags: ['Test Tag 1', 'Test Tag 2']
    } as IRecipe;

    const initializeSpy = jest.spyOn(EditRecipeComponent.prototype, 'initialize').mockImplementation( () => {
      editRecipePage.recipe = recipe
    });
    
  editRecipePage.createForm();
  expect(initializeSpy).toBeCalled();
  expect(populateFormSpy).toBeCalled();
  expect(editRecipePage.recipeForm.value.name).toEqual('Test Recipe');
  expect(editRecipePage.recipeForm.value.description).toEqual('Test Recipe Description');
  expect(editRecipePage.recipeForm.value.servings).toEqual(2);
  expect(editRecipePage.recipeForm.value.preparationTime).toEqual(10);
});


  it('should add a new ingredient control to the form', () => {
    const initialLength = editRecipePage.ingredientControls.length;
    editRecipePage.addIngredient();
    const newLength = editRecipePage.ingredientControls.length;
    expect(newLength).toBe(initialLength + 1);
  }
  );

  it('should remove an ingredient control from the form', () => {
    const initialLength = editRecipePage.ingredientControls.length;
    if(initialLength == 0) {
      expect(initialLength).toBe(0)
      return
    }
    editRecipePage.removeIngredient(0);
    const newLength = editRecipePage.ingredientControls.length;
    expect(newLength).toBe(initialLength - 1);
  }
  );

  it('should add a new instruction control to the form', () => {
    const initialLength = editRecipePage.instructionControls.length;
    editRecipePage.addInstruction();
    const newLength = editRecipePage.instructionControls.length;
    expect(newLength).toBe(initialLength + 1);
  }
  );


  it('get instruction steps as String[]', () => {
    const formArray = new FormArray([
      new FormControl('Step 1'),
      new FormControl('Step 2'),
      new FormControl('Step 3'),
    ]);

    // create a new recipe form using the form array
    const recipeForm = new FormGroup({
      instructions: formArray,
    });

    editRecipePage.recipeForm = recipeForm;

    const instructions = editRecipePage.getInstructions();

    expect(instructions[0]).toBe('Step 1');
    expect(instructions[1]).toBe('Step 2');
    expect(instructions[2]).toBe('Step 3');
  })


  it('should remove an instruction control from the form', () => {

    const formArray = new FormArray([
      new FormControl('Step 1'),
      new FormControl('Step 2'),
      new FormControl('Step 3'),
    ]);

    // create a new recipe form using the form array
    const recipeForm = new FormGroup({
      instructions: formArray,
    });

    editRecipePage.recipeForm = recipeForm;

    const initialLength = editRecipePage.instructionControls.length;
    editRecipePage.removeInstruction(0);
    const newLength = editRecipePage.instructionControls.length;
    expect(newLength).toBe(initialLength - 1);
    expect(editRecipePage.getInstructions()).toEqual(['Step 2', 'Step 3'])
  }
  );
});


describe('Testing Tags', () => {
  let component: EditRecipeComponent;
  let fb: FormBuilder;
  let fixture: ComponentFixture<EditRecipeComponent>;
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecipeComponent ],
      providers: [FormBuilder],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        NavigationBarModule,
        RouterTestingModule,
        NgxsModule.forRoot([MockCreateState])
      ]
    });

    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    component.recipeForm = fb.group({
      tags: [''],
    });
  });

  it("Should selet a meal type successfully", () => {
    const mealType = 'Breakfast';
    component.selectedMeal = mealType;
    jest.spyOn(component, 'toggleMeal');
  
    // Act
    component.toggleMeal(mealType);
  
    // Assert
    expect(component.selectedMeal).toBe(mealType)
    expect(component.toggleMeal).toBeCalledWith(mealType)
  })
  
  it("The selected meals should change when the user changes", () => {

    const mealType = 'Lunch';
    component.selectedMeal = mealType;

    // Act
    const mealType2 = 'Dinner';
    // Act
    component.toggleMeal(mealType2);
  
    // Assert
    expect(component.selectedMeal).toBe(mealType2);
    expect(component.selectedMeal).not.toBe(mealType);
    
  })

  it("Should selet a difficulty successfully", () => {
    const difficulty = 'Easy';
    component.difficulty = difficulty;
    jest.spyOn(component, 'toggleDifficulty');
  
    // Act
    component.toggleDifficulty(difficulty);
  
    // Assert
    expect(component.difficulty).toBe(difficulty);
    expect(component.toggleDifficulty).toBeCalledWith(difficulty);
  })
  
  it("The selected difficulty should change when the user changes", () => {

    const difficulty1 = 'Easy';
    component.difficulty = difficulty1;

    // Act
    const difficulty2 = 'Medium';
    // Act
    component.toggleDifficulty(difficulty2);
  
    // Assert
    expect(component.difficulty).toBe(difficulty2);
    expect(component.toggleDifficulty).not.toBe(difficulty1);
    
  })

  it('should not add a tag if tagValue is empty', () => {
    // Arrange
    component.recipeForm.get('tag')?.setValue('');
    const size = component.tags.length;
    // Act
    component.addTag();

    // Assert
    expect(component.tags.length).toBe(size);
    expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('Please enter valid tag'));
  });

  it('should not add a duplicate tag', () => {
    // Arrange

    component.recipeForm.get('tags')?.setValue('Tag');
    const testTags = ['Tag'];
    component.tags = testTags;
    const size = component.tags.length;

    // Act
    component.addTag();

    // Assert
    expect(component.tags.length).toBe(size);
    expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('No duplicates: Tag already selected'));
    expect(component.tags).toEqual(testTags);
    
  });

  it('Should not add if tags is already at size three(3)',  () => {
    // Arrange
    component.recipeForm.get('tags')?.setValue('Tag 4');
    const testTags = ['Tag 1', 'Tag 2', 'Tag 3'];
    component.tags = testTags;

    // Act
    component.addTag();

    // Assert
    expect(component.tags.length).toBe(3);
    expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('Only a maximum of three tags'));
    expect(component.tags).toEqual(testTags);
  })

  it('should add a tag if tagValue is not empty', () => {
    // Arrange
    component.recipeForm.get('tags')?.setValue('Tag 1');

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


describe('Ingredients storing, deleting and returning', () => { 
  let component: EditRecipeComponent;
  let fixture: ComponentFixture<EditRecipeComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecipeComponent ],
      providers: [FormBuilder],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        NavigationBarModule,
        RouterTestingModule,
        NgxsModule.forRoot([MockCreateState])
      ]
    });
    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    fixture.detectChanges();

    });

    it('Gets an array of IIngredient objects ', () => {
      // create a mock form array with some form controls
      const formArray = new FormArray([
        new FormControl({
          name: 'Mango',
          amount: 100,
          unit: 'g'
        }),
        new FormControl({
          name: 'Potato',
          amount: 1,
          unit: 'kg'
        }),
        new FormControl({
          name: 'Banana',
          amount: 300,
          unit: 'g'
        }),
        new FormControl({
          name: 'Salad',
          amount: 100,
          unit: 'g'
        }),
        new FormControl({
          name: 'Onion',
          amount: 1,
          unit: 'whole'
        }),
      ]);
  
        // create a new recipe form using the form array
        const recipeForm = new FormGroup({
          ingredients: formArray,
        });
  
        component.recipeForm = recipeForm;
      
      const ingredients : IIngredient[] = component.getIngredients();
  
  
      // assert that the instructions array was created correctly
      expect(ingredients[0]).toEqual({ name: "Mango", amount: 100, unit: "g" });
      expect(ingredients[1]).toEqual({ name: "Potato", amount: 1, unit: "kg" })
      expect(ingredients[2]).toEqual({ name: "Banana", amount: 300, unit: "g" })
      expect(ingredients[3]).toEqual({ name: "Salad", amount: 100, unit: "g" })
      expect(ingredients[4]).toEqual({ name: "Onion", amount: 1, unit: "whole" })
    
    })

  it('should remove the ingredient at the specified index', () => {

    component.recipeForm = formBuilder.group({
      ingredients: formBuilder.array([
        formBuilder.group({
          name: ['Ingredient 1', Validators.required],
          amount: [1, Validators.required],
          scale: ['kg', Validators.required],
        }),
        formBuilder.group({
          name: ['Ingredient 2', Validators.required],
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

  describe("Testing placeholder texts for Amount", () => {

    let component: EditRecipeComponent;
    let fixture: ComponentFixture<EditRecipeComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ EditRecipeComponent ],
        providers: [FormBuilder],
        imports: [
          ReactiveFormsModule,
          HttpClientModule,
          NavigationBarModule,
          RouterTestingModule,
          NgxsModule.forRoot([MockCreateState])
        ]
      });
      fixture = TestBed.createComponent(EditRecipeComponent);
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

    let component: EditRecipeComponent;
    let fixture: ComponentFixture<EditRecipeComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ EditRecipeComponent ],
        providers: [FormBuilder],
        imports: [
          ReactiveFormsModule,
          HttpClientModule,
          NavigationBarModule,
          RouterTestingModule,
          NgxsModule.forRoot([MockCreateState])
        ]
      });
      fixture = TestBed.createComponent(EditRecipeComponent);
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

    let component: EditRecipeComponent;
    let fixture: ComponentFixture<EditRecipeComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ EditRecipeComponent ],
        providers: [FormBuilder],
        imports: [
          ReactiveFormsModule,
          HttpClientModule,
          NavigationBarModule,
          RouterTestingModule,
          NgxsModule.forRoot([MockCreateState])
        ]
      });
      fixture = TestBed.createComponent(EditRecipeComponent);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      reader.addEventListener("load", function(event) {
        expect(component.imageUrl).toBe(file.name);
        expect(component.imageUrl).not.toBe(existingImage);
      });
    });
   
  });

  describe('isFormValid()', () =>{ 

    let component: EditRecipeComponent;
    let fixture: ComponentFixture<EditRecipeComponent>;
    let store: Store;
    let dispatchSpy: jest.SpyInstance;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ EditRecipeComponent ],
        providers: [FormBuilder],
        imports: [
          ReactiveFormsModule,
          HttpClientModule,
          NavigationBarModule,
          RouterTestingModule,
          NgxsModule.forRoot([MockCreateState])
        ]
      });
      fixture = TestBed.createComponent(EditRecipeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      store = TestBed.inject(Store);
      dispatchSpy = jest.spyOn(store, 'dispatch');
    });

    it('At least one ingredient should present', () => {

      const formBuilder: FormBuilder = new FormBuilder();

      const formGroup: FormGroup = formBuilder.group({
        name: ['Name', Validators.required],
        description: ['Description', Validators.required],
        servings: [1, Validators.required],
        preparationTime: [1, Validators.required],
        ingredients: new FormArray([])
      })

      component.recipeForm = formGroup;
      component.isFormValid();

      expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('No Ingredients'));

    })

    it('At least one instruction step should present', () => {

      const formBuilder: FormBuilder = new FormBuilder();
      const ingredientsFormArray = new FormArray([
        new FormControl({
          name: 'Mango',
          amount: 100,
          unit: 'g'
        })])

      const formGroup: FormGroup = formBuilder.group({
        name: ['Name', Validators.required],
        description: ['Description', Validators.required],
        servings: [1, Validators.required],
        preparationTime: [1, Validators.required],
        ingredients: ingredientsFormArray,
        instructions: new FormArray([])
      })

      component.recipeForm = formGroup;
      component.isFormValid();

      expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('No Instructions'));

    })

    it('Tags if empty', () => {
      const formBuilder: FormBuilder = new FormBuilder();
      const ingredientsFormArray = new FormArray([
        new FormControl({
          name: 'Mango',
          amount: 100,
          unit: 'g'
        })])
      const instructionsFormArray = new FormArray([
        new FormControl('Step 1')
      ]);

      const formGroup: FormGroup = formBuilder.group({
        name: ['Name', Validators.required],
        description: ['Description', Validators.required],
        servings: [1, Validators.required],
        preparationTime: [1, Validators.required],
        ingredients: ingredientsFormArray,
        instructions: instructionsFormArray
      })

      component.recipeForm = formGroup;
      component.isFormValid();
      expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('No Tags'));
      });


      it('Meal Selection', () => {
        const formBuilder: FormBuilder = new FormBuilder();
        const ingredientsFormArray = new FormArray([
          new FormControl({
            name: 'Mango',
            amount: 100,
            unit: 'g'
          })])
        const instructionsFormArray = new FormArray([
          new FormControl('Step 1')
        ]);
  
        const formGroup: FormGroup = formBuilder.group({
          ingredients: ingredientsFormArray,
          instructions: instructionsFormArray
        })

        component.tags = ['Asian']
  
        component.recipeForm = formGroup;
        component.isFormValid();
        expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('Please select a meal'));
      
      })


      it('Truthy Profile', () => {
        const formBuilder: FormBuilder = new FormBuilder();
        const ingredientsFormArray = new FormArray([
          new FormControl({
            name: 'Mango',
            amount: 100,
            unit: 'g'
          })])
        const instructionsFormArray = new FormArray([
          new FormControl('Step 1')
        ]);
  
        const formGroup: FormGroup = formBuilder.group({
          name: ['Name', Validators.required],
          description: ['Description', Validators.required],
          servings: [1, Validators.required],
          preparationTime: [1, Validators.required],
          ingredients: ingredientsFormArray,
          instructions: instructionsFormArray
        })
  
        component.recipeForm = formGroup;
        component.tags = ['Asian'];
        component.selectedMeal = 'Breakfast';
        component.isFormValid();
        expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('Please login to create a recipe'));
      })


      it('Form fields validation',  () => {
        const formBuilder: FormBuilder = new FormBuilder();
        const ingredientsFormArray = new FormArray([
          new FormControl({
            name: 'Mango',
            amount: 100,
            unit: 'g'
          })])
        const instructionsFormArray = new FormArray([
          new FormControl('Step 1')
        ]);
  
        const formGroup: FormGroup = formBuilder.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          servings: [1, Validators.required],
          preparationTime: [1, Validators.required],
          ingredients: ingredientsFormArray,
          instructions: instructionsFormArray,
          tags: formBuilder.array([]),
        })

        const testProfile: IProfile = {
          displayName: "John Doe",
          username: "jdoe",
          email: "jdoe@gmail.com",
          savedRecipes: [],
          ingredients: [],
          profilePic: "image-url",
          createdRecipes: [],
          currMealPlan: null,
        };
  
        component.recipeForm = formGroup;
        component.selectedMeal = 'Breakfast';
        component.tags = ['Asian'];
        component.profile = testProfile;
        component.isFormValid();
        expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('Incomplete Form. Please fill out every field.'))
      })
      

    it('The form should test valid', () => {
      const formBuilder: FormBuilder = new FormBuilder();

      const stepsFormArray = new FormArray([
        new FormControl('Step 1'),
        new FormControl('Step 2'),
        new FormControl('Step 3'),
      ]);

      const ingredientsFormArray = new FormArray([
        new FormControl({
          name: 'Mango',
          amount: 100,
          unit: 'g'
        }),
        new FormControl({
          name: 'Potato',
          amount: 1,
          unit: 'kg'
        }),
        new FormControl({
          name: 'Banana',
          amount: 300,
          unit: 'g'
        }),
        new FormControl({
          name: 'Salad',
          amount: 100,
          unit: 'g'
        }),
        new FormControl({
          name: 'Onion',
          amount: 1,
          unit: 'whole'
        }),
      ]);

      const testProfile: IProfile = {
        displayName: "John Doe",
        username: "jdoe",
        email: "jdoe@gmail.com",
        savedRecipes: [],
        ingredients: [],
        profilePic: "image-url",
        createdRecipes: [],
        currMealPlan: null,
      };

      const formGroup: FormGroup = formBuilder.group({
        name: ['Name', Validators.required],
        description: ['Description', Validators.required],
        servings: [1, Validators.required],
        preparationTime: [1, Validators.required],
        ingredients: ingredientsFormArray,
        instructions: stepsFormArray,
        tags: formBuilder.array([]),
      });

      component.selectedMeal = 'Breakfast';
      component.tags = ['Asian'];
      component.profile = testProfile

      component.recipeForm = formGroup;
      expect(component.isFormValid()).toBe(true);
    })
  
  })

  describe("Testing Recipe Update ", () => {
    let component: EditRecipeComponent;
    let fb: FormBuilder;
    let fixture: ComponentFixture<EditRecipeComponent>;
    let store: Store;
    let dispatchSpy: jest.SpyInstance;

    const testProfile: IProfile = {
      displayName: "John Doe",
      username: "jdoe",
      email: "jdoe@gmail.com",
      savedRecipes: [],
      ingredients: [],
      profilePic: "image-url",
      createdRecipes: [],
      currMealPlan: null,
    };
  
    @State({ 
      name: 'profile', 
      defaults: {
        profile: testProfile
      } 
    }) 
    @Injectable()
    class MockProfileState {}


    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ EditRecipeComponent ],
        providers: [FormBuilder, Store],
        imports: [
          ReactiveFormsModule,
          HttpClientModule,
          NavigationBarModule,
          RouterTestingModule,
          NgxsModule.forRoot([MockCreateState, MockProfileState])
        ]
      });
      fixture = TestBed.createComponent(EditRecipeComponent);
      component = fixture.componentInstance;
      fb = TestBed.inject(FormBuilder);
      store = TestBed.inject(Store);
      dispatchSpy = jest.spyOn(store, 'dispatch');
    });



    it('Should dispatch Update Recipe Action', async () => {

      jest.spyOn(component, 'isFormValid');

    

      // Mock the recipe data
      const recipe: IRecipe = {
        name: "Mock Recipe",
        recipeImage: "https://example.com/image.jpg",
        description: "Amazing meal for a family",
        meal: "Dinner",
        creator: '',
        ingredients: [ {name: 'ingredient1' , amount : 5, unit : 'L'},
        {name: 'ingredient2' , amount : 3, unit : 'g'}
        ],
        steps: [
            "Mock instructions",
        ],
        difficulty: "Easy",
        prepTime: 30,
        servings: 4,
        tags: ["mock", "recipe"],
      };
    
      component.imageUrl = recipe.recipeImage
      // Mock the values and controls used in createRecipe
      component.recipeForm = fb.group({
        name: fb.control(recipe.name),
        description: fb.control(recipe.description),
        difficulty: fb.control(recipe.difficulty),
        servings: fb.control(recipe.servings),
        preparationTime: fb.control(recipe.prepTime),
        ingredients: fb.array(recipe.ingredients.map(ingredient => fb.control(ingredient))),
        instructions: fb.array(recipe.steps.map(instruction => fb.control(instruction))),
        dietaryPlans: fb.array((recipe.tags || []).map(tag => fb.control(tag))),
      });

      component.tags = recipe.tags;
      component.selectedMeal = recipe.meal;
      component.profile = testProfile;
    
      // Call the createRecipe method
      component.updateRecipe();
      expect(dispatchSpy).toHaveBeenCalledWith(new UpdateRecipe(recipe));

      expect(component.recipeForm.valid).toBe(true);
      expect(component.isFormValid()).toBe(true)
      expect(component.isFormValid).toHaveBeenCalled();


    });

    it('Should not create recipe if form is invalid', () => {

      jest.spyOn(component, 'isFormValid');
    

      const profileDataSubject = new BehaviorSubject<IProfile | undefined>(undefined);



      // Mock the recipe data
      const recipe: IRecipe = {
        name: "Mock Recipe",
        recipeImage: "https://example.com/image.jpg",
        description: "Amazing meal for a family",
        meal: "Dinner",
        creator: profileDataSubject.value?.username ?? '',
        ingredients: [],
        steps: [],
        difficulty: "Easy",
        prepTime: 30,
        servings: 4,
        tags: ["mock", "recipe"],
      };
      
      component.imageUrl = recipe.recipeImage
      // Mock the values and controls used in createRecipe
      component.recipeForm = fb.group({
        name: fb.control(recipe.name),
        description: fb.control(recipe.description),
        difficulty: fb.control(recipe.difficulty),
        servings: fb.control(recipe.servings),
        preparationTime: fb.control(recipe.prepTime),
        ingredients: fb.array(recipe.ingredients.map(ingredient => fb.control(ingredient))),
        instructions: fb.array(recipe.steps.map(instruction => fb.control(instruction))),
        dietaryPlans: fb.array((recipe.tags || []).map(tag => fb.control(tag))),
      });

      component.tags = recipe.tags;
      component.selectedMeal = recipe.meal;
    
      // Call the createRecipe method
      component.updateRecipe();
      expect(component.isFormValid).toHaveBeenCalled();
      expect(component.isFormValid()).toBe(false)
      expect(dispatchSpy).not.toHaveBeenCalledWith(new UpdateRecipe(recipe));
    })



 
  
  })
