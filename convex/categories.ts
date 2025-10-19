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

    return await ctx.db.insert("categories", {
      userId: user._id,
      name: args.name,
      emoji: args.emoji,
      type: args.type,
      color: args.color,
    });
  },
});
