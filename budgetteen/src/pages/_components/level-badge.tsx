import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Card } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { SparklesIcon, TrendingUpIcon, FlameIcon } from "lucide-react";

export default function LevelBadge() {
  const stats = useQuery(api.gamification.getUserStats);

  if (stats === undefined) {
    return <Skeleton className="h-28 w-full" />;
  }

  const getLevelTitle = (level: number) => {
    if (level >= 20) return "Money Legend";
    if (level >= 15) return "Finance Pro";
    if (level >= 10) return "Budget Master";
    if (level >= 5) return "Rising Star";
    return "Beginner";
  };

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-100 via-violet-100 to-purple-100 p-4 dark:border-purple-800 dark:from-purple-950 dark:via-violet-950 dark:to-purple-950">
      <div className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-violet-600 text-2xl font-bold text-white shadow-lg">
          {stats.level}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <SparklesIcon className="size-4 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-foreground">
                  Level {stats.level} - {getLevelTitle(stats.level)}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.xp} / {stats.xpForNextLevel} XP
              </p>
            </div>
            {stats.currentStreak > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-orange-200 px-3 py-1 dark:bg-orange-900">
                <FlameIcon className="size-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-bold text-orange-900 dark:text-orange-100">
                  {stats.currentStreak}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <Progress value={stats.xpProgress} className="h-2" />
            <p className="text-xs text-purple-700 dark:text-purple-400">
              {Math.round(stats.xpProgress)}% to Level {stats.level + 1}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
