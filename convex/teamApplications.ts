import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

export const submitApplication = mutation({
  args: {
    fullName: v.string(),
    grade: v.string(),
    gpa: v.string(),
    socialMediaExperience: v.string(),
    extracurriculars: v.string(),
    whyJoin: v.string(),
    skills: v.string(),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate required fields
    if (!args.fullName || args.fullName.trim().length === 0) {
      throw new ConvexError({
        message: "Full name is required",
        code: "BAD_REQUEST",
      });
    }

    if (!args.grade || args.grade.trim().length === 0) {
      throw new ConvexError({
        message: "Grade is required",
        code: "BAD_REQUEST",
      });
    }

    if (!args.whyJoin || args.whyJoin.trim().length < 50) {
      throw new ConvexError({
        message: "Please provide at least 50 characters for why you want to join",
        code: "BAD_REQUEST",
      });
    }

    if (!args.skills || args.skills.trim().length < 50) {
      throw new ConvexError({
        message: "Please provide at least 50 characters for your skills",
        code: "BAD_REQUEST",
      });
    }

    const applicationId = await ctx.db.insert("teamApplications", {
      fullName: args.fullName.trim(),
      grade: args.grade.trim(),
      gpa: args.gpa.trim(),
      socialMediaExperience: args.socialMediaExperience.trim(),
      extracurriculars: args.extracurriculars.trim(),
      whyJoin: args.whyJoin.trim(),
      skills: args.skills.trim(),
      email: args.email?.trim(),
      submittedAt: Date.now(),
      status: "pending",
    });

    return { applicationId, success: true };
  },
});

export const getAllApplications = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // Only allow authenticated users to view applications
    // In a real app, you'd want to check for admin privileges
    if (!identity) {
      throw new ConvexError({
        message: "Must be logged in to view applications",
        code: "UNAUTHENTICATED",
      });
    }

    const applications = await ctx.db
      .query("teamApplications")
      .order("desc")
      .collect();

    return applications;
  },
});
