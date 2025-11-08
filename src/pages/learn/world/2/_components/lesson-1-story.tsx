import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PiggyBank, Mountain, Coins } from "lucide-react";

interface Lesson1StoryProps {
  onComplete: () => void;
}

export default function Lesson1Story({ onComplete }: Lesson1StoryProps) {
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Welcome to Piggy Bank Peaks!",
      text: "High in the mountains lives a wise community that understands the power of saving. Their village has grown strong because everyone saves part of what they earn.",
      icon: Mountain,
    },
    {
      title: "Meet Penny the Pig",
      text: "Penny is the village's savings expert. She teaches everyone about the three golden rules of saving: Save regularly, start small, and watch it grow!",
      icon: PiggyBank,
    },
    {
      title: "Why Saving Matters",
      text: "Without savings, people can't handle emergencies, reach their goals, or feel secure. Saving today creates opportunities tomorrow!",
      icon: Coins,
    },
    {
      title: "Your Savings Journey Begins",
      text: "Penny sees potential in you. She's ready to teach you the secrets of saving, from choosing where to keep your money to watching it grow over time. Are you ready to climb to the top?",
      icon: Mountain,
    },
  ];

  const currentPage = pages[page];
  const Icon = currentPage.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
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
                    ? "w-8 bg-pink-500"
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
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              onClick={() => {
                if (page < pages.length - 1) {
                  setPage(page + 1);
                } else {
                  onComplete();
                }
              }}
            >
              {page < pages.length - 1 ? "Next" : "Start Learning!"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
