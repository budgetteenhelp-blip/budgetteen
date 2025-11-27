import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const storyPages = [
  {
    emoji: "🏝️",
    title: "Welcome to Entrepreneur Island!",
    text: "Welcome, young explorer! You've arrived at Entrepreneur Island, a place where creativity and business ideas come to life. Here, anyone can turn their dreams into reality by starting their own business!",
  },
  {
    emoji: "👨‍💼",
    title: "Meet Captain Venture",
    text: "\"Ahoy there! I'm Captain Venture, and I started with just a small fishing boat. Now I run the island's biggest shipping company! An entrepreneur is someone who creates and runs their own business.\"",
  },
  {
    emoji: "💡",
    title: "What Makes an Entrepreneur?",
    text: "Entrepreneurs are problem-solvers! They look at the world, find problems people have, and create solutions. They take risks, work hard, and learn from mistakes. Best of all, they get to be their own boss!",
  },
  {
    emoji: "🎯",
    title: "Why Start a Business?",
    text: "People become entrepreneurs to: Make money doing what they love, help others with their products or services, create jobs for their community, and have the freedom to make their own decisions!",
  },
  {
    emoji: "🌟",
    title: "Famous Teen Entrepreneurs",
    text: "Many successful entrepreneurs started as teens! Like the kid who invented earmuffs at 15, or teens who built million-dollar apps. You're never too young to start thinking like an entrepreneur!",
  },
  {
    emoji: "🚀",
    title: "Your Journey Begins",
    text: "On Entrepreneur Island, you'll learn how to spot business opportunities, understand customers, price your products, and much more. Are you ready to start your entrepreneurial journey?",
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-purple-300 dark:border-purple-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-8xl">{page.emoji}</div>
            <CardTitle className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              {page.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground">
              {page.text}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {storyPages.length}
              </span>
              <Button
                size="lg"
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {currentPage < storyPages.length - 1 ? (
                  <>
                    Next
                    <ArrowRightIcon className="ml-2 size-4" />
                  </>
                ) : (
                  "Complete Lesson"
                )}
              </Button>
            </div>

            <div className="flex gap-1">
              {storyPages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index <= currentPage
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
