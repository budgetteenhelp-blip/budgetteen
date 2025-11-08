import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CoinsIcon, CloudRainIcon, SunIcon, ThermometerIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

interface Decision {
  id: number;
  day: number;
  weather: string;
  weatherIcon: typeof SunIcon;
  scenario: string;
  question: string;
  options: {
    text: string;
    result: string;
    profit: number;
  }[];
}

const decisions: Decision[] = [
  {
    id: 1,
    day: 1,
    weather: "Hot and Sunny",
    weatherIcon: SunIcon,
    scenario: "It's your first day! The temperature is 90°F and people are looking for refreshments.",
    question: "How many cups of lemonade should you make?",
    options: [
      {
        text: "10 cups (play it safe)",
        result: "You sold all 10 cups quickly! But you could have sold more. Profit: $15",
        profit: 15,
      },
      {
        text: "30 cups (medium stock)",
        result: "Perfect! You sold all 30 cups. People were thirsty! Profit: $45",
        profit: 45,
      },
      {
        text: "50 cups (big gamble)",
        result: "You only sold 35 cups before it got late. Had to throw away 15 cups. Profit: $37.50",
        profit: 37.5,
      },
    ],
  },
  {
    id: 2,
    day: 2,
    weather: "Cloudy",
    weatherIcon: CloudRainIcon,
    scenario: "Today is cloudy and cooler. Not as many people are out walking around.",
    question: "What should you do?",
    options: [
      {
        text: "Make 30 cups like yesterday",
        result: "It's slower than yesterday. You only sold 15 cups and wasted a lot. Profit: $7.50",
        profit: 7.5,
      },
      {
        text: "Make 15 cups (adjust to weather)",
        result: "Smart! You sold all 15 cups without waste. Profit: $22.50",
        profit: 22.5,
      },
      {
        text: "Close for the day (save costs)",
        result: "You saved on supplies but made no money. Profit: $0",
        profit: 0,
      },
    ],
  },
  {
    id: 3,
    day: 3,
    weather: "Hot and Sunny",
    weatherIcon: ThermometerIcon,
    scenario: "Another hot day! Word has spread about your delicious lemonade. A local store offers to sell your lemonade.",
    question: "What's your strategy?",
    options: [
      {
        text: "Stay at your stand only",
        result: "Steady sales at your stand. Sold 30 cups. Profit: $45",
        profit: 45,
      },
      {
        text: "Partner with the store (share profits)",
        result: "Great move! The store sold 20 cups for you. You make less per cup but sell more total. Profit: $60",
        profit: 60,
      },
      {
        text: "Make fancy organic lemonade (higher price)",
        result: "Some people love it, but many think it's too expensive. Sold 20 cups at higher price. Profit: $55",
        profit: 55,
      },
    ],
  },
];

export default function Lesson4LemonadeGame({ onComplete }: Props) {
  const [currentDecision, setCurrentDecision] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [totalProfit, setTotalProfit] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const decision = decisions[currentDecision];

  const handleChoice = (optionIndex: number) => {
    const option = decision.options[optionIndex];
    setSelectedOption(optionIndex);
    setTotalProfit(totalProfit + option.profit);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentDecision < decisions.length - 1) {
      setCurrentDecision(currentDecision + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      onComplete();
    }
  };

  const WeatherIcon = decision.weatherIcon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-purple-300 dark:border-purple-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">🍋</div>
            <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              Lemonade Stand Simulator
            </CardTitle>
            <div className="flex items-center justify-center gap-4 text-lg font-bold">
              <div className="flex items-center gap-2">
                <CoinsIcon className="size-5 text-yellow-600" />
                <span>Total Profit: ${totalProfit.toFixed(2)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-950/50">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">
                  Day {decision.day}
                </span>
                <div className="flex items-center gap-2">
                  <WeatherIcon className="size-5" />
                  <span className="font-semibold">{decision.weather}</span>
                </div>
              </div>
              <p className="mb-4 text-base text-foreground">
                {decision.scenario}
              </p>
              <div className="rounded-lg bg-white p-4 dark:bg-card">
                <p className="font-semibold text-foreground">
                  {decision.question}
                </p>
              </div>
            </div>

            {!showResult ? (
              <div className="space-y-3">
                {decision.options.map((option, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant="outline"
                    onClick={() => handleChoice(index)}
                    className="h-auto w-full justify-start py-4 text-left text-base hover:border-purple-500"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 p-6 dark:from-green-950/50 dark:to-emerald-950/50">
                  <p className="mb-3 flex items-center gap-2 text-lg font-bold text-green-900 dark:text-green-100">
                    <CoinsIcon className="size-5" />
                    Result:
                  </p>
                  <p className="text-base text-foreground">
                    {selectedOption !== null && decision.options[selectedOption].result}
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {currentDecision < decisions.length - 1
                    ? "Next Day"
                    : "Complete Lesson"}
                </Button>
              </div>
            )}

            <div className="flex gap-1">
              {decisions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index < currentDecision
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : index === currentDecision
                        ? "bg-purple-300 dark:bg-purple-700"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {currentDecision === decisions.length - 1 && showResult && (
              <div className="rounded-lg bg-purple-100 p-4 dark:bg-purple-900/50">
                <p className="text-center text-lg font-bold text-purple-900 dark:text-purple-100">
                  🎉 Final Profit: ${totalProfit.toFixed(2)}
                </p>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {totalProfit >= 100
                    ? "Amazing! You're a natural entrepreneur!"
                    : totalProfit >= 70
                      ? "Great job! You made smart decisions!"
                      : "Good effort! Every entrepreneur learns from experience!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
