import { ingredientsArray } from './ingredients.mock';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  catchError,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import {
  IProductInformationAPIResponse,
  IRecommend,
  convertProductFromApi,
} from '@fridge-to-plate/app/recommend/utils';
import { environment } from '@fridge-to-plate/app/environments/utils';

const baseUrl = environment.API_URL + '/recommend';

@Injectable({
  providedIn: 'root',
})
export class RecommendApi {

  constructor(private httpClient: HttpClient) {}

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
      `${baseUrl}/${newRecommendations.username}`,
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

  getProductInformation(productBarcode: string) {
    const upcApiUrl = environment.GOUPC_API_URL;
    const upcApiKey = environment.GOUPC_APIKEY;

    return this.httpClient
      .get<IProductInformationAPIResponse>(
        `${upcApiUrl}/code/${productBarcode}?key=${upcApiKey}`
      );
  }
}
