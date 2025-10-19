import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty.tsx";
import { Trash2Icon, TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function TransactionList() {
  const transactions = useQuery(api.transactions.getRecent, { limit: 20 });
  const deleteTransaction = useMutation(api.transactions.deleteTransaction);

  const handleDelete = async (id: Id<"transactions">) => {
    try {
      await deleteTransaction({ id });
      toast.success("Transaction deleted");
    } catch (error) {
      toast.error("Failed to delete transaction");
      console.error(error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (transactions === undefined) {
    return (
      <div className="mt-6 space-y-3">
        <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100">
          Recent Activity
        </h2>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="mb-4 text-2xl font-bold text-orange-900 dark:text-orange-100">
          Recent Activity
        </h2>
        <Card className="border-2 border-dashed p-8">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <div className="text-4xl">💸</div>
              </EmptyMedia>
              <EmptyTitle>No transactions yet</EmptyTitle>
              <EmptyDescription>
                Start tracking your money by adding your first income or expense!
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100">
        Recent Activity
      </h2>

      <div className="space-y-2">
        {transactions.map((transaction) => (
          <Card
            key={transaction._id}
            className={`border-2 p-4 transition-all hover:shadow-md ${
              transaction.type === "income"
                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                : "border-pink-200 bg-pink-50 dark:border-pink-800 dark:bg-pink-950"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-12 items-center justify-center rounded-full text-2xl ${
                    transaction.type === "income"
                      ? "bg-green-200 dark:bg-green-900"
                      : "bg-pink-200 dark:bg-pink-900"
                  }`}
                >
                  {transaction.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">
                      {transaction.category}
                    </p>
                    {transaction.type === "income" ? (
                      <TrendingUpIcon className="size-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingDownIcon className="size-4 text-pink-600 dark:text-pink-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {transaction.description}
                    </p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(transaction.date, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <p
                  className={`text-xl font-bold ${
                    transaction.type === "income"
                      ? "text-green-700 dark:text-green-400"
                      : "text-pink-700 dark:text-pink-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(transaction._id)}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
