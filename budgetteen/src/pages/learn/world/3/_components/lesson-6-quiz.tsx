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
    question: "Before going shopping, what should you ALWAYS do first?",
    options: [
      "Buy whatever looks good",
      "Make a list of what you need",
      "Check what your friends are buying",
      "Look at sales ads only",
    ],
    correctIndex: 1,
    explanation:
      "Making a list helps you stay focused and avoid impulse purchases!",
  },
  {
    id: 2,
    question:
      "Store A sells headphones for $40 (good quality). Store B sells headphones for $25 (poor quality). Which is the better choice?",
    options: [
      "Always Store B - it's cheaper",
      "Always Store A - expensive is better",
      "Store A - better quality lasts longer",
      "It doesn't matter",
    ],
    correctIndex: 2,
    explanation:
      "Good quality at a fair price is better than cheap items that break quickly!",
  },
  {
    id: 3,
    question: "What does 'compare prices' mean?",
    options: [
      "Only shop at one store",
      "Check prices at different stores for the same item",
      "Buy the most expensive version",
      "Shop wherever is closest",
    ],
    correctIndex: 1,
    explanation:
      "Comparing prices helps you find the best deal for the same product!",
  },
  {
    id: 4,
    question: "You have $50 budget. Your cart has items worth $48. A $5 candy catches your eye. What do you do?",
    options: [
      "Add it anyway - it's just $5",
      "Skip it - you'd go over budget",
      "Put something else back to stay under budget",
      "Either B or C are good choices",
    ],
    correctIndex: 3,
    explanation:
      "You can either skip the candy or swap something else. The key is staying within budget!",
  },
  {
    id: 5,
    question: "When is it smart to spend MORE money on an item?",
    options: [
      "Never - always buy the cheapest",
      "When you'll use it for a long time",
      "When all your friends have it",
      "When it's on sale",
    ],
    correctIndex: 1,
    explanation:
      "Quality items you'll use often or for years are worth the investment!",
  },
  {
    id: 6,
    question:
      "A store has a '50% OFF' sign, but the item is still more expensive than the same item at another store. What should you do?",
    options: [
      "Buy it - 50% off is always best",
      "Compare the actual prices, not just the discount",
      "Don't buy anything",
      "Only shop during sales",
    ],
    correctIndex: 1,
    explanation:
      "Big discounts don't always mean the best price. Always compare actual final prices!",
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
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-2">
                {percentage >= 80
                  ? "Master Shopper! 🛍️"
                  : percentage >= 60
                    ? "Great Job! 👍"
                    : "Keep Learning! 📚"}
              </h2>
              <p className="text-6xl font-bold text-green-600 my-4">
                {percentage}%
              </p>
              <p className="text-xl text-muted-foreground">
                You got {score} out of {questions.length} questions correct
              </p>
            </div>

            <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 text-left">
              <p className="font-semibold mb-2">
                🏪 You've Conquered the Market Maze!
              </p>
              <p className="text-sm text-muted-foreground">
                You've learned how to compare prices, shop within a budget,
                understand quality, and make smart purchasing decisions. These
                skills will save you money for life!
              </p>
            </Card>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              onClick={onComplete}
            >
              Complete World 3! 🛒
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
      <div className="max-w-2xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Master Shopper Quiz</h2>
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
                        ? "bg-green-500"
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
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
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
