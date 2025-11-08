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
    question: "What are taxes?",
    options: [
      "Money you donate to charity voluntarily",
      "Money the government collects from income earners to pay for public services",
      "Extra charges stores add for no reason",
      "Money you save for retirement",
    ],
    correctIndex: 1,
    explanation:
      "Taxes are mandatory payments collected by the government from people who earn income. They fund public services like roads, schools, police, and hospitals!",
  },
  {
    id: 2,
    question: "If you earn $100 at your part-time job, why might your paycheck only be $85-$90?",
    options: [
      "Your employer is stealing from you",
      "You made a math mistake",
      "Income taxes were taken out",
      "The bank took a fee",
    ],
    correctIndex: 2,
    explanation:
      "Income taxes are automatically deducted from your paycheck. This is normal! The amount before taxes is 'gross pay' and after taxes is 'net pay' (take-home).",
  },
  {
    id: 3,
    question: "Which is NOT a valid way to give back or help others?",
    options: [
      "Donating money to charity",
      "Volunteering your time",
      "Posting on social media that you care",
      "Donating clothes or items you don't use",
    ],
    correctIndex: 2,
    explanation:
      "While awareness is good, just posting doesn't actually help! Real giving means donating money, time, items, or skills to make tangible impact.",
  },
  {
    id: 4,
    question: "Why do many people recommend donating 10% of what you earn to charity?",
    options: [
      "It's required by law",
      "It's a balanced way to help others while still keeping most for yourself",
      "Churches force you to do this",
      "You get all the money back in taxes",
    ],
    correctIndex: 1,
    explanation:
      "The 10% guideline (called 'tithing' by some) is a balanced approach - you help make a real difference while keeping 90% for your needs and wants. It's a suggestion, not a rule!",
  },
  {
    id: 5,
    question: "What's the main advantage of volunteering your TIME instead of donating money?",
    options: [
      "It's always better than giving money",
      "You provide hands-on help and personal connection",
      "You don't have to give anything valuable",
      "It looks better on college applications",
    ],
    correctIndex: 1,
    explanation:
      "Volunteering provides direct, personal help and lets you connect with the cause. Both time AND money are valuable - organizations need both to function!",
  },
  {
    id: 6,
    question: "What do taxes pay for?",
    options: [
      "Only the military",
      "Public services like roads, schools, police, fire departments, and parks",
      "Politicians' personal vacations",
      "Nothing useful",
    ],
    correctIndex: 1,
    explanation:
      "Taxes fund essential public services everyone uses: roads, schools, police, firefighters, parks, libraries, and programs to help people in need. It's how we invest in our community!",
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
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 dark:from-teal-950 dark:via-green-950 dark:to-emerald-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-teal-300 dark:border-teal-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">🎓</div>
            <CardTitle className="text-2xl font-bold text-teal-900 dark:text-teal-100">
              The Giving Grove Quiz
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
            <div className="rounded-lg bg-teal-50 p-6 dark:bg-teal-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
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
                    className="h-auto w-full justify-start whitespace-normal py-4 text-left text-base hover:border-teal-500"
                  >
                    <span className="mr-3 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-900 dark:bg-teal-900 dark:text-teal-100">
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
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
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
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500"
                      : index === currentQuestion
                        ? "bg-teal-300 dark:bg-teal-700"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {currentQuestion === questions.length - 1 && showExplanation && (
              <div className="rounded-lg bg-teal-100 p-4 dark:bg-teal-900/50">
                <p className="text-center text-lg font-bold text-teal-900 dark:text-teal-100">
                  🎉 Quiz Complete! You earned {coinsEarned} coins!
                </p>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {score === questions.length
                    ? "Perfect! You understand giving and community responsibility!"
                    : score >= 4
                      ? "Great work! You know how to give back and contribute!"
                      : "Good effort! Keep learning about generosity and taxes!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
