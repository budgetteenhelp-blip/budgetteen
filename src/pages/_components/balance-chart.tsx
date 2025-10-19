import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty.tsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUpIcon } from "lucide-react";

export default function BalanceChart() {
  const data = useQuery(api.analytics.getBalanceHistory, { days: 30 });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (data === undefined) {
    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="size-5" />
            Balance Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="size-5" />
            Balance Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <TrendingUpIcon className="size-8" />
              </EmptyMedia>
              <EmptyTitle>No transaction history yet</EmptyTitle>
              <EmptyDescription>
                Add some transactions to see your balance trend over time
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  const minBalance = Math.min(...data.map((d) => d.balance));
  const maxBalance = Math.max(...data.map((d) => d.balance));
  const balanceRange = maxBalance - minBalance;
  const yAxisMin = Math.floor(minBalance - balanceRange * 0.1);
  const yAxisMax = Math.ceil(maxBalance + balanceRange * 0.1);

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUpIcon className="size-5" />
          Balance Over Time 📈
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="dateLabel"
              className="text-xs"
              tick={{ fill: "currentColor" }}
            />
            <YAxis
              domain={[yAxisMin, yAxisMax]}
              tick={{ fill: "currentColor" }}
              tickFormatter={formatCurrency}
              className="text-xs"
            />
            <Tooltip
              formatter={(value) => formatCurrency(value as number)}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: "#f97316", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 p-3 dark:from-orange-950 dark:to-amber-950">
          <div>
            <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Balance Trend
            </p>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              Last 30 days
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-orange-900 dark:text-orange-100">
              {data[data.length - 1].balance >= data[0].balance ? "📈" : "📉"}
            </p>
            <p className="text-xs font-medium text-orange-700 dark:text-orange-300">
              {data[data.length - 1].balance >= data[0].balance
                ? "Growing!"
                : "Decreasing"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
