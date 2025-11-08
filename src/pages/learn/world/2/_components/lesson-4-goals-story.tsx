import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, Calendar, Wallet } from "lucide-react";

interface Lesson4GoalsStoryProps {
  onComplete: () => void;
}

export default function Lesson4GoalsStory({
  onComplete,
}: Lesson4GoalsStoryProps) {
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Setting Savings Goals",
      text: "You can't reach a destination if you don't know where you're going! The same is true with saving. Having clear goals makes it easier to save.",
      icon: Target,
    },
    {
      title: "The Three Types of Goals",
      text: "Short-term goals (1-6 months): New shoes, concert tickets. Medium-term goals (6 months-2 years): New phone, bike. Long-term goals (2+ years): College, car.",
      icon: Calendar,
    },
    {
      title: "Make It Specific",
      text: "Instead of 'save money,' try 'save $200 for new headphones in 4 months.' Specific goals are easier to achieve because you know exactly what you're working toward!",
      icon: Wallet,
    },
    {
      title: "Break It Down",
      text: "Big goals can feel impossible. Break them into smaller steps! Want to save $100 in 10 weeks? That's just $10 per week. Suddenly it feels doable!",
      icon: Target,
    },
    {
      title: "Track Your Progress",
      text: "Watching your savings grow is motivating! Use a jar, app, or chart to see how close you're getting. Each step forward is a win worth celebrating!",
      icon: Calendar,
    },
  ];

  const currentPage = pages[page];
  const Icon = currentPage.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Icon className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">{currentPage.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentPage.text}
            </p>
          </div>

          {page === 2 && (
            <Card className="p-4 bg-green-50 dark:bg-green-950/30">
              <div className="space-y-2">
                <p className="font-semibold text-green-700 dark:text-green-300">
                  ✓ Good Goal Example:
                </p>
                <p className="text-sm">
                  "I want to save $240 for a new gaming console by December
                  (6 months). That means I need to save $40 per month or about
                  $10 per week."
                </p>
              </div>
            </Card>
          )}

          {page === 3 && (
            <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
              <h4 className="font-semibold mb-3">Example Breakdown:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-background rounded">
                  <span>Goal: $600 laptop</span>
                  <span className="font-bold">$600</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-background rounded">
                  <span>÷ 12 months</span>
                  <span className="font-bold text-blue-600">$50/month</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-background rounded">
                  <span>÷ 4 weeks per month</span>
                  <span className="font-bold text-green-600">
                    $12.50/week
                  </span>
                </div>
              </div>
            </Card>
          )}

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
              {page < pages.length - 1 ? "Next" : "Got It!"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
