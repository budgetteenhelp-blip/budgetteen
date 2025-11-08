import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { AlertTriangleIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

interface Scenario {
  id: number;
  emergency: string;
  emoji: string;
  cost: number;
  budget: { needs: number; wants: number; savings: number };
  options: {
    text: string;
    cuts: { needs?: number; wants?: number; savings?: number };
    feedback: string;
    isGood: boolean;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    emergency: "Your backpack broke and you need a new one for school!",
    emoji: "🎒",
    cost: 25,
    budget: { needs: 50, wants: 30, savings: 20 },
    options: [
      {
        text: "Skip savings this month",
        cuts: { savings: 20 },
        feedback: "Not ideal, but okay for emergencies. Try to replace savings next month!",
        isGood: false,
      },
      {
        text: "Cut wants budget in half",
        cuts: { wants: 15 },
        feedback: "Smart! Reducing fun spending for necessities is a good choice.",
        isGood: true,
      },
      {
        text: "Don't buy it, use a plastic bag",
        cuts: {},
        feedback: "A backpack is a NEED for school. Don't skip important needs!",
        isGood: false,
      },
    ],
  },
  {
    id: 2,
    emergency: "Your bike tire popped and repair costs $15!",
    emoji: "🚲",
    cost: 15,
    budget: { needs: 50, wants: 30, savings: 20 },
    options: [
      {
        text: "Use emergency savings",
        cuts: { savings: 15 },
        feedback: "Perfect! This is exactly what savings are for - emergencies!",
        isGood: true,
      },
      {
        text: "Skip two movie nights",
        cuts: { wants: 15 },
        feedback: "Good choice! Cutting wants to handle problems is smart.",
        isGood: true,
      },
      {
        text: "Walk everywhere instead",
        cuts: {},
        feedback: "Transportation can be important. Using savings is better!",
        isGood: false,
      },
    ],
  },
  {
    id: 3,
    emergency: "You lost your lunch money - need $12 for the week!",
    emoji: "🍱",
    cost: 12,
    budget: { needs: 50, wants: 30, savings: 20 },
    options: [
      {
        text: "Take from savings",
        cuts: { savings: 12 },
        feedback: "Okay choice - food is important. Try to be more careful next time!",
        isGood: true,
      },
      {
        text: "Skip buying that game",
        cuts: { wants: 12 },
        feedback: "Excellent! Needs come before wants. Food is more important!",
        isGood: true,
      },
      {
        text: "Ask friends to share their lunch",
        cuts: {},
        feedback: "That's not sustainable. Always budget for food - it's a need!",
        isGood: false,
      },
    ],
  },
];

export default function Lesson4EmergencyGame({ onComplete }: Props) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleChoice = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);

    if (scenario.options[optionIndex].isGood) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  const option = selectedOption !== null ? scenario.options[selectedOption] : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 p-4 dark:from-blue-950 dark:to-cyan-950">
      <Card className="w-full max-w-3xl border-4 border-blue-300 dark:border-blue-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-900 dark:text-blue-100">
            🚨 Budget Emergency Challenge
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Handle unexpected expenses wisely!
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <div className="text-lg font-semibold">
              Scenario {currentScenario + 1} of {scenarios.length}
            </div>
            <div className="text-lg font-semibold text-green-600">
              Good Choices: {score}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="border-2 border-red-400 bg-gradient-to-br from-red-50 to-orange-50 dark:border-red-700 dark:from-red-950/30 dark:to-orange-950/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <AlertTriangleIcon className="size-12 text-red-600" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
                    EMERGENCY!
                  </h3>
                  <p className="text-lg text-foreground">{scenario.emergency}</p>
                </div>
                <div className="text-6xl">{scenario.emoji}</div>
              </div>
              <div className="rounded-lg bg-white dark:bg-gray-900 p-4 text-center">
                <div className="text-3xl font-bold text-red-600">
                  Cost: ${scenario.cost}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-300 dark:border-blue-700">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3 text-center">Your Current Budget:</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-3 text-center">
                  <div className="text-sm text-muted-foreground">Needs</div>
                  <div className="text-2xl font-bold text-red-900 dark:text-red-100">
                    ${scenario.budget.needs}
                  </div>
                </div>
                <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-3 text-center">
                  <div className="text-sm text-muted-foreground">Wants</div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    ${scenario.budget.wants}
                  </div>
                </div>
                <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-3 text-center">
                  <div className="text-sm text-muted-foreground">Savings</div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                    ${scenario.budget.savings}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {!showFeedback ? (
            <div className="space-y-3">
              <h4 className="font-semibold text-center text-foreground">
                What will you do?
              </h4>
              {scenario.options.map((opt, index) => (
                <Button
                  key={index}
                  size="lg"
                  className="h-auto w-full whitespace-normal p-4 text-left text-lg"
                  variant="outline"
                  onClick={() => handleChoice(index)}
                >
                  {opt.text}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <Card
                className={`border-2 ${
                  option?.isGood
                    ? "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/30"
                    : "border-orange-400 bg-orange-50 dark:border-orange-700 dark:bg-orange-950/30"
                }`}
              >
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3">
                    {option?.isGood ? "✓ Good Choice!" : "⚠️ Not the Best Choice"}
                  </h3>
                  <p className="text-lg text-foreground">{option?.feedback}</p>
                </CardContent>
              </Card>

              {currentScenario === scenarios.length - 1 && (
                <Card className="border-2 border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                      💡 Emergency Tips:
                    </h3>
                    <ul className="space-y-1 text-foreground">
                      <li>✓ Use savings for true emergencies</li>
                      <li>✓ Cut wants before touching savings</li>
                      <li>✓ Never skip important needs</li>
                      <li>✓ Rebuild your emergency fund ASAP</li>
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-bold hover:from-blue-600 hover:to-cyan-600"
                onClick={handleNext}
              >
                {currentScenario < scenarios.length - 1
                  ? "Next Emergency →"
                  : `Complete Lesson! ⭐⭐⭐`}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
