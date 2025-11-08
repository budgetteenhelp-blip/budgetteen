import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ShieldAlertIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Props {
  onComplete: () => void;
}

interface Scenario {
  id: number;
  type: string;
  message: string;
  isScam: boolean;
  explanation: string;
  redFlags: string[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    type: "Text Message",
    message: "URGENT! Your bank account has been locked. Click here immediately to verify your information: bit.ly/bank-verify-12345",
    isScam: true,
    explanation: "This is a SCAM! Banks never send urgent texts asking you to click links or verify info. They'll call you or ask you to log in through the official app.",
    redFlags: ["Creates fake urgency", "Suspicious short link", "Asks you to verify info", "Unexpected message"],
  },
  {
    id: 2,
    type: "Email",
    message: "From: YourBank@official-bank.com\n\nDear Customer,\n\nYour monthly statement is ready. Please log in to your account through our official website or mobile app to view it.\n\nThank you,\nYour Bank Team",
    isScam: false,
    explanation: "This is LEGITIMATE! It doesn't ask for any information, doesn't create urgency, and tells you to log in through official channels (not clicking a link).",
    redFlags: [],
  },
  {
    id: 3,
    type: "Social Media DM",
    message: "Hey! I'm giving away $500 to 10 random people! Just send me your Cash App username and I'll send you the money. First come first serve! 💰💰💰",
    isScam: true,
    explanation: "This is a SCAM! No one gives away free money to strangers. They're trying to get your username to hack your account or trick you into sending them money 'first'.",
    redFlags: ["Too good to be true", "Free money promise", "Asks for account info", "Creates urgency"],
  },
  {
    id: 4,
    type: "Website",
    message: "Website URL: https://www.paypal.com\n\nYou're viewing an official PayPal login page with a padlock icon in the browser. The page asks for your email and password to log in.",
    isScam: false,
    explanation: "This is LEGITIMATE! The URL is correct (https://www.paypal.com), there's a padlock icon showing it's secure, and you intentionally navigated to it to log in.",
    redFlags: [],
  },
  {
    id: 5,
    type: "Phone Call",
    message: "\"Hi, this is Microsoft Support. We've detected a virus on your computer. We need you to give us remote access to fix it. Please download this software and provide payment of $199.\"",
    isScam: true,
    explanation: "This is a SCAM! Microsoft never cold-calls customers. Real tech companies don't ask for remote access or payment over the phone. This is a classic tech support scam.",
    redFlags: ["Unsolicited call", "Claims urgent problem", "Asks for remote access", "Demands immediate payment"],
  },
  {
    id: 6,
    type: "App Notification",
    message: "Venmo: Sarah Johnson sent you $25.00\n\nTap to view transaction in the Venmo app.\n\nThis notification came from the official Venmo app you downloaded from the App Store.",
    isScam: false,
    explanation: "This is LEGITIMATE! It's a real notification from the official app you installed, and it's just informing you of a transaction. You can verify it by opening the app.",
    redFlags: [],
  },
];

export default function Lesson4ScamGame({ onComplete }: Props) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleAnswer = (isScam: boolean) => {
    setSelectedAnswer(isScam);
    setShowExplanation(true);
    if (isScam === scenario.isScam) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-orange-300 dark:border-orange-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">🕵️</div>
            <CardTitle className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              Scam Detector Challenge
            </CardTitle>
            <p className="text-muted-foreground">
              Can you spot the scams from legitimate messages?
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-bold">
              <ShieldAlertIcon className="size-5 text-red-500" />
              <span>Score: {score} / {scenarios.length}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                Scenario {currentScenario + 1} of {scenarios.length}
              </p>
              <div className="mb-4 rounded-lg bg-white p-4 dark:bg-card">
                <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">
                  {scenario.type}
                </p>
                <p className="whitespace-pre-line text-base text-foreground">
                  {scenario.message}
                </p>
              </div>
            </div>

            {!showExplanation ? (
              <div className="space-y-3">
                <p className="text-center font-semibold text-foreground">
                  Is this a scam or legitimate?
                </p>
                <div className="grid gap-3">
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={() => handleAnswer(true)}
                    className="h-auto py-4 text-lg"
                  >
                    <XCircleIcon className="mr-2 size-5" />
                    🚨 This is a SCAM!
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => handleAnswer(false)}
                    className="h-auto bg-green-600 py-4 text-lg hover:bg-green-700"
                  >
                    <CheckCircleIcon className="mr-2 size-5" />
                    ✅ This is legitimate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={cn(
                    "rounded-lg p-4",
                    selectedAnswer === scenario.isScam
                      ? "bg-green-100 dark:bg-green-950/50"
                      : "bg-red-100 dark:bg-red-950/50"
                  )}
                >
                  <p className="mb-2 flex items-center gap-2 font-bold">
                    {selectedAnswer === scenario.isScam ? (
                      <>
                        <CheckCircleIcon className="size-5 text-green-600" />
                        <span className="text-green-900 dark:text-green-100">
                          Correct!
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="size-5 text-red-600" />
                        <span className="text-red-900 dark:text-red-100">
                          Not quite!
                        </span>
                      </>
                    )}
                  </p>
                  <p className="text-base text-foreground">{scenario.explanation}</p>
                </div>

                {scenario.redFlags.length > 0 && (
                  <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950/30">
                    <p className="mb-2 font-bold text-red-900 dark:text-red-100">
                      🚩 Red Flags:
                    </p>
                    <ul className="space-y-1 text-sm text-foreground">
                      {scenario.redFlags.map((flag, index) => (
                        <li key={index}>• {flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
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
                      ? "bg-gradient-to-r from-orange-500 to-amber-500"
                      : index === currentScenario
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
