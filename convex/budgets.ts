import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import type { Id } from "./_generated/dataModel.d.ts";

// Set or update a budget limit
export const setBudgetLimit = mutation({
  args: {
    category: v.string(),
    limitAmount: v.number(),
    period: v.union(v.literal("weekly"), v.literal("monthly")),
    alertThreshold: v.optional(v.number()),
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

    // Check if limit already exists for this category
    const existing = await ctx.db
      .query("budgetLimits")
      .withIndex("by_user_and_category", (q) =>
        q.eq("userId", user._id).eq("category", args.category),
      )
      .first();

    if (existing) {
      // Update existing limit
      await ctx.db.patch(existing._id, {
        limitAmount: args.limitAmount,
        period: args.period,
        alertThreshold: args.alertThreshold ?? 80,
        isActive: true,
      });
      return existing._id;
    } else {
      // Create new limit
      return await ctx.db.insert("budgetLimits", {
        userId: user._id,
        category: args.category,
        limitAmount: args.limitAmount,
        period: args.period,
        alertThreshold: args.alertThreshold ?? 80,
        isActive: true,
      });
    }
  },
});

// Get all budget limits for the current user
export const getBudgetLimits = query({
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

    const limits = await ctx.db
      .query("budgetLimits")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    return limits;
  },
});

// Get spending for a category in a given period
export const getCategorySpending = query({
  args: {
    category: v.string(),
    period: v.union(v.literal("weekly"), v.literal("monthly")),
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

    // Calculate start date based on period
    const now = Date.now();
    const startDate =
      args.period === "weekly"
        ? now - 7 * 24 * 60 * 60 * 1000
        : now - 30 * 24 * 60 * 60 * 1000;

    // Get all expenses in this category for the period
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) =>
        q.and(
          q.eq(q.field("type"), "expense"),
          q.eq(q.field("category"), args.category),
          q.gte(q.field("date"), startDate),
        ),
      )
      .collect();

    const totalSpent = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    return {
      totalSpent,
      transactionCount: transactions.length,
      startDate,
      endDate: now,
    };
  },
});

// Get all spending data with budget limits
export const getSpendingOverview = query({
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

    const limits = await ctx.db
      .query("budgetLimits")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const overview = await Promise.all(
      limits.map(async (limit) => {
        const now = Date.now();
        const startDate =
          limit.period === "weekly"
            ? now - 7 * 24 * 60 * 60 * 1000
            : now - 30 * 24 * 60 * 60 * 1000;

        const transactions = await ctx.db
          .query("transactions")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .filter((q) =>
            q.and(
              q.eq(q.field("type"), "expense"),
              q.eq(q.field("category"), limit.category),
              q.gte(q.field("date"), startDate),
            ),
          )
          .collect();

        const spent = transactions.reduce(
          (sum, transaction) => sum + transaction.amount,
          0,
        );
        const percentage = (spent / limit.limitAmount) * 100;

        return {
          limitId: limit._id,
          category: limit.category,
          limitAmount: limit.limitAmount,
          spent,
          remaining: Math.max(0, limit.limitAmount - spent),
          percentage,
          period: limit.period,
          alertThreshold: limit.alertThreshold,
          status:
            percentage >= 100
              ? ("exceeded" as const)
              : percentage >= limit.alertThreshold
                ? ("danger" as const)
                : percentage >= limit.alertThreshold * 0.75
                  ? ("warning" as const)
                  : ("safe" as const),
        };
      }),
    );

    return overview;
  },
});

// Toggle budget limit active status
export const toggleBudgetLimit = mutation({
  args: { limitId: v.id("budgetLimits") },
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

    const limit = await ctx.db.get(args.limitId);
    if (!limit || limit.userId !== user._id) {
      throw new ConvexError({
        message: "Budget limit not found",
        code: "NOT_FOUND",
      });
    }

    await ctx.db.patch(args.limitId, {
      isActive: !limit.isActive,
    });
  },
});

// Delete a budget limit
export const deleteBudgetLimit = mutation({
  args: { limitId: v.id("budgetLimits") },
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

    const limit = await ctx.db.get(args.limitId);
    if (!limit || limit.userId !== user._id) {
      throw new ConvexError({
        message: "Budget limit not found",
        code: "NOT_FOUND",
      });
    }

    await ctx.db.delete(args.limitId);
  },
});

// Get unread spending alerts
export const getAlerts = query({
  args: { includeRead: v.optional(v.boolean()) },
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

    let query = ctx.db
      .query("spendingAlerts")
      .withIndex("by_user", (q) => q.eq("userId", user._id));

    if (!args.includeRead) {
      query = query.filter((q) => q.eq(q.field("isRead"), false));
    }

    const alerts = await query.order("desc").take(50);

    return alerts;
  },
});

// Mark alert as read
export const markAlertAsRead = mutation({
  args: { alertId: v.id("spendingAlerts") },
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

    const alert = await ctx.db.get(args.alertId);
    if (!alert || alert.userId !== user._id) {
      throw new ConvexError({
        message: "Alert not found",
        code: "NOT_FOUND",
      });
    }

    await ctx.db.patch(args.alertId, { isRead: true });
  },
});

// Mark all alerts as read
export const markAllAlertsAsRead = mutation({
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

    const unreadAlerts = await ctx.db
      .query("spendingAlerts")
      .withIndex("by_user_and_read", (q) =>
        q.eq("userId", user._id).eq("isRead", false),
      )
      .collect();

    await Promise.all(
      unreadAlerts.map((alert) => ctx.db.patch(alert._id, { isRead: true })),
    );
  },
});

// Internal function to check and create alerts after a transaction
export const checkBudgetAndCreateAlert = internalMutation({
  args: {
    userId: v.id("users"),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    // Get active budget limit for this category
    const limit = await ctx.db
      .query("budgetLimits")
      .withIndex("by_user_and_category", (q) =>
        q.eq("userId", args.userId).eq("category", args.category),
      )
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();

    if (!limit) {
      return; // No budget limit set
    }

    // Calculate spending for the period
    const now = Date.now();
    const startDate =
      limit.period === "weekly"
        ? now - 7 * 24 * 60 * 60 * 1000
        : now - 30 * 24 * 60 * 60 * 1000;

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) =>
        q.and(
          q.eq(q.field("type"), "expense"),
          q.eq(q.field("category"), args.category),
          q.gte(q.field("date"), startDate),
        ),
      )
      .collect();

    const totalSpent = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );
    const percentage = (totalSpent / limit.limitAmount) * 100;

    // Determine if we should create an alert
    let severity: "warning" | "danger" | "exceeded" | null = null;
    let message = "";

    if (percentage >= 100) {
      severity = "exceeded";
      message = `You've exceeded your ${limit.period} budget for ${args.category}! You've spent $${totalSpent.toFixed(2)} of your $${limit.limitAmount.toFixed(2)} limit.`;
    } else if (percentage >= limit.alertThreshold) {
      severity = "danger";
      message = `You're at ${percentage.toFixed(0)}% of your ${limit.period} budget for ${args.category}. You've spent $${totalSpent.toFixed(2)} of your $${limit.limitAmount.toFixed(2)} limit.`;
    } else if (percentage >= limit.alertThreshold * 0.75) {
      severity = "warning";
      message = `Heads up! You've used ${percentage.toFixed(0)}% of your ${limit.period} budget for ${args.category}.`;
    }

    // Create alert if needed
    if (severity) {
      // Check if a similar recent alert exists (within last hour)
      const recentAlert = await ctx.db
        .query("spendingAlerts")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .filter((q) =>
          q.and(
            q.eq(q.field("category"), args.category),
            q.gte(q.field("createdAt"), now - 60 * 60 * 1000),
          ),
        )
        .first();

      // Only create if no recent alert exists
      if (!recentAlert) {
        await ctx.db.insert("spendingAlerts", {
          userId: args.userId,
          category: args.category,
          message,
          severity,
          spentAmount: totalSpent,
          limitAmount: limit.limitAmount,
          percentage,
          isRead: false,
          createdAt: now,
        });
      }
    }
  },
});
