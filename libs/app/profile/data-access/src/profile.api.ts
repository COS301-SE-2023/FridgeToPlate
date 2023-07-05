import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProfile } from '@fridge-to-plate/app/profile/utils';

export interface IResponse {
  status: number;
  message: string;
  data: object;
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

  private baseUrl = "http://localhost:5000/profiles";

  updateProfile(profile: IProfile) {

    const id = profile.profileId;

    const url = `${this.baseUrl}/${id}` ;

    this.http.put<IResponse>(url, profile).subscribe({
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