import { Card } from "@/components/ui/card";
import { Scroll, AlertTriangle } from "lucide-react";
import { LoadingAnimation } from "./LoadingAnimation";
import ReactMarkdown from 'react-markdown';

// The props have changed: `recipe` is now a string, and we've added `error`.
interface RecipeDisplayProps {
  recipe: string;
  isLoading: boolean;
  error: string | null;
}

export const RecipeDisplay = ({ recipe, isLoading, error }: RecipeDisplayProps) => {
  // 1. Handle Loading State
  if (isLoading) {
    return (
      <Card className="p-8 gradient-dark border-border/50 min-h-[500px] flex items-center justify-center">
        <LoadingAnimation />
      </Card>
    );
  }

  // 2. Handle Error State
  if (error) {
    return (
      <Card className="p-8 gradient-dark border-border/50 min-h-[500px] flex flex-col items-center justify-center text-center">
        <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
        <h3 className="text-xl font-semibold text-destructive">An Error Occurred</h3>
        <p className="text-muted-foreground mt-2">{error}</p>
      </Card>
    );
  }

  // 3. Handle Empty/Initial State
  if (!recipe) {
    return (
      <Card className="p-8 gradient-dark border-border/50 min-h-[500px] flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <Scroll className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold">Your Culinary Creation Awaits...</h3>
          <p className="text-muted-foreground max-w-md">
            Add your ingredients to the Magic Cauldron and let the culinary alchemy begin.
          </p>
        </div>
      </Card>
    );
  }

  // 4. Render the Markdown Recipe
  return (
    <Card className="p-8 gradient-dark border-border/50 animate-in fade-in duration-500 overflow-y-auto min-h-[500px]">
      {/* The `prose` class styles the raw HTML from the Markdown beautifully. */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{recipe}</ReactMarkdown>
      </div>
    </Card>
  );
};