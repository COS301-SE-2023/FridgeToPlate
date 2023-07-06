import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPreference } from '@fridge-to-plate/app/preference/utils';

export interface IResponse {
  status: number;
  message: string;
  data: object;
}

export interface PreferenceRequest extends IResponse {
  data: {
    preference: IPreference;
  };
}

const baseUrl = 'http://dev-fridgetoplate-api.af-south-1.elasticbeanstalk.com/';

@Injectable({
  providedIn: 'root',
})
export class PreferenceAPI {
  constructor(private http: HttpClient) {}

  private baseUrl = "http://localhost:5000/preferences";

  updatePreference(preference: IPreference) {

    const id = preference.userId;

    const url = `${this.baseUrl}/${id}` ;

    this.http.put<IResponse>(url, preference).subscribe({
      next: data => {
          console.log(data.status);
          return data.status;
      },
      error: error => {
          console.error('There was an error!', error);
          return error.status;
      }
    })
  }
}