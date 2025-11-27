import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const storyPages = [
  {
    emoji: "🌳",
    title: "Welcome to The Giving Grove!",
    text: "Welcome to the most beautiful place in all the lands - The Giving Grove! This magical forest thrives because everyone who visits gives back. Here, you'll learn that money isn't just for spending on yourself - it's also a tool to help others and make the world better!",
  },
  {
    emoji: "👵",
    title: "Meet Grandma Willow",
    text: "\"Hello, dear child! I'm Grandma Willow, and I've lived in this grove for 100 years. I've seen how giving creates a beautiful cycle - when you help others, the whole community becomes stronger, happier, and more prosperous. Let me show you why giving matters!\"",
  },
  {
    emoji: "💚",
    title: "Why Give Back?",
    text: "When you earn or receive money, sharing a portion helps: people in need (food banks, homeless shelters), your community (parks, libraries, schools), causes you care about (animals, environment, medical research), and it makes YOU feel good too! Giving creates positive change.",
  },
  {
    emoji: "🎁",
    title: "Different Ways to Give",
    text: "You can give back in many ways: Donating money to charities, volunteering your time and skills, donating clothes or items you don't use, helping neighbors or friends in need, or even just being kind and generous with your knowledge. Every bit helps!",
  },
  {
    emoji: "🏛️",
    title: "Taxes: Everyone's Contribution",
    text: "\"We also have something called taxes,\" explains Grandma Willow. \"When you earn money, the government collects a portion to pay for things everyone needs - roads, schools, hospitals, police, firefighters. Think of it as everyone chipping in for the community!\"",
  },
  {
    emoji: "✨",
    title: "The Magic of Giving",
    text: "\"The grove teaches us that generosity creates abundance,\" says Grandma Willow. \"When you give from your heart - whether money, time, or kindness - you plant seeds that grow into something beautiful. And remember: you don't have to be rich to give. Start small!\"",
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
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 dark:from-teal-950 dark:via-green-950 dark:to-emerald-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-teal-300 dark:border-teal-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-8xl">{page.emoji}</div>
            <CardTitle className="text-3xl font-bold text-teal-900 dark:text-teal-100">
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
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
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
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500"
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
