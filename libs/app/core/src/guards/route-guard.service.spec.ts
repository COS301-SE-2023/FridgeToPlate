import { TestBed } from '@angular/core/testing';
import { RouteGuardService } from './route-guard.service';
import { Router } from '@angular/router';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { NgxsModule, State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IRecommend } from '@fridge-to-plate/app/recommend/utils';
import { IPreferences } from '@fridge-to-plate/app/preferences/utils';

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

  const testRecommendRequest: IRecommend = {
    username: 'joe',
    ingredients: [
      {
        name: 'Tomato',
        amount: 2,
        unit: 'kg',
      },
      {
        name: 'Onion',
        amount: 1,
        unit: 'kg',
      },
      {
        name: 'Rice',
        amount: 3,
        unit: 'kg',
      },
      {
        name: 'Chicken',
        amount: 2,
        unit: 'kg',
      },
      {
        name: 'Rump Steak',
        amount: 3,
        unit: 'kg',
      },
      {
        name: 'Rice',
        amount: 3,
        unit: 'kg',
      },
      {
        name: 'Flour',
        amount: 2,
        unit: 'kg',
      },
      {
        name: 'Egg',
        amount: 500,
        unit: 'g',
      },
      {
        name: 'Peppers',
        amount: 2,
        unit: 'kg',
      },
      {
        name: 'Sunflower Oil',
        amount: 2,
        unit: 'l',
      },
      {
        name: 'Milk',
        amount: 4,
        unit: 'l',
      },
      {
        name: 'Soy Sauce',
        amount: 500,
        unit: 'ml',
      },
      {
        name: 'Beef Stock',
        amount: 200,
        unit: 'ml',
      },
      {
        name: 'Pasta',
        amount: 2,
        unit: 'kg',
      },
      {
        name: 'Salt',
        amount: 200,
        unit: 'g',
      },
      {
        name: 'Salmon',
        amount: 1,
        unit: 'kg',
      },
    ],
    recipePreferences: {
      keywords: [],
      difficulty: 'Easy',
      rating: '',
      meal: '',
      servings: '',
      prepTime: '30 - 60 Minutes',
    },
  };

  const testPreference : IPreferences = {
    username: "jdoe",
    darkMode: false,
    recommendNotif: false,
    viewsNotif: false,
    reviewNotif: false,
}

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

    @State({
      name: 'recommend',
      defaults: {
        recommendRequest: null,
        recipes: [],
      },
    })
    @Injectable()
    class MockRecommendState {}

    @State({
      name: 'preferences',
      defaults: {
          preferences: null
      }
    })
    @Injectable()
    class MockPreferenceState {}

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MockProfileState, MockRecommendState, MockPreferenceState])]
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

    @State({
      name: 'recommend',
      defaults: {
        recommendRequest: testRecommendRequest,
        recipes: [],
      },
    })
    @Injectable()
    class MockRecommendState {}

    @State({
      name: 'preferences',
      defaults: {
          preferences: testPreference
      }
    })
    @Injectable()
    class MockPreferenceState {}

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MockProfileState, MockRecommendState, MockPreferenceState])]
    });

    service = TestBed.inject(RouteGuardService);
    router = TestBed.inject(Router);

    expect(service).toBeTruthy();
    expect(service.canActivate()).toBe(true);
  });

});
