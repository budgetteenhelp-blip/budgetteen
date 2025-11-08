import { useState } from "react";
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
    title: "Welcome to Coinville!",
    emoji: "👋",
    description: "Meet the townspeople and learn what money is",
    type: "story",
    stars: 1,
  },
  {
    id: 2,
    title: "The Trading Game",
    emoji: "🔄",
    description: "Help villagers trade goods and discover bartering",
    type: "game",
    stars: 2,
  },
  {
    id: 3,
    title: "Why Money Matters",
    emoji: "💰",
    description: "Learn why we use coins instead of trading everything",
    type: "story",
    stars: 1,
  },
  {
    id: 4,
    title: "Job Fair Day",
    emoji: "💼",
    description: "Explore different jobs and how people earn money",
    type: "game",
    stars: 2,
  },
  {
    id: 5,
    title: "Needs vs Wants",
    emoji: "🎯",
    description: "Help townspeople decide what to buy first",
    type: "game",
    stars: 3,
  },
  {
    id: 6,
    title: "Your First Paycheck",
    emoji: "📄",
    description: "Earn your first coins and make smart choices",
    type: "quiz",
    stars: 2,
  },
];

function World1Inner() {
  const navigate = useNavigate();
  const worldProgress = useQuery(api.worlds.getWorldProgress, { worldId: 1 });
  const completeLesson = useMutation(api.worlds.completeLesson);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  if (!worldProgress) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-4xl" />
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

    // For now, simulate completing the lesson
    // In a full implementation, this would launch the actual lesson/game
    if (isLessonCompleted(lesson.id)) {
      toast.info("You've already completed this lesson!");
    } else {
      toast.success(`Starting: ${lesson.title}`);
      
      // Simulate lesson completion after a short delay
      setTimeout(async () => {
        try {
          await completeLesson({
            worldId: 1,
            lessonId: lesson.id,
            starsEarned: lesson.stars,
          });
          toast.success(`Great job! You earned ${lesson.stars} stars! ⭐`);
        } catch (error) {
          console.error("Failed to complete lesson:", error);
        }
      }, 2000);
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950">
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
            <div className="text-6xl">🪙</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100">
                World 1: Coinville
              </h1>
              <p className="text-lg text-amber-700 dark:text-amber-300">
                Learn the basics of money, trading, and earning income
              </p>
            </div>
          </div>

          <Card className="border-2 border-amber-300 dark:border-amber-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Progress</CardTitle>
                <div className="flex items-center gap-2">
                  <StarIcon className="size-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-xl font-bold text-amber-900 dark:text-amber-100">
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
                <div className="h-3 overflow-hidden rounded-full bg-amber-200 dark:bg-amber-900">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
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
                      ? "cursor-pointer border-2 border-transparent hover:border-amber-400 hover:shadow-lg"
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
                          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
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
                          <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold uppercase text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                      {unlocked && !completed && (
                        <Button
                          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
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
                Congratulations!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-foreground">
                You've completed World 1: Coinville! You've mastered the basics
                of money and earning income.
              </p>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                onClick={() => navigate("/learn")}
              >
                Continue to World 2: Piggy Bank Peaks
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function World1Page() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 p-4 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4 text-center">
              <img
                src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
                alt="Budget Teen Logo"
                className="mx-auto size-20"
              />
              <div className="text-6xl">🪙</div>
              <CardTitle className="text-3xl font-bold">
                World 1: Coinville
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to start your money learning adventure!
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
        <World1Inner />
      </Authenticated>
    </>
  );
}
