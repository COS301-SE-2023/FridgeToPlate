import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsModalComponent } from './settings-modal.component';
import { IProfile } from '@fridge-to-plate/app/profile/utils';

describe('EditModalComponent', () => {
  let component: SettingsModalComponent;
  let fixture: ComponentFixture<SettingsModalComponent>;
  const testProfile: IProfile = {
    profileId: "1",
    displayName: "John Doe",
    profilePic: "image-url",
    username: "jdoe",
    email: "jdoe@gmail.com",
    ingredients: [],
    currMealPlan:  [],
    preferences: [],
    savedRecipes: [],
    createdRecipes: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsModalComponent);
    component = fixture.componentInstance;
    component.editableProfile = testProfile;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save should call save func', () => {
    jest.spyOn(component.saveFunc, 'emit');
    component.save()
    expect(component.saveFunc.emit).toBeCalled();
  }); 

  it('save should call close func', () => {
    jest.spyOn(component.closeFunc, 'emit');
    component.close()
    expect(component.closeFunc.emit).toBeCalled();
  }); 
});
