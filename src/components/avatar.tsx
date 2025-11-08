import { motion } from "motion/react";

interface AvatarProps {
  skinTone?: string;
  hairStyle?: string;
  hairColor?: string;
  outfit?: string;
  accessory?: string;
  faceExpression?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}

const SKIN_TONES: Record<string, { base: string; shadow: string; highlight: string }> = {
  light: { base: "#FFE0BD", shadow: "#EFCCA6", highlight: "#FFF0DC" },
  medium: { base: "#F1C27D", shadow: "#D9AA5E", highlight: "#FFD99F" },
  tan: { base: "#D4A574", shadow: "#B8895A", highlight: "#E8BA8B" },
  brown: { base: "#8D5524", shadow: "#6B3F17", highlight: "#A66B32" },
  dark: { base: "#5C4033", shadow: "#3D2A22", highlight: "#785347" },
};

const HAIR_COLORS: Record<string, { base: string; shadow: string; highlight: string }> = {
  "#4A2511": { base: "#4A2511", shadow: "#2A1508", highlight: "#6B3820" },
  "#000000": { base: "#1A1A1A", shadow: "#000000", highlight: "#3D3D3D" },
  "#FFD700": { base: "#FFD700", shadow: "#D4AF37", highlight: "#FFEB8A" },
  "#DC143C": { base: "#DC143C", shadow: "#A51029", highlight: "#FF4D6B" },
  "#9B59B6": { base: "#9B59B6", shadow: "#7D3C98", highlight: "#BB8FCE" },
  "#3498DB": { base: "#3498DB", shadow: "#2471A3", highlight: "#5DADE2" },
};

export default function Avatar({
  skinTone = "medium",
  hairStyle = "short",
  hairColor = "#4A2511",
  outfit = "casual",
  accessory = "none",
  faceExpression = "happy",
  size = "md",
  animate = true,
}: AvatarProps) {
  const sizeMap = {
    sm: 60,
    md: 100,
    lg: 150,
    xl: 200,
  };

  const avatarSize = sizeMap[size];
  const skin = SKIN_TONES[skinTone] || SKIN_TONES.medium;
  const hair = HAIR_COLORS[hairColor] || HAIR_COLORS["#4A2511"];

  return (
    <motion.div
      className="relative"
      style={{ width: avatarSize, height: avatarSize }}
      initial={animate ? { scale: 0.8, opacity: 0 } : undefined}
      animate={animate ? { scale: 1, opacity: 1 } : undefined}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <svg
        viewBox="0 0 200 240"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          {/* Gradients for depth */}
          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={skin.highlight} />
            <stop offset="50%" stopColor={skin.base} />
            <stop offset="100%" stopColor={skin.shadow} />
          </linearGradient>
          
          <radialGradient id="cheekGradient">
            <stop offset="0%" stopColor="#FF9AA2" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF9AA2" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hair.highlight} />
            <stop offset="60%" stopColor={hair.base} />
            <stop offset="100%" stopColor={hair.shadow} />
          </linearGradient>

          {/* Outfit gradients */}
          <linearGradient id="casualGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6BA3FF" />
            <stop offset="100%" stopColor="#4A90E2" />
          </linearGradient>

          <linearGradient id="sportyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF8A8A" />
            <stop offset="100%" stopColor="#FF6B6B" />
          </linearGradient>

          <linearGradient id="formalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3D5A80" />
            <stop offset="100%" stopColor="#2C3E50" />
          </linearGradient>

          <linearGradient id="superheroGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#E74C3C" />
          </linearGradient>
        </defs>

        {/* Body/Outfit - smaller than head for cute proportions */}
        {outfit === "casual" && (
          <g>
            {/* Neck */}
            <ellipse cx="100" cy="135" rx="15" ry="8" fill={skin.shadow} />
            
            {/* T-shirt body */}
            <path
              d="M 70 140 Q 65 145 63 155 L 60 200 Q 60 210 70 210 L 130 210 Q 140 210 140 200 L 137 155 Q 135 145 130 140 Z"
              fill="url(#casualGradient)"
              stroke="#2E5C8A"
              strokeWidth="2"
            />
            
            {/* Sleeves */}
            <ellipse cx="58" cy="150" rx="12" ry="18" fill="url(#casualGradient)" stroke="#2E5C8A" strokeWidth="1.5" />
            <ellipse cx="142" cy="150" rx="12" ry="18" fill="url(#casualGradient)" stroke="#2E5C8A" strokeWidth="1.5" />
            
            {/* Collar detail */}
            <path d="M 90 140 Q 100 143 110 140" stroke="#2E5C8A" strokeWidth="2" fill="none" />
            
            {/* Pocket */}
            <rect x="75" y="165" width="20" height="18" rx="2" fill="#FFFFFF" opacity="0.3" stroke="#2E5C8A" strokeWidth="1" />
            <line x1="77" y1="168" x2="93" y2="168" stroke="#2E5C8A" strokeWidth="0.5" />
          </g>
        )}

        {outfit === "sporty" && (
          <g>
            {/* Neck */}
            <ellipse cx="100" cy="135" rx="15" ry="8" fill={skin.shadow} />
            
            {/* Hoodie */}
            <path
              d="M 70 140 Q 65 145 63 155 L 60 200 Q 60 210 70 210 L 130 210 Q 140 210 140 200 L 137 155 Q 135 145 130 140 Z"
              fill="url(#sportyGradient)"
              stroke="#C53030"
              strokeWidth="2"
            />
            
            {/* Hood */}
            <path d="M 75 140 Q 100 130 125 140" stroke="#C53030" strokeWidth="2.5" fill="none" />
            
            {/* Zipper */}
            <line x1="100" y1="145" x2="100" y2="200" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="100" cy="150" r="3" fill="#E8E8E8" stroke="#AAA" strokeWidth="0.5" />
            <circle cx="100" cy="170" r="3" fill="#E8E8E8" stroke="#AAA" strokeWidth="0.5" />
            <circle cx="100" cy="190" r="3" fill="#E8E8E8" stroke="#AAA" strokeWidth="0.5" />
            
            {/* Sleeves */}
            <ellipse cx="58" cy="150" rx="12" ry="18" fill="url(#sportyGradient)" stroke="#C53030" strokeWidth="1.5" />
            <ellipse cx="142" cy="150" rx="12" ry="18" fill="url(#sportyGradient)" stroke="#C53030" strokeWidth="1.5" />
          </g>
        )}

        {outfit === "formal" && (
          <g>
            {/* Neck */}
            <ellipse cx="100" cy="135" rx="15" ry="8" fill={skin.shadow} />
            
            {/* Suit jacket */}
            <path
              d="M 70 140 Q 65 145 63 155 L 60 200 Q 60 210 70 210 L 130 210 Q 140 210 140 200 L 137 155 Q 135 145 130 140 Z"
              fill="url(#formalGradient)"
              stroke="#1A252F"
              strokeWidth="2"
            />
            
            {/* White shirt */}
            <path d="M 90 145 L 90 210 L 110 210 L 110 145 Z" fill="#FFFFFF" />
            
            {/* Tie */}
            <polygon points="100,145 95,150 95,200 105,200 105,150" fill="#E74C3C" stroke="#C0392B" strokeWidth="1" />
            <polygon points="100,145 92,145 100,155 108,145" fill="#C0392B" />
            
            {/* Lapels */}
            <path d="M 70 140 L 85 155 L 90 145" fill="#2C3E50" stroke="#1A252F" strokeWidth="1" />
            <path d="M 130 140 L 115 155 L 110 145" fill="#2C3E50" stroke="#1A252F" strokeWidth="1" />
            
            {/* Buttons */}
            <circle cx="75" cy="170" r="2.5" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.5" />
            <circle cx="75" cy="185" r="2.5" fill="#D4AF37" stroke="#B8860B" strokeWidth="0.5" />
          </g>
        )}

        {outfit === "superhero" && (
          <g>
            {/* Neck */}
            <ellipse cx="100" cy="135" rx="15" ry="8" fill={skin.shadow} />
            
            {/* Cape flowing behind */}
            <motion.path
              d="M 70 145 Q 30 170 40 220 Q 50 240 60 230"
              fill="#9B59B6"
              opacity="0.7"
              stroke="#7D3C98"
              strokeWidth="1.5"
              animate={animate ? { d: ["M 70 145 Q 30 170 40 220 Q 50 240 60 230", "M 70 145 Q 35 165 45 215 Q 55 235 65 225", "M 70 145 Q 30 170 40 220 Q 50 240 60 230"] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M 130 145 Q 170 170 160 220 Q 150 240 140 230"
              fill="#9B59B6"
              opacity="0.7"
              stroke="#7D3C98"
              strokeWidth="1.5"
              animate={animate ? { d: ["M 130 145 Q 170 170 160 220 Q 150 240 140 230", "M 130 145 Q 165 165 155 215 Q 145 235 135 225", "M 130 145 Q 170 170 160 220 Q 150 240 140 230"] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Superhero suit */}
            <path
              d="M 70 140 Q 65 145 63 155 L 60 200 Q 60 210 70 210 L 130 210 Q 140 210 140 200 L 137 155 Q 135 145 130 140 Z"
              fill="url(#superheroGradient)"
              stroke="#C0392B"
              strokeWidth="2"
            />
            
            {/* Logo circle */}
            <circle cx="100" cy="170" r="18" fill="#F39C12" stroke="#D68910" strokeWidth="2.5" />
            
            {/* Logo letter */}
            <text x="100" y="178" fontSize="22" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#2C3E50" textAnchor="middle">S</text>
            
            {/* Belt */}
            <rect x="65" y="195" width="70" height="8" rx="2" fill="#D68910" stroke="#B8860B" strokeWidth="1" />
            <circle cx="100" cy="199" r="4" fill="#F39C12" stroke="#D68910" strokeWidth="1" />
          </g>
        )}

        {/* Head - bigger for cute proportions */}
        <ellipse cx="100" cy="100" rx="48" ry="52" fill="url(#skinGradient)" stroke={skin.shadow} strokeWidth="2.5" />
        
        {/* Ear shadows for depth */}
        <ellipse cx="60" cy="105" rx="8" ry="12" fill={skin.shadow} opacity="0.4" />
        <ellipse cx="140" cy="105" rx="8" ry="12" fill={skin.shadow} opacity="0.4" />

        {/* Cheeks */}
        <ellipse cx="70" cy="110" rx="12" ry="10" fill="url(#cheekGradient)" />
        <ellipse cx="130" cy="110" rx="12" ry="10" fill="url(#cheekGradient)" />

        {/* Hair - rendered before accessories for layering */}
        {hairStyle === "short" && (
          <g>
            {/* Main hair volume */}
            <motion.ellipse
              cx="100"
              cy="65"
              rx="50"
              ry="32"
              fill="url(#hairGradient)"
              stroke={hair.shadow}
              strokeWidth="2"
              animate={animate ? { ry: [32, 33, 32] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Side volume */}
            <ellipse cx="62" cy="80" rx="18" ry="24" fill={hair.base} opacity="0.9" />
            <ellipse cx="138" cy="80" rx="18" ry="24" fill={hair.base} opacity="0.9" />
            {/* Texture strands */}
            <path d="M 85 55 Q 88 50 90 55" stroke={hair.highlight} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 100 52 Q 103 48 105 52" stroke={hair.highlight} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 110 55 Q 113 50 115 55" stroke={hair.highlight} strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}

        {hairStyle === "long" && (
          <g>
            {/* Top volume */}
            <ellipse cx="100" cy="65" rx="50" ry="32" fill="url(#hairGradient)" stroke={hair.shadow} strokeWidth="2" />
            
            {/* Long flowing sides with animation */}
            <motion.path
              d="M 62 75 Q 55 85 58 110 Q 60 130 65 145"
              fill={hair.base}
              stroke={hair.shadow}
              strokeWidth="2"
              animate={animate ? { d: ["M 62 75 Q 55 85 58 110 Q 60 130 65 145", "M 62 75 Q 53 85 56 110 Q 58 130 63 145", "M 62 75 Q 55 85 58 110 Q 60 130 65 145"] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M 138 75 Q 145 85 142 110 Q 140 130 135 145"
              fill={hair.base}
              stroke={hair.shadow}
              strokeWidth="2"
              animate={animate ? { d: ["M 138 75 Q 145 85 142 110 Q 140 130 135 145", "M 138 75 Q 147 85 144 110 Q 142 130 137 145", "M 138 75 Q 145 85 142 110 Q 140 130 135 145"] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Hair highlights */}
            <path d="M 65 95 Q 62 105 64 120" stroke={hair.highlight} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 135 95 Q 138 105 136 120" stroke={hair.highlight} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
          </g>
        )}

        {hairStyle === "curly" && (
          <g>
            {/* Multiple curls for volume */}
            <motion.circle
              cx="75"
              cy="60"
              r="18"
              fill={hair.base}
              stroke={hair.shadow}
              strokeWidth="2"
              animate={animate ? { cy: [60, 62, 60] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="100"
              cy="55"
              r="20"
              fill={hair.base}
              stroke={hair.shadow}
              strokeWidth="2"
              animate={animate ? { cy: [55, 57, 55] } : undefined}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="125"
              cy="60"
              r="18"
              fill={hair.base}
              stroke={hair.shadow}
              strokeWidth="2"
              animate={animate ? { cy: [60, 62, 60] } : undefined}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Side curls */}
            <circle cx="58" cy="78" r="15" fill={hair.base} stroke={hair.shadow} strokeWidth="2" />
            <circle cx="142" cy="78" r="15" fill={hair.base} stroke={hair.shadow} strokeWidth="2" />
            <circle cx="65" cy="95" r="12" fill={hair.base} opacity="0.9" />
            <circle cx="135" cy="95" r="12" fill={hair.base} opacity="0.9" />
            
            {/* Curl highlights */}
            <circle cx="100" cy="52" r="6" fill={hair.highlight} opacity="0.5" />
            <circle cx="78" cy="58" r="5" fill={hair.highlight} opacity="0.5" />
            <circle cx="122" cy="58" r="5" fill={hair.highlight} opacity="0.5" />
          </g>
        )}

        {hairStyle === "ponytail" && (
          <g>
            {/* Front hair */}
            <ellipse cx="100" cy="65" rx="50" ry="32" fill="url(#hairGradient)" stroke={hair.shadow} strokeWidth="2" />
            
            {/* Ponytail with bounce animation */}
            <motion.ellipse
              cx="145"
              cy="90"
              rx="22"
              ry="42"
              fill={hair.base}
              stroke={hair.shadow}
              strokeWidth="2"
              transform="rotate(20 145 90)"
              animate={animate ? { cy: [90, 95, 90], ry: [42, 40, 42] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Hair tie */}
            <ellipse cx="135" cy="75" rx="8" ry="4" fill="#FF6B9D" stroke="#E74C3C" strokeWidth="1.5" transform="rotate(20 135 75)" />
            
            {/* Ponytail highlights */}
            <motion.path
              d="M 140 75 Q 143 85 145 100"
              stroke={hair.highlight}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
              animate={animate ? { d: ["M 140 75 Q 143 85 145 100", "M 140 75 Q 143 88 147 103", "M 140 75 Q 143 85 145 100"] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}

        {hairStyle === "mohawk" && (
          <g>
            {/* Base hair on sides */}
            <ellipse cx="70" cy="75" rx="15" ry="10" fill={hair.shadow} />
            <ellipse cx="130" cy="75" rx="15" ry="10" fill={hair.shadow} />
            
            {/* Mohawk spike */}
            <motion.path
              d="M 85 70 Q 90 40 95 35 Q 100 30 105 35 Q 110 40 115 70 Z"
              fill="url(#hairGradient)"
              stroke={hair.shadow}
              strokeWidth="2.5"
              animate={animate ? { d: ["M 85 70 Q 90 40 95 35 Q 100 30 105 35 Q 110 40 115 70 Z", "M 85 70 Q 90 38 95 33 Q 100 28 105 33 Q 110 38 115 70 Z", "M 85 70 Q 90 40 95 35 Q 100 30 105 35 Q 110 40 115 70 Z"] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Spiky details */}
            <path d="M 92 55 L 95 45" stroke={hair.highlight} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 100 52 L 100 40" stroke={hair.highlight} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 108 55 L 105 45" stroke={hair.highlight} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* Accessories - rendered on top */}
        {accessory === "glasses" && (
          <g>
            {/* Frames with depth */}
            <ellipse cx="80" cy="95" rx="12" ry="11" fill="rgba(255,255,255,0.2)" stroke="#2C3E50" strokeWidth="2.5" />
            <ellipse cx="120" cy="95" rx="12" ry="11" fill="rgba(255,255,255,0.2)" stroke="#2C3E50" strokeWidth="2.5" />
            
            {/* Bridge */}
            <path d="M 92 95 Q 100 93 108 95" stroke="#2C3E50" strokeWidth="2.5" fill="none" />
            
            {/* Temples */}
            <path d="M 68 95 L 60 98" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 132 95 L 140 98" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Lens glare */}
            <circle cx="75" cy="92" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="115" cy="92" r="3" fill="#FFFFFF" opacity="0.8" />
          </g>
        )}

        {accessory === "headphones" && (
          <g>
            {/* Headband with gradient */}
            <path
              d="M 55 90 Q 55 60 100 58 Q 145 60 145 90"
              stroke="#2C3E50"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 57 90 Q 57 62 100 60 Q 143 62 143 90"
              stroke="#4A5568"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Left ear cup */}
            <ellipse cx="60" cy="95" rx="13" ry="16" fill="#E74C3C" stroke="#C53030" strokeWidth="2.5" />
            <ellipse cx="60" cy="95" rx="9" ry="12" fill="#2C3E50" opacity="0.3" />
            <circle cx="58" cy="92" r="2" fill="#FFFFFF" opacity="0.6" />
            
            {/* Right ear cup */}
            <ellipse cx="140" cy="95" rx="13" ry="16" fill="#E74C3C" stroke="#C53030" strokeWidth="2.5" />
            <ellipse cx="140" cy="95" rx="9" ry="12" fill="#2C3E50" opacity="0.3" />
            <circle cx="138" cy="92" r="2" fill="#FFFFFF" opacity="0.6" />
          </g>
        )}

        {accessory === "cap" && (
          <g>
            {/* Visor */}
            <ellipse cx="115" cy="65" rx="32" ry="8" fill="#2980B9" stroke="#21618C" strokeWidth="2" transform="rotate(-5 115 65)" />
            <ellipse cx="115" cy="65" rx="28" ry="6" fill="#3498DB" opacity="0.5" transform="rotate(-5 115 65)" />
            
            {/* Cap crown */}
            <ellipse cx="100" cy="55" rx="42" ry="25" fill="#3498DB" stroke="#2980B9" strokeWidth="2.5" />
            <ellipse cx="100" cy="50" rx="38" ry="20" fill="#3498DB" stroke="#2980B9" strokeWidth="2" />
            
            {/* Cap details */}
            <path d="M 75 55 Q 100 50 125 55" stroke="#2471A3" strokeWidth="1.5" fill="none" />
            
            {/* Button on top */}
            <circle cx="100" cy="45" r="4" fill="#2980B9" stroke="#21618C" strokeWidth="1" />
          </g>
        )}

        {accessory === "crown" && (
          <g>
            {/* Crown base with gradient */}
            <ellipse cx="100" cy="60" rx="45" ry="8" fill="#D68910" stroke="#B8860B" strokeWidth="2" />
            
            {/* Crown points */}
            <polygon
              points="70,60 75,40 82,52 90,35 98,52 100,32 102,52 110,35 118,52 125,40 130,60"
              fill="#F39C12"
              stroke="#D68910"
              strokeWidth="2.5"
            />
            
            {/* Jewels */}
            <circle cx="80" cy="48" r="4" fill="#E74C3C" stroke="#C0392B" strokeWidth="1.5" />
            <ellipse cx="80" cy="46" rx="2" ry="1" fill="#FFFFFF" opacity="0.8" />
            
            <circle cx="100" cy="38" r="5" fill="#9B59B6" stroke="#7D3C98" strokeWidth="1.5" />
            <ellipse cx="100" cy="36" rx="2.5" ry="1.5" fill="#FFFFFF" opacity="0.8" />
            
            <circle cx="120" cy="48" r="4" fill="#3498DB" stroke="#2471A3" strokeWidth="1.5" />
            <ellipse cx="120" cy="46" rx="2" ry="1" fill="#FFFFFF" opacity="0.8" />
            
            {/* Shimmer effect */}
            <motion.path
              d="M 70 55 L 130 55"
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity="0"
              animate={animate ? { opacity: [0, 0.6, 0] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>
        )}

        {/* Face Expression */}
        {faceExpression === "happy" && (
          <g>
            {/* Eyebrows */}
            <path d="M 72 88 Q 78 86 84 88" stroke={skin.shadow} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 116 88 Q 122 86 128 88" stroke={skin.shadow} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            
            {/* Eyes with pupils and highlights */}
            <ellipse cx="80" cy="96" rx="7" ry="9" fill="#FFFFFF" />
            <circle cx="82" cy="96" r="5" fill="#2C3E50" />
            <circle cx="83" cy="94" r="2" fill="#FFFFFF" opacity="0.9" />
            
            <ellipse cx="120" cy="96" rx="7" ry="9" fill="#FFFFFF" />
            <circle cx="122" cy="96" r="5" fill="#2C3E50" />
            <circle cx="123" cy="94" r="2" fill="#FFFFFF" opacity="0.9" />
            
            {/* Blinking animation */}
            {animate && (
              <>
                <motion.rect
                  x="73"
                  y="96"
                  width="14"
                  height="2"
                  fill={skin.base}
                  opacity="0"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
                />
                <motion.rect
                  x="113"
                  y="96"
                  width="14"
                  height="2"
                  fill={skin.base}
                  opacity="0"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
                />
              </>
            )}
            
            {/* Smile */}
            <path d="M 75 112 Q 100 122 125 112" stroke="#2C3E50" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        )}

        {faceExpression === "excited" && (
          <g>
            {/* Raised eyebrows */}
            <path d="M 70 85 Q 78 82 86 85" stroke={skin.shadow} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 114 85 Q 122 82 130 85" stroke={skin.shadow} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            
            {/* Wide eyes */}
            <ellipse cx="80" cy="96" rx="8" ry="11" fill="#FFFFFF" />
            <circle cx="82" cy="96" r="6" fill="#2C3E50" />
            <circle cx="84" cy="93" r="3" fill="#FFFFFF" opacity="0.9" />
            
            <ellipse cx="120" cy="96" rx="8" ry="11" fill="#FFFFFF" />
            <circle cx="122" cy="96" r="6" fill="#2C3E50" />
            <circle cx="124" cy="93" r="3" fill="#FFFFFF" opacity="0.9" />
            
            {/* Open mouth smile */}
            <ellipse cx="100" cy="118" rx="15" ry="12" fill="#2C3E50" opacity="0.3" />
            <path d="M 70 110 Q 100 130 130 110" stroke="#2C3E50" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        )}

        {faceExpression === "cool" && (
          <g>
            {/* Eyebrows slightly lowered */}
            <path d="M 72 90 Q 78 88 84 90" stroke={skin.shadow} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 116 90 Q 122 88 128 90" stroke={skin.shadow} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            
            {/* Sunglasses */}
            <rect x="70" y="92" width="24" height="12" rx="4" fill="#2C3E50" opacity="0.9" />
            <rect x="106" y="92" width="24" height="12" rx="4" fill="#2C3E50" opacity="0.9" />
            <rect x="94" y="97" width="12" height="3" rx="1" fill="#2C3E50" />
            
            {/* Glare on sunglasses */}
            <rect x="72" y="94" width="8" height="4" rx="1" fill="#FFFFFF" opacity="0.3" />
            <rect x="108" y="94" width="8" height="4" rx="1" fill="#FFFFFF" opacity="0.3" />
            
            {/* Slight smirk */}
            <path d="M 85 114 Q 100 118 115 114" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}

        {faceExpression === "determined" && (
          <g>
            {/* Furrowed eyebrows */}
            <path d="M 72 90 L 88 88" stroke={skin.shadow} strokeWidth="3" strokeLinecap="round" />
            <path d="M 128 90 L 112 88" stroke={skin.shadow} strokeWidth="3" strokeLinecap="round" />
            
            {/* Focused eyes */}
            <ellipse cx="80" cy="97" rx="6" ry="8" fill="#FFFFFF" />
            <circle cx="81" cy="97" r="5" fill="#2C3E50" />
            <circle cx="82" cy="95" r="1.5" fill="#FFFFFF" opacity="0.9" />
            
            <ellipse cx="120" cy="97" rx="6" ry="8" fill="#FFFFFF" />
            <circle cx="121" cy="97" r="5" fill="#2C3E50" />
            <circle cx="122" cy="95" r="1.5" fill="#FFFFFF" opacity="0.9" />
            
            {/* Straight mouth */}
            <path d="M 80 114 L 120 114" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* Floating sparkles animation */}
        {animate && (
          <>
            <motion.circle
              cx="40"
              cy="80"
              r="3"
              fill="#FFD700"
              opacity="0"
              animate={{
                cy: [80, 60, 80],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="160"
              cy="100"
              r="2.5"
              fill="#FF6B9D"
              opacity="0"
              animate={{
                cy: [100, 80, 100],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path
              d="M 45 120 L 48 126 L 42 126 Z"
              fill="#3498DB"
              opacity="0"
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}
