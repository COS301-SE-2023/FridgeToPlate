import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsModalComponent } from './settings-modal.component';
import { IPreferences } from '@fridge-to-plate/app/preferences/utils';
import { NgxsModule, State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

describe('EditModalComponent', () => {
  let component: SettingsModalComponent;
  let fixture: ComponentFixture<SettingsModalComponent>;
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
});
