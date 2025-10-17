import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Sparkles, Plus, X, ChefHat, Clock, Utensils, Zap } from "lucide-react"; // Added Zap icon
import { Slider } from "@/components/ui/slider";

interface RecipeInputProps {
  onGenerate: (data: RecipeFormData) => void;
  isLoading: boolean;
}

export interface RecipeFormData {
  ingredients: string[];
  mealType: string;
  cuisine: string;
  cookingTime: number;
  dietaryRestrictions: string;
  complexity?: string;
}

export const RecipeInput = ({ onGenerate, isLoading }: RecipeInputProps) => {
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>(["Chicken", "Tomatoes", "Onion"]); // Added defaults for easier testing
  const [mealType, setMealType] = useState("dinner");
  const [cuisine, setCuisine] = useState("indian");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("none");
  const [cookingTime, setCookingTime] = useState([45]);
  const [complexity, setComplexity] = useState("intermediate"); // Added state for complexity

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  // This function now handles the form's submit event.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    if (ingredients.length === 0) return;
    
    onGenerate({
      ingredients,
      mealType,
      cuisine,
      dietaryRestrictions,
      cookingTime: cookingTime[0],
      complexity, // Added complexity to the submitted data
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <Card className="p-8 gradient-subtle border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-primary/10">
          <ChefHat className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">The Magic Cauldron</h2>
      </div>

      {/* The main content is now wrapped in a <form> element */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ingredients Input */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base">
            <Utensils className="w-4 h-4 text-primary" />
            Your Ingredients
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add an ingredient..."
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-background/50 border-border/50 focus:border-primary"
            />
            <Button
              onClick={addIngredient}
              size="icon"
              variant="secondary"
              type="button" // This button does NOT submit the form
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Ingredient Chips */}
          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient}
                  className="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-primary/20 text-primary text-sm animate-in fade-in-50"
                >
                  <span>{ingredient}</span>
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="hover:bg-primary/30 rounded-full p-0.5 transition-colors"
                    type="button"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Grid for Selects */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Meal Type */}
          <div className="space-y-3">
            <Label className="text-base">Meal Type</Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
                <SelectItem value="dessert">Dessert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cuisine Type */}
          <div className="space-y-3">
            <Label className="text-base">Cuisine Type</Label>
            <Select value={cuisine} onValueChange={setCuisine}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Cuisine</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="mexican">Mexican</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="indian">Indian</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Dietary Restrictions */}
          <div className="space-y-3">
            <Label className="text-base">Dietary Preferences</Label>
            <Select value={dietaryRestrictions} onValueChange={setDietaryRestrictions}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Restrictions</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="gluten-free">Gluten-Free</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Complexity */}
          <div className="space-y-3">
            <Label className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Complexity
            </Label>
            <Select value={complexity} onValueChange={setComplexity}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cooking Time */}
        <div className="space-y-3 pt-2">
          <Label className="flex items-center gap-2 text-base">
            <Clock className="w-4 h-4 text-primary" />
            Maximum Cooking Time: {cookingTime[0]} minutes
          </Label>
          <Slider
            value={cookingTime}
            onValueChange={setCookingTime}
            min={15}
            max={120}
            step={15}
            className="w-full"
          />
        </div>

        {/* Generate Button */}
        <Button
          type="submit" // This button now submits the form
          variant="magic"
          size="lg"
          className="w-full"
          disabled={ingredients.length === 0 || isLoading}
        >
          <Sparkles className="w-5 h-5" />
          {isLoading ? "Generating..." : "Generate Recipe"}
        </Button>
      </form>
    </Card>
  );
};