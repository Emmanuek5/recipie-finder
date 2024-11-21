export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  cuisines: string[];
  diets: string[];
  summary: string;
  instructions: string;
  extendedIngredients: Ingredient[];
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

export interface SearchFilters {
  cuisine?: string;
  diet?: string;
  query: string;
}

export interface RecipeSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}
