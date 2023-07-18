import { IMealPlan } from "./interfaces";

export class AddToMealPlan{
    static readonly type = '[MealPlan] AddToMealPlan';
    constructor(public mealPlan: IMealPlan){} 
}

export class RemoveFromMealPlan {
    static readonly type = "[MealPlan] Remove From Meal Plan"
    constructor( public readonly recipeId: string, public readonly username: string) {}
}

export class GetMealPlan {
    static readonly type = "[MealPlan] Get Meal Plan By Username"
    constructor (public readonly username: string){}
}