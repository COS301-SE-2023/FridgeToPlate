import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';

@Injectable({
  providedIn: 'root'
})
export class RecipeAPI {
  private baseUrl = 'http://localhost:5000/recipes';

  constructor( private http: HttpClient){ }

    UpdateRecipe(recipe: IRecipe): Observable<IRecipe> {
        const url = this.baseUrl + '/' + recipe.recipeId;
        return this.http.put<IRecipe>(url, recipe);
    }

    deleteRecipe(id: string): Observable<string> {
        const url = this.baseUrl + '/' + id;
        return this.http.delete<string>(url);
    }
}
