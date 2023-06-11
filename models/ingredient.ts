export interface Ingredient {
  id: string;
  name: string;
  tags?: string[];
}

export interface UserIngredient extends Ingredient {
  quantity?: number;
  mass?: number;
}
