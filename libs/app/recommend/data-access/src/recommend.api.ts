import { ingredientsArray } from './ingredients.mock';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { QuantityIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

export interface IResponse {
  status: number;
  message: string;
  data: {};
}

export interface IngredientsResponse extends IResponse {
  data: {
    ingredientsList: QuantityIngredient[];
  };
}

export interface DietResponse extends IResponse {
  data: {
    dietList: string[];
  };
}

const baseUrl = 'http://dev-fridgetoplate-api.af-south-1.elasticbeanstalk.com/';

@Injectable({
  providedIn: 'root',
})
export class RecommendApi {
  constructor(private httpClient: HttpClient) {}
  //Step 1
  getUserIngredientsList(): Observable<QuantityIngredient[]> {
    //TODO:Comment out when backend connected.
    const req: Observable<QuantityIngredient[]> = this.httpClient
      .get<IngredientsResponse>('ingredients')
      .pipe(
        switchMap((res: IngredientsResponse) => {
          return res.data.ingredientsList ?? ingredientsArray;
        }),
        catchError(async (error) => {
          console.log('An error has occured: ', error);
          return error;
        })
      );

    return req;
  }

  removeIngredient(recipe: QuantityIngredient) {
    return ingredientsArray;
  }

  //Step 2
  getDietList(): string[] {
    return [];
  }

  //Step 3
  getRecommendations(recomendationParams: {}) {}
}
