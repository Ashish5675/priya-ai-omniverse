// ─── PriyaAvatar — 2D flat portrait with advanced mood animations ─────────────
// Stylized SVG illustration: young woman, long brown wavy hair, blue mini dress,
// wedge sandals, light skin, subtle cyan holographic glow border.
// CRITICAL: SVG content is NEVER modified — only the WRAPPER element is animated.

import { useAriaStore } from "@/store/useAriaStore";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface PriyaAvatarProps {
  /** Extra CSS classes applied to the outer wrapper */
  className?: string;
  /** Height of the SVG in pixels (width scales proportionally 3:5) */
  height?: number;
}

// Mood → glow color (used for ambient radial glow background)
const MOOD_COLORS: Record<string, string> = {
  idle: "oklch(0.7 0.18 200 / 0.12)",
  speaking: "oklch(0.85 0.2 200 / 0.16)",
  thinking: "oklch(0.58 0.17 282 / 0.14)",
  happy: "rgba(57,255,20,0.12)",
  alert: "oklch(0.65 0.25 27 / 0.14)",
};

const MOOD_BADGE_COLOR: Record<string, string> = {
  idle: "oklch(0.7 0.18 200)",
  speaking: "oklch(0.85 0.2 200)",
  thinking: "oklch(0.58 0.17 282)",
  happy: "#39FF14",
  alert: "oklch(0.65 0.25 27)",
};

// Mood → box-shadow spread — plain strings (no JS interpolation needed)
const MOOD_GLOW_SPREAD: Record<string, string> = {
  idle: "0 0 8px oklch(0.7 0.18 200 / 0.6), 0 0 24px oklch(0.7 0.18 200 / 0.25), inset 0 0 8px oklch(0.7 0.18 200 / 0.05)",
  speaking:
    "0 0 20px oklch(0.85 0.2 200 / 0.9), 0 0 50px oklch(0.85 0.2 200 / 0.5), inset 0 0 12px oklch(0.85 0.2 200 / 0.1)",
  thinking:
    "0 0 12px oklch(0.58 0.17 282 / 0.7), 0 0 30px oklch(0.58 0.17 282 / 0.3), inset 0 0 10px oklch(0.58 0.17 282 / 0.08)",
  happy:
    "0 0 16px rgba(57,255,20,0.75), 0 0 40px rgba(57,255,20,0.35), inset 0 0 10px rgba(57,255,20,0.08)",
  alert:
    "0 0 24px oklch(0.65 0.25 27 / 0.85), 0 0 55px oklch(0.65 0.25 27 / 0.4), inset 0 0 12px oklch(0.65 0.25 27 / 0.1)",
};

const MOOD_GLOW_PULSE: Record<string, string> = {
  idle: "0 0 12px oklch(0.7 0.18 200 / 0.75), 0 0 32px oklch(0.7 0.18 200 / 0.35), inset 0 0 8px oklch(0.7 0.18 200 / 0.06)",
  speaking:
    "0 0 30px oklch(0.85 0.2 200 / 1), 0 0 70px oklch(0.85 0.2 200 / 0.65), inset 0 0 16px oklch(0.85 0.2 200 / 0.15)",
  thinking:
    "0 0 18px oklch(0.58 0.17 282 / 0.8), 0 0 40px oklch(0.58 0.17 282 / 0.4), inset 0 0 12px oklch(0.58 0.17 282 / 0.1)",
  happy:
    "0 0 24px rgba(57,255,20,0.9), 0 0 55px rgba(57,255,20,0.5), inset 0 0 14px rgba(57,255,20,0.12)",
  alert:
    "0 0 35px oklch(0.65 0.25 27 / 1), 0 0 75px oklch(0.65 0.25 27 / 0.55), inset 0 0 16px oklch(0.65 0.25 27 / 0.14)",
};

const MOOD_BORDER: Record<string, string> = {
  idle: "oklch(0.7 0.18 200 / 0.55)",
  speaking: "oklch(0.85 0.2 200 / 0.9)",
  thinking: "oklch(0.58 0.17 282 / 0.65)",
  happy: "rgba(57,255,20,0.75)",
  alert: "oklch(0.65 0.25 27 / 0.85)",
};

const MOOD_GLOW_SPEED: Record<string, number> = {
  idle: 3,
  speaking: 0.5,
  thinking: 2,
  happy: 1.5,
  alert: 0.35,
};

export function PriyaAvatar({
  className = "",
  height = 480,
}: PriyaAvatarProps) {
  const w = (height * 3) / 5;
  const { avatarMood, isSpeaking } = useAriaStore();

  // --- Eye gaze drift (idle only) ---
  const [gazeOffset, setGazeOffset] = useState({ x: 0, y: 0 });
  const gazeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (avatarMood !== "idle") {
      setGazeOffset({ x: 0, y: 0 });
      if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
      return;
    }

    const scheduleGaze = () => {
      const delay = 3000 + Math.random() * 2000;
      gazeTimerRef.current = setTimeout(() => {
        setGazeOffset({
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 4,
        });
        scheduleGaze();
      }, delay);
    };

    scheduleGaze();
    return () => {
      if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
    };
  }, [avatarMood]);

  const isSpeakingMode = isSpeaking || avatarMood === "speaking";

  // Breathing (idle) vs speaking pulse
  const bodyAnim = isSpeakingMode
    ? { scale: [1, 1.03, 1] }
    : avatarMood === "idle"
      ? { scaleY: [1, 1.015, 1], scaleX: [1, 0.985, 1] }
      : { scale: 1 };

  const bodyTransition = isSpeakingMode
    ? {
        duration: 0.4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      }
    : avatarMood === "idle"
      ? {
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut" as const,
        }
      : { duration: 0.4 };

  const glowSpread = MOOD_GLOW_SPREAD[avatarMood] ?? MOOD_GLOW_SPREAD.idle;
  const glowPulse = MOOD_GLOW_PULSE[avatarMood] ?? MOOD_GLOW_PULSE.idle;
  const borderColor = MOOD_BORDER[avatarMood] ?? MOOD_BORDER.idle;
  const ambientColor = MOOD_COLORS[avatarMood] ?? MOOD_COLORS.idle;
  const badgeColor = MOOD_BADGE_COLOR[avatarMood] ?? MOOD_BADGE_COLOR.idle;
  const glowSpeed = MOOD_GLOW_SPEED[avatarMood] ?? 3;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: w, height }}
    >
      {/* Outer ambient radial glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 85% 90% at 50% 45%, ${ambientColor} 0%, transparent 68%)`,
          transition: "background 0.5s ease",
        }}
      />

      {/* Animated glow container border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: [glowSpread, glowPulse, glowSpread],
          borderColor: borderColor,
        }}
        transition={{
          duration: glowSpeed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          borderColor: { duration: 0.5, ease: "easeInOut" },
          boxShadow: {
            duration: glowSpeed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
        style={{
          border: `2px solid ${borderColor}`,
          boxShadow: glowSpread,
        }}
      />

      {/* Eye gaze drift wrapper */}
      <motion.div
        animate={{
          x: avatarMood === "idle" ? gazeOffset.x : 0,
          y: avatarMood === "idle" ? gazeOffset.y : 0,
        }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        style={{ display: "flex", width: w, height }}
      >
        {/* Breathing / speaking pulse body wrapper */}
        <motion.div
          animate={bodyAnim}
          transition={bodyTransition}
          style={{
            width: w,
            height,
            transformOrigin: "center bottom",
            display: "flex",
          }}
        >
          {/* ── THE UNALTERED 2D SVG PORTRAIT ─────────────────────────── */}
          <svg
            viewBox="0 0 300 500"
            width={w}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Priya — AI assistant portrait"
            style={{
              display: "block",
              filter: "drop-shadow(0 0 18px oklch(0.7 0.18 200 / 0.5))",
            }}
          >
            <defs>
              <radialGradient id="bg-glow" cx="50%" cy="40%" r="55%">
                <stop
                  offset="0%"
                  stopColor="oklch(0.7 0.18 200)"
                  stopOpacity="0.10"
                />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="skin" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="#f9dfc5" />
                <stop offset="100%" stopColor="#edc49a" />
              </linearGradient>
              <linearGradient id="hair-base" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="#5c3317" />
                <stop offset="50%" stopColor="#3d1f0a" />
                <stop offset="100%" stopColor="#2a1206" />
              </linearGradient>
              <linearGradient id="hair-shine" x1="0" y1="0" x2="1" y2="0.3">
                <stop offset="0%" stopColor="#a0622a" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#5c3317" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="dress" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="#1e7de0" />
                <stop offset="50%" stopColor="#1565c0" />
                <stop offset="100%" stopColor="#0d47a1" />
              </linearGradient>
              <linearGradient id="dress-sheen" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#64b5f6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#1e7de0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="wedge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b6914" />
                <stop offset="100%" stopColor="#5d430c" />
              </linearGradient>
              <radialGradient id="iris" cx="45%" cy="38%" r="55%">
                <stop offset="0%" stopColor="#5e3a1a" />
                <stop offset="70%" stopColor="#3b2008" />
                <stop offset="100%" stopColor="#1a0d03" />
              </radialGradient>
              <pattern
                id="scanlines"
                x="0"
                y="0"
                width="300"
                height="3"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  width="300"
                  height="1"
                  fill="oklch(0.7 0.18 200)"
                  fillOpacity="0.04"
                />
              </pattern>
            </defs>

            <rect width="300" height="500" fill="url(#bg-glow)" rx="18" />

            {/* Neck */}
            <rect
              x="136"
              y="178"
              width="28"
              height="52"
              rx="10"
              fill="url(#skin)"
            />
            <ellipse
              cx="150"
              cy="228"
              rx="18"
              ry="5"
              fill="#0d47a1"
              fillOpacity="0.35"
            />

            {/* Shoulders & arms */}
            <ellipse cx="100" cy="252" rx="36" ry="22" fill="url(#dress)" />
            <ellipse cx="200" cy="252" rx="36" ry="22" fill="url(#dress)" />
            <rect
              x="64"
              y="252"
              width="26"
              height="80"
              rx="13"
              fill="url(#skin)"
            />
            <rect
              x="210"
              y="252"
              width="26"
              height="80"
              rx="13"
              fill="url(#skin)"
            />
            <rect
              x="62"
              y="328"
              width="22"
              height="70"
              rx="11"
              fill="url(#skin)"
            />
            <rect
              x="216"
              y="328"
              width="22"
              height="70"
              rx="11"
              fill="url(#skin)"
            />
            <ellipse cx="73" cy="406" rx="11" ry="14" fill="url(#skin)" />
            <ellipse cx="227" cy="406" rx="11" ry="14" fill="url(#skin)" />

            {/* Dress body */}
            <path
              d="M 100 245 Q 80 250 75 270 L 72 380 Q 90 390 150 390 Q 210 390 228 380 L 225 270 Q 220 250 200 245 Z"
              fill="url(#dress)"
            />
            <path
              d="M 100 245 Q 80 250 75 270 L 72 380 Q 90 390 150 390 Q 210 390 228 380 L 225 270 Q 220 250 200 245 Z"
              fill="url(#dress-sheen)"
            />
            <path
              d="M 128 232 L 150 260 L 172 232"
              fill="none"
              stroke="#0d47a1"
              strokeWidth="1.5"
            />
            <path
              d="M 72 340 Q 100 350 150 350 Q 200 350 228 340 L 228 380 Q 200 390 150 390 Q 100 390 72 380 Z"
              fill="#0d47a1"
              fillOpacity="0.45"
            />
            <rect
              x="80"
              y="298"
              width="140"
              height="8"
              rx="4"
              fill="#0d47a1"
              fillOpacity="0.6"
            />

            {/* Legs */}
            <rect
              x="104"
              y="388"
              width="34"
              height="52"
              rx="14"
              fill="url(#skin)"
            />
            <rect
              x="162"
              y="388"
              width="34"
              height="52"
              rx="14"
              fill="url(#skin)"
            />
            <rect
              x="106"
              y="436"
              width="28"
              height="46"
              rx="12"
              fill="url(#skin)"
            />
            <rect
              x="166"
              y="436"
              width="28"
              height="46"
              rx="12"
              fill="url(#skin)"
            />

            {/* Wedge sandals */}
            <rect
              x="104"
              y="478"
              width="32"
              height="8"
              rx="4"
              fill="url(#wedge)"
            />
            <path
              d="M 100 486 Q 105 494 136 494 L 136 492 Q 108 492 104 486 Z"
              fill="url(#wedge)"
            />
            <rect
              x="164"
              y="478"
              width="32"
              height="8"
              rx="4"
              fill="url(#wedge)"
            />
            <path
              d="M 160 486 Q 165 494 196 494 L 196 492 Q 168 492 164 486 Z"
              fill="url(#wedge)"
            />

            {/* Face */}
            <ellipse cx="150" cy="148" rx="58" ry="66" fill="url(#skin)" />
            <path
              d="M 104 162 Q 105 196 150 210 Q 195 196 196 162"
              fill="url(#skin)"
            />

            {/* Hair — back */}
            <path
              d="M 92 82 Q 70 100 68 145 Q 65 200 62 280 Q 70 320 80 360 Q 88 280 86 200 Q 90 150 96 110 Z"
              fill="url(#hair-base)"
            />
            <path
              d="M 208 82 Q 230 100 232 145 Q 235 200 238 280 Q 230 320 220 360 Q 212 280 214 200 Q 210 150 204 110 Z"
              fill="url(#hair-base)"
            />

            {/* Hair — crown */}
            <ellipse cx="150" cy="90" rx="66" ry="52" fill="url(#hair-base)" />
            <ellipse cx="130" cy="72" rx="30" ry="16" fill="url(#hair-shine)" />

            {/* Hair — side strands */}
            <path
              d="M 94 108 Q 82 140 80 180 Q 78 230 76 280 Q 82 300 88 320 Q 80 240 84 180 Q 86 140 96 115 Z"
              fill="#3d1f0a"
            />
            <path
              d="M 206 108 Q 218 140 220 180 Q 222 230 224 280 Q 218 300 212 320 Q 220 240 216 180 Q 214 140 204 115 Z"
              fill="#3d1f0a"
            />
            <path
              d="M 148 58 Q 150 75 148 95"
              stroke="#7a4820"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />

            {/* Eyebrows */}
            <path
              d="M 120 122 Q 131 117 142 120"
              stroke="#3d1f0a"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 158 120 Q 169 117 180 122"
              stroke="#3d1f0a"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Left eye */}
            <ellipse cx="131" cy="140" rx="13" ry="9" fill="#fafafa" />
            <circle cx="131" cy="140" r="7" fill="url(#iris)" />
            <circle cx="131" cy="140" r="3.5" fill="#0d0905" />
            <circle
              cx="133.5"
              cy="137.5"
              r="1.8"
              fill="white"
              fillOpacity="0.85"
            />
            <path
              d="M 118 133 Q 131 129 144 133"
              stroke="#c08060"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 118 147 Q 131 151 144 147"
              stroke="#5c3317"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />

            {/* Right eye */}
            <ellipse cx="169" cy="140" rx="13" ry="9" fill="#fafafa" />
            <circle cx="169" cy="140" r="7" fill="url(#iris)" />
            <circle cx="169" cy="140" r="3.5" fill="#0d0905" />
            <circle
              cx="171.5"
              cy="137.5"
              r="1.8"
              fill="white"
              fillOpacity="0.85"
            />
            <path
              d="M 156 133 Q 169 129 182 133"
              stroke="#c08060"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 156 147 Q 169 151 182 147"
              stroke="#5c3317"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />

            {/* Lashes — left */}
            <line
              x1={121}
              y1="131"
              x2={120}
              y2="126"
              stroke="#1a0d03"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={127}
              y1="131"
              x2={126}
              y2="126"
              stroke="#1a0d03"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={133}
              y1="131"
              x2={132}
              y2="126"
              stroke="#1a0d03"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={139}
              y1="131"
              x2={138}
              y2="126"
              stroke="#1a0d03"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Lashes — right */}
            <line
              x1={159}
              y1="131"
              x2={158}
              y2="126"
              stroke="#1a0d03"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={165}
              y1="131"
              x2={164}
              y2="126"
              stroke="#1a0d03"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={171}
              y1="131"
              x2={170}
              y2="126"
              stroke="#1a0d03"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={177}
              y1="131"
              x2={176}
              y2="126"
              stroke="#1a0d03"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Nose */}
            <path
              d="M 150 148 Q 146 165 142 172 Q 150 176 158 172 Q 154 165 150 148"
              fill="#e8b888"
              fillOpacity="0.5"
            />
            <ellipse
              cx="144"
              cy="172"
              rx="4"
              ry="3"
              fill="#d4956a"
              fillOpacity="0.5"
            />
            <ellipse
              cx="156"
              cy="172"
              rx="4"
              ry="3"
              fill="#d4956a"
              fillOpacity="0.5"
            />

            {/* Lips */}
            <path
              d="M 136 188 Q 150 198 164 188 Q 158 205 150 207 Q 142 205 136 188 Z"
              fill="#c0625e"
            />
            <path
              d="M 136 188 Q 143 182 150 183 Q 157 182 164 188 Q 157 185 150 185 Q 143 185 136 188 Z"
              fill="#b0514e"
            />
            <ellipse
              cx="150"
              cy="195"
              rx="8"
              ry="3.5"
              fill="white"
              fillOpacity="0.18"
            />

            {/* Cheek blush */}
            <ellipse
              cx="116"
              cy="160"
              rx="16"
              ry="9"
              fill="#f4a0a0"
              fillOpacity="0.22"
            />
            <ellipse
              cx="184"
              cy="160"
              rx="16"
              ry="9"
              fill="#f4a0a0"
              fillOpacity="0.22"
            />

            {/* Earrings */}
            <circle
              cx="94"
              cy="155"
              r="4"
              fill="oklch(0.7 0.18 200)"
              fillOpacity="0.9"
            />
            <circle cx="94" cy="155" r="2" fill="white" fillOpacity="0.6" />
            <circle
              cx="206"
              cy="155"
              r="4"
              fill="oklch(0.7 0.18 200)"
              fillOpacity="0.9"
            />
            <circle cx="206" cy="155" r="2" fill="white" fillOpacity="0.6" />

            {/* HUD scanlines */}
            <rect
              width="300"
              height="500"
              fill="url(#scanlines)"
              rx="18"
              pointerEvents="none"
            />

            {/* HUD label */}
            <rect
              x="70"
              y="460"
              width="160"
              height="22"
              rx="11"
              fill="oklch(0.7 0.18 200)"
              fillOpacity="0.10"
            />
            <text
              x="150"
              y="475"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="10"
              fill="oklch(0.7 0.18 200)"
              fillOpacity="0.85"
              letterSpacing="3"
            >
              PRIYA · ONLINE
            </text>
          </svg>
        </motion.div>
      </motion.div>

      {/* Micro lip-sync overlay (speaking only, never modifies SVG) */}
      <AnimatePresence>
        {isSpeakingMode && (
          <motion.div
            key="lipsync"
            className="absolute pointer-events-none rounded-full"
            style={{
              bottom: `${height * 0.38}px`,
              left: "50%",
              transform: "translateX(-50%)",
              width: `${w * 0.28}px`,
              height: `${height * 0.08}px`,
              background: "oklch(0.85 0.2 200 / 0.1)",
            }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{
              duration: 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Mood badge */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest uppercase px-3 py-0.5 rounded-full pointer-events-none"
        style={{
          background: `${ambientColor}`,
          border: `1px solid ${borderColor}`,
          color: badgeColor,
          transition: "all 0.5s ease",
        }}
      >
        {avatarMood}
      </div>
    </div>
  );
}
