import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ClockIcon, CheckCircleIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

interface VolunteerOption {
  id: number;
  scenario: string;
  timeOption: {
    title: string;
    emoji: string;
    description: string;
    time: string;
    impact: string;
  };
  moneyOption: {
    title: string;
    emoji: string;
    description: string;
    amount: number;
    impact: string;
  };
  lesson: string;
}

const options: VolunteerOption[] = [
  {
    id: 1,
    scenario: "Your local animal shelter needs help this weekend. You have $15 and 4 hours of free time. How will you contribute?",
    timeOption: {
      title: "Volunteer Your Time",
      emoji: "⏰",
      description: "Spend 4 hours walking dogs, cleaning kennels, and socializing cats",
      time: "4 hours",
      impact: "You directly help 12 dogs get exercise and attention they desperately need. The shelter staff is so grateful for your hands-on help!",
    },
    moneyOption: {
      title: "Donate Money",
      emoji: "💵",
      description: "Donate your $15 to buy food and supplies",
      amount: 15,
      impact: "Your $15 provides 30 pounds of dog food, feeding multiple shelter dogs for several days. Financial support is crucial!",
    },
    lesson: "Both matter! Shelters need volunteers AND money. Time gives personal connection; money provides essential resources.",
  },
  {
    id: 2,
    scenario: "A community garden needs support. You have $20 and 3 hours this Saturday. What's your choice?",
    timeOption: {
      title: "Work in the Garden",
      emoji: "🌱",
      description: "Spend 3 hours planting vegetables, weeding, and watering",
      time: "3 hours",
      impact: "You plant 50 vegetable seedlings that will feed 10 families! Your physical effort directly grows food for the community.",
    },
    moneyOption: {
      title: "Buy Seeds & Tools",
      emoji: "💰",
      description: "Donate $20 for seeds, soil, and gardening tools",
      amount: 20,
      impact: "Your $20 buys seeds for an entire season! This helps the garden grow even when volunteers can't be there.",
    },
    lesson: "Gardens need both! Volunteers do the physical work, while donations buy the supplies needed to keep growing.",
  },
  {
    id: 3,
    scenario: "Your school's literacy program needs help with after-school tutoring. You have $25 and 5 hours available per week. How do you help?",
    timeOption: {
      title: "Tutor Students",
      emoji: "📚",
      description: "Spend 5 hours weekly tutoring struggling readers one-on-one",
      time: "5 hours/week",
      impact: "You help 5 kids improve their reading skills every week! Your personal mentorship changes their confidence and future.",
    },
    moneyOption: {
      title: "Buy Books",
      emoji: "📖",
      description: "Donate $25 to buy age-appropriate reading books",
      amount: 25,
      impact: "Your $25 buys 5-8 books that stay in the program forever, helping hundreds of students over the years!",
    },
    lesson: "Education needs both! One-on-one time creates breakthroughs, while books provide the resources students need to practice.",
  },
  {
    id: 4,
    scenario: "A fundraiser for the homeless shelter gives you a choice. You have $30 and 2 hours. What's your strategy?",
    timeOption: {
      title: "Volunteer at Event",
      emoji: "🎪",
      description: "Help set up, serve food, and talk with guests for 2 hours",
      time: "2 hours",
      impact: "You serve 100 meals and make guests feel welcomed and valued. Your presence creates a warm, caring environment.",
    },
    moneyOption: {
      title: "Sponsor Meals",
      emoji: "🍽️",
      description: "Donate $30 to sponsor meals for people in need",
      amount: 30,
      impact: "Your $30 provides 15 hot meals for people experiencing homelessness. Direct financial support fills bellies!",
    },
    lesson: "Homelessness requires both! Volunteers provide dignity and care, while money provides the actual food and shelter needed.",
  },
];

export default function Lesson5VolunteerGame({ onComplete }: Props) {
  const [currentOption, setCurrentOption] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<"time" | "money" | null>(null);
  const [showLesson, setShowLesson] = useState(false);

  const option = options[currentOption];

  const handleChoice = (choice: "time" | "money") => {
    setSelectedChoice(choice);
    setShowLesson(true);
  };

  const handleNext = () => {
    if (currentOption < options.length - 1) {
      setCurrentOption(currentOption + 1);
      setSelectedChoice(null);
      setShowLesson(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 dark:from-teal-950 dark:via-green-950 dark:to-emerald-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-teal-300 dark:border-teal-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">🤲</div>
            <CardTitle className="text-2xl font-bold text-teal-900 dark:text-teal-100">
              Time vs Money: Both Matter!
            </CardTitle>
            <p className="text-muted-foreground">
              Learn about different ways to give back
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-teal-50 p-6 dark:bg-teal-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
                Situation {currentOption + 1} of {options.length}
              </p>
              <div className="mb-6 rounded-lg bg-white p-4 dark:bg-card">
                <p className="text-base text-foreground">{option.scenario}</p>
              </div>

              {!showLesson ? (
                <div className="space-y-3">
                  <p className="text-center font-semibold text-foreground">
                    How will you contribute?
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleChoice("time")}
                    className="h-auto w-full justify-start whitespace-normal py-4 text-left hover:border-teal-500"
                  >
                    <div className="mr-4 text-3xl">{option.timeOption.emoji}</div>
                    <div className="flex-1">
                      <div className="mb-1 font-bold">{option.timeOption.title}</div>
                      <div className="mb-2 text-sm text-muted-foreground">
                        {option.timeOption.description}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-teal-600">
                        <ClockIcon className="size-4" />
                        {option.timeOption.time}
                      </div>
                    </div>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleChoice("money")}
                    className="h-auto w-full justify-start whitespace-normal py-4 text-left hover:border-teal-500"
                  >
                    <div className="mr-4 text-3xl">{option.moneyOption.emoji}</div>
                    <div className="flex-1">
                      <div className="mb-1 font-bold">{option.moneyOption.title}</div>
                      <div className="mb-2 text-sm text-muted-foreground">
                        {option.moneyOption.description}
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        Donate: ${option.moneyOption.amount}
                      </div>
                    </div>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 p-6 dark:from-green-950/50 dark:to-emerald-950/50">
                    <p className="mb-3 flex items-center gap-2 text-lg font-bold text-green-900 dark:text-green-100">
                      <CheckCircleIcon className="size-6 text-green-600" />
                      Great Choice!
                    </p>
                    <p className="mb-2 text-base font-semibold text-foreground">
                      {selectedChoice === "time"
                        ? option.timeOption.title
                        : option.moneyOption.title}
                    </p>
                    <p className="text-base text-foreground">
                      {selectedChoice === "time"
                        ? option.timeOption.impact
                        : option.moneyOption.impact}
                    </p>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                    <p className="mb-2 font-bold text-blue-900 dark:text-blue-100">
                      💡 Key Lesson:
                    </p>
                    <p className="text-sm text-foreground">{option.lesson}</p>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                  >
                    {currentOption < options.length - 1
                      ? "Next Situation"
                      : "Complete Lesson"}
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-1">
              {options.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index < currentOption
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500"
                      : index === currentOption
                        ? "bg-teal-300 dark:bg-teal-700"
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
