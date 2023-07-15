import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class ProfileAPI {

  constructor(private http: HttpClient, private store: Store) {}

  private baseUrl = "http://localhost:5000/profiles";

  updateProfile(profile: IProfile) {

    const username = profile.username;

    const url = `${this.baseUrl}/${username}`;

    this.http.put<IProfile>(url, profile).subscribe({
      error: error => {
        this.store.dispatch(new ShowError(error));
      }
    });
  }

  saveProfile(profile: IProfile) {

    const url = `${this.baseUrl}/create`;

    this.http.post<IProfile>(url, profile).subscribe({
      error: error => {
        this.store.dispatch(new ShowError(error));
      }
    });
  }

  async getProfile(username: string) {
    const url = `${this.baseUrl}/${username}`;

    return this.http.get<IProfile | null>(url);
  }
}