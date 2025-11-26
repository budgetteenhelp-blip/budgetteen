import { LandingNav } from "@/components/landing-nav.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { motion } from "motion/react";
import { 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Heart, 
  Users, 
  Sparkles,
  CheckCircle2,
  Award,
  Globe,
  Rocket
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950">
      <LandingNav />

      {/* Hero Section */}
      <section className="px-4 pb-20 pt-32 md:px-6 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-8 flex justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-8xl md:text-9xl"
              >
                🎯
              </motion.div>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-emerald-900 dark:text-emerald-100 md:text-7xl">
              Empowering Teens to Take Control
              <br />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                of Their Money
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-3xl text-xl text-emerald-700 dark:text-emerald-300 md:text-2xl">
              Budget Teen makes financial literacy simple, fun, and actionable for teens everywhere.
            </p>

            {/* Visual Element - Decorative Cards */}
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
              {[
                { emoji: "💰", label: "Track Money", color: "from-green-500 to-emerald-500" },
                { emoji: "🎮", label: "Learn & Play", color: "from-blue-500 to-purple-500" },
                { emoji: "🎯", label: "Reach Goals", color: "from-pink-500 to-rose-500" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="border-2 border-emerald-200 bg-white/80 backdrop-blur dark:border-emerald-800 dark:bg-gray-900/80">
                    <CardContent className="p-6">
                      <div className="mb-2 text-4xl">{item.emoji}</div>
                      <p className={`bg-gradient-to-r ${item.color} bg-clip-text font-bold text-transparent`}>
                        {item.label}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                <Target className="size-8 text-white" />
              </div>
              <h2 className="mb-6 text-4xl font-bold text-emerald-900 dark:text-emerald-100 md:text-5xl">
                Why We Exist
              </h2>
            </div>

            <Card className="border-2 border-emerald-300 bg-white/90 backdrop-blur dark:border-emerald-700 dark:bg-gray-900/90">
              <CardContent className="p-8 md:p-12">
                <p className="text-balance text-center text-xl leading-relaxed text-foreground md:text-2xl">
                  Budget Teen is built on <strong className="text-emerald-600 dark:text-emerald-400">accessibility</strong>, <strong className="text-emerald-600 dark:text-emerald-400">empowerment</strong>, and real-world financial literacy. 
                  We believe that <strong>every teen deserves the tools</strong> to manage money confidently. 
                  Our mission is to make money skills <strong className="text-emerald-600 dark:text-emerald-400">understandable</strong> and 
                  inspire teens to <strong className="text-emerald-600 dark:text-emerald-400">control their financial future</strong>.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-20 dark:from-emerald-950 dark:to-teal-950 md:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                <Lightbulb className="size-8 text-white" />
              </div>
              <h2 className="mb-4 text-4xl font-bold text-emerald-900 dark:text-emerald-100 md:text-5xl">
                How We Help Teens Succeed
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: CheckCircle2,
                  title: "Break Down Complexity",
                  description: "We transform complex financial concepts into clear, relatable steps that any teen can understand and apply.",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Sparkles,
                  title: "Make Learning Fun",
                  description: "Interactive tools, games, and challenges turn financial education into an engaging adventure, not a chore.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: TrendingUp,
                  title: "Build Smart Habits",
                  description: "We help teens develop habits for smart spending, saving, and investing early — setting them up for lifelong success.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Target,
                  title: "Track Progress & Goals",
                  description: "Our platform lets teens track their progress, set meaningful goals, and celebrate milestones along the way.",
                  color: "from-amber-500 to-orange-500",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full border-2 border-emerald-200 bg-white/90 backdrop-blur transition-shadow hover:shadow-xl dark:border-emerald-800 dark:bg-gray-900/90">
                    <CardContent className="p-6">
                      <div className={`mb-4 flex size-14 items-center justify-center rounded-full bg-gradient-to-r ${item.color}`}>
                        <item.icon className="size-7 text-white" />
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                        {item.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500">
                <Heart className="size-8 text-white" />
              </div>
              <h2 className="mb-4 text-4xl font-bold text-emerald-900 dark:text-emerald-100 md:text-5xl">
                The Values We Stand By
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Globe,
                  title: "Accessibility",
                  description: "Financial literacy for all teens, regardless of background or experience.",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Award,
                  title: "Empowerment",
                  description: "Building confidence to make smart money decisions independently.",
                  color: "from-blue-500 to-purple-500",
                },
                {
                  icon: Rocket,
                  title: "Fun & Engaging",
                  description: "Learning finance doesn't have to be boring — we make it exciting!",
                  color: "from-pink-500 to-rose-500",
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Encouraging peer-to-peer learning and mutual support.",
                  color: "from-amber-500 to-orange-500",
                },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full border-2 border-emerald-200 bg-white/90 backdrop-blur transition-shadow hover:shadow-xl dark:border-emerald-800 dark:bg-gray-900/90">
                    <CardContent className="p-6 text-center">
                      <div className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r ${value.color}`}>
                        <value.icon className="size-8 text-white" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-emerald-900 dark:text-emerald-100">
                        {value.title}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="bg-gradient-to-r from-teal-100 to-cyan-100 px-4 py-20 dark:from-teal-950 dark:to-cyan-950 md:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                <TrendingUp className="size-8 text-white" />
              </div>
              <h2 className="mb-6 text-4xl font-bold text-emerald-900 dark:text-emerald-100 md:text-5xl">
                Why It Matters
              </h2>
            </div>

            <Card className="border-2 border-teal-300 bg-white/90 backdrop-blur dark:border-teal-700 dark:bg-gray-900/90">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6 text-lg leading-relaxed text-foreground md:text-xl">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                      <CheckCircle2 className="size-5 text-white" />
                    </div>
                    <p>
                      <strong className="text-emerald-600 dark:text-emerald-400">Teens gain skills they won't learn in school.</strong> Most schools don't teach practical money management, 
                      leaving teens unprepared for real-world financial decisions.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-500">
                      <CheckCircle2 className="size-5 text-white" />
                    </div>
                    <p>
                      <strong className="text-teal-600 dark:text-teal-400">Early financial literacy sets up long-term success.</strong> Teens who learn money skills early 
                      are more likely to save, invest wisely, and avoid debt as adults.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-cyan-500">
                      <CheckCircle2 className="size-5 text-white" />
                    </div>
                    <p>
                      <strong className="text-cyan-600 dark:text-cyan-400">We reach schools and communities nationwide.</strong> Through our ambassador program 
                      and online platform, we're bringing financial literacy to teens everywhere.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-emerald-300 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-1 dark:border-emerald-700">
              <div className="rounded-lg bg-white/95 p-8 backdrop-blur dark:bg-gray-900/95 md:p-12">
                <div className="text-center">
                  <h2 className="mb-4 text-4xl font-bold text-emerald-900 dark:text-emerald-100 md:text-5xl">
                    Ready to Make an Impact?
                  </h2>
                  <p className="mb-8 text-xl text-emerald-700 dark:text-emerald-300">
                    Join our team and help empower the next generation with financial literacy!
                  </p>
                  
                  <Link to="/join-team">
                    <Button
                      size="lg"
                      className="h-16 bg-gradient-to-r from-emerald-500 to-teal-500 px-12 text-xl font-bold shadow-xl transition-transform hover:scale-105 hover:from-emerald-600 hover:to-teal-600"
                    >
                      Join Our Mission 🚀
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="pb-12"></div>
    </div>
  );
}
