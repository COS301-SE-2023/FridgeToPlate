import { Injectable } from "@angular/core";
import { AddToMealPlan, GetMealPlan, IMealPlan, RemoveFromMealPlan } from "@fridge-to-plate/app/meal-plan/utils";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { MealPlanAPI } from "./meal-plan.api";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { catchError, tap } from "rxjs";

export interface MealPlanStateModel{
    mealPlan: IMealPlan | null;
}

@State<MealPlanStateModel>({
    name: 'mealplan',
    defaults: {
        mealPlan : {
            username: 'johndoe',
            date: '',
            breakfast: null,
            lunch: null,
            dinner: null,
            snack: null,
        }
    }
})


@Injectable()
export class MealPlanState {
    constructor( private readonly store: Store, private readonly api: MealPlanAPI ){}


    @Action(AddToMealPlan)
    addToMealPlan({ patchState } : StateContext<MealPlanStateModel>, { mealPlan }: AddToMealPlan){

        this.api.addToMealPlan(mealPlan).pipe(tap((mealplan
            )=>patchState({'mealPlan': mealplan})), catchError(()=>{return this.store.
                dispatch(new ShowError("Unable to retrieve Meal Plan"));}))
    }

    @Action(RemoveFromMealPlan)
    removeFromMealPlan({ patchState } : StateContext<MealPlanStateModel>, { username, recipeId }: RemoveFromMealPlan){

        this.api.removeFromMealPlan(username, recipeId).pipe(tap((mealplan)=>patchState
            ({"mealPlan": mealplan}),catchError (()=>this.store
            .dispatch(new ShowError('Unfortunately, the recipe was not removed successfully')
            ))));
    }

    @Action(GetMealPlan)
    getMealPlan ({ patchState } : StateContext<MealPlanStateModel>, { username }: GetMealPlan) {
        return this.api.getMealPlanByUsername(username).pipe(tap((mealplan
            )=>patchState({'mealPlan': mealplan})), catchError(()=>{return this.store.
                dispatch(new ShowError("Unable to retrieve Meal Plan"));}))

    } 
}