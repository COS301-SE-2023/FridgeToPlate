import { TestBed } from '@angular/core/testing';

import { RouteGuardService } from './route-guard.service';
import { Router } from '@angular/router';

describe('RouteGuardService', () => {
  let service: RouteGuardService;
  let navigateSpy: jest.SpyInstance;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGuardService);
    router = TestBed.inject(Router);
    navigateSpy = jest.spyOn(router, 'createUrlTree');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should remain on same route (No Login)', () => {
  //   expect(service).toBeTruthy();
  //   service.canActivate();
  //   expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  // });

  it('should navigate to all routes (Login provided)', () => {
    expect(service).toBeTruthy();
    expect(service.canActivate()).toBe(true);
  });

});
