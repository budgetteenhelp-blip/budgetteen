import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { SmartphoneIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Props {
  onComplete: () => void;
}

interface PaymentMethod {
  id: number;
  name: string;
  emoji: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 1,
    name: "Cash",
    emoji: "💵",
    description: "Physical bills and coins you can hold",
    pros: ["Works everywhere", "No fees", "Private", "No internet needed"],
    cons: ["Can be lost or stolen", "Hard to track spending", "Not convenient for online shopping"],
    bestFor: "Small purchases, when you want to budget with physical money",
  },
  {
    id: 2,
    name: "Debit Card",
    emoji: "💳",
    description: "Card linked to your bank account that spends your own money",
    pros: ["Widely accepted", "Easy to track", "Can't overspend (uses your money)", "Works online and in stores"],
    cons: ["Can be stolen", "Overdraft fees possible", "Need a bank account"],
    bestFor: "Everyday purchases, staying within budget",
  },
  {
    id: 3,
    name: "Payment Apps (Venmo, Cash App, Zelle)",
    emoji: "📱",
    description: "Mobile apps that let you send money instantly to friends",
    pros: ["Super fast", "Easy to split bills", "Works with friends", "Track history in app"],
    cons: ["Need internet", "Security risks if not careful", "Some charge fees"],
    bestFor: "Splitting bills with friends, sending money quickly",
  },
  {
    id: 4,
    name: "Digital Wallets (Apple Pay, Google Pay)",
    emoji: "📲",
    description: "Pay with your phone by tapping at checkout",
    pros: ["Very secure", "Fast checkout", "No need to carry cards", "Works many places"],
    cons: ["Not accepted everywhere", "Need a smartphone", "Battery can die"],
    bestFor: "Quick in-store purchases, added security",
  },
  {
    id: 5,
    name: "Online Banking",
    emoji: "🏦",
    description: "Manage your bank account through a website or app",
    pros: ["See all accounts", "Pay bills automatically", "Transfer money", "Track spending"],
    cons: ["Security concerns", "Need internet", "Learning curve"],
    bestFor: "Managing overall finances, paying bills, checking balances",
  },
];

export default function Lesson2PaymentGame({ onComplete }: Props) {
  const [currentMethod, setCurrentMethod] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const method = paymentMethods[currentMethod];

  const handleNext = () => {
    if (currentMethod < paymentMethods.length - 1) {
      setCurrentMethod(currentMethod + 1);
      setShowDetails(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-orange-300 dark:border-orange-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">💰</div>
            <CardTitle className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              Digital Payment Explorer
            </CardTitle>
            <p className="text-muted-foreground">
              Learn about different ways to pay in the digital world!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                Method {currentMethod + 1} of {paymentMethods.length}
              </p>
              
              <div className="mb-6 text-center">
                <div className="mb-3 text-7xl">{method.emoji}</div>
                <h3 className="mb-2 text-2xl font-bold text-foreground">
                  {method.name}
                </h3>
                <p className="text-base text-muted-foreground">
                  {method.description}
                </p>
              </div>

              {!showDetails ? (
                <Button
                  size="lg"
                  onClick={() => setShowDetails(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                >
                  Learn More
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg bg-white p-4 dark:bg-card">
                    <h4 className="mb-2 flex items-center gap-2 font-bold text-green-900 dark:text-green-100">
                      <CheckCircleIcon className="size-5 text-green-600" />
                      Advantages
                    </h4>
                    <ul className="space-y-1 text-sm text-foreground">
                      {method.pros.map((pro, index) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-white p-4 dark:bg-card">
                    <h4 className="mb-2 flex items-center gap-2 font-bold text-red-900 dark:text-red-100">
                      <XCircleIcon className="size-5 text-red-600" />
                      Disadvantages
                    </h4>
                    <ul className="space-y-1 text-sm text-foreground">
                      {method.cons.map((con, index) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                    <h4 className="mb-2 flex items-center gap-2 font-bold text-blue-900 dark:text-blue-100">
                      <SmartphoneIcon className="size-5 text-blue-600" />
                      Best For
                    </h4>
                    <p className="text-sm text-foreground">{method.bestFor}</p>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                  >
                    {currentMethod < paymentMethods.length - 1
                      ? "Next Payment Method"
                      : "Complete Lesson"}
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-1">
              {paymentMethods.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index < currentMethod
                      ? "bg-gradient-to-r from-orange-500 to-amber-500"
                      : index === currentMethod
                        ? "bg-orange-300 dark:bg-orange-700"
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
