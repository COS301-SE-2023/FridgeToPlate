import { IRecipe } from '@fridge-to-plate/app/recipe/utils';

export const recipeList: IRecipe[] = [
  {
    profileId: "1",
    recipeImage: "https://source.unsplash.com/500x500/?food",
    name: "Chicken Biryani",
    difficulty: "medium",
    rating: 3,
    ingredients: [
      {
        id: "0",
        name: "Chicken",
        tags: ["Protien", "Meat"]
      },
      {
        id: "1",
        name: "Cooking Oil",
        tags: ["Oil"]
      },
      {
        id: "2",
        name: "Garlic",
        tags: ["Flavour", "Vegetable"]
      },
      {
        id: "7",
        name: "Garam Masala",
        tags: ["Spice"]
      },
      {
        id: "4",
        name: "Rice",
        tags: ["Starch"]
      },
    ],
    steps: [
      {
        instructionHeading: "Marinate the chicken",
        instructionBody: "To marinate the chicken for the biryani, combine the vegetable oil," +
          " garlic, ginger, chili peppers, mint, cilantro, garam masala, cinnamon and" +
          " salt in a large bowl and stir together.",
        stepDuration: 15
      },
      {
        instructionHeading: "Saute the onions",
        instructionBody: "In a pot wide enough to hold the chicken in a single layer, add the ghee and onions and" +
          " saute the onions until they are well caramelized (15-20 minutes)." +
          " Transfer the caramelized onions to a bowl and set aside.",
        stepDuration: 5
      },
      {
        instructionHeading: "Prepare the rice",
        instructionBody: "While the onions caramelize, prepare the rice by washing in a strainer under cold running" +
          " water until the water runs clear.",
        stepDuration: 5
      },
      {
        instructionHeading: "Par-boil the rice",
        instructionBody: "To par-boil the rice, add the water, salt, cardamom, cumin and bay leaf to a pot and bring" +
          " to a boil. Add the rice and boil for 7 minutes. Drain the rice, reserving 1 cup of the liquid.",
        stepDuration: 25
      },
      {
        instructionHeading: "Assemble Biryani",
        instructionBody: "To assemble the biryani, add the saffron to the rice and" +
          " toss to distribute evenly. Add half the rice mixture to the bottom of the pot you browned the chicken in.",
        stepDuration: 10
      },
    ],
    prepTime: 60,
    tags: ["Spicy", "Chicken", "Asian"]
  },
  {
    profileId: "2",
    recipeImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Grilled Basil Chicken",
    difficulty: "easy",
    rating: 4,
    ingredients: [
      {
        id: "0",
        name: "Chicken",
        tags: ["Protien", "Meat"]
      },
      {
        id: "9",
        name: "Olive Oil",
        tags: ["Oil"]
      },
      {
        id: "1",
        name: "Garlic",
        tags: ["Flavour", "Vegetable"]
      },
      {
        id: "11",
        name: "Salt",
        tags: ["Salty"]
      },
      {
        id: "8",
        name: "Tomato",
        tags: ["Acid", "Flavour"]
      },
    ],
    steps: [
      {
        instructionHeading: "Marinate the chicken",
        instructionBody: "To marinate the chicken for the biryani, combine the vegetable oil," +
          " garlic, ginger, chili peppers, mint, cilantro, garam masala, cinnamon and" +
          " salt in a large bowl and stir together.",
        stepDuration: 15
      },
      {
        instructionHeading: "Saute the onions",
        instructionBody: "In a pot wide enough to hold the chicken in a single layer, add the ghee and onions and" +
          " saute the onions until they are well caramelized (15-20 minutes)." +
          " Transfer the caramelized onions to a bowl and set aside.",
        stepDuration: 5
      },
      {
        instructionHeading: "Prepare the rice",
        instructionBody: "While the onions caramelize, prepare the rice by washing in a strainer under cold running" +
          " water until the water runs clear.",
        stepDuration: 5
      },
      {
        instructionHeading: "Par-boil the rice",
        instructionBody: "To par-boil the rice, add the water, salt, cardamom, cumin and bay leaf to a pot and bring" +
          " to a boil. Add the rice and boil for 7 minutes. Drain the rice, reserving 1 cup of the liquid.",
        stepDuration: 25
      },
      {
        instructionHeading: "Assemble Biryani",
        instructionBody: "To assemble the biryani, add the saffron to the rice and" +
          " toss to distribute evenly. Add half the rice mixture to the bottom of the pot you browned the chicken in.",
        stepDuration: 10
      },
    ],
    prepTime: 60,
    numberOfServings: 4,
    tags: ["Healthy", "Chicken"]
  },
  {
    profileId: "3",
    recipeImage: "https://picsum.photos/seed/picsum/200/300",
    name: "Grilled Cheese",
    difficulty: "easy",
    rating: 4,
    ingredients: [
      {
        id: "0",
        name: "Chicken",
        tags: ["Protien", "Meat"]
      },
      {
        id: "1",
        name: "Cooking Oil",
        tags: ["Oil"]
      },
      {
        id: "2",
        name: "Garlic",
        tags: ["Flavour", "Vegetable"]
      },
      {
        id: "7",
        name: "Garam Masala",
        tags: ["Spice"]
      },
      {
        id: "4",
        name: "Rice",
        tags: ["Starch"]
      },
    ],
    steps: [
      {
        instructionHeading: "Marinate the chicken",
        instructionBody: "To marinate the chicken for the biryani, combine the vegetable oil," +
          " garlic, ginger, chili peppers, mint, cilantro, garam masala, cinnamon and" +
          " salt in a large bowl and stir together.",
        stepDuration: 15
      },
      {
        instructionHeading: "Saute the onions",
        instructionBody: "In a pot wide enough to hold the chicken in a single layer, add the ghee and onions and" +
          " saute the onions until they are well caramelized (15-20 minutes)." +
          " Transfer the caramelized onions to a bowl and set aside.",
        stepDuration: 5
      },
      {
        instructionHeading: "Prepare the rice",
        instructionBody: "While the onions caramelize, prepare the rice by washing in a strainer under cold running" +
          " water until the water runs clear.",
        stepDuration: 5
      },
      {
        instructionHeading: "Par-boil the rice",
        instructionBody: "To par-boil the rice, add the water, salt, cardamom, cumin and bay leaf to a pot and bring" +
          " to a boil. Add the rice and boil for 7 minutes. Drain the rice, reserving 1 cup of the liquid.",
        stepDuration: 25
      },
      {
        instructionHeading: "Assemble Biryani",
        instructionBody: "To assemble the biryani, add the saffron to the rice and" +
          " toss to distribute evenly. Add half the rice mixture to the bottom of the pot you browned the chicken in.",
        stepDuration: 10
      },
    ],
    prepTime: 20,
      tags: ["Cheese", "Grilled", "Cheap"]
  },
];
