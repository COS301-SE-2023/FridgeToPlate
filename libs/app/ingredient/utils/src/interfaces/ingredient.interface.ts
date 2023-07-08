export interface IIngredient {
  ingredientId?: string;
  name: string;
  unit: string;
  amount: number;
  tags?: string[];
}

export interface IQuantityIngredient extends IIngredient {
  quantity: number;
  scale: string;
}
