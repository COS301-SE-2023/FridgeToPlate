import { ingredientsArray } from './ingredients.mock';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IQuantityIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { recipeArray } from './recipes.mock';

export interface IResponse {
  status: number;
  message: string;
  data: {};
}

export interface IngredientsResponse extends IResponse {
  data: {
    ingredientsList: IQuantityIngredient[];
  };
}

export interface DietResponse extends IResponse {
  data: {
    dietList: string[];
  };
}

const baseUrl = 'http://localhost:5000/';

@Injectable({
  providedIn: 'root',
})
export class RecommendApi {
  constructor(private httpClient: HttpClient) {}
  //Step 1
  getUserIngredientsList(): Observable<IQuantityIngredient[]> {
    //TODO:Comment out when backend connected.
    const req: Observable<IQuantityIngredient[]> = this.httpClient
      .get<IngredientsResponse>('profile')
      .pipe(
        switchMap((res: IngredientsResponse) => {
          return res.data.ingredientsList ?? ingredientsArray;
        }),
        catchError(async (error) => {
          console.log('An error has occured: ', error);
          return error;
        })
      );
    //const req = new BehaviorSubject<IQuantityIngredient[]>(ingredientsArray);

    return req;
  }

  removeIngredient(ingredient: IQuantityIngredient) {
    return ingredientsArray.filter(
      (ingredientItem) => ingredientItem.id !== ingredient.id
    );
  }

  //Step 2
  getDietList(): Observable<string[]> {
    //TODO:Comment out when backend connected.
    // const req: Observable<string[]> = this.httpClient
    //   .get<IngredientsResponse>('diet')
    //   .pipe(
    //     switchMap((res: IngredientsResponse) => {
    //       return res.data.ingredientsList ?? ingredientsArray;
    //     }),
    //     catchError(async (error) => {
    //       console.log('An error has occured: ', error);
    //       return error;
    //     })
    //   );
    const dietList = [
      'Vegan',
      'Vegetarian',
      'Ketogenic',
      'Paleo-tonic',
      'Low-carb',
      'Pescatarian',
    ];

    const req = new BehaviorSubject<string[]>(dietList);

    return req;
  }

  //Step 3
  getRecommendations(recomendationParams: {}): Observable<IRecipe[]> {
    const recommendations = new BehaviorSubject<IRecipe[]>(recipeArray);

    return recommendations;
  }
}
