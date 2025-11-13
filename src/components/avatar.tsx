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

  return (
    <motion.div
      className="relative"
      style={{ width: avatarSize, height: avatarSize }}
      initial={animate ? { scale: 0.8, opacity: 0 } : undefined}
      animate={animate ? { scale: 1, opacity: 1 } : undefined}
      transition={animate ? { duration: 0.5, type: "spring", bounce: 0.4 } : undefined}
    >
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <radialGradient id="headGradient">
            <stop offset="0%" stopColor={skinColor} />
            <stop offset="100%" stopColor={skinColor} stopOpacity="0.85" />
          </radialGradient>
          
          <linearGradient id="hairShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Main Head Circle */}
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="url(#headGradient)"
          stroke={skinColor}
          strokeWidth="1"
          filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"
        />

        {/* Hair Styles - Complex and detailed */}
        {hairStyle === "bald" && null}

        {hairStyle === "short" && (
          <g>
            {/* Short hair covering top and sides */}
            <path
              d="M 100 30 
                 Q 135 32 155 50 
                 Q 165 65 165 85
                 L 165 75
                 Q 163 55 145 42
                 Q 125 30 100 30
                 Q 75 30 55 42
                 Q 37 55 35 75
                 L 35 85
                 Q 35 65 45 50
                 Q 65 32 100 30 Z"
              fill={hairColorHex}
            />
            <path
              d="M 100 30 
                 Q 135 32 155 50 
                 Q 165 65 165 85
                 L 165 75
                 Q 163 55 145 42
                 Q 125 30 100 30
                 Q 75 30 55 42
                 Q 37 55 35 75
                 L 35 85
                 Q 35 65 45 50
                 Q 65 32 100 30 Z"
              fill="url(#hairShine)"
            />
            {/* Hair texture strokes */}
            <path d="M 70 45 Q 75 40 80 45" stroke={hairColorHex} strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 90 38 Q 95 33 100 38" stroke={hairColorHex} strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 110 38 Q 115 33 120 38" stroke={hairColorHex} strokeWidth="2" fill="none" opacity="0.6" />
          </g>
        )}

        {hairStyle === "buzzcut" && (
          <g>
            <path
              d="M 100 32
                 Q 132 34 150 48
                 Q 162 62 162 80
                 L 162 72
                 Q 160 56 144 44
                 Q 122 32 100 32
                 Q 78 32 56 44
                 Q 40 56 38 72
                 L 38 80
                 Q 38 62 50 48
                 Q 68 34 100 32 Z"
              fill={hairColorHex}
              opacity="0.9"
            />
            {/* Buzzed texture */}
            <g opacity="0.3">
              <line x1="60" y1="50" x2="60" y2="55" stroke={hairColorHex} strokeWidth="1" />
              <line x1="70" y1="45" x2="70" y2="50" stroke={hairColorHex} strokeWidth="1" />
              <line x1="80" y1="40" x2="80" y2="45" stroke={hairColorHex} strokeWidth="1" />
              <line x1="90" y1="37" x2="90" y2="42" stroke={hairColorHex} strokeWidth="1" />
              <line x1="100" y1="35" x2="100" y2="40" stroke={hairColorHex} strokeWidth="1" />
              <line x1="110" y1="37" x2="110" y2="42" stroke={hairColorHex} strokeWidth="1" />
              <line x1="120" y1="40" x2="120" y2="45" stroke={hairColorHex} strokeWidth="1" />
              <line x1="130" y1="45" x2="130" y2="50" stroke={hairColorHex} strokeWidth="1" />
              <line x1="140" y1="50" x2="140" y2="55" stroke={hairColorHex} strokeWidth="1" />
            </g>
          </g>
        )}

        {hairStyle === "crew" && (
          <g>
            {/* Crew cut with flat top */}
            <path
              d="M 75 50
                 L 75 35
                 Q 85 32 100 32
                 Q 115 32 125 35
                 L 125 50
                 Q 130 52 140 60
                 Q 148 70 148 85
                 Q 145 65 135 52
                 Q 120 42 100 42
                 Q 80 42 65 52
                 Q 55 65 52 85
                 Q 52 70 60 60
                 Q 70 52 75 50 Z"
              fill={hairColorHex}
            />
            <rect x="75" y="32" width="50" height="8" fill={hairColorHex} opacity="0.9" />
            <path d="M 75 35 L 125 35" stroke={hairColorHex} strokeWidth="3" opacity="0.5" />
          </g>
        )}

        {hairStyle === "side_part" && (
          <g>
            <path
              d="M 100 30
                 Q 75 32 55 45
                 Q 38 60 35 85
                 Q 35 65 45 50
                 Q 65 32 90 30
                 L 95 30
                 L 95 65
                 Q 95 68 92 68
                 L 60 68
                 Q 58 68 58 70
                 L 58 80
                 Q 50 75 45 85
                 Q 48 70 58 60
                 Q 75 45 95 42
                 L 95 30
                 L 100 30 Z"
              fill={hairColorHex}
            />
            <path
              d="M 100 30
                 Q 125 32 145 45
                 Q 162 60 165 85
                 Q 165 65 155 50
                 Q 135 32 110 30
                 L 105 30
                 L 105 50
                 Q 105 52 108 52
                 L 140 52
                 Q 142 52 142 54
                 L 142 70
                 Q 150 68 155 78
                 Q 152 63 142 53
                 Q 125 40 105 38
                 L 105 30
                 L 100 30 Z"
              fill={hairColorHex}
            />
            {/* Part line */}
            <line x1="100" y1="30" x2="100" y2="50" stroke={skinColor} strokeWidth="2" />
          </g>
        )}

        {hairStyle === "spiky" && (
          <g>
            {/* Base hair */}
            <ellipse cx="100" cy="55" rx="55" ry="30" fill={hairColorHex} />
            {/* Spikes */}
            <path d="M 65 50 L 62 28 L 70 48 Z" fill={hairColorHex} />
            <path d="M 75 45 L 73 22 L 80 43 Z" fill={hairColorHex} />
            <path d="M 85 42 L 84 18 L 90 40 Z" fill={hairColorHex} />
            <path d="M 95 40 L 95 15 L 100 38 Z" fill={hairColorHex} />
            <path d="M 105 40 L 105 15 L 110 38 Z" fill={hairColorHex} />
            <path d="M 115 42 L 116 18 L 120 40 Z" fill={hairColorHex} />
            <path d="M 125 45 L 127 22 L 130 43 Z" fill={hairColorHex} />
            <path d="M 135 50 L 138 28 L 140 48 Z" fill={hairColorHex} />
            {/* Highlights on spikes */}
            <path d="M 95 15 L 95 25" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
            <path d="M 105 15 L 105 25" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
          </g>
        )}

        {hairStyle === "long" && (
          <g>
            {/* Top of head hair */}
            <path
              d="M 100 28
                 Q 135 30 158 48
                 Q 168 62 168 85
                 Q 168 62 158 48
                 Q 138 30 100 28
                 Q 62 30 42 48
                 Q 32 62 32 85
                 Q 32 62 42 48
                 Q 65 30 100 28 Z"
              fill={hairColorHex}
            />
            {/* Long flowing left side */}
            <motion.path
              d="M 42 85
                 Q 35 95 33 110
                 Q 32 125 35 140
                 Q 37 155 42 165
                 L 48 165
                 Q 45 150 44 135
                 Q 43 120 45 105
                 Q 47 90 50 85
                 L 42 85 Z"
              fill={hairColorHex}
              animate={animate ? { d: [
                "M 42 85 Q 35 95 33 110 Q 32 125 35 140 Q 37 155 42 165 L 48 165 Q 45 150 44 135 Q 43 120 45 105 Q 47 90 50 85 L 42 85 Z",
                "M 42 85 Q 33 95 31 110 Q 30 125 33 140 Q 35 155 40 165 L 46 165 Q 43 150 42 135 Q 41 120 43 105 Q 45 90 48 85 L 42 85 Z",
                "M 42 85 Q 35 95 33 110 Q 32 125 35 140 Q 37 155 42 165 L 48 165 Q 45 150 44 135 Q 43 120 45 105 Q 47 90 50 85 L 42 85 Z"
              ] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Long flowing right side */}
            <motion.path
              d="M 158 85
                 Q 165 95 167 110
                 Q 168 125 165 140
                 Q 163 155 158 165
                 L 152 165
                 Q 155 150 156 135
                 Q 157 120 155 105
                 Q 153 90 150 85
                 L 158 85 Z"
              fill={hairColorHex}
              animate={animate ? { d: [
                "M 158 85 Q 165 95 167 110 Q 168 125 165 140 Q 163 155 158 165 L 152 165 Q 155 150 156 135 Q 157 120 155 105 Q 153 90 150 85 L 158 85 Z",
                "M 158 85 Q 167 95 169 110 Q 170 125 167 140 Q 165 155 160 165 L 154 165 Q 157 150 158 135 Q 159 120 157 105 Q 155 90 152 85 L 158 85 Z",
                "M 158 85 Q 165 95 167 110 Q 168 125 165 140 Q 163 155 158 165 L 152 165 Q 155 150 156 135 Q 157 120 155 105 Q 153 90 150 85 L 158 85 Z"
              ] } : undefined}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Hair strands for texture */}
            <path d="M 45 100 Q 42 115 44 130" stroke="#000000" strokeWidth="1.5" opacity="0.2" fill="none" />
            <path d="M 155 100 Q 158 115 156 130" stroke="#000000" strokeWidth="1.5" opacity="0.2" fill="none" />
          </g>
        )}

        {hairStyle === "wavy" && (
          <g>
            {/* Top hair */}
            <path
              d="M 100 28
                 Q 135 30 158 48
                 Q 168 62 168 85
                 Q 168 62 158 48
                 Q 138 30 100 28
                 Q 62 30 42 48
                 Q 32 62 32 85
                 Q 32 62 42 48
                 Q 65 30 100 28 Z"
              fill={hairColorHex}
            />
            {/* Wavy left side */}
            <motion.path
              d="M 40 85
                 Q 30 92 28 102
                 Q 32 112 38 118
                 Q 30 125 28 135
                 Q 32 145 40 150
                 L 46 148
                 Q 40 143 38 135
                 Q 42 127 48 122
                 Q 42 115 40 105
                 Q 44 95 48 90
                 L 40 85 Z"
              fill={hairColorHex}
              animate={animate ? {
                d: [
                  "M 40 85 Q 30 92 28 102 Q 32 112 38 118 Q 30 125 28 135 Q 32 145 40 150 L 46 148 Q 40 143 38 135 Q 42 127 48 122 Q 42 115 40 105 Q 44 95 48 90 L 40 85 Z",
                  "M 40 85 Q 28 92 26 102 Q 30 112 36 118 Q 28 125 26 135 Q 30 145 38 150 L 44 148 Q 38 143 36 135 Q 40 127 46 122 Q 40 115 38 105 Q 42 95 46 90 L 40 85 Z",
                  "M 40 85 Q 30 92 28 102 Q 32 112 38 118 Q 30 125 28 135 Q 32 145 40 150 L 46 148 Q 40 143 38 135 Q 42 127 48 122 Q 42 115 40 105 Q 44 95 48 90 L 40 85 Z"
                ]
              } : undefined}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Wavy right side */}
            <motion.path
              d="M 160 85
                 Q 170 92 172 102
                 Q 168 112 162 118
                 Q 170 125 172 135
                 Q 168 145 160 150
                 L 154 148
                 Q 160 143 162 135
                 Q 158 127 152 122
                 Q 158 115 160 105
                 Q 156 95 152 90
                 L 160 85 Z"
              fill={hairColorHex}
              animate={animate ? {
                d: [
                  "M 160 85 Q 170 92 172 102 Q 168 112 162 118 Q 170 125 172 135 Q 168 145 160 150 L 154 148 Q 160 143 162 135 Q 158 127 152 122 Q 158 115 160 105 Q 156 95 152 90 L 160 85 Z",
                  "M 160 85 Q 172 92 174 102 Q 170 112 164 118 Q 172 125 174 135 Q 170 145 162 150 L 156 148 Q 162 143 164 135 Q 160 127 154 122 Q 160 115 162 105 Q 158 95 154 90 L 160 85 Z",
                  "M 160 85 Q 170 92 172 102 Q 168 112 162 118 Q 170 125 172 135 Q 168 145 160 150 L 154 148 Q 160 143 162 135 Q 158 127 152 122 Q 158 115 160 105 Q 156 95 152 90 L 160 85 Z"
                ]
              } : undefined}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          </g>
        )}

        {hairStyle === "ponytail" && (
          <g>
            {/* Front hair */}
            <path
              d="M 100 28
                 Q 135 30 158 48
                 Q 168 62 168 85
                 Q 168 62 158 48
                 Q 138 30 100 28
                 Q 62 30 42 48
                 Q 32 62 32 85
                 Q 32 62 42 48
                 Q 65 30 100 28 Z"
              fill={hairColorHex}
            />
            {/* Ponytail holder */}
            <ellipse cx="165" cy="75" rx="8" ry="5" fill="#FF6B9D" transform="rotate(15 165 75)" />
            {/* Ponytail */}
            <motion.path
              d="M 165 78
                 Q 170 85 172 95
                 Q 173 105 172 115
                 Q 171 125 168 135
                 Q 166 145 162 152
                 L 158 150
                 Q 161 143 163 135
                 Q 165 125 166 115
                 Q 167 105 166 95
                 Q 164 85 160 80
                 L 165 78 Z"
              fill={hairColorHex}
              animate={animate ? {
                cy: [0, 3, 0],
                d: [
                  "M 165 78 Q 170 85 172 95 Q 173 105 172 115 Q 171 125 168 135 Q 166 145 162 152 L 158 150 Q 161 143 163 135 Q 165 125 166 115 Q 167 105 166 95 Q 164 85 160 80 L 165 78 Z",
                  "M 165 81 Q 170 88 172 98 Q 173 108 172 118 Q 171 128 168 138 Q 166 148 162 155 L 158 153 Q 161 146 163 138 Q 165 128 166 118 Q 167 108 166 98 Q 164 88 160 83 L 165 81 Z",
                  "M 165 78 Q 170 85 172 95 Q 173 105 172 115 Q 171 125 168 135 Q 166 145 162 152 L 158 150 Q 161 143 163 135 Q 165 125 166 115 Q 167 105 166 95 Q 164 85 160 80 L 165 78 Z"
                ]
              } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Ponytail strands */}
            <motion.path
              d="M 162 90 Q 165 100 166 110"
              stroke="#000000"
              strokeWidth="1"
              opacity="0.2"
              fill="none"
              animate={animate ? { d: ["M 162 90 Q 165 100 166 110", "M 162 93 Q 165 103 166 113", "M 162 90 Q 165 100 166 110"] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}

        {hairStyle === "buns" && (
          <g>
            {/* Base hair on top */}
            <ellipse cx="100" cy="50" rx="50" ry="28" fill={hairColorHex} />
            {/* Left bun */}
            <motion.g
              animate={animate ? { rotate: [0, 5, 0] } : undefined}
              style={{ transformOrigin: "55px 40px" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="55" cy="40" r="20" fill={hairColorHex} />
              <path d="M 45 35 Q 55 30 65 35" stroke="#000000" strokeWidth="1.5" opacity="0.2" fill="none" />
              <path d="M 47 42 Q 55 38 63 42" stroke="#000000" strokeWidth="1.5" opacity="0.2" fill="none" />
              <circle cx="50" cy="35" r="3" fill="#FFFFFF" opacity="0.3" />
            </motion.g>
            {/* Right bun */}
            <motion.g
              animate={animate ? { rotate: [0, -5, 0] } : undefined}
              style={{ transformOrigin: "145px 40px" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <circle cx="145" cy="40" r="20" fill={hairColorHex} />
              <path d="M 135 35 Q 145 30 155 35" stroke="#000000" strokeWidth="1.5" opacity="0.2" fill="none" />
              <path d="M 137 42 Q 145 38 153 42" stroke="#000000" strokeWidth="1.5" opacity="0.2" fill="none" />
              <circle cx="150" cy="35" r="3" fill="#FFFFFF" opacity="0.3" />
            </motion.g>
          </g>
        )}

        {hairStyle === "bob" && (
          <g>
            {/* Top hair */}
            <path
              d="M 100 28
                 Q 135 30 158 48
                 Q 168 62 168 85
                 Q 168 62 158 48
                 Q 138 30 100 28
                 Q 62 30 42 48
                 Q 32 62 32 85
                 Q 32 62 42 48
                 Q 65 30 100 28 Z"
              fill={hairColorHex}
            />
            {/* Bob cut sides */}
            <path
              d="M 32 85
                 L 32 100
                 Q 32 108 40 110
                 L 160 110
                 Q 168 108 168 100
                 L 168 85
                 Q 165 90 160 92
                 L 40 92
                 Q 35 90 32 85 Z"
              fill={hairColorHex}
            />
            {/* Bob cut strands */}
            <path d="M 45 95 L 45 108" stroke="#000000" strokeWidth="1.5" opacity="0.15" />
            <path d="M 65 95 L 65 109" stroke="#000000" strokeWidth="1.5" opacity="0.15" />
            <path d="M 85 95 L 85 110" stroke="#000000" strokeWidth="1.5" opacity="0.15" />
            <path d="M 100 95 L 100 110" stroke="#000000" strokeWidth="1.5" opacity="0.15" />
            <path d="M 115 95 L 115 110" stroke="#000000" strokeWidth="1.5" opacity="0.15" />
            <path d="M 135 95 L 135 109" stroke="#000000" strokeWidth="1.5" opacity="0.15" />
            <path d="M 155 95 L 155 108" stroke="#000000" strokeWidth="1.5" opacity="0.15" />
          </g>
        )}

        {hairStyle === "pixie" && (
          <g>
            {/* Pixie base */}
            <path
              d="M 100 30
                 Q 130 32 150 46
                 Q 162 58 162 78
                 Q 160 60 148 48
                 Q 128 34 100 30
                 Q 72 34 52 48
                 Q 40 60 38 78
                 Q 38 58 50 46
                 Q 70 32 100 30 Z"
              fill={hairColorHex}
            />
            {/* Pixie bangs */}
            <path
              d="M 85 32
                 Q 80 35 75 42
                 Q 72 48 70 55
                 L 75 52
                 Q 78 45 82 40
                 Q 86 35 90 33
                 L 85 32 Z"
              fill={hairColorHex}
            />
            <path
              d="M 115 32
                 Q 120 35 125 42
                 Q 128 48 130 55
                 L 125 52
                 Q 122 45 118 40
                 Q 114 35 110 33
                 L 115 32 Z"
              fill={hairColorHex}
            />
            {/* Texture */}
            <path d="M 70 50 Q 75 45 80 48" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" fill="none" />
            <path d="M 120 50 Q 125 45 130 48" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" fill="none" />
          </g>
        )}

        {hairStyle === "braids" && (
          <g>
            {/* Top hair */}
            <ellipse cx="100" cy="50" rx="52" ry="28" fill={hairColorHex} />
            {/* Left braid */}
            <motion.g
              animate={animate ? { y: [0, 2, 0] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M 38 80
                   L 35 95
                   Q 33 105 35 115
                   Q 37 125 35 135
                   Q 33 145 35 155
                   L 38 155
                   Q 40 145 38 135
                   Q 36 125 38 115
                   Q 40 105 38 95
                   L 41 80
                   L 38 80 Z"
                fill={hairColorHex}
                stroke={hairColorHex}
                strokeWidth="1"
              />
              {/* Braid segments */}
              <ellipse cx="37" cy="90" rx="5" ry="3" fill={skinColor} opacity="0.3" />
              <ellipse cx="37" cy="105" rx="5" ry="3" fill={skinColor} opacity="0.3" />
              <ellipse cx="37" cy="120" rx="5" ry="3" fill={skinColor} opacity="0.3" />
              <ellipse cx="37" cy="135" rx="5" ry="3" fill={skinColor} opacity="0.3" />
            </motion.g>
            {/* Right braid */}
            <motion.g
              animate={animate ? { y: [0, 2, 0] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <path
                d="M 162 80
                   L 165 95
                   Q 167 105 165 115
                   Q 163 125 165 135
                   Q 167 145 165 155
                   L 162 155
                   Q 160 145 162 135
                   Q 164 125 162 115
                   Q 160 105 162 95
                   L 159 80
                   L 162 80 Z"
                fill={hairColorHex}
                stroke={hairColorHex}
                strokeWidth="1"
              />
              {/* Braid segments */}
              <ellipse cx="163" cy="90" rx="5" ry="3" fill={skinColor} opacity="0.3" />
              <ellipse cx="163" cy="105" rx="5" ry="3" fill={skinColor} opacity="0.3" />
              <ellipse cx="163" cy="120" rx="5" ry="3" fill={skinColor} opacity="0.3" />
              <ellipse cx="163" cy="135" rx="5" ry="3" fill={skinColor} opacity="0.3" />
            </motion.g>
          </g>
        )}

        {hairStyle === "curly" && (
          <g>
            {/* Base curls on top */}
            <motion.circle
              cx="70"
              cy="48"
              r="18"
              fill={hairColorHex}
              animate={animate ? { r: [18, 19, 18], cy: [48, 50, 48] } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="90"
              cy="38"
              r="20"
              fill={hairColorHex}
              animate={animate ? { r: [20, 21, 20], cy: [38, 40, 38] } : undefined}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="110"
              cy="38"
              r="20"
              fill={hairColorHex}
              animate={animate ? { r: [20, 21, 20], cy: [38, 40, 38] } : undefined}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="130"
              cy="48"
              r="18"
              fill={hairColorHex}
              animate={animate ? { r: [18, 19, 18], cy: [48, 50, 48] } : undefined}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Side curls */}
            <circle cx="48" cy="70" r="16" fill={hairColorHex} />
            <circle cx="152" cy="70" r="16" fill={hairColorHex} />
            <circle cx="42" cy="90" r="14" fill={hairColorHex} />
            <circle cx="158" cy="90" r="14" fill={hairColorHex} />
            {/* Highlights */}
            <circle cx="90" cy="35" r="6" fill="#FFFFFF" opacity="0.3" />
            <circle cx="110" cy="35" r="6" fill="#FFFFFF" opacity="0.3" />
            <circle cx="70" cy="45" r="5" fill="#FFFFFF" opacity="0.3" />
            <circle cx="130" cy="45" r="5" fill="#FFFFFF" opacity="0.3" />
          </g>
        )}

        {hairStyle === "afro" && (
          <g>
            {/* Large afro */}
            <circle cx="100" cy="58" r="62" fill={hairColorHex} />
            {/* Texture circles for afro texture */}
            <g opacity="0.2">
              <circle cx="60" cy="40" r="8" fill="#000000" />
              <circle cx="80" cy="30" r="8" fill="#000000" />
              <circle cx="100" cy="25" r="8" fill="#000000" />
              <circle cx="120" cy="30" r="8" fill="#000000" />
              <circle cx="140" cy="40" r="8" fill="#000000" />
              <circle cx="50" cy="60" r="8" fill="#000000" />
              <circle cx="150" cy="60" r="8" fill="#000000" />
              <circle cx="45" cy="80" r="8" fill="#000000" />
              <circle cx="155" cy="80" r="8" fill="#000000" />
              <circle cx="70" cy="50" r="6" fill="#000000" />
              <circle cx="130" cy="50" r="6" fill="#000000" />
              <circle cx="85" cy="45" r="6" fill="#000000" />
              <circle cx="115" cy="45" r="6" fill="#000000" />
            </g>
            {/* Shine highlight */}
            <ellipse cx="80" cy="30" rx="15" ry="20" fill="#FFFFFF" opacity="0.2" />
          </g>
        )}

        {/* Rosy Cheeks */}
        <ellipse cx="60" cy="110" rx="12" ry="9" fill="#FF9AA2" opacity="0.4" />
        <ellipse cx="140" cy="110" rx="12" ry="9" fill="#FF9AA2" opacity="0.4" />

        {/* Face Expressions */}
        {faceExpression === "happy" && (
          <g>
            {/* Eyes */}
            <motion.ellipse
              cx="75"
              cy="95"
              rx="5"
              ry="6"
              fill="#2C2C2C"
              animate={animate ? { ry: [6, 0.5, 6] } : undefined}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
            />
            <motion.ellipse
              cx="125"
              cy="95"
              rx="5"
              ry="6"
              fill="#2C2C2C"
              animate={animate ? { ry: [6, 0.5, 6] } : undefined}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
            />
            {/* Smile */}
            <path
              d="M 75 115 Q 100 125 125 115"
              stroke="#2C2C2C"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {faceExpression === "excited" && (
          <g>
            {/* Wide eyes */}
            <circle cx="75" cy="92" r="7" fill="#FFFFFF" />
            <circle cx="75" cy="92" r="5" fill="#2C2C2C" />
            <circle cx="73" cy="90" r="2" fill="#FFFFFF" />
            <circle cx="125" cy="92" r="7" fill="#FFFFFF" />
            <circle cx="125" cy="92" r="5" fill="#2C2C2C" />
            <circle cx="123" cy="90" r="2" fill="#FFFFFF" />
            {/* Big smile */}
            <path
              d="M 70 112 Q 100 132 130 112"
              stroke="#2C2C2C"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="100" cy="120" rx="18" ry="12" fill="#2C2C2C" opacity="0.15" />
          </g>
        )}

        {faceExpression === "laughing" && (
          <g>
            {/* Closed eyes from laughing */}
            <path d="M 65 92 Q 75 88 85 92" stroke="#2C2C2C" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 115 92 Q 125 88 135 92" stroke="#2C2C2C" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Wide open mouth */}
            <ellipse cx="100" cy="118" rx="20" ry="14" fill="#2C2C2C" opacity="0.8" />
            <path
              d="M 68 110 Q 100 135 132 110"
              stroke="#2C2C2C"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {faceExpression === "wink" && (
          <g>
            {/* Winking eye */}
            <path d="M 65 95 Q 75 93 85 95" stroke="#2C2C2C" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Open eye */}
            <circle cx="125" cy="95" r="5" fill="#2C2C2C" />
            {/* Smile */}
            <path
              d="M 78 115 Q 100 123 122 115"
              stroke="#2C2C2C"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {faceExpression === "cool" && (
          <g>
            {/* Sunglasses */}
            <rect x="60" y="88" width="30" height="14" rx="7" fill="#2C2C2C" opacity="0.8" />
            <rect x="110" y="88" width="30" height="14" rx="7" fill="#2C2C2C" opacity="0.8" />
            <rect x="90" y="94" width="20" height="4" rx="2" fill="#2C2C2C" opacity="0.8" />
            {/* Glare on glasses */}
            <ellipse cx="68" cy="92" rx="6" ry="4" fill="#FFFFFF" opacity="0.3" />
            <ellipse cx="118" cy="92" rx="6" ry="4" fill="#FFFFFF" opacity="0.3" />
            {/* Slight smile */}
            <path
              d="M 82 116 Q 100 122 118 116"
              stroke="#2C2C2C"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {faceExpression === "silly" && (
          <g>
            {/* Different sized eyes */}
            <circle cx="75" cy="93" r="5" fill="#2C2C2C" />
            <circle cx="125" cy="90" r="7" fill="#2C2C2C" />
            {/* Tongue out */}
            <path
              d="M 85 118 Q 95 115 105 118 Q 112 122 115 116"
              stroke="#2C2C2C"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="108" cy="120" rx="8" ry="6" fill="#FF6B9D" />
          </g>
        )}

        {/* Accessories */}
        {accessory === "glasses" && (
          <g>
            <circle cx="75" cy="95" r="14" fill="none" stroke="#2C2C2C" strokeWidth="2.5" />
            <circle cx="125" cy="95" r="14" fill="none" stroke="#2C2C2C" strokeWidth="2.5" />
            <path d="M 89 95 L 111 95" stroke="#2C2C2C" strokeWidth="2.5" />
            <ellipse cx="70" cy="91" rx="5" ry="3" fill="#FFFFFF" opacity="0.5" />
            <ellipse cx="120" cy="91" rx="5" ry="3" fill="#FFFFFF" opacity="0.5" />
          </g>
        )}

        {accessory === "sunglasses" && (
          <g>
            <ellipse cx="75" cy="95" rx="17" ry="10" fill="#2C2C2C" opacity="0.85" />
            <ellipse cx="125" cy="95" rx="17" ry="10" fill="#2C2C2C" opacity="0.85" />
            <path d="M 92 95 L 108 95" stroke="#2C2C2C" strokeWidth="3" />
            <ellipse cx="68" cy="92" rx="6" ry="3" fill="#FFFFFF" opacity="0.3" />
            <ellipse cx="118" cy="92" rx="6" ry="3" fill="#FFFFFF" opacity="0.3" />
          </g>
        )}

        {accessory === "headband" && (
          <g>
            <path
              d="M 35 72 Q 35 55 100 55 Q 165 55 165 72"
              stroke={hairColorHex === "#FFD966" ? "#FF6B9D" : "#3498DB"}
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="100" cy="55" r="6" fill={hairColorHex === "#FFD966" ? "#FF6B9D" : "#3498DB"} />
          </g>
        )}

        {accessory === "bow" && (
          <g>
            <path
              d="M 82 38 Q 87 28 97 33 Q 100 23 103 33 Q 113 28 118 38"
              fill="#FF6B9D"
              stroke="#E74C3C"
              strokeWidth="1.5"
            />
            <circle cx="100" cy="35" r="4" fill="#E74C3C" />
            <ellipse cx="90" cy="33" rx="3" ry="2" fill="#FFFFFF" opacity="0.5" />
          </g>
        )}

        {accessory === "flower" && (
          <g transform="translate(135, 50)">
            <circle cx="0" cy="0" r="10" fill="#FF6B9D" />
            <circle cx="8" cy="-5" r="7" fill="#FFD966" />
            <circle cx="5" cy="8" r="7" fill="#FFD966" />
            <circle cx="-8" cy="3" r="7" fill="#FFD966" />
            <circle cx="-3" cy="-8" r="7" fill="#FFD966" />
            <circle cx="0" cy="0" r="5" fill="#F39C12" />
          </g>
        )}

        {accessory === "cap" && (
          <g>
            <ellipse cx="115" cy="50" rx="35" ry="10" fill="#3498DB" transform="rotate(-5 115 50)" />
            <ellipse cx="100" cy="45" rx="48" ry="25" fill="#3498DB" />
            <ellipse cx="100" cy="40" rx="44" ry="20" fill="#2980B9" />
            <circle cx="100" cy="38" r="4" fill="#2471A3" />
          </g>
        )}

        {accessory === "beanie" && (
          <g>
            <path
              d="M 45 65
                 Q 45 35 100 32
                 Q 155 35 155 65
                 L 155 70
                 Q 155 75 150 75
                 L 50 75
                 Q 45 75 45 70
                 L 45 65 Z"
              fill="#E74C3C"
            />
            <rect x="45" y="65" width="110" height="8" rx="4" fill="#C0392B" />
            <circle cx="100" cy="28" r="5" fill="#FF9AA2" />
          </g>
        )}

        {accessory === "crown" && (
          <g>
            <ellipse cx="100" cy="42" rx="48" ry="7" fill="#D68910" />
            <polygon
              points="68,42 73,22 81,35 88,20 96,35 100,18 104,35 112,20 119,35 127,22 132,42"
              fill="#F39C12"
              stroke="#D68910"
              strokeWidth="2"
            />
            <circle cx="78" cy="30" r="4" fill="#E74C3C" />
            <ellipse cx="78" cy="28" rx="2" ry="1" fill="#FFFFFF" opacity="0.7" />
            <circle cx="100" cy="23" r="5" fill="#9B59B6" />
            <ellipse cx="100" cy="21" rx="2.5" ry="1.5" fill="#FFFFFF" opacity="0.7" />
            <circle cx="122" cy="30" r="4" fill="#3498DB" />
            <ellipse cx="122" cy="28" rx="2" ry="1" fill="#FFFFFF" opacity="0.7" />
          </g>
        )}

        {accessory === "halo" && (
          <motion.ellipse
            cx="100"
            cy="15"
            rx="32"
            ry="7"
            fill="none"
            stroke="#FFD700"
            strokeWidth="5"
            animate={animate ? { opacity: [0.5, 1, 0.5], ry: [7, 9, 7] } : undefined}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {accessory === "headphones" && (
          <g>
            <path
              d="M 55 90 Q 55 50 100 47 Q 145 50 145 90"
              stroke="#2C3E50"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="55" cy="95" rx="11" ry="15" fill="#E74C3C" />
            <ellipse cx="145" cy="95" rx="11" ry="15" fill="#E74C3C" />
            <ellipse cx="55" cy="95" rx="7" ry="11" fill="#2C3E50" opacity="0.3" />
            <ellipse cx="145" cy="95" rx="7" ry="11" fill="#2C3E50" opacity="0.3" />
            <ellipse cx="53" cy="92" rx="3" ry="2" fill="#FFFFFF" opacity="0.5" />
            <ellipse cx="143" cy="92" rx="3" ry="2" fill="#FFFFFF" opacity="0.5" />
          </g>
        )}

        {/* Animated sparkles */}
        {animate && (
          <>
            <motion.circle
              cx="35"
              cy="70"
              r="2.5"
              fill="#FFD700"
              animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], y: [0, -20] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle
              cx="165"
              cy="80"
              r="2"
              fill="#FF6B9D"
              animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], y: [0, -18] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
            <motion.path
              d="M 40 110 L 43 116 L 37 116 Z"
              fill="#3498DB"
              animate={{ opacity: [0, 1, 0], y: [0, -15] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut", delay: 1 }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}
