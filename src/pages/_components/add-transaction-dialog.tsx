import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
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

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "income" | "expense";
}

export default function AddTransactionDialog({
  open,
  onOpenChange,
  type,
}: AddTransactionDialogProps) {
  const categories = useQuery(api.categories.getByType, { type });
  const addTransaction = useMutation(api.transactions.add);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory || !categories) {
      toast.error("Please select a category");
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);

    try {
      const category = categories.find((c) => c._id === selectedCategory);
      if (!category) {
        throw new Error("Category not found");
      }

      await addTransaction({
        type,
        amount: amountNum,
        category: category.name,
        emoji: category.emoji,
        description: description || category.name,
      });

      const messages = {
        income: [
          "Ka-ching! 💰",
          "Money in the bank! 🏦",
          "Nice! Keep it up! 🎉",
          "You're making bank! 💵",
        ],
        expense: [
          "Tracked! Stay mindful 🎯",
          "Got it! Spend wisely 💡",
          "Logged! Watch your budget 👀",
          "Noted! Keep an eye on spending 📊",
        ],
      };

      const randomMessage =
        messages[type][Math.floor(Math.random() * messages[type].length)];

      toast.success(randomMessage);

      setAmount("");
      setDescription("");
      setSelectedCategory(null);
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to add transaction");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryColors = {
    income: "from-green-500 to-emerald-500",
    expense: "from-pink-500 to-rose-500",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {type === "income" ? "Add Income 💵" : "Add Expense 💸"}
          </DialogTitle>
          <DialogDescription>
            {type === "income"
              ? "Track your earnings and watch your balance grow!"
              : "Keep track of your spending to stay on budget!"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories?.map((category) => (
                <Button
                  key={category._id}
                  type="button"
                  variant={
                    selectedCategory === category._id ? "default" : "outline"
                  }
                  className={
                    selectedCategory === category._id
                      ? `bg-gradient-to-r ${categoryColors[type]} font-bold`
                      : ""
                  }
                  onClick={() => setSelectedCategory(category._id)}
                >
                  <span className="mr-2 text-xl">{category.emoji}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              placeholder="Add a note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className={`w-full bg-gradient-to-r ${categoryColors[type]} text-lg font-bold`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : `Add ${type === "income" ? "Income" : "Expense"}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
