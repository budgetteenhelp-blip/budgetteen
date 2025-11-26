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
import { CheckCircle2Icon, UsersIcon, ChevronDownIcon, ChevronUpIcon, SmartphoneIcon, MapPinIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ApplicationType = "social-media" | "ambassador" | null;

export default function JoinTeamPage() {
  const submitApplication = useMutation(api.teamApplications.submitApplication);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState<ApplicationType>(null);

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

  const handleSubmit = async (e: React.FormEvent, type: "social-media" | "ambassador") => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitApplication({
        applicationType: type,
        ...formData,
      });
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

  const toggleSection = (type: ApplicationType) => {
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
      // Reset form when switching types
      setFormData({
        fullName: "",
        grade: "",
        gpa: "",
        socialMediaExperience: "",
        extracurriculars: "",
        whyJoin: "",
        skills: "",
        email: "",
      });
    }
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
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
              <UsersIcon className="size-10 text-white" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-blue-900 dark:text-blue-100 md:text-5xl">
              Join the Budget Teen Team!
            </h1>
            <p className="mb-2 text-xl text-blue-700 dark:text-blue-300">
              We're looking for passionate individuals to help spread financial literacy
            </p>
            <p className="text-sm text-muted-foreground">
              Choose one application type below to get started
            </p>
          </div>

          {/* Application Type Selection Cards */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {/* Social Media Team Card */}
            <Card 
              className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                selectedType === "social-media" 
                  ? "border-pink-500 bg-pink-50/50 dark:border-pink-700 dark:bg-pink-950/30" 
                  : "border-pink-300 bg-white/90 backdrop-blur dark:border-pink-700 dark:bg-gray-900/90"
              }`}
              onClick={() => toggleSection("social-media")}
            >
              <CardHeader>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500">
                    <SmartphoneIcon className="size-6 text-white" />
                  </div>
                  {selectedType === "social-media" ? (
                    <ChevronUpIcon className="size-6 text-pink-600" />
                  ) : (
                    <ChevronDownIcon className="size-6 text-muted-foreground" />
                  )}
                </div>
                <CardTitle className="text-2xl text-pink-900 dark:text-pink-100">
                  Social Media Team
                </CardTitle>
                <CardDescription className="text-base">
                  Create engaging content and grow our online presence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Create content for Instagram, TikTok, and other platforms</li>
                  <li>• Engage with our community and respond to comments</li>
                  <li>• Track metrics and analyze social media performance</li>
                  <li>• Brainstorm creative campaign ideas</li>
                </ul>
              </CardContent>
            </Card>

            {/* Ambassador Card */}
            <Card 
              className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                selectedType === "ambassador" 
                  ? "border-purple-500 bg-purple-50/50 dark:border-purple-700 dark:bg-purple-950/30" 
                  : "border-purple-300 bg-white/90 backdrop-blur dark:border-purple-700 dark:bg-gray-900/90"
              }`}
              onClick={() => toggleSection("ambassador")}
            >
              <CardHeader>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500">
                    <MapPinIcon className="size-6 text-white" />
                  </div>
                  {selectedType === "ambassador" ? (
                    <ChevronUpIcon className="size-6 text-purple-600" />
                  ) : (
                    <ChevronDownIcon className="size-6 text-muted-foreground" />
                  )}
                </div>
                <CardTitle className="text-2xl text-purple-900 dark:text-purple-100">
                  Budget Teen Ambassador
                </CardTitle>
                <CardDescription className="text-base">
                  Represent Budget Teen in your local community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Serve as the Budget Teen representative for your area</li>
                  <li>• Visit elementary and middle schools to teach financial literacy</li>
                  <li>• Perform engaging lessons and demos of Budget Teen</li>
                  <li>• Act as the local face of our mission</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Application Forms */}
          <AnimatePresence mode="wait">
            {selectedType && (
              <motion.div
                key={selectedType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border-2 ${
                  selectedType === "social-media" 
                    ? "border-pink-300 dark:border-pink-700" 
                    : "border-purple-300 dark:border-purple-700"
                } bg-white/90 backdrop-blur dark:bg-gray-900/90`}>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {selectedType === "social-media" ? "Social Media Team" : "Ambassador"} Application
                    </CardTitle>
                    <CardDescription>
                      Tell us about yourself and why you'd be a great addition to our team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={(e) => handleSubmit(e, selectedType)} className="space-y-6">
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
                          {selectedType === "social-media" 
                            ? "Social Media Experience" 
                            : "Teaching or Public Speaking Experience"}
                        </Label>
                        <Textarea
                          id="socialMediaExperience"
                          name="socialMediaExperience"
                          value={formData.socialMediaExperience}
                          onChange={handleChange}
                          placeholder={
                            selectedType === "social-media"
                              ? "Tell us about your experience with social media platforms (Instagram, TikTok, Twitter, etc.). Include any accounts you manage, content you create, or relevant projects."
                              : "Describe any experience you have teaching, tutoring, or speaking in front of groups. This could include presentations, volunteer work, or any leadership roles."
                          }
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
                          placeholder={
                            selectedType === "social-media"
                              ? "Share your motivation for joining our social media team. What excites you about Budget Teen's mission? (Minimum 50 characters)"
                              : "Share your motivation for becoming an ambassador. What excites you about teaching financial literacy to younger students? (Minimum 50 characters)"
                          }
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
                          placeholder={
                            selectedType === "social-media"
                              ? "Describe your relevant skills (content creation, graphic design, video editing, writing, marketing, community management, etc.) and how they'll help Budget Teen grow. (Minimum 50 characters)"
                              : "Describe your relevant skills (public speaking, teaching, organization, communication, creativity, etc.) and how they'll help you excel as an ambassador. (Minimum 50 characters)"
                          }
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
                        className={`w-full text-lg font-semibold ${
                          selectedType === "social-media"
                            ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                            : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                        }`}
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
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedType && (
            <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50/50 p-8 text-center dark:border-blue-700 dark:bg-blue-950/30">
              <p className="text-lg text-muted-foreground">
                👆 Click on one of the options above to view the application form
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
