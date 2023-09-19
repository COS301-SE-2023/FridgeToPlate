export class UpdateMealPlanData {
    static readonly type = '[MealPlan] UpdateMealPlanData';
    constructor(public readonly values: number[]) {}
}