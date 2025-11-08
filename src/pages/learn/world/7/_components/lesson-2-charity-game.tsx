import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { HeartIcon } from "lucide-react";

interface Props {
  onComplete: () => void;
}

interface CharityType {
  id: number;
  name: string;
  emoji: string;
  description: string;
  examples: string[];
  impact: string;
  teenWaysToHelp: string[];
}

const charityTypes: CharityType[] = [
  {
    id: 1,
    name: "Hunger & Poverty Relief",
    emoji: "🍲",
    description: "Organizations that help people who don't have enough food or money for basic needs",
    examples: ["Food banks", "Homeless shelters", "Meal programs", "Poverty relief funds"],
    impact: "Your donation could provide meals for families, warm shelter on cold nights, or help someone get back on their feet.",
    teenWaysToHelp: ["Organize food drives at school", "Volunteer at soup kitchens", "Donate non-perishable food", "Fundraise for local food banks"],
  },
  {
    id: 2,
    name: "Education & Youth",
    emoji: "📚",
    description: "Programs that help kids and teens get education, supplies, and opportunities",
    examples: ["School supply drives", "Scholarship funds", "After-school programs", "Literacy programs"],
    impact: "Your support helps kids get books, tutoring, school supplies, and chances to succeed they might not otherwise have.",
    teenWaysToHelp: ["Tutor younger students", "Donate gently used books", "Organize school supply drives", "Mentor other teens"],
  },
  {
    id: 3,
    name: "Animal Welfare",
    emoji: "🐾",
    description: "Protecting and caring for animals who are hurt, abandoned, or endangered",
    examples: ["Animal shelters", "Wildlife conservation", "Rescue organizations", "Veterinary funds"],
    impact: "Your contribution helps rescue animals, provide medical care, find homes for pets, and protect endangered species.",
    teenWaysToHelp: ["Volunteer at animal shelters", "Foster pets", "Organize pet supply drives", "Raise awareness about adoption"],
  },
  {
    id: 4,
    name: "Environment & Planet",
    emoji: "🌍",
    description: "Working to protect nature, fight climate change, and keep our planet healthy",
    examples: ["Tree planting", "Ocean cleanup", "Conservation groups", "Renewable energy projects"],
    impact: "You're helping clean oceans, save forests, protect wildlife habitats, and ensure future generations have a healthy planet.",
    teenWaysToHelp: ["Organize community cleanups", "Start recycling programs", "Plant trees", "Reduce single-use plastics"],
  },
  {
    id: 5,
    name: "Health & Medical",
    emoji: "🏥",
    description: "Supporting people dealing with illness and funding medical research for cures",
    examples: ["Cancer research", "Children's hospitals", "Mental health support", "Disease prevention"],
    impact: "Your donation funds research for cures, helps families afford treatment, and provides support for people facing health challenges.",
    teenWaysToHelp: ["Participate in charity walks/runs", "Fundraise for research", "Volunteer at hospitals", "Raise awareness"],
  },
];

export default function Lesson2CharityGame({ onComplete }: Props) {
  const [currentCharity, setCurrentCharity] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const charity = charityTypes[currentCharity];

  const handleNext = () => {
    if (currentCharity < charityTypes.length - 1) {
      setCurrentCharity(currentCharity + 1);
      setShowDetails(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 dark:from-teal-950 dark:via-green-950 dark:to-emerald-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-teal-300 dark:border-teal-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">❤️</div>
            <CardTitle className="text-2xl font-bold text-teal-900 dark:text-teal-100">
              Types of Charity
            </CardTitle>
            <p className="text-muted-foreground">
              Explore different ways to make a difference!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-teal-50 p-6 dark:bg-teal-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
                Charity Type {currentCharity + 1} of {charityTypes.length}
              </p>
              
              <div className="mb-6 text-center">
                <div className="mb-3 text-7xl">{charity.emoji}</div>
                <h3 className="mb-2 text-2xl font-bold text-foreground">
                  {charity.name}
                </h3>
                <p className="text-base text-muted-foreground">
                  {charity.description}
                </p>
              </div>

              {!showDetails ? (
                <Button
                  size="lg"
                  onClick={() => setShowDetails(true)}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                >
                  Learn More
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg bg-white p-4 dark:bg-card">
                    <h4 className="mb-2 font-bold text-teal-900 dark:text-teal-100">
                      📋 Examples
                    </h4>
                    <ul className="space-y-1 text-sm text-foreground">
                      {charity.examples.map((example, index) => (
                        <li key={index}>• {example}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/30">
                    <h4 className="mb-2 font-bold text-green-900 dark:text-green-100">
                      💚 Your Impact
                    </h4>
                    <p className="text-sm text-foreground">{charity.impact}</p>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                    <h4 className="mb-2 font-bold text-blue-900 dark:text-blue-100">
                      🙋 How Teens Can Help
                    </h4>
                    <ul className="space-y-1 text-sm text-foreground">
                      {charity.teenWaysToHelp.map((way, index) => (
                        <li key={index}>• {way}</li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                  >
                    {currentCharity < charityTypes.length - 1
                      ? "Next Charity Type"
                      : "Complete Lesson"}
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-1">
              {charityTypes.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index < currentCharity
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500"
                      : index === currentCharity
                        ? "bg-teal-300 dark:bg-teal-700"
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
