import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Props {
  onComplete: () => void;
}

interface TradeScenario {
  person1: { name: string; emoji: string; has: string; wants: string };
  person2: { name: string; emoji: string; has: string; wants: string };
  canTrade: boolean;
  explanation: string;
}

const scenarios: TradeScenario[] = [
  {
    person1: { name: "Baker Betty", emoji: "👩‍🍳", has: "Bread", wants: "Apples" },
    person2: { name: "Farmer Fred", emoji: "👨‍🌾", has: "Apples", wants: "Bread" },
    canTrade: true,
    explanation: "Perfect match! Betty has bread and wants apples. Fred has apples and wants bread. They can trade!",
  },
  {
    person1: { name: "Teacher Tom", emoji: "👨‍🏫", has: "Books", wants: "Shoes" },
    person2: { name: "Farmer Fred", emoji: "👨‍🌾", has: "Vegetables", wants: "Books" },
    canTrade: false,
    explanation: "No trade! Tom wants shoes, but Fred doesn't have shoes. Fred wants books, but Tom needs to keep his books to teach!",
  },
  {
    person1: { name: "Artist Amy", emoji: "👩‍🎨", has: "Paintings", wants: "Milk" },
    person2: { name: "Dairy Dan", emoji: "🧑‍🌾", has: "Milk", wants: "Paintings" },
    canTrade: true,
    explanation: "Great trade! Amy's paintings will decorate Dan's farm, and Dan's milk will help Amy stay healthy while she paints!",
  },
  {
    person1: { name: "Mechanic Mike", emoji: "👨‍🔧", has: "Car Repairs", wants: "Haircut" },
    person2: { name: "Barber Bob", emoji: "💈", has: "Haircuts", wants: "Car Repairs" },
    canTrade: true,
    explanation: "Perfect! Mike can fix Bob's car, and Bob can give Mike a haircut. Both get what they need!",
  },
];

export default function Lesson2TradingGame({ onComplete }: Props) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === scenario.canTrade) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  const isCorrect = selectedAnswer === scenario.canTrade;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 p-4 dark:from-amber-950 dark:to-orange-950">
      <Card className="w-full max-w-3xl border-4 border-amber-300 dark:border-amber-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-amber-900 dark:text-amber-100">
            🔄 The Trading Game
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Can these people trade with each other?
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <div className="text-lg font-semibold">
              Round {currentScenario + 1} of {scenarios.length}
            </div>
            <div className="text-lg font-semibold text-green-600">
              Score: {score}/{scenarios.length}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Person 1 */}
            <Card className="border-2 border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/30">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-3">{scenario.person1.emoji}</div>
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
                  {scenario.person1.name}
                </h3>
                <div className="space-y-2">
                  <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-3">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      Has: {scenario.person1.has}
                    </p>
                  </div>
                  <div className="rounded-lg bg-orange-100 dark:bg-orange-900/30 p-3">
                    <p className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                      Wants: {scenario.person1.wants}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Person 2 */}
            <Card className="border-2 border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-950/30">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-3">{scenario.person2.emoji}</div>
                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-3">
                  {scenario.person2.name}
                </h3>
                <div className="space-y-2">
                  <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-3">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      Has: {scenario.person2.has}
                    </p>
                  </div>
                  <div className="rounded-lg bg-orange-100 dark:bg-orange-900/30 p-3">
                    <p className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                      Wants: {scenario.person2.wants}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {!showFeedback ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                size="lg"
                className="h-20 bg-gradient-to-r from-green-500 to-emerald-500 text-xl font-bold hover:from-green-600 hover:to-emerald-600"
                onClick={() => handleAnswer(true)}
              >
                <CheckCircleIcon className="mr-2 size-6" />
                Yes, They Can Trade!
              </Button>
              <Button
                size="lg"
                className="h-20 bg-gradient-to-r from-red-500 to-rose-500 text-xl font-bold hover:from-red-600 hover:to-rose-600"
                onClick={() => handleAnswer(false)}
              >
                <XCircleIcon className="mr-2 size-6" />
                No, They Can't Trade
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Card
                className={cn(
                  "border-2",
                  isCorrect
                    ? "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/30"
                    : "border-red-400 bg-red-50 dark:border-red-700 dark:bg-red-950/30",
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {isCorrect ? (
                      <>
                        <CheckCircleIcon className="size-8 text-green-600" />
                        <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">
                          Correct! 🎉
                        </h3>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="size-8 text-red-600" />
                        <h3 className="text-2xl font-bold text-red-900 dark:text-red-100">
                          Not Quite!
                        </h3>
                      </>
                    )}
                  </div>
                  <p className="text-lg text-foreground">{scenario.explanation}</p>
                </CardContent>
              </Card>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-lg font-bold hover:from-amber-600 hover:to-yellow-600"
                onClick={handleNext}
              >
                {currentScenario < scenarios.length - 1
                  ? "Next Round →"
                  : `Complete Lesson! (${score}/${scenarios.length}) ⭐⭐`}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
