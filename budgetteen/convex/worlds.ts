import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { internal } from "./_generated/api.js";

// Helper function to calculate cumulative XP needed for a level
function getXPForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i <= level; i++) {
    total += Math.floor(100 * Math.pow(1.5, i - 1));
  }
  return total;
}

export const getUserProgress = query({
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

    const progress = await ctx.db
      .query("worldProgress")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    // Return empty array if no progress exists
    // The UI will initialize World 1 as unlocked
    return progress.map((p) => ({
      worldId: p.worldId,
      isUnlocked: p.isUnlocked,
      completedLessons: p.completedLessons,
      stars: p.stars,
      lastAccessedAt: p.lastAccessedAt,
    }));
  },
});

export const getWorldProgress = query({
  args: { worldId: v.number() },
  handler: async (ctx, args) => {
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

    const progress = await ctx.db
      .query("worldProgress")
      .withIndex("by_user_and_world", (q) =>
        q.eq("userId", user._id).eq("worldId", args.worldId),
      )
      .unique();

    return progress || null;
  },
});

export const completeLesson = mutation({
  args: {
    worldId: v.number(),
    lessonId: v.number(),
    starsEarned: v.number(),
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

    const progress = await ctx.db
      .query("worldProgress")
      .withIndex("by_user_and_world", (q) =>
        q.eq("userId", user._id).eq("worldId", args.worldId),
      )
      .unique();

    if (!progress) {
      throw new ConvexError({
        message: "World not unlocked",
        code: "FORBIDDEN",
      });
    }

    // Add lesson to completed if not already completed
    const completedLessons = progress.completedLessons.includes(args.lessonId)
      ? progress.completedLessons
      : [...progress.completedLessons, args.lessonId];

    // Update progress
    await ctx.db.patch(progress._id, {
      completedLessons,
      stars: progress.stars + args.starsEarned,
      lastAccessedAt: Date.now(),
    });

    // Award XP to user (which handles level-ups automatically)
    const xpAmount = args.starsEarned * 10;
    const currentLevel = user.level ?? 1;
    const currentXP = user.xp ?? 0;
    const newXP = currentXP + xpAmount;
    
    // Calculate new level based on total XP (max level 20)
    let newLevel = currentLevel;
    for (let level = currentLevel; level < 20; level++) {
      const xpNeededForNextLevel = getXPForLevel(level + 1);
      if (newXP >= xpNeededForNextLevel) {
        newLevel = level + 1;
      } else {
        break;
      }
    }
    
    await ctx.db.patch(user._id, {
      xp: newXP,
      level: newLevel,
    });

    // Update challenge progress for lessons
    if (!progress.completedLessons.includes(args.lessonId)) {
      await ctx.scheduler.runAfter(0, internal.challenges.updateChallengeProgress, {
        userId: user._id,
        challengeType: "lessons",
      });
    }

    // Update challenge progress for level ups
    if (newLevel > currentLevel) {
      await ctx.scheduler.runAfter(0, internal.challenges.updateChallengeProgress, {
        userId: user._id,
        challengeType: "level",
      });
    }

    // Define lessons per world
    const lessonsPerWorld: Record<number, number> = {
      1: 6,
      2: 6,
      3: 6,
      4: 6,
      5: 6,
      6: 6,
      7: 6,
      8: 6,
    };

    // Check if world is completed and unlock next world
    const totalLessons = lessonsPerWorld[args.worldId] || 6;
    const worldJustCompleted = completedLessons.length === totalLessons && !progress.completedLessons.includes(args.lessonId);
    
    if (completedLessons.length === totalLessons && args.worldId < 8) {
      const nextWorldId = args.worldId + 1;

      // Check if next world already exists
      const nextWorldProgress = await ctx.db
        .query("worldProgress")
        .withIndex("by_user_and_world", (q) =>
          q.eq("userId", user._id).eq("worldId", nextWorldId),
        )
        .unique();

      if (nextWorldProgress) {
        // Update to unlocked if it exists
        await ctx.db.patch(nextWorldProgress._id, {
          isUnlocked: true,
        });
      } else {
        // Create new world progress entry
        await ctx.db.insert("worldProgress", {
          userId: user._id,
          worldId: nextWorldId,
          isUnlocked: true,
          completedLessons: [],
          stars: 0,
        });
      }
    }

    // Update challenge progress for world completion
    if (worldJustCompleted) {
      await ctx.scheduler.runAfter(0, internal.challenges.updateChallengeProgress, {
        userId: user._id,
        challengeType: "worlds",
      });
    }

    return { success: true };
  },
});

export const initializeWorld1 = mutation({
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

    // Check if world 1 already exists
    const existingProgress = await ctx.db
      .query("worldProgress")
      .withIndex("by_user_and_world", (q) =>
        q.eq("userId", user._id).eq("worldId", 1),
      )
      .unique();

    if (!existingProgress) {
      await ctx.db.insert("worldProgress", {
        userId: user._id,
        worldId: 1,
        isUnlocked: true,
        completedLessons: [],
        stars: 0,
      });
    }

    return { success: true };
  },
});

export const unlockNextWorld = mutation({
  args: { worldId: v.number() },
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

    // Check if world already exists
    const existingProgress = await ctx.db
      .query("worldProgress")
      .withIndex("by_user_and_world", (q) =>
        q.eq("userId", user._id).eq("worldId", args.worldId),
      )
      .unique();

    if (existingProgress) {
      await ctx.db.patch(existingProgress._id, {
        isUnlocked: true,
      });
    } else {
      await ctx.db.insert("worldProgress", {
        userId: user._id,
        worldId: args.worldId,
        isUnlocked: true,
        completedLessons: [],
        stars: 0,
      });
    }

    return { success: true };
  },
});

// Mutation to recalculate user level based on current XP
export const recalculateLevel = mutation({
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

    const currentXP = user.xp ?? 0;
    let correctLevel = 1;

    // Calculate correct level based on total XP (max level 20)
    for (let level = 1; level < 20; level++) {
      const xpNeededForNextLevel = getXPForLevel(level + 1);
      if (currentXP >= xpNeededForNextLevel) {
        correctLevel = level + 1;
      } else {
        break;
      }
    }

    const oldLevel = user.level ?? 1;

    if (correctLevel !== oldLevel) {
      await ctx.db.patch(user._id, {
        level: correctLevel,
      });
      return { 
        success: true, 
        levelChanged: true, 
        oldLevel, 
        newLevel: correctLevel,
        xp: currentXP 
      };
    }

    return { 
      success: true, 
      levelChanged: false, 
      level: correctLevel,
      xp: currentXP 
    };
  },
});
