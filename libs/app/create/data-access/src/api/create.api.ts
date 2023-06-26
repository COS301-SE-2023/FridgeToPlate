import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRecipe } from '../interfaces/IRecipe.interface';






@Injectable(
   { 
    providedIn: 'root',
}
)
export class CreateAPI {
    constructor( private http: HttpClient) { }

    createNewRecipe(recipe: IRecipe) {
        const url = 'http://localhost:8080/cloudvendors/recipe';
        const body = { recipe: recipe };
      
        return this.http.post(url, body);
    }

    
}