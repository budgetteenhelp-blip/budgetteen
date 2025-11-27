import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Trophy, Star } from "lucide-react";

interface Lesson6MasterQuizProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  world: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "You earn $50 from a side job. Using the 50/30/20 rule, how much should you save?",
    options: ["$5", "$10", "$15", "$20"],
    correctIndex: 1,
    explanation:
      "20% of $50 = $10. The 50/30/20 rule recommends saving 20% of your income.",
    world: "Town Treasury Quest",
  },
  {
    id: 2,
    question:
      "Which of these is a NEED rather than a WANT for most teenagers?",
    options: [
      "New video game",
      "Designer sneakers",
      "School lunch money",
      "Concert tickets",
    ],
    correctIndex: 2,
    explanation:
      "School lunch money is a basic need for nutrition and health. The others are wants - fun but not necessary.",
    world: "Coinville",
  },
  {
    id: 3,
    question:
      "A store offers 30% off a $40 item. What's the final price before tax?",
    options: ["$12", "$28", "$30", "$34"],
    correctIndex: 1,
    explanation:
      "30% of $40 = $12 discount. $40 - $12 = $28. Always calculate the actual price after discounts!",
    world: "The Market Maze",
  },
  {
    id: 4,
    question:
      "You get an email saying you won $500 but need to click a link and enter your bank info. What should you do?",
    options: [
      "Click the link - free money!",
      "Forward to friends so they can win too",
      "Reply and ask if it's real",
      "Delete it immediately - it's a scam",
    ],
    correctIndex: 3,
    explanation:
      "This is a classic phishing scam! Never click suspicious links or share financial information. Delete and block.",
    world: "Digital Dunes",
  },
  {
    id: 5,
    question:
      "What's the BEST reason to have an emergency savings fund?",
    options: [
      "To buy whatever you want whenever you want",
      "To handle unexpected expenses without stress",
      "To compete with friends who save more",
      "Because adults say you should",
    ],
    correctIndex: 1,
    explanation:
      "Emergency funds protect you from unexpected costs (broken phone, medical needs, etc.) and reduce financial stress.",
    world: "Piggy Bank Peaks",
  },
  {
    id: 6,
    question:
      "You want to start a dog-walking business. What should you do FIRST?",
    options: [
      "Buy expensive equipment",
      "Research what customers need and would pay",
      "Quit your current job",
      "Make a website",
    ],
    correctIndex: 1,
    explanation:
      "Understanding your customers and the market comes first! Research helps you avoid costly mistakes.",
    world: "Entrepreneur Island",
  },
  {
    id: 7,
    question:
      "A friend donates $100 to charity and says you should too. You only have $20 to spare. What's the BEST choice?",
    options: [
      "Donate nothing since $20 seems small",
      "Donate the $20 you can afford",
      "Borrow $80 to match your friend",
      "Donate $100 anyway",
    ],
    correctIndex: 1,
    explanation:
      "Give what you can afford! Every donation helps, and you shouldn't exceed your budget due to peer pressure.",
    world: "The Giving Grove",
  },
  {
    id: 8,
    question:
      "What's compound interest?",
    options: [
      "Interest you pay on loans",
      "Earning interest on your interest",
      "A type of savings account",
      "Money you lend to others",
    ],
    correctIndex: 1,
    explanation:
      "Compound interest means earning interest on both your original money AND previous interest earned - it makes your money grow faster!",
    world: "Piggy Bank Peaks",
  },
  {
    id: 9,
    question:
      "You're shopping online and see 'Only 2 left in stock!' next to an item you were considering. What should you do?",
    options: [
      "Buy immediately before it's gone",
      "Check if you need it and if it fits your budget",
      "Buy two so you don't miss out",
      "Add to cart and decide later",
    ],
    correctIndex: 1,
    explanation:
      "This is a scarcity tactic! Don't let urgency pressure you. Always check if it's in your budget and if you really need it.",
    world: "The Market Maze",
  },
  {
    id: 10,
    question:
      "In a budget, which category typically should be the LARGEST for most people?",
    options: [
      "Entertainment and fun",
      "Savings",
      "Needs (housing, food, bills)",
      "Wants (shopping, hobbies)",
    ],
    correctIndex: 2,
    explanation:
      "The 50/30/20 rule allocates 50% to needs - your largest category. These are essential expenses for living.",
    world: "Town Treasury Quest",
  },
  {
    id: 11,
    question:
      "What's the MAIN advantage of digital payment apps like Venmo or Cash App?",
    options: [
      "They're impossible to hack",
      "They make sending money quick and convenient",
      "They give you free money",
      "They work without internet",
    ],
    correctIndex: 1,
    explanation:
      "Digital payment apps make money transfers fast and easy! But remember - they can still be hacked, so use security features.",
    world: "Digital Dunes",
  },
  {
    id: 12,
    question:
      "Before setting your product price as an entrepreneur, you should consider:",
    options: [
      "Only what you want to charge",
      "Just copying competitor prices",
      "Costs, competitors, and what customers will pay",
      "Making it as expensive as possible",
    ],
    correctIndex: 2,
    explanation:
      "Good pricing balances your costs, competitor prices, and customer value perception. All three factors matter!",
    world: "Entrepreneur Island",
  },
];

export default function Lesson6MasterQuiz({
  onComplete,
}: Lesson6MasterQuizProps) {
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

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Outstanding Master! 🏆";
    if (percentage >= 75) return "Excellent Work! ⭐";
    if (percentage >= 60) return "Good Job! 👍";
    return "Keep Learning! 📚";
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Trophy className="w-16 h-16 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-2">
                {getScoreMessage()}
              </h2>
              <p className="text-6xl font-bold text-purple-600 my-4">
                {percentage}%
              </p>
              <p className="text-xl text-muted-foreground">
                You got {score} out of {questions.length} questions correct
              </p>
            </div>

            <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
              <p className="font-semibold mb-2">🎓 Final Thoughts</p>
              <p className="text-sm text-muted-foreground">
                {percentage >= 75
                  ? "You've mastered financial basics! Keep practicing these skills in real life. Remember: small smart choices today lead to big results tomorrow."
                  : "You're on your way! Review the lessons and keep practicing. Financial literacy is a journey, not a destination. Every question you got right is progress!"}
              </p>
            </Card>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={onComplete}
            >
              Complete The Master Quest! 🎉
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4">
      <div className="max-w-3xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Master Quiz</h2>
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
                        ? "bg-purple-500"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-purple-500" />
                <span className="text-xs text-muted-foreground">
                  {question.world}
                </span>
              </div>
              <h3 className="text-xl font-semibold leading-relaxed">
                {question.question}
              </h3>
            </div>

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
              <Card className="p-4 bg-muted">
                <p className="font-medium mb-2">
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
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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
