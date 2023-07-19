import { ingredientsArray } from './explore.mock';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';

const baseUrl = 'http://localhost:5000/';

@Injectable({
  providedIn: 'root',
})
export class ExploreAPI {
  constructor(private httpClient: HttpClient) {}

  retrieveSearch(type: number){
    return;
  }

}
