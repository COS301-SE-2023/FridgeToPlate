import { IIngredient } from "./IIgredient.interface";

export interface IQuantityIngredient extends IIngredient {
    quantity: number;
    scale: string
}