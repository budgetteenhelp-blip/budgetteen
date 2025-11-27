import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const storyPages = [
  {
    emoji: "🎯",
    title: "The Customer Quest",
    text: "Captain Venture gathers you at the island's marketplace. \"The secret to every successful business,\" he says, \"is understanding your CUSTOMERS - the people who will buy your product or service.\"",
  },
  {
    emoji: "👥",
    title: "Who Are Your Customers?",
    text: "Your customers are the people who have the problem you're solving. A lemonade stand's customers are thirsty people walking by. A tutoring service's customers are students who need help with schoolwork.",
  },
  {
    emoji: "❤️",
    title: "What Do Customers Want?",
    text: "Customers want VALUE - something that makes their life better, easier, or more enjoyable. They'll pay money when they believe your product or service is worth more than the price!",
  },
  {
    emoji: "📊",
    title: "Understanding Your Market",
    text: "Your 'market' is all the potential customers for your business. A teen lawn-mowing service's market might be busy parents in your neighborhood. The bigger the market, the more potential customers you have!",
  },
  {
    emoji: "🎪",
    title: "A Real Island Example",
    text: "Meet Maya! She noticed tourists visiting the island had nowhere to rent beach gear. She started a beach equipment rental stand. Her customers (tourists) gladly pay because it solves their problem!",
  },
  {
    emoji: "🔑",
    title: "The Key Lesson",
    text: "\"Remember,\" Captain Venture says, \"a business only succeeds if it provides real value to real customers. Always think: What problem am I solving? Who needs this solution? Why would they pay for it?\"",
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
