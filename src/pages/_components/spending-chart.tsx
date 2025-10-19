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
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PieChartIcon } from "lucide-react";

const COLORS = [
  "#ef4444", // red
  "#ec4899", // pink
  "#a855f7", // purple
  "#06b6d4", // cyan
  "#f97316", // orange
  "#14b8a6", // teal
  "#f59e0b", // amber
  "#84cc16", // lime
];

export default function SpendingChart() {
  const data = useQuery(api.analytics.getSpendingByCategory);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  if (data === undefined) {
    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="size-5" />
            Spending Breakdown
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
            <PieChartIcon className="size-5" />
            Spending Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PieChartIcon className="size-8" />
              </EmptyMedia>
              <EmptyTitle>No expenses yet</EmptyTitle>
              <EmptyDescription>
                Start tracking your expenses to see your spending breakdown
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map((item, index) => ({
    name: `${item.emoji} ${item.category}`,
    value: item.amount,
    fill: COLORS[index % COLORS.length],
  }));

  const renderCustomLabel = (entry: { name: string; percent: number }) => {
    return `${(entry.percent * 100).toFixed(0)}%`;
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="size-5" />
          Spending Breakdown 🍕
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div
              key={item.category}
              className="flex items-center justify-between rounded-lg bg-muted p-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm font-medium">
                  {item.emoji} {item.category}
                </span>
              </div>
              <span className="text-sm font-bold">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
