import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { CoinsIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

interface Category {
  name: string;
  emoji: string;
  description: string;
  actualPercent: number;
  minPercent: number;
  maxPercent: number;
}

const categories: Category[] = [
  {
    name: "Education",
    emoji: "🎓",
    description: "Public schools, teachers, libraries",
    actualPercent: 15,
    minPercent: 5,
    maxPercent: 30,
  },
  {
    name: "Healthcare",
    emoji: "🏥",
    description: "Hospitals, medical care, public health",
    actualPercent: 25,
    minPercent: 10,
    maxPercent: 40,
  },
  {
    name: "Infrastructure",
    emoji: "🛣️",
    description: "Roads, bridges, public transportation",
    actualPercent: 10,
    minPercent: 5,
    maxPercent: 25,
  },
  {
    name: "Defense & Safety",
    emoji: "🛡️",
    description: "Military, police, firefighters",
    actualPercent: 20,
    minPercent: 10,
    maxPercent: 35,
  },
  {
    name: "Social Programs",
    emoji: "🤝",
    description: "Help for low-income families, elderly, disabled",
    actualPercent: 20,
    minPercent: 10,
    maxPercent: 35,
  },
  {
    name: "Environment",
    emoji: "🌳",
    description: "Parks, conservation, climate programs",
    actualPercent: 5,
    minPercent: 2,
    maxPercent: 15,
  },
  {
    name: "Government Operations",
    emoji: "🏛️",
    description: "Courts, elections, public services",
    actualPercent: 5,
    minPercent: 2,
    maxPercent: 15,
  },
];

export default function Lesson4TaxGame({ onComplete }: Props) {
  const [allocations, setAllocations] = useState<Record<string, number>>(
    categories.reduce((acc, cat) => ({ ...acc, [cat.name]: 100 / categories.length }), {})
  );
  const [showResults, setShowResults] = useState(false);

  const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);

  const handleSliderChange = (categoryName: string, value: number[]) => {
    setAllocations({
      ...allocations,
      [categoryName]: value[0],
    });
  };

  const handleCheckBudget = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    categories.forEach((cat) => {
      const userAlloc = allocations[cat.name];
      const difference = Math.abs(userAlloc - cat.actualPercent);
      // Score based on how close to actual (max 100 points total)
      const categoryScore = Math.max(0, (15 - difference) * (100 / categories.length) / 15);
      score += categoryScore;
    });
    return Math.round(score);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 dark:from-teal-950 dark:via-green-950 dark:to-emerald-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-teal-300 dark:border-teal-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">💵</div>
            <CardTitle className="text-2xl font-bold text-teal-900 dark:text-teal-100">
              Tax Budget Challenge
            </CardTitle>
            <p className="text-muted-foreground">
              Allocate $100 of tax money across different categories
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {!showResults ? (
              <>
                <div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-950/50">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-foreground">Total Allocated:</span>
                    <span className={`text-2xl font-bold ${
                      Math.abs(totalAllocated - 100) < 0.5
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}>
                      ${totalAllocated.toFixed(0)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Adjust sliders so total equals $100
                  </p>
                </div>

                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{category.emoji}</span>
                          <div>
                            <p className="font-semibold text-foreground">{category.name}</p>
                            <p className="text-xs text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-teal-900 dark:text-teal-100">
                          ${allocations[category.name].toFixed(0)}
                        </span>
                      </div>
                      <Slider
                        value={[allocations[category.name]]}
                        onValueChange={(value) => handleSliderChange(category.name, value)}
                        min={category.minPercent}
                        max={category.maxPercent}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  onClick={handleCheckBudget}
                  disabled={Math.abs(totalAllocated - 100) > 0.5}
                  className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600"
                >
                  Check My Budget
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 p-6 dark:from-green-950/50 dark:to-emerald-950/50 text-center">
                  <p className="mb-2 text-lg font-bold text-green-900 dark:text-green-100">
                    Your Budget Score
                  </p>
                  <div className="flex items-center justify-center gap-2 text-4xl font-bold text-green-600">
                    <CoinsIcon className="size-8" />
                    {calculateScore()}%
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 dark:bg-card">
                  <h4 className="mb-3 font-bold text-foreground">
                    How Your Budget Compares to Typical Government Spending:
                  </h4>
                  <div className="space-y-3">
                    {categories.map((cat) => {
                      const userAlloc = allocations[cat.name];
                      const diff = userAlloc - cat.actualPercent;
                      return (
                        <div key={cat.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{cat.emoji}</span>
                            <span className="font-medium">{cat.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-muted-foreground">
                              You: ${userAlloc.toFixed(0)}
                            </span>
                            <span className="font-semibold">
                              Actual: ${cat.actualPercent}
                            </span>
                            {Math.abs(diff) < 5 && (
                              <span className="text-green-600">✓</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                  <p className="text-sm text-foreground">
                    💡 <strong>Remember:</strong> Real government budgets are complex and vary by
                    country and state. These are simplified percentages to help you understand
                    how tax money gets distributed across different priorities!
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={onComplete}
                  className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600"
                >
                  Complete Lesson
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
