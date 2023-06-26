export interface IIngredient {
    ingredientId: string;
    name: string;
    tags?: string[];
  }
  
  export interface IQuantityIngredient extends IIngredient {
    quantity: number;
    scale: string;
  }