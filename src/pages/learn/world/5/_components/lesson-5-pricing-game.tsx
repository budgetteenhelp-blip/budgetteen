import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { CoinsIcon, TrendingUpIcon, AlertCircleIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

interface PricingScenario {
  id: number;
  business: string;
  emoji: string;
  itemName: string;
  costPerItem: number;
  recommendedPrice: number;
  minPrice: number;
  maxPrice: number;
  marketInfo: string;
}

const scenarios: PricingScenario[] = [
  {
    id: 1,
    business: "Handmade Bracelets",
    emoji: "📿",
    itemName: "bracelet",
    costPerItem: 3,
    recommendedPrice: 8,
    minPrice: 4,
    maxPrice: 15,
    marketInfo: "Your materials cost $3 per bracelet. Similar handmade bracelets at craft fairs sell for $7-$10.",
  },
  {
    id: 2,
    business: "Lawn Mowing Service",
    emoji: "🏡",
    itemName: "lawn",
    costPerItem: 5,
    recommendedPrice: 20,
    minPrice: 10,
    maxPrice: 40,
    marketInfo: "Gas and equipment maintenance costs about $5 per lawn. Professional services charge $25-$30 for similar-sized lawns.",
  },
  {
    id: 3,
    business: "Homemade Cookies",
    emoji: "🍪",
    itemName: "dozen cookies",
    costPerItem: 4,
    recommendedPrice: 12,
    minPrice: 6,
    maxPrice: 20,
    marketInfo: "Ingredients cost $4 per dozen. Bakery cookies sell for $12-$15 per dozen, but yours are fresh and homemade!",
  },
];

export default function Lesson5PricingGame({ onComplete }: Props) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [price, setPrice] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "excellent" | "good" | "low" | "high";
    message: string;
    profit: number;
  } | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  const scenario = scenarios[currentScenario];

  const handleCheckPrice = () => {
    const priceNum = parseFloat(price);

    if (isNaN(priceNum) || priceNum < 0) {
      return;
    }

    const profit = priceNum - scenario.costPerItem;
    const profitMargin = (profit / priceNum) * 100;

    let result: typeof feedback;

    if (priceNum < scenario.costPerItem) {
      result = {
        type: "low",
        message: `Oh no! You're losing money! Each ${scenario.itemName} costs $${scenario.costPerItem} to make, but you're only charging $${priceNum}. You'd lose $${(scenario.costPerItem - priceNum).toFixed(2)} per item!`,
        profit: priceNum - scenario.costPerItem,
      };
      setTotalScore(totalScore + 0);
    } else if (priceNum < scenario.minPrice) {
      result = {
        type: "low",
        message: `You're making a tiny profit of $${profit.toFixed(2)}, but you're underselling yourself! Your time and skill are valuable. Try pricing closer to $${scenario.recommendedPrice}.`,
        profit: profit,
      };
      setTotalScore(totalScore + 5);
    } else if (priceNum > scenario.maxPrice) {
      result = {
        type: "high",
        message: `That's quite expensive! While your profit would be $${profit.toFixed(2)}, customers might not buy at $${priceNum} when competitors charge less. Consider pricing around $${scenario.recommendedPrice}.`,
        profit: profit,
      };
      setTotalScore(totalScore + 5);
    } else if (
      priceNum >= scenario.recommendedPrice - 2 &&
      priceNum <= scenario.recommendedPrice + 2
    ) {
      result = {
        type: "excellent",
        message: `Perfect pricing! 🎯 You'd make $${profit.toFixed(2)} profit per ${scenario.itemName} (${profitMargin.toFixed(0)}% margin). This is competitive and gives you good profit!`,
        profit: profit,
      };
      setTotalScore(totalScore + 10);
    } else {
      result = {
        type: "good",
        message: `Not bad! You'd make $${profit.toFixed(2)} profit per ${scenario.itemName}. This price works, though $${scenario.recommendedPrice} might be ideal for this market.`,
        profit: profit,
      };
      setTotalScore(totalScore + 7);
    }

    setFeedback(result);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setPrice("");
      setShowResult(false);
      setFeedback(null);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-purple-300 dark:border-purple-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">{scenario.emoji}</div>
            <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              Pricing Challenge: {scenario.business}
            </CardTitle>
            <div className="flex items-center justify-center gap-2 text-lg font-bold">
              <TrendingUpIcon className="size-5 text-green-600" />
              <span>Score: {totalScore} / {scenarios.length * 10}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">
                Scenario {currentScenario + 1} of {scenarios.length}
              </p>
              <p className="mb-4 text-base text-foreground">
                {scenario.marketInfo}
              </p>
              <div className="rounded-lg bg-white p-4 dark:bg-card">
                <div className="mb-2 flex items-center gap-2">
                  <CoinsIcon className="size-5 text-amber-600" />
                  <span className="font-semibold">Cost to make:</span>
                  <span className="text-lg font-bold text-amber-600">
                    ${scenario.costPerItem}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Remember: Price must be higher than cost to make profit!
                </p>
              </div>
            </div>

            {!showResult ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-center text-lg font-semibold text-foreground">
                    What price will you charge per {scenario.itemName}?
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold">
                        $
                      </span>
                      <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        className="h-14 pl-8 text-lg"
                        min="0"
                        step="0.50"
                      />
                    </div>
                    <Button
                      size="lg"
                      onClick={handleCheckPrice}
                      disabled={!price}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Check Price
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                  <p className="flex items-start gap-2 text-sm text-foreground">
                    <AlertCircleIcon className="size-4 shrink-0" />
                    <span>
                      <strong>Pricing Tip:</strong> Your profit is the difference
                      between your price and your costs. A good profit margin for
                      small businesses is usually 40-60%.
                    </span>
                  </p>
                </div>
              </div>
            ) : feedback && (
              <div className="space-y-4">
                <div
                  className={`rounded-lg p-6 ${
                    feedback.type === "excellent"
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50"
                      : feedback.type === "good"
                        ? "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50"
                        : feedback.type === "low"
                          ? "bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-950/50 dark:to-orange-950/50"
                          : "bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-950/50 dark:to-amber-950/50"
                  }`}
                >
                  <p className="mb-2 text-lg font-bold">Your price: ${parseFloat(price).toFixed(2)}</p>
                  <p className="text-base text-foreground">{feedback.message}</p>
                </div>

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {currentScenario < scenarios.length - 1
                    ? "Next Business"
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
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : index === currentScenario
                        ? "bg-purple-300 dark:bg-purple-700"
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
