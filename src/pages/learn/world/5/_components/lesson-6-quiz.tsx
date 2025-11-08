import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CoinsIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Props {
  onComplete: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is an entrepreneur?",
    options: [
      "Someone who only works for big companies",
      "Someone who creates and runs their own business",
      "Someone who only invests in the stock market",
      "Someone who always works from home",
    ],
    correctIndex: 1,
    explanation:
      "An entrepreneur is someone who creates and runs their own business, taking on risks to solve problems and provide value to customers.",
  },
  {
    id: 2,
    question: "What's the first step in starting a business?",
    options: [
      "Borrow lots of money",
      "Quit school immediately",
      "Identify a problem people have that you can solve",
      "Buy expensive equipment",
    ],
    correctIndex: 2,
    explanation:
      "The first step is identifying a real problem people have that you can solve. Successful businesses provide solutions to real needs!",
  },
  {
    id: 3,
    question: "Your customers are:",
    options: [
      "Only people you know personally",
      "People who have the problem your business solves",
      "Only wealthy people",
      "Anyone in the world",
    ],
    correctIndex: 1,
    explanation:
      "Your customers are the people who have the problem your business solves and who see value in your solution.",
  },
  {
    id: 4,
    question: "If your product costs $5 to make and you sell it for $4, you are:",
    options: [
      "Making a $1 profit",
      "Breaking even",
      "Losing $1 per sale",
      "Making smart business decisions",
    ],
    correctIndex: 2,
    explanation:
      "You'd lose $1 per sale! Your price must be higher than your costs to make a profit. Always know your costs before setting prices.",
  },
  {
    id: 5,
    question: "What is 'profit'?",
    options: [
      "All the money you collect from sales",
      "The money left after paying all your costs",
      "Money you borrow from the bank",
      "The price you charge customers",
    ],
    correctIndex: 1,
    explanation:
      "Profit is the money left after paying all your costs (materials, supplies, etc.). Profit = Revenue (sales) - Costs.",
  },
  {
    id: 6,
    question: "Which is a good business opportunity for a teen?",
    options: [
      "Opening a car dealership",
      "Starting a lawn mowing service",
      "Building a skyscraper",
      "Opening a bank",
    ],
    correctIndex: 1,
    explanation:
      "A lawn mowing service is realistic for teens! It has low startup costs, serves a real need, and you can start small and grow. Always start with opportunities that match your resources and abilities.",
  },
];

export default function Lesson6Quiz({ onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);

  const question = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === question.correctIndex) {
      setScore(score + 1);
      setCoinsEarned(coinsEarned + 10);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-purple-300 dark:border-purple-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">🎓</div>
            <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              Entrepreneur Island Quiz
            </CardTitle>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-lg font-bold">
                <CoinsIcon className="size-5 fill-yellow-500 text-yellow-500" />
                <span>{coinsEarned} coins</span>
              </div>
              <div className="text-lg font-bold">
                Score: {score} / {questions.length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <p className="text-lg font-semibold text-foreground">
                {question.question}
              </p>
            </div>

            {!showExplanation ? (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant="outline"
                    onClick={() => handleAnswer(index)}
                    className="h-auto w-full justify-start whitespace-normal py-4 text-left text-base hover:border-purple-500"
                  >
                    <span className="mr-3 flex size-6 shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-900 dark:bg-purple-900 dark:text-purple-100">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={cn(
                    "rounded-lg p-6",
                    selectedAnswer === question.correctIndex
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50"
                      : "bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-950/50 dark:to-orange-950/50"
                  )}
                >
                  <p className="mb-3 flex items-center gap-2 text-lg font-bold">
                    {selectedAnswer === question.correctIndex ? (
                      <>
                        <CheckCircleIcon className="size-6 text-green-600" />
                        <span className="text-green-900 dark:text-green-100">
                          Correct! +10 coins
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="size-6 text-red-600" />
                        <span className="text-red-900 dark:text-red-100">
                          Not quite!
                        </span>
                      </>
                    )}
                  </p>
                  <p className="mb-2 text-base text-foreground">
                    <strong>Correct answer:</strong>{" "}
                    {question.options[question.correctIndex]}
                  </p>
                  <p className="text-base text-foreground">
                    {question.explanation}
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {currentQuestion < questions.length - 1
                    ? "Next Question"
                    : "Complete Lesson"}
                </Button>
              </div>
            )}

            <div className="flex gap-1">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index < currentQuestion
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : index === currentQuestion
                        ? "bg-purple-300 dark:bg-purple-700"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {currentQuestion === questions.length - 1 && showExplanation && (
              <div className="rounded-lg bg-purple-100 p-4 dark:bg-purple-900/50">
                <p className="text-center text-lg font-bold text-purple-900 dark:text-purple-100">
                  🎉 Quiz Complete! You earned {coinsEarned} coins!
                </p>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {score === questions.length
                    ? "Perfect score! You're ready to be an entrepreneur!"
                    : score >= 4
                      ? "Great job! You understand the basics of entrepreneurship!"
                      : "Good effort! Review the lessons to improve!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
