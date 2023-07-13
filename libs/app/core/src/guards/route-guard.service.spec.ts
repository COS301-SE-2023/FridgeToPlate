import { TestBed } from '@angular/core/testing';
import { RouteGuardService } from './route-guard.service';
import { Router } from '@angular/router';
import { AuthService } from 'libs/app/auth/data-access/src/auth.api';

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
    navigateSpy = jest.spyOn(router, 'parseUrl');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remain on same route (No Login)', () => {
    jest.spyOn(authService, 'isUserLoggedIn').mockReturnValue(false);
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
