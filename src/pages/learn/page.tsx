import { useState, useEffect } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { BottomTabBar } from "@/components/bottom-tab-bar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { LockIcon, StarIcon, TrophyIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils.ts";
import ProfileAvatarButton from "@/components/profile-avatar-button.tsx";

interface World {
  id: number;
  name: string;
  emoji: string;
  description: string;
  color: string;
  bgGradient: string;
}

const worlds: World[] = [
  {
    id: 1,
    name: "Coinville",
    emoji: "🪙",
    description: "Learn about money, trading, and earning income",
    color: "text-amber-600",
    bgGradient: "from-amber-400 to-yellow-500",
  },
  {
    id: 2,
    name: "Piggy Bank Peaks",
    emoji: "🏔️",
    description: "Master the art of saving and growing your money",
    color: "text-pink-600",
    bgGradient: "from-pink-400 to-rose-500",
  },
  {
    id: 3,
    name: "The Market Maze",
    emoji: "🏪",
    description: "Navigate smart shopping and budget decisions",
    color: "text-green-600",
    bgGradient: "from-green-400 to-emerald-500",
  },
  {
    id: 4,
    name: "Town Treasury Quest",
    emoji: "🏛️",
    description: "Build budgets and manage money like a pro",
    color: "text-blue-600",
    bgGradient: "from-blue-400 to-cyan-500",
  },
  {
    id: 5,
    name: "Entrepreneur Island",
    emoji: "🏝️",
    description: "Start your own business and become a boss",
    color: "text-purple-600",
    bgGradient: "from-purple-400 to-violet-500",
  },
  {
    id: 6,
    name: "Digital Dunes",
    emoji: "🏜️",
    description: "Navigate the digital money world safely",
    color: "text-orange-600",
    bgGradient: "from-orange-400 to-amber-500",
  },
  {
    id: 7,
    name: "The Giving Grove",
    emoji: "🌳",
    description: "Learn about charity, taxes, and giving back",
    color: "text-teal-600",
    bgGradient: "from-teal-400 to-cyan-500",
  },
  {
    id: 8,
    name: "The Master Quest",
    emoji: "👑",
    description: "Put all your skills together in the ultimate challenge",
    color: "text-indigo-600",
    bgGradient: "from-indigo-400 to-purple-500",
  },
];

function LearnInner() {
  const navigate = useNavigate();
  const progress = useQuery(api.worlds.getUserProgress);
  const initializeWorld1 = useMutation(api.worlds.initializeWorld1);
  const [selectedWorld, setSelectedWorld] = useState<number | null>(null);

  useEffect(() => {
    if (progress && progress.length === 0) {
      initializeWorld1().catch(console.error);
    }
  }, [progress, initializeWorld1]);

  if (!progress) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  const getWorldProgress = (worldId: number) => {
    return progress.find((p) => p.worldId === worldId);
  };

  const isWorldUnlocked = (worldId: number) => {
    if (worldId === 1) return true;
    const worldProgress = getWorldProgress(worldId);
    return worldProgress?.isUnlocked || false;
  };

  const getWorldStars = (worldId: number) => {
    const worldProgress = getWorldProgress(worldId);
    return worldProgress?.stars || 0;
  };

  const totalStars = progress.reduce((sum, p) => sum + p.stars, 0);
  const completedWorlds = progress.filter(
    (p) => p.completedLessons.length > 0,
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 pb-20 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
      <div className="mx-auto max-w-6xl p-4 md:p-6">
        <div className="mb-6 flex items-center justify-end gap-2">
          <ProfileAvatarButton />
          <img
            src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
            alt="Budget Teen Logo"
            className="size-10"
          />
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-purple-900 dark:text-purple-100">
            🎓 Learning Adventure
          </h1>
          <p className="text-lg text-purple-700 dark:text-purple-300">
            Explore 8 worlds and master money management!
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card className="border-2 border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-950/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <StarIcon className="size-5 fill-yellow-500 text-yellow-500" />
                Total Stars
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {totalStars}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-950/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrophyIcon className="size-5 fill-amber-500 text-amber-500" />
                Worlds Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {completedWorlds} / 8
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-950/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                🎯 Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {Math.round((completedWorlds / 8) * 100)}%
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {worlds.map((world) => {
            const unlocked = isWorldUnlocked(world.id);
            const stars = getWorldStars(world.id);
            const worldProgress = getWorldProgress(world.id);
            const lessonsCompleted = worldProgress?.completedLessons.length || 0;

            return (
              <Card
                key={world.id}
                className={cn(
                  "group relative overflow-hidden transition-all hover:scale-105",
                  unlocked
                    ? "cursor-pointer border-2 border-transparent hover:border-purple-400 hover:shadow-xl"
                    : "cursor-not-allowed opacity-60",
                )}
                onClick={() => {
                  if (unlocked) {
                    setSelectedWorld(world.id);
                    navigate(`/learn/world/${world.id}`);
                  }
                }}
              >
                <div
                  className={cn(
                    "absolute inset-0 opacity-20 bg-gradient-to-br",
                    world.bgGradient,
                  )}
                />

                <CardHeader className="relative">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="text-6xl">{world.emoji}</div>
                    {!unlocked && (
                      <div className="rounded-full bg-gray-800 p-2">
                        <LockIcon className="size-5 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <CardTitle className={cn("text-2xl font-bold", world.color)}>
                    {world.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {world.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  {unlocked ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <StarIcon className="size-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold">{stars} stars</span>
                      </div>
                      {lessonsCompleted > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {lessonsCompleted} lessons completed
                        </div>
                      )}
                      <Button
                        className={cn(
                          "mt-2 w-full bg-gradient-to-r",
                          world.bgGradient,
                        )}
                      >
                        {lessonsCompleted > 0 ? "Continue" : "Start Adventure"}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Complete previous worlds to unlock
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 dark:border-blue-700 dark:from-blue-950/50 dark:to-cyan-950/50">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900 dark:text-blue-100">
              💡 How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-foreground">
            <p>
              • <strong>Start with Coinville</strong> and work your way up
            </p>
            <p>
              • <strong>Complete lessons</strong> to earn stars and unlock new
              worlds
            </p>
            <p>
              • <strong>Play mini-games</strong> to practice real money skills
            </p>
            <p>
              • <strong>Master all 8 worlds</strong> to become a money expert!
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomTabBar />
    </div>
  );
}

export default function LearnPage() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4 text-center">
              <img
                src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
                alt="Budget Teen Logo"
                className="mx-auto size-20"
              />
              <div className="text-6xl">🎓</div>
              <CardTitle className="text-3xl font-bold">
                Learning Adventure
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to explore 8 interactive worlds and master money
                management!
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
        <LearnInner />
      </Authenticated>
    </>
  );
}
