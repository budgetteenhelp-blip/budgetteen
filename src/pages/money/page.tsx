import { useState, useEffect } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { BottomTabBar } from "@/components/bottom-tab-bar.tsx";
import AddTransactionDialog from "../_components/add-transaction-dialog.tsx";
import TransactionList from "../_components/transaction-list.tsx";
import SpendingChart from "../_components/spending-chart.tsx";
import BalanceChart from "../_components/balance-chart.tsx";
import GoalsSection from "../_components/goals-section.tsx";
import BudgetAlerts from "../_components/budget-alerts.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { PlusIcon, TrendingUpIcon, WalletIcon, TargetIcon, AlertCircleIcon, TagIcon, DownloadIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function MoneyInner() {
  const user = useQuery(api.users.getCurrentUser);
  const [searchParams] = useSearchParams();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income");
  const [activeTab, setActiveTab] = useState("transactions");
  const navigate = useNavigate();

  // Handle quick add from home
  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "add-income") {
      setTransactionType("income");
      setShowAddDialog(true);
    } else if (action === "add-expense") {
      setTransactionType("expense");
      setShowAddDialog(true);
    }
  }, [searchParams]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950">
      <div className="mx-auto max-w-4xl p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-emerald-900 dark:text-emerald-100">
            💰 Money Manager
          </h1>
          <p className="text-emerald-700 dark:text-emerald-300">
            Track transactions, analyze spending, and reach your financial goals
          </p>
        </div>

        {/* Quick Add Buttons */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <Button
            size="lg"
            className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-lg font-bold shadow-lg hover:from-green-600 hover:to-emerald-600"
            onClick={() => {
              setTransactionType("income");
              setShowAddDialog(true);
            }}
          >
            <PlusIcon className="mr-2 size-5" />
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
            <PlusIcon className="mr-2 size-5" />
            Add Expense 💸
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="transactions" className="gap-1.5">
              <WalletIcon className="size-4" />
              <span className="hidden sm:inline">Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1.5">
              <TrendingUpIcon className="size-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="gap-1.5">
              <TargetIcon className="size-4" />
              <span className="hidden sm:inline">Goals</span>
            </TabsTrigger>
            <TabsTrigger value="budgets" className="gap-1.5">
              <AlertCircleIcon className="size-4" />
              <span className="hidden sm:inline">Budgets</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-1.5">
              <TagIcon className="size-4" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="gap-1.5">
              <DownloadIcon className="size-4" />
              <span className="hidden sm:inline">Export</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionList />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <BalanceChart />
              <SpendingChart />
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <GoalsSection />
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <BudgetAlerts />
            <Card>
              <CardHeader>
                <CardTitle>Budget Management</CardTitle>
                <CardDescription>
                  Set spending limits and track your budget across categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 font-bold hover:from-indigo-600 hover:to-violet-600"
                  onClick={() => navigate("/budgets")}
                >
                  Manage Budget Limits
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Categories</CardTitle>
                <CardDescription>
                  Create and manage your own transaction categories
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Organize your money by creating custom categories that match your lifestyle.
                  Add income sources like allowance, jobs, or gifts. Create expense categories
                  for shopping, entertainment, food, and more!
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 font-bold hover:from-purple-600 hover:to-fuchsia-600"
                  onClick={() => navigate("/categories")}
                >
                  Manage Categories
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Your Data</CardTitle>
                <CardDescription>
                  Download your financial data for backup or analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Export all your transactions, goals, and financial data as a JSON file.
                  Keep backups, share with parents, or analyze your spending patterns in other tools.
                </p>
                <ExportButton />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AddTransactionDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          type={transactionType}
        />
      </div>

      <BottomTabBar />
    </div>
  );
}

function ExportButton() {
  const transactions = useQuery(api.export.getTransactionsForExport);
  const goals = useQuery(api.export.getGoalsForExport);
  const summary = useQuery(api.export.getUserSummaryForExport);

  const handleExport = () => {
    if (!transactions || !goals || !summary) return;

    const exportData = {
      exportDate: new Date().toISOString(),
      summary,
      transactions,
      goals,
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `budget-teen-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isReady = transactions && goals && summary;

  return (
    <Button
      onClick={handleExport}
      disabled={!isReady}
      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 font-bold hover:from-blue-600 hover:to-cyan-600"
    >
      <DownloadIcon className="mr-2 size-4" />
      Download Data (JSON)
    </Button>
  );
}

export default function MoneyPage() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 p-4 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="text-6xl">💰</div>
            <h1 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
              Money Manager
            </h1>
            <p className="text-emerald-700 dark:text-emerald-300">
              Sign in to track your transactions and manage your money
            </p>
            <SignInButton size="lg" className="w-full text-lg font-bold" />
          </div>
        </div>
      </Unauthenticated>
      <AuthLoading>
        <div className="flex min-h-screen items-center justify-center">
          <Skeleton className="h-96 w-full max-w-4xl" />
        </div>
      </AuthLoading>
      <Authenticated>
        <MoneyInner />
      </Authenticated>
    </>
  );
}
