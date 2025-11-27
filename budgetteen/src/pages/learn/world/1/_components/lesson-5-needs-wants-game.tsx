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
  isNeed: boolean;
  explanation: string;
}

const items: Item[] = [
  {
    id: 1,
    name: "Food",
    emoji: "🍎",
    isNeed: true,
    explanation: "Food is a NEED! Your body needs food to grow, be healthy, and have energy.",
  },
  {
    id: 2,
    name: "Video Game",
    emoji: "🎮",
    isNeed: false,
    explanation: "Video games are a WANT! They're fun, but you don't need them to survive.",
  },
  {
    id: 3,
    name: "Water",
    emoji: "💧",
    isNeed: true,
    explanation: "Water is a NEED! You must drink water every day to stay alive and healthy.",
  },
  {
    id: 4,
    name: "Candy",
    emoji: "🍭",
    isNeed: false,
    explanation: "Candy is a WANT! It tastes good but isn't necessary for your health.",
  },
  {
    id: 5,
    name: "Winter Coat",
    emoji: "🧥",
    isNeed: true,
    explanation: "A coat is a NEED! It keeps you warm and protects you from cold weather.",
  },
  {
    id: 6,
    name: "Designer Shoes",
    emoji: "👟",
    isNeed: false,
    explanation: "Designer shoes are a WANT! You need shoes, but expensive brands are optional.",
  },
  {
    id: 7,
    name: "Medicine",
    emoji: "💊",
    isNeed: true,
    explanation: "Medicine is a NEED! When you're sick, medicine helps you get better.",
  },
  {
    id: 8,
    name: "Toys",
    emoji: "🧸",
    isNeed: false,
    explanation: "Toys are a WANT! They make life fun, but you can live without them.",
  },
  {
    id: 9,
    name: "Home/Shelter",
    emoji: "🏠",
    isNeed: true,
    explanation: "A home is a NEED! Everyone needs a safe place to live and sleep.",
  },
  {
    id: 10,
    name: "Movie Tickets",
    emoji: "🎬",
    isNeed: false,
    explanation: "Movies are a WANT! They're entertaining, but not necessary for survival.",
  },
];

export default function Lesson5NeedsWantsGame({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [needsCount, setNeedsCount] = useState(0);
  const [wantsCount, setWantsCount] = useState(0);

  const item = items[currentIndex];

  const handleAnswer = (isNeed: boolean) => {
    setSelectedAnswer(isNeed);
    setShowFeedback(true);

    if (isNeed === item.isNeed) {
      setScore(score + 1);
    }

    if (item.isNeed) {
      setNeedsCount(needsCount + 1);
    } else {
      setWantsCount(wantsCount + 1);
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

  const isCorrect = selectedAnswer === item.isNeed;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 p-4 dark:from-amber-950 dark:to-orange-950">
      <Card className="w-full max-w-2xl border-4 border-amber-300 dark:border-amber-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-amber-900 dark:text-amber-100">
            🎯 Needs vs. Wants
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Is this item a NEED or a WANT?
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {needsCount} 💚
              </div>
              <div className="text-xs text-muted-foreground">Needs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {wantsCount} 💙
              </div>
              <div className="text-xs text-muted-foreground">Wants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {score}/{items.length}
              </div>
              <div className="text-xs text-muted-foreground">Score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 dark:border-purple-700 dark:from-purple-950/30 dark:to-pink-950/30">
            <CardContent className="p-8 text-center">
              <div className="text-8xl mb-4 animate-bounce">{item.emoji}</div>
              <h3 className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {item.name}
              </h3>
            </CardContent>
          </Card>

          {!showFeedback ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                size="lg"
                className="h-24 bg-gradient-to-r from-green-500 to-emerald-500 text-xl font-bold hover:from-green-600 hover:to-emerald-600"
                onClick={() => handleAnswer(true)}
              >
                <div>
                  <div className="text-3xl mb-1">💚</div>
                  <div>NEED</div>
                  <div className="text-xs font-normal">
                    Must have to survive
                  </div>
                </div>
              </Button>
              <Button
                size="lg"
                className="h-24 bg-gradient-to-r from-blue-500 to-cyan-500 text-xl font-bold hover:from-blue-600 hover:to-cyan-600"
                onClick={() => handleAnswer(false)}
              >
                <div>
                  <div className="text-3xl mb-1">💙</div>
                  <div>WANT</div>
                  <div className="text-xs font-normal">
                    Nice to have, but optional
                  </div>
                </div>
              </Button>
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
                          Correct! 🎉
                        </h3>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="size-8 text-orange-600" />
                        <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                          Not quite, but good try!
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
                      💡 Remember:
                    </h3>
                    <p className="text-foreground">
                      <strong>NEEDS</strong> are things you must have to survive and be
                      healthy. <strong>WANTS</strong> are things that make life more fun
                      or comfortable, but you can live without them. Always buy needs
                      first!
                    </p>
                  </CardContent>
                </Card>
              )}

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-lg font-bold hover:from-amber-600 hover:to-yellow-600"
                onClick={handleNext}
              >
                {currentIndex < items.length - 1
                  ? "Next Item →"
                  : `Complete Lesson! (${score}/${items.length}) ⭐⭐⭐`}
              </Button>
            </div>
          )}

          <div className="flex gap-2 justify-center">
            {items.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full",
                  index < currentIndex
                    ? "bg-green-500"
                    : index === currentIndex
                    ? "bg-amber-500 w-4"
                    : "bg-gray-300 dark:bg-gray-700",
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
