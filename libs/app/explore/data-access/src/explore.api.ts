import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Store } from '@ngxs/store';
import { IExplore } from '@fridge-to-plate/app/explore/utils';
import { environment } from '@fridge-to-plate/app/environments/utils';

@Injectable({
  providedIn: 'root',
})
export class ExploreAPI {
  
  constructor(private http: HttpClient, private store: Store) {}

  private baseUrl = environment.API_URL + "/explore";

  getRecipes(recipename: string) {
    const url = `${this.baseUrl}/${recipename}`;

    return this.http.get<IRecipe | null>(url);
  }

  getProfile(username: string) {
    const url = `${this.baseUrl}/profiles/${username}`;

    return this.http.get<IProfile | null>(url);
  }

  searchCategory(search : IExplore): Observable<IRecipe[] | null>  {
    const url = `${this.baseUrl}/search`;
    return this.http.post<IRecipe[] | null>(url, search);
  }

}
