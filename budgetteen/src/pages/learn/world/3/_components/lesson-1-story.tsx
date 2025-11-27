import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Store, Sparkles } from "lucide-react";

interface Lesson1StoryProps {
  onComplete: () => void;
}

export default function Lesson1Story({ onComplete }: Lesson1StoryProps) {
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Welcome to the Market Maze!",
      text: "This bustling marketplace is full of shops, deals, and choices. But not every deal is as good as it looks! You'll need to learn smart shopping skills to navigate this maze.",
      icon: Store,
    },
    {
      title: "Meet Marketplace Maya",
      text: "Maya is the wisest shopper in town. She knows all the tricks stores use and how to find true value. She never overspends and always gets what she needs!",
      icon: ShoppingCart,
    },
    {
      title: "The Smart Shopper's Secret",
      text: "Maya's secret? She compares prices, makes lists, thinks before buying, and knows the difference between needs and wants. She shops with a plan, not on impulse!",
      icon: Sparkles,
    },
    {
      title: "Your Shopping Journey",
      text: "Maya sees potential in you! She'll teach you how to compare prices, stick to a budget, understand quality, and avoid tricks that make you spend more. Ready to become a master shopper?",
      icon: ShoppingCart,
    },
  ];

  const currentPage = pages[page];
  const Icon = currentPage.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Icon className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">{currentPage.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentPage.text}
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            {pages.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === page
                    ? "w-8 bg-green-500"
                    : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {page > 0 && (
              <Button variant="outline" onClick={() => setPage(page - 1)}>
                Back
              </Button>
            )}
            <Button
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              onClick={() => {
                if (page < pages.length - 1) {
                  setPage(page + 1);
                } else {
                  onComplete();
                }
              }}
            >
              {page < pages.length - 1 ? "Next" : "Start Shopping!"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
