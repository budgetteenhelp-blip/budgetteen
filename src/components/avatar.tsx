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

const SKIN_TONES: Record<string, string> = {
  light: "#FFE0BD",
  medium: "#F1C27D",
  tan: "#D4A574",
  brown: "#8D5524",
  dark: "#5C4033",
};

export default function Avatar({
  skinTone = "medium",
  hairStyle = "short",
  hairColor = "brown",
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
  const skinColor = SKIN_TONES[skinTone] || SKIN_TONES.medium;

  return (
    <motion.div
      className="relative"
      style={{ width: avatarSize, height: avatarSize }}
      initial={animate ? { scale: 0.8, opacity: 0 } : undefined}
      animate={animate ? { scale: 1, opacity: 1 } : undefined}
      transition={{ duration: 0.3 }}
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        {/* Body/Outfit */}
        {outfit === "casual" && (
          <g>
            {/* T-shirt */}
            <path
              d="M 70 120 Q 60 140 60 160 L 60 190 Q 60 200 70 200 L 130 200 Q 140 200 140 190 L 140 160 Q 140 140 130 120 Z"
              fill="#4A90E2"
              stroke="#2E5C8A"
              strokeWidth="2"
            />
            <rect x="80" y="130" width="40" height="5" fill="#FFFFFF" opacity="0.3" rx="2" />
          </g>
        )}
        {outfit === "sporty" && (
          <g>
            {/* Hoodie */}
            <path
              d="M 70 120 Q 60 140 60 160 L 60 190 Q 60 200 70 200 L 130 200 Q 140 200 140 190 L 140 160 Q 140 140 130 120 Z"
              fill="#FF6B6B"
              stroke="#C53030"
              strokeWidth="2"
            />
            <line x1="100" y1="130" x2="100" y2="180" stroke="#FFFFFF" strokeWidth="3" />
          </g>
        )}
        {outfit === "formal" && (
          <g>
            {/* Suit jacket */}
            <path
              d="M 70 120 Q 60 140 60 160 L 60 190 Q 60 200 70 200 L 130 200 Q 140 200 140 190 L 140 160 Q 140 140 130 120 Z"
              fill="#2C3E50"
              stroke="#1A252F"
              strokeWidth="2"
            />
            <rect x="95" y="125" width="10" height="75" fill="#FFFFFF" />
            <polygon points="100,125 95,135 105,135" fill="#E74C3C" />
          </g>
        )}
        {outfit === "superhero" && (
          <g>
            {/* Cape and suit */}
            <ellipse cx="100" cy="160" rx="60" ry="80" fill="#9B59B6" opacity="0.3" />
            <path
              d="M 70 120 Q 60 140 60 160 L 60 190 Q 60 200 70 200 L 130 200 Q 140 200 140 190 L 140 160 Q 140 140 130 120 Z"
              fill="#E74C3C"
              stroke="#C0392B"
              strokeWidth="2"
            />
            <circle cx="100" cy="150" r="15" fill="#F39C12" stroke="#D68910" strokeWidth="2" />
            <text x="100" y="155" fontSize="16" fontWeight="bold" fill="#2C3E50" textAnchor="middle">S</text>
          </g>
        )}

        {/* Head */}
        <circle cx="100" cy="80" r="40" fill={skinColor} stroke="#D4A574" strokeWidth="2" />

        {/* Face Expression */}
        {faceExpression === "happy" && (
          <g>
            <circle cx="85" cy="75" r="4" fill="#000" />
            <circle cx="115" cy="75" r="4" fill="#000" />
            <path d="M 80 90 Q 100 100 120 90" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}
        {faceExpression === "excited" && (
          <g>
            <circle cx="85" cy="75" r="5" fill="#000" />
            <circle cx="115" cy="75" r="5" fill="#000" />
            <ellipse cx="100" cy="92" rx="8" ry="10" fill="#FF6B6B" />
            <path d="M 75 85 Q 100 105 125 85" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        )}
        {faceExpression === "cool" && (
          <g>
            <rect x="75" y="72" width="20" height="8" rx="2" fill="#2C3E50" />
            <rect x="105" y="72" width="20" height="8" rx="2" fill="#2C3E50" />
            <path d="M 85 92 Q 100 95 115 92" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}
        {faceExpression === "determined" && (
          <g>
            <path d="M 78 75 L 92 75" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 108 75 L 122 75" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            <path d="M 85 92 L 115 92" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* Hair */}
        {hairStyle === "short" && (
          <g>
            <ellipse cx="100" cy="55" rx="42" ry="25" fill={hairColor} />
            <circle cx="70" cy="65" r="12" fill={hairColor} />
            <circle cx="130" cy="65" r="12" fill={hairColor} />
          </g>
        )}
        {hairStyle === "long" && (
          <g>
            <ellipse cx="100" cy="55" rx="42" ry="25" fill={hairColor} />
            <ellipse cx="65" cy="90" rx="15" ry="35" fill={hairColor} />
            <ellipse cx="135" cy="90" rx="15" ry="35" fill={hairColor} />
          </g>
        )}
        {hairStyle === "curly" && (
          <g>
            <circle cx="80" cy="50" r="15" fill={hairColor} />
            <circle cx="100" cy="45" r="15" fill={hairColor} />
            <circle cx="120" cy="50" r="15" fill={hairColor} />
            <circle cx="70" cy="65" r="12" fill={hairColor} />
            <circle cx="130" cy="65" r="12" fill={hairColor} />
          </g>
        )}
        {hairStyle === "ponytail" && (
          <g>
            <ellipse cx="100" cy="55" rx="42" ry="25" fill={hairColor} />
            <ellipse cx="140" cy="70" rx="20" ry="35" fill={hairColor} transform="rotate(20 140 70)" />
          </g>
        )}
        {hairStyle === "mohawk" && (
          <g>
            <rect x="90" y="30" width="20" height="40" rx="10" fill={hairColor} />
            <ellipse cx="100" cy="30" rx="10" ry="15" fill={hairColor} />
          </g>
        )}

        {/* Accessories */}
        {accessory === "glasses" && (
          <g>
            <circle cx="85" cy="75" r="8" fill="none" stroke="#2C3E50" strokeWidth="2" />
            <circle cx="115" cy="75" r="8" fill="none" stroke="#2C3E50" strokeWidth="2" />
            <line x1="93" y1="75" x2="107" y2="75" stroke="#2C3E50" strokeWidth="2" />
          </g>
        )}
        {accessory === "headphones" && (
          <g>
            <path d="M 60 70 Q 60 50 100 50 Q 140 50 140 70" stroke="#2C3E50" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="65" cy="75" r="8" fill="#E74C3C" stroke="#2C3E50" strokeWidth="2" />
            <circle cx="135" cy="75" r="8" fill="#E74C3C" stroke="#2C3E50" strokeWidth="2" />
          </g>
        )}
        {accessory === "cap" && (
          <g>
            <ellipse cx="100" cy="45" rx="45" ry="10" fill="#3498DB" stroke="#2980B9" strokeWidth="2" />
            <ellipse cx="100" cy="40" rx="35" ry="20" fill="#3498DB" stroke="#2980B9" strokeWidth="2" />
            <ellipse cx="130" cy="45" rx="25" ry="5" fill="#2980B9" />
          </g>
        )}
        {accessory === "crown" && (
          <g>
            <polygon points="70,45 80,30 90,40 100,25 110,40 120,30 130,45" fill="#F39C12" stroke="#D68910" strokeWidth="2" />
            <circle cx="80" cy="35" r="3" fill="#E74C3C" />
            <circle cx="100" cy="30" r="3" fill="#E74C3C" />
            <circle cx="120" cy="35" r="3" fill="#E74C3C" />
          </g>
        )}

        {/* Floating animation sparkles */}
        {animate && (
          <>
            <motion.circle
              cx="50"
              cy="60"
              r="3"
              fill="#F39C12"
              animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="150"
              cy="80"
              r="2"
              fill="#E74C3C"
              animate={{ y: [5, -5, 5], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}
