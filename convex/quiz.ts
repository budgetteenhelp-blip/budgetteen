import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const saveQuizResult = mutation({
  args: {
    personalityType: v.string(),
    score: v.number(),
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

    await ctx.db.insert("quizResults", {
      userId: user._id,
      personalityType: args.personalityType,
      score: args.score,
      completedAt: Date.now(),
    });

    return { success: true };
  },
});

export const getLatestQuizResult = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      return null;
    }

    const results = await ctx.db
      .query("quizResults")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(1);

    return results[0] || null;
  },
});
