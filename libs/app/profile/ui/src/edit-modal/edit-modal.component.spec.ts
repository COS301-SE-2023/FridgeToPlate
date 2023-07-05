import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditModalComponent } from './edit-modal.component';
import { IProfile } from '@fridge-to-plate/app/profile/utils';

describe('EditModalComponent', () => {
  let component: EditModalComponent;
  let fixture: ComponentFixture<EditModalComponent>;
  const testProfile: IProfile = {
    profileId: "1",
    displayName: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
    saved_recipes: [
        {
            name: "Recipe",
            recipeImage: "https://source.unsplash.com/750x750/?food",
            ingredients: [],
            instructions: [],
            difficulty: "Easy",
        }
    ],
    ingredients: [],
    profilePic: "",
    created_recipes: [],
    preferences: {
        darkMode: false,
        recommendNotifi: true,
        reviewNotifi: false,
        viewsNotifi: true,
    },
    mealPlan: {
        breakfast: null,
        lunch: null,
        dinner: {
            name: "Recipe",
            recipeImage: "https://source.unsplash.com/750x750/?food",
            ingredients: [],
            instructions: [],
            difficulty: "Easy",
        },
        snack: null,
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditModalComponent);
    component = fixture.componentInstance;
    component.editableProfile = testProfile;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save should call save and close func', () => {
    jest.spyOn(component.saveFunc, 'emit');
    jest.spyOn(component.closeFunc, 'emit');
    component.save()
    expect(component.saveFunc.emit).toBeCalled();
    expect(component.closeFunc.emit).toBeCalled();
  }); 

  it('save should call close func', () => {
    jest.spyOn(component.closeFunc, 'emit');
    component.close()
    expect(component.closeFunc.emit).toBeCalled();
  }); 
});
