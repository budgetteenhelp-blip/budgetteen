import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Sparkles, Star, Target } from "lucide-react";

interface Lesson1WelcomeProps {
  onComplete: () => void;
}

export default function Lesson1Welcome({ onComplete }: Lesson1WelcomeProps) {
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Welcome to The Master Quest! 🏆",
      content:
        "Congratulations on making it this far! You've traveled through seven incredible worlds and learned so much about money.",
      icon: Trophy,
    },
    {
      title: "Your Journey So Far",
      content:
        "From Coinville to The Giving Grove, you've mastered the basics of money, saving, smart shopping, budgeting, entrepreneurship, digital payments, and giving back.",
      icon: Star,
    },
    {
      title: "The Final Challenge",
      content:
        "In this world, you'll face the ultimate test - real-life scenarios that combine everything you've learned. Are you ready to prove you're a true Money Master?",
      icon: Target,
    },
    {
      title: "What Awaits You",
      content:
        "Six challenging lessons await: reviewing your journey, handling complex scenarios, mastering budgets, and proving your skills in the ultimate Master Quiz!",
      icon: Sparkles,
    },
  ];

  const currentPage = pages[page];
  const Icon = currentPage.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Icon className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">{currentPage.title}</h2>
            <p className="text-lg text-muted-foreground">
              {currentPage.content}
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            {pages.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === page
                    ? "w-8 bg-purple-500"
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
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => {
                if (page < pages.length - 1) {
                  setPage(page + 1);
                } else {
                  onComplete();
                }
              }}
            >
              {page < pages.length - 1 ? "Next" : "Begin the Quest!"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
