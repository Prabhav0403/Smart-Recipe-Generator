import { useState, useRef, useEffect } from "react";
import { RecipeInput, RecipeFormData } from "@/components/RecipeInput";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { Sparkles } from "lucide-react";
// Note: You may need to adjust the RecipeDisplay import if its props change.

const Index = () => {
  // The 'recipe' state is now a string to hold the incoming Markdown text.
  const [recipe, setRecipe] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use a ref to hold the EventSource instance
  const eventSourceRef = useRef<EventSource | null>(null);

  // This function now connects to your real backend.
  const generateRecipe = async (formData: RecipeFormData) => {
    setIsLoading(true);
    setRecipe("");
    setError(null);

    // Close any existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Convert form data into query parameters for the URL.
    const queryParams = new URLSearchParams({
      ingredients: formData.ingredients.join(", "), // Join array into a string
      mealType: formData.mealType,
      cuisine: formData.cuisine,
      cookingTime: String(formData.cookingTime), // Ensure it's a string
      complexity: formData.complexity || "Intermediate", // Add a default if needed
      dietaryRestrictions: formData.dietaryRestrictions,
    }).toString();

const url = `https://recipe-generator-server.onrender.com/recipeStream?${queryParams}`;    // Initialize the Server-Sent Events connection
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.action === "chunk") {
        setRecipe((prevRecipe) => prevRecipe + data.chunk);
      } else if (data.action === "close") {
        setIsLoading(false);
        eventSource.close();
      } else if (data.action === "error") {
        setError(data.message || "An error occurred while generating the recipe.");
        setIsLoading(false);
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      setError("Connection to the server failed. Please try again.");
      setIsLoading(false);
      eventSource.close();
    };
  };

  // Clean up the connection when the component is unmounted
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);


  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Smart Recipe Generator</h1>
                <p className="text-sm text-muted-foreground">Transform ingredients into culinary magic</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Input Section */}
            <div className="space-y-4">
              <RecipeInput onGenerate={generateRecipe} isLoading={isLoading} />
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              {/* IMPORTANT: The 'recipe' prop is now a string of Markdown. */}
              {/* You'll need to update RecipeDisplay to render it. */}
              <RecipeDisplay recipe={recipe} isLoading={isLoading} error={error} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;