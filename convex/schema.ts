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
});
