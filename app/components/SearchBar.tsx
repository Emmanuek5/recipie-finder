import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CUISINE_OPTIONS, DIET_OPTIONS } from "../services/recipeService";
import { useRecipeStore } from "../store/recipeStore";

export function SearchBar() {
  const { searchFilters, setSearchFilters } = useRecipeStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto space-y-4"
    >
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchFilters.query}
            onChange={(e) =>
              setSearchFilters({ ...searchFilters, query: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm hover:border-indigo-300 transition-colors"
          />
        </div>
        <select
          value={searchFilters.cuisine || ""}
          onChange={(e) =>
            setSearchFilters({
              ...searchFilters,
              cuisine: e.target.value || undefined,
            })
          }
          className="px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm hover:border-indigo-300 transition-colors text-gray-700"
        >
          <option value="">All Cuisines</option>
          {CUISINE_OPTIONS.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
        <select
          value={searchFilters.diet || ""}
          onChange={(e) =>
            setSearchFilters({
              ...searchFilters,
              diet: e.target.value || undefined,
            })
          }
          className="px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm hover:border-indigo-300 transition-colors text-gray-700"
        >
          <option value="">All Diets</option>
          {DIET_OPTIONS.map((diet) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
