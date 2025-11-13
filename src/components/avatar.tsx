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

const HAIR_COLORS: Record<string, string> = {
  blonde: "#FFD966",
  brown: "#8B4513",
  black: "#2C2C2C",
  red: "#FF6B6B",
  orange: "#FF8C42",
  purple: "#9B59B6",
  blue: "#3498DB",
  pink: "#FF69B4",
  green: "#27AE60",
};

export default function Avatar({
  skinTone = "medium",
  hairStyle = "short",
  hairColor = "brown",
  outfit = "none",
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
  const hairColorHex = HAIR_COLORS[hairColor] || HAIR_COLORS.brown;

  // Animation variants
  const containerVariants = animate
    ? {
        initial: { scale: 0.8, opacity: 0 },
        animate: { 
          scale: 1, 
          opacity: 1,
          transition: { duration: 0.5, type: "spring" as const, bounce: 0.4 }
        },
      }
    : {};

  const bounceVariants = animate
    ? {
        animate: {
          y: [0, -5, 0],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
        },
      }
    : {};

  const blinkVariants = animate
    ? {
        animate: {
          scaleY: [1, 0.1, 1],
          transition: { duration: 0.2, repeat: Infinity, repeatDelay: 4 },
        },
      }
    : {};

  return (
    <motion.div
      className="relative"
      style={{ width: avatarSize, height: avatarSize }}
      {...(animate ? containerVariants : {})}
    >
      <motion.svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
        {...(animate ? bounceVariants : {})}
      >
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Main Head Circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill={skinColor}
          filter="url(#shadow)"
        />

        {/* Hair Styles */}
        {hairStyle === "bald" && null}

        {hairStyle === "short" && (
          <g>
            <path
              d="M 100 20 Q 160 30 160 80 Q 160 40 140 30 Q 120 20 100 20 Q 80 20 60 30 Q 40 40 40 80 Q 40 30 100 20 Z"
              fill={hairColorHex}
            />
          </g>
        )}

        {hairStyle === "buzzcut" && (
          <g>
            <path
              d="M 100 25 Q 155 35 155 75 Q 155 45 135 35 Q 115 25 100 25 Q 85 25 65 35 Q 45 45 45 75 Q 45 35 100 25 Z"
              fill={hairColorHex}
            />
          </g>
        )}

        {hairStyle === "crew" && (
          <g>
            <ellipse cx="100" cy="45" rx="55" ry="30" fill={hairColorHex} />
            <rect x="50" y="45" width="100" height="15" fill={hairColorHex} />
          </g>
        )}

        {hairStyle === "side_part" && (
          <g>
            <path
              d="M 100 20 Q 165 25 165 80 Q 165 35 145 25 Q 125 18 100 20 Z"
              fill={hairColorHex}
            />
            <path
              d="M 100 20 Q 35 25 35 80 Q 35 35 55 25 Q 75 18 100 20 Z"
              fill={hairColorHex}
            />
            <path d="M 95 20 L 95 60" stroke={skinColor} strokeWidth="3" />
          </g>
        )}

        {hairStyle === "spiky" && (
          <g>
            <path
              d="M 70 45 L 65 25 L 75 40 Z"
              fill={hairColorHex}
            />
            <path
              d="M 85 40 L 83 18 L 90 35 Z"
              fill={hairColorHex}
            />
            <path
              d="M 100 35 L 100 15 L 105 35 Z"
              fill={hairColorHex}
            />
            <path
              d="M 115 40 L 117 18 L 110 35 Z"
              fill={hairColorHex}
            />
            <path
              d="M 130 45 L 135 25 L 125 40 Z"
              fill={hairColorHex}
            />
            <ellipse cx="100" cy="55" rx="50" ry="25" fill={hairColorHex} />
          </g>
        )}

        {hairStyle === "long" && (
          <g>
            {/* Top of hair */}
            <path
              d="M 100 20 Q 165 25 165 80 Q 165 35 145 25 Q 125 18 100 20 Q 75 18 55 25 Q 35 35 35 80 Q 35 25 100 20 Z"
              fill={hairColorHex}
            />
            {/* Long flowing sides with motion */}
            <motion.ellipse
              cx="40"
              cy="110"
              rx="20"
              ry="50"
              fill={hairColorHex}
              animate={animate ? { ry: [50, 52, 50] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.ellipse
              cx="160"
              cy="110"
              rx="20"
              ry="50"
              fill={hairColorHex}
              animate={animate ? { ry: [50, 52, 50] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </g>
        )}

        {hairStyle === "wavy" && (
          <g>
            <path
              d="M 100 20 Q 165 25 165 80 Q 165 35 145 25 Q 125 18 100 20 Q 75 18 55 25 Q 35 35 35 80 Q 35 25 100 20 Z"
              fill={hairColorHex}
            />
            <motion.path
              d="M 35 80 Q 30 95 35 110 Q 40 125 35 140"
              stroke={hairColorHex}
              strokeWidth="25"
              fill="none"
              strokeLinecap="round"
              animate={animate ? { d: ["M 35 80 Q 30 95 35 110 Q 40 125 35 140", "M 35 80 Q 32 95 37 110 Q 42 125 37 140", "M 35 80 Q 30 95 35 110 Q 40 125 35 140"] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M 165 80 Q 170 95 165 110 Q 160 125 165 140"
              stroke={hairColorHex}
              strokeWidth="25"
              fill="none"
              strokeLinecap="round"
              animate={animate ? { d: ["M 165 80 Q 170 95 165 110 Q 160 125 165 140", "M 165 80 Q 168 95 163 110 Q 158 125 163 140", "M 165 80 Q 170 95 165 110 Q 160 125 165 140"] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </g>
        )}

        {hairStyle === "ponytail" && (
          <g>
            <path
              d="M 100 20 Q 165 25 165 80 Q 165 35 145 25 Q 125 18 100 20 Q 75 18 55 25 Q 35 35 35 80 Q 35 25 100 20 Z"
              fill={hairColorHex}
            />
            <motion.ellipse
              cx="170"
              cy="85"
              rx="18"
              ry="35"
              fill={hairColorHex}
              animate={animate ? { cy: [85, 88, 85], ry: [35, 33, 35] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Hair tie */}
            <circle cx="160" cy="75" r="6" fill="#FF6B9D" />
          </g>
        )}

        {hairStyle === "buns" && (
          <g>
            <ellipse cx="100" cy="45" rx="50" ry="25" fill={hairColorHex} />
            <motion.circle
              cx="55"
              cy="35"
              r="20"
              fill={hairColorHex}
              animate={animate ? { r: [20, 21, 20] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="145"
              cy="35"
              r="20"
              fill={hairColorHex}
              animate={animate ? { r: [20, 21, 20] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </g>
        )}

        {hairStyle === "bob" && (
          <g>
            <path
              d="M 100 20 Q 165 25 165 80 Q 165 35 145 25 Q 125 18 100 20 Q 75 18 55 25 Q 35 35 35 80 Q 35 25 100 20 Z"
              fill={hairColorHex}
            />
            <path
              d="M 35 80 L 35 95 Q 35 110 50 110 L 150 110 Q 165 110 165 95 L 165 80"
              fill={hairColorHex}
            />
          </g>
        )}

        {hairStyle === "pixie" && (
          <g>
            <path
              d="M 100 25 Q 160 30 160 75 Q 160 40 140 32 Q 120 25 100 25 Q 80 25 60 32 Q 40 40 40 75 Q 40 30 100 25 Z"
              fill={hairColorHex}
            />
            <path
              d="M 100 25 Q 85 28 75 40"
              stroke={hairColorHex}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 100 25 Q 115 28 125 40"
              stroke={hairColorHex}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {hairStyle === "braids" && (
          <g>
            <ellipse cx="100" cy="45" rx="50" ry="25" fill={hairColorHex} />
            <motion.g
              animate={animate ? { y: [0, 3, 0] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="35" y="75" width="12" height="60" rx="6" fill={hairColorHex} />
              <circle cx="41" cy="85" r="3" fill={skinColor} />
              <circle cx="41" cy="100" r="3" fill={skinColor} />
              <circle cx="41" cy="115" r="3" fill={skinColor} />
            </motion.g>
            <motion.g
              animate={animate ? { y: [0, 3, 0] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <rect x="153" y="75" width="12" height="60" rx="6" fill={hairColorHex} />
              <circle cx="159" cy="85" r="3" fill={skinColor} />
              <circle cx="159" cy="100" r="3" fill={skinColor} />
              <circle cx="159" cy="115" r="3" fill={skinColor} />
            </motion.g>
          </g>
        )}

        {hairStyle === "curly" && (
          <g>
            <motion.circle
              cx="70"
              cy="45"
              r="18"
              fill={hairColorHex}
              animate={animate ? { r: [18, 19, 18] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="90"
              cy="35"
              r="20"
              fill={hairColorHex}
              animate={animate ? { r: [20, 21, 20] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.circle
              cx="110"
              cy="35"
              r="20"
              fill={hairColorHex}
              animate={animate ? { r: [20, 21, 20] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.circle
              cx="130"
              cy="45"
              r="18"
              fill={hairColorHex}
              animate={animate ? { r: [18, 19, 18] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
            <circle cx="50" cy="65" r="15" fill={hairColorHex} />
            <circle cx="150" cy="65" r="15" fill={hairColorHex} />
          </g>
        )}

        {hairStyle === "afro" && (
          <g>
            <circle cx="100" cy="50" r="60" fill={hairColorHex} />
          </g>
        )}

        {/* Face Expression */}
        <g>
          {/* Eyes */}
          {faceExpression === "happy" && (
            <g>
              <motion.circle
                cx="70"
                cy="90"
                r="6"
                fill="#2C2C2C"
                {...(animate ? blinkVariants : {})}
              />
              <motion.circle
                cx="130"
                cy="90"
                r="6"
                fill="#2C2C2C"
                {...(animate ? blinkVariants : {})}
              />
              <path
                d="M 75 115 Q 100 125 125 115"
                stroke="#2C2C2C"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {faceExpression === "excited" && (
            <g>
              <circle cx="70" cy="85" r="8" fill="#2C2C2C" />
              <circle cx="130" cy="85" r="8" fill="#2C2C2C" />
              <ellipse cx="100" cy="120" rx="20" ry="15" fill="#2C2C2C" opacity="0.8" />
              <path
                d="M 70 110 Q 100 130 130 110"
                stroke="#2C2C2C"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {faceExpression === "laughing" && (
            <g>
              <path
                d="M 60 88 Q 70 82 80 88"
                stroke="#2C2C2C"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 120 88 Q 130 82 140 88"
                stroke="#2C2C2C"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <ellipse cx="100" cy="120" rx="20" ry="15" fill="#2C2C2C" opacity="0.8" />
              <path
                d="M 70 110 Q 100 135 130 110"
                stroke="#2C2C2C"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {faceExpression === "wink" && (
            <g>
              <path
                d="M 60 90 Q 70 88 80 90"
                stroke="#2C2C2C"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="130" cy="90" r="6" fill="#2C2C2C" />
              <path
                d="M 75 115 Q 100 125 125 115"
                stroke="#2C2C2C"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {faceExpression === "cool" && (
            <g>
              <rect x="55" y="85" width="30" height="12" rx="6" fill="#2C2C2C" opacity="0.8" />
              <rect x="115" y="85" width="30" height="12" rx="6" fill="#2C2C2C" opacity="0.8" />
              <path
                d="M 80 115 Q 100 120 120 115"
                stroke="#2C2C2C"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {faceExpression === "silly" && (
            <g>
              <circle cx="70" cy="90" r="6" fill="#2C2C2C" />
              <circle cx="130" cy="88" r="7" fill="#2C2C2C" />
              <path
                d="M 85 120 Q 95 115 105 120 Q 115 125 120 118"
                stroke="#2C2C2C"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="110" cy="115" r="6" fill="#FF6B9D" opacity="0.6" />
            </g>
          )}
        </g>

        {/* Rosy Cheeks */}
        {(faceExpression === "happy" || faceExpression === "excited" || faceExpression === "silly") && (
          <g>
            <ellipse cx="55" cy="105" rx="12" ry="8" fill="#FF9AA2" opacity="0.5" />
            <ellipse cx="145" cy="105" rx="12" ry="8" fill="#FF9AA2" opacity="0.5" />
          </g>
        )}

        {/* Accessories */}
        {accessory === "glasses" && (
          <g>
            <circle cx="70" cy="90" r="15" fill="none" stroke="#2C2C2C" strokeWidth="3" />
            <circle cx="130" cy="90" r="15" fill="none" stroke="#2C2C2C" strokeWidth="3" />
            <path d="M 85 90 L 115 90" stroke="#2C2C2C" strokeWidth="3" />
            <ellipse cx="65" cy="87" rx="4" ry="3" fill="#FFFFFF" opacity="0.6" />
            <ellipse cx="125" cy="87" rx="4" ry="3" fill="#FFFFFF" opacity="0.6" />
          </g>
        )}

        {accessory === "sunglasses" && (
          <g>
            <ellipse cx="70" cy="90" rx="18" ry="10" fill="#2C2C2C" opacity="0.9" />
            <ellipse cx="130" cy="90" rx="18" ry="10" fill="#2C2C2C" opacity="0.9" />
            <path d="M 88 90 L 112 90" stroke="#2C2C2C" strokeWidth="3" />
            <ellipse cx="65" cy="88" rx="5" ry="3" fill="#FFFFFF" opacity="0.3" />
            <ellipse cx="125" cy="88" rx="5" ry="3" fill="#FFFFFF" opacity="0.3" />
          </g>
        )}

        {accessory === "headband" && (
          <g>
            <path
              d="M 30 70 Q 30 50 100 50 Q 170 50 170 70"
              stroke={hairColorHex === "#FFD966" ? "#FF6B9D" : "#3498DB"}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="100" cy="50" r="8" fill={hairColorHex === "#FFD966" ? "#FF6B9D" : "#3498DB"} />
          </g>
        )}

        {accessory === "bow" && (
          <g>
            <path
              d="M 80 35 Q 85 25 95 30 Q 100 20 105 30 Q 115 25 120 35"
              fill="#FF6B9D"
              stroke="#E74C3C"
              strokeWidth="2"
            />
            <circle cx="100" cy="32" r="5" fill="#E74C3C" />
          </g>
        )}

        {accessory === "flower" && (
          <g>
            <circle cx="145" cy="55" r="12" fill="#FF6B9D" />
            <circle cx="155" cy="50" r="8" fill="#FFD966" />
            <circle cx="150" cy="62" r="8" fill="#FFD966" />
            <circle cx="138" cy="58" r="8" fill="#FFD966" />
            <circle cx="150" cy="48" r="8" fill="#FFD966" />
            <circle cx="145" cy="55" r="6" fill="#F39C12" />
          </g>
        )}

        {accessory === "cap" && (
          <g>
            <ellipse cx="120" cy="45" rx="40" ry="12" fill="#3498DB" />
            <ellipse cx="100" cy="40" rx="50" ry="25" fill="#3498DB" />
            <circle cx="100" cy="35" r="4" fill="#2980B9" />
          </g>
        )}

        {accessory === "beanie" && (
          <g>
            <ellipse cx="100" cy="35" rx="55" ry="30" fill="#E74C3C" />
            <rect x="45" y="50" width="110" height="10" rx="5" fill="#C0392B" />
            <circle cx="100" cy="25" r="6" fill="#FF9AA2" />
          </g>
        )}

        {accessory === "crown" && (
          <g>
            <ellipse cx="100" cy="38" rx="50" ry="8" fill="#F39C12" />
            <polygon
              points="65,38 70,20 78,32 85,18 92,32 100,15 108,32 115,18 122,32 130,20 135,38"
              fill="#F39C12"
            />
            <circle cx="75" cy="26" r="4" fill="#E74C3C" />
            <circle cx="100" cy="20" r="5" fill="#9B59B6" />
            <circle cx="125" cy="26" r="4" fill="#3498DB" />
          </g>
        )}

        {accessory === "halo" && (
          <g>
            <motion.ellipse
              cx="100"
              cy="10"
              rx="35"
              ry="8"
              fill="none"
              stroke="#FFD700"
              strokeWidth="6"
              animate={animate ? { opacity: [0.6, 1, 0.6] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}

        {accessory === "headphones" && (
          <g>
            <path
              d="M 50 85 Q 50 45 100 42 Q 150 45 150 85"
              stroke="#2C3E50"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="50" cy="90" rx="12" ry="16" fill="#E74C3C" />
            <ellipse cx="150" cy="90" rx="12" ry="16" fill="#E74C3C" />
            <ellipse cx="50" cy="90" rx="8" ry="12" fill="#2C3E50" opacity="0.3" />
            <ellipse cx="150" cy="90" rx="8" ry="12" fill="#2C3E50" opacity="0.3" />
          </g>
        )}

        {/* Sparkles animation */}
        {animate && (
          <>
            <motion.circle
              cx="30"
              cy="60"
              r="3"
              fill="#FFD700"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -15, -30],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle
              cx="170"
              cy="70"
              r="2.5"
              fill="#FF6B9D"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -12, -25],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
            <motion.path
              d="M 40 100 L 43 106 L 37 106 Z"
              fill="#3498DB"
              animate={{
                opacity: [0, 1, 0],
                y: [0, -10, -20],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1 }}
            />
          </>
        )}
      </motion.svg>
    </motion.div>
  );
}
