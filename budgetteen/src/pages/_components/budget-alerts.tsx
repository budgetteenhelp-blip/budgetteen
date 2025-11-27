import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { 
  BellIcon, 
  XCircleIcon, 
  AlertTriangleIcon,
  TrendingUpIcon,
  ArrowRightIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Id } from "@/convex/_generated/dataModel.d.ts";

export default function BudgetAlerts() {
  const navigate = useNavigate();
  const alerts = useQuery(api.budgets.getAlerts, { includeRead: false });
  const spendingOverview = useQuery(api.budgets.getSpendingOverview);
  const markAlertAsRead = useMutation(api.budgets.markAlertAsRead);

  const handleDismissAlert = async (alertId: Id<"spendingAlerts">) => {
    try {
      await markAlertAsRead({ alertId });
    } catch (error) {
      toast.error("Failed to dismiss alert");
    }
  };

  if (!alerts || alerts.length === 0) {
    return null;
  }

  // Show only the most recent alert
  const latestAlert = alerts[0];

  return (
    <Card className="border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 dark:border-orange-700 dark:from-orange-950/50 dark:to-amber-950/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellIcon className="size-5 text-orange-600 dark:text-orange-400" />
            <CardTitle className="text-orange-900 dark:text-orange-100">
              Budget Alert
            </CardTitle>
            {alerts.length > 1 && (
              <Badge variant="secondary">+{alerts.length - 1} more</Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDismissAlert(latestAlert._id)}
          >
            <XCircleIcon className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3 rounded-lg bg-white p-3 dark:bg-gray-900">
          <div className="mt-0.5">
            {latestAlert.severity === "exceeded" && (
              <XCircleIcon className="size-5 text-red-500" />
            )}
            {(latestAlert.severity === "danger" || latestAlert.severity === "warning") && (
              <AlertTriangleIcon className="size-5 text-orange-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{latestAlert.message}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Just now
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={() => navigate("/budgets")}
        >
          <TrendingUpIcon className="size-4" />
          View All Budgets
          <ArrowRightIcon className="ml-auto size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
