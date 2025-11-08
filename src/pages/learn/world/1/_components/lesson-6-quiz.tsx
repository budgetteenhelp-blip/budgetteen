import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CheckCircleIcon, XCircleIcon, CoinsIcon } from "lucide-react";
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
    question: "You just earned 50 coins from babysitting! What should you do FIRST?",
    options: [
      "Spend it all on candy and toys",
      "Save some and spend some",
      "Give it all to your friend",
      "Hide it under your bed and forget about it",
    ],
    correctAnswer: 1,
    explanation: "Great! It's smart to save some money while also enjoying some of what you earned. This is called balancing needs and wants!",
    emoji: "💰",
  },
  {
    id: 2,
    question: "What is the main purpose of money?",
    options: [
      "To make you look cool",
      "To make trading easier",
      "To collect and hide",
      "To always get the newest things",
    ],
    correctAnswer: 1,
    explanation: "Exactly! Money makes trading easier because everyone accepts it. You don't need to find someone who has what you want AND wants what you have!",
    emoji: "🪙",
  },
  {
    id: 3,
    question: "You want new shoes, but you also need school supplies. What should you do?",
    options: [
      "Buy the shoes - you want them more",
      "Buy the school supplies first",
      "Buy neither and save everything",
      "Ask your parents to buy both",
    ],
    correctAnswer: 1,
    explanation: "Perfect! Needs always come before wants. You NEED school supplies for learning, but you WANT new shoes. Buy needs first!",
    emoji: "🎯",
  },
  {
    id: 4,
    question: "Which of these is an example of EARNING money?",
    options: [
      "Finding coins on the street",
      "Getting birthday money",
      "Walking dogs for neighbors",
      "Borrowing from a friend",
    ],
    correctAnswer: 2,
    explanation: "Yes! Walking dogs is a job - you work and get paid for your effort. Finding money and getting gifts aren't earning - you didn't work for them!",
    emoji: "💼",
  },
  {
    id: 5,
    question: "Why is bartering (trading without money) sometimes difficult?",
    options: [
      "It's too easy",
      "You need to find someone who wants what you have and has what you want",
      "It's illegal",
      "People don't like to share",
    ],
    correctAnswer: 1,
    explanation: "Exactly! Bartering only works when both people have exactly what the other wants. With money, you can buy from anyone!",
    emoji: "🔄",
  },
  {
    id: 6,
    question: "You have 100 coins. A video game costs 60 coins, and a new outfit costs 50 coins. What's the smartest choice?",
    options: [
      "Buy both and ask for more money",
      "Choose one, save the rest",
      "Don't buy either - save everything",
      "Buy the game and borrow coins for the outfit",
    ],
    correctAnswer: 1,
    explanation: "Smart thinking! You can't afford both, so choose what's most important to you and save the rest. Never spend more money than you have!",
    emoji: "🤔",
  },
];

export default function Lesson6Quiz({ onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);

  const question = questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
      setCoinsEarned(coinsEarned + 10);
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 p-4 dark:from-amber-950 dark:to-orange-950">
      <Card className="w-full max-w-3xl border-4 border-amber-300 dark:border-amber-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-amber-900 dark:text-amber-100">
            📄 Your First Paycheck Quiz
          </CardTitle>
          <div className="flex justify-center gap-6 pt-2">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CoinsIcon className="size-5 text-yellow-600" />
              <div className="text-lg font-bold text-green-600">
                {coinsEarned} coins earned
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
                    <div className="flex size-8 items-center justify-center rounded-full bg-amber-200 dark:bg-amber-800 font-bold text-amber-900 dark:text-amber-100 shrink-0">
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
                          Correct! +10 coins 🪙
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
                    <div className="text-5xl">🎉</div>
                    <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      Quiz Complete!
                    </h3>
                    <div className="text-3xl font-bold text-green-600">
                      You earned {coinsEarned} coins! 🪙
                    </div>
                    <p className="text-lg text-foreground">
                      You got <strong>{score} out of {questions.length}</strong> questions
                      correct!
                    </p>
                    {score === questions.length && (
                      <p className="text-amber-600 font-bold">
                        Perfect score! You're a money master! 🏆
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-lg font-bold hover:from-amber-600 hover:to-yellow-600"
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
