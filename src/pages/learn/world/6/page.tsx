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
import Lesson2PaymentGame from "./_components/lesson-2-payment-game.tsx";
import Lesson3Story from "./_components/lesson-3-story.tsx";
import Lesson4ScamGame from "./_components/lesson-4-scam-game.tsx";
import Lesson5WalletGame from "./_components/lesson-5-wallet-game.tsx";
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
    title: "Welcome to Digital Dunes",
    emoji: "🏜️",
    description: "Meet Cyrus and learn about the digital money revolution",
    type: "story",
    stars: 1,
  },
  {
    id: 2,
    title: "Digital Payment Explorer",
    emoji: "💰",
    description: "Discover payment apps, digital wallets, and online banking",
    type: "game",
    stars: 2,
  },
  {
    id: 3,
    title: "The Security Oasis",
    emoji: "🛡️",
    description: "Learn to protect your money and information online",
    type: "story",
    stars: 1,
  },
  {
    id: 4,
    title: "Scam Detector Challenge",
    emoji: "🕵️",
    description: "Identify phishing, fake messages, and online scams",
    type: "game",
    stars: 3,
  },
  {
    id: 5,
    title: "Digital Wallet Safety",
    emoji: "💳",
    description: "Make safe decisions when using digital money",
    type: "game",
    stars: 3,
  },
  {
    id: 6,
    title: "Digital Safety Quiz",
    emoji: "🎓",
    description: "Test your digital money and security knowledge",
    type: "quiz",
    stars: 2,
  },
];

function World6Inner() {
  const navigate = useNavigate();
  const worldProgress = useQuery(api.worlds.getWorldProgress, { worldId: 6 });
  const world5Progress = useQuery(api.worlds.getWorldProgress, { worldId: 5 });
  const completeLesson = useMutation(api.worlds.completeLesson);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  if (!worldProgress || !world5Progress) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  // Check if World 5 is completed
  const world5Completed = world5Progress.completedLessons?.length === 6;

  if (!world5Completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
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
                Complete World 5: Entrepreneur Island to unlock Digital Dunes!
              </p>
              <Button
                onClick={() => navigate("/learn/world/5")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Go to World 5
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
        worldId: 6,
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
        return <Lesson2PaymentGame onComplete={() => handleLessonComplete(2, 2)} />;
      case 3:
        return <Lesson3Story onComplete={() => handleLessonComplete(3, 1)} />;
      case 4:
        return <Lesson4ScamGame onComplete={() => handleLessonComplete(4, 3)} />;
      case 5:
        return <Lesson5WalletGame onComplete={() => handleLessonComplete(5, 3)} />;
      case 6:
        return <Lesson6Quiz onComplete={() => handleLessonComplete(6, 2)} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
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
            <div className="text-6xl">🏜️</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-orange-900 dark:text-orange-100">
                World 6: Digital Dunes
              </h1>
              <p className="text-lg text-orange-700 dark:text-orange-300">
                Navigate digital money and stay safe online
              </p>
            </div>
          </div>

          <Card className="border-2 border-orange-300 dark:border-orange-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Progress</CardTitle>
                <div className="flex items-center gap-2">
                  <StarIcon className="size-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-xl font-bold text-orange-900 dark:text-orange-100">
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
                <div className="h-3 overflow-hidden rounded-full bg-orange-200 dark:bg-orange-900">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100">
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
                      ? "cursor-pointer border-2 border-transparent hover:border-orange-400 hover:shadow-lg"
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
                          <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100">
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
                          <span className="rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold uppercase text-orange-900 dark:bg-orange-900 dark:text-orange-100">
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                      {unlocked && !completed && (
                        <Button
                          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
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
                Congratulations, Digital Expert!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-foreground">
                You've completed World 6: Digital Dunes! You now know how to
                navigate digital money safely and protect yourself from online
                threats. Stay vigilant!
              </p>
              <div className="rounded-lg bg-white p-4 dark:bg-card">
                <p className="mb-2 font-semibold text-foreground">
                  🛡️ Digital Safety Reminders:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use strong passwords and enable two-factor authentication</li>
                  <li>• Never share passwords or verification codes</li>
                  <li>• Avoid public WiFi for banking and sensitive activities</li>
                  <li>• If it seems too good to be true, it probably is</li>
                  <li>• Always verify requests before sending money</li>
                </ul>
              </div>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                onClick={() => navigate("/learn/world/7")}
              >
                Continue to World 7: The Giving Grove
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function World6Page() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 p-4 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4 text-center">
              <img
                src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
                alt="Budget Teen Logo"
                className="mx-auto size-20"
              />
              <div className="text-6xl">🏜️</div>
              <CardTitle className="text-3xl font-bold">
                World 6: Digital Dunes
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to learn digital money safety!
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
        <World6Inner />
      </Authenticated>
    </>
  );
}
