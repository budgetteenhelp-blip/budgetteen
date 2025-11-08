import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const storyPages = [
  {
    title: "The Problem with Bartering",
    emoji: "🤔",
    text: "Remember how trading works? It's great when two people have exactly what the other wants. But what happens when they don't?",
    background: "from-red-100 to-orange-100 dark:from-red-950 dark:to-orange-950",
  },
  {
    title: "The Shoemaker's Dilemma",
    emoji: "👞",
    text: "Shoemaker Sam makes shoes. He's hungry and wants bread from Baker Betty. But Betty doesn't need shoes right now - she just got a new pair!",
    background: "from-orange-100 to-amber-100 dark:from-orange-950 dark:to-amber-950",
  },
  {
    title: "The Search Begins",
    emoji: "🔍",
    text: "Sam needs to find someone who wants shoes AND has something Betty needs. That could take all day! He might visit 10 different people trying to make a trade chain work.",
    background: "from-amber-100 to-yellow-100 dark:from-amber-950 dark:to-yellow-950",
  },
  {
    title: "Money to the Rescue!",
    emoji: "💰",
    text: "With MONEY, Sam doesn't need to find the perfect trade. He can sell his shoes to anyone for coins, then use those coins to buy bread from Betty!",
    background: "from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950",
  },
  {
    title: "Why Money is Amazing",
    emoji: "✨",
    text: "Money solves THREE big problems: 1) Everyone accepts it 2) It's easy to carry 3) You can save it for later. No more carrying chickens to the market!",
    background: "from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950",
  },
  {
    title: "Money Makes Trade Easy",
    emoji: "🎉",
    text: "Now everyone in Coinville can buy and sell whatever they want, whenever they want! Money makes the whole town work better together.",
    background: "from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950",
  },
];

export default function Lesson3Story({ onComplete }: Props) {
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
      <Card className={`w-full max-w-2xl border-4 border-amber-300 bg-gradient-to-br ${page.background} dark:border-amber-700`}>
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <div className="text-8xl mb-4 animate-bounce">{page.emoji}</div>
            <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
              {page.title}
            </h2>
          </div>

          <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 min-h-[180px] flex items-center justify-center">
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
                      ? "bg-amber-600 w-8"
                      : "bg-amber-300 dark:bg-amber-700"
                  }`}
                />
              ))}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-lg font-bold hover:from-amber-600 hover:to-yellow-600"
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
