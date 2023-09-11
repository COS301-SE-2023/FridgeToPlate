import { Injectable } from "@angular/core";
import { IIngredient } from "@fridge-to-plate/app/ingredient/utils";

@Injectable()
export class ConversionService {
    convertIngredients(ingredients: IIngredient[], type: string): IIngredient[] {
        ingredients.forEach(element => {
            if (type === "imperial") {
                switch (element.unit) {
                    case "mL":
                        if (element.amount < 60) {
                            element.amount /= 15;
                            element.unit = "tsp";
                        } else {
                            element.amount /= 250;
                            element.unit = "cup";
                        }
                        break;
                    case "L":
                        element.amount /= 250;
                        element.unit = "cup";
                        break;
                    case "g":
                        if (element.amount < 454) {
                            element.amount /= 28;
                            element.unit = "oz";
                        } else {
                            element.amount /= 454;
                            element.unit = "lb";
                        }
                }
            } else {
                switch (element.unit) {
                    case "tsp":
                        element.amount *= 15;
                        element.unit = "ml";
                        break;
                    case "cup":
                        element.amount *= 250;
                        element.unit = "ml";
                        break;
                    case "lb":
                        element.amount *= 454;
                        element.unit = "g";
                        break;
                    case "oz": 
                        element.amount *= 28;
                        element.unit = "g";
                }
            }
        });

        return ingredients;
    }
}