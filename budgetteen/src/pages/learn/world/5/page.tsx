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
  LockIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";
import Lesson1Story from "./_components/lesson-1-story.tsx";
import Lesson2ProblemGame from "./_components/lesson-2-problem-game.tsx";
import Lesson3Story from "./_components/lesson-3-story.tsx";
import Lesson4LemonadeGame from "./_components/lesson-4-lemonade-game.tsx";
import Lesson5PricingGame from "./_components/lesson-5-pricing-game.tsx";
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
    title: "Welcome to Entrepreneur Island",
    emoji: "🏝️",
    description: "Meet Captain Venture and learn what entrepreneurship means",
    type: "story",
    stars: 1,
  },
  {
    id: 2,
    title: "Problem Finder Challenge",
    emoji: "🔍",
    description: "Identify real business opportunities in everyday problems",
    type: "game",
    stars: 2,
  },
  {
    id: 3,
    title: "The Customer Quest",
    emoji: "🎯",
    description: "Understand your customers and what they value",
    type: "story",
    stars: 1,
  },
  {
    id: 4,
    title: "Lemonade Stand Simulator",
    emoji: "🍋",
    description: "Run a simple business and make real decisions",
    type: "game",
    stars: 3,
  },
  {
    id: 5,
    title: "Pricing Challenge",
    emoji: "💰",
    description: "Learn about costs, pricing, and profit margins",
    type: "game",
    stars: 3,
  },
  {
    id: 6,
    title: "Entrepreneur Quiz",
    emoji: "🎓",
    description: "Test your business knowledge and earn rewards",
    type: "quiz",
    stars: 2,
  },
];

function World5Inner() {
  const navigate = useNavigate();
  const worldProgress = useQuery(api.worlds.getWorldProgress, { worldId: 5 });
  const world4Progress = useQuery(api.worlds.getWorldProgress, { worldId: 4 });
  const completeLesson = useMutation(api.worlds.completeLesson);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  if (!worldProgress || !world4Progress) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  // Check if World 4 is completed
  const world4Completed =
    world4Progress.completedLessons?.length === 6;

  if (!world4Completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950">
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

          <Card className="mx-auto mt-12 max-w-md">
            <CardHeader className="space-y-4 text-center">
              <div className="text-6xl">🔒</div>
              <CardTitle className="text-2xl">World Locked</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                Complete World 4: Town Treasury Quest to unlock Entrepreneur
                Island!
              </p>
              <Button
                onClick={() => navigate("/learn/world/4")}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                Go to World 4
              </Button>
            </CardContent>
          </Card>
        </div>
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
        worldId: 5,
        lessonId: lessonId,
        starsEarned: stars,
      });
      toast.success(`Great job! You earned ${stars} stars! ⭐`);
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
        return <Lesson2ProblemGame onComplete={() => handleLessonComplete(2, 2)} />;
      case 3:
        return <Lesson3Story onComplete={() => handleLessonComplete(3, 1)} />;
      case 4:
        return <Lesson4LemonadeGame onComplete={() => handleLessonComplete(4, 3)} />;
      case 5:
        return <Lesson5PricingGame onComplete={() => handleLessonComplete(5, 3)} />;
      case 6:
        return <Lesson6Quiz onComplete={() => handleLessonComplete(6, 2)} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950">
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
            <div className="text-6xl">🏝️</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-purple-900 dark:text-purple-100">
                World 5: Entrepreneur Island
              </h1>
              <p className="text-lg text-purple-700 dark:text-purple-300">
                Learn how to start and run your own business
              </p>
            </div>
          </div>

          <Card className="border-2 border-purple-300 dark:border-purple-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Progress</CardTitle>
                <div className="flex items-center gap-2">
                  <StarIcon className="size-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-xl font-bold text-purple-900 dark:text-purple-100">
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
                <div className="h-3 overflow-hidden rounded-full bg-purple-200 dark:bg-purple-900">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100">
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
                      ? "cursor-pointer border-2 border-transparent hover:border-purple-400 hover:shadow-lg"
                      : "opacity-50",
                    completed && "bg-green-50 dark:bg-green-950/30",
                  )}
                  onClick={() => unlocked && handleStartLesson(lesson)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="text-5xl">{lesson.emoji}</div>
                        {!unlocked && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <LockIcon className="size-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">
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
                          <span className="rounded-full bg-purple-200 px-3 py-1 text-xs font-semibold uppercase text-purple-900 dark:bg-purple-900 dark:text-purple-100">
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                      {unlocked && !completed && (
                        <Button
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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
                Congratulations, Entrepreneur!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-foreground">
                You've completed World 5: Entrepreneur Island! You now understand
                the basics of starting and running a business. Keep thinking like
                an entrepreneur!
              </p>
              <div className="rounded-lg bg-white p-4 dark:bg-card">
                <p className="mb-2 font-semibold text-foreground">
                  💡 Entrepreneur Tips:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Look for problems you can solve in your daily life</li>
                  <li>• Start small - you don't need lots of money to begin</li>
                  <li>• Always know your costs before setting prices</li>
                  <li>• Listen to your customers and improve your offering</li>
                  <li>• Learn from failures - they're part of every success story</li>
                </ul>
              </div>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                onClick={() => navigate("/learn/world/6")}
              >
                Continue to World 6: Digital Dunes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function World5Page() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-4 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4 text-center">
              <img
                src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
                alt="Budget Teen Logo"
                className="mx-auto size-20"
              />
              <div className="text-6xl">🏝️</div>
              <CardTitle className="text-3xl font-bold">
                World 5: Entrepreneur Island
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to start your entrepreneurship journey!
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
        <World5Inner />
      </Authenticated>
    </>
  );
}
