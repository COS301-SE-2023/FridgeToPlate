import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { IReview } from '@fridge-to-plate/app/review/utils';

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
  UpdateRecipe(recipe: IRecipe): Observable<IRecipe> {
    const url = this.baseUrl + '/' + recipe.recipeId;
    return this.http.put<IRecipe>(url, recipe);
  }

  deleteRecipe(id: string): Observable<string> {
    const url = this.baseUrl + '/' + id;
    return this.http.delete<string>(url);
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
    const url = environment.API_URL + '/reviews/' + recipeId + reviewId;
    return this.http.delete<string>(url);
  }
}
