import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { ShowInfo, ShowSuccess } from '@fridge-to-plate/app/info/utils';
import { IPreferences } from '@fridge-to-plate/app/preferences/utils';
import { Store } from '@ngxs/store';


@Injectable({
  providedIn: 'root',
})
export class PreferencesAPI {

  constructor(private http: HttpClient, private store: Store) {}

  private baseUrl = environment.API_URL + "/preferences";

  updatePreference(preferences: IPreferences) {

    const username = preferences.username;

    const url = `${this.baseUrl}/${username}` ;

    this.http.put<IPreferences>(url, preferences).subscribe({
      error: error => {
        this.store.dispatch(new ShowInfo("Successfully Updated"));
      }
    })
  }

  savePreferences(preferences: IPreferences) {

    const url = `${this.baseUrl}/create`;

    this.http.post<IPreferences>(url, preferences).subscribe({
      error: error => {
        this.store.dispatch(new ShowError("An error occurred"));
      }
    });
  }

  getPreferences(username: string) {
    const url = `${this.baseUrl}/${username}`;

    return this.http.get<IPreferences | null>(url);
  }
}
