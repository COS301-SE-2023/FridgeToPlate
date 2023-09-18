import { Injectable } from "@angular/core";
import { UpdateMealPlanData } from "@fridge-to-plate/app/meal-plan/utils";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ChartData } from "chart.js";


export interface MealPlanChartStateModel {
    mealPlanChartData: ChartData;
}

@State<MealPlanChartStateModel>({
    name: 'mealplandata',
    defaults: {
        mealPlanChartData: {
            labels: [
              'Breakfast',
              'Lunch',
              'Dinner',
              'Snack'
            ],
            datasets: [{
              label: 'Number of Calories',
              data: [0, 0, 0, 0],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(155, 205, 204)'
              ],
              hoverOffset: 4
            }]
        }
    }
})
@Injectable()
export class MealPlanState {

    @Selector()
    static getMealPlanChartData(state: MealPlanChartStateModel) {
        return state.mealPlanChartData;
    }

    @Action(UpdateMealPlanData)
    updateMealPlanData({ getState } : StateContext<MealPlanChartStateModel>, { values }: UpdateMealPlanData) {
        getState().mealPlanChartData.datasets[0].data = values;
    }
}