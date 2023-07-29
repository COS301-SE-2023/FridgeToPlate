import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditModalComponent } from './edit-modal.component';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import {FormsModule} from "@angular/forms";

describe('EditModalComponent', () => {
  let component: EditModalComponent;
  let fixture: ComponentFixture<EditModalComponent>;
  const testProfile: IProfile = {
    displayName: "John Doe",
    profilePic: "image-url",
    username: "jdoe",
    email: "jdoe@gmail.com",
    ingredients: [],
    currMealPlan: null,
    savedRecipes: [],
    createdRecipes: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
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
