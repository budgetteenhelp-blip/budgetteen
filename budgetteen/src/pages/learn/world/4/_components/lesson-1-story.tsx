import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const storyPages = [
  {
    character: "Treasurer Tina",
    emoji: "👩‍💼",
    text: "Welcome to the Town Treasury! I'm Treasurer Tina, and I help our town manage ALL its money. Do you know what a budget is?",
    background: "from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950",
  },
  {
    character: "Treasurer Tina",
    emoji: "📊",
    text: "A BUDGET is a plan for your money! It tells you how much money is coming in (income) and how much is going out (expenses). Simple, right?",
    background: "from-cyan-100 to-teal-100 dark:from-cyan-950 dark:to-teal-950",
  },
  {
    character: "Young Sam",
    emoji: "🧒",
    text: "But why do I need a budget? Can't I just spend money whenever I want?",
    background: "from-orange-100 to-amber-100 dark:from-orange-950 dark:to-amber-950",
  },
  {
    character: "Treasurer Tina",
    emoji: "💡",
    text: "Great question! Without a budget, you might spend all your money on fun things and not have enough for important things like food, clothes, or savings!",
    background: "from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950",
  },
  {
    character: "Treasurer Tina",
    emoji: "🎯",
    text: "A budget helps you: ✓ Pay for needs first ✓ Have money for wants ✓ Save for the future ✓ Avoid running out of money! It's like a roadmap for your money!",
    background: "from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950",
  },
  {
    character: "Young Sam",
    emoji: "✨",
    text: "Wow! So a budget means I can still have fun AND be responsible with my money? That's awesome!",
    background: "from-yellow-100 to-orange-100 dark:from-yellow-950 dark:to-orange-950",
  },
];

export default function Lesson1Story({ onComplete }: Props) {
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
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">
              {page.character}
            </h2>
          </div>

          <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 min-h-[160px] flex items-center justify-center">
            <p className="text-xl text-center text-foreground leading-relaxed">
              {page.text}
            </p>
          </div>

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
                "Complete Lesson! ⭐"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
