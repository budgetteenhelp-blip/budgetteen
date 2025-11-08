import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Coins,
  PiggyBank,
  ShoppingCart,
  Calculator,
  Lightbulb,
  Smartphone,
  Heart,
  CheckCircle2,
} from "lucide-react";

interface Lesson2FinancialJourneyProps {
  onComplete: () => void;
}

const worlds = [
  {
    number: 1,
    name: "Coinville",
    icon: Coins,
    color: "from-yellow-500 to-orange-500",
    lessons: [
      "What is money and why do we use it?",
      "Trading and bartering basics",
      "How money solves problems",
      "Ways to earn money as a teen",
      "Needs vs. wants",
    ],
  },
  {
    number: 2,
    name: "Piggy Bank Peaks",
    icon: PiggyBank,
    color: "from-pink-500 to-rose-500",
    lessons: [
      "Why saving matters",
      "The power of compound interest",
      "Setting savings goals",
      "Emergency funds",
      "Different places to save",
    ],
  },
  {
    number: 3,
    name: "The Market Maze",
    icon: ShoppingCart,
    color: "from-blue-500 to-cyan-500",
    lessons: [
      "Smart shopping strategies",
      "Comparing prices",
      "Understanding discounts",
      "Avoiding impulse purchases",
      "Quality vs. price",
    ],
  },
  {
    number: 4,
    name: "Town Treasury Quest",
    icon: Calculator,
    color: "from-green-500 to-emerald-500",
    lessons: [
      "What is a budget?",
      "Income, expenses, and savings",
      "The 50/30/20 rule",
      "Handling emergencies",
      "Building your budget",
    ],
  },
  {
    number: 5,
    name: "Entrepreneur Island",
    icon: Lightbulb,
    color: "from-purple-500 to-violet-500",
    lessons: [
      "What is entrepreneurship?",
      "Finding problems to solve",
      "Understanding customers",
      "Running a business",
      "Pricing your products",
    ],
  },
  {
    number: 6,
    name: "Digital Dunes",
    icon: Smartphone,
    color: "from-indigo-500 to-blue-500",
    lessons: [
      "Digital payment methods",
      "Online banking safety",
      "Spotting scams",
      "Protecting your information",
      "Digital wallet security",
    ],
  },
  {
    number: 7,
    name: "The Giving Grove",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    lessons: [
      "Why giving matters",
      "Types of charities",
      "Community giving",
      "Choosing where to donate",
      "Giving time vs. money",
    ],
  },
];

export default function Lesson2FinancialJourney({
  onComplete,
}: Lesson2FinancialJourneyProps) {
  const [selectedWorld, setSelectedWorld] = useState<number | null>(null);
  const [completedReview, setCompletedReview] = useState<Set<number>>(
    new Set()
  );

  const handleWorldClick = (worldNum: number) => {
    setSelectedWorld(worldNum);
  };

  const handleMarkReviewed = () => {
    if (selectedWorld !== null) {
      setCompletedReview(new Set([...completedReview, selectedWorld]));
      setSelectedWorld(null);
    }
  };

  const selectedWorldData = worlds.find((w) => w.number === selectedWorld);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4">
      <div className="max-w-4xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <h2 className="text-3xl font-bold text-center mb-2">
            Your Financial Journey
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Review what you learned in each world. Click on each world to see
            the key lessons!
          </p>

          {!selectedWorld ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {worlds.map((world) => {
                  const Icon = world.icon;
                  const isReviewed = completedReview.has(world.number);

                  return (
                    <Card
                      key={world.number}
                      className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                        isReviewed ? "border-green-500 border-2" : ""
                      }`}
                      onClick={() => handleWorldClick(world.number)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-br ${world.color} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold">World {world.number}</h3>
                            {isReviewed && (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {world.name}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {completedReview.size === worlds.length && (
                <div className="mt-6 text-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={onComplete}
                  >
                    Continue to Next Lesson
                  </Button>
                </div>
              )}

              {completedReview.size > 0 &&
                completedReview.size < worlds.length && (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    {completedReview.size} of {worlds.length} worlds reviewed
                  </p>
                )}
            </>
          ) : (
            selectedWorldData && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedWorldData.color} flex items-center justify-center`}
                  >
                    {(() => {
                      const Icon = selectedWorldData.icon;
                      return <Icon className="w-10 h-10 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      World {selectedWorldData.number}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {selectedWorldData.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Key Lessons:</h4>
                  {selectedWorldData.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold">{idx + 1}</span>
                      </div>
                      <p>{lesson}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedWorld(null)}
                  >
                    Back to Map
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleMarkReviewed}
                    disabled={completedReview.has(selectedWorldData.number)}
                  >
                    {completedReview.has(selectedWorldData.number)
                      ? "Reviewed ✓"
                      : "Mark as Reviewed"}
                  </Button>
                </div>
              </div>
            )
          )}
        </Card>
      </div>
    </div>
  );
}
