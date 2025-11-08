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
    title: "Welcome to Market Maze!",
    emoji: "🏪",
    description: "Explore the bustling market and learn smart shopping",
    type: "story",
    stars: 1,
  },
  {
    id: 2,
    title: "The Price Comparison Game",
    emoji: "🏷️",
    description: "Find the best deals by comparing prices across stores",
    type: "game",
    stars: 2,
  },
  {
    id: 3,
    title: "Budget Shopping Challenge",
    emoji: "🛒",
    description: "Buy everything on your list within your budget",
    type: "game",
    stars: 3,
  },
  {
    id: 4,
    title: "Quality vs. Price",
    emoji: "⚖️",
    description: "Learn when to spend more for better quality",
    type: "story",
    stars: 2,
  },
  {
    id: 5,
    title: "The Bake Sale Business",
    emoji: "🧁",
    description: "Buy supplies wisely to maximize your profit",
    type: "game",
    stars: 3,
  },
  {
    id: 6,
    title: "Master Shopper Quiz",
    emoji: "🛍️",
    description: "Test your smart shopping skills",
    type: "quiz",
    stars: 2,
  },
];

function World3Inner() {
  const navigate = useNavigate();
  const worldProgress = useQuery(api.worlds.getWorldProgress, { worldId: 3 });
  const world2Progress = useQuery(api.worlds.getWorldProgress, { worldId: 2 });
  const completeLesson = useMutation(api.worlds.completeLesson);
  const unlockWorld = useMutation(api.worlds.unlockNextWorld);
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Check if World 2 is completed and unlock World 3
  useEffect(() => {
    if (world2Progress && !worldProgress && !isUnlocking) {
      const world2Lessons = 6; // World 2 has 6 lessons
      if (world2Progress.completedLessons.length === world2Lessons) {
        setIsUnlocking(true);
        unlockWorld({ worldId: 3 })
          .then(() => {
            toast.success("World 3: The Market Maze unlocked! 🏪");
          })
          .catch(console.error)
          .finally(() => {
            setIsUnlocking(false);
          });
      }
    }
  }, [world2Progress, worldProgress, unlockWorld, isUnlocking]);

  if (!worldProgress || !world2Progress) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  // Check if world is unlocked
  if (!worldProgress.isUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-4 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
        <Card className="w-full max-w-md border-4 border-green-300 dark:border-green-700">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-gray-800 p-4">
                <LockIcon className="size-12 text-gray-300" />
              </div>
            </div>
            <div className="text-6xl">🏪</div>
            <CardTitle className="text-3xl font-bold text-green-900 dark:text-green-100">
              World 3 is Locked
            </CardTitle>
            <p className="text-muted-foreground">
              Complete all lessons in World 2: Piggy Bank Peaks to unlock The
              Market Maze!
            </p>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate("/learn/world/2")}
            >
              Go to World 2
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

  const handleStartLesson = async (lesson: Lesson) => {
    if (!isLessonUnlocked(lesson.id)) {
      toast.error("Complete the previous lesson first!");
      return;
    }

    if (isLessonCompleted(lesson.id)) {
      toast.info("You've already completed this lesson!");
    } else {
      toast.success(`Starting: ${lesson.title}`);

      // Simulate lesson completion
      setTimeout(async () => {
        try {
          await completeLesson({
            worldId: 3,
            lessonId: lesson.id,
            starsEarned: lesson.stars,
          });
          toast.success(
            `Excellent! You earned ${lesson.stars} stars! ⭐ Keep shopping smart!`,
          );
        } catch (error) {
          console.error("Failed to complete lesson:", error);
        }
      }, 2000);
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
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
            <div className="text-6xl">🏪</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-green-900 dark:text-green-100">
                World 3: The Market Maze
              </h1>
              <p className="text-lg text-green-700 dark:text-green-300">
                Navigate smart shopping and make the best budget decisions!
              </p>
            </div>
          </div>

          <Card className="border-2 border-green-300 dark:border-green-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Progress</CardTitle>
                <div className="flex items-center gap-2">
                  <StarIcon className="size-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-xl font-bold text-green-900 dark:text-green-100">
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
                <div className="h-3 overflow-hidden rounded-full bg-green-200 dark:bg-green-900">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">
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
                      ? "cursor-pointer border-2 border-transparent hover:border-green-400 hover:shadow-lg"
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
                          <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
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
                          <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold uppercase text-green-900 dark:bg-green-900 dark:text-green-100">
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                      {unlocked && !completed && (
                        <Button
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
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
          <Card className="mt-8 border-2 border-blue-400 bg-gradient-to-r from-blue-50 to-cyan-50 dark:border-blue-700 dark:from-blue-950/50 dark:to-cyan-950/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-blue-900 dark:text-blue-100">
                <span className="text-4xl">🎉</span>
                Master Shopper Achievement!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-foreground">
                Fantastic! You've learned how to shop smart and make the most of
                your money. Now it's time to master budgeting!
              </p>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                onClick={() => navigate("/learn")}
              >
                Continue to World 4: Town Treasury Quest
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6 border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 dark:border-orange-700 dark:from-orange-950/50 dark:to-amber-950/50">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900 dark:text-orange-100">
              💡 Smart Shopping Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-foreground">
            <p>
              • <strong>Compare prices</strong> - Don't buy the first thing you see
            </p>
            <p>
              • <strong>Make a list</strong> - Stick to what you actually need
            </p>
            <p>
              • <strong>Quality matters</strong> - Sometimes it's worth spending more
            </p>
            <p>
              • <strong>Watch for sales</strong> - But only buy what you planned to get
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function World3Page() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-4 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4 text-center">
              <img
                src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
                alt="Budget Teen Logo"
                className="mx-auto size-20"
              />
              <div className="text-6xl">🏪</div>
              <CardTitle className="text-3xl font-bold">
                World 3: The Market Maze
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to explore the market and become a smart shopper!
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
        <World3Inner />
      </Authenticated>
    </>
  );
}
