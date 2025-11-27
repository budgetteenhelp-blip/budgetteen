import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";
import { 
  PlusIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  TrashIcon,
  ArrowLeftIcon,
  CalendarIcon,
  DollarSignIcon,
  TrendingUpIcon,
  BellIcon,
  BellOffIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Id } from "@/convex/_generated/dataModel.d.ts";

export default function BudgetsPage() {
  const navigate = useNavigate();
  const user = useQuery(api.users.getCurrentUser);
  const spendingOverview = useQuery(api.budgets.getSpendingOverview);
  const alerts = useQuery(api.budgets.getAlerts, { includeRead: false });
  const categories = useQuery(api.categories.getByType, { type: "expense" });
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");
  const [alertThreshold, setAlertThreshold] = useState("80");

  const setBudgetLimit = useMutation(api.budgets.setBudgetLimit);
  const deleteBudgetLimit = useMutation(api.budgets.deleteBudgetLimit);
  const toggleBudgetLimit = useMutation(api.budgets.toggleBudgetLimit);
  const markAlertAsRead = useMutation(api.budgets.markAlertAsRead);
  const markAllAlertsAsRead = useMutation(api.budgets.markAllAlertsAsRead);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !limitAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    const amount = parseFloat(limitAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const threshold = parseFloat(alertThreshold);
    if (isNaN(threshold) || threshold < 0 || threshold > 100) {
      toast.error("Alert threshold must be between 0 and 100");
      return;
    }

    try {
      await setBudgetLimit({
        category: selectedCategory,
        limitAmount: amount,
        period,
        alertThreshold: threshold,
      });
      toast.success("Budget limit set successfully!");
      setShowAddDialog(false);
      setSelectedCategory("");
      setLimitAmount("");
      setPeriod("monthly");
      setAlertThreshold("80");
    } catch (error) {
      toast.error("Failed to set budget limit");
    }
  };

  const handleDelete = async (limitId: Id<"budgetLimits">) => {
    try {
      await deleteBudgetLimit({ limitId });
      toast.success("Budget limit deleted");
    } catch (error) {
      toast.error("Failed to delete budget limit");
    }
  };

  const handleToggle = async (limitId: Id<"budgetLimits">) => {
    try {
      await toggleBudgetLimit({ limitId });
      toast.success("Budget limit updated");
    } catch (error) {
      toast.error("Failed to update budget limit");
    }
  };

  const handleDismissAlert = async (alertId: Id<"spendingAlerts">) => {
    try {
      await markAlertAsRead({ alertId });
    } catch (error) {
      toast.error("Failed to dismiss alert");
    }
  };

  const handleDismissAllAlerts = async () => {
    try {
      await markAllAlertsAsRead();
      toast.success("All alerts dismissed");
    } catch (error) {
      toast.error("Failed to dismiss alerts");
    }
  };

  const getSeverityColor = (status: "safe" | "warning" | "danger" | "exceeded") => {
    switch (status) {
      case "exceeded":
        return "bg-red-500";
      case "danger":
        return "bg-orange-500";
      case "warning":
        return "bg-yellow-500";
      case "safe":
        return "bg-green-500";
    }
  };

  const getSeverityBadge = (status: "safe" | "warning" | "danger" | "exceeded") => {
    switch (status) {
      case "exceeded":
        return <Badge variant="destructive" className="gap-1"><XCircleIcon className="size-3" />Over Budget</Badge>;
      case "danger":
        return <Badge variant="destructive" className="gap-1 bg-orange-600"><AlertTriangleIcon className="size-3" />High</Badge>;
      case "warning":
        return <Badge variant="secondary" className="gap-1 bg-yellow-600 text-white"><AlertTriangleIcon className="size-3" />Warning</Badge>;
      case "safe":
        return <Badge variant="secondary" className="gap-1 bg-green-600 text-white"><CheckCircleIcon className="size-3" />On Track</Badge>;
    }
  };

  if (!user || spendingOverview === undefined || alerts === undefined || categories === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 p-4">
        <div className="mx-auto max-w-4xl space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
      <div className="mx-auto max-w-4xl p-4 pb-24">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                Budget Limits
              </h1>
              <p className="mt-1 text-sm text-orange-700 dark:text-orange-300">
                Set spending limits and get alerts to stay on track
              </p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <PlusIcon className="size-4" />
                  Add Limit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set Budget Limit</DialogTitle>
                  <DialogDescription>
                    Choose a category and set a spending limit. You'll get alerts when you're close to the limit.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat._id} value={cat.name}>
                            {cat.emoji} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="period">Time Period</Label>
                    <Select value={period} onValueChange={(val) => setPeriod(val as "weekly" | "monthly")}>
                      <SelectTrigger id="period">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Limit Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="100.00"
                      value={limitAmount}
                      onChange={(e) => setLimitAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="threshold">Alert at (% of limit)</Label>
                    <Input
                      id="threshold"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="80"
                      value={alertThreshold}
                      onChange={(e) => setAlertThreshold(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      You'll get an alert when you reach this percentage
                    </p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Save Budget Limit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowAddDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <Card className="mb-6 border-2 border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-950/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellIcon className="size-5 text-orange-600 dark:text-orange-400" />
                  <CardTitle className="text-orange-900 dark:text-orange-100">
                    Spending Alerts
                  </CardTitle>
                  <Badge variant="secondary">{alerts.length}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismissAllAlerts}
                  className="text-xs"
                >
                  Dismiss All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert._id}
                  className="flex items-start gap-3 rounded-lg bg-white p-3 dark:bg-gray-900"
                >
                  <div className="mt-0.5">
                    {alert.severity === "exceeded" && (
                      <XCircleIcon className="size-5 text-red-500" />
                    )}
                    {alert.severity === "danger" && (
                      <AlertTriangleIcon className="size-5 text-orange-500" />
                    )}
                    {alert.severity === "warning" && (
                      <AlertTriangleIcon className="size-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(alert.createdAt).toLocaleDateString()} at{" "}
                      {new Date(alert.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismissAlert(alert._id)}
                  >
                    <XCircleIcon className="size-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Budget Overview */}
        {spendingOverview.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 text-6xl">💰</div>
              <h3 className="mb-2 text-xl font-semibold">No Budget Limits Set</h3>
              <p className="mb-4 text-center text-muted-foreground">
                Create your first budget limit to track your spending and get alerts when you're close to your limit.
              </p>
              <Button onClick={() => setShowAddDialog(true)} className="gap-2">
                <PlusIcon className="size-4" />
                Add Your First Budget
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {spendingOverview.map((item) => {
              const categoryData = categories.find((c) => c.name === item.category);
              return (
                <Card key={item.limitId}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{categoryData?.emoji || "💰"}</div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {item.category}
                            {getSeverityBadge(item.status)}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="size-3" />
                              {item.period === "weekly" ? "Weekly" : "Monthly"} budget
                            </span>
                            <span className="flex items-center gap-1">
                              <BellIcon className="size-3" />
                              Alert at {item.alertThreshold}%
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.limitId)}
                      >
                        <TrashIcon className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium">
                          ${item.spent.toFixed(2)} of ${item.limitAmount.toFixed(2)}
                        </span>
                        <span className={`font-bold ${
                          item.percentage >= 100 
                            ? "text-red-600" 
                            : item.percentage >= item.alertThreshold 
                              ? "text-orange-600" 
                              : "text-green-600"
                        }`}>
                          {item.percentage.toFixed(0)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(item.percentage, 100)} 
                        className="h-3"
                        indicatorClassName={getSeverityColor(item.status)}
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Remaining</p>
                        <p className="text-lg font-bold">
                          ${item.remaining.toFixed(2)}
                        </p>
                      </div>
                      {item.percentage >= 100 && (
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Over by</p>
                          <p className="text-lg font-bold text-red-600">
                            ${(item.spent - item.limitAmount).toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Tips Section */}
        <Card className="mt-6 border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 dark:border-blue-700 dark:from-blue-950/50 dark:to-indigo-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <TrendingUpIcon className="size-5" />
              Budget Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>💡 Set realistic limits based on your past spending patterns</p>
            <p>🎯 Start with your biggest expense categories first</p>
            <p>📊 Review and adjust your budgets monthly as your habits change</p>
            <p>⚡ Act quickly when you get an alert to avoid overspending</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
