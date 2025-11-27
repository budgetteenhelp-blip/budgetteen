import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PiggyBank, Building, TrendingUp, CheckCircle2 } from "lucide-react";

interface Lesson2PiggyBanksProps {
  onComplete: () => void;
}

interface SavingsOption {
  id: string;
  name: string;
  icon: typeof PiggyBank;
  pros: string[];
  cons: string[];
  bestFor: string;
}

const savingsOptions: SavingsOption[] = [
  {
    id: "piggy",
    name: "Piggy Bank at Home",
    icon: PiggyBank,
    pros: [
      "Easy to access anytime",
      "See your money grow",
      "No paperwork needed",
      "Great for beginners",
    ],
    cons: [
      "No interest earned",
      "Could be spent easily",
      "Not protected if lost",
    ],
    bestFor: "Short-term goals and small amounts",
  },
  {
    id: "bank",
    name: "Savings Account",
    icon: Building,
    pros: [
      "Money is safe and protected",
      "Earns interest over time",
      "Can access when needed",
      "FDIC insured",
    ],
    cons: [
      "May have minimum balance",
      "Takes time to withdraw",
      "Need parent help for minors",
    ],
    bestFor: "Medium to long-term savings goals",
  },
  {
    id: "investment",
    name: "Investment Account",
    icon: TrendingUp,
    pros: [
      "Potential for high growth",
      "Money works harder for you",
      "Good for long-term goals",
      "Learn about investing",
    ],
    cons: [
      "Value can go up and down",
      "Usually need parent help",
      "Best for money you won't need soon",
    ],
    bestFor: "Long-term goals like college or future",
  },
];

export default function Lesson2PiggyBanks({
  onComplete,
}: Lesson2PiggyBanksProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [learnedOptions, setLearnedOptions] = useState<Set<string>>(new Set());

  const handleLearnMore = (id: string) => {
    setSelectedOption(id);
    setLearnedOptions(new Set([...learnedOptions, id]));
  };

  const selectedSaving = savingsOptions.find((o) => o.id === selectedOption);
  const allLearned = learnedOptions.size === savingsOptions.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4">
      <div className="max-w-4xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <h2 className="text-3xl font-bold text-center mb-2">
            The Three Piggy Banks
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Penny shows you three different places to save your money. Each has
            its own superpowers!
          </p>

          {!selectedOption ? (
            <>
              <div className="grid gap-4 md:grid-cols-3">
                {savingsOptions.map((option) => {
                  const Icon = option.icon;
                  const learned = learnedOptions.has(option.id);

                  return (
                    <Card
                      key={option.id}
                      className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                        learned ? "border-2 border-green-500" : ""
                      }`}
                      onClick={() => handleLearnMore(option.id)}
                    >
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="font-bold text-lg">{option.name}</h3>
                        {learned && (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm font-semibold">
                              Learned!
                            </span>
                          </div>
                        )}
                        <Button
                          className="w-full"
                          variant={learned ? "outline" : "default"}
                        >
                          {learned ? "Review" : "Learn More"}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {allLearned && (
                <div className="mt-6 text-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                    onClick={onComplete}
                  >
                    Complete Lesson
                  </Button>
                </div>
              )}

              {learnedOptions.size > 0 && !allLearned && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  {learnedOptions.size} of {savingsOptions.length} explored
                </p>
              )}
            </>
          ) : (
            selectedSaving && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shrink-0">
                    {(() => {
                      const Icon = selectedSaving.icon;
                      return <Icon className="w-10 h-10 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedSaving.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedSaving.bestFor}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-green-50 dark:bg-green-950/30">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">
                      ✓ Advantages
                    </h4>
                    <ul className="space-y-2">
                      {selectedSaving.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-4 bg-orange-50 dark:bg-orange-950/30">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-3">
                      ⚠ Things to Know
                    </h4>
                    <ul className="space-y-2">
                      {selectedSaving.cons.map((con, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-orange-600">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
                  <p className="font-semibold text-blue-700 dark:text-blue-300">
                    💡 Best For: {selectedSaving.bestFor}
                  </p>
                </Card>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedOption(null)}
                >
                  Back to All Options
                </Button>
              </div>
            )
          )}
        </Card>
      </div>
    </div>
  );
}
