import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { internal } from "./_generated/api";

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

    const submittedAt = Date.now();

    const applicationId = await ctx.db.insert("teamApplications", {
      fullName: args.fullName.trim(),
      grade: args.grade.trim(),
      gpa: args.gpa.trim(),
      socialMediaExperience: args.socialMediaExperience.trim(),
      extracurriculars: args.extracurriculars.trim(),
      whyJoin: args.whyJoin.trim(),
      skills: args.skills.trim(),
      email: args.email?.trim(),
      submittedAt,
      status: "pending",
    });

    // Send email notification asynchronously
    await ctx.scheduler.runAfter(0, internal.emailActions.sendTeamApplicationEmail, {
      fullName: args.fullName.trim(),
      grade: args.grade.trim(),
      gpa: args.gpa.trim(),
      socialMediaExperience: args.socialMediaExperience.trim(),
      extracurriculars: args.extracurriculars.trim(),
      whyJoin: args.whyJoin.trim(),
      skills: args.skills.trim(),
      email: args.email?.trim(),
      submittedAt,
    });

    return { applicationId, success: true };
  },
});

// SECURITY: This function is intentionally removed to prevent unauthorized access
// Team applications contain sensitive personal information and should only be
// accessible via email notifications sent to budgetteen.help@gmail.com
// or through the Hercules Database tab (which requires project owner access).
//
// If you need to query applications programmatically in the future, implement
// proper role-based access control (RBAC) to verify admin privileges before
// allowing access to this sensitive data.
