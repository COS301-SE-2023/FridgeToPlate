import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPreferences } from '@fridge-to-plate/app/preferences/utils';

export interface IResponse {
  status: number;
  message: string;
  data: object;
}

export interface PreferenceRequest extends IResponse {
  data: {
    preferences: IPreferences;
  };
}

const baseUrl = 'http://dev-fridgetoplate-api.af-south-1.elasticbeanstalk.com/';

@Injectable({
  providedIn: 'root',
})
export class PreferencesAPI {
  constructor(private http: HttpClient) {}

  private baseUrl = "http://localhost:5000/preferences";

  updatePreference(preferences: IPreferences) {

    const username = preferences.username;

    const url = `${this.baseUrl}/${username}` ;

    this.http.put<IResponse>(url, preferences).subscribe({
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