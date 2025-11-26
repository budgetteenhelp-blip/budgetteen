"use node";

import { v } from "convex/values";
import { Resend } from "resend";
import { internalAction } from "./_generated/server";

export const sendTeamApplicationEmail = internalAction({
  args: {
    applicationType: v.optional(v.union(v.literal("social-media"), v.literal("ambassador"))),
    fullName: v.string(),
    grade: v.string(),
    gpa: v.string(),
    socialMediaExperience: v.string(),
    extracurriculars: v.string(),
    whyJoin: v.string(),
    skills: v.string(),
    email: v.optional(v.string()),
    submittedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const submittedDate = new Date(args.submittedAt).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const applicationType = !args.applicationType 
      ? "Team Application (Legacy)" 
      : args.applicationType === "social-media" 
        ? "Social Media Team" 
        : "Budget Teen Ambassador";

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              color: #f97316;
              border-bottom: 3px solid #f97316;
              padding-bottom: 10px;
            }
            h2 {
              color: #ea580c;
              margin-top: 30px;
              margin-bottom: 10px;
            }
            .info-section {
              background-color: #fff7ed;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .field-label {
              font-weight: bold;
              color: #9a3412;
              display: inline-block;
              min-width: 150px;
            }
            .field-value {
              color: #333;
            }
            .text-response {
              background-color: #ffffff;
              padding: 15px;
              border-left: 4px solid #f97316;
              margin-top: 10px;
              white-space: pre-wrap;
            }
          </style>
        </head>
        <body>
          <h1>🎉 New Budget Teen Application</h1>
          
          <p>A new <strong>${applicationType}</strong> application has been submitted on <strong>${submittedDate}</strong></p>

          <h2>📋 Applicant Information</h2>
          <div class="info-section">
            ${args.applicationType ? `<p>
              <span class="field-label">Application Type:</span>
              <span class="field-value">${applicationType}</span>
            </p>` : ''}
            <p>
              <span class="field-label">Full Name:</span>
              <span class="field-value">${args.fullName}</span>
            </p>
            <p>
              <span class="field-label">Grade:</span>
              <span class="field-value">${args.grade}</span>
            </p>
            <p>
              <span class="field-label">GPA:</span>
              <span class="field-value">${args.gpa || "Not provided"}</span>
            </p>
            <p>
              <span class="field-label">Email:</span>
              <span class="field-value">${args.email || "Not provided"}</span>
            </p>
          </div>

          <h2>📱 Social Media Experience</h2>
          <div class="text-response">${args.socialMediaExperience || "Not provided"}</div>

          <h2>🎯 Extracurricular Activities</h2>
          <div class="text-response">${args.extracurriculars || "Not provided"}</div>

          <h2>💭 Why Join Budget Teen?</h2>
          <div class="text-response">${args.whyJoin}</div>

          <h2>🌟 Skills and Contributions</h2>
          <div class="text-response">${args.skills}</div>

          <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            This email was automatically sent from Budget Teen's application system.
          </p>
        </body>
      </html>
    `;

    try {
      const result = await resend.emails.send({
        from: "Budget Teen Applications <onboarding@resend.dev>",
        to: ["budgetteen.help@gmail.com"],
        subject: `New ${applicationType} Application from ${args.fullName}`,
        html,
      });

      return { success: true, id: result.data?.id };
    } catch (error) {
      console.error("Failed to send application email:", error);
      // Don't throw error - we still want the application saved to database
      return { success: false, error: String(error) };
    }
  },
});
