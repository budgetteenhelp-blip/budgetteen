import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface Lesson4BudgetChallengeProps {
  onComplete: () => void;
}

interface BudgetChallenge {
  id: number;
  title: string;
  description: string;
  monthlyIncome: number;
  fixedExpenses: { name: string; amount: number }[];
  variableCategories: {
    name: string;
    min: number;
    recommended: number;
    max: number;
  }[];
  savingsGoal: number;
}

const challenges: BudgetChallenge[] = [
  {
    id: 1,
    title: "Summer Job Budget",
    description:
      "You have a summer job! Create a budget that includes savings for a new laptop ($600).",
    monthlyIncome: 400,
    fixedExpenses: [
      { name: "Phone bill (your share)", amount: 25 },
      { name: "Streaming subscription", amount: 10 },
    ],
    variableCategories: [
      { name: "Food & Snacks", min: 30, recommended: 60, max: 120 },
      { name: "Entertainment", min: 20, recommended: 40, max: 100 },
      { name: "Clothing", min: 10, recommended: 30, max: 80 },
      { name: "Transportation", min: 15, recommended: 25, max: 50 },
    ],
    savingsGoal: 150,
  },
  {
    id: 2,
    title: "Part-Time Hustle",
    description:
      "You're babysitting and dog-walking. Budget for both fun and your future!",
    monthlyIncome: 250,
    fixedExpenses: [{ name: "Club membership", amount: 15 }],
    variableCategories: [
      { name: "Food & Snacks", min: 20, recommended: 40, max: 80 },
      { name: "Entertainment & Hobbies", min: 25, recommended: 45, max: 75 },
      { name: "Gifts & Giving", min: 10, recommended: 20, max: 40 },
      { name: "Personal care", min: 10, recommended: 20, max: 35 },
    ],
    savingsGoal: 75,
  },
];

export default function Lesson4BudgetChallenge({
  onComplete,
}: Lesson4BudgetChallengeProps) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const challenge = challenges[currentChallenge];

  const fixedTotal = challenge.fixedExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  const variableTotal = challenge.variableCategories.reduce(
    (sum, cat) => sum + (allocations[cat.name] || 0),
    0
  );

  const savings = allocations["Savings"] || 0;
  const totalAllocated = fixedTotal + variableTotal + savings;
  const remaining = challenge.monthlyIncome - totalAllocated;

  const handleSliderChange = (category: string, value: number[]) => {
    setAllocations({ ...allocations, [category]: value[0] });
    setSubmitted(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setAllocations({});
      setSubmitted(false);
    } else {
      onComplete();
    }
  };

  const meetsGoals =
    Math.abs(remaining) < 1 && savings >= challenge.savingsGoal;

  const allCategoriesSet =
    challenge.variableCategories.every(
      (cat) => allocations[cat.name] !== undefined
    ) && allocations["Savings"] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4">
      <div className="max-w-4xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Budget Challenge</h2>
            <div className="text-sm text-muted-foreground">
              Challenge {currentChallenge + 1} of {challenges.length}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
              <p className="text-muted-foreground">{challenge.description}</p>
            </div>

            <Card className="p-4 bg-muted">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Monthly Income
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ${challenge.monthlyIncome}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Savings Goal</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${challenge.savingsGoal}+
                  </p>
                </div>
              </div>
            </Card>

            <div>
              <h4 className="font-semibold mb-3">Fixed Expenses</h4>
              <div className="space-y-2">
                {challenge.fixedExpenses.map((expense, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                  >
                    <span>{expense.name}</span>
                    <span className="font-semibold">${expense.amount}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg font-semibold">
                  <span>Total Fixed</span>
                  <span>${fixedTotal}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Allocate Your Remaining Money
              </h4>
              <div className="space-y-4">
                {challenge.variableCategories.map((category) => {
                  const value = allocations[category.name] || 0;
                  return (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-lg font-bold">${value}</span>
                      </div>
                      <Slider
                        value={[value]}
                        onValueChange={(val) =>
                          handleSliderChange(category.name, val)
                        }
                        min={category.min}
                        max={category.max}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Min: ${category.min}</span>
                        <span>Recommended: ${category.recommended}</span>
                        <span>Max: ${category.max}</span>
                      </div>
                    </div>
                  );
                })}

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Savings</span>
                    <span className="text-lg font-bold">
                      ${allocations["Savings"] || 0}
                    </span>
                  </div>
                  <Slider
                    value={[allocations["Savings"] || 0]}
                    onValueChange={(val) => handleSliderChange("Savings", val)}
                    min={0}
                    max={challenge.monthlyIncome - fixedTotal}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Goal: ${challenge.savingsGoal} or more
                  </p>
                </div>
              </div>
            </div>

            <Card
              className={`p-4 ${
                remaining === 0
                  ? "bg-green-50 dark:bg-green-950"
                  : remaining > 0
                    ? "bg-yellow-50 dark:bg-yellow-950"
                    : "bg-red-50 dark:bg-red-950"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Remaining to Allocate
                  </p>
                  <p className="text-2xl font-bold">${remaining.toFixed(2)}</p>
                </div>
                {remaining === 0 && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                {remaining > 0 && <AlertCircle className="w-6 h-6 text-yellow-600" />}
                {remaining < 0 && <XCircle className="w-6 h-6 text-red-600" />}
              </div>
            </Card>

            {submitted && (
              <Card className="p-4 bg-muted">
                {meetsGoals ? (
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-green-600">
                        Excellent Budget! ✓
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        You've allocated all your income and met your savings
                        goal. This is a realistic and balanced budget!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 items-start">
                    <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-red-600">
                        Keep Working On It
                      </p>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        {Math.abs(remaining) >= 1 && (
                          <li>
                            • You need to allocate all ${challenge.monthlyIncome}{" "}
                            (currently ${remaining.toFixed(2)} remaining)
                          </li>
                        )}
                        {savings < challenge.savingsGoal && (
                          <li>
                            • Your savings (${savings}) should be at least $
                            {challenge.savingsGoal}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </Card>
            )}

            <div className="flex gap-3">
              {!submitted ? (
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={handleSubmit}
                  disabled={!allCategoriesSet}
                >
                  Check My Budget
                </Button>
              ) : (
                meetsGoals && (
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={handleNext}
                  >
                    {currentChallenge < challenges.length - 1
                      ? "Next Challenge"
                      : "Complete Lesson"}
                  </Button>
                )
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
