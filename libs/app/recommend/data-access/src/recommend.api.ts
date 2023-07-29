import { ingredientsArray } from './ingredients.mock';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { IRecommend } from '@fridge-to-plate/app/recommend/utils';
import { environment } from '@fridge-to-plate/app/environments/utils';

const baseUrl = environment.API_URL + '/recommend';

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
      (ingredientItem) => ingredientItem.name !== ingredient.name
    );
  }

  //Step 2
  getDietList(): Observable<string[]> {
    const dietList = ['Vegan', 'Vegetarian', 'Paleo-tonic', 'Ketogenic'];

    const req = new BehaviorSubject<string[]>(dietList);

    return req;
  }

  //Step 3
  getRecommendations(recomendationParams: IRecommend): Observable<IRecipe[]> {
    const req: Observable<IRecipe[]> = this.httpClient.post<IRecipe[]>(
      baseUrl,
      recomendationParams
    );
    return req;
  }

  updateRecommendations(
    newRecommendations: IRecommend
  ): Observable<IRecommend> {
    const req: Observable<IRecommend> = this.httpClient.put<IRecommend>(
      baseUrl,
      newRecommendations
    );

    return req;
  }

  getUpdatedPreferences(username: string): Observable<IRecommend> {
    return this.httpClient.get<IRecommend>(`${baseUrl}/${username}`);
  }

  addPreferences(preferences: IRecommend): Observable<IRecommend> {
    return this.httpClient.post<IRecommend>(`${baseUrl}/create`, preferences);
  }
}
