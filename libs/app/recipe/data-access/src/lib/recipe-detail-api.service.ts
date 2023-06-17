import { Injectable } from '@angular/core';
import {baseApiUrl} from "../../../../shared/api.routes";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailApiService {

  constructor(private requestClient: HttpClient) {

  }


}
