import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import type { Id } from "./_generated/dataModel.d.ts";

// Badge definitions
export const BADGES = {
  FIRST_TRANSACTION: {
    id: "FIRST_TRANSACTION",
    name: "Getting Started",
    emoji: "🌟",
    description: "Added your first transaction",
  },
  FIRST_GOAL: {
    id: "FIRST_GOAL",
    name: "Goal Setter",
    emoji: "🎯",
    description: "Created your first savings goal",
  },
  GOAL_ACHIEVED: {
    id: "GOAL_ACHIEVED",
    name: "Goal Crusher",
    emoji: "🏆",
    description: "Completed your first goal",
  },
  STREAK_3: {
    id: "STREAK_3",
    name: "On Fire",
    emoji: "🔥",
    description: "3-day tracking streak",
  },
  STREAK_7: {
    id: "STREAK_7",
    name: "Week Warrior",
    emoji: "⚡",
    description: "7-day tracking streak",
  },
  STREAK_30: {
    id: "STREAK_30",
    name: "Legend",
    emoji: "👑",
    description: "30-day tracking streak",
  },
  SAVER_100: {
    id: "SAVER_100",
    name: "Century Saver",
    emoji: "💯",
    description: "Saved $100",
  },
  SAVER_500: {
    id: "SAVER_500",
    name: "Big Saver",
    emoji: "💰",
    description: "Saved $500",
  },
  SAVER_1000: {
    id: "SAVER_1000",
    name: "Grand Saver",
    emoji: "🌈",
    description: "Saved $1000",
  },
  LEVEL_5: {
    id: "LEVEL_5",
    name: "Rising Star",
    emoji: "⭐",
    description: "Reached level 5",
  },
  LEVEL_10: {
    id: "LEVEL_10",
    name: "Money Master",
    emoji: "🎓",
    description: "Reached level 10",
  },
  TRANSACTIONS_50: {
    id: "TRANSACTIONS_50",
    name: "Super Tracker",
    emoji: "📊",
    description: "Logged 50 transactions",
  },
};

// XP rewards for different actions
const XP_REWARDS = {
  TRANSACTION: 10,
  GOAL_CREATED: 25,
  GOAL_COMPLETED: 100,
  GOAL_PROGRESS: 5,
  DAILY_ACTIVITY: 15,
};

// XP needed per level (exponential growth)
function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export const getUserStats = query({
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

    const level = user.level ?? 1;
    const xp = user.xp ?? 0;
    const currentStreak = user.currentStreak ?? 0;
    const longestStreak = user.longestStreak ?? 0;

    const xpForNextLevel = xpForLevel(level + 1);
    const xpProgress = (xp / xpForNextLevel) * 100;

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const goals = await ctx.db
      .query("goals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const completedGoals = goals.filter((g) => g.isCompleted).length;

    return {
      level,
      xp,
      xpForNextLevel,
      xpProgress,
      currentStreak,
      longestStreak,
      totalTransactions: transactions.length,
      totalGoals: goals.length,
      completedGoals,
    };
  },
});

export const getUserAchievements = query({
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

    const achievements = await ctx.db
      .query("achievements")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    return achievements.map((a) => ({
      ...a,
      badge: BADGES[a.badgeId as keyof typeof BADGES],
    }));
  },
});

export const awardXP = internalMutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }

    const currentLevel = user.level ?? 1;
    let newXP = (user.xp ?? 0) + args.amount;
    let newLevel = currentLevel;

    // Check for level ups
    while (newXP >= xpForLevel(newLevel + 1)) {
      newXP -= xpForLevel(newLevel + 1);
      newLevel++;
    }

    await ctx.db.patch(args.userId, {
      xp: newXP,
      level: newLevel,
    });

    return { leveledUp: newLevel > currentLevel, newLevel };
  },
});

export const unlockAchievement = internalMutation({
  args: {
    userId: v.id("users"),
    badgeId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if already unlocked
    const existing = await ctx.db
      .query("achievements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    if (existing.some((a) => a.badgeId === args.badgeId)) {
      return { alreadyUnlocked: true };
    }

    await ctx.db.insert("achievements", {
      userId: args.userId,
      badgeId: args.badgeId,
      unlockedAt: Date.now(),
    });

    return { alreadyUnlocked: false };
  },
});

export const checkAndAwardAchievements = internalMutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return;

    const currentStreak = user.currentStreak ?? 0;
    const level = user.level ?? 1;

    const newBadges: Array<string> = [];

    // Get existing achievements
    const achievements = await ctx.db
      .query("achievements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const unlockedBadgeIds = new Set(achievements.map((a) => a.badgeId));

    // Check transaction count
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    if (
      transactions.length >= 1 &&
      !unlockedBadgeIds.has(BADGES.FIRST_TRANSACTION.id)
    ) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.FIRST_TRANSACTION.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.FIRST_TRANSACTION.id);
    }

    if (
      transactions.length >= 50 &&
      !unlockedBadgeIds.has(BADGES.TRANSACTIONS_50.id)
    ) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.TRANSACTIONS_50.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.TRANSACTIONS_50.id);
    }

    // Check goals
    const goals = await ctx.db
      .query("goals")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    if (goals.length >= 1 && !unlockedBadgeIds.has(BADGES.FIRST_GOAL.id)) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.FIRST_GOAL.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.FIRST_GOAL.id);
    }

    const completedGoals = goals.filter((g) => g.isCompleted);
    if (
      completedGoals.length >= 1 &&
      !unlockedBadgeIds.has(BADGES.GOAL_ACHIEVED.id)
    ) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.GOAL_ACHIEVED.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.GOAL_ACHIEVED.id);
    }

    // Check streaks
    if (currentStreak >= 3 && !unlockedBadgeIds.has(BADGES.STREAK_3.id)) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.STREAK_3.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.STREAK_3.id);
    }

    if (currentStreak >= 7 && !unlockedBadgeIds.has(BADGES.STREAK_7.id)) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.STREAK_7.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.STREAK_7.id);
    }

    if (
      currentStreak >= 30 &&
      !unlockedBadgeIds.has(BADGES.STREAK_30.id)
    ) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.STREAK_30.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.STREAK_30.id);
    }

    // Check balance milestones
    if (
      user.currentBalance >= 100 &&
      !unlockedBadgeIds.has(BADGES.SAVER_100.id)
    ) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.SAVER_100.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.SAVER_100.id);
    }

    if (
      user.currentBalance >= 500 &&
      !unlockedBadgeIds.has(BADGES.SAVER_500.id)
    ) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.SAVER_500.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.SAVER_500.id);
    }

    if (
      user.currentBalance >= 1000 &&
      !unlockedBadgeIds.has(BADGES.SAVER_1000.id)
    ) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.SAVER_1000.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.SAVER_1000.id);
    }

    // Check level milestones
    if (level >= 5 && !unlockedBadgeIds.has(BADGES.LEVEL_5.id)) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.LEVEL_5.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.LEVEL_5.id);
    }

    if (level >= 10 && !unlockedBadgeIds.has(BADGES.LEVEL_10.id)) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        badgeId: BADGES.LEVEL_10.id,
        unlockedAt: Date.now(),
      });
      newBadges.push(BADGES.LEVEL_10.id);
    }

    return newBadges;
  },
});

export const updateStreak = internalMutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    const lastActivity = user.lastActivityDate;

    if (!lastActivity) {
      // First activity ever
      await ctx.db.patch(args.userId, {
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: todayTimestamp,
      });
      return;
    }

    const lastActivityDate = new Date(lastActivity);
    lastActivityDate.setHours(0, 0, 0, 0);
    const lastActivityTimestamp = lastActivityDate.getTime();

    if (lastActivityTimestamp === todayTimestamp) {
      // Already logged activity today
      return;
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayTimestamp = yesterday.getTime();

    let newStreak = user.currentStreak ?? 0;

    if (lastActivityTimestamp === yesterdayTimestamp) {
      // Continuing streak
      newStreak = (user.currentStreak ?? 0) + 1;
    } else {
      // Streak broken
      newStreak = 1;
    }

    await ctx.db.patch(args.userId, {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, user.longestStreak ?? 0),
      lastActivityDate: todayTimestamp,
    });
  },
});
