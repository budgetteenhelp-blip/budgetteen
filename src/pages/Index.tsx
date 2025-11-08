import { useState } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import Dashboard from "./_components/dashboard.tsx";
import AddTransactionDialog from "./_components/add-transaction-dialog.tsx";
import TransactionList from "./_components/transaction-list.tsx";
import SpendingChart from "./_components/spending-chart.tsx";
import BalanceChart from "./_components/balance-chart.tsx";
import GoalsSection from "./_components/goals-section.tsx";
import LevelBadge from "./_components/level-badge.tsx";
import AchievementsSection from "./_components/achievements-section.tsx";
import FunNudge from "./_components/fun-nudge.tsx";
import ProfileAvatarButton from "@/components/profile-avatar-button.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { PlusIcon, BrainIcon, GraduationCapIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function IndexInner() {
  const user = useQuery(api.users.getCurrentUser);
  const quizResult = useQuery(api.quiz.getLatestQuizResult);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income");
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
      <div className="mx-auto max-w-4xl p-4 pb-24 md:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI" 
              alt="Budget Teen Logo" 
              className="size-12 md:size-14"
            />
            <div>
              <h1 className="text-2xl font-bold text-orange-900 dark:text-orange-100 md:text-3xl">
                Hey, {user.name?.split(" ")[0] || "there"}! 👋
              </h1>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Let's manage your money like a pro
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ProfileAvatarButton />
            <SignInButton variant="ghost" />
          </div>
        </div>

        <Dashboard user={user} />

        <div className="mt-6">
          <LevelBadge />
        </div>

        <div className="mt-6">
          <FunNudge user={user} />
        </div>

        <Card className="mt-6 border-2 border-blue-300 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:border-blue-700 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl">🎓</div>
                <div>
                  <CardTitle className="text-xl text-blue-900 dark:text-blue-100">
                    Learning Adventure Awaits!
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Master money skills through 8 interactive worlds filled with games and challenges
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-lg font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600"
              onClick={() => navigate("/learn")}
            >
              <GraduationCapIcon className="mr-2 size-5" />
              Start Learning Journey
            </Button>
          </CardContent>
        </Card>

        {!quizResult && (
          <Card className="mt-6 border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:border-purple-700 dark:from-purple-950/50 dark:to-pink-950/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🧠</div>
                  <div>
                    <CardTitle className="text-xl text-purple-900 dark:text-purple-100">
                      Discover Your Money Personality!
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Take our fun quiz to learn your financial style and get personalized tips
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-bold hover:from-purple-600 hover:to-pink-600"
                onClick={() => navigate("/quiz")}
              >
                <BrainIcon className="mr-2 size-5" />
                Take the Quiz (2 min)
              </Button>
            </CardContent>
          </Card>
        )}

        {quizResult && (
          <Card className="mt-6 border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:border-purple-700 dark:from-purple-950/50 dark:to-pink-950/50">
            <CardHeader>
              <CardTitle className="text-xl text-purple-900 dark:text-purple-100">
                Your Money Personality: {quizResult.personalityType}
              </CardTitle>
              <CardDescription>
                You scored {quizResult.score}/60 points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/quiz")}
              >
                <BrainIcon className="mr-2 size-4" />
                Retake Quiz
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button
            size="lg"
            className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-lg font-bold shadow-lg hover:from-green-600 hover:to-emerald-600"
            onClick={() => {
              setTransactionType("income");
              setShowAddDialog(true);
            }}
          >
            <PlusIcon className="mr-2 size-6" />
            Add Income 💵
          </Button>
          <Button
            size="lg"
            className="h-16 bg-gradient-to-r from-pink-500 to-rose-500 text-lg font-bold shadow-lg hover:from-pink-600 hover:to-rose-600"
            onClick={() => {
              setTransactionType("expense");
              setShowAddDialog(true);
            }}
          >
            <PlusIcon className="mr-2 size-6" />
            Add Expense 💸
          </Button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <BalanceChart />
          <SpendingChart />
        </div>

        <GoalsSection />

        <AchievementsSection />

        <TransactionList />

        <AddTransactionDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          type={transactionType}
        />
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 p-4 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="space-y-4">
              <img 
                src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI" 
                alt="Budget Teen Logo" 
                className="mx-auto size-32 md:size-40"
              />
              <h1 className="text-4xl font-bold text-orange-900 dark:text-orange-100">
                Budget Teen
              </h1>
              <p className="text-lg text-orange-700 dark:text-orange-300">
                Track your money, reach your goals, level up your savings! 🚀
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center gap-4 text-4xl">
                <span>🎮</span>
                <span>📊</span>
                <span>🎯</span>
                <span>🏆</span>
              </div>
              <SignInButton size="lg" className="w-full text-lg font-bold" />
            </div>
          </div>
        </div>
      </Unauthenticated>
      <AuthLoading>
        <div className="flex min-h-screen items-center justify-center">
          <Skeleton className="h-96 w-full max-w-4xl" />
        </div>
      </AuthLoading>
      <Authenticated>
        <IndexInner />
      </Authenticated>
    </>
  );
}
