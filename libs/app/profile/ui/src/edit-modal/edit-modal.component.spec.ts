import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditModalComponent } from './edit-modal.component';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import {FormsModule} from "@angular/forms";
import { NgxsModule, State, Store } from '@ngxs/store';
import { ShowSuccess } from '@fridge-to-plate/app/info/utils';
import { Injectable } from '@angular/core';
import { ShowError } from '@fridge-to-plate/app/error/utils';

@State({
  name: 'editableProfile',
  defaults: {
    profile: null,
  }
})

@Injectable()
class MockEditState {}

describe('EditModalComponent', () => {
  let component: EditModalComponent;
  let fixture: ComponentFixture<EditModalComponent>;
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

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
      imports: [FormsModule,
        NgxsModule.forRoot([MockEditState])
      ],
      declarations: [EditModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditModalComponent);
    component = fixture.componentInstance;
    component.editableProfile = testProfile;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save should call save and close func', () => {
    component.profileImage = 'data:image/png;base64,exampleImageData';
    const expectedProfilePic = 'data:image/png;base64,exampleImageData';

    jest.spyOn(component.saveFunc, 'emit');
    jest.spyOn(component.closeFunc, 'emit');
    component.save()
    expect(component.saveFunc.emit).toBeCalled();
    expect(component.closeFunc.emit).toBeCalled();
    expect(component.validateEmail()).toBe(true);

    expect(component.editableProfile.profilePic).toEqual(expectedProfilePic);
  });

  it('save should call close func', () => {
    jest.spyOn(component.closeFunc, 'emit');
    component.close()
    expect(component.closeFunc.emit).toBeCalled();
  });

  it('should set profileImage and dispatch ShowSuccess action when a file is selected', () => {
    const file = new File(['file contents'], 'example.png', { type: 'image/png' });

    // Create a mock event object
    const event = { target: { files: [file] } };
    const existingImage = component.profileImage;


    const readAsDataURLStringSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL');

    // Trigger the method
    component.onProfileChanged(event);


    expect(readAsDataURLStringSpy).toHaveBeenCalledWith(file);

    const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      reader.addEventListener("load", function(event) {
      // Assert that the ShowSuccess action is dispatched
      expect(dispatchSpy).toHaveBeenCalledWith(new ShowSuccess('Image Successfully Chosen'));
      // Assert that profileImage is set to the expected value
      expect(component.profileImage).toBe(file.name);
      expect(component.profileImage).not.toBe(existingImage);
      });


  });

  it('should dispatch ShowError action when an invalid email is entered', () => {
    component.editableProfile.email = 'invalid email';
    component.save();
    expect(dispatchSpy).toHaveBeenCalledWith(new ShowError('Invalid Email'));
  });

  it('should not dispatch ShowError action when a valid email is entered', () => {
    component.editableProfile.email = 'user12@example.com'
    component.save();
    expect(dispatchSpy).not.toHaveBeenCalledWith(new ShowError('Invalid Email'));
  });

  it("validateEmail() should return true if email is valid", () => {
    component.editableProfile.email = 'user12@example.com';
    expect(component.validateEmail()).toBe(true);
  })

  it("validateEmail() should return false if email is invalid", () => {
    component.editableProfile.email = 'invalid email';
    expect(component.validateEmail()).toBe(false);
  })
});
