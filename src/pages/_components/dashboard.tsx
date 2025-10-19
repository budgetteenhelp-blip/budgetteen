import type { Doc } from "@/convex/_generated/dataModel.d.ts";
import { Card } from "@/components/ui/card.tsx";
import { TrendingUpIcon, TrendingDownIcon, WalletIcon } from "lucide-react";

interface DashboardProps {
  user: Doc<"users">;
}

export default function Dashboard({ user }: DashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-100 to-amber-100 p-6 shadow-xl dark:border-orange-800 dark:from-orange-900 dark:to-amber-900">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Current Balance
            </p>
            <p className="mt-2 text-3xl font-bold text-orange-900 dark:text-orange-100">
              {formatCurrency(user.currentBalance)}
            </p>
          </div>
          <div className="rounded-full bg-orange-200 p-3 dark:bg-orange-800">
            <WalletIcon className="size-6 text-orange-700 dark:text-orange-300" />
          </div>
        </div>
      </Card>

      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-6 shadow-xl dark:border-green-800 dark:from-green-900 dark:to-emerald-900">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              Total Income
            </p>
            <p className="mt-2 text-3xl font-bold text-green-900 dark:text-green-100">
              {formatCurrency(user.totalIncome)}
            </p>
          </div>
          <div className="rounded-full bg-green-200 p-3 dark:bg-green-800">
            <TrendingUpIcon className="size-6 text-green-700 dark:text-green-300" />
          </div>
        </div>
      </Card>

      <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-100 to-rose-100 p-6 shadow-xl dark:border-pink-800 dark:from-pink-900 dark:to-rose-900">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-pink-700 dark:text-pink-300">
              Total Expenses
            </p>
            <p className="mt-2 text-3xl font-bold text-pink-900 dark:text-pink-100">
              {formatCurrency(user.totalExpenses)}
            </p>
          </div>
          <div className="rounded-full bg-pink-200 p-3 dark:bg-pink-800">
            <TrendingDownIcon className="size-6 text-pink-700 dark:text-pink-300" />
          </div>
        </div>
      </Card>
    </div>
  );
}
