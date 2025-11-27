import { LandingNav } from "@/components/landing-nav.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { motion } from "motion/react";
import { 
  User, 
  BookOpen, 
  Users, 
  Heart, 
  CheckCircle2,
  Mail,
  Instagram,
  Smartphone,
  Rocket,
  Target,
  Lightbulb,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-amber-950 dark:via-orange-950 dark:to-rose-950">
      <LandingNav />

      {/* Hero Section - Meet the Founder */}
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
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="flex size-32 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-6xl shadow-2xl md:size-40 md:text-7xl"
              >
                👋
              </motion.div>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-amber-900 dark:text-amber-100 md:text-7xl">
              Meet the Founder
            </h1>

            <Card className="mx-auto max-w-4xl border-2 border-amber-300 bg-white/90 backdrop-blur dark:border-amber-700 dark:bg-gray-900/90">
              <CardContent className="p-8 md:p-12">
                <p className="text-balance text-xl leading-relaxed text-foreground md:text-2xl">
                  Hi! I'm <strong className="text-amber-600 dark:text-amber-400">Jana</strong>, Founder and CEO of Budget Teen. 
                  I started this platform to make financial literacy{" "}
                  <strong className="text-rose-600 dark:text-rose-400">fun</strong>, <strong className="text-orange-600 dark:text-orange-400">simple</strong>, 
                  and <strong className="text-amber-600 dark:text-amber-400">empowering</strong> for teens everywhere. 💪
                </p>
              </CardContent>
            </Card>

            {/* Visual Element - Decorative Icons */}
            <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
              {[
                { emoji: "💡", label: "Fun Learning", color: "from-yellow-500 to-amber-500" },
                { emoji: "📊", label: "Real Skills", color: "from-orange-500 to-rose-500" },
                { emoji: "🎯", label: "Your Goals", color: "from-rose-500 to-pink-500" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur dark:border-amber-800 dark:bg-gray-900/80">
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

      {/* Our Story */}
      <section className="bg-gradient-to-r from-orange-100 to-rose-100 px-4 py-20 dark:from-orange-950 dark:to-rose-950 md:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-rose-500">
                <BookOpen className="size-8 text-white" />
              </div>
              <h2 className="mb-6 text-4xl font-bold text-orange-900 dark:text-orange-100 md:text-5xl">
                Our Story
              </h2>
            </div>

            <Card className="border-2 border-orange-300 bg-white/90 backdrop-blur dark:border-orange-700 dark:bg-gray-900/90">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6 text-lg leading-relaxed text-foreground md:text-xl">
                  <p>
                    Budget Teen started with a simple observation: <strong className="text-orange-600 dark:text-orange-400">most teens have no idea how to manage money</strong>, 
                    and schools aren't teaching them. As a teen myself, I saw friends struggle with basic financial decisions, 
                    from budgeting allowance to understanding credit cards.
                  </p>
                  
                  <p>
                    I realized that financial literacy doesn't have to be complicated or boring. 
                    By combining <strong className="text-rose-600 dark:text-rose-400">gamification</strong>, <strong className="text-amber-600 dark:text-amber-400">interactive tools</strong>, 
                    and <strong className="text-orange-600 dark:text-orange-400">real-world lessons</strong>, we could make learning about money actually fun and engaging for teens.
                  </p>
                  
                  <p>
                    What started as a personal project has grown into a <strong className="text-orange-600 dark:text-orange-400">teen-focused financial literacy platform</strong> that's 
                    empowering thousands of students across the country to take control of their financial futures. 
                    We're not just teaching teens about money — we're building a generation of financially confident leaders. 🚀
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Users className="size-8 text-white" />
              </div>
              <h2 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-100 md:text-5xl">
                Our Team
              </h2>
            </div>

            <Card className="mb-8 border-2 border-purple-300 bg-white/90 backdrop-blur dark:border-purple-700 dark:bg-gray-900/90">
              <CardContent className="p-8 md:p-12">
                <p className="mb-6 text-balance text-center text-lg leading-relaxed text-foreground md:text-xl">
                  Budget Teen is powered by a team of <strong className="text-purple-600 dark:text-purple-400">motivated teens</strong> and <strong className="text-pink-600 dark:text-pink-400">experienced mentors</strong> who 
                  are passionate about making financial literacy accessible to everyone. We believe that teens can learn from teens, 
                  which is why our team is led by students who understand the challenges and opportunities that come with managing money as a young person.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full border-2 border-pink-300 bg-white/90 backdrop-blur transition-shadow hover:shadow-xl dark:border-pink-700 dark:bg-gray-900/90">
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500">
                      <Smartphone className="size-7 text-white" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-pink-900 dark:text-pink-100">
                      Social Media Team
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Our social media team creates engaging content, manages our online community, and spreads financial literacy tips across Instagram, TikTok, and more.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full border-2 border-purple-300 bg-white/90 backdrop-blur transition-shadow hover:shadow-xl dark:border-purple-700 dark:bg-gray-900/90">
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500">
                      <Target className="size-7 text-white" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-purple-900 dark:text-purple-100">
                      State Ambassadors
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Our ambassadors represent Budget Teen in their local communities, visiting schools to teach financial literacy lessons and demos to younger students.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why We Do It */}
      <section className="bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-20 dark:from-amber-950 dark:to-orange-950 md:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500">
                <Heart className="size-8 text-white" />
              </div>
              <h2 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-100 md:text-5xl">
                Why We Do It
              </h2>
            </div>

            <Card className="border-2 border-amber-300 bg-white/90 backdrop-blur dark:border-amber-700 dark:bg-gray-900/90">
              <CardContent className="p-8 md:p-12">
                <p className="mb-8 text-balance text-center text-xl leading-relaxed text-foreground md:text-2xl">
                  Our mission is driven by four core values:
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      title: "Accessibility",
                      description: "Every teen deserves access to financial education, regardless of their background.",
                      emoji: "🌍",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      title: "Empowerment",
                      description: "We give teens the confidence and tools to make smart money decisions on their own.",
                      emoji: "💪",
                      color: "from-blue-500 to-purple-500",
                    },
                    {
                      title: "Fun",
                      description: "Learning about money shouldn't be boring — it should be exciting, interactive, and rewarding!",
                      emoji: "🎉",
                      color: "from-pink-500 to-rose-500",
                    },
                    {
                      title: "Community",
                      description: "We foster a supportive environment where teens can learn from each other and grow together.",
                      emoji: "🤝",
                      color: "from-amber-500 to-orange-500",
                    },
                  ].map((value, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${value.color}`}>
                          <span className="text-2xl">{value.emoji}</span>
                        </div>
                        <div>
                          <h3 className="mb-2 text-xl font-bold text-amber-900 dark:text-amber-100">
                            {value.title}
                          </h3>
                          <p className="leading-relaxed text-muted-foreground">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-5xl">
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
              <h2 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-100 md:text-5xl">
                Our Approach
              </h2>
            </div>

            <Card className="border-2 border-blue-300 bg-white/90 backdrop-blur dark:border-blue-700 dark:bg-gray-900/90">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  {[
                    {
                      icon: CheckCircle2,
                      text: "Break down financial concepts into simple, relatable steps",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      icon: Rocket,
                      text: "Make learning interactive and fun through gamification and challenges",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      icon: TrendingUp,
                      text: "Encourage teens to practice smart financial habits early",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      icon: Users,
                      text: "Promote peer-to-peer learning through ambassadors and social media",
                      color: "from-amber-500 to-orange-500",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${item.color}`}>
                        <item.icon className="size-6 text-white" />
                      </div>
                      <p className="text-lg font-medium leading-relaxed text-foreground">
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-gradient-to-r from-rose-100 to-pink-100 px-4 py-20 dark:from-rose-950 dark:to-pink-950 md:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-rose-300 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-1 dark:border-rose-700">
              <div className="rounded-lg bg-white/95 p-8 backdrop-blur dark:bg-gray-900/95 md:p-12">
                <div className="text-center">
                  <div className="mb-6 text-6xl">🚀</div>
                  <h2 className="mb-4 text-4xl font-bold text-rose-900 dark:text-rose-100 md:text-5xl">
                    Ready to Join Us?
                  </h2>
                  <p className="mb-8 text-xl text-rose-700 dark:text-rose-300">
                    Whether you want to be part of our team or start your financial literacy journey, we're here for you!
                  </p>
                  
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Link to="/join-team">
                      <Button
                        size="lg"
                        className="h-14 w-full bg-gradient-to-r from-rose-500 to-pink-500 px-8 text-lg font-bold shadow-xl transition-transform hover:scale-105 hover:from-rose-600 hover:to-pink-600 sm:w-auto"
                      >
                        Join Our Team 🎯
                      </Button>
                    </Link>
                    
                    <Link to="/landing">
                      <Button
                        size="lg"
                        className="h-14 w-full border-2 border-rose-500 bg-white px-8 text-lg font-bold text-rose-600 shadow-xl transition-transform hover:scale-105 hover:bg-rose-50 dark:bg-gray-900 dark:text-rose-400 dark:hover:bg-gray-800 sm:w-auto"
                      >
                        Start Using Budget Teen 💸
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                <Mail className="size-8 text-white" />
              </div>
              <h2 className="mb-4 text-4xl font-bold text-amber-900 dark:text-amber-100 md:text-5xl">
                Contact Us
              </h2>
              <p className="text-xl text-amber-700 dark:text-amber-300">
                Have questions? Want to get in touch? Reach out to us!
              </p>
            </div>

            <Card className="border-2 border-amber-300 bg-white/90 backdrop-blur dark:border-amber-700 dark:bg-gray-900/90">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  <motion.a
                    href="https://www.instagram.com/budgetteenofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 rounded-lg border-2 border-pink-300 bg-gradient-to-r from-pink-50 to-rose-50 p-4 transition-shadow hover:shadow-lg dark:border-pink-700 dark:from-pink-950/50 dark:to-rose-950/50"
                  >
                    <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500">
                      <Instagram className="size-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-pink-900 dark:text-pink-100">Instagram</p>
                      <p className="text-pink-700 dark:text-pink-300">@budgetteenofficial</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.tiktok.com/@budget.teen2"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 rounded-lg border-2 border-cyan-300 bg-gradient-to-r from-cyan-50 to-blue-50 p-4 transition-shadow hover:shadow-lg dark:border-cyan-700 dark:from-cyan-950/50 dark:to-blue-950/50"
                  >
                    <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
                      <Smartphone className="size-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-cyan-900 dark:text-cyan-100">TikTok</p>
                      <p className="text-cyan-700 dark:text-cyan-300">@budget.teen2</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="mailto:budgetteen.help@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 rounded-lg border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-4 transition-shadow hover:shadow-lg dark:border-amber-700 dark:from-amber-950/50 dark:to-orange-950/50"
                  >
                    <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                      <Mail className="size-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-amber-900 dark:text-amber-100">Email</p>
                      <p className="text-amber-700 dark:text-amber-300">budgetteen.help@gmail.com</p>
                    </div>
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="pb-12"></div>
    </div>
  );
}
