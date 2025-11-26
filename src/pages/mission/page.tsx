import { LandingNav } from "@/components/landing-nav.tsx";

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950 dark:via-pink-950 dark:to-rose-950">
      <LandingNav />

      <div className="flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="text-center">
          <div className="mb-8 text-8xl">🎯</div>
          <h1 className="mb-4 text-6xl font-bold text-purple-900 dark:text-purple-100">
            Coming Soon
          </h1>
          <p className="text-2xl text-purple-700 dark:text-purple-300">
            Our mission is being crafted with care!
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay tuned to discover how we're empowering teens with financial literacy.
          </p>
        </div>
      </div>
    </div>
  );
}
