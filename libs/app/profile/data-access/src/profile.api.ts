import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IQuantityIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { da } from 'date-fns/locale';

export interface IResponse {
  status: number;
  message: string;
  data: {};
}

export interface ProfileRequest extends IResponse {
  data: {
    profile: IProfile;
  };
}

const baseUrl = 'http://dev-fridgetoplate-api.af-south-1.elasticbeanstalk.com/';

@Injectable({
  providedIn: 'root',
})
export class ProfileAPI {
  constructor(private http: HttpClient) {}
  
  editProfile(profile: IProfile) {
    this.http.post<IResponse>('https://reqres.in/api/posts', profile).subscribe({
      next: data => {
          return data.status;
      },
      error: error => {
          console.error('There was an error!', error);
          return error.status;
      }
    })
  }

}