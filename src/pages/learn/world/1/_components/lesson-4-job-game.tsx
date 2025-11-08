import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { CoinsIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface Props {
  onComplete: () => void;
}

interface Job {
  id: number;
  title: string;
  emoji: string;
  description: string;
  coinsPerHour: number;
  skill: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Dog Walker",
    emoji: "🐕",
    description: "Take neighborhood dogs for walks and play with them",
    coinsPerHour: 10,
    skill: "Love for animals",
  },
  {
    id: 2,
    title: "Lawn Mower",
    emoji: "🌱",
    description: "Mow lawns and keep yards looking neat and tidy",
    coinsPerHour: 15,
    skill: "Physical work",
  },
  {
    id: 3,
    title: "Tutor",
    emoji: "📚",
    description: "Help younger students with homework and studying",
    coinsPerHour: 20,
    skill: "Good at school",
  },
  {
    id: 4,
    title: "Babysitter",
    emoji: "👶",
    description: "Watch and play with young children while parents are away",
    coinsPerHour: 12,
    skill: "Responsibility",
  },
  {
    id: 5,
    title: "Artist",
    emoji: "🎨",
    description: "Create and sell your artwork, paintings, or crafts",
    coinsPerHour: 18,
    skill: "Creativity",
  },
  {
    id: 6,
    title: "Tech Helper",
    emoji: "💻",
    description: "Help people with computers, phones, and technology",
    coinsPerHour: 25,
    skill: "Tech skills",
  },
];

export default function Lesson4JobGame({ onComplete }: Props) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [hasCompletedWork, setHasCompletedWork] = useState(false);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setHoursWorked(0);
    setTotalEarned(0);
    setHasCompletedWork(false);
  };

  const handleWork = (hours: number) => {
    if (selectedJob) {
      const newHours = hoursWorked + hours;
      const earned = newHours * selectedJob.coinsPerHour;
      setHoursWorked(newHours);
      setTotalEarned(earned);
      setHasCompletedWork(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 p-4 dark:from-amber-950 dark:to-orange-950">
      <div className="mx-auto max-w-5xl py-8">
        <Card className="border-4 border-amber-300 dark:border-amber-700">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-amber-900 dark:text-amber-100">
              💼 Job Fair Day!
            </CardTitle>
            <p className="text-center text-lg text-muted-foreground">
              Explore different jobs and see how people earn money
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {!selectedJob ? (
              <>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    Choose a job you'd like to try!
                  </h3>
                  <p className="text-muted-foreground">
                    Each job pays different coins per hour
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {jobs.map((job) => (
                    <Card
                      key={job.id}
                      className="cursor-pointer border-2 border-transparent transition-all hover:scale-105 hover:border-amber-400 hover:shadow-lg"
                      onClick={() => handleSelectJob(job)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-6xl mb-3">{job.emoji}</div>
                        <h4 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                          {job.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {job.description}
                        </p>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <CoinsIcon className="size-5 text-yellow-600" />
                          <span className="text-lg font-bold text-green-600">
                            {job.coinsPerHour} coins/hour
                          </span>
                        </div>
                        <div className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-900 dark:text-blue-100">
                          {job.skill}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <>
                <Card className="border-2 border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-6xl">{selectedJob.emoji}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                          {selectedJob.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {selectedJob.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-green-100 dark:bg-green-900/30 p-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Hourly Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          {selectedJob.coinsPerHour} coins/hour
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Hours Worked</p>
                        <p className="text-2xl font-bold text-foreground">{hoursWorked}h</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Total Earned</p>
                        <p className="text-3xl font-bold text-amber-600">{totalEarned} 🪙</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-center text-foreground">
                    How many hours would you like to work?
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-4">
                    {[1, 2, 4, 8].map((hours) => (
                      <Button
                        key={hours}
                        size="lg"
                        className={cn(
                          "h-20 text-xl font-bold",
                          hoursWorked >= hours
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600",
                        )}
                        onClick={() => handleWork(hours)}
                      >
                        Work {hours} {hours === 1 ? "Hour" : "Hours"}
                        <br />
                        <span className="text-sm">
                          +{hours * selectedJob.coinsPerHour} coins
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {hasCompletedWork && (
                  <Card className="border-2 border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/30">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="text-4xl">🎉</div>
                      <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">
                        Great Work!
                      </h3>
                      <p className="text-lg text-foreground">
                        You earned <strong>{totalEarned} coins</strong> by working {hoursWorked}{" "}
                        {hoursWorked === 1 ? "hour" : "hours"} as a {selectedJob.title}!
                      </p>
                      <p className="text-muted-foreground">
                        Different jobs pay different amounts. Some require special skills,
                        some are harder work, and some take more time to learn!
                      </p>
                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setSelectedJob(null)}
                        >
                          Try Another Job
                        </Button>
                        <Button
                          size="lg"
                          className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                          onClick={onComplete}
                        >
                          Complete Lesson! ⭐⭐
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
