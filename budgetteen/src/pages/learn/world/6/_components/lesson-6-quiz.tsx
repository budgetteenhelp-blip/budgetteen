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
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Using two different passwords",
      "Logging in from two different devices",
      "Adding an extra security step beyond your password",
      "Having two bank accounts",
    ],
    correctIndex: 2,
    explanation:
      "2FA adds an extra security layer - even if someone steals your password, they need the code sent to YOUR phone to access your account. Always enable it!",
  },
  {
    id: 2,
    question: "A text says 'Your bank account is locked! Click here NOW to fix it.' What should you do?",
    options: [
      "Click the link immediately to fix the problem",
      "Reply with your account number",
      "Delete it - it's likely a scam. Call your bank directly if concerned",
      "Forward it to all your contacts to warn them",
    ],
    correctIndex: 2,
    explanation:
      "This is a classic phishing scam! Banks never text urgent links. If concerned, log into your bank app or call the official number. Never click suspicious links.",
  },
  {
    id: 3,
    question: "Is it safe to use public WiFi at a coffee shop to check your bank account?",
    options: [
      "Yes, as long as the WiFi has a password",
      "Yes, everyone does it",
      "No, you should use your phone's cellular data instead",
      "Yes, but only on Tuesdays",
    ],
    correctIndex: 2,
    explanation:
      "Never do banking on public WiFi! Even with a password, hackers on that network could intercept your data. Always use cellular data for sensitive activities.",
  },
  {
    id: 4,
    question: "Which password is the STRONGEST?",
    options: [
      "password123",
      "12345678",
      "MyName2008",
      "Tr0pic@l$unset47!",
    ],
    correctIndex: 3,
    explanation:
      "Strong passwords mix uppercase, lowercase, numbers, and symbols! Avoid common words, names, or simple patterns. The more complex, the harder for hackers to crack.",
  },
  {
    id: 5,
    question: "What should you NEVER share online or over the phone?",
    options: [
      "Your favorite color",
      "Your social security number, passwords, or verification codes",
      "Your favorite music",
      "Your school name",
    ],
    correctIndex: 1,
    explanation:
      "Never share sensitive information like SSN, passwords, or verification codes! Real companies will NEVER ask for these. If someone asks, it's likely a scam.",
  },
  {
    id: 6,
    question: "You see a deal online that seems too good to be true (iPhone for $50). What should you do?",
    options: [
      "Buy it immediately before it's gone!",
      "Research the website, check reviews, and look for warning signs",
      "Send them your credit card info to hold it",
      "Share it with friends so they can buy too",
    ],
    correctIndex: 1,
    explanation:
      "If a deal seems too good to be true, it probably is! Always research unfamiliar websites, check reviews, verify the URL is secure (https), and watch for red flags.",
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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-orange-300 dark:border-orange-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">🎓</div>
            <CardTitle className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              Digital Dunes Quiz
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
            <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">
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
                    className="h-auto w-full justify-start whitespace-normal py-4 text-left text-base hover:border-orange-500"
                  >
                    <span className="mr-3 flex size-6 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-900 dark:bg-orange-900 dark:text-orange-100">
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
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
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
                      ? "bg-gradient-to-r from-orange-500 to-amber-500"
                      : index === currentQuestion
                        ? "bg-orange-300 dark:bg-orange-700"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {currentQuestion === questions.length - 1 && showExplanation && (
              <div className="rounded-lg bg-orange-100 p-4 dark:bg-orange-900/50">
                <p className="text-center text-lg font-bold text-orange-900 dark:text-orange-100">
                  🎉 Quiz Complete! You earned {coinsEarned} coins!
                </p>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {score === questions.length
                    ? "Perfect! You're a digital safety master!"
                    : score >= 4
                      ? "Great work! You know how to stay safe online!"
                      : "Good effort! Keep reviewing to improve your digital safety!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
