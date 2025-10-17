const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchRecipe({ ingredients, mealType, cuisine, cookingTime, complexity }) {
  try {
    const queryParams = new URLSearchParams({ ingredients, mealType, cuisine, cookingTime, complexity });
    const response = await fetch(`${API_URL}/recipeStream?${queryParams.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) throw new Error(`Server responded with ${response.status}`);

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value);
    }

    return result;

  } catch (err) {
    console.error("Error fetching recipe:", err);
    throw err;
  }
}
