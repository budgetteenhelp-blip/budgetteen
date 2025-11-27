import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trophy,
  Star,
  Lock,
  CheckCircle2,
  Sparkles,
  Map,
  Lightbulb,
  Target,
  Calculator,
  TrendingUp,
  Brain,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lesson1Welcome from "./_components/lesson-1-welcome.tsx";
import Lesson2FinancialJourney from "./_components/lesson-2-financial-journey.tsx";
import Lesson3LifeScenarios from "./_components/lesson-3-life-scenarios.tsx";
import Lesson4BudgetChallenge from "./_components/lesson-4-budget-challenge.tsx";
import Lesson5FuturePlanning from "./_components/lesson-5-future-planning.tsx";
import Lesson6MasterQuiz from "./_components/lesson-6-master-quiz.tsx";

const lessons = [
  {
    id: 1,
    title: "Welcome to The Master Quest",
    description: "Your journey to becoming a Money Master begins here!",
    icon: Trophy,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    title: "Your Financial Journey",
    description: "Review everything you've learned across all 7 worlds",
    icon: Map,
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 3,
    title: "Real-Life Scenarios",
    description: "Apply your knowledge to realistic teen money situations",
    icon: Lightbulb,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Budget Challenge",
    description: "Master complex budgeting with real-world constraints",
    icon: Calculator,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Future Planning",
    description: "Plan and visualize your financial future",
    icon: TrendingUp,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 6,
    title: "The Master Quiz",
    description: "Prove you're a true Money Master with the ultimate quiz",
    icon: Brain,
    color: "from-pink-500 to-purple-500",
  },
];

export default function World8() {
  const navigate = useNavigate();
  const worldProgress = useQuery(api.worlds.getWorldProgress, { worldId: 8 });
  const world7Progress = useQuery(api.worlds.getWorldProgress, { worldId: 7 });
  const completeLesson = useMutation(api.worlds.completeLesson);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  if (!worldProgress || !world7Progress) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4">
        <div className="max-w-4xl mx-auto pt-8 space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  // Check if World 7 is completed (all 6 lessons)
  const isWorld7Complete = world7Progress?.completedLessons.length >= 6;
  
  if (!worldProgress?.isUnlocked && !isWorld7Complete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">World Locked</h2>
          <p className="text-muted-foreground mb-4">
            Complete World 7: The Giving Grove to unlock The Master Quest!
          </p>
          <Button onClick={() => navigate("/learn")}>Back to World Map</Button>
        </Card>
      </div>
    );
  }

  const handleLessonComplete = async (lessonId: number) => {
    await completeLesson({
      worldId: 8,
      lessonId: lessonId,
      starsEarned: 3,
    });
    setSelectedLesson(null);
  };

  if (selectedLesson !== null) {
    const LessonComponents = [
      Lesson1Welcome,
      Lesson2FinancialJourney,
      Lesson3LifeScenarios,
      Lesson4BudgetChallenge,
      Lesson5FuturePlanning,
      Lesson6MasterQuiz,
    ];
    const LessonComponent = LessonComponents[selectedLesson - 1];
    return (
      <LessonComponent onComplete={() => handleLessonComplete(selectedLesson)} />
    );
  }

  const completedLessons = worldProgress?.completedLessons.length || 0;
  const totalLessons = lessons.length;
  const progressPercentage = (completedLessons / totalLessons) * 100;
  const isWorldComplete = completedLessons >= totalLessons;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4">
      <div className="max-w-4xl mx-auto pt-8 pb-20 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate("/learn")}>
            ← Back to Map
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">World 8: The Master Quest</h1>
                <p className="text-muted-foreground">
                  The ultimate financial challenge
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Your Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: totalLessons }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < completedLessons
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </Card>

        {/* World Complete Celebration */}
        {isWorldComplete && (
          <Card className="p-8 text-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 border-2 border-purple-500">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">
              🎉 Congratulations, Money Master! 🎉
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              You've completed all 8 worlds and mastered the fundamentals of
              personal finance! You're now equipped with the knowledge and skills
              to make smart money decisions for life.
            </p>
            <div className="space-y-3">
              <Card className="p-4 bg-background/50">
                <p className="font-semibold mb-2">🌟 What You've Achieved:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Mastered money basics and earning strategies</li>
                  <li>✓ Learned the power of saving and investing</li>
                  <li>✓ Developed smart shopping and budgeting skills</li>
                  <li>✓ Explored entrepreneurship and business thinking</li>
                  <li>✓ Understood digital payments and security</li>
                  <li>✓ Embraced the importance of giving back</li>
                  <li>✓ Completed the ultimate financial challenge</li>
                </ul>
              </Card>
              <p className="text-sm text-muted-foreground">
                Keep practicing these skills in real life. Remember: every smart
                choice you make today builds a better financial future!
              </p>
            </div>
            <Button
              size="lg"
              className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => navigate("/learn")}
            >
              Return to World Map
            </Button>
          </Card>
        )}

        {/* Lessons Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => {
            const isCompleted = worldProgress?.completedLessons.includes(lesson.id) || false;
            const isUnlocked = (worldProgress?.completedLessons.length || 0) >= lesson.id - 1;
            const Icon = lesson.icon;

            return (
              <Card
                key={lesson.id}
                className={`p-6 transition-all ${
                  isUnlocked
                    ? "cursor-pointer hover:shadow-lg hover:scale-105"
                    : "opacity-60"
                } ${isCompleted ? "border-2 border-green-500" : ""}`}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedLesson(lesson.id);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${lesson.color} flex items-center justify-center shrink-0`}
                  >
                    {isUnlocked ? (
                      <Icon className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">
                        Lesson {lesson.id}
                      </h3>
                      {isCompleted && (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      )}
                    </div>
                    <h4 className="font-semibold mb-1">{lesson.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {lesson.description}
                    </p>
                    {!isUnlocked && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Complete previous lessons to unlock
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tips Card */}
        <Card className="p-6 bg-muted/50">
          <div className="flex gap-3">
            <Sparkles className="w-6 h-6 text-purple-500 shrink-0" />
            <div>
              <h3 className="font-bold mb-2">Master Quest Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • This is your final test - take your time and think carefully
                </li>
                <li>
                  • Apply everything you've learned from all previous worlds
                </li>
                <li>• Don't stress - you've already learned all you need!</li>
                <li>
                  • Remember: real financial success comes from consistent good
                  habits
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
