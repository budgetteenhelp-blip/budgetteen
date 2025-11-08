import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import Avatar from "./avatar.tsx";

export default function ProfileAvatarButton() {
  const user = useQuery(api.users.getCurrentUser);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full p-1 hover:scale-110 transition-transform"
      onClick={() => navigate("/profile")}
      title="Customize Avatar"
    >
      <Avatar
        skinTone={user.avatarSkinTone}
        hairStyle={user.avatarHairStyle}
        hairColor={user.avatarHairColor}
        outfit={user.avatarOutfit}
        accessory={user.avatarAccessory}
        faceExpression={user.avatarFaceExpression}
        size="sm"
        animate={false}
      />
    </Button>
  );
}
