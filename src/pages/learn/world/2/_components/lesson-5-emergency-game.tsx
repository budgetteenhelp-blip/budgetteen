import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface Lesson5EmergencyGameProps {
  onComplete: () => void;
}

interface Emergency {
  id: number;
  title: string;
  description: string;
  cost: number;
  emoji: string;
}

const emergencies: Emergency[] = [
  {
    id: 1,
    title: "Broken Phone Screen",
    description:
      "Oh no! You dropped your phone and the screen cracked. It costs $80 to fix it.",
    cost: 80,
    emoji: "📱",
  },
  {
    id: 2,
    title: "School Trip Payment",
    description:
      "The school field trip is next week and it costs $50. You forgot to save for it!",
    cost: 50,
    emoji: "🚌",
  },
  {
    id: 3,
    title: "Surprise Birthday Party",
    description:
      "Your best friend's surprise party is tomorrow. You need $30 for a gift and food.",
    cost: 30,
    emoji: "🎉",
  },
  {
    id: 4,
    title: "Lost Textbook",
    description:
      "You lost your textbook and need to pay $45 to replace it before finals.",
    cost: 45,
    emoji: "📚",
  },
];

export default function Lesson5EmergencyGame({
  onComplete,
}: Lesson5EmergencyGameProps) {
  const [currentEmergency, setCurrentEmergency] = useState(0);
  const [emergencyFund, setEmergencyFund] = useState(100);
  const [choices, setChoices] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  const emergency = emergencies[currentEmergency];
  const canAfford = emergencyFund >= emergency.cost;

  const handleChoice = (useEmergencyFund: boolean) => {
    setChoices([...choices, useEmergencyFund]);

    if (useEmergencyFund && canAfford) {
      setEmergencyFund(emergencyFund - emergency.cost);
    }

    if (currentEmergency < emergencies.length - 1) {
      setTimeout(() => {
        setCurrentEmergency(currentEmergency + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 2000);
    }
  };

  const smartChoices = choices.filter((choice, idx) => {
    const emerg = emergencies[idx];
    // True emergencies are phone and textbook
    return (emerg.id === 1 || emerg.id === 4) ? choice : !choice;
  }).length;

  if (showResult) {
    const percentage = (smartChoices / emergencies.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div
                className={`w-24 h-24 rounded-full ${
                  percentage >= 75
                    ? "bg-gradient-to-br from-green-500 to-emerald-500"
                    : "bg-gradient-to-br from-orange-500 to-amber-500"
                } flex items-center justify-center`}
              >
                {percentage >= 75 ? (
                  <CheckCircle2 className="w-12 h-12 text-white" />
                ) : (
                  <AlertCircle className="w-12 h-12 text-white" />
                )}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2">Challenge Complete!</h2>
              <p className="text-lg text-muted-foreground">
                You made {smartChoices} out of {emergencies.length} smart
                emergency fund choices
              </p>
              <p className="text-4xl font-bold text-pink-600 mt-4">
                ${emergencyFund} remaining
              </p>
            </div>

            <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 text-left">
              <h3 className="font-semibold mb-2">💡 What You Learned:</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Real emergencies</strong> are unexpected needs you
                  can't avoid (broken phone, lost textbook)
                </li>
                <li>
                  • <strong>Not emergencies:</strong> things you forgot to
                  plan for or could skip (trip, party)
                </li>
                <li>
                  • Keep your emergency fund for true surprises you can't
                  control
                </li>
                <li>
                  • Aim to save 3-6 months of expenses for your safety net
                </li>
              </ul>
            </Card>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              onClick={onComplete}
            >
              Complete Lesson
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4">
      <div className="max-w-2xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Emergency Fund Challenge</h2>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Emergency Fund</p>
              <p className="text-2xl font-bold text-green-600">
                ${emergencyFund}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex gap-1">
              {emergencies.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full ${
                    idx < currentEmergency
                      ? "bg-green-500"
                      : idx === currentEmergency
                        ? "bg-pink-500"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Emergency {currentEmergency + 1} of {emergencies.length}
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{emergency.emoji}</div>
              <h3 className="text-xl font-bold mb-2">{emergency.title}</h3>
              <p className="text-muted-foreground mb-4">
                {emergency.description}
              </p>
              <Card className="p-4 bg-red-50 dark:bg-red-950/30 inline-block">
                <p className="text-3xl font-bold text-red-600">
                  ${emergency.cost}
                </p>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Button
                size="lg"
                variant="outline"
                className="h-auto p-6 flex flex-col gap-2"
                onClick={() => handleChoice(true)}
                disabled={!canAfford}
              >
                <span className="text-lg font-bold">
                  Use Emergency Fund
                </span>
                {!canAfford ? (
                  <span className="text-sm text-red-600">
                    <XCircle className="w-4 h-4 inline mr-1" />
                    Not enough funds!
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Will have ${emergencyFund - emergency.cost} left
                  </span>
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-auto p-6 flex flex-col gap-2"
                onClick={() => handleChoice(false)}
              >
                <span className="text-lg font-bold">
                  Find Another Way
                </span>
                <span className="text-sm text-muted-foreground">
                  Ask family, skip it, or use regular money
                </span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
