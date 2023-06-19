import { Injectable } from '@angular/core';
import { baseApiUrl } from '../../../../shared/api.routes';
import { HttpClient } from '@angular/common/http';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { recipeList } from '@fridge-to-plate/app/recipe/data-access';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIResponse } from '../../../../models/api.response';

interface RecipeAPIResponse extends APIResponse {
  data: {
    recipe: IRecipe;
  };
}

@Injectable({
  providedIn: 'root',
})
export class RecipeDetailApiService {
  constructor(private httpClient: HttpClient) {}

  getRecipeDetails(id: number = 1): Observable<IRecipe> {
    const recipe: IRecipe = recipeList[0];
    //return this.httpClient.get<RecipeAPIResponse>(`${baseApiUrl}/${id}`);
    return new BehaviorSubject<IRecipe>(recipe);
  }
}
