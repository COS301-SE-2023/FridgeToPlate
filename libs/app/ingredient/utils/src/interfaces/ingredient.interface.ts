export interface IIngredient {
    id: string;
    name: string;
    tags?: string[];
  }
  
  export interface IQuantityIngredient extends IIngredient {
    quantity: number;
    scale: string;
  }