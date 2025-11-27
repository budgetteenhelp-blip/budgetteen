import { useState, useEffect } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { Doc } from "@/convex/_generated/dataModel.d.ts";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { BottomTabBar } from "@/components/bottom-tab-bar.tsx";
import ProfileAvatarButton from "@/components/profile-avatar-button.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { PlusIcon, TrendingUpIcon, TrendingDownIcon, GraduationCapIcon, BrainIcon, TrophyIcon, FlameIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function IndexInner() {
  const user = useQuery(api.users.getCurrentUser);
  const recentTransactions = useQuery(api.transactions.getRecent, { limit: 5 });
  const gamification = useQuery(api.gamification.getUserStats);
  const quizResult = useQuery(api.quiz.getLatestQuizResult);
  const navigate = useNavigate();
  const recalculateLevel = useMutation(api.worlds.recalculateLevel);

  useEffect(() => {
    if (user) {
      recalculateLevel().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  if (!user || !gamification) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-2xl" />
      </div>
    );
  }

  const balance = user.currentBalance;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950">
      <div className="mx-auto max-w-2xl p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI" 
              alt="Budget Teen Logo" 
              className="size-12"
            />
            <div>
              <h1 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 md:text-2xl">
                Hey, {user.name?.split(" ")[0] || "there"}! 👋
              </h1>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          <ProfileAvatarButton />
        </div>

        {/* Level and Streak */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 dark:border-purple-700 dark:from-purple-950/50 dark:to-pink-950/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-purple-900 dark:text-purple-100">
                <span className="text-lg">Level {gamification.level}</span>
                <span className="text-2xl">⭐</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {gamification.xp.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">XP</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Keep learning & tracking to level up!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50 dark:border-orange-700 dark:from-orange-950/50 dark:to-yellow-950/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-orange-900 dark:text-orange-100">
                <span className="text-lg">{gamification.currentStreak} Day Streak</span>
                <FlameIcon className="size-6 fill-orange-500 text-orange-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                    {gamification.completedGoals}
                  </span>
                  <span className="text-sm text-muted-foreground">Goals Done</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Keep tracking daily to maintain your streak!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Your Money at a Glance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Current Balance</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  ${Math.abs(balance).toFixed(2)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${user.totalIncome.toFixed(2)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                  ${user.totalExpenses.toFixed(2)}
                </p>
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:from-blue-600 hover:to-purple-600"
              onClick={() => navigate("/money")}
            >
              View Full Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <Button
            size="lg"
            className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-lg font-bold shadow-lg hover:from-green-600 hover:to-emerald-600"
            onClick={() => navigate("/money?action=add-income")}
          >
            <PlusIcon className="mr-2 size-5" />
            Add Income 💵
          </Button>
          <Button
            size="lg"
            className="h-16 bg-gradient-to-r from-pink-500 to-rose-500 text-lg font-bold shadow-lg hover:from-pink-600 hover:to-rose-600"
            onClick={() => navigate("/money?action=add-expense")}
          >
            <PlusIcon className="mr-2 size-5" />
            Add Expense 💸
          </Button>
        </div>

        {/* Recent Transactions */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/money")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {!recentTransactions || recentTransactions.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No transactions yet. Add your first one above! 🚀
              </p>
            ) : (
              <div className="space-y-3">
                {recentTransactions.slice(0, 5).map((transaction: Doc<"transactions">) => (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full p-2 ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-rose-100 dark:bg-rose-900/30'}`}>
                        {transaction.type === 'income' ? (
                          <TrendingUpIcon className="size-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <TrendingDownIcon className="size-4 text-rose-600 dark:text-rose-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.category}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="space-y-3">
          <Card className="border-2 border-blue-300 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:border-blue-700 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                <GraduationCapIcon className="size-5" />
                Learning Adventure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">
                Master money skills through 8 interactive worlds filled with games and challenges
              </p>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
                onClick={() => navigate("/learn")}
              >
                Start Learning
              </Button>
            </CardContent>
          </Card>

          {!quizResult && (
            <Card className="border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:border-purple-700 dark:from-purple-950/50 dark:to-pink-950/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
                  <BrainIcon className="size-5" />
                  Money Personality Quiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">
                  Discover your financial style and get personalized tips
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold hover:from-purple-600 hover:to-pink-600"
                  onClick={() => navigate("/quiz")}
                >
                  Take Quiz (2 min)
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 dark:border-yellow-700 dark:from-yellow-950/50 dark:to-orange-950/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-yellow-900 dark:text-yellow-100">
                <TrophyIcon className="size-5" />
                Weekly Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">
                Complete challenges to earn bonus XP and unlock achievements
              </p>
              <Button
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 font-bold hover:from-yellow-600 hover:to-orange-600"
                onClick={() => navigate("/challenges")}
              >
                View Challenges
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}

function UnauthenticatedRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/landing");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-4">
          <img 
            src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI" 
            alt="Budget Teen Logo" 
            className="mx-auto size-32 md:size-40"
          />
          <p className="text-lg text-emerald-700 dark:text-emerald-300">
            Redirecting...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <>
      <Unauthenticated>
        <UnauthenticatedRedirect />
      </Unauthenticated>
      <AuthLoading>
        <div className="flex min-h-screen items-center justify-center">
          <Skeleton className="h-96 w-full max-w-2xl" />
        </div>
      </AuthLoading>
      <Authenticated>
        <IndexInner />
      </Authenticated>
    </>
  );
}
