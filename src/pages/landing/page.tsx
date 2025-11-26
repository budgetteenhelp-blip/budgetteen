import { LandingNav } from "@/components/landing-nav.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Link } from "react-router-dom";
import { TrendingUpIcon, TargetIcon, TrophyIcon, SparklesIcon, GraduationCapIcon, ShieldCheckIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950">
      <LandingNav />

      {/* Hero Section */}
      <section className="px-4 pb-20 pt-32 md:px-6 md:pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <img
            src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
            alt="Budget Teen Logo"
            className="mx-auto mb-8 size-32 md:size-40"
          />
          
          <h1 className="mb-6 text-5xl font-bold leading-tight text-emerald-900 dark:text-emerald-100 md:text-7xl">
            Master Your Money,
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Level Up Your Life
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl text-emerald-700 dark:text-emerald-300 md:text-2xl">
            The fun, gamified money management app designed specifically for teens. 
            Track spending, crush savings goals, and learn financial skills that last a lifetime.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignInButton
              size="lg"
              signInText="Make an Account - It's Free! 🚀"
              showIcon={false}
              className="h-16 bg-gradient-to-r from-emerald-500 to-teal-500 px-12 text-xl font-bold shadow-2xl transition-transform hover:scale-105 hover:from-emerald-600 hover:to-teal-600"
            />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Join thousands of teens taking control of their finances
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-emerald-900 dark:text-emerald-100">
            Why Budget Teen?
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-emerald-200 bg-white/50 backdrop-blur transition-transform hover:scale-105 dark:border-emerald-800 dark:bg-gray-900/50">
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                  <TrendingUpIcon className="size-7 text-white" />
                </div>
                <CardTitle className="text-xl">Track Every Dollar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Easily log income and expenses with custom categories, emojis, and smart analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-white/50 backdrop-blur transition-transform hover:scale-105 dark:border-purple-800 dark:bg-gray-900/50">
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <TargetIcon className="size-7 text-white" />
                </div>
                <CardTitle className="text-xl">Crush Your Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set savings goals, track progress with visual charts, and celebrate when you achieve them.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-white/50 backdrop-blur transition-transform hover:scale-105 dark:border-blue-800 dark:bg-gray-900/50">
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                  <TrophyIcon className="size-7 text-white" />
                </div>
                <CardTitle className="text-xl">Level Up & Win Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn XP, unlock achievements, and compete with friends as you build better money habits.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-200 bg-white/50 backdrop-blur transition-transform hover:scale-105 dark:border-teal-800 dark:bg-gray-900/50">
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500">
                  <GraduationCapIcon className="size-7 text-white" />
                </div>
                <CardTitle className="text-xl">Learn Real Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore 8 interactive worlds filled with games, lessons, and challenges about money management.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200 bg-white/50 backdrop-blur transition-transform hover:scale-105 dark:border-amber-800 dark:bg-gray-900/50">
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                  <SparklesIcon className="size-7 text-white" />
                </div>
                <CardTitle className="text-xl">Personalized Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Customize your avatar with unique styles, outfits, and accessories as you progress.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-200 bg-white/50 backdrop-blur transition-transform hover:scale-105 dark:border-indigo-800 dark:bg-gray-900/50">
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                  <ShieldCheckIcon className="size-7 text-white" />
                </div>
                <CardTitle className="text-xl">Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your data is encrypted and protected with enterprise-grade security. We'll never share your info.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-12 text-center shadow-2xl">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Ready to Take Control?
          </h2>
          <p className="mb-8 text-xl text-white/90">
            Join Budget Teen today and start your journey to financial freedom!
          </p>
          <SignInButton
            size="lg"
            signInText="Create Your Free Account"
            showIcon={false}
            className="h-16 bg-white px-12 text-xl font-bold text-emerald-600 shadow-xl transition-transform hover:scale-105 hover:bg-gray-50"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 px-4 py-12 backdrop-blur dark:bg-gray-900/50 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
                alt="Budget Teen Logo"
                className="size-10"
              />
              <span className="text-xl font-bold text-emerald-600">Budget Teen</span>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link to="/mission" className="text-muted-foreground hover:text-foreground">
                Our Mission
              </Link>
              <Link to="/join-team" className="text-muted-foreground hover:text-foreground">
                Join Our Team
              </Link>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Budget Teen. All rights reserved.</p>
            <p className="mt-2">Empowering the next generation with financial literacy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
