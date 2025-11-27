import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const getByType = query({
  args: { type: v.union(v.literal("income"), v.literal("expense")) },
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

    const categories = await ctx.db
      .query("categories")
      .withIndex("by_user_and_type", (q) =>
        q.eq("userId", user._id).eq("type", args.type),
      )
      .collect();

    return categories;
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    emoji: v.string(),
    type: v.union(v.literal("income"), v.literal("expense")),
    color: v.string(),
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

    // Check if category name already exists for this user and type
    const existing = await ctx.db
      .query("categories")
      .withIndex("by_user_and_type", (q) =>
        q.eq("userId", user._id).eq("type", args.type),
      )
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existing) {
      throw new ConvexError({
        message: "A category with this name already exists",
        code: "CONFLICT",
      });
    }

    return await ctx.db.insert("categories", {
      userId: user._id,
      name: args.name,
      emoji: args.emoji,
      type: args.type,
      color: args.color,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("categories"),
    name: v.string(),
    emoji: v.string(),
    color: v.string(),
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

    const category = await ctx.db.get(args.id);
    if (!category || category.userId !== user._id) {
      throw new ConvexError({
        message: "Category not found",
        code: "NOT_FOUND",
      });
    }

    // Check if new name conflicts with another category
    const existing = await ctx.db
      .query("categories")
      .withIndex("by_user_and_type", (q) =>
        q.eq("userId", user._id).eq("type", category.type),
      )
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existing && existing._id !== args.id) {
      throw new ConvexError({
        message: "A category with this name already exists",
        code: "CONFLICT",
      });
    }

    await ctx.db.patch(args.id, {
      name: args.name,
      emoji: args.emoji,
      color: args.color,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("categories") },
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

    const category = await ctx.db.get(args.id);
    if (!category || category.userId !== user._id) {
      throw new ConvexError({
        message: "Category not found",
        code: "NOT_FOUND",
      });
    }

    // Check if category is being used in any transactions
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("category"), category.name))
      .first();

    if (transactions) {
      throw new ConvexError({
        message:
          "Cannot delete category that is being used in transactions. Please delete or reassign those transactions first.",
        code: "CONFLICT",
      });
    }

    // Check if category is being used in any budget limits
    const budgetLimit = await ctx.db
      .query("budgetLimits")
      .withIndex("by_user_and_category", (q) =>
        q.eq("userId", user._id).eq("category", category.name),
      )
      .first();

    if (budgetLimit) {
      throw new ConvexError({
        message:
          "Cannot delete category that has a budget limit. Please delete the budget limit first.",
        code: "CONFLICT",
      });
    }

    await ctx.db.delete(args.id);
  },
});

export const getAll = query({
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

    const categories = await ctx.db
      .query("categories")
      .withIndex("by_user_and_type", (q) => q.eq("userId", user._id))
      .collect();

    return categories;
  },
});
