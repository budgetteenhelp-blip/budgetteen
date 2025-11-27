import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { Doc } from "@/convex/_generated/dataModel.d.ts";
import { Card } from "@/components/ui/card.tsx";
import { AlertTriangleIcon, SparklesIcon, TrendingUpIcon, ZapIcon } from "lucide-react";

interface FunNudgeProps {
  user: Doc<"users">;
}

export default function FunNudge({ user }: FunNudgeProps) {
  const recentTransactions = useQuery(api.transactions.getRecent, { limit: 10 });
  const stats = useQuery(api.gamification.getUserStats);

  if (!recentTransactions || !stats) return null;

  // Calculate recent expense trend
  const recentExpenses = recentTransactions
    .filter((t) => t.type === "expense")
    .slice(0, 5);

  const totalRecentExpenses = recentExpenses.reduce(
    (sum, t) => sum + t.amount,
    0,
  );

  // Different nudge scenarios
  const getNudge = () => {
    // High spending alert
    if (totalRecentExpenses > user.currentBalance * 0.5) {
      return {
        type: "warning",
        icon: <AlertTriangleIcon className="size-5" />,
        emoji: "🚨",
        message: "Whoa! You're spending fast!",
        tip: "Try to slow down on expenses to keep your balance healthy.",
        color: "from-red-100 to-orange-100 dark:from-red-950 dark:to-orange-950 border-red-200 dark:border-red-800",
      };
    }

    // Low balance
    if (user.currentBalance < 50 && user.currentBalance > 0) {
      return {
        type: "caution",
        icon: <ZapIcon className="size-5" />,
        emoji: "💡",
        message: "Balance getting low!",
        tip: "Time to add some income or cut back on spending.",
        color: "from-yellow-100 to-amber-100 dark:from-yellow-950 dark:to-amber-950 border-yellow-200 dark:border-yellow-800",
      };
    }

    // Negative balance
    if (user.currentBalance < 0) {
      return {
        type: "alert",
        icon: <AlertTriangleIcon className="size-5" />,
        emoji: "⚠️",
        message: "You're in the red!",
        tip: "Add some income to get back to positive territory!",
        color: "from-red-100 to-pink-100 dark:from-red-950 dark:to-pink-950 border-red-200 dark:border-red-800",
      };
    }

    // Great streak
    if (stats.currentStreak >= 7) {
      return {
        type: "celebration",
        icon: <SparklesIcon className="size-5" />,
        emoji: "🔥",
        message: `${stats.currentStreak}-day streak! You're on fire!`,
        tip: "Keep the momentum going! Daily tracking builds great habits.",
        color: "from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800",
      };
    }

    // Good balance
    if (user.currentBalance > 100) {
      return {
        type: "positive",
        icon: <TrendingUpIcon className="size-5" />,
        emoji: "💪",
        message: "Nice balance! Keep it up!",
        tip: "You're doing great! Consider setting a savings goal to level up.",
        color: "from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800",
      };
    }

    // No recent expenses
    if (recentExpenses.length === 0 && user.currentBalance > 0) {
      return {
        type: "positive",
        icon: <SparklesIcon className="size-5" />,
        emoji: "🌟",
        message: "Great saving streak!",
        tip: "You haven't spent recently - keep up the discipline!",
        color: "from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800",
      };
    }

    // Default motivational
    return {
      type: "motivation",
      icon: <SparklesIcon className="size-5" />,
      emoji: "🎯",
      message: "You're building great money habits!",
      tip: "Track every transaction to level up faster and unlock badges!",
      color: "from-purple-100 to-violet-100 dark:from-purple-950 dark:to-violet-950 border-purple-200 dark:border-purple-800",
    };
  };

  const nudge = getNudge();

  return (
    <Card
      className={`border-2 bg-gradient-to-r p-4 ${nudge.color}`}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl">{nudge.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {nudge.icon}
            <h3 className="font-bold text-foreground">{nudge.message}</h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{nudge.tip}</p>
        </div>
      </div>
    </Card>
  );
}
