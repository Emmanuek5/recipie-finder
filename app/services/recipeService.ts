import { Recipe, RecipeSearchResponse, SearchFilters } from '../types/recipe';

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function searchRecipes(filters: SearchFilters): Promise<RecipeSearchResponse> {
  const params = new URLSearchParams({
    apiKey: API_KEY!,
    query: filters.query,
    number: '12',
    addRecipeInformation: 'true',
    fillIngredients: 'true',
    ...(filters.cuisine && { cuisine: filters.cuisine }),
    ...(filters.diet && { diet: filters.diet }),
  });

  const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
}

export async function getRecipeById(id: number): Promise<Recipe> {
  const params = new URLSearchParams({
    apiKey: API_KEY!,
    addRecipeInformation: 'true',
    fillIngredients: 'true',
  });

  const response = await fetch(`${BASE_URL}/${id}/information?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipe');
  }
  return response.json();
}

export async function getRandomRecipes(tags?: string[]): Promise<Recipe[]> {
  const params = new URLSearchParams({
    apiKey: API_KEY!,
    number: '12',
    addRecipeInformation: 'true',
    fillIngredients: 'true',
  });

  if (tags && tags.length > 0) {
    params.append('cuisines', tags.join(','));
  }

  const response = await fetch(`${BASE_URL}/complexSearch?${params}&sort=random`);
  if (!response.ok) {
    throw new Error('Failed to fetch random recipes');
  }
  const data = await response.json();
  return data.results;
}

export const CUISINE_OPTIONS = [
  'African',
  'Asian',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Spanish',
  'Thai',
  'Vietnamese',
];

export const DIET_OPTIONS = [
  'Gluten Free',
  'Ketogenic',
  'Vegetarian',
  'Lacto-Vegetarian',
  'Ovo-Vegetarian',
  'Vegan',
  'Pescetarian',
  'Paleo',
  'Primal',
  'Low FODMAP',
  'Whole30',
];
