import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface Lesson2PriceComparisonProps {
  onComplete: () => void;
}

interface Product {
  name: string;
  emoji: string;
  stores: {
    name: string;
    price: number;
    quality: string;
  }[];
  bestChoice: number;
  explanation: string;
}

const products: Product[] = [
  {
    name: "Wireless Headphones",
    emoji: "🎧",
    stores: [
      { name: "TechMart", price: 45, quality: "Good" },
      { name: "BuyNow", price: 35, quality: "Good" },
      { name: "ElectroShop", price: 50, quality: "Good" },
    ],
    bestChoice: 1,
    explanation:
      "BuyNow has the same quality for $10 less! Always compare prices.",
  },
  {
    name: "Running Shoes",
    emoji: "👟",
    stores: [
      { name: "SportZone", price: 60, quality: "Great" },
      { name: "ShoeWorld", price: 45, quality: "Okay" },
      { name: "AthleteGear", price: 55, quality: "Great" },
    ],
    bestChoice: 2,
    explanation:
      "AthleteGear has great quality for $5 less than SportZone - best value!",
  },
  {
    name: "Backpack",
    emoji: "🎒",
    stores: [
      { name: "School Supply Co", price: 35, quality: "Great" },
      { name: "Discount Bags", price: 20, quality: "Poor" },
      { name: "Trendy Store", price: 50, quality: "Great" },
    ],
    bestChoice: 0,
    explanation:
      "School Supply Co has great quality at a fair price. The cheap one won't last!",
  },
];

export default function Lesson2PriceComparison({
  onComplete,
}: Lesson2PriceComparisonProps) {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const product = products[currentProduct];

  const handleStoreSelect = (index: number) => {
    setSelectedStore(index);
    setShowFeedback(true);
    if (index === product.bestChoice) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentProduct < products.length - 1) {
      setCurrentProduct(currentProduct + 1);
      setSelectedStore(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
      <div className="max-w-3xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Price Comparison Game</h2>
            <div className="text-sm text-muted-foreground">
              Item {currentProduct + 1} of {products.length}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-1">
              {products.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full ${
                    idx < currentProduct
                      ? "bg-green-500"
                      : idx === currentProduct
                        ? "bg-green-500"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{product.emoji}</div>
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-muted-foreground">
                Which store offers the best value?
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {product.stores.map((store, idx) => {
                const isSelected = selectedStore === idx;
                const isBest = idx === product.bestChoice;
                const showCorrect = showFeedback && isBest;
                const showIncorrect = showFeedback && isSelected && !isBest;

                return (
                  <Card
                    key={idx}
                    className={`p-6 cursor-pointer transition-all ${
                      showCorrect
                        ? "border-2 border-green-500 bg-green-50 dark:bg-green-950/30"
                        : showIncorrect
                          ? "border-2 border-red-500 bg-red-50 dark:bg-red-950/30"
                          : isSelected
                            ? "border-2 border-primary"
                            : "hover:shadow-lg"
                    }`}
                    onClick={() =>
                      !showFeedback && handleStoreSelect(idx)
                    }
                  >
                    <div className="space-y-3">
                      <h4 className="font-bold text-lg">{store.name}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Price:
                          </span>
                          <span className="text-2xl font-bold">
                            ${store.price}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Quality:
                          </span>
                          <span
                            className={`font-semibold ${
                              store.quality === "Great"
                                ? "text-green-600"
                                : store.quality === "Good"
                                  ? "text-blue-600"
                                  : "text-orange-600"
                            }`}
                          >
                            {store.quality}
                          </span>
                        </div>
                      </div>
                      {showCorrect && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-semibold">Best Value!</span>
                        </div>
                      )}
                      {showIncorrect && (
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="w-5 h-5" />
                          <span className="font-semibold">Not the best</span>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {showFeedback && (
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
                <p className="font-medium mb-1">
                  {selectedStore === product.bestChoice
                    ? "✓ Great choice!"
                    : "Not quite!"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {product.explanation}
                </p>
              </Card>
            )}

            {showFeedback && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Score: {score}/{currentProduct + 1}
                </div>
                <Button
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  onClick={handleNext}
                >
                  {currentProduct < products.length - 1
                    ? "Next Item"
                    : "Complete Lesson"}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
