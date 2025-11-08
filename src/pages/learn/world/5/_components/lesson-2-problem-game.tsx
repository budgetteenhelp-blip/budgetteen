import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { LightbulbIcon, XCircleIcon, CheckCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Props {
  onComplete: () => void;
}

interface Problem {
  id: number;
  scenario: string;
  problem: string;
  isRealOpportunity: boolean;
  explanation: string;
}

const problems: Problem[] = [
  {
    id: 1,
    scenario: "You notice your classmates always forget their lunch money.",
    problem: "Students need a way to keep track of lunch money",
    isRealOpportunity: true,
    explanation: "Great eye! This is a real problem you could solve with a lunch money tracking app or reminder service.",
  },
  {
    id: 2,
    scenario: "Your friend complains the sky is blue instead of purple.",
    problem: "People want to change the color of the sky",
    isRealOpportunity: false,
    explanation: "This isn't a solvable problem! Good entrepreneurs focus on realistic problems they can actually solve.",
  },
  {
    id: 3,
    scenario: "Neighbors struggle to find local babysitters they trust.",
    problem: "Parents need reliable babysitting services",
    isRealOpportunity: true,
    explanation: "Excellent! This is a real need. You could start a neighborhood babysitting service or directory.",
  },
  {
    id: 4,
    scenario: "People wish they could fly without airplanes.",
    problem: "Everyone wants personal flying powers",
    isRealOpportunity: false,
    explanation: "While flying is cool, this isn't realistic with current technology. Focus on problems you can actually solve!",
  },
  {
    id: 5,
    scenario: "Students spend too much time searching for study materials online.",
    problem: "Students need organized study resources in one place",
    isRealOpportunity: true,
    explanation: "Perfect! You could create a study guide website or organize resources for specific classes.",
  },
  {
    id: 6,
    scenario: "Your school doesn't have enough parking spaces.",
    problem: "Students need better transportation options",
    isRealOpportunity: true,
    explanation: "Smart thinking! You could organize carpools or create a ride-sharing system for students.",
  },
];

export default function Lesson2ProblemGame({ onComplete }: Props) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const problem = problems[currentProblem];

  const handleAnswer = (isOpportunity: boolean) => {
    setSelectedAnswer(isOpportunity);
    setShowExplanation(true);
    if (isOpportunity === problem.isRealOpportunity) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 p-4">
      <div className="mx-auto max-w-2xl pt-8">
        <Card className="border-2 border-purple-300 dark:border-purple-700">
          <CardHeader className="space-y-4 text-center">
            <div className="text-6xl">🔍</div>
            <CardTitle className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              Problem Finder Challenge
            </CardTitle>
            <p className="text-muted-foreground">
              Identify which scenarios present real business opportunities!
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-bold">
              <LightbulbIcon className="size-5 fill-yellow-500 text-yellow-500" />
              <span>Score: {score} / {problems.length}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-950/50">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">
                Scenario {currentProblem + 1} of {problems.length}
              </p>
              <p className="mb-4 text-lg font-medium text-foreground">
                {problem.scenario}
              </p>
              <div className="rounded-lg bg-white p-4 dark:bg-card">
                <p className="text-base text-foreground">
                  <strong>Problem:</strong> {problem.problem}
                </p>
              </div>
            </div>

            {!showExplanation ? (
              <div className="space-y-3">
                <p className="text-center font-semibold text-foreground">
                  Is this a real business opportunity?
                </p>
                <div className="grid gap-3">
                  <Button
                    size="lg"
                    onClick={() => handleAnswer(true)}
                    className="h-auto bg-green-600 py-4 text-lg hover:bg-green-700"
                  >
                    <CheckCircleIcon className="mr-2 size-5" />
                    Yes, this is a real opportunity!
                  </Button>
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={() => handleAnswer(false)}
                    className="h-auto py-4 text-lg"
                  >
                    <XCircleIcon className="mr-2 size-5" />
                    No, not a realistic opportunity
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={cn(
                    "rounded-lg p-4",
                    selectedAnswer === problem.isRealOpportunity
                      ? "bg-green-100 dark:bg-green-950/50"
                      : "bg-red-100 dark:bg-red-950/50"
                  )}
                >
                  <p className="mb-2 flex items-center gap-2 font-bold">
                    {selectedAnswer === problem.isRealOpportunity ? (
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
                  <p className="text-foreground">{problem.explanation}</p>
                </div>

                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {currentProblem < problems.length - 1
                    ? "Next Problem"
                    : "Complete Lesson"}
                </Button>
              </div>
            )}

            <div className="flex gap-1">
              {problems.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    index < currentProblem
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : index === currentProblem
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
