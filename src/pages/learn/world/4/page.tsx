import { useState, useEffect } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import {
  ArrowLeftIcon,
  StarIcon,
  CheckCircleIcon,
  PlayIcon,
  LockIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";
import Lesson1Story from "./_components/lesson-1-story.tsx";
import Lesson2BudgetGame from "./_components/lesson-2-budget-game.tsx";
import Lesson3Rule from "./_components/lesson-3-rule.tsx";
import Lesson4EmergencyGame from "./_components/lesson-4-emergency-game.tsx";
import Lesson5BudgetPuzzle from "./_components/lesson-5-budget-puzzle.tsx";
import Lesson6Quiz from "./_components/lesson-6-quiz.tsx";

interface Lesson {
  id: number;
  title: string;
  emoji: string;
  description: string;
  type: "game" | "story" | "quiz";
  stars: number;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Welcome to Town Treasury!",
    emoji: "🏛️",
    description: "Meet the treasurer and learn what budgeting means",
    type: "story",
    stars: 1,
  },
  {
    id: 2,
    title: "Budget Basics Game",
    emoji: "📊",
    description: "Sort income and expenses into the right categories",
    type: "game",
    stars: 2,
  },
  {
    id: 3,
    title: "The 50/30/20 Rule",
    emoji: "🎯",
    description: "Discover the magic budgeting formula",
    type: "story",
    stars: 2,
  },
  {
    id: 4,
    title: "Budget Emergency Challenge",
    emoji: "🚨",
    description: "Handle unexpected expenses and stay on budget",
    type: "game",
    stars: 3,
  },
  {
    id: 5,
    title: "Monthly Budget Puzzle",
    emoji: "🧩",
    description: "Create and balance a complete monthly budget",
    type: "game",
    stars: 3,
  },
  {
    id: 6,
    title: "Master Treasurer Quiz",
    emoji: "👑",
    description: "Test your budgeting mastery",
    type: "quiz",
    stars: 2,
  },
];

function World4Inner() {
  const navigate = useNavigate();
  const worldProgress = useQuery(api.worlds.getWorldProgress, { worldId: 4 });
  const world3Progress = useQuery(api.worlds.getWorldProgress, { worldId: 3 });
  const completeLesson = useMutation(api.worlds.completeLesson);
  const unlockWorld = useMutation(api.worlds.unlockNextWorld);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  // Check if World 3 is completed and unlock World 4
  useEffect(() => {
    if (world3Progress && !worldProgress && !isUnlocking) {
      const world3Lessons = 6; // World 3 has 6 lessons
      if (world3Progress.completedLessons.length === world3Lessons) {
        setIsUnlocking(true);
        unlockWorld({ worldId: 4 })
          .then(() => {
            toast.success("World 4: Town Treasury Quest unlocked! 🏛️");
          })
          .catch(console.error)
          .finally(() => {
            setIsUnlocking(false);
          });
      }
    }
  }, [world3Progress, worldProgress, unlockWorld, isUnlocking]);

  if (!worldProgress || !world3Progress) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  // Check if world is unlocked
  if (!worldProgress.isUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 p-4 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950">
        <Card className="w-full max-w-md border-4 border-blue-300 dark:border-blue-700">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-gray-800 p-4">
                <LockIcon className="size-12 text-gray-300" />
              </div>
            </div>
            <div className="text-6xl">🏛️</div>
            <CardTitle className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              World 4 is Locked
            </CardTitle>
            <p className="text-muted-foreground">
              Complete all lessons in World 3: The Market Maze to unlock Town
              Treasury Quest!
            </p>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate("/learn/world/3")}
            >
              Go to World 3
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedLessons = worldProgress.completedLessons || [];
  const totalStars = worldProgress.stars || 0;

  const isLessonUnlocked = (lessonId: number) => {
    if (lessonId === 1) return true;
    return completedLessons.includes(lessonId - 1);
  };

  const isLessonCompleted = (lessonId: number) => {
    return completedLessons.includes(lessonId);
  };

  const handleStartLesson = (lesson: Lesson) => {
    if (!isLessonUnlocked(lesson.id)) {
      toast.error("Complete the previous lesson first!");
      return;
    }

    setSelectedLesson(lesson.id);
  };

  const handleLessonComplete = async (lessonId: number, stars: number) => {
    try {
      await completeLesson({
        worldId: 4,
        lessonId: lessonId,
        starsEarned: stars,
      });
      toast.success(`Excellent! You earned ${stars} stars! ⭐`);
      setSelectedLesson(null);
    } catch (error) {
      console.error("Failed to complete lesson:", error);
      toast.error("Failed to save progress. Please try again.");
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  // Show lesson component if selected
  if (selectedLesson) {
    const lesson = lessons.find((l) => l.id === selectedLesson);
    if (!lesson) return null;

    switch (selectedLesson) {
      case 1:
        return <Lesson1Story onComplete={() => handleLessonComplete(1, 1)} />;
      case 2:
        return <Lesson2BudgetGame onComplete={() => handleLessonComplete(2, 2)} />;
      case 3:
        return <Lesson3Rule onComplete={() => handleLessonComplete(3, 2)} />;
      case 4:
        return <Lesson4EmergencyGame onComplete={() => handleLessonComplete(4, 3)} />;
      case 5:
        return <Lesson5BudgetPuzzle onComplete={() => handleLessonComplete(5, 3)} />;
      case 6:
        return <Lesson6Quiz onComplete={() => handleLessonComplete(6, 2)} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950">
      <div className="mx-auto max-w-4xl p-4 pb-24 md:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button variant="ghost" onClick={() => navigate("/learn")}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to Map
          </Button>
          <img
            src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
            alt="Budget Teen Logo"
            className="size-10"
          />
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <div className="text-6xl">🏛️</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100">
                World 4: Town Treasury Quest
              </h1>
              <p className="text-lg text-blue-700 dark:text-blue-300">
                Master budgeting and manage money like a pro!
              </p>
            </div>
          </div>

          <Card className="border-2 border-blue-300 dark:border-blue-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Progress</CardTitle>
                <div className="flex items-center gap-2">
                  <StarIcon className="size-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-xl font-bold text-blue-900 dark:text-blue-100">
                    {totalStars} stars
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {completedLessons.length} of {lessons.length} lessons
                  </span>
                  <span className="font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-blue-200 dark:bg-blue-900">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            Lessons
          </h2>

          <div className="grid gap-4">
            {lessons.map((lesson) => {
              const unlocked = isLessonUnlocked(lesson.id);
              const completed = isLessonCompleted(lesson.id);

              return (
                <Card
                  key={lesson.id}
                  className={cn(
                    "transition-all",
                    unlocked
                      ? "cursor-pointer border-2 border-transparent hover:border-blue-400 hover:shadow-lg"
                      : "opacity-50",
                    completed && "bg-green-50 dark:bg-green-950/30",
                  )}
                  onClick={() => unlocked && handleStartLesson(lesson)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{lesson.emoji}</div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                            {lesson.title}
                          </h3>
                          {completed && (
                            <CheckCircleIcon className="size-5 text-green-600" />
                          )}
                        </div>
                        <p className="text-muted-foreground">
                          {lesson.description}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <StarIcon className="size-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-semibold">
                              {lesson.stars} stars
                            </span>
                          </div>
                          <span className="rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold uppercase text-blue-900 dark:bg-blue-900 dark:text-blue-100">
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                      {unlocked && !completed && (
                        <Button
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartLesson(lesson);
                          }}
                        >
                          <PlayIcon className="mr-2 size-4" />
                          Start
                        </Button>
                      )}
                      {completed && (
                        <Button variant="outline">
                          <PlayIcon className="mr-2 size-4" />
                          Replay
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {completedLessons.length === lessons.length && (
          <Card className="mt-8 border-2 border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 dark:border-purple-700 dark:from-purple-950/50 dark:to-pink-950/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-purple-900 dark:text-purple-100">
                <span className="text-4xl">🎉</span>
                Master Treasurer!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-foreground">
                Amazing! You've mastered budgeting and learned how to manage
                money like a pro. Ready to start your own business?
              </p>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => navigate("/learn")}
              >
                Continue to World 5: Entrepreneur Island
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6 border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 dark:border-orange-700 dark:from-orange-950/50 dark:to-amber-950/50">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900 dark:text-orange-100">
              💡 Budgeting Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-foreground">
            <p>
              • <strong>Track everything</strong> - Know where your money goes
            </p>
            <p>
              • <strong>Use the 50/30/20 rule</strong> - Needs, Wants, Savings
            </p>
            <p>
              • <strong>Plan for emergencies</strong> - Unexpected costs happen
            </p>
            <p>
              • <strong>Review monthly</strong> - Adjust your budget as needed
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function World4Page() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 p-4 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4 text-center">
              <img
                src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
                alt="Budget Teen Logo"
                className="mx-auto size-20"
              />
              <div className="text-6xl">🏛️</div>
              <CardTitle className="text-3xl font-bold">
                World 4: Town Treasury Quest
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to master budgeting and money management!
              </p>
            </CardHeader>
            <CardContent>
              <SignInButton size="lg" className="w-full" />
            </CardContent>
          </Card>
        </div>
      </Unauthenticated>
      <AuthLoading>
        <div className="flex min-h-screen items-center justify-center">
          <Skeleton className="h-96 w-full max-w-4xl" />
        </div>
      </AuthLoading>
      <Authenticated>
        <World4Inner />
      </Authenticated>
    </>
  );
}
