import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { ShowSuccess } from '@fridge-to-plate/app/info/utils';
import { IMealPlan } from '@fridge-to-plate/app/meal-plan/utils';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class ProfileAPI {

  constructor(private http: HttpClient, private store: Store) {}

  private baseUrl = environment.API_URL + "/profiles";

  updateProfile(profile: IProfile) {

    const username = profile.username;
    const url = `${this.baseUrl}/${username}`;
    this.http.put<IProfile>(url, profile).subscribe({
      next: () => {
         this.store.dispatch(new ShowSuccess("Profile updated successfully"));
  },
      error: error => {
        this.store.dispatch(new ShowError("Unsuccessful"));
      }
    });
  }

  saveProfile(profile: IProfile) {

    const url = `${this.baseUrl}/create`;
    this.http.post<IProfile>(url, profile).subscribe({
      error: error => {
        this.store.dispatch(new ShowError("An error occurred"));
      }
    });
  }

  getProfile(username: string) {
    const url = `${this.baseUrl}/${username}`;

    return this.http.get<IProfile | null>(url);
  }
}
