import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    currentBalance: v.number(),
    totalIncome: v.number(),
    totalExpenses: v.number(),
    level: v.optional(v.number()),
    xp: v.optional(v.number()),
    currentStreak: v.optional(v.number()),
    longestStreak: v.optional(v.number()),
    lastActivityDate: v.optional(v.number()),
    // Avatar customization
    avatarSkinTone: v.optional(v.string()),
    avatarHairStyle: v.optional(v.string()),
    avatarHairColor: v.optional(v.string()),
    avatarOutfit: v.optional(v.string()),
    avatarAccessory: v.optional(v.string()),
    avatarBackground: v.optional(v.string()),
    avatarFaceExpression: v.optional(v.string()),
    unlockedItems: v.optional(v.array(v.string())),
  }).index("by_token", ["tokenIdentifier"]),

  transactions: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("income"), v.literal("expense")),
    amount: v.number(),
    category: v.string(),
    emoji: v.string(),
    description: v.string(),
    date: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "date"])
    .index("by_user_and_type", ["userId", "type"]),

  categories: defineTable({
    userId: v.id("users"),
    name: v.string(),
    emoji: v.string(),
    type: v.union(v.literal("income"), v.literal("expense")),
    color: v.string(),
  }).index("by_user_and_type", ["userId", "type"]),

  goals: defineTable({
    userId: v.id("users"),
    title: v.string(),
    targetAmount: v.number(),
    currentAmount: v.number(),
    emoji: v.string(),
    deadline: v.optional(v.number()),
    isCompleted: v.boolean(),
  }).index("by_user", ["userId"]),

  achievements: defineTable({
    userId: v.id("users"),
    badgeId: v.string(),
    unlockedAt: v.number(),
  }).index("by_user", ["userId"]),

  quizResults: defineTable({
    userId: v.id("users"),
    personalityType: v.string(),
    score: v.number(),
    completedAt: v.number(),
  }).index("by_user", ["userId"]),

  worldProgress: defineTable({
    userId: v.id("users"),
    worldId: v.number(),
    isUnlocked: v.boolean(),
    completedLessons: v.array(v.number()),
    stars: v.number(),
    lastAccessedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_world", ["userId", "worldId"]),
});
