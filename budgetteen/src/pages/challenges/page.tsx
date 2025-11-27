import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";
import { 
  TrophyIcon,
  CalendarIcon,
  ArrowLeftIcon,
  SparklesIcon,
  CheckCircleIcon,
  ClockIcon,
  GiftIcon,
  ZapIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Id } from "@/convex/_generated/dataModel.d.ts";

export default function ChallengesPage() {
  const navigate = useNavigate();
  const weeklyChallenges = useQuery(api.challenges.getActiveChallenges, { period: "weekly" });
  const monthlyChallenges = useQuery(api.challenges.getActiveChallenges, { period: "monthly" });
  const stats = useQuery(api.challenges.getChallengeStats);
  
  const claimReward = useMutation(api.challenges.claimReward);
  const [claimingId, setClaimingId] = useState<Id<"userChallenges"> | null>(null);

  const handleClaimReward = async (userChallengeId: Id<"userChallenges">, title: string) => {
    setClaimingId(userChallengeId);
    try {
      const result = await claimReward({ userChallengeId });
      toast.success(`Challenge completed! +${result.xpAwarded} XP! 🎉`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to claim reward");
      }
    } finally {
      setClaimingId(null);
    }
  };

  type ChallengeType = NonNullable<typeof weeklyChallenges>[number];
  
  const renderChallenge = (challenge: ChallengeType) => {
    const progressPercent = (challenge.progress / challenge.target) * 100;
    const isCompleted = challenge.isCompleted;
    const isClaimed = challenge.claimedReward;

    return (
      <Card key={challenge.id} className={`relative overflow-hidden ${isCompleted && !isClaimed ? "border-2 border-yellow-400 dark:border-yellow-600" : ""}`}>
        {isCompleted && !isClaimed && (
          <div className="absolute right-0 top-0">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 text-xs font-bold text-white">
              READY TO CLAIM
            </div>
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{challenge.emoji}</div>
              <div>
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                <CardDescription className="mt-1">{challenge.description}</CardDescription>
              </div>
            </div>
            {isCompleted ? (
              <Badge variant="secondary" className="gap-1 bg-green-600 text-white">
                <CheckCircleIcon className="size-3" />
                Done
              </Badge>
            ) : (
              <Badge variant="secondary">Active</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-bold">
                {Math.min(challenge.progress, challenge.target)} / {challenge.target}
              </span>
            </div>
            <Progress 
              value={Math.min(progressPercent, 100)} 
              className="h-3"
              indicatorClassName={isCompleted ? "bg-green-500" : "bg-blue-500"}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <GiftIcon className="size-5 text-purple-600 dark:text-purple-400" />
              <span className="font-semibold">Reward</span>
            </div>
            <Badge variant="secondary" className="gap-1 bg-purple-600 text-white">
              <ZapIcon className="size-3" />
              +{challenge.xpReward} XP
            </Badge>
          </div>
          {isCompleted && !isClaimed && challenge.userChallengeId && (
            <Button
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 font-bold text-white hover:from-yellow-500 hover:to-orange-500"
              onClick={() => challenge.userChallengeId && handleClaimReward(challenge.userChallengeId, challenge.title)}
              disabled={claimingId === challenge.userChallengeId}
            >
              {claimingId === challenge.userChallengeId ? "Claiming..." : "Claim Reward 🎉"}
            </Button>
          )}
          {isClaimed && (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-green-100 p-3 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
              <CheckCircleIcon className="size-4" />
              Reward Claimed
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (weeklyChallenges === undefined || monthlyChallenges === undefined || stats === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 p-4">
        <div className="mx-auto max-w-4xl space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  const hasUnclaimedRewards = stats.unclaimedRewards > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
      <div className="mx-auto max-w-4xl p-4 pb-24">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                Challenges
              </h1>
              <p className="mt-1 text-sm text-orange-700 dark:text-orange-300">
                Complete challenges to earn bonus XP and level up faster
              </p>
            </div>
            {hasUnclaimedRewards && (
              <Badge variant="default" className="gap-1 bg-gradient-to-r from-yellow-400 to-orange-400">
                <GiftIcon className="size-3" />
                {stats.unclaimedRewards} to claim
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <Card className="border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:border-purple-700 dark:from-purple-950/50 dark:to-pink-950/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg text-purple-900 dark:text-purple-100">
                <TrophyIcon className="size-5" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalCompleted}</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 dark:border-yellow-700 dark:from-yellow-950/50 dark:to-orange-950/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg text-yellow-900 dark:text-yellow-100">
                <GiftIcon className="size-5" />
                Unclaimed Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.unclaimedRewards}</p>
            </CardContent>
          </Card>
        </div>

        {/* Challenges Tabs */}
        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly" className="gap-2">
              <CalendarIcon className="size-4" />
              Weekly ({weeklyChallenges.length})
            </TabsTrigger>
            <TabsTrigger value="monthly" className="gap-2">
              <ClockIcon className="size-4" />
              Monthly ({monthlyChallenges.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            {weeklyChallenges.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="mb-4 text-6xl">🗓️</div>
                  <h3 className="mb-2 text-xl font-semibold">No Weekly Challenges</h3>
                  <p className="text-center text-muted-foreground">
                    Weekly challenges will be available soon. Check back later!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {weeklyChallenges.map((challenge) => renderChallenge(challenge))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            {monthlyChallenges.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="mb-4 text-6xl">📅</div>
                  <h3 className="mb-2 text-xl font-semibold">No Monthly Challenges</h3>
                  <p className="text-center text-muted-foreground">
                    Monthly challenges will be available soon. Check back later!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {monthlyChallenges.map((challenge) => renderChallenge(challenge))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <Card className="mt-6 border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 dark:border-blue-700 dark:from-blue-950/50 dark:to-cyan-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <SparklesIcon className="size-5" />
              Challenge Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>💡 Challenges reset automatically - weekly ones every Monday, monthly ones on the 1st</p>
            <p>🎯 Complete challenges to earn bonus XP and level up faster</p>
            <p>🏆 Don't forget to claim your rewards after completing challenges</p>
            <p>⚡ Focus on easier challenges first to build momentum</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
