import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Props {
  onComplete: () => void;
}

interface Item {
  id: number;
  name: string;
  emoji: string;
  amount: number;
  category: "income" | "needs" | "wants" | "savings";
  explanation: string;
}

const items: Item[] = [
  {
    id: 1,
    name: "Allowance",
    emoji: "💵",
    amount: 20,
    category: "income",
    explanation: "Allowance is money you receive - it's INCOME!",
  },
  {
    id: 2,
    name: "School Lunch",
    emoji: "🍎",
    amount: 15,
    category: "needs",
    explanation: "Lunch is a NEED - you must eat to stay healthy and learn!",
  },
  {
    id: 3,
    name: "Birthday Money",
    emoji: "🎁",
    amount: 50,
    category: "income",
    explanation: "Birthday money is INCOME - money you received!",
  },
  {
    id: 4,
    name: "Movie Ticket",
    emoji: "🎬",
    amount: 12,
    category: "wants",
    explanation: "Movies are fun but not necessary - that's a WANT!",
  },
  {
    id: 5,
    name: "Winter Coat",
    emoji: "🧥",
    amount: 40,
    category: "needs",
    explanation: "A coat protects you from cold - it's a NEED!",
  },
  {
    id: 6,
    name: "Video Game",
    emoji: "🎮",
    amount: 25,
    category: "wants",
    explanation: "Video games are entertainment - they're WANTS!",
  },
  {
    id: 7,
    name: "Emergency Fund",
    emoji: "🏦",
    amount: 10,
    category: "savings",
    explanation: "Putting money aside for later is SAVINGS!",
  },
  {
    id: 8,
    name: "Saving for Bike",
    emoji: "🚲",
    amount: 30,
    category: "savings",
    explanation: "Money you're saving for a future purchase is SAVINGS!",
  },
];

export default function Lesson2BudgetGame({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const item = items[currentIndex];

  const categories = [
    { id: "income", name: "Income", emoji: "💰", color: "from-green-500 to-emerald-500" },
    { id: "needs", name: "Needs", emoji: "🏠", color: "from-red-500 to-rose-500" },
    { id: "wants", name: "Wants", emoji: "🎉", color: "from-blue-500 to-cyan-500" },
    { id: "savings", name: "Savings", emoji: "🐷", color: "from-purple-500 to-pink-500" },
  ];

  const handleAnswer = (category: string) => {
    setSelectedAnswer(category);
    setShowFeedback(true);

    if (category === item.category) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  const isCorrect = selectedAnswer === item.category;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 p-4 dark:from-blue-950 dark:to-cyan-950">
      <Card className="w-full max-w-3xl border-4 border-blue-300 dark:border-blue-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-900 dark:text-blue-100">
            📊 Budget Basics Game
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Sort each item into the correct budget category!
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <div className="text-lg font-semibold">
              Item {currentIndex + 1} of {items.length}
            </div>
            <div className="text-lg font-semibold text-green-600">
              Score: {score}/{items.length}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 dark:border-orange-700 dark:from-orange-950/30 dark:to-amber-950/30">
            <CardContent className="p-8 text-center">
              <div className="text-8xl mb-4">{item.emoji}</div>
              <h3 className="text-3xl font-bold text-orange-900 dark:text-orange-100 mb-2">
                {item.name}
              </h3>
              <div className="text-2xl font-bold text-green-600">${item.amount}</div>
            </CardContent>
          </Card>

          {!showFeedback ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  size="lg"
                  className={cn(
                    "h-24 text-xl font-bold bg-gradient-to-r hover:scale-105 transition-transform",
                    cat.color,
                  )}
                  onClick={() => handleAnswer(cat.id)}
                >
                  <div>
                    <div className="text-3xl mb-1">{cat.emoji}</div>
                    <div>{cat.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <Card
                className={cn(
                  "border-2",
                  isCorrect
                    ? "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/30"
                    : "border-orange-400 bg-orange-50 dark:border-orange-700 dark:bg-orange-950/30",
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {isCorrect ? (
                      <>
                        <CheckCircleIcon className="size-8 text-green-600" />
                        <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">
                          Perfect! 🎉
                        </h3>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="size-8 text-orange-600" />
                        <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                          Not quite!
                        </h3>
                      </>
                    )}
                  </div>
                  <p className="text-lg text-foreground">{item.explanation}</p>
                </CardContent>
              </Card>

              {currentIndex === items.length - 1 && (
                <Card className="border-2 border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                      💡 Budget Categories:
                    </h3>
                    <ul className="space-y-1 text-foreground">
                      <li>💰 <strong>Income:</strong> Money coming in</li>
                      <li>🏠 <strong>Needs:</strong> Must-have expenses</li>
                      <li>🎉 <strong>Wants:</strong> Nice-to-have purchases</li>
                      <li>🐷 <strong>Savings:</strong> Money for the future</li>
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-bold hover:from-blue-600 hover:to-cyan-600"
                onClick={handleNext}
              >
                {currentIndex < items.length - 1
                  ? "Next Item →"
                  : `Complete Lesson! (${score}/${items.length}) ⭐⭐`}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
