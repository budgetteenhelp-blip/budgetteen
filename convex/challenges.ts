import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import { internal } from "./_generated/api.js";
import type { Id } from "./_generated/dataModel.d.ts";

// Challenge definitions
export const CHALLENGE_DEFINITIONS = {
  // Weekly Challenges
  WEEKLY_TRACK_5: {
    id: "WEEKLY_TRACK_5",
    title: "Transaction Tracker",
    description: "Track 5 transactions this week",
    emoji: "📝",
    period: "weekly" as const,
    target: 5,
    xpReward: 50,
    type: "transactions" as const,
  },
  WEEKLY_SAVE_20: {
    id: "WEEKLY_SAVE_20",
    title: "Smart Saver",
    description: "Save $20 this week",
    emoji: "💰",
    period: "weekly" as const,
    target: 20,
    xpReward: 75,
    type: "savings" as const,
  },
  WEEKLY_BUDGET_2: {
    id: "WEEKLY_BUDGET_2",
    title: "Budget Boss",
    description: "Stay under budget in 2 categories",
    emoji: "🎯",
    period: "weekly" as const,
    target: 2,
    xpReward: 60,
    type: "budget" as const,
  },
  WEEKLY_LEARN_3: {
    id: "WEEKLY_LEARN_3",
    title: "Learning Streak",
    description: "Complete 3 lessons this week",
    emoji: "📚",
    period: "weekly" as const,
    target: 3,
    xpReward: 80,
    type: "lessons" as const,
  },
  WEEKLY_STREAK_7: {
    id: "WEEKLY_STREAK_7",
    title: "Week Warrior",
    description: "Maintain a 7-day tracking streak",
    emoji: "🔥",
    period: "weekly" as const,
    target: 7,
    xpReward: 100,
    type: "streak" as const,
  },

  // Monthly Challenges
  MONTHLY_TRANSACTIONS_20: {
    id: "MONTHLY_TRANSACTIONS_20",
    title: "Master Tracker",
    description: "Log 20 transactions this month",
    emoji: "📊",
    period: "monthly" as const,
    target: 20,
    xpReward: 150,
    type: "transactions" as const,
  },
  MONTHLY_SAVE_100: {
    id: "MONTHLY_SAVE_100",
    title: "Century Saver",
    description: "Save $100 this month",
    emoji: "💯",
    period: "monthly" as const,
    target: 100,
    xpReward: 200,
    type: "savings" as const,
  },
  MONTHLY_WORLDS_2: {
    id: "MONTHLY_WORLDS_2",
    title: "World Explorer",
    description: "Complete 2 learning worlds",
    emoji: "🌍",
    period: "monthly" as const,
    target: 2,
    xpReward: 250,
    type: "worlds" as const,
  },
  MONTHLY_GOALS_1: {
    id: "MONTHLY_GOALS_1",
    title: "Goal Getter",
    description: "Complete 1 savings goal",
    emoji: "🏆",
    period: "monthly" as const,
    target: 1,
    xpReward: 175,
    type: "goals" as const,
  },
  MONTHLY_LEVEL_UP: {
    id: "MONTHLY_LEVEL_UP",
    title: "Level Up Legend",
    description: "Reach a new level this month",
    emoji: "⭐",
    period: "monthly" as const,
    target: 1,
    xpReward: 300,
    type: "level" as const,
  },
};

// Get active challenges for a period
export const getActiveChallenges = query({
  args: { period: v.union(v.literal("weekly"), v.literal("monthly")) },
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

    // Get active challenge period
    const now = Date.now();
    const activeChallenges = await ctx.db
      .query("challenges")
      .withIndex("by_period_and_active", (q) =>
        q.eq("period", args.period).eq("isActive", true),
      )
      .filter((q) =>
        q.and(
          q.lte(q.field("startDate"), now),
          q.gte(q.field("endDate"), now),
        ),
      )
      .collect();

    // Get user progress for these challenges
    const userProgress = await ctx.db
      .query("userChallenges")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const progressMap = new Map(
      userProgress.map((p) => [p.challengeId, p]),
    );

    // Combine challenge definitions with user progress
    const result = activeChallenges.map((challenge) => {
      const definition =
        CHALLENGE_DEFINITIONS[
          challenge.challengeId as keyof typeof CHALLENGE_DEFINITIONS
        ];
      const progress = progressMap.get(challenge.challengeId);

      return {
        ...definition,
        challenge: challenge,
        progress: progress?.progress ?? 0,
        target: definition.target,
        isCompleted: progress?.isCompleted ?? false,
        claimedReward: progress?.claimedReward ?? false,
        userChallengeId: progress?._id,
      };
    });

    return result;
  },
});

// Initialize challenges for a user (called when user first signs in or new period starts)
export const initializeUserChallenges = internalMutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Get active challenges for both periods
    const weeklyActiveChallenges = await ctx.db
      .query("challenges")
      .withIndex("by_period_and_active", (q) => q.eq("period", "weekly").eq("isActive", true))
      .filter((q) =>
        q.and(
          q.lte(q.field("startDate"), now),
          q.gte(q.field("endDate"), now),
        ),
      )
      .collect();

    const monthlyActiveChallenges = await ctx.db
      .query("challenges")
      .withIndex("by_period_and_active", (q) => q.eq("period", "monthly").eq("isActive", true))
      .filter((q) =>
        q.and(
          q.lte(q.field("startDate"), now),
          q.gte(q.field("endDate"), now),
        ),
      )
      .collect();

    const activeChallenges = [...weeklyActiveChallenges, ...monthlyActiveChallenges];

    // Check which ones the user doesn't have yet
    const existingProgress = await ctx.db
      .query("userChallenges")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const existingChallengeIds = new Set(
      existingProgress.map((p) => p.challengeId),
    );

    // Create user challenge entries for new challenges
    for (const challenge of activeChallenges) {
      if (!existingChallengeIds.has(challenge.challengeId)) {
        const definition =
          CHALLENGE_DEFINITIONS[
            challenge.challengeId as keyof typeof CHALLENGE_DEFINITIONS
          ];
        await ctx.db.insert("userChallenges", {
          userId: args.userId,
          challengeId: challenge.challengeId,
          progress: 0,
          target: definition.target,
          isCompleted: false,
          claimedReward: false,
        });
      }
    }
  },
});

// Update challenge progress
export const updateChallengeProgress = internalMutation({
  args: {
    userId: v.id("users"),
    challengeType: v.string(),
    amount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Get user's active challenges
    const userChallenges = await ctx.db
      .query("userChallenges")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();

    // Get active challenge periods for both weekly and monthly
    const weeklyChallenges = await ctx.db
      .query("challenges")
      .withIndex("by_period_and_active", (q) => q.eq("period", "weekly").eq("isActive", true))
      .filter((q) =>
        q.and(
          q.lte(q.field("startDate"), now),
          q.gte(q.field("endDate"), now),
        ),
      )
      .collect();

    const monthlyChallenges = await ctx.db
      .query("challenges")
      .withIndex("by_period_and_active", (q) => q.eq("period", "monthly").eq("isActive", true))
      .filter((q) =>
        q.and(
          q.lte(q.field("startDate"), now),
          q.gte(q.field("endDate"), now),
        ),
      )
      .collect();

    const challenges = [...weeklyChallenges, ...monthlyChallenges];

    const activeChallengeIds = new Set(challenges.map((c) => c.challengeId));

    for (const userChallenge of userChallenges) {
      // Skip if challenge period is not active
      if (!activeChallengeIds.has(userChallenge.challengeId)) {
        continue;
      }

      const definition =
        CHALLENGE_DEFINITIONS[
          userChallenge.challengeId as keyof typeof CHALLENGE_DEFINITIONS
        ];

      // Check if this challenge matches the type
      if (definition.type !== args.challengeType) {
        continue;
      }

      // Update progress based on type
      let newProgress = userChallenge.progress;
      
      if (args.challengeType === "transactions") {
        newProgress = userChallenge.progress + 1;
      } else if (args.challengeType === "savings" && args.amount) {
        newProgress = userChallenge.progress + args.amount;
      } else if (args.challengeType === "lessons") {
        newProgress = userChallenge.progress + 1;
      } else if (args.challengeType === "goals") {
        newProgress = userChallenge.progress + 1;
      } else if (args.challengeType === "worlds") {
        newProgress = userChallenge.progress + 1;
      } else if (args.challengeType === "level") {
        newProgress = userChallenge.progress + 1;
      } else if (args.challengeType === "streak") {
        const user = await ctx.db.get(args.userId);
        if (user) {
          newProgress = user.currentStreak ?? 0;
        }
      } else if (args.challengeType === "budget" && args.amount) {
        newProgress = userChallenge.progress + args.amount;
      }

      // Check if completed
      const isCompleted = newProgress >= userChallenge.target;

      await ctx.db.patch(userChallenge._id, {
        progress: newProgress,
        isCompleted,
        completedAt: isCompleted && !userChallenge.isCompleted ? now : userChallenge.completedAt,
      });
    }
  },
});

// Claim challenge reward
export const claimReward = mutation({
  args: { userChallengeId: v.id("userChallenges") },
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

    const userChallenge = await ctx.db.get(args.userChallengeId);
    if (!userChallenge || userChallenge.userId !== user._id) {
      throw new ConvexError({
        message: "Challenge not found",
        code: "NOT_FOUND",
      });
    }

    if (!userChallenge.isCompleted) {
      throw new ConvexError({
        message: "Challenge not completed yet",
        code: "BAD_REQUEST",
      });
    }

    if (userChallenge.claimedReward) {
      throw new ConvexError({
        message: "Reward already claimed",
        code: "CONFLICT",
      });
    }

    const definition =
      CHALLENGE_DEFINITIONS[
        userChallenge.challengeId as keyof typeof CHALLENGE_DEFINITIONS
      ];

    // Award XP
    await ctx.scheduler.runAfter(0, internal.gamification.awardXP, {
      userId: user._id,
      amount: definition.xpReward,
      reason: `challenge_${userChallenge.challengeId}`,
    });

    // Mark as claimed
    await ctx.db.patch(args.userChallengeId, {
      claimedReward: true,
    });

    return { xpAwarded: definition.xpReward };
  },
});

// Create or rotate challenge periods (admin/scheduled function)
export const createChallengePeriod = mutation({
  args: {
    period: v.union(v.literal("weekly"), v.literal("monthly")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const startDate = new Date(now);
    startDate.setHours(0, 0, 0, 0);

    let endDate: Date;
    if (args.period === "weekly") {
      // Start of week (Monday) to end of week (Sunday)
      const dayOfWeek = startDate.getDay();
      const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      startDate.setDate(startDate.getDate() + daysToMonday);
      
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else {
      // Start of month to end of month
      startDate.setDate(1);
      
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);
    }

    // Deactivate old challenges for this period
    const oldChallenges = await ctx.db
      .query("challenges")
      .withIndex("by_period_and_active", (q) =>
        q.eq("period", args.period).eq("isActive", true),
      )
      .collect();

    for (const oldChallenge of oldChallenges) {
      if (oldChallenge.endDate < now) {
        await ctx.db.patch(oldChallenge._id, { isActive: false });
      }
    }

    // Get challenge IDs for this period
    const challengeIds = Object.values(CHALLENGE_DEFINITIONS)
      .filter((c) => c.period === args.period)
      .map((c) => c.id);

    // Create new challenge periods
    const createdChallenges: Array<Id<"challenges">> = [];
    for (const challengeId of challengeIds) {
      const id = await ctx.db.insert("challenges", {
        challengeId,
        period: args.period,
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        isActive: true,
      });
      createdChallenges.push(id);
    }

    return {
      period: args.period,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      challengesCreated: createdChallenges.length,
    };
  },
});

// Get challenge stats/summary
export const getChallengeStats = query({
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

    const userChallenges = await ctx.db
      .query("userChallenges")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const completed = userChallenges.filter((c) => c.isCompleted).length;
    const unclaimed = userChallenges.filter(
      (c) => c.isCompleted && !c.claimedReward,
    ).length;

    return {
      totalCompleted: completed,
      unclaimedRewards: unclaimed,
    };
  },
});
