import { useAnimationFrame } from "motion/react";
import { useRef, useState } from "react";
import type { AvatarMood } from "../types";

// ── Constants ─────────────────────────────────────────────────────────────────
const CYAN = "oklch(0.7 0.18 200)";
const PURPLE = "oklch(0.58 0.17 282)";
const SOFT_BLUE = "oklch(0.72 0.16 210)";

const RING_RADII = [85, 105, 125, 145];
const NODE_COUNT = 18;
const PARTICLE_COUNT = 22;

// Stable index arrays — avoids noArrayIndexKey lint rule
const HEX_INDICES = [0, 1, 2, 3, 4, 5] as const;
const POLY_INDICES = [0, 1, 2, 3] as const;
const NEURAL_INDICES = [0, 1, 2, 3, 4, 5, 6, 7] as const;
const AURA_INDICES = [0, 1, 2, 3, 4, 5] as const;

interface Particle {
  id: number;
  angle: number;
  radius: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

function makeParticles(): Particle[] {
  const colors = [CYAN, PURPLE, SOFT_BLUE];
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    angle: (i / PARTICLE_COUNT) * Math.PI * 2,
    radius: 90 + Math.random() * 80,
    size: 1.5 + Math.random() * 2.5,
    speed: 0.003 + Math.random() * 0.004,
    opacity: 0.3 + Math.random() * 0.6,
    color: colors[i % colors.length],
  }));
}

interface Props {
  mood?: AvatarMood;
  size?: number;
}

export function HeroQuantumAvatar({ mood = "idle", size = 440 }: Props) {
  const cx = size / 2;
  const cy = size / 2;

  const particlesRef = useRef<Particle[]>(makeParticles());
  const coreRotRef = useRef(0);
  const innerRotRef = useRef(0);
  const tickRef = useRef(0);
  const [, forceUpdate] = useState(0);
  const frameCount = useRef(0);

  // Speed config per mood
  const coreSpeed = mood === "thinking" ? 4 : mood === "speaking" ? 3 : 1;
  const particleSpeedMult =
    mood === "thinking" ? 2.5 : mood === "speaking" ? 2 : 1;

  useAnimationFrame((_, delta) => {
    tickRef.current += delta / 1000;
    coreRotRef.current += (delta / 1000) * coreSpeed * 0.4;
    innerRotRef.current -= (delta / 1000) * coreSpeed * 0.25;

    for (let i = 0; i < particlesRef.current.length; i++) {
      particlesRef.current[i] = {
        ...particlesRef.current[i],
        angle:
          particlesRef.current[i].angle +
          particlesRef.current[i].speed * particleSpeedMult,
      };
    }

    // Throttle re-renders to ~30fps to avoid overloading React
    frameCount.current += 1;
    if (frameCount.current % 2 === 0) {
      forceUpdate((k) => k + 1);
    }
  });

  const tick = tickRef.current;
  const particles = particlesRef.current;

  // Mood-based aura glow
  const auraColor =
    mood === "thinking" ? PURPLE : mood === "speaking" ? CYAN : CYAN;

  const auraOpacity =
    mood === "thinking"
      ? 0.35
      : mood === "speaking"
        ? 0.45
        : mood === "idle"
          ? 0.18 + Math.sin(tick * 0.8) * 0.06
          : 0.28;

  const corePulse = 1 + Math.sin(tick * 1.2) * 0.04;
  const ringPulse = mood === "speaking" ? 1 + Math.sin(tick * 4) * 0.05 : 1;

  // No listening state in AvatarMood — waveform rings shown during speaking
  const waveRings = mood === "speaking" ? [0, 1, 2] : [];
  const waveExpand = (i: number) => (tick * 60 + i * 25) % 80;

  // Thinking: random node flashes
  const [flashNodes] = useState(() =>
    Array.from({ length: NODE_COUNT }, (_, i) => i),
  );
  const nodeActive = (i: number) =>
    mood === "thinking" && Math.sin(tick * (3 + i * 0.4)) > 0.55;

  return (
    <div
      data-ocid="home.hero_avatar"
      style={{
        width: size,
        height: size,
        position: "relative",
        flexShrink: 0,
      }}
      aria-label="Priya Quantum Brain AI Avatar"
      role="img"
    >
      {/* Outer energy aura */}
      <div
        style={{
          position: "absolute",
          inset: -24,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${auraColor.replace(")", ` / ${auraOpacity})`)}, transparent 70%)`,
          filter: "blur(28px)",
          pointerEvents: "none",
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Holographic projection cone at base */}
      <div
        style={{
          position: "absolute",
          bottom: -12,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 32,
          background: `linear-gradient(to bottom, ${CYAN.replace(")", " / 0.18)")}, transparent)`,
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block", overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hqa-core-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={CYAN} stopOpacity="0.9" />
            <stop offset="40%" stopColor={SOFT_BLUE} stopOpacity="0.6" />
            <stop offset="80%" stopColor={PURPLE} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hqa-inner-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="50%" stopColor={CYAN} stopOpacity="0.7" />
            <stop offset="100%" stopColor={PURPLE} stopOpacity="0.2" />
          </radialGradient>
          <filter id="hqa-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="hqa-strong-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── Background deep glow ──────────────────────────── */}
        <circle
          cx={cx}
          cy={cy}
          r={170}
          fill="none"
          stroke={CYAN}
          strokeWidth="0"
          opacity="0"
        />
        <circle
          cx={cx}
          cy={cy}
          r={168}
          fill="radial-gradient(circle, oklch(0.12 0 0 / 0.95), transparent)"
          opacity="0.9"
        />

        {/* ── Neural orbit rings ────────────────────────────── */}
        {RING_RADII.map((r, ri) => (
          <g
            key={r}
            transform={`rotate(${coreRotRef.current * (ri % 2 === 0 ? 1 : -1) * 0.3}, ${cx}, ${cy})`}
          >
            <ellipse
              cx={cx}
              cy={cy}
              rx={r * ringPulse}
              ry={r * 0.38 * ringPulse}
              fill="none"
              stroke={ri % 2 === 0 ? CYAN : PURPLE}
              strokeWidth={ri === 1 ? 1.5 : 1}
              opacity={0.15 + ri * 0.06}
              strokeDasharray={`${4 + ri * 2} ${6 + ri * 2}`}
            />
          </g>
        ))}

        {/* ── Neural network nodes ──────────────────────────── */}
        {flashNodes.map((i) => {
          const angle =
            (i / NODE_COUNT) * Math.PI * 2 + coreRotRef.current * 0.05;
          const ringIdx = i % RING_RADII.length;
          const orbitR = RING_RADII[ringIdx];
          const nx = cx + Math.cos(angle) * orbitR;
          const ny = cy + Math.sin(angle) * orbitR * 0.38;
          const active = nodeActive(i);
          const color = i % 3 === 0 ? CYAN : i % 3 === 1 ? PURPLE : SOFT_BLUE;
          return (
            <g
              key={i}
              filter={active ? "url(#hqa-strong-glow)" : "url(#hqa-glow)"}
            >
              <circle
                cx={nx}
                cy={ny}
                r={active ? 4 : 2.5}
                fill={color}
                opacity={active ? 0.95 : 0.4}
              />
              {/* Connection line to center */}
              {active && (
                <line
                  x1={nx}
                  y1={ny}
                  x2={cx}
                  y2={cy}
                  stroke={color}
                  strokeWidth="0.8"
                  opacity={0.4}
                  strokeDasharray="3 5"
                />
              )}
            </g>
          );
        })}

        {/* ── Listening waveform expansion rings ───────────── */}
        {waveRings.map((i) => {
          const expansion = waveExpand(i);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={60 + expansion}
              fill="none"
              stroke={SOFT_BLUE}
              strokeWidth="2"
              opacity={Math.max(0, 0.7 - expansion / 80)}
            />
          );
        })}

        {/* ── Floating particles ────────────────────────────── */}
        {particles.map((p) => {
          const px = cx + Math.cos(p.angle) * p.radius;
          const py = cy + Math.sin(p.angle) * p.radius * 0.45;
          return (
            <circle
              key={p.id}
              cx={px}
              cy={py}
              r={p.size}
              fill={p.color}
              opacity={p.opacity * (0.7 + Math.sin(tick + p.id) * 0.3)}
            />
          );
        })}

        {/* ── Rotating outer geometry (hexagon ring) ────────── */}
        <g transform={`rotate(${coreRotRef.current * 0.6}, ${cx}, ${cy})`}>
          {HEX_INDICES.map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            const gx = cx + Math.cos(angle) * 68;
            const gy = cy + Math.sin(angle) * 68;
            return (
              <polygon
                key={`hex-${i}`}
                points={`${gx},${gy - 5} ${gx + 4.3},${gy + 2.5} ${gx - 4.3},${gy + 2.5}`}
                fill={i % 2 === 0 ? CYAN : PURPLE}
                opacity={0.35}
                stroke={i % 2 === 0 ? CYAN : PURPLE}
                strokeWidth="0.5"
              />
            );
          })}
        </g>

        {/* ── Counter-rotating inner polyhedron ─────────────── */}
        <g transform={`rotate(${innerRotRef.current}, ${cx}, ${cy})`}>
          {POLY_INDICES.map((i) => {
            const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
            const px2 = cx + Math.cos(angle) * 38;
            const py2 = cy + Math.sin(angle) * 38;
            return (
              <rect
                key={`poly-${i}`}
                x={px2 - 4}
                y={py2 - 4}
                width={8}
                height={8}
                fill="none"
                stroke={SOFT_BLUE}
                strokeWidth="1"
                opacity={0.5}
                transform={`rotate(45, ${px2}, ${py2})`}
              />
            );
          })}
          <line
            x1={cx - 38}
            y1={cy}
            x2={cx + 38}
            y2={cy}
            stroke={SOFT_BLUE}
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1={cx}
            y1={cy - 38}
            x2={cx}
            y2={cy + 38}
            stroke={SOFT_BLUE}
            strokeWidth="0.5"
            opacity="0.3"
          />
        </g>

        {/* ── Brain core sphere ─────────────────────────────── */}
        <g
          filter="url(#hqa-strong-glow)"
          transform={`scale(${corePulse}, ${corePulse}) translate(${cx * (1 - corePulse)}, ${cy * (1 - corePulse)})`}
        >
          {/* Outer glass sphere */}
          <circle
            cx={cx}
            cy={cy}
            r={54}
            fill="none"
            stroke={CYAN}
            strokeWidth="1.5"
            opacity="0.5"
          />
          <circle cx={cx} cy={cy} r={54} fill={CYAN} opacity="0.04" />
          {/* Mid sphere */}
          <circle
            cx={cx}
            cy={cy}
            r={40}
            fill="none"
            stroke={PURPLE}
            strokeWidth="1"
            opacity="0.35"
            strokeDasharray="4 4"
          />
          {/* Brain core fill */}
          <circle
            cx={cx}
            cy={cy}
            r={30}
            fill="url(#hqa-core-grad)"
            opacity="0.7"
          />
          {/* Inner bright nucleus */}
          <circle
            cx={cx}
            cy={cy}
            r={12}
            fill="url(#hqa-inner-grad)"
            opacity={0.85 + Math.sin(tick * 2) * 0.1}
          />
          {/* Core neural lines */}
          {NEURAL_INDICES.map((i) => {
            const a = (i / 8) * Math.PI * 2 + tick * 0.3;
            return (
              <line
                key={`neural-${i}`}
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(a) * 28}
                y2={cy + Math.sin(a) * 28}
                stroke={i % 2 === 0 ? CYAN : PURPLE}
                strokeWidth="0.8"
                opacity={0.5 + Math.sin(tick * 2 + i) * 0.25}
              />
            );
          })}
        </g>

        {/* ── Speaking double-ring pulse ────────────────────── */}
        {mood === "speaking" && (
          <>
            <circle
              cx={cx}
              cy={cy}
              r={58 + Math.sin(tick * 6) * 8}
              fill="none"
              stroke={CYAN}
              strokeWidth="2.5"
              opacity={0.6 + Math.sin(tick * 6) * 0.2}
            />
            <circle
              cx={cx}
              cy={cy}
              r={70 + Math.sin(tick * 6 + 1) * 10}
              fill="none"
              stroke={PURPLE}
              strokeWidth="1.5"
              opacity={0.35 + Math.sin(tick * 6 + 1) * 0.15}
            />
          </>
        )}

        {/* ── Energy aura lines ─────────────────────────────── */}
        {AURA_INDICES.map((i) => {
          const a = (i / 6) * Math.PI * 2 + tick * 0.2;
          const r1 = 56;
          const r2 = 80 + Math.sin(tick * 1.5 + i) * 12;
          return (
            <line
              key={`aura-${i}`}
              x1={cx + Math.cos(a) * r1}
              y1={cy + Math.sin(a) * r1}
              x2={cx + Math.cos(a) * r2}
              y2={cy + Math.sin(a) * r2}
              stroke={i % 2 === 0 ? CYAN : SOFT_BLUE}
              strokeWidth="1"
              opacity={0.25 + Math.sin(tick + i) * 0.15}
            />
          );
        })}

        {/* ── HUD status text ───────────────────────────────── */}
        <text
          x={cx}
          y={cy + 100}
          textAnchor="middle"
          fill={CYAN}
          fontSize="8"
          fontFamily="monospace"
          letterSpacing="2"
          opacity="0.5"
        >
          QUANTUM CORE · ONLINE
        </text>
      </svg>
    </div>
  );
}
