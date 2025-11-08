import { useState } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { ArrowLeftIcon, Share2Icon, HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils.ts";

interface QuizQuestion {
  id: number;
  scenario: string;
  options: {
    text: string;
    points: number;
    emoji: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    scenario: "It's your birthday and you received $100 from relatives. What's your first move?",
    options: [
      { text: "Put it all in savings for something big I'm planning", points: 4, emoji: "🏦" },
      { text: "Save $70, spend $30 on something fun", points: 3, emoji: "⚖️" },
      { text: "Spend $50 now, save the rest", points: 2, emoji: "🛍️" },
      { text: "Treat myself! I'll worry about saving later", points: 1, emoji: "🎉" },
    ],
  },
  {
    id: 2,
    scenario: "Your friends are going to a concert that costs $60, but you've been saving for new headphones. What do you do?",
    options: [
      { text: "Skip the concert and stick to my savings plan", points: 4, emoji: "🎯" },
      { text: "Go to the concert but delay buying headphones", points: 2, emoji: "🎵" },
      { text: "Ask for extra chores to earn money for both", points: 3, emoji: "💪" },
      { text: "Use my savings - experiences matter more!", points: 1, emoji: "🤷" },
    ],
  },
  {
    id: 3,
    scenario: "You see your favorite sneakers on sale for 30% off. You weren't planning to buy shoes. What do you do?",
    options: [
      { text: "Pass - I don't need them right now", points: 4, emoji: "🚫" },
      { text: "Check my budget first, then decide", points: 3, emoji: "📊" },
      { text: "Buy them! It's a great deal", points: 1, emoji: "🛒" },
      { text: "Sleep on it and decide tomorrow", points: 2, emoji: "💭" },
    ],
  },
  {
    id: 4,
    scenario: "Your parents offer you $20 weekly allowance OR $60 once a month. Which do you choose?",
    options: [
      { text: "Weekly - helps me manage spending better", points: 3, emoji: "📅" },
      { text: "Monthly - I can handle budgeting it myself", points: 4, emoji: "📈" },
      { text: "Weekly - I'd spend monthly money too fast", points: 2, emoji: "😅" },
      { text: "Monthly - bigger amount feels better", points: 1, emoji: "💵" },
    ],
  },
  {
    id: 5,
    scenario: "You have $15 left for the week. A new game just dropped that all your friends are playing ($15). What's your choice?",
    options: [
      { text: "Wait until next week's allowance to buy it", points: 4, emoji: "⏰" },
      { text: "Buy it but plan how to get by without money", points: 2, emoji: "🎮" },
      { text: "Find a way to earn extra money first", points: 3, emoji: "🌟" },
      { text: "Buy it now, worry about it later", points: 1, emoji: "🤞" },
    ],
  },
  {
    id: 6,
    scenario: "Your friend wants to borrow $20 and promises to pay you back next week. What do you do?",
    options: [
      { text: "Only lend what I can afford to lose", points: 3, emoji: "🤝" },
      { text: "Lend it but set a clear repayment date", points: 4, emoji: "📝" },
      { text: "Give it as a gift without expecting it back", points: 2, emoji: "🎁" },
      { text: "Lend it even if it leaves me short", points: 1, emoji: "😰" },
    ],
  },
  {
    id: 7,
    scenario: "You get a chance to earn $100 by doing yard work this weekend, but you had plans with friends. What do you do?",
    options: [
      { text: "Take the job - I can hang out next weekend", points: 4, emoji: "💼" },
      { text: "Try to do both - work morning, friends afternoon", points: 3, emoji: "🔄" },
      { text: "Skip the job - friends are more important", points: 1, emoji: "👥" },
      { text: "Take the job only if I really need money", points: 2, emoji: "🤔" },
    ],
  },
  {
    id: 8,
    scenario: "You're at the mall with $40. You see three things you want: a shirt ($25), a book ($15), and a phone case ($20). What do you do?",
    options: [
      { text: "Pick one thing and save the rest", points: 4, emoji: "🎯" },
      { text: "Get the book and phone case ($35 total)", points: 3, emoji: "📚" },
      { text: "Buy the shirt and come back for others later", points: 2, emoji: "👕" },
      { text: "Find a way to get all three somehow", points: 1, emoji: "🤑" },
    ],
  },
  {
    id: 9,
    scenario: "Your phone storage is full. What's your solution?",
    options: [
      { text: "Delete old apps and photos for free", points: 4, emoji: "🗑️" },
      { text: "Buy the cheapest storage plan ($1/month)", points: 3, emoji: "☁️" },
      { text: "Buy more phone storage ($20) - one-time fix", points: 2, emoji: "📱" },
      { text: "Upgrade to a new phone with more storage", points: 1, emoji: "🆕" },
    ],
  },
  {
    id: 10,
    scenario: "You want to start a small side hustle. What's your approach?",
    options: [
      { text: "Research and create a detailed business plan", points: 4, emoji: "📋" },
      { text: "Start small with what I already have", points: 3, emoji: "🚀" },
      { text: "Invest money first to make it look professional", points: 2, emoji: "💎" },
      { text: "Wait until I have more money to start", points: 1, emoji: "⏳" },
    ],
  },
  {
    id: 11,
    scenario: "Everyone's getting the latest gaming console ($500). How do you handle this?",
    options: [
      { text: "Set a savings goal and timeline to buy it", points: 4, emoji: "📊" },
      { text: "See if I can get it for my birthday/holiday", points: 3, emoji: "🎁" },
      { text: "Ask parents to split the cost with me", points: 2, emoji: "🤝" },
      { text: "Find a way to buy it now (payment plan/loan)", points: 1, emoji: "💳" },
    ],
  },
  {
    id: 12,
    scenario: "You find $20 on the ground with no one around. What do you do?",
    options: [
      { text: "Turn it in to lost & found/authorities", points: 4, emoji: "👮" },
      { text: "Wait around to see if someone comes looking", points: 3, emoji: "👀" },
      { text: "Keep it and put it in savings", points: 2, emoji: "🏦" },
      { text: "Keep it and spend it on something fun", points: 1, emoji: "🎊" },
    ],
  },
  {
    id: 13,
    scenario: "Your streaming services cost $30/month total. You rarely use two of them ($15 worth). What do you do?",
    options: [
      { text: "Cancel the ones I don't use right away", points: 4, emoji: "✂️" },
      { text: "Rotate subscriptions - cancel/resubscribe as needed", points: 3, emoji: "🔄" },
      { text: "Keep them all - I might use them later", points: 1, emoji: "🤷" },
      { text: "Ask family to share their accounts instead", points: 2, emoji: "👨‍👩‍👧‍👦" },
    ],
  },
  {
    id: 14,
    scenario: "You're planning a hangout with friends. What do you suggest?",
    options: [
      { text: "Free activities: park, hiking, board games at home", points: 4, emoji: "🏞️" },
      { text: "Split the cost of pizza and rent a movie", points: 3, emoji: "🍕" },
      { text: "Go to a movie theater or arcade", points: 2, emoji: "🎬" },
      { text: "Whatever everyone else wants to do", points: 1, emoji: "🤝" },
    ],
  },
  {
    id: 15,
    scenario: "You just learned about investing. You have $200 saved. What's your move?",
    options: [
      { text: "Research thoroughly and start with a small amount", points: 4, emoji: "📚" },
      { text: "Keep saving until I have more to invest", points: 3, emoji: "🐢" },
      { text: "Invest half, keep half in savings", points: 2, emoji: "⚖️" },
      { text: "Keep it all in savings - investing is too risky", points: 1, emoji: "🏦" },
    ],
  },
];

interface PersonalityType {
  name: string;
  emoji: string;
  description: string;
  tips: string[];
  minScore: number;
  maxScore: number;
}

const personalityTypes: PersonalityType[] = [
  {
    name: "The Money Master",
    emoji: "🧙‍♂️",
    description: "You're a budgeting wizard! You think ahead, plan carefully, and make smart choices with your money. You understand that delayed gratification leads to bigger rewards.",
    tips: [
      "Share your skills - help friends learn budgeting too!",
      "Don't forget to enjoy some of your money in the present",
      "Consider learning about investing to grow your wealth",
    ],
    minScore: 55,
    maxScore: 60,
  },
  {
    name: "The Smart Saver",
    emoji: "🎯",
    description: "You've got solid money skills! You balance saving and spending pretty well, and you're mindful of your financial decisions. You're on the right track!",
    tips: [
      "Set specific savings goals to stay motivated",
      "Track your spending to identify areas to improve",
      "Try the 50/30/20 rule: save 50%, spend 30%, give 20%",
    ],
    minScore: 43,
    maxScore: 54,
  },
  {
    name: "The Balanced Buddy",
    emoji: "⚖️",
    description: "You enjoy your money but also think about the future. Sometimes you make great choices, other times impulse wins. You're learning and growing!",
    tips: [
      "Create a 'wait 24 hours' rule before buying non-essentials",
      "Set up automatic savings so you save before you spend",
      "Find free or low-cost activities you enjoy",
    ],
    minScore: 31,
    maxScore: 42,
  },
  {
    name: "The Free Spirit",
    emoji: "🎨",
    description: "You live in the moment and value experiences over savings. While this makes life fun, it can make reaching big goals harder. Time to level up your money game!",
    tips: [
      "Start small - save just $5 a week to build the habit",
      "Use the Budget Teen app to track where your money goes",
      "Set one exciting savings goal to work toward",
      "Remember: planning ahead gives you MORE freedom later!",
    ],
    minScore: 15,
    maxScore: 30,
  },
];

function getPersonalityType(score: number): PersonalityType {
  return (
    personalityTypes.find(
      (type) => score >= type.minScore && score <= type.maxScore,
    ) || personalityTypes[personalityTypes.length - 1]
  );
}

function QuizInner() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const saveQuizResult = useMutation(api.quiz.saveQuizResult);

  const totalQuestions = quizQuestions.length;
  const progress = (currentQuestion / totalQuestions) * 100;
  const totalScore = answers.reduce((sum, points) => sum + points, 0);

  const handleAnswer = async (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      const finalScore = newAnswers.reduce((sum, p) => sum + p, 0);
      const personality = getPersonalityType(finalScore);
      
      try {
        await saveQuizResult({
          personalityType: personality.name,
          score: finalScore,
        });
      } catch (error) {
        console.error("Failed to save quiz result:", error);
      }

      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleShare = () => {
    const personality = getPersonalityType(totalScore);
    const shareText = `I'm "${personality.name}" ${personality.emoji} on Budget Teen's Financial Personality Quiz! Take the quiz to discover your money style! 💰`;
    
    if (navigator.share) {
      navigator
        .share({
          title: "My Budget Personality",
          text: shareText,
        })
        .catch(() => {
          navigator.clipboard.writeText(shareText);
          toast.success("Result copied to clipboard!");
        });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success("Result copied to clipboard!");
    }
  };

  if (showResults) {
    const personality = getPersonalityType(totalScore);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-4 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 py-8">
        <div className="mx-auto max-w-2xl">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/")}
          >
            <HomeIcon className="mr-2 size-4" />
            Back to Home
          </Button>

          <Card className="border-4 border-orange-300 shadow-2xl dark:border-orange-700">
            <CardHeader className="space-y-4 text-center">
              <div className="text-8xl">{personality.emoji}</div>
              <CardTitle className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                You're {personality.name}!
              </CardTitle>
              <div className="text-6xl font-bold text-purple-600 dark:text-purple-400">
                {totalScore} / 60 points
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-lg text-foreground">
                {personality.description}
              </p>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100">
                  💡 Tips to Level Up:
                </h3>
                <ul className="space-y-2">
                  {personality.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 rounded-lg bg-orange-50 p-3 dark:bg-orange-950/50"
                    >
                      <span className="text-xl">✨</span>
                      <span className="text-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-bold hover:from-purple-600 hover:to-pink-600"
                  size="lg"
                  onClick={handleShare}
                >
                  <Share2Icon className="mr-2 size-5" />
                  Share Results
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-lg font-bold hover:from-orange-600 hover:to-amber-600"
                  size="lg"
                  onClick={handleRestart}
                >
                  Retake Quiz
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Start Tracking Your Money
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-4 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
                setAnswers(answers.slice(0, -1));
              } else {
                navigate("/");
              }
            }}
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            {currentQuestion > 0 ? "Previous" : "Exit"}
          </Button>
          <div className="text-sm font-semibold text-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-3" />
        </div>

        <Card className="border-4 border-purple-300 shadow-xl dark:border-purple-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {question.scenario}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.points)}
                className={cn(
                  "w-full rounded-xl border-2 border-purple-200 bg-white p-4 text-left transition-all hover:scale-105 hover:border-purple-400 hover:shadow-lg dark:border-purple-800 dark:bg-purple-950/30 dark:hover:border-purple-600",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="flex-1 font-medium text-foreground">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Choose the answer that best represents what you'd do 💭
          </p>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-4 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4 text-center">
              <div className="text-6xl">🧠</div>
              <CardTitle className="text-3xl font-bold">
                Financial Personality Quiz
              </CardTitle>
              <p className="text-muted-foreground">
                Discover your money style! Sign in to take the quiz and get personalized tips.
              </p>
            </CardHeader>
            <CardContent>
              <SignInButton size="lg" className="w-full" />
            </CardContent>
          </Card>
        </div>
      </Unauthenticated>
      <AuthLoading>
        <div className="flex min-h-screen items-center justify-center">
          <Skeleton className="h-96 w-full max-w-2xl" />
        </div>
      </AuthLoading>
      <Authenticated>
        <QuizInner />
      </Authenticated>
    </>
  );
}
