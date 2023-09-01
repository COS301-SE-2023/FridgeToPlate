export interface IRecipePreferences {
    difficulty: '' | 'Easy' | 'Medium' | 'Hard';
    meal: string;
    servings: '' | '1 - 2' | '2 - 4' | '4+';
    prepTime: '' | '<30 Minutes' | '30 - 60 Minutes' | '60+ Minutes';
    rating: '' | '1+' | '2+' | '3+' | '4+' | '5+';
    keywords: string[];
}