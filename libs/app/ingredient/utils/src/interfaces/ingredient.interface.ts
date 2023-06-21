export interface IIngredient {
    id: string;
    name: string;
    tags?: string[];
  }
  
  export interface QuantityIngredient extends IIngredient {
    quantity: number;
    scale: string;
  }