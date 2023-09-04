import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@fridge-to-plate/app/environments/utils";
import { IMealPlan } from "@fridge-to-plate/app/meal-plan/utils";
import { Store } from "@ngxs/store";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { Observable } from "rxjs";
import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";

@Injectable({
    providedIn: 'root'
  })
export class MealPlanAPI {
   
    private baseUrl = environment.API_URL + '/meal-plans';

    constructor( private http: HttpClient, private store: Store ){ }

    saveMealPlan(mealPlan: IMealPlan){
        const url = this.baseUrl + '/save';
        return this.http.post<IMealPlan>(url, mealPlan).subscribe({
            error: error => {
                this.store.dispatch(new ShowError('Error occured when updating meal plan'));
            }
        });
    }

    getMealPlanShoppingList(username: string): Observable<IIngredient[]> {
        const url = `${this.baseUrl}/${username}/ingredients`;
        return this.http.get<IIngredient[]>(url);
    }    

    getMealPlan(date: Date, username: string) {
        const url = `${this.baseUrl}/${username}/${date}`;
        return this.http.get<IMealPlan>(url);
    }
}