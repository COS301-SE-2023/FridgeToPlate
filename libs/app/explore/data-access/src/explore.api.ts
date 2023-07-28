import { ingredientsArray } from './explore.mock';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Store } from '@ngxs/store';
import { ShowError } from '@fridge-to-plate/app/error/utils';



@Injectable({
  providedIn: 'root',
})
export class ExploreAPI {
  
  constructor(private http: HttpClient, private store: Store) {}

  private baseUrl = "http://localhost:5000/explore";

  getRecipes(recipename: string) {
    const url = `${this.baseUrl}/${recipename}`;

    return this.http.get<IRecipe | null>(url);
  }

  getProfile(username: string) {
    const url = `${this.baseUrl}/profiles/${username}`;

    return this.http.get<IProfile | null>(url);
  }

  searchCategory(category : string): Observable<IRecipe[] | null>  {

    const url = `${this.baseUrl}/${category}`;
    return this.http.get<IRecipe[] | null>(url);
  }

}
