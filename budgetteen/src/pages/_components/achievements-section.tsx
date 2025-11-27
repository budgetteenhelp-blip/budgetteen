import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { TrophyIcon, LockIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ALL_BADGES = {
  FIRST_TRANSACTION: { name: "Getting Started", emoji: "🌟", description: "Added your first transaction" },
  FIRST_GOAL: { name: "Goal Setter", emoji: "🎯", description: "Created your first savings goal" },
  GOAL_ACHIEVED: { name: "Goal Crusher", emoji: "🏆", description: "Completed your first goal" },
  STREAK_3: { name: "On Fire", emoji: "🔥", description: "3-day tracking streak" },
  STREAK_7: { name: "Week Warrior", emoji: "⚡", description: "7-day tracking streak" },
  STREAK_30: { name: "Legend", emoji: "👑", description: "30-day tracking streak" },
  SAVER_100: { name: "Century Saver", emoji: "💯", description: "Saved $100" },
  SAVER_500: { name: "Big Saver", emoji: "💰", description: "Saved $500" },
  SAVER_1000: { name: "Grand Saver", emoji: "🌈", description: "Saved $1000" },
  LEVEL_5: { name: "Rising Star", emoji: "⭐", description: "Reached level 5" },
  LEVEL_10: { name: "Money Master", emoji: "🎓", description: "Reached level 10" },
  TRANSACTIONS_50: { name: "Super Tracker", emoji: "📊", description: "Logged 50 transactions" },
};

export default function AchievementsSection() {
  const achievements = useQuery(api.gamification.getUserAchievements);

  if (achievements === undefined) {
    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrophyIcon className="size-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  const unlockedBadgeIds = new Set(achievements.map((a) => a.badgeId));
  const allBadges = Object.entries(ALL_BADGES);
  const unlockedCount = achievements.length;
  const totalCount = allBadges.length;

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrophyIcon className="size-5" />
            Achievements 🏆
          </CardTitle>
          <Badge variant="secondary" className="text-sm">
            {unlockedCount} / {totalCount}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {allBadges.map(([id, badge]) => {
            const isUnlocked = unlockedBadgeIds.has(id);
            const achievement = achievements.find((a) => a.badgeId === id);

            return (
              <div
                key={id}
                className={`group relative flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                  isUnlocked
                    ? "border-purple-200 bg-purple-50 hover:scale-105 dark:border-purple-800 dark:bg-purple-950"
                    : "border-gray-200 bg-gray-50 opacity-50 dark:border-gray-800 dark:bg-gray-950"
                }`}
                title={badge.description}
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-full text-2xl ${
                    isUnlocked
                      ? "bg-purple-200 dark:bg-purple-900"
                      : "bg-gray-200 dark:bg-gray-800"
                  }`}
                >
                  {isUnlocked ? badge.emoji : <LockIcon className="size-5 text-gray-400" />}
                </div>
                <p className="text-center text-xs font-medium text-foreground">
                  {badge.name}
                </p>
                {isUnlocked && achievement && (
                  <p className="text-center text-xs text-muted-foreground">
                    {formatDistanceToNow(achievement.unlockedAt, { addSuffix: true })}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {unlockedCount === 0 && (
          <div className="mt-4 rounded-lg bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Start tracking transactions and setting goals to unlock achievements! 🎮
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
