export interface IRecipe {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  tags ?: string[];
  diet ?: string[];
}
export const recipeArray: IRecipe[] = [
  {
    id: 0,
    name: 'Beef Stew',
    difficulty: "medium",
    imageUrl: 'source.unsplash.com/150x150/?food',
    tags: ['Beef', 'Protien']
  },
  {
    id: 1,
    name: 'Omelette',
    difficulty: "easy",
    imageUrl: 'source.unsplash.com/150x150/?food',
    tags: ['Egg', 'Protien']
  },
  {
    id: 2,
    name: 'Greek Salad',
    difficulty: "easy",
    imageUrl: 'source.unsplash.com/150x150/?food',
    tags: ['Leafy', 'Salad'],
    diet: ['Vegetarian']
  },
  {
    id: 3,
    name: 'Vegan Pizza',
    difficulty: "hard",
    imageUrl: 'source.unsplash.com/150x150/?food',
    tags: ['Vegetarian', 'Vegan'],
    diet: ['Vegan']
  },
  {
    id: 4,
    name: 'Chow Mein',
    difficulty: "medium",
    imageUrl: 'source.unsplash.com/150x150/?food',
    tags: ['Asian', 'Protien']
  },
  {
    id: 5,
    name: 'Shrimp Pasta',
    difficulty: "hard",
    imageUrl: 'source.unsplash.com/150x150/?food',
    tags: ['Pasta', 'Seafood'],
  },
  {
    id: 6,
    name: 'Cheeseburger',
    difficulty: "medium",
    imageUrl: 'source.unsplash.com/150x150/?food',
    tags: ['Carbs', 'Beef']
  },
  {
    id: 7,
    name: 'Tacos',
    difficulty: "hard",
    imageUrl: 'source.unsplash.com/150x150/?food',
    tags: ['Mexican']
  }
]
