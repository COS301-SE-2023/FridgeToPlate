import { TestBed } from '@angular/core/testing';

import { RecipeDetailApiService } from './recipe-detail-api.service';

describe('RecipeDetailApiService', () => {
  let service: RecipeDetailApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeDetailApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
