import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { IReview } from '@fridge-to-plate/app/review/utils';
import  {IDeleteRecipeResponse } from "@fridge-to-plate/app/recipe/utils";

@Injectable({
  providedIn: 'root',
})
export class RecipeAPI {
  private baseUrl = environment.API_URL + '/recipes';

  constructor(private http: HttpClient) {}

  createNewRecipe(recipe: IRecipe): Observable<IRecipe> {
    const url = this.baseUrl + '/create';
    return this.http.post<IRecipe>(url, recipe);
  }
  
  increaseViews(recipeId: string): Observable<IRecipe> {
    const url = this.baseUrl + '/increaseViews/' + recipeId;
    console.log(recipeId);
    return this.http.put<IRecipe>(url, null);
  }

  deleteRecipe(id: string): Observable<string> {
    const url = this.baseUrl + '/' + id;
    return this.http.delete<IDeleteRecipeResponse>(url).pipe( switchMap( x => of(x.response)));
  }

  getRecipeById(id: string): Observable<IRecipe> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IRecipe>(url);
  }

  updateRecipe(recipe: IRecipe) {
    const url = `${this.baseUrl}/${recipe.recipeId}`;
    return this.http.put<IRecipe>(url, recipe);
  }

  createNewReview(review: IReview): Observable<IReview> {
    const url = environment.API_URL + '/reviews/create';
    return this.http.post<IReview>(url, review);
  }

  deleteReview(recipeId: string, reviewId:string): Observable<string> {
    const url = environment.API_URL + '/reviews/' + recipeId + '/' + reviewId;
    return this.http.delete<string>(url);
  }
}
