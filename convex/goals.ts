import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { internal } from "./_generated/api.js";

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

    const goals = await ctx.db
      .query("goals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return goals;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    targetAmount: v.number(),
    emoji: v.string(),
    deadline: v.optional(v.number()),
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

    const goalId = await ctx.db.insert("goals", {
      userId: user._id,
      title: args.title,
      targetAmount: args.targetAmount,
      currentAmount: 0,
      emoji: args.emoji,
      deadline: args.deadline,
      isCompleted: false,
    });

    // Award XP for creating a goal
    await ctx.scheduler.runAfter(0, internal.gamification.awardXP, {
      userId: user._id,
      amount: 25,
      reason: "goal_created",
    });

    await ctx.scheduler.runAfter(0, internal.gamification.checkAndAwardAchievements, {
      userId: user._id,
    });

    return goalId;
  },
});

export const updateProgress = mutation({
  args: {
    goalId: v.id("goals"),
    amount: v.number(),
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

    const goal = await ctx.db.get(args.goalId);
    if (!goal || goal.userId !== user._id) {
      throw new ConvexError({
        message: "Goal not found",
        code: "NOT_FOUND",
      });
    }

    const newAmount = Math.max(0, goal.currentAmount + args.amount);
    const isCompleted = newAmount >= goal.targetAmount;
    const wasCompleted = goal.isCompleted;

    await ctx.db.patch(args.goalId, {
      currentAmount: newAmount,
      isCompleted,
    });

    // Award XP for progress
    if (args.amount > 0) {
      await ctx.scheduler.runAfter(0, internal.gamification.awardXP, {
        userId: user._id,
        amount: 5,
        reason: "goal_progress",
      });
    }

    // Award bonus XP for completing goal
    if (isCompleted && !wasCompleted) {
      await ctx.scheduler.runAfter(0, internal.gamification.awardXP, {
        userId: user._id,
        amount: 100,
        reason: "goal_completed",
      });
    }

    await ctx.scheduler.runAfter(0, internal.gamification.checkAndAwardAchievements, {
      userId: user._id,
    });
  },
});

export const deleteGoal = mutation({
  args: { goalId: v.id("goals") },
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

    const goal = await ctx.db.get(args.goalId);
    if (!goal || goal.userId !== user._id) {
      throw new ConvexError({
        message: "Goal not found",
        code: "NOT_FOUND",
      });
    }

    await ctx.db.delete(args.goalId);
  },
});

export const update = mutation({
  args: {
    goalId: v.id("goals"),
    title: v.optional(v.string()),
    targetAmount: v.optional(v.number()),
    emoji: v.optional(v.string()),
    deadline: v.optional(v.union(v.number(), v.null())),
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

    const goal = await ctx.db.get(args.goalId);
    if (!goal || goal.userId !== user._id) {
      throw new ConvexError({
        message: "Goal not found",
        code: "NOT_FOUND",
      });
    }

    const updates: Record<string, unknown> = {};
    if (args.title !== undefined) updates.title = args.title;
    if (args.targetAmount !== undefined) updates.targetAmount = args.targetAmount;
    if (args.emoji !== undefined) updates.emoji = args.emoji;
    if (args.deadline !== undefined) updates.deadline = args.deadline;

    // Check if goal is completed after update
    const newTargetAmount = args.targetAmount ?? goal.targetAmount;
    if (goal.currentAmount >= newTargetAmount) {
      updates.isCompleted = true;
    }

    await ctx.db.patch(args.goalId, updates);
  },
});
