import { v } from "convex/values";
import { query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const getSpendingByCategory = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not logged in",
        code: "UNAUTHENTICATED",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      throw new ConvexError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }

    const expenses = await ctx.db
      .query("transactions")
      .withIndex("by_user_and_type", (q) =>
        q.eq("userId", user._id).eq("type", "expense"),
      )
      .collect();

    // Group by category
    const categoryTotals: Record<string, { amount: number; emoji: string; category: string }> = {};

    for (const expense of expenses) {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = {
          amount: 0,
          emoji: expense.emoji,
          category: expense.category,
        };
      }
      categoryTotals[expense.category].amount += expense.amount;
    }

    return Object.values(categoryTotals).sort((a, b) => b.amount - a.amount);
  },
});

export const getBalanceHistory = query({
  args: { days: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not logged in",
        code: "UNAUTHENTICATED",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      throw new ConvexError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }

    const daysToFetch = args.days ?? 30;
    const cutoffDate = Date.now() - daysToFetch * 24 * 60 * 60 * 1000;

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).gte("date", cutoffDate),
      )
      .order("asc")
      .collect();

    // Calculate running balance
    const history: Array<{ date: number; balance: number; dateLabel: string }> = [];
    let runningBalance = 0;

    // Calculate starting balance by subtracting all transactions from current balance
    const allTransactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    for (const t of allTransactions) {
      if (t.date < cutoffDate) {
        runningBalance += t.type === "income" ? t.amount : -t.amount;
      }
    }

    // Add initial point
    if (transactions.length > 0) {
      history.push({
        date: cutoffDate,
        balance: runningBalance,
        dateLabel: new Date(cutoffDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      });
    }

    // Build history
    for (const transaction of transactions) {
      runningBalance += transaction.type === "income" ? transaction.amount : -transaction.amount;
      history.push({
        date: transaction.date,
        balance: runningBalance,
        dateLabel: new Date(transaction.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      });
    }

    // Add current point
    if (history.length > 0 && history[history.length - 1].date < Date.now() - 24 * 60 * 60 * 1000) {
      history.push({
        date: Date.now(),
        balance: user.currentBalance,
        dateLabel: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      });
    }

    return history;
  },
});
