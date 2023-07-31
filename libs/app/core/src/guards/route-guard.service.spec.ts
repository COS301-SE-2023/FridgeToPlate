import { TestBed } from '@angular/core/testing';
import { RouteGuardService } from './route-guard.service';
import { Router } from '@angular/router';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { NgxsModule, State } from '@ngxs/store';
import { Injectable } from '@angular/core';

describe('RouteGuardService', () => {

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

  let service: RouteGuardService;
  let navigateSpy: jest.SpyInstance;
  let router: Router;

  it('should be created', () => {
    
    @State({
      name: 'profile',
      defaults: {
        profile: null
      }
    })
    @Injectable()
    class MockProfileState {}

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MockProfileState])]
    });

    service = TestBed.inject(RouteGuardService);

    expect(service).toBeTruthy();
  });

  it('should remain be routed to login (No Login)', () => {
    
    @State({
      name: 'profile',
      defaults: {
        profile: null
      }
    })
    @Injectable()
    class MockProfileState {}

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MockProfileState])]
    });

    service = TestBed.inject(RouteGuardService);
    router = TestBed.inject(Router);

    navigateSpy = jest.spyOn(router, 'parseUrl');

    expect(service).toBeTruthy();
    service.canActivate();
    expect(navigateSpy).toHaveBeenCalledWith('unauthorised');
  });

  it('should navigate to all routes (Login provided)', () => {
    
    @State({
      name: 'profile',
      defaults: {
        profile: testProfile
      }
    })
    @Injectable()
    class MockProfileState {}

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MockProfileState])]
    });

    service = TestBed.inject(RouteGuardService);
    router = TestBed.inject(Router);

    expect(service).toBeTruthy();
    expect(service.canActivate()).toBe(true);
  });

});
