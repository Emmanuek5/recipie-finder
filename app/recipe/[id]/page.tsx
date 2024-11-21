"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { Recipe } from "../../types/recipe";
import { getRecipeById } from "../../services/recipeService";
import { useRecipeStore } from "../../store/recipeStore";
export const runtime = "edge";
type Params = Promise<{ id: string }>;
export default function RecipePage(props: { params: Params }) {
  const params = use(props.params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, addFavorite, removeFavorite } = useRecipeStore();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecipeById(parseInt(params.id));
        setRecipe(data);
      } catch (err) {
        setError("Failed to fetch recipe details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error || "Recipe not found"}</p>
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to search
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(recipe.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to search
          </Link>
          <button
            onClick={toggleFavorite}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            {favorite ? (
              <>
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <HeartIcon className="w-5 h-5" />
                <span>Save Recipe</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 w-full">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.cuisines.map((cuisine) => (
                <span
                  key={cuisine}
                  className="px-3 py-1 rounded-full bg-blue-100 text-blue-800"
                >
                  {cuisine}
                </span>
              ))}
              {recipe.diets.map((diet) => (
                <span
                  key={diet}
                  className="px-3 py-1 rounded-full bg-green-100 text-green-800"
                >
                  {diet}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Cooking Time</p>
                <p className="text-xl font-semibold">
                  {recipe.readyInMinutes} mins
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Servings</p>
                <p className="text-xl font-semibold">{recipe.servings}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
