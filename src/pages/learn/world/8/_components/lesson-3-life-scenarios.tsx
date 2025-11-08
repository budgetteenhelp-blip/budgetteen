import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";

interface Lesson3LifeScenariosProps {
  onComplete: () => void;
}

interface Scenario {
  id: number;
  title: string;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    concepts: string[];
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "The Birthday Gift Dilemma",
    situation:
      "Your best friend's birthday is next week. You have $50 saved. A gift they'd love costs $45, leaving you with only $5 until your next allowance in two weeks. What do you do?",
    options: [
      {
        text: "Buy the $45 gift - it's for your best friend!",
        isCorrect: false,
        feedback:
          "While generous, this leaves you with almost no emergency money. Consider a balance between being thoughtful and financially responsible.",
        concepts: ["Emergency funds", "Budgeting"],
      },
      {
        text: "Buy a $30 gift and keep $20 for emergencies",
        isCorrect: true,
        feedback:
          "Perfect! You're being a good friend while maintaining your emergency fund. A thoughtful gift doesn't have to be the most expensive one.",
        concepts: ["Emergency funds", "Needs vs. wants", "Smart shopping"],
      },
      {
        text: "Don't buy anything and save all your money",
        isCorrect: false,
        feedback:
          "While saving is important, completely ignoring your friend's birthday isn't ideal. Finding a balance is key!",
        concepts: ["Needs vs. wants", "Giving"],
      },
    ],
  },
  {
    id: 2,
    title: "The Side Hustle Opportunity",
    situation:
      "A neighbor offers you $15/hour to help with yard work on weekends (4 hours total). But your friend wants to hang out. You need money for a concert ticket ($80) in three weeks. What's your move?",
    options: [
      {
        text: "Skip the yard work to hang with friends",
        isCorrect: false,
        feedback:
          "You'll miss out on earning money for your goal. Consider if there's a way to do both or prioritize based on your financial needs.",
        concepts: ["Earning money", "Goal setting"],
      },
      {
        text: "Do the yard work and suggest hanging out after",
        isCorrect: true,
        feedback:
          "Excellent! You're working toward your goal while maintaining friendships. That's $60 earned - almost enough for the concert!",
        concepts: ["Entrepreneurship", "Goal setting", "Time management"],
      },
      {
        text: "Do the work but ask for $20/hour instead",
        isCorrect: false,
        feedback:
          "While negotiating is good, the neighbor already set a fair rate. Trying to change it might cost you the opportunity entirely.",
        concepts: ["Entrepreneurship", "Pricing"],
      },
    ],
  },
  {
    id: 3,
    title: "The Online Shopping Trap",
    situation:
      "You're buying a game online ($30). At checkout, you see: 'Get 2-day shipping for only $8 more!' You don't need it fast. What do you do?",
    options: [
      {
        text: "Add the fast shipping - it's only $8!",
        isCorrect: false,
        feedback:
          "That's an impulse add-on! You just increased your cost by 27% for something you don't need. Watch out for these tricks!",
        concepts: ["Smart shopping", "Impulse purchases"],
      },
      {
        text: "Stick with free shipping",
        isCorrect: true,
        feedback:
          "Smart choice! You avoided an unnecessary expense. That $8 can go toward your savings or something you actually need.",
        concepts: ["Smart shopping", "Budgeting", "Needs vs. wants"],
      },
      {
        text: "Cancel the whole order to avoid temptation",
        isCorrect: false,
        feedback:
          "If you planned to buy the game and budgeted for it, canceling isn't necessary. The key is resisting the unnecessary add-on.",
        concepts: ["Budgeting", "Smart shopping"],
      },
    ],
  },
  {
    id: 4,
    title: "The Suspicious DM",
    situation:
      "You get a DM: 'Congrats! You won a $100 gift card! Click here and enter your email and phone number to claim it!' What do you do?",
    options: [
      {
        text: "Click it - free money!",
        isCorrect: false,
        feedback:
          "Stop! This is a classic scam. Never click suspicious links or give out personal information. If it seems too good to be true, it probably is.",
        concepts: ["Digital safety", "Scam detection"],
      },
      {
        text: "Delete it and block the sender",
        isCorrect: true,
        feedback:
          "Exactly right! This is a phishing scam trying to steal your information. You protected yourself by not engaging.",
        concepts: ["Digital safety", "Scam detection"],
      },
      {
        text: "Reply and ask if it's real",
        isCorrect: false,
        feedback:
          "Don't engage with suspicious messages! Even replying confirms your account is active. Just delete and block.",
        concepts: ["Digital safety", "Scam detection"],
      },
    ],
  },
  {
    id: 5,
    title: "The Charity Request",
    situation:
      "Your school is raising money for a local animal shelter. You have $25 to spare this month. Your friend donated $50 and says everyone should match. What do you do?",
    options: [
      {
        text: "Donate $50 to keep up with your friend",
        isCorrect: false,
        feedback:
          "Giving is great, but only give what you can afford! Don't let peer pressure make you exceed your budget.",
        concepts: ["Giving", "Budgeting", "Peer pressure"],
      },
      {
        text: "Donate the $25 you can afford",
        isCorrect: true,
        feedback:
          "Perfect! You're giving within your means. Every contribution helps, and $25 is meaningful support for the shelter.",
        concepts: ["Giving", "Budgeting", "Community"],
      },
      {
        text: "Don't donate anything since you can't match your friend",
        isCorrect: false,
        feedback:
          "Any amount helps! Charities appreciate all donations, no matter the size. Give what you can.",
        concepts: ["Giving", "Budgeting"],
      },
    ],
  },
];

export default function Lesson3LifeScenarios({
  onComplete,
}: Lesson3LifeScenariosProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const scenario = scenarios[currentScenario];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    if (scenario.options[optionIndex].isCorrect) {
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

  const selectedOptionData =
    selectedOption !== null ? scenario.options[selectedOption] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4">
      <div className="max-w-3xl mx-auto pt-8 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Real-Life Scenarios</h2>
            <div className="text-sm text-muted-foreground">
              Scenario {currentScenario + 1} of {scenarios.length}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-1">
              {scenarios.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full ${
                    idx < currentScenario
                      ? "bg-green-500"
                      : idx === currentScenario
                        ? "bg-purple-500"
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">{scenario.title}</h3>
              <p className="text-lg leading-relaxed">{scenario.situation}</p>
            </div>

            <div className="space-y-3">
              {scenario.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={
                    selectedOption === idx
                      ? option.isCorrect
                        ? "default"
                        : "destructive"
                      : "outline"
                  }
                  className={`w-full h-auto p-4 text-left justify-start ${
                    selectedOption === idx && option.isCorrect
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={showFeedback}
                >
                  <span className="flex-1">{option.text}</span>
                  {showFeedback && selectedOption === idx && (
                    <>
                      {option.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 ml-2 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 ml-2 shrink-0" />
                      )}
                    </>
                  )}
                </Button>
              ))}
            </div>

            {showFeedback && selectedOptionData && (
              <Card className="p-4 bg-muted">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-2 flex-1">
                    <p className="font-medium">{selectedOptionData.feedback}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedOptionData.concepts.map((concept, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-primary/10 rounded-full"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {showFeedback && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Score: {score}/{currentScenario + 1}
                </div>
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={handleNext}
                >
                  {currentScenario < scenarios.length - 1
                    ? "Next Scenario"
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
