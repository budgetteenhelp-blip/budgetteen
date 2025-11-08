import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { WalletIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Props {
  onComplete: () => void;
}

interface Decision {
  id: number;
  situation: string;
  question: string;
  options: {
    text: string;
    isSafe: boolean;
    feedback: string;
  }[];
}

const decisions: Decision[] = [
  {
    id: 1,
    situation: "Your friend texts you asking to borrow $20. They want you to send it via Venmo.",
    question: "What should you do?",
    options: [
      {
        text: "Send the money immediately - they're your friend!",
        isSafe: false,
        feedback: "Wait! First verify it's really your friend. Hackers sometimes impersonate people. Call or video chat to confirm it's them before sending money.",
      },
      {
        text: "Call them first to confirm it's really them asking",
        isSafe: true,
        feedback: "Perfect! Always verify requests through a different channel. Scammers often hack accounts and message everyone asking for money.",
      },
      {
        text: "Ask them to send you their password to prove it's them",
        isSafe: false,
        feedback: "Never ask for or share passwords! That's unsafe for both of you. Instead, call them directly to verify.",
      },
    ],
  },
  {
    id: 2,
    situation: "You're at a coffee shop using their free WiFi. You realize you need to check your bank balance.",
    question: "What's the safest option?",
    options: [
      {
        text: "Use the coffee shop WiFi - it's fine, everyone does it",
        isSafe: false,
        feedback: "Risky! Public WiFi isn't secure. Hackers can intercept your data. Never do banking on public WiFi.",
      },
      {
        text: "Turn off WiFi and use your phone's cellular data instead",
        isSafe: true,
        feedback: "Excellent choice! Your cellular data is much more secure than public WiFi. Always use it for sensitive activities like banking.",
      },
      {
        text: "Ask the barista for the WiFi password so it's more secure",
        isSafe: false,
        feedback: "Even with a password, public WiFi isn't safe for banking. Anyone on that network could potentially see your data. Use cellular data instead.",
      },
    ],
  },
  {
    id: 3,
    situation: "You want to buy concert tickets online from a website you've never used before. The price seems really low!",
    question: "How do you check if it's safe?",
    options: [
      {
        text: "Buy immediately before the deal expires!",
        isSafe: false,
        feedback: "Slow down! 'Too good to be true' deals often are scams. Always research before buying, especially from unknown sites.",
      },
      {
        text: "Check reviews, look for 'https' in URL, search '[site name] scam' online",
        isSafe: true,
        feedback: "Smart detective work! Always research sites before buying. Check reviews, verify the URL is secure (https), and search for complaints.",
      },
      {
        text: "It's fine if they accept credit cards",
        isSafe: false,
        feedback: "Not enough! Scam sites accept cards too - they just steal your info. You need to verify the site is legitimate first.",
      },
    ],
  },
  {
    id: 4,
    situation: "Your payment app sends you a notification: 'Enable two-factor authentication for extra security.'",
    question: "What should you do?",
    options: [
      {
        text: "Ignore it - it's too complicated and takes extra time",
        isSafe: false,
        feedback: "Bad idea! Two-factor authentication (2FA) is one of the best ways to protect your money. The extra few seconds is worth it.",
      },
      {
        text: "Enable it right away - it's your best defense against hackers",
        isSafe: true,
        feedback: "Perfect! 2FA means even if someone steals your password, they can't access your account without the code sent to YOUR phone. Always enable it!",
      },
      {
        text: "Enable it but share your verification codes with trusted friends",
        isSafe: false,
        feedback: "Never share verification codes with ANYONE! Not friends, not family, not 'customer service'. Those codes are for your eyes only.",
      },
    ],
  },
];

export default function Lesson5WalletGame({ onComplete }: Props) {
  const [currentDecision, setCurrentDecision] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [safeChoices, setSafeChoices] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const decision = decisions[currentDecision];

  const handleChoice = (optionIndex: number) => {
    const option = decision.options[optionIndex];
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    if (option.isSafe) {
      setSafeChoices(safeChoices + 1);
    }
  };

  const handleNext = () => {
    if (currentDecision < decisions.length - 1) {
      setCurrentDecision(currentDecision + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-orange-300 dark:border-orange-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">💳</div>
            <CardTitle className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              Digital Wallet Safety Challenge
            </CardTitle>
            <div className="flex items-center justify-center gap-4 text-lg font-bold">
              <div className="flex items-center gap-2">
                <WalletIcon className="size-5 text-green-600" />
                <span>Safe Choices: {safeChoices} / {decisions.length}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                Situation {currentDecision + 1} of {decisions.length}
              </p>
              <div className="mb-4 rounded-lg bg-white p-4 dark:bg-card">
                <p className="mb-3 text-base text-foreground">
                  {decision.situation}
                </p>
                <p className="font-semibold text-foreground">
                  {decision.question}
                </p>
              </div>
            </div>

            {!showFeedback ? (
              <div className="space-y-3">
                {decision.options.map((option, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant="outline"
                    onClick={() => handleChoice(index)}
                    className="h-auto w-full justify-start whitespace-normal py-4 text-left text-base hover:border-orange-500"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={cn(
                    "rounded-lg p-6",
                    selectedOption !== null && decision.options[selectedOption].isSafe
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50"
                      : "bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-950/50 dark:to-orange-950/50"
                  )}
                >
                  <p className="mb-3 flex items-center gap-2 text-lg font-bold">
                    {selectedOption !== null && decision.options[selectedOption].isSafe ? (
                      <>
                        <CheckCircleIcon className="size-6 text-green-600" />
                        <span className="text-green-900 dark:text-green-100">
                          Safe Choice!
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="size-6 text-red-600" />
                        <span className="text-red-900 dark:text-red-100">
                          Unsafe Choice!
                        </span>
                      </>
                    )}
                  </p>
                  <p className="text-base text-foreground">
                    {selectedOption !== null && decision.options[selectedOption].feedback}
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                >
                  {currentDecision < decisions.length - 1
                    ? "Next Situation"
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
                      ? "bg-gradient-to-r from-orange-500 to-amber-500"
                      : index === currentDecision
                        ? "bg-orange-300 dark:bg-orange-700"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {currentDecision === decisions.length - 1 && showFeedback && (
              <div className="rounded-lg bg-orange-100 p-4 dark:bg-orange-900/50">
                <p className="text-center text-lg font-bold text-orange-900 dark:text-orange-100">
                  {safeChoices === decisions.length
                    ? "🎉 Perfect! You're a digital safety expert!"
                    : safeChoices >= 3
                      ? "👍 Great job! You're making mostly safe choices!"
                      : "💪 Keep learning! Digital safety takes practice!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
