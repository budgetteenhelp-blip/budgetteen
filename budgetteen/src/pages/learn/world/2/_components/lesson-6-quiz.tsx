import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";

interface Lesson6QuizProps {
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
    question: "What is compound interest?",
    options: [
      "Interest that stays the same every year",
      "Earning interest on your interest",
      "A type of savings account",
      "Money you borrow from the bank",
    ],
    correctIndex: 1,
    explanation:
      "Compound interest means earning interest on both your original money AND the interest you've already earned!",
  },
  {
    id: 2,
    question: "What's the BEST use of an emergency fund?",
    options: [
      "Buying the latest video game",
      "Paying for unexpected car repairs",
      "Going to a concert with friends",
      "Getting new clothes for school",
    ],
    correctIndex: 1,
    explanation:
      "Emergency funds are for unexpected needs you can't avoid, like car repairs or medical bills.",
  },
  {
    id: 3,
    question: "Which is a long-term savings goal?",
    options: [
      "Buying lunch tomorrow",
      "Getting concert tickets next month",
      "Saving for college in 4 years",
      "Buying a book next week",
    ],
    correctIndex: 2,
    explanation:
      "Long-term goals take more than 2 years. College savings is a perfect example!",
  },
  {
    id: 4,
    question: "If you save $10 per week, how much will you have in 6 months?",
    options: ["$60", "$120", "$240", "$260"],
    correctIndex: 3,
    explanation:
      "$10/week × 4 weeks/month × 6 months = $240. Plus a little extra for months with 5 weeks!",
  },
  {
    id: 5,
    question: "What's the MAIN benefit of a savings account over a piggy bank?",
    options: [
      "It's more fun to use",
      "You can see your money",
      "It earns interest and is protected",
      "You can access it more easily",
    ],
    correctIndex: 2,
    explanation:
      "Savings accounts earn interest (your money grows) and are FDIC insured (your money is protected)!",
  },
  {
    id: 6,
    question: "Why is it important to have specific savings goals?",
    options: [
      "To impress your friends",
      "Because your parents said so",
      "To know exactly what you're working toward",
      "It's not really important",
    ],
    correctIndex: 2,
    explanation:
      "Specific goals make it easier to save because you know exactly what you're saving for and when you'll reach it!",
  },
];

export default function Lesson6Quiz({ onComplete }: Lesson6QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === question.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-2">
                {percentage >= 80
                  ? "Outstanding! 🎉"
                  : percentage >= 60
                    ? "Good Job! 👍"
                    : "Keep Learning! 📚"}
              </h2>
              <p className="text-6xl font-bold text-pink-600 my-4">
                {percentage}%
              </p>
              <p className="text-xl text-muted-foreground">
                You got {score} out of {questions.length} questions correct
              </p>
            </div>

            <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 text-left">
              <p className="font-semibold mb-2">🏔️ You've Reached the Peak!</p>
              <p className="text-sm text-muted-foreground">
                You've learned about saving, compound interest, goals, and
                emergency funds. Keep using these skills to build your financial
                future!
              </p>
            </Card>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              onClick={onComplete}
            >
              Complete World 2! ⛰️
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4">
      <div className="max-w-2xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Climb to the Peak!</h2>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full ${
                    idx < currentQuestion
                      ? "bg-green-500"
                      : idx === currentQuestion
                        ? "bg-pink-500"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold leading-relaxed">
              {question.question}
            </h3>

            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === question.correctIndex;
                const showCorrect = showExplanation && isCorrect;
                const showIncorrect = showExplanation && isSelected && !isCorrect;

                return (
                  <Button
                    key={idx}
                    variant={
                      showCorrect
                        ? "default"
                        : showIncorrect
                          ? "destructive"
                          : "outline"
                    }
                    className={`w-full h-auto p-4 text-left justify-start ${
                      showCorrect ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showExplanation}
                  >
                    <span className="flex-1">{option}</span>
                    {showCorrect && (
                      <CheckCircle2 className="w-5 h-5 ml-2 shrink-0" />
                    )}
                    {showIncorrect && (
                      <XCircle className="w-5 h-5 ml-2 shrink-0" />
                    )}
                  </Button>
                );
              })}
            </div>

            {showExplanation && (
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
                <p className="font-medium mb-1">
                  {selectedAnswer === question.correctIndex
                    ? "✓ Correct!"
                    : "✗ Not quite"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {question.explanation}
                </p>
              </Card>
            )}

            {showExplanation && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Score: {score}/{currentQuestion + 1}
                </div>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  onClick={handleNext}
                >
                  {currentQuestion < questions.length - 1
                    ? "Next Question"
                    : "See Results"}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
