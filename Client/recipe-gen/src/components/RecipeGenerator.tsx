import { useState } from "react";
import { RecipeDisplay } from "./RecipeDisplay";

export const RecipeGenerator = () => {
  const [recipe, setRecipe] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecipe = async () => {
    setIsLoading(true);
    setError(null);
    setRecipe("");

    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL;
      const queryParams = new URLSearchParams({
        ingredients: "Chicken, Tomatoes, Onion",
        mealType: "dinner",
        cuisine: "indian",
        cookingTime: "45",
        complexity: "intermediate"
      });

      const response = await fetch(`${API_URL}/recipeStream?${queryParams.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value);
          setRecipe(result); // progressively update
        }
      }

    } catch (err: any) {
      console.error(err);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={generateRecipe}
        className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/80"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Recipe"}
      </button>

      <RecipeDisplay recipe={recipe} isLoading={isLoading} error={error} />
    </div>
  );
};
