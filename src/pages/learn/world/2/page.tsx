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
    title: "Welcome to Piggy Bank Peaks!",
    emoji: "🏔️",
    description: "Meet the mountain villagers and learn why saving matters",
    type: "story",
    stars: 1,
  },
  {
    id: 2,
    title: "The Three Piggy Banks",
    emoji: "🐷",
    description: "Discover different places to save your money",
    type: "game",
    stars: 2,
  },
  {
    id: 3,
    title: "The Magic Money Trees",
    emoji: "🌳",
    description: "Watch your savings grow with the power of interest",
    type: "game",
    stars: 3,
  },
  {
    id: 4,
    title: "Setting Savings Goals",
    emoji: "🎯",
    description: "Learn how to save for the things you really want",
    type: "story",
    stars: 2,
  },
  {
    id: 5,
    title: "The Emergency Fund Challenge",
    emoji: "🚨",
    description: "Build your safety net for unexpected surprises",
    type: "game",
    stars: 2,
  },
  {
    id: 6,
    title: "Climb to the Peak!",
    emoji: "⛰️",
    description: "Put all your saving skills to the test",
    type: "quiz",
    stars: 3,
  },
];

function World2Inner() {
  const navigate = useNavigate();
  const worldProgress = useQuery(api.worlds.getWorldProgress, { worldId: 2 });
  const world1Progress = useQuery(api.worlds.getWorldProgress, { worldId: 1 });
  const completeLesson = useMutation(api.worlds.completeLesson);
  const unlockWorld = useMutation(api.worlds.unlockNextWorld);
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Check if World 1 is completed and unlock World 2
  useEffect(() => {
    if (world1Progress && !worldProgress && !isUnlocking) {
      const world1Lessons = 6; // World 1 has 6 lessons
      if (world1Progress.completedLessons.length === world1Lessons) {
        setIsUnlocking(true);
        unlockWorld({ worldId: 2 })
          .then(() => {
            toast.success("World 2: Piggy Bank Peaks unlocked! 🏔️");
          })
          .catch(console.error)
          .finally(() => {
            setIsUnlocking(false);
          });
      }
    }
  }, [world1Progress, worldProgress, unlockWorld, isUnlocking]);

  if (!worldProgress || !world1Progress) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  // Check if world is unlocked
  if (!worldProgress.isUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 p-4 dark:from-pink-950 dark:via-rose-950 dark:to-red-950">
        <Card className="w-full max-w-md border-4 border-pink-300 dark:border-pink-700">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-gray-800 p-4">
                <LockIcon className="size-12 text-gray-300" />
              </div>
            </div>
            <div className="text-6xl">🏔️</div>
            <CardTitle className="text-3xl font-bold text-pink-900 dark:text-pink-100">
              World 2 is Locked
            </CardTitle>
            <p className="text-muted-foreground">
              Complete all lessons in World 1: Coinville to unlock Piggy Bank
              Peaks!
            </p>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate("/learn/world/1")}
            >
              Go to World 1
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
            worldId: 2,
            lessonId: lesson.id,
            starsEarned: lesson.stars,
          });
          toast.success(
            `Great job! You earned ${lesson.stars} stars! ⭐ Keep climbing!`,
          );
        } catch (error) {
          console.error("Failed to complete lesson:", error);
        }
      }, 2000);
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 dark:from-pink-950 dark:via-rose-950 dark:to-red-950">
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
            <div className="text-6xl">🏔️</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-pink-900 dark:text-pink-100">
                World 2: Piggy Bank Peaks
              </h1>
              <p className="text-lg text-pink-700 dark:text-pink-300">
                Master the art of saving and watch your money grow!
              </p>
            </div>
          </div>

          <Card className="border-2 border-pink-300 dark:border-pink-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Progress</CardTitle>
                <div className="flex items-center gap-2">
                  <StarIcon className="size-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-xl font-bold text-pink-900 dark:text-pink-100">
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
                <div className="h-3 overflow-hidden rounded-full bg-pink-200 dark:bg-pink-900">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-pink-900 dark:text-pink-100">
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
                      ? "cursor-pointer border-2 border-transparent hover:border-pink-400 hover:shadow-lg"
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
                          <h3 className="text-xl font-bold text-pink-900 dark:text-pink-100">
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
                          <span className="rounded-full bg-pink-200 px-3 py-1 text-xs font-semibold uppercase text-pink-900 dark:bg-pink-900 dark:text-pink-100">
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                      {unlocked && !completed && (
                        <Button
                          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
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
          <Card className="mt-8 border-2 border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:border-green-700 dark:from-green-950/50 dark:to-emerald-950/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-green-900 dark:text-green-100">
                <span className="text-4xl">🎉</span>
                You've Reached the Peak!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-foreground">
                Amazing work! You've mastered saving and learned how to grow
                your money. Now you're ready to explore smart shopping!
              </p>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                onClick={() => navigate("/learn")}
              >
                Continue to World 3: The Market Maze
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6 border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 dark:border-blue-700 dark:from-blue-950/50 dark:to-cyan-950/50">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900 dark:text-blue-100">
              💡 Saving Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-foreground">
            <p>
              • <strong>Pay yourself first</strong> - Save before you spend
            </p>
            <p>
              • <strong>Set clear goals</strong> - Know what you're saving for
            </p>
            <p>
              • <strong>Start small</strong> - Even $1 a day adds up!
            </p>
            <p>
              • <strong>Watch it grow</strong> - Interest makes your money work
              for you
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function World2Page() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 p-4 dark:from-pink-950 dark:via-rose-950 dark:to-red-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4 text-center">
              <img
                src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
                alt="Budget Teen Logo"
                className="mx-auto size-20"
              />
              <div className="text-6xl">🏔️</div>
              <CardTitle className="text-3xl font-bold">
                World 2: Piggy Bank Peaks
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to climb the mountain and master saving!
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
        <World2Inner />
      </Authenticated>
    </>
  );
}
