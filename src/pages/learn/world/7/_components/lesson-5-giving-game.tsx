import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { HeartIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Props {
  onComplete: () => void;
}

interface Scenario {
  id: number;
  situation: string;
  amount: string;
  question: string;
  options: {
    text: string;
    isGood: boolean;
    feedback: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    situation: "You earned $50 from babysitting. You want to give back to your community.",
    amount: "$50",
    question: "What's a smart way to give?",
    options: [
      {
        text: "Give all $50 to the first person who asks for money",
        isGood: false,
        feedback: "While generosity is good, giving everything to one random person isn't strategic. It's better to research causes you care about and keep some for your own needs.",
      },
      {
        text: "Donate $5-10 to a charity you've researched and believe in",
        isGood: true,
        feedback: "Perfect! Giving 10-20% is generous and sustainable. Research ensures your money goes to a legitimate cause. You're still saving most of your earnings.",
      },
      {
        text: "Save it all - you're too young to donate",
        isGood: false,
        feedback: "You're never too young to give back! Even small donations make a difference. Try giving a small amount and saving the rest.",
      },
    ],
  },
  {
    id: 2,
    situation: "A classmate sends you a sad story via text and asks you to donate $20 to their 'fundraiser.'",
    amount: "$20 requested",
    question: "What should you do?",
    options: [
      {
        text: "Send the money right away - they need help!",
        isGood: false,
        feedback: "Wait! This could be a scam. Always verify fundraisers. Check if there's an official GoFundMe or school-approved campaign before sending money.",
      },
      {
        text: "Verify it's real by talking to them in person or checking official platforms",
        isGood: true,
        feedback: "Smart! Scammers often use emotional stories. Verify through official channels, talk to the person directly, or check with trusted adults before donating.",
      },
      {
        text: "Ignore it - all online fundraisers are scams",
        isGood: false,
        feedback: "Not all are scams! Many legitimate fundraisers exist. The key is verification - check official platforms like GoFundMe, talk to the person, or ask trusted adults.",
      },
    ],
  },
  {
    id: 3,
    situation: "A natural disaster just happened. You want to help but only have $10.",
    amount: "$10",
    question: "How can you make the biggest impact?",
    options: [
      {
        text: "Don't donate - $10 is too small to matter",
        isGood: false,
        feedback: "Every dollar helps! When millions donate small amounts, it adds up to huge relief. $10 can provide meals, water, or supplies. Your contribution matters!",
      },
      {
        text: "Donate to a reputable disaster relief organization like Red Cross",
        isGood: true,
        feedback: "Excellent! Established organizations have infrastructure to help efficiently. They buy supplies in bulk and know what's needed most. Your $10 goes further with experts!",
      },
      {
        text: "Buy random supplies and mail them to the disaster area yourself",
        isGood: false,
        feedback: "Good intentions, but inefficient! Shipping costs might exceed your donation. Relief organizations can buy supplies cheaper in bulk and know exactly what's needed. Donate money instead.",
      },
    ],
  },
  {
    id: 4,
    situation: "You want to support a cause, but you're completely broke right now.",
    amount: "$0 available",
    question: "How can you still give back?",
    options: [
      {
        text: "Volunteer your time - help at food banks, clean parks, tutor peers",
        isGood: true,
        feedback: "Perfect! Time is just as valuable as money! Volunteering provides direct help and often inspires others. Your skills, energy, and compassion make a real difference!",
      },
      {
        text: "Do nothing - you can only help if you have money",
        isGood: false,
        feedback: "Not true! You can volunteer, spread awareness, donate items you don't need, help neighbors, or use your talents to serve. Money isn't the only way to give back!",
      },
      {
        text: "Borrow money from parents to donate",
        isGood: false,
        feedback: "Don't borrow to donate! Give what you can afford, even if that's just time or skills. When you earn money later, you can donate then. Responsible giving is sustainable giving.",
      },
    ],
  },
];

export default function Lesson5GivingGame({ onComplete }: Props) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [goodChoices, setGoodChoices] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleChoice = (optionIndex: number) => {
    const option = scenario.options[optionIndex];
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    if (option.isGood) {
      setGoodChoices(goodChoices + 1);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 dark:from-teal-950 dark:via-green-950 dark:to-emerald-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-teal-300 dark:border-teal-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">💚</div>
            <CardTitle className="text-2xl font-bold text-teal-900 dark:text-teal-100">
              Smart Giving Decisions
            </CardTitle>
            <div className="flex items-center justify-center gap-4 text-lg font-bold">
              <div className="flex items-center gap-2">
                <HeartIcon className="size-5 fill-green-600 text-green-600" />
                <span>Good Choices: {goodChoices} / {scenarios.length}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-teal-50 p-6 dark:bg-teal-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
                Scenario {currentScenario + 1} of {scenarios.length}
              </p>
              <div className="mb-4 rounded-lg bg-white p-4 dark:bg-card">
                <p className="mb-3 text-base text-foreground">
                  {scenario.situation}
                </p>
                <div className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-900 dark:bg-green-900 dark:text-green-100">
                  {scenario.amount}
                </div>
                <p className="font-semibold text-foreground">
                  {scenario.question}
                </p>
              </div>
            </div>

            {!showFeedback ? (
              <div className="space-y-3">
                {scenario.options.map((option, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant="outline"
                    onClick={() => handleChoice(index)}
                    className="h-auto w-full justify-start whitespace-normal py-4 text-left text-base hover:border-teal-500"
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
                    selectedOption !== null && scenario.options[selectedOption].isGood
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50"
                      : "bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50"
                  )}
                >
                  <p className="mb-3 flex items-center gap-2 text-lg font-bold">
                    {selectedOption !== null && scenario.options[selectedOption].isGood ? (
                      <>
                        <CheckCircleIcon className="size-6 text-green-600" />
                        <span className="text-green-900 dark:text-green-100">
                          Great Choice!
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="size-6 text-orange-600" />
                        <span className="text-orange-900 dark:text-orange-100">
                          Not the best choice
                        </span>
                      </>
                    )}
                  </p>
                  <p className="text-base text-foreground">
                    {selectedOption !== null && scenario.options[selectedOption].feedback}
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600"
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
                      ? "bg-gradient-to-r from-teal-500 to-green-500"
                      : index === currentScenario
                        ? "bg-teal-300 dark:bg-teal-700"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {currentScenario === scenarios.length - 1 && showFeedback && (
              <div className="rounded-lg bg-teal-100 p-4 dark:bg-teal-900/50">
                <p className="text-center text-lg font-bold text-teal-900 dark:text-teal-100">
                  {goodChoices === scenarios.length
                    ? "🎉 Perfect! You understand smart giving!"
                    : goodChoices >= 3
                      ? "👍 Great! You're making wise choices!"
                      : "💪 Keep learning about responsible giving!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
