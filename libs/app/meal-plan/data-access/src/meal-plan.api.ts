import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@fridge-to-plate/app/environments/utils";
import { IMealPlan } from "@fridge-to-plate/app/meal-plan/utils";

@Injectable({
    providedIn: 'root'
  })
export class MealPlanAPI {
   
    private baseUrl = environment.API_URL + '/meal-plans';

    constructor( private http: HttpClient){ }

    addToMealPlan(mealPlan: IMealPlan){
        const url = this.baseUrl + '/save';
        return this.http.post<IMealPlan>(url, mealPlan);
    }

    removeFromMealPlan(username: string, recipe: string) {
        const url = this.baseUrl + '/' + username;
        return this.http.put<IMealPlan>(url, recipe);
    }

    getMealPlanByUsername(username: string) {
        const url = this.baseUrl + '/' + username;
        return this.http.get<IMealPlan>(url);
    }
}