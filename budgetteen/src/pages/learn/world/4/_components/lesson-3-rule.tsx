import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const storyPages = [
  {
    title: "The Magic Formula",
    emoji: "✨",
    text: "Now that you know budget categories, let me teach you the MAGIC budgeting formula used by millions of people worldwide!",
    background: "from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950",
  },
  {
    title: "The 50/30/20 Rule",
    emoji: "🎯",
    text: "It's called the 50/30/20 rule. It helps you split your money into three jars: 50% for NEEDS, 30% for WANTS, and 20% for SAVINGS!",
    background: "from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950",
  },
  {
    title: "50% for Needs",
    emoji: "🏠",
    text: "HALF of your money (50%) goes to NEEDS - things you must have to survive. Like food, clothes, school supplies, and a place to live.",
    background: "from-red-100 to-rose-100 dark:from-red-950 dark:to-rose-950",
  },
  {
    title: "30% for Wants",
    emoji: "🎉",
    text: "30% of your money is for WANTS - fun things that make life enjoyable! Like games, movies, toys, and treats. You deserve to have fun!",
    background: "from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950",
  },
  {
    title: "20% for Savings",
    emoji: "🐷",
    text: "20% goes to SAVINGS - money for your future! This helps you buy big things later and prepares you for emergencies. Future you will be grateful!",
    background: "from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950",
  },
  {
    title: "Let's Practice!",
    emoji: "💰",
    text: "If you have $100: $50 goes to needs, $30 to wants, and $20 to savings. This way, you cover what's important, have fun, AND save for the future!",
    background: "from-yellow-100 to-orange-100 dark:from-yellow-950 dark:to-orange-950",
  },
  {
    title: "Why It Works",
    emoji: "🌟",
    text: "The 50/30/20 rule is simple, balanced, and flexible. It helps you enjoy life NOW while planning for the FUTURE. That's what smart budgeting is all about!",
    background: "from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950",
  },
];

export default function Lesson3Rule({ onComplete }: Props) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const page = storyPages[currentPage];

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className={`w-full max-w-2xl border-4 border-blue-300 bg-gradient-to-br ${page.background} dark:border-blue-700`}>
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <div className="text-8xl mb-4 animate-bounce">{page.emoji}</div>
            <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-2">
              {page.title}
            </h2>
          </div>

          <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 min-h-[180px] flex items-center justify-center">
            <p className="text-xl text-center text-foreground leading-relaxed">
              {page.text}
            </p>
          </div>

          {/* Visual representation on certain pages */}
          {currentPage === 1 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-4 text-center">
                <div className="text-4xl mb-1">🏠</div>
                <div className="text-2xl font-bold text-red-900 dark:text-red-100">50%</div>
                <div className="text-sm text-muted-foreground">Needs</div>
              </div>
              <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-4 text-center">
                <div className="text-4xl mb-1">🎉</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">30%</div>
                <div className="text-sm text-muted-foreground">Wants</div>
              </div>
              <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-4 text-center">
                <div className="text-4xl mb-1">🐷</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">20%</div>
                <div className="text-sm text-muted-foreground">Savings</div>
              </div>
            </div>
          )}

          {currentPage === 5 && (
            <Card className="border-2 border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/30">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-red-600">$50</div>
                    <div className="text-sm">Needs 🏠</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">$30</div>
                    <div className="text-sm">Wants 🎉</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">$20</div>
                    <div className="text-sm">Savings 🐷</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-2">
              {storyPages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentPage
                      ? "bg-blue-600 w-8"
                      : "bg-blue-300 dark:bg-blue-700"
                  }`}
                />
              ))}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-bold hover:from-blue-600 hover:to-cyan-600"
              onClick={handleNext}
            >
              {currentPage < storyPages.length - 1 ? (
                <>
                  Next <ArrowRightIcon className="ml-2 size-5" />
                </>
              ) : (
                "Complete Lesson! ⭐⭐"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
