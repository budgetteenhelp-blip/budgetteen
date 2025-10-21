import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { DownloadIcon, FileSpreadsheetIcon, TargetIcon, BarChartIcon } from "lucide-react";
import { toast } from "sonner";

interface ExportDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ExportDataDialog({
  open,
  onOpenChange,
}: ExportDataDialogProps) {
  const transactions = useQuery(api.export.getTransactionsForExport);
  const goals = useQuery(api.export.getGoalsForExport);
  const summary = useQuery(api.export.getUserSummaryForExport);
  const [isExporting, setIsExporting] = useState(false);

  const convertToCSV = (data: Array<Record<string, unknown>>, headers: Array<string>) => {
    if (data.length === 0) return "";

    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.join(","));

    // Add data rows
    for (const row of data) {
      const values = headers.map((header) => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma
        const stringValue = String(value ?? "");
        if (stringValue.includes(",") || stringValue.includes('"')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportTransactions = () => {
    if (!transactions || transactions.length === 0) {
      toast.error("No transactions to export");
      return;
    }

    setIsExporting(true);
    try {
      const headers = ["date", "type", "category", "description", "amount", "emoji"];
      const csv = convertToCSV(transactions, headers);
      const filename = `budget-teen-transactions-${new Date().toISOString().split("T")[0]}.csv`;
      downloadCSV(csv, filename);
      toast.success("Transactions exported! 📊");
    } catch (error) {
      toast.error("Failed to export transactions");
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportGoals = () => {
    if (!goals || goals.length === 0) {
      toast.error("No goals to export");
      return;
    }

    setIsExporting(true);
    try {
      const headers = ["title", "emoji", "targetAmount", "currentAmount", "progress", "isCompleted", "deadline"];
      const csv = convertToCSV(goals, headers);
      const filename = `budget-teen-goals-${new Date().toISOString().split("T")[0]}.csv`;
      downloadCSV(csv, filename);
      toast.success("Goals exported! 🎯");
    } catch (error) {
      toast.error("Failed to export goals");
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAll = () => {
    if (!transactions || !goals || !summary) {
      toast.error("Data not ready for export");
      return;
    }

    setIsExporting(true);
    try {
      // Create a comprehensive export with summary, transactions, and goals
      let content = "BUDGET TEEN - COMPLETE DATA EXPORT\n";
      content += `Export Date: ${summary.exportDate}\n\n`;

      // Summary section
      content += "=== USER SUMMARY ===\n";
      content += `Name: ${summary.name}\n`;
      content += `Current Balance: $${summary.currentBalance.toFixed(2)}\n`;
      content += `Total Income: $${summary.totalIncome.toFixed(2)}\n`;
      content += `Total Expenses: $${summary.totalExpenses.toFixed(2)}\n`;
      content += `Level: ${summary.level} (${summary.xp} XP)\n`;
      content += `Current Streak: ${summary.currentStreak} days\n`;
      content += `Longest Streak: ${summary.longestStreak} days\n`;
      content += `Achievements Unlocked: ${summary.achievementsUnlocked}\n\n`;

      // Transactions section
      content += "=== TRANSACTIONS ===\n";
      if (transactions.length > 0) {
        const transHeaders = ["date", "type", "category", "description", "amount", "emoji"];
        content += convertToCSV(transactions, transHeaders);
      } else {
        content += "No transactions recorded\n";
      }
      content += "\n\n";

      // Goals section
      content += "=== SAVINGS GOALS ===\n";
      if (goals.length > 0) {
        const goalsHeaders = ["title", "emoji", "targetAmount", "currentAmount", "progress", "isCompleted", "deadline"];
        content += convertToCSV(goals, goalsHeaders);
      } else {
        content += "No goals created\n";
      }

      const filename = `budget-teen-complete-export-${new Date().toISOString().split("T")[0]}.csv`;
      downloadCSV(content, filename);
      toast.success("Complete data exported! 🎉");
    } catch (error) {
      toast.error("Failed to export data");
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const isReady = transactions !== undefined && goals !== undefined && summary !== undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Export Your Data 📊</DialogTitle>
          <DialogDescription>
            Download your transactions, goals, and stats in CSV format for analysis or backup
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Button
            onClick={exportTransactions}
            disabled={!isReady || isExporting || (transactions?.length ?? 0) === 0}
            className="w-full justify-start"
            variant="outline"
          >
            <FileSpreadsheetIcon className="mr-2 size-5" />
            <div className="flex flex-1 items-center justify-between">
              <span>Export Transactions</span>
              <span className="text-xs text-muted-foreground">
                {transactions?.length ?? 0} items
              </span>
            </div>
          </Button>

          <Button
            onClick={exportGoals}
            disabled={!isReady || isExporting || (goals?.length ?? 0) === 0}
            className="w-full justify-start"
            variant="outline"
          >
            <TargetIcon className="mr-2 size-5" />
            <div className="flex flex-1 items-center justify-between">
              <span>Export Goals</span>
              <span className="text-xs text-muted-foreground">
                {goals?.length ?? 0} items
              </span>
            </div>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            onClick={exportAll}
            disabled={!isReady || isExporting}
            className="w-full bg-gradient-to-r from-purple-500 to-violet-500 font-bold hover:from-purple-600 hover:to-violet-600"
          >
            <DownloadIcon className="mr-2 size-5" />
            Export Complete Data
          </Button>

          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-start gap-2">
              <BarChartIcon className="mt-0.5 size-4 text-muted-foreground" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground">CSV Format</p>
                <p className="mt-1">
                  Files can be opened in Excel, Google Sheets, or any spreadsheet app for further analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
