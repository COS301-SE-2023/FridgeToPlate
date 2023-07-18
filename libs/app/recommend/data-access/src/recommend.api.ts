import { ingredientsArray } from './ingredients.mock';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { IRecommend } from '../../utils/src/interfaces';

const baseUrl = 'http://localhost:5000/recommend';

@Injectable({
  providedIn: 'root',
})
export class RecommendApi {
  constructor(private httpClient: HttpClient) {}
  //Step 1
  getUserIngredientsList(): Observable<IIngredient[]> {
    const req: Observable<IIngredient[]> = this.httpClient
      .get<IProfile>(`${baseUrl}profiles/9be7b531-4980-4d3b-beff-a35d08f2637e`)
      .pipe(
        switchMap((res: IProfile) => {
          return new BehaviorSubject<IIngredient[]>(res.ingredients);
        }),
        catchError(async (error) => {
          console.log('An error has occured: ', error);
          return error;
        })
      );

    return req;
  }

  removeIngredient(ingredient: IIngredient) {
    return ingredientsArray.filter(
      (ingredientItem) =>
        ingredientItem.name !== ingredient.name
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
    const dietList = ['Vegan', 'Vegetarian', 'Paleo-tonic', 'Ketogenic'];

    const req = new BehaviorSubject<string[]>(dietList);

    return req;
  }

  //Step 3
  getRecommendations(recomendationParams: IRecommend): Observable<IRecipe[]> {

    const dummyRecommendations: IRecipe[] = []
    // const req: Observable<IRecipe[]> = this.httpClient
    //   .get<IRecipe[]>(`${baseUrl}recommend`)
    //   .pipe(
    //     switchMap((res: IRecipe[]) => {
    //       return new BehaviorSubject<IRecipe[]>(res);
    //     }),
    //     catchError(async (error) => {
    //       console.log('An error has occured: ', error);
    //       return error;
    //     })
    //   );

    const req: Observable<IRecipe[]> = new BehaviorSubject<IRecipe[]>(dummyRecommendations)
    return req;
  }
}
