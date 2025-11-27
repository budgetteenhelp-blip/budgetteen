import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const storyPages = [
  {
    emoji: "🏜️",
    title: "Welcome to Digital Dunes!",
    text: "Welcome, traveler! You've entered the Digital Dunes, a vast landscape where money moves at the speed of light through phones, computers, and the internet. Here, we'll learn how to navigate this digital world safely!",
  },
  {
    emoji: "🧭",
    title: "Meet Cyrus the Guide",
    text: "\"Greetings! I'm Cyrus, your digital guide. In this desert, money doesn't exist as physical coins or bills - it's all digital! We use apps, websites, and electronic systems to send, receive, and manage money instantly.\"",
  },
  {
    emoji: "📱",
    title: "The Digital Money Revolution",
    text: "Today, people pay for things without cash using payment apps like Venmo, Cash App, Apple Pay, and Google Pay. They buy things online, split bills with friends, and even invest - all from their phones!",
  },
  {
    emoji: "💳",
    title: "Digital vs Physical Money",
    text: "Digital money is the same as physical money, just in electronic form. When you see $50 in your bank app, that's real money! You can spend it online, transfer it to friends, or withdraw it as cash from an ATM.",
  },
  {
    emoji: "⚠️",
    title: "Why Safety Matters",
    text: "\"But be warned,\" says Cyrus. \"The Digital Dunes can be dangerous! Scammers and hackers lurk in the shadows, trying to steal people's money and information. That's why we must learn to stay safe!\"",
  },
  {
    emoji: "🛡️",
    title: "Your Digital Journey",
    text: "In Digital Dunes, you'll learn about payment apps, how to spot scams, protect your information, and use digital money responsibly. Master these skills and you'll navigate the digital world like a pro!",
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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-orange-300 dark:border-orange-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-8xl">{page.emoji}</div>
            <CardTitle className="text-3xl font-bold text-orange-900 dark:text-orange-100">
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
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
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
                      ? "bg-gradient-to-r from-orange-500 to-amber-500"
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
