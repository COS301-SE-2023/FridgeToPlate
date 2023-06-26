import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'http://localhost:5000/recipes';

  constructor(private http: HttpClient) { }

  getRecipeById(id: string): Observable<IRecipe> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IRecipe>(url);
  }
}
