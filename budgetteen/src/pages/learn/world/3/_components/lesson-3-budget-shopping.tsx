import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, ShoppingCart } from "lucide-react";

interface Lesson3BudgetShoppingProps {
  onComplete: () => void;
}

interface Item {
  name: string;
  price: number;
  isNeed: boolean;
  emoji: string;
}

const shoppingList: Item[] = [
  { name: "School Supplies", price: 25, isNeed: true, emoji: "📚" },
  { name: "Winter Jacket", price: 60, isNeed: true, emoji: "🧥" },
  { name: "Video Game", price: 50, isNeed: false, emoji: "🎮" },
  { name: "Lunch Money", price: 20, isNeed: true, emoji: "🍔" },
  { name: "Designer Sunglasses", price: 45, isNeed: false, emoji: "🕶️" },
  { name: "New Phone Case", price: 15, isNeed: false, emoji: "📱" },
  { name: "Sneakers (old ones broken)", price: 55, isNeed: true, emoji: "👟" },
  { name: "Concert Tickets", price: 40, isNeed: false, emoji: "🎵" },
];

export default function Lesson3BudgetShopping({
  onComplete,
}: Lesson3BudgetShoppingProps) {
  const [budget] = useState(200);
  const [cart, setCart] = useState<Item[]>([]);
  const [showResults, setShowResults] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const remaining = budget - total;
  const needsInCart = cart.filter((item) => item.isNeed);
  const allNeeds = shoppingList.filter((item) => item.isNeed);
  const allNeedsPurchased = allNeeds.every((need) =>
    cart.some((item) => item.name === need.name)
  );

  const toggleItem = (item: Item) => {
    if (cart.includes(item)) {
      setCart(cart.filter((i) => i !== item));
    } else {
      if (total + item.price <= budget) {
        setCart([...cart, item]);
      }
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (showResults) {
    const success = allNeedsPurchased && remaining >= 0;
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="p-8 space-y-6">
            <div className="flex justify-center">
              <div
                className={`w-24 h-24 rounded-full ${
                  success
                    ? "bg-gradient-to-br from-green-500 to-emerald-500"
                    : "bg-gradient-to-br from-orange-500 to-amber-500"
                } flex items-center justify-center`}
              >
                {success ? (
                  <CheckCircle2 className="w-12 h-12 text-white" />
                ) : (
                  <XCircle className="w-12 h-12 text-white" />
                )}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">
                {success ? "Perfect Shopping! 🎉" : "Almost There!"}
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-muted-foreground">You spent:</p>
                  <p className="text-4xl font-bold text-green-600">${total}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Remaining budget:</p>
                  <p
                    className={`text-2xl font-bold ${
                      remaining >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${remaining}
                  </p>
                </div>
              </div>
            </div>

            <Card
              className={`p-4 ${
                allNeedsPurchased
                  ? "bg-green-50 dark:bg-green-950/30"
                  : "bg-orange-50 dark:bg-orange-950/30"
              }`}
            >
              <p className="font-semibold mb-2">
                {allNeedsPurchased
                  ? "✓ All Needs Covered"
                  : "⚠️ Missing Some Needs"}
              </p>
              <p className="text-sm">
                Needs purchased: {needsInCart.length}/{allNeeds.length}
              </p>
              {!allNeedsPurchased && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>You're missing:</p>
                  <ul className="list-disc list-inside">
                    {allNeeds
                      .filter(
                        (need) => !cart.some((item) => item.name === need.name)
                      )
                      .map((need) => (
                        <li key={need.name}>{need.name}</li>
                      ))}
                  </ul>
                </div>
              )}
            </Card>

            <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
              <h3 className="font-semibold mb-2">💡 Smart Shopping Tips:</h3>
              <ul className="text-sm space-y-1">
                <li>• Always buy your needs first</li>
                <li>• Stay within your budget</li>
                <li>• Only buy wants if you have money left over</li>
                <li>• It's okay to save the leftover money!</li>
              </ul>
            </Card>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              onClick={success ? onComplete : () => setShowResults(false)}
            >
              {success ? "Complete Lesson" : "Try Again"}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
      <div className="max-w-4xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <h2 className="text-3xl font-bold text-center mb-2">
            Budget Shopping Challenge
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Buy everything you NEED within your ${budget} budget!
          </p>

          <Card className="p-4 bg-muted mb-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="text-2xl font-bold">${budget}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cart Total</p>
                <p className="text-2xl font-bold text-blue-600">${total}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p
                  className={`text-2xl font-bold ${
                    remaining >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${remaining}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-3 md:grid-cols-2 mb-6">
            {shoppingList.map((item) => {
              const inCart = cart.includes(item);
              const canAfford = total + item.price <= budget;

              return (
                <Card
                  key={item.name}
                  className={`p-4 cursor-pointer transition-all ${
                    inCart
                      ? "border-2 border-green-500 bg-green-50 dark:bg-green-950/30"
                      : !canAfford && !inCart
                        ? "opacity-50"
                        : "hover:shadow-lg"
                  }`}
                  onClick={() => (canAfford || inCart) && toggleItem(item)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.emoji}</span>
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">
                            ${item.price}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              item.isNeed
                                ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                            }`}
                          >
                            {item.isNeed ? "NEED" : "WANT"}
                          </span>
                        </div>
                      </div>
                    </div>
                    {inCart && (
                      <div className="flex items-center gap-2 text-green-600">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="font-semibold">In Cart</span>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            onClick={handleSubmit}
            disabled={cart.length === 0}
          >
            Check Out ({cart.length} items)
          </Button>
        </Card>
      </div>
    </div>
  );
}
