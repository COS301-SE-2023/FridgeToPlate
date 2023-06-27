import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Observable } from 'rxjs';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';

@Injectable(
   { 
    providedIn: 'root',
}
)
export class CreateAPI {
    constructor( private http: HttpClient){ }

    createNewRecipe(recipe: IRecipe): Observable<IRecipe> {
        const url = 'http://localhost:5000/recipes/create';
      
        return this.http.post<IRecipe>(url, recipe);
    }

    createNewIngredient(ingredient : IIngredient): Observable<IIngredient> {
        const url = 'http://localhost:5000/ingredients/create';

        return this.http.post<IIngredient>(url, ingredient);
    }

    createNewMultipleIngredients(ingredient : IIngredient[]): Observable<IIngredient[]> {
        const url = 'http://localhost:5000/ingredients/create-multi';

        return this.http.post<IIngredient[]>(url, ingredient);
    }

    
}