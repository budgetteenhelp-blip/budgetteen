import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Trophy } from "lucide-react";

interface Lesson5BakeSaleProps {
  onComplete: () => void;
}

interface Ingredient {
  name: string;
  emoji: string;
  stores: {
    name: string;
    price: number;
  }[];
}

const ingredients: Ingredient[] = [
  {
    name: "Flour (5 lbs)",
    emoji: "🌾",
    stores: [
      { name: "BulkMart", price: 8 },
      { name: "CornerStore", price: 12 },
      { name: "Budget Foods", price: 9 },
    ],
  },
  {
    name: "Sugar (2 lbs)",
    emoji: "🍚",
    stores: [
      { name: "BulkMart", price: 5 },
      { name: "CornerStore", price: 8 },
      { name: "Budget Foods", price: 6 },
    ],
  },
  {
    name: "Eggs (dozen)",
    emoji: "🥚",
    stores: [
      { name: "BulkMart", price: 4 },
      { name: "CornerStore", price: 6 },
      { name: "Budget Foods", price: 5 },
    ],
  },
  {
    name: "Butter (1 lb)",
    emoji: "🧈",
    stores: [
      { name: "BulkMart", price: 6 },
      { name: "CornerStore", price: 9 },
      { name: "Budget Foods", price: 7 },
    ],
  },
];

export default function Lesson5BakeSale({ onComplete }: Lesson5BakeSaleProps) {
  const [currentIngredient, setCurrentIngredient] = useState(0);
  const [selections, setSelections] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const revenue = 100; // Fixed revenue from bake sale

  const handleStoreSelect = (storeIndex: number) => {
    const newSelections = [...selections, storeIndex];
    setSelections(newSelections);

    if (currentIngredient < ingredients.length - 1) {
      setCurrentIngredient(currentIngredient + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    const totalCost = selections.reduce(
      (sum, storeIdx, ingredientIdx) =>
        sum + ingredients[ingredientIdx].stores[storeIdx].price,
      0
    );
    const profit = revenue - totalCost;
    const profitPercent = Math.round((profit / revenue) * 100);

    // Calculate the best possible cost
    const bestCost = ingredients.reduce(
      (sum, ingredient) =>
        sum + Math.min(...ingredient.stores.map((s) => s.price)),
      0
    );
    const maxProfit = revenue - bestCost;

    const rating =
      profitPercent >= 65
        ? "Expert!"
        : profitPercent >= 50
          ? "Great!"
          : profitPercent >= 35
            ? "Good"
            : "Try Again";

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="p-8 space-y-6">
            <div className="flex justify-center">
              <div
                className={`w-24 h-24 rounded-full ${
                  profitPercent >= 50
                    ? "bg-gradient-to-br from-green-500 to-emerald-500"
                    : "bg-gradient-to-br from-orange-500 to-amber-500"
                } flex items-center justify-center`}
              >
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold mb-2">{rating}</h2>
              <p className="text-lg text-muted-foreground">
                Your bake sale results
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Revenue (Fixed)</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${revenue}
                  </span>
                </div>
              </Card>

              <Card className="p-4 bg-red-50 dark:bg-red-950/30">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Your Costs</span>
                  <span className="text-2xl font-bold text-red-600">
                    -${totalCost}
                  </span>
                </div>
              </Card>

              <Card
                className={`p-4 ${
                  profit > 0
                    ? "bg-green-50 dark:bg-green-950/30"
                    : "bg-orange-50 dark:bg-orange-950/30"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground">Your Profit</p>
                    <p className="text-sm text-muted-foreground">
                      {profitPercent}% profit margin
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">
                      ${profit}
                    </p>
                    {profit > 0 && (
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">Profit!</span>
                      </div>
                    )}
                    {profit < 0 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <TrendingDown className="w-4 h-4" />
                        <span className="text-sm">Loss!</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4 bg-purple-50 dark:bg-purple-950/30">
              <h3 className="font-semibold mb-2">💡 Best Possible:</h3>
              <p className="text-sm text-muted-foreground mb-2">
                If you shopped at the cheapest stores for everything:
              </p>
              <div className="flex justify-between items-center">
                <span>Maximum Profit:</span>
                <span className="text-xl font-bold text-purple-600">
                  ${maxProfit} ({Math.round((maxProfit / revenue) * 100)}%
                  margin)
                </span>
              </div>
            </Card>

            <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
              <h3 className="font-semibold mb-2">🎓 Business Lesson:</h3>
              <p className="text-sm text-muted-foreground">
                In business, lower costs = higher profits! Smart shopping isn't
                just for personal budgets - entrepreneurs use these same skills
                to maximize their earnings.
              </p>
            </Card>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              onClick={onComplete}
            >
              Complete Lesson
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const ingredient = ingredients[currentIngredient];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
      <div className="max-w-3xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">The Bake Sale Business</h2>
            <div className="text-sm text-muted-foreground">
              Item {currentIngredient + 1} of {ingredients.length}
            </div>
          </div>

          <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 mb-6">
            <div className="space-y-2">
              <p className="font-semibold">Your Goal:</p>
              <p className="text-sm text-muted-foreground">
                You're organizing a bake sale that will earn ${revenue}. Buy all
                ingredients at the best prices to maximize your profit!
              </p>
            </div>
          </Card>

          <div className="mb-6">
            <div className="flex gap-1">
              {ingredients.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full ${
                    idx < currentIngredient
                      ? "bg-green-500"
                      : idx === currentIngredient
                        ? "bg-green-500"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{ingredient.emoji}</div>
              <h3 className="text-2xl font-bold mb-2">{ingredient.name}</h3>
              <p className="text-muted-foreground">
                Which store offers the best price?
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {ingredient.stores.map((store, idx) => {
                const isCheapest = store.price === Math.min(...ingredient.stores.map(s => s.price));
                return (
                  <Card
                    key={idx}
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      isCheapest ? "border-2 border-green-500/30" : ""
                    }`}
                    onClick={() => handleStoreSelect(idx)}
                  >
                    <div className="text-center space-y-3">
                      <h4 className="font-bold text-lg">{store.name}</h4>
                      <p className="text-3xl font-bold">${store.price}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
