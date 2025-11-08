import { useState } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ArrowLeftIcon, CheckIcon, LockIcon, SparklesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";
import Avatar from "@/components/avatar.tsx";

interface CustomizationOption {
  id: string;
  name: string;
  unlockLevel: number;
  preview: string;
}

const SKIN_TONES: CustomizationOption[] = [
  { id: "light", name: "Light", unlockLevel: 0, preview: "#FFE0BD" },
  { id: "medium", name: "Medium", unlockLevel: 0, preview: "#F1C27D" },
  { id: "tan", name: "Tan", unlockLevel: 0, preview: "#D4A574" },
  { id: "brown", name: "Brown", unlockLevel: 0, preview: "#8D5524" },
  { id: "dark", name: "Dark", unlockLevel: 0, preview: "#5C4033" },
];

const HAIR_STYLES: CustomizationOption[] = [
  { id: "short", name: "Short", unlockLevel: 0, preview: "✂️" },
  { id: "long", name: "Long", unlockLevel: 1, preview: "💇" },
  { id: "curly", name: "Curly", unlockLevel: 2, preview: "🌀" },
  { id: "ponytail", name: "Ponytail", unlockLevel: 3, preview: "🎀" },
  { id: "mohawk", name: "Mohawk", unlockLevel: 5, preview: "🔥" },
];

const HAIR_COLORS: CustomizationOption[] = [
  { id: "#4A2511", name: "Brown", unlockLevel: 0, preview: "#4A2511" },
  { id: "#000000", name: "Black", unlockLevel: 0, preview: "#000000" },
  { id: "#FFD700", name: "Blonde", unlockLevel: 1, preview: "#FFD700" },
  { id: "#DC143C", name: "Red", unlockLevel: 2, preview: "#DC143C" },
  { id: "#9B59B6", name: "Purple", unlockLevel: 4, preview: "#9B59B6" },
  { id: "#3498DB", name: "Blue", unlockLevel: 5, preview: "#3498DB" },
];

const OUTFITS: CustomizationOption[] = [
  { id: "casual", name: "Casual", unlockLevel: 0, preview: "👕" },
  { id: "sporty", name: "Sporty", unlockLevel: 2, preview: "🏃" },
  { id: "formal", name: "Formal", unlockLevel: 4, preview: "👔" },
  { id: "superhero", name: "Superhero", unlockLevel: 6, preview: "🦸" },
];

const ACCESSORIES: CustomizationOption[] = [
  { id: "none", name: "None", unlockLevel: 0, preview: "❌" },
  { id: "glasses", name: "Glasses", unlockLevel: 1, preview: "👓" },
  { id: "headphones", name: "Headphones", unlockLevel: 3, preview: "🎧" },
  { id: "cap", name: "Cap", unlockLevel: 4, preview: "🧢" },
  { id: "crown", name: "Crown", unlockLevel: 7, preview: "👑" },
];

const FACE_EXPRESSIONS: CustomizationOption[] = [
  { id: "happy", name: "Happy", unlockLevel: 0, preview: "😊" },
  { id: "excited", name: "Excited", unlockLevel: 1, preview: "🤩" },
  { id: "cool", name: "Cool", unlockLevel: 2, preview: "😎" },
  { id: "determined", name: "Determined", unlockLevel: 3, preview: "😤" },
];

function ProfileInner() {
  const navigate = useNavigate();
  const user = useQuery(api.users.getCurrentUser);
  const unlockedItems = useQuery(api.profile.getUnlockedItems);
  const updateAvatar = useMutation(api.profile.updateAvatar);
  const unlockItem = useMutation(api.profile.unlockItem);

  const [selectedCategory, setSelectedCategory] = useState<
    "skin" | "hair" | "outfit" | "accessories" | "expression"
  >("outfit");

  const [previewAvatar, setPreviewAvatar] = useState({
    skinTone: user?.avatarSkinTone || "medium",
    hairStyle: user?.avatarHairStyle || "short",
    hairColor: user?.avatarHairColor || "#4A2511",
    outfit: user?.avatarOutfit || "casual",
    accessory: user?.avatarAccessory || "none",
    faceExpression: user?.avatarFaceExpression || "happy",
  });

  const userLevel = user?.level || 1;
  const userXP = user?.xp || 0;

  const handleSave = async () => {
    try {
      await updateAvatar({
        skinTone: previewAvatar.skinTone,
        hairStyle: previewAvatar.hairStyle,
        hairColor: previewAvatar.hairColor,
        outfit: previewAvatar.outfit,
        accessory: previewAvatar.accessory,
        faceExpression: previewAvatar.faceExpression,
      });
      toast.success("Avatar updated! 🎨");
    } catch (error) {
      toast.error("Failed to update avatar");
      console.error(error);
    }
  };

  const handleUnlock = async (itemId: string) => {
    try {
      const result = await unlockItem({ itemId });
      if (result.alreadyUnlocked) {
        toast.info("You already unlocked this!");
      } else {
        toast.success("Item unlocked! ✨");
      }
    } catch (error) {
      toast.error("Failed to unlock item");
      console.error(error);
    }
  };

  const isUnlocked = (itemId: string, unlockLevel: number) => {
    return userLevel >= unlockLevel || unlockedItems?.includes(itemId);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  const categories = [
    { id: "outfit" as const, name: "Outfit", emoji: "👕" },
    { id: "skin" as const, name: "Skin", emoji: "🎨" },
    { id: "hair" as const, name: "Hair", emoji: "💇" },
    { id: "accessories" as const, name: "Accessories", emoji: "👓" },
    { id: "expression" as const, name: "Expression", emoji: "😊" },
  ];

  const getOptions = () => {
    switch (selectedCategory) {
      case "skin":
        return SKIN_TONES;
      case "hair":
        return [...HAIR_STYLES, ...HAIR_COLORS];
      case "outfit":
        return OUTFITS;
      case "accessories":
        return ACCESSORIES;
      case "expression":
        return FACE_EXPRESSIONS;
    }
  };

  const handleOptionSelect = (option: CustomizationOption) => {
    if (!isUnlocked(option.id, option.unlockLevel)) {
      return;
    }

    const newAvatar = { ...previewAvatar };
    switch (selectedCategory) {
      case "skin":
        newAvatar.skinTone = option.id;
        break;
      case "hair":
        if (HAIR_STYLES.some((s) => s.id === option.id)) {
          newAvatar.hairStyle = option.id;
        } else {
          newAvatar.hairColor = option.id;
        }
        break;
      case "outfit":
        newAvatar.outfit = option.id;
        break;
      case "accessories":
        newAvatar.accessory = option.id;
        break;
      case "expression":
        newAvatar.faceExpression = option.id;
        break;
    }
    setPreviewAvatar(newAvatar);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950">
      <div className="mx-auto max-w-6xl p-4 pb-24 md:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Level {userLevel} • {userXP} XP
            </div>
          </div>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Customize Your Avatar
          </h1>
          <p className="text-muted-foreground">
            Express yourself and unlock new items by leveling up!
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Avatar Preview */}
          <Card className="border-2 border-purple-300 dark:border-purple-700">
            <CardHeader>
              <CardTitle className="text-center">Your Avatar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <Avatar
                  skinTone={previewAvatar.skinTone}
                  hairStyle={previewAvatar.hairStyle}
                  hairColor={previewAvatar.hairColor}
                  outfit={previewAvatar.outfit}
                  accessory={previewAvatar.accessory}
                  faceExpression={previewAvatar.faceExpression}
                  size="xl"
                  animate={true}
                />
              </div>

              <div className="space-y-2">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={handleSave}
                >
                  <CheckIcon className="mr-2 size-5" />
                  Save Avatar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customization Options */}
          <Card className="border-2 border-pink-300 dark:border-pink-700">
            <CardHeader>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span className="mr-1">{cat.emoji}</span>
                    {cat.name}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {getOptions().map((option) => {
                  const unlocked = isUnlocked(option.id, option.unlockLevel);
                  const isSelected =
                    (selectedCategory === "skin" &&
                      option.id === previewAvatar.skinTone) ||
                    (selectedCategory === "hair" &&
                      (option.id === previewAvatar.hairStyle ||
                        option.id === previewAvatar.hairColor)) ||
                    (selectedCategory === "outfit" &&
                      option.id === previewAvatar.outfit) ||
                    (selectedCategory === "accessories" &&
                      option.id === previewAvatar.accessory) ||
                    (selectedCategory === "expression" &&
                      option.id === previewAvatar.faceExpression);

                  return (
                    <Card
                      key={option.id}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-lg p-4",
                        isSelected && "border-2 border-purple-500 bg-purple-50 dark:bg-purple-950/30",
                        !unlocked && "opacity-50"
                      )}
                      onClick={() => {
                        if (unlocked) {
                          handleOptionSelect(option);
                        } else {
                          toast.error(`Unlock at Level ${option.unlockLevel}`);
                        }
                      }}
                    >
                      <div className="text-center space-y-2">
                        <div className="text-3xl">
                          {option.preview.startsWith("#") ? (
                            <div
                              className="w-12 h-12 rounded-full mx-auto border-2 border-gray-300"
                              style={{ backgroundColor: option.preview }}
                            />
                          ) : (
                            option.preview
                          )}
                        </div>
                        <p className="text-sm font-semibold">{option.name}</p>
                        {!unlocked && (
                          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                            <LockIcon className="size-3" />
                            <span>Lvl {option.unlockLevel}</span>
                          </div>
                        )}
                        {isSelected && (
                          <div className="flex items-center justify-center">
                            <CheckIcon className="size-4 text-purple-600" />
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Info */}
        <Card className="mt-6 border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 dark:border-blue-700 dark:from-blue-950/50 dark:to-cyan-950/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <SparklesIcon className="size-5" />
              Unlock More Items!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-foreground">
              Complete lessons, earn XP, and level up to unlock awesome new customization options for your avatar!
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="flex items-center gap-2 p-3 bg-background rounded-lg">
                <span className="text-2xl">🎓</span>
                <div>
                  <p className="font-semibold text-sm">Complete Lessons</p>
                  <p className="text-xs text-muted-foreground">Earn XP and level up</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-background rounded-lg">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-semibold text-sm">Earn Stars</p>
                  <p className="text-xs text-muted-foreground">Master every world</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <>
      <Unauthenticated>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4 text-center">
              <div className="text-6xl">🎨</div>
              <CardTitle className="text-3xl font-bold">
                Profile & Avatar
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to customize your avatar and manage your profile!
              </p>
            </CardHeader>
            <CardContent>
              <SignInButton size="lg" className="w-full" />
            </CardContent>
          </Card>
        </div>
      </Unauthenticated>
      <AuthLoading>
        <div className="flex min-h-screen items-center justify-center">
          <Skeleton className="h-96 w-full max-w-4xl" />
        </div>
      </AuthLoading>
      <Authenticated>
        <ProfileInner />
      </Authenticated>
    </>
  );
}
