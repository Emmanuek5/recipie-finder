"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { RecipeCard } from "../components/RecipeCard";
import { useRecipeStore } from "../store/recipeStore";

export default function FavoritesPage() {
  const { favorites } = useRecipeStore();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to search
          </Link>
          <h1 className="text-3xl font-bold">Favorite Recipes</h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">No favorite recipes yet!</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Start searching for recipes to add to your favorites
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
