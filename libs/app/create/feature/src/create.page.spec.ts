import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CreatePagComponent } from './create.page';
import { IonicModule } from '@ionic/angular';
import {HttpClientModule } from '@angular/common/http';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature'
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { BehaviorSubject, take } from "rxjs";
import { Injectable } from '@angular/core';
import { NgxsModule, State, Store } from '@ngxs/store';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { CreateRecipe } from '@fridge-to-plate/app/recipe/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';


@State({
  name: 'create',
  defaults: {
    recipe: null,
  }
})

@Injectable()
class MockCreateState {}



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
        NavigationBarModule,
        NgxsModule.forRoot([MockCreateState])
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

    createPage.recipeForm = recipeForm;

    const instructions = createPage.getInstructions();

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

    createPage.recipeForm = recipeForm;

    const initialLength = createPage.instructionControls.length;
    createPage.removeInstruction(0);
    const newLength = createPage.instructionControls.length;
    expect(newLength).toBe(initialLength - 1);
    expect(createPage.getInstructions()).toEqual(['Step 2', 'Step 3'])
  }
  );

});


describe('Testing Tags', () => {
  let component: CreatePagComponent;
  let fb: FormBuilder;
  let fixture: ComponentFixture<CreatePagComponent>;
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePagComponent ],
      providers: [FormBuilder],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        NavigationBarModule,
        NgxsModule.forRoot([MockCreateState])
      ]
    });

    fixture = TestBed.createComponent(CreatePagComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    component.recipeForm = fb.group({
      tag: ['', Validators.required],
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
    expect(component.difficulty).not.toBe(difficulty1);

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

  it('should not add a duplicate tags', () => {
    // Arrange
    component.recipeForm.get('tag')?.setValue('Tag 1');
    const testTags = ['Tag 1'];
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
    component.recipeForm.get('tag')?.setValue('Tag 4');
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


describe('Ingredients storing, deleting and returning', () => {
  let component: CreatePagComponent;
  let fixture: ComponentFixture<CreatePagComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePagComponent ],
      providers: [FormBuilder],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        NavigationBarModule,
        NgxsModule.forRoot([MockCreateState])
      ]
    });
    fixture = TestBed.createComponent(CreatePagComponent);
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

    let component: CreatePagComponent;
    let fixture: ComponentFixture<CreatePagComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ CreatePagComponent ],
        providers: [FormBuilder],
        imports: [
          ReactiveFormsModule,
          HttpClientModule,
          NavigationBarModule,
          NgxsModule.forRoot([MockCreateState])
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
          NavigationBarModule,
          NgxsModule.forRoot([MockCreateState])
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
    let store: Store;
    let dispatchSpy: jest.SpyInstance;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ CreatePagComponent ],
        providers: [FormBuilder],
        imports: [
          ReactiveFormsModule,
          HttpClientModule,
          NavigationBarModule,
          NgxsModule.forRoot([MockCreateState])
        ]
      });
      fixture = TestBed.createComponent(CreatePagComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      store = TestBed.inject(Store);
      dispatchSpy = jest.spyOn(store, 'dispatch');
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

    it('should show error if file size is larger than 300KB', () => {
      // Arrange
      const file = new File(['sample content'], 'sample.jpg', { type: 'image/jpeg' });
      const fileSizeSpy = jest.spyOn(File.prototype, 'size', 'get').mockReturnValue(400000); // Mock file size exceeding limit
      const event = { target: { files: [file] } };
        
      // Act
      component.onFileChanged(event);
    
      // Assert
      expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('Can Not Upload Image Larger Than 300KB')); // You can refine this assertion if you know the exact ShowError action structure
    });

  });

  describe('isFormValid()', () =>{

    let component: CreatePagComponent;
    let fixture: ComponentFixture<CreatePagComponent>;
    let store: Store;
    let dispatchSpy: jest.SpyInstance;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ CreatePagComponent ],
        providers: [FormBuilder],
        imports: [
          ReactiveFormsModule,
          HttpClientModule,
          NavigationBarModule,
          NgxsModule.forRoot([MockCreateState])
        ]
      });
      fixture = TestBed.createComponent(CreatePagComponent);
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

  describe("Testing Recipe Creation", () => {
    let component: CreatePagComponent;
    let fb: FormBuilder;
    let fixture: ComponentFixture<CreatePagComponent>;
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
        declarations: [ CreatePagComponent ],
        providers: [FormBuilder, Store],
        imports: [
          ReactiveFormsModule,
          HttpClientModule,
          NavigationBarModule,
          NgxsModule.forRoot([MockCreateState, MockProfileState])
        ]
      });
      fixture = TestBed.createComponent(CreatePagComponent);
      component = fixture.componentInstance;
      fb = TestBed.inject(FormBuilder);
      store = TestBed.inject(Store);
      dispatchSpy = jest.spyOn(store, 'dispatch');
    });


    it("Should render the user's username", () => {
      component.profile$.subscribe((profile: IProfile) => {
        expect(component.profile.username).toBe(profile.username);
      })
    })

    it('Should dispatch CreateRecipe Action', async () => {

      jest.spyOn(component, 'isFormValid');

      const profileDataSubject = new BehaviorSubject<IProfile | undefined>(undefined);

      component.profile$.pipe(take(1)).subscribe((profile: IProfile) => {
        component.profile = profile;
        profileDataSubject.next(profile); // Update the BehaviorSubject with the profileData
      });

      // Mock the recipe data
      const recipe: IRecipe = {
        name: "Mock Recipe",
        recipeImage: "https://example.com/image.jpg",
        description: "Amazing meal for a family",
        meal: "Dinner",
        creator: profileDataSubject.value?.username ?? '',
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
        rating: null
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
      component.createRecipe();
      expect(dispatchSpy).toHaveBeenCalledWith(new CreateRecipe(recipe));

      expect(component.recipeForm.valid).toBe(true);
      expect(component.isFormValid()).toBe(true)
      expect(component.isFormValid).toHaveBeenCalled();
      expect(component.profile.username).toBe(profileDataSubject.value?.username ?? '');


    });

    it('Should not create recipe if form is invalid', () => {

      jest.spyOn(component, 'isFormValid');


      const profileDataSubject = new BehaviorSubject<IProfile | undefined>(undefined);

      component.profile$.pipe(take(1)).subscribe((profile: IProfile) => {
        component.profile = profile;
        profileDataSubject.next(profile); // Update the BehaviorSubject with the profileData
      });

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
        rating: 2
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
      component.createRecipe();
      expect(component.isFormValid).toHaveBeenCalled();
      expect(component.isFormValid()).toBe(false)
      expect(dispatchSpy).not.toHaveBeenCalledWith(new CreateRecipe(recipe));
    })



  })
