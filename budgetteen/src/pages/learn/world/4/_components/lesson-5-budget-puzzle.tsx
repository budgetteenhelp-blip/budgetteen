import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { CheckCircleIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

export default function Lesson5BudgetPuzzle({ onComplete }: Props) {
  const monthlyIncome = 100;
  const [needsPercent, setNeedsPercent] = useState(50);
  const [wantsPercent, setWantsPercent] = useState(30);
  const [savingsPercent, setSavingsPercent] = useState(20);
  const [isComplete, setIsComplete] = useState(false);

  const needsAmount = Math.round((monthlyIncome * needsPercent) / 100);
  const wantsAmount = Math.round((monthlyIncome * wantsPercent) / 100);
  const savingsAmount = Math.round((monthlyIncome * savingsPercent) / 100);
  const totalPercent = needsPercent + wantsPercent + savingsPercent;
  const totalAmount = needsAmount + wantsAmount + savingsAmount;

  const isBalanced = totalPercent === 100;
  const follows502020 =
    needsPercent === 50 && wantsPercent === 30 && savingsPercent === 20;

  const handleCheckBudget = () => {
    if (isBalanced) {
      setIsComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 p-4 dark:from-blue-950 dark:to-cyan-950 py-8">
      <div className="mx-auto max-w-4xl">
        <Card className="border-4 border-blue-300 dark:border-blue-700">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-blue-900 dark:text-blue-100">
              🧩 Monthly Budget Puzzle
            </CardTitle>
            <p className="text-center text-lg text-muted-foreground">
              Create a balanced budget for your ${monthlyIncome} monthly income
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="border-2 border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/30">
              <CardContent className="p-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">
                  Monthly Income
                </div>
                <div className="text-5xl font-bold text-green-600">
                  ${monthlyIncome}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Needs Slider */}
              <Card className="border-2 border-red-300 dark:border-red-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🏠</span>
                      <h3 className="text-xl font-bold text-red-900 dark:text-red-100">
                        Needs
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-red-600">
                        {needsPercent}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${needsAmount}
                      </div>
                    </div>
                  </div>
                  <Slider
                    value={[needsPercent]}
                    onValueChange={(value) => setNeedsPercent(value[0])}
                    max={100}
                    step={5}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Food, clothes, school supplies, necessities
                  </p>
                </CardContent>
              </Card>

              {/* Wants Slider */}
              <Card className="border-2 border-blue-300 dark:border-blue-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🎉</span>
                      <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                        Wants
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        {wantsPercent}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${wantsAmount}
                      </div>
                    </div>
                  </div>
                  <Slider
                    value={[wantsPercent]}
                    onValueChange={(value) => setWantsPercent(value[0])}
                    max={100}
                    step={5}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Games, movies, treats, entertainment
                  </p>
                </CardContent>
              </Card>

              {/* Savings Slider */}
              <Card className="border-2 border-green-300 dark:border-green-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">🐷</span>
                      <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
                        Savings
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">
                        {savingsPercent}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${savingsAmount}
                      </div>
                    </div>
                  </div>
                  <Slider
                    value={[savingsPercent]}
                    onValueChange={(value) => setSavingsPercent(value[0])}
                    max={100}
                    step={5}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Emergency fund, future goals, investments
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card
              className={`border-2 ${
                isBalanced
                  ? "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/30"
                  : "border-orange-400 bg-orange-50 dark:border-orange-700 dark:bg-orange-950/30"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">Budget Summary</h3>
                  {isBalanced && (
                    <CheckCircleIcon className="size-8 text-green-600" />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Total Percentage
                    </div>
                    <div
                      className={`text-3xl font-bold ${
                        isBalanced ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      {totalPercent}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Total Amount
                    </div>
                    <div
                      className={`text-3xl font-bold ${
                        isBalanced ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      ${totalAmount}
                    </div>
                  </div>
                </div>
                {!isBalanced && (
                  <p className="text-center text-orange-600 mt-3 font-semibold">
                    ⚠️ Your budget must total exactly 100%!
                  </p>
                )}
                {isBalanced && !follows502020 && (
                  <p className="text-center text-blue-600 mt-3">
                    Balanced! Try the 50/30/20 rule for best results.
                  </p>
                )}
                {follows502020 && (
                  <p className="text-center text-green-600 mt-3 font-semibold">
                    ✓ Perfect! You're using the 50/30/20 rule!
                  </p>
                )}
              </CardContent>
            </Card>

            {!isComplete ? (
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-bold hover:from-blue-600 hover:to-cyan-600"
                onClick={handleCheckBudget}
                disabled={!isBalanced}
              >
                {isBalanced ? "Complete Budget!" : "Balance Your Budget First"}
              </Button>
            ) : (
              <Card className="border-2 border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/30">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-5xl">🎉</div>
                  <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">
                    Budget Complete!
                  </h3>
                  <p className="text-lg text-foreground">
                    You've created a balanced budget! {follows502020 && "And you followed the 50/30/20 rule - excellent work!"}
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-bold hover:from-blue-600 hover:to-cyan-600"
                    onClick={onComplete}
                  >
                    Complete Lesson! ⭐⭐⭐
                  </Button>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
