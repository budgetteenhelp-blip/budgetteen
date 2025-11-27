import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

const storyPages = [
  {
    emoji: "🏛️",
    title: "The Community Treasury",
    text: "Grandma Willow takes you to a magnificent building in the grove. \"This is our Community Treasury. Let me explain something important that every citizen needs to understand: taxes!\"",
  },
  {
    emoji: "💰",
    title: "What Are Taxes?",
    text: "\"Taxes are money that the government collects from people who earn income,\" Grandma Willow explains. \"When you get a paycheck as a teen or adult, a portion goes to federal, state, and sometimes local government. This is required by law.\"",
  },
  {
    emoji: "🚗",
    title: "Where Do Taxes Go?",
    text: "Taxes pay for things everyone uses: Roads, bridges, and highways. Public schools and libraries. Police, firefighters, and ambulances. Parks and playgrounds. National defense. Government programs to help people in need. These services benefit everyone!",
  },
  {
    emoji: "📊",
    title: "Types of Taxes Teens Should Know",
    text: "Income tax (taken from paychecks), Sales tax (added when you buy things at stores), Property tax (homeowners pay for their house - your parents likely pay this). As a teen with a job, you'll mainly encounter income tax on your paychecks.",
  },
  {
    emoji: "💵",
    title: "Understanding Your Paycheck",
    text: "If you earn $100, you might get $85-$90 after taxes. The rest goes to the government. This is called 'gross pay' (before taxes) vs 'net pay' (after taxes, what you take home). Don't be surprised when your paycheck is less than you expected!",
  },
  {
    emoji: "🤝",
    title: "Taxes = Community Investment",
    text: "\"Think of taxes as everyone chipping in for the common good,\" says Grandma Willow. \"While it might feel like 'losing' money, you benefit from schools, roads, safety, and more. It's how we build a functioning society together!\"",
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
