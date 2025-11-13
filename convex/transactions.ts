import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { internal } from "./_generated/api.js";

export const add = mutation({
  args: {
    type: v.union(v.literal("income"), v.literal("expense")),
    amount: v.number(),
    category: v.string(),
    emoji: v.string(),
    description: v.string(),
  },
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

    // Create transaction
    const transactionId = await ctx.db.insert("transactions", {
      userId: user._id,
      type: args.type,
      amount: args.amount,
      category: args.category,
      emoji: args.emoji,
      description: args.description,
      date: Date.now(),
    });

    // Update user balance
    const balanceChange =
      args.type === "income" ? args.amount : -args.amount;
    await ctx.db.patch(user._id, {
      currentBalance: user.currentBalance + balanceChange,
      totalIncome:
        args.type === "income"
          ? user.totalIncome + args.amount
          : user.totalIncome,
      totalExpenses:
        args.type === "expense"
          ? user.totalExpenses + args.amount
          : user.totalExpenses,
    });

    // Award XP and update streak
    await ctx.scheduler.runAfter(0, internal.gamification.awardXP, {
      userId: user._id,
      amount: 10,
      reason: "transaction",
    });

    await ctx.scheduler.runAfter(0, internal.gamification.updateStreak, {
      userId: user._id,
    });

    await ctx.scheduler.runAfter(0, internal.gamification.checkAndAwardAchievements, {
      userId: user._id,
    });

    // Check budget limits if this is an expense
    if (args.type === "expense") {
      await ctx.scheduler.runAfter(0, internal.budgets.checkBudgetAndCreateAlert, {
        userId: user._id,
        category: args.category,
      });
    }

    return transactionId;
  },
});

export const getRecent = query({
  args: { limit: v.optional(v.number()) },
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

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit ?? 50);

    return transactions;
  },
});

export const deleteTransaction = mutation({
  args: { id: v.id("transactions") },
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

    const transaction = await ctx.db.get(args.id);
    if (!transaction || transaction.userId !== user._id) {
      throw new ConvexError({
        message: "Transaction not found",
        code: "NOT_FOUND",
      });
    }

    // Update user balance
    const balanceChange =
      transaction.type === "income"
        ? -transaction.amount
        : transaction.amount;
    await ctx.db.patch(user._id, {
      currentBalance: user.currentBalance + balanceChange,
      totalIncome:
        transaction.type === "income"
          ? user.totalIncome - transaction.amount
          : user.totalIncome,
      totalExpenses:
        transaction.type === "expense"
          ? user.totalExpenses - transaction.amount
          : user.totalExpenses,
    });

    await ctx.db.delete(args.id);
  },
});
