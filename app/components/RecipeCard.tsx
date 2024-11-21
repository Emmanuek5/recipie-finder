import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { Recipe } from "../types/recipe";
import { useRecipeStore } from "../store/recipeStore";
import clsx from "clsx";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useRecipeStore();
  const favorite = isFavorite(recipe.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-48 w-full">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all duration-200 hover:scale-105"
      >
        {favorite ? (
          <HeartSolidIcon className="w-6 h-6 text-rose-500" />
        ) : (
          <HeartIcon className="w-6 h-6 text-gray-700" />
        )}
      </button>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
          {recipe.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {recipe.cuisines.slice(0, 2).map((cuisine) => (
            <span
              key={cuisine}
              className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium"
            >
              {cuisine}
            </span>
          ))}
          {recipe.diets.slice(0, 2).map((diet) => (
            <span
              key={diet}
              className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium"
            >
              {diet}
            </span>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center">🕒</span>
            {recipe.readyInMinutes} mins
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center">👥</span>
            {recipe.servings} servings
          </span>
        </div>
      </div>
    </Link>
  );
}
