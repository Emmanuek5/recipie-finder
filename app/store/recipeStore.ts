import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Recipe, SearchFilters } from '../types/recipe';

interface RecipeStore {
  favorites: Recipe[];
  searchFilters: SearchFilters;
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipeId: number) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  isFavorite: (recipeId: number) => boolean;
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      searchFilters: {
        query: '',
        cuisine: undefined,
        diet: undefined,
      },
      addFavorite: (recipe) =>
        set((state) => ({
          favorites: [...state.favorites, recipe],
        })),
      removeFavorite: (recipeId) =>
        set((state) => ({
          favorites: state.favorites.filter((recipe) => recipe.id !== recipeId),
        })),
      setSearchFilters: (filters) =>
        set(() => ({
          searchFilters: filters,
        })),
      isFavorite: (recipeId) =>
        get().favorites.some((recipe) => recipe.id === recipeId),
    }),
    {
      name: 'recipe-storage',
    }
  )
);
