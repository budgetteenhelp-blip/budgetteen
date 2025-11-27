import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  TrendingUp,
  GraduationCap,
  Car,
  Home,
  Sparkles,
} from "lucide-react";

interface Lesson5FuturePlanningProps {
  onComplete: () => void;
}

export default function Lesson5FuturePlanning({
  onComplete,
}: Lesson5FuturePlanningProps) {
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState({
    college: false,
    car: false,
    travel: false,
    business: false,
  });
  const [timeframe, setTimeframe] = useState(5);
  const [monthlyIncome, setMonthlyIncome] = useState(500);
  const [savingsRate, setSavingsRate] = useState(20);

  const monthlySavings = (monthlyIncome * savingsRate) / 100;
  const totalSaved = monthlySavings * 12 * timeframe;

  const goalCosts = {
    college: 10000,
    car: 8000,
    travel: 3000,
    business: 5000,
  };

  const totalGoalCost = Object.entries(goals).reduce(
    (sum, [key, selected]) =>
      sum + (selected ? goalCosts[key as keyof typeof goalCosts] : 0),
    0
  );

  const canAffordGoals = totalSaved >= totalGoalCost;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4">
      <div className="max-w-3xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <h2 className="text-3xl font-bold text-center mb-2">
            Plan Your Financial Future
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Let's think ahead and plan for your dreams!
          </p>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  What are your goals for the next 5-10 years?
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      goals.college
                        ? "border-purple-500 border-2 bg-purple-50 dark:bg-purple-950"
                        : "hover:border-purple-300"
                    }`}
                    onClick={() =>
                      setGoals({ ...goals, college: !goals.college })
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">College Fund</h4>
                        <p className="text-sm text-muted-foreground">
                          ~$10,000
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      goals.car
                        ? "border-purple-500 border-2 bg-purple-50 dark:bg-purple-950"
                        : "hover:border-purple-300"
                    }`}
                    onClick={() => setGoals({ ...goals, car: !goals.car })}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                        <Car className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">First Car</h4>
                        <p className="text-sm text-muted-foreground">~$8,000</p>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      goals.travel
                        ? "border-purple-500 border-2 bg-purple-50 dark:bg-purple-950"
                        : "hover:border-purple-300"
                    }`}
                    onClick={() =>
                      setGoals({ ...goals, travel: !goals.travel })
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <Home className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Travel Adventure</h4>
                        <p className="text-sm text-muted-foreground">~$3,000</p>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      goals.business
                        ? "border-purple-500 border-2 bg-purple-50 dark:bg-purple-950"
                        : "hover:border-purple-300"
                    }`}
                    onClick={() =>
                      setGoals({ ...goals, business: !goals.business })
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Start a Business</h4>
                        <p className="text-sm text-muted-foreground">~$5,000</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {Object.values(goals).some((g) => g) && (
                <Card className="p-4 bg-muted">
                  <p className="font-semibold mb-2">Total Goal Cost:</p>
                  <p className="text-3xl font-bold text-purple-600">
                    ${totalGoalCost.toLocaleString()}
                  </p>
                </Card>
              )}

              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => setStep(2)}
                disabled={!Object.values(goals).some((g) => g)}
              >
                Next: Plan Your Savings
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Let's create your savings plan
                </h3>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>How many years until you need this money?</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[timeframe]}
                        onValueChange={(val) => setTimeframe(val[0])}
                        min={1}
                        max={10}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold w-16 text-right">
                        {timeframe}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      1 to 10 years
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Expected monthly income (from jobs, allowance, etc.)
                    </Label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">$</span>
                      <Input
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) =>
                          setMonthlyIncome(Number(e.target.value))
                        }
                        min={0}
                        max={2000}
                        step={50}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      What percentage will you save each month? ({savingsRate}%)
                    </Label>
                    <Slider
                      value={[savingsRate]}
                      onValueChange={(val) => setSavingsRate(val[0])}
                      min={5}
                      max={80}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5%</span>
                      <span>50% (Recommended)</span>
                      <span>80%</span>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 space-y-3">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <TrendingUp className="w-5 h-5" />
                  <h4 className="font-semibold">Your Savings Projection</h4>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Per Month</p>
                    <p className="text-2xl font-bold">
                      ${monthlySavings.toFixed(0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Per Year</p>
                    <p className="text-2xl font-bold">
                      ${(monthlySavings * 12).toFixed(0)}
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground">
                    Total After {timeframe} Years
                  </p>
                  <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                    ${totalSaved.toFixed(0)}
                  </p>
                </div>
              </Card>

              <Card
                className={`p-4 ${
                  canAffordGoals
                    ? "bg-green-50 dark:bg-green-950"
                    : "bg-yellow-50 dark:bg-yellow-950"
                }`}
              >
                {canAffordGoals ? (
                  <div>
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-2">
                      🎉 You can reach your goals!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      With this plan, you'll save ${totalSaved.toFixed(0)},
                      which is enough for your goals (${totalGoalCost.toLocaleString()}). You'll even have $
                      {(totalSaved - totalGoalCost).toFixed(0)} extra!
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                      ⚠️ You're ${(totalGoalCost - totalSaved).toFixed(0)}{" "}
                      short
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Try adjusting your plan:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Increase your savings percentage</li>
                      <li>• Extend your timeframe</li>
                      <li>• Look for ways to increase income</li>
                      <li>• Prioritize your most important goals</li>
                    </ul>
                  </div>
                )}
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={onComplete}
                >
                  Complete Lesson
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
