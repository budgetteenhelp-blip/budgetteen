import { LandingNav } from "@/components/landing-nav.tsx";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
      <LandingNav />

      <div className="flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="text-center">
          <div className="mb-8 text-8xl">🚀</div>
          <h1 className="mb-4 text-6xl font-bold text-orange-900 dark:text-orange-100">
            Coming Soon
          </h1>
          <p className="text-2xl text-orange-700 dark:text-orange-300">
            We're working on something amazing!
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Check back soon to learn more about the Budget Teen story.
          </p>
        </div>
      </div>
    </div>
  );
}
