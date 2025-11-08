import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Trees, TrendingUp, Sparkles } from "lucide-react";

interface Lesson3MoneyTreesProps {
  onComplete: () => void;
}

export default function Lesson3MoneyTrees({
  onComplete,
}: Lesson3MoneyTreesProps) {
  const [stage, setStage] = useState(1);
  const [initialAmount, setInitialAmount] = useState(100);
  const [years, setYears] = useState(5);
  const [interestRate] = useState(5); // 5% interest

  const calculateCompound = (principal: number, rate: number, time: number) => {
    return principal * Math.pow(1 + rate / 100, time);
  };

  const calculateSimple = (principal: number, rate: number, time: number) => {
    return principal + principal * rate * time / 100;
  };

  const compoundTotal = calculateCompound(initialAmount, interestRate, years);
  const simpleTotal = calculateSimple(initialAmount, interestRate, years);
  const compoundInterest = compoundTotal - initialAmount;
  const simpleInterest = simpleTotal - initialAmount;
  const difference = compoundTotal - simpleTotal;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4">
      <div className="max-w-3xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <h2 className="text-3xl font-bold text-center mb-2">
            The Magic Money Trees
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Watch how your savings grow over time with the power of compound
            interest!
          </p>

          {stage === 1 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Trees className="w-16 h-16 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">
                  The Secret of Compound Interest
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Imagine planting a magic money tree. Not only does your tree
                  grow bigger each year, but the branches it grows also grow
                  their own branches! That's compound interest - you earn
                  interest on your interest!
                </p>
                <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
                  <p className="font-semibold text-blue-700 dark:text-blue-300">
                    💡 Simple Interest: Your $100 earns $5 every year = $5
                    each year
                  </p>
                  <p className="font-semibold text-blue-700 dark:text-blue-300 mt-2">
                    ✨ Compound Interest: Your $100 earns $5, then that $105
                    earns even more = Growing faster!
                  </p>
                </Card>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                onClick={() => setStage(2)}
              >
                Try the Calculator!
              </Button>
            </div>
          )}

          {stage === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="font-semibold mb-2 block">
                    Starting Amount: ${initialAmount}
                  </label>
                  <Slider
                    value={[initialAmount]}
                    onValueChange={(val) => setInitialAmount(val[0])}
                    min={50}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$50</span>
                    <span>$500</span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold mb-2 block">
                    Number of Years: {years}
                  </label>
                  <Slider
                    value={[years]}
                    onValueChange={(val) => setYears(val[0])}
                    min={1}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 year</span>
                    <span>20 years</span>
                  </div>
                </div>

                <Card className="p-4 bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">
                    Interest Rate (Fixed)
                  </p>
                  <p className="text-2xl font-bold">{interestRate}% per year</p>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-orange-50 dark:bg-orange-950/30">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <h4 className="font-semibold">Simple Interest</h4>
                  </div>
                  <p className="text-3xl font-bold text-orange-600">
                    ${simpleTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Earned: ${simpleInterest.toFixed(2)}
                  </p>
                </Card>

                <Card className="p-4 bg-green-50 dark:bg-green-950/30 border-2 border-green-500">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold">Compound Interest</h4>
                  </div>
                  <p className="text-3xl font-bold text-green-600">
                    ${compoundTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Earned: ${compoundInterest.toFixed(2)}
                  </p>
                </Card>
              </div>

              <Card className="p-4 bg-purple-50 dark:bg-purple-950/30">
                <p className="font-semibold text-center">
                  🎉 Compound Interest earns you an extra{" "}
                  <span className="text-purple-600 text-xl">
                    ${difference.toFixed(2)}
                  </span>{" "}
                  more!
                </p>
              </Card>

              <div className="space-y-3">
                <h4 className="font-semibold">Year-by-Year Growth:</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {Array.from({ length: years }, (_, i) => i + 1).map(
                    (year) => {
                      const amount = calculateCompound(
                        initialAmount,
                        interestRate,
                        year
                      );
                      const growth = amount - initialAmount;
                      return (
                        <div
                          key={year}
                          className="flex justify-between items-center p-2 bg-muted rounded"
                        >
                          <span className="font-medium">Year {year}</span>
                          <div className="text-right">
                            <p className="font-bold">${amount.toFixed(2)}</p>
                            <p className="text-xs text-green-600">
                              +${growth.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStage(1)}>
                  Back
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
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
