import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";
import { 
  PlusIcon, 
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  TagIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  SparklesIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Id, Doc } from "@/convex/_generated/dataModel.d.ts";

const COMMON_EMOJIS = {
  income: ["💵", "💰", "💳", "🏦", "💸", "💴", "💶", "💷", "🤑", "💎", "🎁", "📈", "⭐", "🏆", "👔"],
  expense: ["🛒", "🍔", "☕", "🚗", "🏠", "💊", "🎮", "📱", "👕", "✈️", "🎬", "📚", "⚽", "🎵", "🐕"]
};

const COLOR_OPTIONS = [
  { name: "Red", value: "bg-red-500", class: "bg-red-500" },
  { name: "Orange", value: "bg-orange-500", class: "bg-orange-500" },
  { name: "Yellow", value: "bg-yellow-500", class: "bg-yellow-500" },
  { name: "Green", value: "bg-green-500", class: "bg-green-500" },
  { name: "Blue", value: "bg-blue-500", class: "bg-blue-500" },
  { name: "Purple", value: "bg-purple-500", class: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500", class: "bg-pink-500" },
  { name: "Indigo", value: "bg-indigo-500", class: "bg-indigo-500" },
];

interface CategoryFormData {
  name: string;
  emoji: string;
  color: string;
  type: "income" | "expense";
}

export default function CategoriesPage() {
  const navigate = useNavigate();
  const categories = useQuery(api.categories.getAll);
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{ id: Id<"categories">; data: CategoryFormData } | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    emoji: "💰",
    color: "bg-blue-500",
    type: "income"
  });

  const addCategory = useMutation(api.categories.add);
  const updateCategory = useMutation(api.categories.update);
  const deleteCategory = useMutation(api.categories.remove);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      if (editingCategory) {
        await updateCategory({
          id: editingCategory.id,
          name: formData.name,
          emoji: formData.emoji,
          color: formData.color,
        });
        toast.success("Category updated!");
        setEditingCategory(null);
      } else {
        await addCategory(formData);
        toast.success("Category created!");
        setShowAddDialog(false);
      }
      
      setFormData({
        name: "",
        emoji: "💰",
        color: "bg-blue-500",
        type: "income"
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to save category");
      }
    }
  };

  const handleEdit = (id: Id<"categories">, category: Doc<"categories">) => {
    setEditingCategory({
      id,
      data: {
        name: category.name,
        emoji: category.emoji,
        color: category.color,
        type: category.type,
      }
    });
    setFormData({
      name: category.name,
      emoji: category.emoji,
      color: category.color,
      type: category.type,
    });
  };

  const handleDelete = async (id: Id<"categories">, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      return;
    }

    try {
      await deleteCategory({ id });
      toast.success("Category deleted");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete category");
      }
    }
  };

  const incomeCategories = categories?.filter(c => c.type === "income") || [];
  const expenseCategories = categories?.filter(c => c.type === "expense") || [];

  if (categories === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 p-4">
        <div className="mx-auto max-w-4xl space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

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
                Custom Categories
              </h1>
              <p className="mt-1 text-sm text-orange-700 dark:text-orange-300">
                Create and manage your own income and expense categories
              </p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={(open) => {
              setShowAddDialog(open);
              if (!open) {
                setFormData({
                  name: "",
                  emoji: "💰",
                  color: "bg-blue-500",
                  type: "income"
                });
              }
            }}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <PlusIcon className="size-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>
                    Add a custom category for tracking income or expenses
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Tabs value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val as "income" | "expense" })}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="income">💵 Income</TabsTrigger>
                        <TabsTrigger value="expense">💸 Expense</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Babysitting, Gifts"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Choose an Emoji</Label>
                    <div className="grid grid-cols-8 gap-2">
                      {COMMON_EMOJIS[formData.type].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-2xl transition-all hover:scale-110 ${
                            formData.emoji === emoji 
                              ? "border-orange-500 bg-orange-100 dark:bg-orange-900" 
                              : "border-gray-200 hover:border-orange-300 dark:border-gray-700"
                          }`}
                          onClick={() => setFormData({ ...formData, emoji })}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Or enter custom emoji"
                        value={formData.emoji}
                        onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                        className="w-24 text-center text-2xl"
                        maxLength={2}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Choose a Color</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {COLOR_OPTIONS.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          className={`flex h-12 items-center justify-center rounded-lg border-2 ${color.class} ${
                            formData.color === color.value 
                              ? "scale-110 border-white ring-2 ring-orange-500" 
                              : "border-transparent"
                          }`}
                          onClick={() => setFormData({ ...formData, color: color.value })}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Create Category
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowAddDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={editingCategory !== null} onOpenChange={(open) => {
          if (!open) {
            setEditingCategory(null);
            setFormData({
              name: "",
              emoji: "💰",
              color: "bg-blue-500",
              type: "income"
            });
          }
        }}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update your category details
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  placeholder="e.g., Babysitting, Gifts"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Choose an Emoji</Label>
                <div className="grid grid-cols-8 gap-2">
                  {COMMON_EMOJIS[formData.type].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-2xl transition-all hover:scale-110 ${
                        formData.emoji === emoji 
                          ? "border-orange-500 bg-orange-100 dark:bg-orange-900" 
                          : "border-gray-200 hover:border-orange-300 dark:border-gray-700"
                      }`}
                      onClick={() => setFormData({ ...formData, emoji })}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Or enter custom emoji"
                    value={formData.emoji}
                    onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                    className="w-24 text-center text-2xl"
                    maxLength={2}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Choose a Color</Label>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      className={`flex h-12 items-center justify-center rounded-lg border-2 ${color.class} ${
                        formData.color === color.value 
                          ? "scale-110 border-white ring-2 ring-orange-500" 
                          : "border-transparent"
                      }`}
                      onClick={() => setFormData({ ...formData, color: color.value })}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditingCategory(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Categories List */}
        <Tabs defaultValue="expense" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expense" className="gap-2">
              <TrendingDownIcon className="size-4" />
              Expenses ({expenseCategories.length})
            </TabsTrigger>
            <TabsTrigger value="income" className="gap-2">
              <TrendingUpIcon className="size-4" />
              Income ({incomeCategories.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expense" className="space-y-4">
            {expenseCategories.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="mb-4 text-6xl">💸</div>
                  <h3 className="mb-2 text-xl font-semibold">No Expense Categories</h3>
                  <p className="mb-4 text-center text-muted-foreground">
                    Create your first expense category to start tracking spending
                  </p>
                  <Button onClick={() => {
                    setFormData({ ...formData, type: "expense" });
                    setShowAddDialog(true);
                  }} className="gap-2">
                    <PlusIcon className="size-4" />
                    Add Expense Category
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {expenseCategories.map((category) => (
                  <Card key={category._id} className="group relative overflow-hidden">
                    <div className={`absolute inset-0 ${category.color} opacity-10`} />
                    <CardHeader className="relative">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${category.color} text-2xl`}>
                            {category.emoji}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1 gap-1 text-xs">
                              <TagIcon className="size-3" />
                              Expense
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category._id, category)}
                          >
                            <PencilIcon className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(category._id, category.name)}
                          >
                            <TrashIcon className="size-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="income" className="space-y-4">
            {incomeCategories.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="mb-4 text-6xl">💰</div>
                  <h3 className="mb-2 text-xl font-semibold">No Income Categories</h3>
                  <p className="mb-4 text-center text-muted-foreground">
                    Create your first income category to start tracking earnings
                  </p>
                  <Button onClick={() => {
                    setFormData({ ...formData, type: "income" });
                    setShowAddDialog(true);
                  }} className="gap-2">
                    <PlusIcon className="size-4" />
                    Add Income Category
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {incomeCategories.map((category) => (
                  <Card key={category._id} className="group relative overflow-hidden">
                    <div className={`absolute inset-0 ${category.color} opacity-10`} />
                    <CardHeader className="relative">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${category.color} text-2xl`}>
                            {category.emoji}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1 gap-1 text-xs">
                              <TagIcon className="size-3" />
                              Income
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category._id, category)}
                          >
                            <PencilIcon className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(category._id, category.name)}
                          >
                            <TrashIcon className="size-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <Card className="mt-6 border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:border-purple-700 dark:from-purple-950/50 dark:to-pink-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
              <SparklesIcon className="size-5" />
              Category Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>💡 Create categories that match your lifestyle and spending habits</p>
            <p>🎨 Use distinctive emojis and colors to quickly identify categories</p>
            <p>📊 Keep your categories organized - too many can be overwhelming</p>
            <p>⚠️ You can't delete categories that are being used in transactions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
