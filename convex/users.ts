import { ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "User not logged in",
      });
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (user !== null) {
      return user._id;
    }
    // If it's a new identity, create a new User.
    const userId = await ctx.db.insert("users", {
      name: identity.name,
      email: identity.email,
      tokenIdentifier: identity.tokenIdentifier,
      currentBalance: 0,
      totalIncome: 0,
      totalExpenses: 0,
    });

    // Create default categories for new users
    const defaultIncomeCategories = [
      { name: "Allowance", emoji: "💵", color: "#10b981" },
      { name: "Part-time Job", emoji: "💼", color: "#3b82f6" },
      { name: "Gifts", emoji: "🎁", color: "#f59e0b" },
      { name: "Side Hustle", emoji: "🚀", color: "#8b5cf6" },
    ];

    const defaultExpenseCategories = [
      { name: "Food & Drinks", emoji: "🍕", color: "#ef4444" },
      { name: "Entertainment", emoji: "🎮", color: "#ec4899" },
      { name: "School Supplies", emoji: "📚", color: "#06b6d4" },
      { name: "Transportation", emoji: "🚗", color: "#f97316" },
      { name: "Subscriptions", emoji: "📱", color: "#a855f7" },
      { name: "Shopping", emoji: "🛍️", color: "#14b8a6" },
    ];

    for (const cat of defaultIncomeCategories) {
      await ctx.db.insert("categories", {
        userId,
        name: cat.name,
        emoji: cat.emoji,
        type: "income",
        color: cat.color,
      });
    }

    for (const cat of defaultExpenseCategories) {
      await ctx.db.insert("categories", {
        userId,
        name: cat.name,
        emoji: cat.emoji,
        type: "expense",
        color: cat.color,
      });
    }

    return userId;
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "Called getCurrentUser without authentication present",
      });
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    return user;
  },
});
