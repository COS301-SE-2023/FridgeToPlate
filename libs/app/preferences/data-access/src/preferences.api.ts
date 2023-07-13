import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { IPreferences } from '@fridge-to-plate/app/preferences/utils';
import { Store } from '@ngxs/store';

const baseUrl = 'http://dev-fridgetoplate-api.af-south-1.elasticbeanstalk.com/';

@Injectable({
  providedIn: 'root',
})
export class PreferencesAPI {

  constructor(private http: HttpClient, private store: Store) {}

  private baseUrl = "http://localhost:5000/preferences";

  updatePreference(preferences: IPreferences) {

    const username = preferences.username;

    const url = `${this.baseUrl}/${username}` ;

    this.http.put<IPreferences>(url, preferences).subscribe({
      error: error => {
        this.store.dispatch(new ShowError(error));
      }
    })
  }
}