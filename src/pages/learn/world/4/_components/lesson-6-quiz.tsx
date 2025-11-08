import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CheckCircleIcon, XCircleIcon, TrophyIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Props {
  onComplete: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  emoji: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is a budget?",
    options: [
      "A plan for spending your money",
      "A way to hide your money",
      "Money you owe someone",
      "A type of bank account",
    ],
    correctAnswer: 0,
    explanation: "A budget is a plan that helps you track income and expenses, making sure you spend wisely!",
    emoji: "📊",
  },
  {
    id: 2,
    question: "In the 50/30/20 rule, what does the 50% represent?",
    options: [
      "Wants",
      "Savings",
      "Needs",
      "Investments",
    ],
    correctAnswer: 2,
    explanation: "50% of your budget should go to NEEDS - essential things you must have to survive!",
    emoji: "🏠",
  },
  {
    id: 3,
    question: "Which is an example of a WANT, not a need?",
    options: [
      "Food for meals",
      "School supplies",
      "Designer sneakers",
      "Winter coat",
    ],
    correctAnswer: 2,
    explanation: "Designer sneakers are a want! You need shoes, but expensive brands are optional.",
    emoji: "👟",
  },
  {
    id: 4,
    question: "How much of the 50/30/20 rule should go to savings?",
    options: [
      "10%",
      "20%",
      "30%",
      "50%",
    ],
    correctAnswer: 1,
    explanation: "20% should go to savings! This helps you build an emergency fund and save for future goals.",
    emoji: "🐷",
  },
  {
    id: 5,
    question: "Your phone breaks and you need a new one. What budget category is this?",
    options: [
      "Wants",
      "Savings",
      "Emergency/Needs",
      "Income",
    ],
    correctAnswer: 2,
    explanation: "If you need a phone for school or safety, it's an emergency need. Use savings or adjust your budget!",
    emoji: "📱",
  },
  {
    id: 6,
    question: "What should you do when an emergency happens?",
    options: [
      "Ignore it and hope it goes away",
      "Use your savings or cut wants first",
      "Never touch your savings",
      "Stop eating to save money",
    ],
    correctAnswer: 1,
    explanation: "Use savings for emergencies or cut wants before touching needs. Never skip important needs!",
    emoji: "🚨",
  },
];

export default function Lesson6Quiz({ onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 p-4 dark:from-blue-950 dark:to-cyan-950">
      <Card className="w-full max-w-3xl border-4 border-blue-300 dark:border-blue-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-900 dark:text-blue-100">
            👑 Master Treasurer Quiz
          </CardTitle>
          <div className="flex justify-center gap-6 pt-2">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrophyIcon className="size-5 text-yellow-600" />
              <div className="text-lg font-bold text-green-600">
                {score} correct
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 dark:border-purple-700 dark:from-purple-950/30 dark:to-pink-950/30">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{question.emoji}</div>
              </div>
              <p className="text-xl font-semibold text-center text-foreground">
                {question.question}
              </p>
            </CardContent>
          </Card>

          {!showFeedback ? (
            <div className="grid gap-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  size="lg"
                  className="h-auto whitespace-normal p-4 text-left text-base hover:scale-105 transition-transform"
                  variant={selectedAnswer === index ? "default" : "outline"}
                  onClick={() => handleAnswer(index)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex size-8 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-800 font-bold text-blue-900 dark:text-blue-100 shrink-0">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
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
                          Correct! 🎉
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
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-1">Correct answer:</p>
                    <p className="font-semibold text-foreground">
                      {String.fromCharCode(65 + question.correctAnswer)}.{" "}
                      {question.options[question.correctAnswer]}
                    </p>
                  </div>
                  <p className="text-lg text-foreground">{question.explanation}</p>
                </CardContent>
              </Card>

              {isLastQuestion && (
                <Card className="border-2 border-blue-400 bg-gradient-to-r from-blue-50 to-cyan-50 dark:border-blue-700 dark:from-blue-950/50 dark:to-cyan-950/50">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="text-5xl">
                      {score === questions.length ? "🏆" : score >= 4 ? "⭐" : "📚"}
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      Quiz Complete!
                    </h3>
                    <div className="text-3xl font-bold text-green-600">
                      {score} out of {questions.length} correct
                    </div>
                    {score === questions.length && (
                      <p className="text-amber-600 font-bold">
                        Perfect score! You're a Master Treasurer! 👑
                      </p>
                    )}
                    {score >= 4 && score < questions.length && (
                      <p className="text-blue-600 font-bold">
                        Great job! You understand budgeting well!
                      </p>
                    )}
                    {score < 4 && (
                      <p className="text-foreground">
                        Keep practicing! Budgeting takes time to master.
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-bold hover:from-blue-600 hover:to-cyan-600"
                onClick={handleNext}
              >
                {isLastQuestion
                  ? "Complete Lesson! ⭐⭐"
                  : "Next Question →"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
