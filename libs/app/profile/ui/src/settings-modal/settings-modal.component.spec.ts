import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsModalComponent } from './settings-modal.component';
import { IPreferences } from '@fridge-to-plate/app/preferences/utils';
import { NgxsModule, State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Logout } from '@fridge-to-plate/app/auth/utils';

describe('EditModalComponent', () => {
  let component: SettingsModalComponent;
  let fixture: ComponentFixture<SettingsModalComponent>;
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

  const testPreferences: IPreferences = {
    username: "testuser",
    darkMode: false,
    recommendNotif: false,
    reviewNotif: false,
    viewsNotif: false,
  };

  @State({ 
    name: 'preferences', 
    defaults: {
      profile: testPreferences
    } 
  }) 
  @Injectable()
  class MockProfileState {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MockProfileState])],
      declarations: [SettingsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save should call save func', () => {
    
    const updateTestPreferences: IPreferences = {
      username: "testuser",
      darkMode: false,
      recommendNotif: true,
      reviewNotif: false,
      viewsNotif: false,
    };

    component.editablePreferences = updateTestPreferences;
    component.save();

    component.preferences$.pipe(take(1)).subscribe((preferences: IPreferences) => {
      expect(preferences).toEqual(component.editablePreferences);
    })
  }); 

  it('save should call close func', () => {
    jest.spyOn(component.closeFunc, 'emit');
    component.close()
    expect(component.closeFunc.emit).toBeCalled();
  }); 

  it('logout should call logout action', () => {
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    component.logout();
    expect(dispatchSpy).toBeCalledWith(new Logout());
  });

  it('should set displayChangePassword to "block" when calling openPassword', () => {
    component.openPassword();

    expect(component.displayChangePassword).toBe("block");
  });

  it('should set displayChangePassword to "none" when calling closeChangePassword', () => {
    component.closeChangePassword();

    expect(component.displayChangePassword).toBe("none");
  });

});
