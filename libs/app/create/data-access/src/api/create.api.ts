import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Observable } from 'rxjs';

@Injectable(
   { 
    providedIn: 'root',
}
)
export class CreateAPI {
    constructor( private http: HttpClient){ }

    createNewRecipe(recipe: IRecipe): Observable<IRecipe> {
        const url = 'http://localhost:5000/recipes/create';
        const body = { recipe };

        console.log(body)
      
        return this.http.post<IRecipe>(url, recipe);
    }

    // createNewIngredients(ingredient : IIngredient)

    
}