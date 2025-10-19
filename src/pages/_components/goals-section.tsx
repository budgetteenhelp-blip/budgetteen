import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { TargetIcon, PlusIcon, Trash2Icon, TrendingUpIcon, MinusIcon } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import CreateGoalDialog from "./create-goal-dialog.tsx";

export default function GoalsSection() {
  const goals = useQuery(api.goals.getAll);
  const updateProgress = useMutation(api.goals.updateProgress);
  const deleteGoal = useMutation(api.goals.deleteGoal);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Id<"goals"> | null>(null);
  const [progressAmount, setProgressAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleUpdateProgress = async (goalId: Id<"goals">, amount: number) => {
    setIsSubmitting(true);
    try {
      await updateProgress({ goalId, amount });
      const messages = amount > 0 
        ? ["Great job! Keep saving! 💪", "You're getting closer! 🎯", "Nice progress! 🌟"]
        : ["Noted! Stay on track 📊"];
      toast.success(messages[Math.floor(Math.random() * messages.length)]);
      setShowProgressDialog(false);
      setProgressAmount("");
      setSelectedGoal(null);
    } catch (error) {
      toast.error("Failed to update progress");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (goalId: Id<"goals">) => {
    try {
      await deleteGoal({ goalId });
      toast.success("Goal deleted");
    } catch (error) {
      toast.error("Failed to delete goal");
      console.error(error);
    }
  };

  if (goals === undefined) {
    return (
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100">
            Savings Goals 🎯
          </h2>
        </div>
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100">
            Savings Goals 🎯
          </h2>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-gradient-to-r from-purple-500 to-violet-500 font-bold hover:from-purple-600 hover:to-violet-600"
          >
            <PlusIcon className="mr-2 size-4" />
            New Goal
          </Button>
        </div>
        <Card className="border-2 border-dashed p-8">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <TargetIcon className="size-12" />
              </EmptyMedia>
              <EmptyTitle>No savings goals yet</EmptyTitle>
              <EmptyDescription>
                Set a goal and watch your savings grow! Start with something
                fun like "New Phone" or "Concert Tickets"
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-gradient-to-r from-purple-500 to-violet-500 font-bold hover:from-purple-600 hover:to-violet-600"
              >
                <PlusIcon className="mr-2 size-4" />
                Create Your First Goal
              </Button>
            </EmptyContent>
          </Empty>
        </Card>
        <CreateGoalDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
        />
      </div>
    );
  }

  const activeGoals = goals.filter((g) => !g.isCompleted);
  const completedGoals = goals.filter((g) => g.isCompleted);
  const selectedGoalData = goals.find((g) => g._id === selectedGoal);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100">
          Savings Goals 🎯
        </h2>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-purple-500 to-violet-500 font-bold hover:from-purple-600 hover:to-violet-600"
        >
          <PlusIcon className="mr-2 size-4" />
          New Goal
        </Button>
      </div>

      {activeGoals.length > 0 && (
        <div className="space-y-3">
          {activeGoals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const remaining = goal.targetAmount - goal.currentAmount;

            return (
              <Card
                key={goal._id}
                className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 p-4 dark:border-purple-800 dark:from-purple-950 dark:to-violet-950"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-full bg-purple-200 text-2xl dark:bg-purple-900">
                        {goal.emoji}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(goal.currentAmount)} of{" "}
                          {formatCurrency(goal.targetAmount)}
                        </p>
                        {goal.deadline && (
                          <p className="text-xs text-muted-foreground">
                            Due {formatDistanceToNow(goal.deadline, { addSuffix: true })}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(goal._id)}
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-purple-700 dark:text-purple-400">
                        {progress.toFixed(0)}% Complete
                      </span>
                      <span className="font-bold text-purple-900 dark:text-purple-200">
                        {formatCurrency(remaining)} to go!
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 font-bold hover:from-green-600 hover:to-emerald-600"
                      onClick={() => {
                        setSelectedGoal(goal._id);
                        setShowProgressDialog(true);
                      }}
                    >
                      <TrendingUpIcon className="mr-2 size-4" />
                      Add Money
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 font-bold"
                      onClick={() => {
                        setSelectedGoal(goal._id);
                        setProgressAmount("-");
                        setShowProgressDialog(true);
                      }}
                    >
                      <MinusIcon className="mr-2 size-4" />
                      Withdraw
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {completedGoals.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-green-700 dark:text-green-400">
            🎉 Completed Goals
          </h3>
          {completedGoals.map((goal) => (
            <Card
              key={goal._id}
              className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 opacity-75 dark:border-green-800 dark:from-green-950 dark:to-emerald-950"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-green-200 text-2xl dark:bg-green-900">
                    {goal.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground line-through">
                      {goal.title}
                    </h3>
                    <p className="text-sm font-bold text-green-700 dark:text-green-400">
                      Goal Reached! {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(goal._id)}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateGoalDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />

      <Dialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Update Progress: {selectedGoalData?.emoji} {selectedGoalData?.title}
            </DialogTitle>
            <DialogDescription>
              Add or remove money from your goal
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!selectedGoal) return;
              const amount = parseFloat(progressAmount);
              if (isNaN(amount) || amount === 0) {
                toast.error("Please enter a valid amount");
                return;
              }
              handleUpdateProgress(selectedGoal, amount);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={progressAmount}
                onChange={(e) => setProgressAmount(e.target.value)}
                className="text-2xl font-bold"
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter a positive number to add money, or negative to withdraw
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowProgressDialog(false);
                  setProgressAmount("");
                  setSelectedGoal(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-500 to-violet-500 font-bold hover:from-purple-600 hover:to-violet-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Progress"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
