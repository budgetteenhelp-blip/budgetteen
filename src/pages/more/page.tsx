import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { BottomTabBar } from "@/components/bottom-tab-bar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import Avatar from "@/components/avatar.tsx";
import AchievementsSection from "../_components/achievements-section.tsx";
import { 
  UserIcon, 
  TrophyIcon, 
  BrainIcon, 
  AwardIcon, 
  LogOutIcon, 
  ChevronRightIcon,
  SparklesIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MoreInner() {
  const user = useQuery(api.users.getCurrentUser);
  const gamification = useQuery(api.gamification.getUserStats);
  const achievements = useQuery(api.gamification.getUserAchievements);
  const quizResult = useQuery(api.quiz.getLatestQuizResult);
  const navigate = useNavigate();

  if (!user || !gamification || !achievements) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-2xl" />
      </div>
    );
  }

  const menuItems = [
    {
      icon: UserIcon,
      title: "Profile & Avatar",
      description: "Customize your avatar and unlock new styles",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50",
      borderColor: "border-purple-300 dark:border-purple-700",
      onClick: () => navigate("/profile"),
    },
    {
      icon: TrophyIcon,
      title: "Weekly Challenges",
      description: "Complete challenges and earn bonus XP",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50 dark:from-yellow-950/50 dark:to-orange-950/50",
      borderColor: "border-yellow-300 dark:border-yellow-700",
      onClick: () => navigate("/challenges"),
    },
    {
      icon: BrainIcon,
      title: "Financial Personality Quiz",
      description: quizResult 
        ? `Your type: ${quizResult.personalityType}` 
        : "Discover your money personality",
      color: "from-indigo-500 to-violet-500",
      bgColor: "from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50",
      borderColor: "border-indigo-300 dark:border-indigo-700",
      onClick: () => navigate("/quiz"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 pb-20 dark:from-violet-950 dark:via-purple-950 dark:to-fuchsia-950">
      <div className="mx-auto max-w-2xl p-4 md:p-6">
        {/* User Profile Header */}
        <Card className="mb-6 border-2 border-purple-300 bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50 dark:border-purple-700 dark:from-purple-950/50 dark:via-pink-950/50 dark:to-fuchsia-950/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar
                  skinTone={(user.avatarSkinTone || 0).toString()}
                  hairStyle={(user.avatarHairStyle || 0).toString()}
                  hairColor={(user.avatarHairColor || 0).toString()}
                  outfit={(user.avatarOutfit || 0).toString()}
                  accessory={(user.avatarAccessory || 0).toString()}
                  faceExpression={(user.avatarFaceExpression || 0).toString()}
                  size="lg"
                />
                <button
                  onClick={() => navigate("/profile")}
                  className="absolute -bottom-1 -right-1 rounded-full bg-purple-500 p-1.5 text-white shadow-lg transition-transform hover:scale-110"
                >
                  <SparklesIcon className="size-3" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {user.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="font-semibold text-purple-700 dark:text-purple-300">
                    Level {gamification.level}
                  </span>
                  <span className="text-muted-foreground">
                    {gamification.xp.toLocaleString()} XP
                  </span>
                  <span className="text-muted-foreground">
                    {achievements.filter(a => a.unlockedAt).length} Badges
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="mb-6 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className={`cursor-pointer border-2 bg-gradient-to-r transition-transform hover:scale-[1.02] ${item.borderColor} ${item.bgColor}`}
                onClick={item.onClick}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full bg-gradient-to-r p-2.5 ${item.color}`}>
                        <Icon className="size-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="text-xs">
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ChevronRightIcon className="size-5 text-muted-foreground" />
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h3 className="mb-4 text-xl font-bold text-purple-900 dark:text-purple-100">
            <AwardIcon className="mr-2 inline size-5" />
            Your Achievements
          </h3>
          <AchievementsSection />
        </div>

        {/* Sign Out */}
        <Card className="border-2 border-gray-300 dark:border-gray-700">
          <CardContent className="pt-6">
            <SignInButton
              variant="outline"
              className="w-full border-2 font-semibold"
            >
              <LogOutIcon className="mr-2 size-4" />
              Sign Out
            </SignInButton>
          </CardContent>
        </Card>
      </div>

      <BottomTabBar />
    </div>
  );
}

export default function MorePage() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 p-4 dark:from-violet-950 dark:via-purple-950 dark:to-fuchsia-950">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="text-6xl">✨</div>
            <h1 className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              Profile & More
            </h1>
            <p className="text-purple-700 dark:text-purple-300">
              Sign in to customize your profile and track achievements
            </p>
            <SignInButton size="lg" className="w-full text-lg font-bold" />
          </div>
        </div>
      </Unauthenticated>
      <AuthLoading>
        <div className="flex min-h-screen items-center justify-center">
          <Skeleton className="h-96 w-full max-w-2xl" />
        </div>
      </AuthLoading>
      <Authenticated>
        <MoreInner />
      </Authenticated>
    </>
  );
}
