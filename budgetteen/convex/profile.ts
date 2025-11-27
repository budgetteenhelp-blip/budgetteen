import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const updateAvatar = mutation({
  args: {
    skinTone: v.optional(v.string()),
    hairStyle: v.optional(v.string()),
    hairColor: v.optional(v.string()),
    outfit: v.optional(v.string()),
    accessory: v.optional(v.string()),
    background: v.optional(v.string()),
    faceExpression: v.optional(v.string()),
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

    const updates: Record<string, string> = {};
    if (args.skinTone !== undefined) updates.avatarSkinTone = args.skinTone;
    if (args.hairStyle !== undefined) updates.avatarHairStyle = args.hairStyle;
    if (args.hairColor !== undefined) updates.avatarHairColor = args.hairColor;
    if (args.outfit !== undefined) updates.avatarOutfit = args.outfit;
    if (args.accessory !== undefined) updates.avatarAccessory = args.accessory;
    if (args.background !== undefined) updates.avatarBackground = args.background;
    if (args.faceExpression !== undefined) updates.avatarFaceExpression = args.faceExpression;

    await ctx.db.patch(user._id, updates);

    return { success: true };
  },
});

export const unlockItem = mutation({
  args: {
    itemId: v.string(),
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

    const currentUnlocked = user.unlockedItems || [];
    if (currentUnlocked.includes(args.itemId)) {
      return { success: true, alreadyUnlocked: true };
    }

    await ctx.db.patch(user._id, {
      unlockedItems: [...currentUnlocked, args.itemId],
    });

    return { success: true, alreadyUnlocked: false };
  },
});

export const getUnlockedItems = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      return [];
    }

    return user.unlockedItems || [];
  },
});
