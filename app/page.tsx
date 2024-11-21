/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { RecipeCard } from "./components/RecipeCard";
import { Recipe } from "./types/recipe";
import {
  searchRecipes,
  getRandomRecipes,
  CUISINE_OPTIONS,
} from "./services/recipeService";
import { useRecipeStore } from "./store/recipeStore";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { searchFilters } = useRecipeStore();

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        setError(null);
        const response = await searchRecipes(searchFilters);
        setRecipes(response.results);
      } catch (err) {
        setError("Failed to fetch recipes. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (searchFilters.query) {
      fetchRecipes();
    } else {
      setRecipes([]);
    }
  }, [searchFilters]);

  const handleRecommend = async () => {
    try {
      setLoading(true);
      setError(null);
      // Get 3 random cuisines
      const randomCuisines = [...CUISINE_OPTIONS]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const recipes = await getRandomRecipes(randomCuisines);
      setRecipes(recipes);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Recipe
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Search through thousands of recipes and discover your next favorite
            meal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="w-full max-w-4xl">
              <SearchBar />
            </div>
            <button
              onClick={handleRecommend}
              className="flex items-center gap-2 px-6 py-2 bg-white text-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-200 whitespace-nowrap"
            >
              <SparklesIcon className="w-5 h-5" />
              <span>Recommend for me</span>
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="inline-block px-4 py-2 rounded-lg bg-red-50 text-red-600">
              {error}
            </div>
          </div>
        )}

        {!loading && !error && recipes.length === 0 && searchFilters.query && (
          <div className="text-center py-12">
            <div className="inline-block px-4 py-2 rounded-lg bg-amber-50 text-amber-600">
              No recipes found. Try different search terms or filters.
            </div>
          </div>
        )}

        {!loading && !error && recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}

        {!searchFilters.query && recipes.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block px-6 py-3 rounded-lg bg-indigo-50 text-indigo-600">
              Start searching for recipes or click "Recommend for me" for
              inspiration! 🍳
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
