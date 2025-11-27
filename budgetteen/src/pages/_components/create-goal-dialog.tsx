import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { toast } from "sonner";

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GOAL_EMOJIS = [
  "🎮", // Gaming
  "📱", // Phone
  "🎧", // Headphones
  "👟", // Sneakers
  "🎸", // Music
  "🚗", // Car
  "✈️", // Travel
  "🎓", // Education
  "💻", // Computer
  "📚", // Books
  "🎨", // Art
  "⚽", // Sports
];

export default function CreateGoalDialog({
  open,
  onOpenChange,
}: CreateGoalDialogProps) {
  const createGoal = useMutation(api.goals.create);

  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎯");
  const [deadline, setDeadline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseFloat(targetAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid target amount");
      return;
    }

    if (title.trim().length === 0) {
      toast.error("Please enter a goal title");
      return;
    }

    setIsSubmitting(true);

    try {
      await createGoal({
        title: title.trim(),
        targetAmount: amount,
        emoji: selectedEmoji,
        deadline: deadline ? new Date(deadline).getTime() : undefined,
      });

      const messages = [
        "Goal created! Let's crush it! 💪",
        "Awesome goal! You got this! 🎯",
        "Great start! Keep saving! 🌟",
        "Nice! Time to make it happen! 🚀",
      ];
      toast.success(messages[Math.floor(Math.random() * messages.length)]);

      setTitle("");
      setTargetAmount("");
      setSelectedEmoji("🎯");
      setDeadline("");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create goal");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create a Savings Goal 🎯</DialogTitle>
          <DialogDescription>
            Set a target and watch your progress grow!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Name</Label>
            <Input
              id="title"
              placeholder="New Phone, Concert Tickets..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount ($)</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="text-2xl font-bold"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Choose an Emoji</Label>
            <div className="grid grid-cols-6 gap-2">
              {GOAL_EMOJIS.map((emoji) => (
                <Button
                  key={emoji}
                  type="button"
                  variant={selectedEmoji === emoji ? "default" : "outline"}
                  className={
                    selectedEmoji === emoji
                      ? "h-12 bg-gradient-to-r from-purple-500 to-violet-500 text-2xl hover:from-purple-600 hover:to-violet-600"
                      : "h-12 text-2xl"
                  }
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline (optional)</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-lg font-bold hover:from-purple-600 hover:to-violet-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Goal 🚀"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
