import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CoinsIcon, HeartIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

interface DonationScenario {
  id: number;
  situation: string;
  yourMoney: number;
  options: {
    charity: string;
    emoji: string;
    amount: number;
    description: string;
    impact: string;
  }[];
}

const scenarios: DonationScenario[] = [
  {
    id: 1,
    situation: "You earned $50 from babysitting and want to donate 10% ($5) to charity. Which cause speaks to your heart?",
    yourMoney: 50,
    options: [
      {
        charity: "Local Animal Shelter",
        emoji: "🐕",
        amount: 5,
        description: "Help rescue dogs and cats find loving homes",
        impact: "Your $5 provides food and supplies for shelter animals for a day. Every animal deserves a chance!",
      },
      {
        charity: "Children's Hospital",
        emoji: "🏥",
        amount: 5,
        description: "Support sick kids and medical research",
        impact: "Your $5 helps buy toys and games for kids staying at the hospital, bringing smiles during tough times.",
      },
      {
        charity: "Environmental Cleanup",
        emoji: "🌊",
        amount: 5,
        description: "Clean up beaches and protect marine life",
        impact: "Your $5 helps remove 50 pounds of trash from oceans, protecting sea turtles and dolphins!",
      },
    ],
  },
  {
    id: 2,
    situation: "It's your birthday and you received $100! You decide to donate $10 to help your community. Where will it make the most impact?",
    yourMoney: 100,
    options: [
      {
        charity: "School Supplies Drive",
        emoji: "📚",
        amount: 10,
        description: "Help students who can't afford school supplies",
        impact: "Your $10 provides a full set of school supplies for one student in need, helping them succeed!",
      },
      {
        charity: "Community Food Bank",
        emoji: "🍲",
        amount: 10,
        description: "Feed families facing hunger in your area",
        impact: "Your $10 provides 30 meals to hungry families in your community. That's impact!",
      },
      {
        charity: "Youth Mentorship Program",
        emoji: "🎯",
        amount: 10,
        description: "Help at-risk teens get mentoring and support",
        impact: "Your $10 provides materials for one mentorship session, changing a young person's life trajectory.",
      },
    ],
  },
  {
    id: 3,
    situation: "You've been saving up and have $200 in your bank. You want to make a bigger impact by donating $20. What cause matters most to you?",
    yourMoney: 200,
    options: [
      {
        charity: "Disaster Relief Fund",
        emoji: "🚨",
        amount: 20,
        description: "Help families affected by natural disasters",
        impact: "Your $20 provides emergency supplies like blankets, water, and food to a family who lost everything.",
      },
      {
        charity: "Free Library Program",
        emoji: "📖",
        amount: 20,
        description: "Build free libraries in underserved neighborhoods",
        impact: "Your $20 buys 4-5 books for a Little Free Library, giving kids access to stories and knowledge!",
      },
      {
        charity: "Wildlife Conservation",
        emoji: "🦁",
        amount: 20,
        description: "Protect endangered species and their habitats",
        impact: "Your $20 helps protect 5 acres of rainforest habitat for endangered species. You're a planet hero!",
      },
    ],
  },
];

export default function Lesson4DonationGame({ onComplete }: Props) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [totalDonated, setTotalDonated] = useState(0);
  const [showImpact, setShowImpact] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleChoice = (optionIndex: number) => {
    const option = scenario.options[optionIndex];
    setSelectedOption(optionIndex);
    setTotalDonated(totalDonated + option.amount);
    setShowImpact(true);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedOption(null);
      setShowImpact(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 dark:from-teal-950 dark:via-green-950 dark:to-emerald-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-teal-300 dark:border-teal-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">💝</div>
            <CardTitle className="text-2xl font-bold text-teal-900 dark:text-teal-100">
              Choose Your Cause
            </CardTitle>
            <div className="flex items-center justify-center gap-4 text-lg font-bold">
              <div className="flex items-center gap-2">
                <HeartIcon className="size-5 fill-red-500 text-red-500" />
                <span>Total Donated: ${totalDonated}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-teal-50 p-6 dark:bg-teal-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
                Scenario {currentScenario + 1} of {scenarios.length}
              </p>
              <div className="mb-4 rounded-lg bg-white p-4 dark:bg-card">
                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <CoinsIcon className="size-4 text-amber-600" />
                  You have: ${scenario.yourMoney}
                </p>
                <p className="text-base text-foreground">{scenario.situation}</p>
              </div>
            </div>

            {!showImpact ? (
              <div className="space-y-3">
                <p className="text-center font-semibold text-foreground">
                  Which charity will you support?
                </p>
                {scenario.options.map((option, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant="outline"
                    onClick={() => handleChoice(index)}
                    className="h-auto w-full justify-start whitespace-normal py-4 text-left hover:border-teal-500"
                  >
                    <div className="mr-4 text-3xl">{option.emoji}</div>
                    <div className="flex-1">
                      <div className="mb-1 font-bold">{option.charity}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-teal-600">
                        Donate: ${option.amount}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 p-6 dark:from-green-950/50 dark:to-emerald-950/50">
                  <p className="mb-3 flex items-center gap-2 text-lg font-bold text-green-900 dark:text-green-100">
                    <HeartIcon className="size-6 fill-red-500 text-red-500" />
                    Amazing Choice!
                  </p>
                  <p className="mb-2 text-base font-semibold text-foreground">
                    {selectedOption !== null && scenario.options[selectedOption].charity}
                  </p>
                  <p className="text-base text-foreground">
                    {selectedOption !== null && scenario.options[selectedOption].impact}
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                >
                  {currentScenario < scenarios.length - 1
                    ? "Next Scenario"
                    : "Complete Lesson"}
                </Button>
              </div>
            )}

            <div className="flex gap-1">
              {scenarios.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index < currentScenario
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500"
                      : index === currentScenario
                        ? "bg-teal-300 dark:bg-teal-700"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {currentScenario === scenarios.length - 1 && showImpact && (
              <div className="rounded-lg bg-teal-100 p-4 dark:bg-teal-900/50">
                <p className="text-center text-lg font-bold text-teal-900 dark:text-teal-100">
                  💚 You donated ${totalDonated} total and made a real difference!
                </p>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Remember: No donation is too small. Every bit helps!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
