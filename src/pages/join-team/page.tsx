import { useState } from "react";
import { LandingNav } from "@/components/landing-nav.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { toast } from "sonner";
import { CheckCircle2Icon, UsersIcon } from "lucide-react";

export default function JoinTeamPage() {
  const submitApplication = useMutation(api.teamApplications.submitApplication);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    grade: "",
    gpa: "",
    socialMediaExperience: "",
    extracurriculars: "",
    whyJoin: "",
    skills: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitApplication(formData);
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
        <LandingNav />

        <div className="flex min-h-screen items-center justify-center px-4 pt-20">
          <Card className="w-full max-w-2xl border-2 border-green-300 bg-white/90 backdrop-blur dark:border-green-700 dark:bg-gray-900/90">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                <CheckCircle2Icon className="size-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-green-900 dark:text-green-100">
                Application Submitted!
              </CardTitle>
              <CardDescription className="text-lg">
                Thank you for applying to join the Budget Teen team!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-muted-foreground">
                We've received your application and will review it carefully. 
                We'll get back to you soon via email if we think you'd be a great fit for our team!
              </p>
              <Button
                onClick={() => (window.location.href = "/landing")}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      <LandingNav />

      <div className="px-4 py-24 md:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
              <UsersIcon className="size-10 text-white" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-blue-900 dark:text-blue-100 md:text-5xl">
              Join the Budget Teen Team!
            </h1>
            <p className="text-xl text-blue-700 dark:text-blue-300">
              We're looking for passionate social media team members to help spread financial literacy
            </p>
          </div>

          {/* Application Form */}
          <Card className="border-2 border-blue-300 bg-white/90 backdrop-blur dark:border-blue-700 dark:bg-gray-900/90">
            <CardHeader>
              <CardTitle className="text-2xl">Application Form</CardTitle>
              <CardDescription>
                Tell us about yourself and why you'd be a great addition to our team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base font-semibold">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    className="text-base"
                  />
                </div>

                {/* Grade */}
                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-base font-semibold">
                    Grade <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    placeholder="e.g., 10th, 11th, 12th, Freshman, etc."
                    required
                    className="text-base"
                  />
                </div>

                {/* GPA */}
                <div className="space-y-2">
                  <Label htmlFor="gpa" className="text-base font-semibold">
                    GPA
                  </Label>
                  <Input
                    id="gpa"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleChange}
                    placeholder="e.g., 3.8, 4.0"
                    className="text-base"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll use this to contact you about your application
                  </p>
                </div>

                {/* Social Media Experience */}
                <div className="space-y-2">
                  <Label htmlFor="socialMediaExperience" className="text-base font-semibold">
                    Social Media Experience
                  </Label>
                  <Textarea
                    id="socialMediaExperience"
                    name="socialMediaExperience"
                    value={formData.socialMediaExperience}
                    onChange={handleChange}
                    placeholder="Tell us about your experience with social media platforms (Instagram, TikTok, Twitter, etc.). Include any accounts you manage, content you create, or relevant projects."
                    rows={4}
                    className="text-base"
                  />
                </div>

                {/* Extracurricular Activities */}
                <div className="space-y-2">
                  <Label htmlFor="extracurriculars" className="text-base font-semibold">
                    Extracurricular Activities
                  </Label>
                  <Textarea
                    id="extracurriculars"
                    name="extracurriculars"
                    value={formData.extracurriculars}
                    onChange={handleChange}
                    placeholder="List your extracurricular activities, clubs, sports, volunteer work, or leadership positions."
                    rows={4}
                    className="text-base"
                  />
                </div>

                {/* Why Join */}
                <div className="space-y-2">
                  <Label htmlFor="whyJoin" className="text-base font-semibold">
                    Why do you want to join Budget Teen? <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="whyJoin"
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleChange}
                    placeholder="Share your motivation for joining our team. What excites you about Budget Teen's mission? (Minimum 50 characters)"
                    rows={5}
                    required
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.whyJoin.length} / 50 characters minimum
                  </p>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-base font-semibold">
                    What skills can you bring to the team? <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Describe your relevant skills (content creation, graphic design, video editing, writing, marketing, community management, etc.) and how they'll help Budget Teen grow. (Minimum 50 characters)"
                    rows={5}
                    required
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.skills.length} / 50 characters minimum
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-lg font-semibold hover:from-blue-600 hover:to-purple-600"
                  size="lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  By submitting this application, you agree to be contacted by the Budget Teen team.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
