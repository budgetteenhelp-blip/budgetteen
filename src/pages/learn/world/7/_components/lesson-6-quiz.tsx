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
    question: "What is a good percentage of your income to donate to charity?",
    options: [
      "0% - Save everything for yourself",
      "100% - Give away everything you earn",
      "5-10% - A reasonable amount that helps others while keeping most for your needs",
      "50% - Half of everything you earn",
    ],
    correctIndex: 2,
    explanation:
      "Donating 5-10% is generous and sustainable! It helps others significantly while ensuring you can meet your own needs and save for the future. Many people use this as a guideline.",
  },
  {
    id: 2,
    question: "What are taxes used for?",
    options: [
      "Only for paying government workers' salaries",
      "Schools, roads, hospitals, police, firefighters, and public services everyone uses",
      "Just the military",
      "Taxes don't actually fund anything useful",
    ],
    correctIndex: 1,
    explanation:
      "Taxes fund essential services we all use! Schools, roads, hospitals, emergency services, parks, libraries, and more. Without taxes, society couldn't function and provide these shared benefits.",
  },
  {
    id: 3,
    question: "A stranger online asks you to donate to their fundraiser. What should you do FIRST?",
    options: [
      "Send money immediately - they need help",
      "Verify it's real through official platforms or by talking to them directly",
      "Never donate to any online fundraisers",
      "Share it with all your friends first",
    ],
    correctIndex: 1,
    explanation:
      "Always verify first! Check if there's an official GoFundMe, talk to the person directly, or ask trusted adults. Many fundraisers are real, but scammers also exist. Verification protects you!",
  },
  {
    id: 4,
    question: "You have no money but want to help your community. What can you do?",
    options: [
      "Nothing - you can only help if you have money",
      "Borrow money to donate",
      "Volunteer your time, skills, and energy at local organizations",
      "Wait until you're rich to start helping",
    ],
    correctIndex: 2,
    explanation:
      "Time and skills are incredibly valuable! Volunteer at food banks, tutor younger students, help elderly neighbors, clean parks, or use your talents to serve others. You don't need money to make a difference!",
  },
  {
    id: 5,
    question: "Which is an example of income tax?",
    options: [
      "Extra money added when you buy a shirt at the store",
      "Money automatically taken from your paycheck before you receive it",
      "Fee for owning a house",
      "Tip you give a waiter",
    ],
    correctIndex: 1,
    explanation:
      "Income tax is deducted from your paycheck before you get paid. The store example is sales tax, the house example is property tax, and tips aren't taxes at all!",
  },
  {
    id: 6,
    question: "What's the best way to make sure your donation helps effectively?",
    options: [
      "Donate to the first charity you see",
      "Send cash to random people on the street",
      "Research reputable charities that align with causes you care about",
      "Only donate to huge organizations, never small local ones",
    ],
    correctIndex: 2,
    explanation:
      "Research is key! Look for charities with good track records, transparency about how they use funds, and causes you genuinely care about. Both large and small organizations can be effective!",
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
                  className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600"
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
                      ? "bg-gradient-to-r from-teal-500 to-green-500"
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
                    ? "Perfect! You understand giving and taxes!"
                    : score >= 4
                      ? "Great work! You know how to give back responsibly!"
                      : "Good effort! Keep learning about charity and taxes!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
