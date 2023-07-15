import { TestBed } from '@angular/core/testing';
import { RouteGuardService } from './route-guard.service';
import { Router } from '@angular/router';
import { AuthService } from '@fridge-to-plate/app/auth/data-access';

describe('RouteGuardService', () => {

  let service: RouteGuardService;
  let navigateSpy: jest.SpyInstance;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGuardService);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remain be routed to login (No Login)', () => {
    jest.spyOn(authService, 'isUserLoggedIn').mockReturnValue(false);

    navigateSpy = jest.spyOn(router, 'parseUrl');

    expect(service).toBeTruthy();
    service.canActivate();
    expect(navigateSpy).toHaveBeenCalledWith('login');
  });

  it('should navigate to all routes (Login provided)', () => {
    jest.spyOn(authService, 'isUserLoggedIn').mockReturnValue(true);
    expect(service).toBeTruthy();
    expect(service.canActivate()).toBe(true);
  });

});
