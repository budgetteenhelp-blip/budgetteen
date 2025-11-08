import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const storyPages = [
  {
    character: "Mayor Max",
    emoji: "👨‍💼",
    text: "Welcome to Coinville! I'm Mayor Max, and I'm so excited you're here. Our town is special because everyone here helps each other.",
    background: "from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950",
  },
  {
    character: "Baker Betty",
    emoji: "👩‍🍳",
    text: "Hi there! I'm Baker Betty. Every morning, I bake fresh bread for the town. People give me things I need, and I give them bread. It's how we help each other!",
    background: "from-orange-100 to-amber-100 dark:from-orange-950 dark:to-amber-950",
  },
  {
    character: "Farmer Fred",
    emoji: "👨‍🌾",
    text: "Howdy! I'm Farmer Fred. I grow apples, carrots, and tomatoes. Sometimes I trade my vegetables for bread from Betty. That's called bartering!",
    background: "from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950",
  },
  {
    character: "Mayor Max",
    emoji: "👨‍💼",
    text: "But what if Fred wants shoes and the shoemaker doesn't need vegetables? That's where MONEY comes in! Money is something everyone agrees has value.",
    background: "from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950",
  },
  {
    character: "All Townspeople",
    emoji: "👥",
    text: "With money, we can buy anything we need from anyone! Fred can sell his vegetables for coins, then use those coins to buy shoes. It makes everything easier!",
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
      <Card className={`w-full max-w-2xl border-4 border-amber-300 bg-gradient-to-br ${page.background} dark:border-amber-700`}>
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <div className="text-8xl mb-4 animate-bounce">{page.emoji}</div>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-2">
              {page.character}
            </h2>
          </div>

          <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 min-h-[150px] flex items-center justify-center">
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
