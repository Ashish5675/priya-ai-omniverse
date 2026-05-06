import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Bot,
  Brain,
  ChevronRight,
  FileText,
  Github,
  Mic,
  Phone,
  Shirt,
  Sparkles,
  Twitter,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { HeroQuantumAvatar } from "../components/HeroQuantumAvatar";
import { useAriaStore } from "../store/useAriaStore";

// ── Feature highlight cards ───────────────────────────────────────────────────────

const FEATURE_CARDS = [
  {
    icon: Mic,
    title: "Voice Interaction",
    description:
      "Speak naturally — Priya hears, understands, and replies in a realistic female voice.",
    accent: "oklch(0.7 0.18 200)",
    glowColor: "oklch(0.7 0.18 200 / 0.5)",
  },
  {
    icon: Brain,
    title: "Multi-Agent Intelligence",
    description:
      "Autonomous agent pipeline: Planner, Research, Executor, and Critic working in concert.",
    accent: "oklch(0.58 0.17 282)",
    glowColor: "oklch(0.58 0.17 282 / 0.5)",
  },
  {
    icon: BarChart3,
    title: "Real-time Insights",
    description:
      "Live analytics, market intelligence, and decision-scoring delivered in milliseconds.",
    accent: "oklch(0.72 0.16 210)",
    glowColor: "oklch(0.72 0.16 210 / 0.5)",
  },
  {
    icon: Zap,
    title: "Autonomous Actions",
    description:
      "Priya executes multi-step tasks end-to-end — from code generation to IoT control.",
    accent: "oklch(0.65 0.18 245)",
    glowColor: "oklch(0.65 0.18 245 / 0.5)",
    gradient: true,
  },
];

// ── Metrics data ───────────────────────────────────────────────────────────────────

const METRICS = [
  {
    display: "99.9%",
    target: 99.9,
    suffix: "%",
    label: "UPTIME",
    isFloat: true,
  },
  {
    display: "<200ms",
    target: 200,
    suffix: "ms",
    prefix: "<",
    label: "RESPONSE TIME",
    isFloat: false,
  },
  {
    display: "50+",
    target: 50,
    suffix: "+",
    label: "LANGUAGES",
    isFloat: false,
  },
];

// ── Animated counter hook ──────────────────────────────────────────────────────────────

function useCountUp(target: number, isFloat: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setCount(
              isFloat
                ? Math.round(eased * target * 10) / 10
                : Math.round(eased * target),
            );
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, isFloat, duration]);

  return { count, ref };
}

// ── Metric card ─────────────────────────────────────────────────────────────────────────

interface MetricCardProps {
  display: string;
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  isFloat: boolean;
  index: number;
}

function MetricCard({
  target,
  suffix,
  prefix = "",
  label,
  isFloat,
  index,
}: MetricCardProps) {
  const { count, ref } = useCountUp(target, isFloat);
  const displayValue = `${prefix}${isFloat ? count.toFixed(1) : count}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="metrics-card border-animated-cyan flex-1 min-w-[160px]"
      data-ocid={`home.metric.item.${index + 1}`}
    >
      <div className="metrics-value">{displayValue}</div>
      <div className="metrics-label tracking-widest">{label}</div>
    </motion.div>
  );
}

// ── FABs ──────────────────────────────────────────────────────────────────────────────────

const FABS = [
  {
    icon: Bot,
    label: "Ask AI",
    to: "/",
    ocid: "home.fab_ask_ai",
    color: "oklch(0.7 0.18 200)",
  },
  {
    icon: Phone,
    label: "Start Call",
    to: "/calls",
    ocid: "home.fab_start_call",
    color: "oklch(0.58 0.17 282)",
  },
  {
    icon: FileText,
    label: "Generate Report",
    to: "/insights-dashboard",
    ocid: "home.fab_report",
    color: "oklch(0.72 0.16 210)",
  },
] as const;

// ── Wardrobe data ──────────────────────────────────────────────────────────────────────

const TOPS = [
  {
    label: "Classic White",
    desc: "Clean white top",
    bgStyle:
      "background: linear-gradient(135deg, oklch(0.9 0 0 / 0.15), oklch(0.95 0 0 / 0.08))",
    dotColor: "oklch(0.95 0 0)",
    icon: "◻",
  },
  {
    label: "Neon Cyan",
    desc: "Glowing cyan top",
    bgStyle:
      "background: linear-gradient(135deg, oklch(0.7 0.18 200 / 0.25), oklch(0.6 0.18 200 / 0.12))",
    dotColor: "oklch(0.7 0.18 200)",
    icon: "◼",
  },
  {
    label: "Midnight Black",
    desc: "Sleek black top",
    bgStyle:
      "background: linear-gradient(135deg, oklch(0.15 0 0 / 0.6), oklch(0.1 0 0 / 0.4))",
    dotColor: "oklch(0.4 0 0)",
    icon: "▾",
  },
];

const JEANS = [
  {
    label: "Straight Cut",
    desc: "Blue denim",
    bgStyle:
      "background: linear-gradient(135deg, oklch(0.5 0.12 250 / 0.35), oklch(0.45 0.1 250 / 0.2))",
    dotColor: "oklch(0.55 0.15 250)",
    icon: "▬",
  },
  {
    label: "Skinny Fit",
    desc: "Dark wash",
    bgStyle:
      "background: linear-gradient(135deg, oklch(0.3 0.1 250 / 0.4), oklch(0.25 0.08 250 / 0.25))",
    dotColor: "oklch(0.35 0.12 250)",
    icon: "▮",
  },
  {
    label: "Distressed",
    desc: "Light wash + tears",
    bgStyle:
      "background: linear-gradient(135deg, oklch(0.65 0.1 250 / 0.3), oklch(0.6 0.08 250 / 0.15))",
    dotColor: "oklch(0.65 0.1 250)",
    icon: "▩",
  },
];

const HEELS = [
  {
    label: "Crystal Clear",
    desc: "Transparent heels",
    bgStyle:
      "background: linear-gradient(135deg, oklch(0.85 0.05 200 / 0.25), oklch(0.9 0.08 200 / 0.15))",
    dotColor: "oklch(0.85 0.05 200)",
    icon: "◇",
  },
  {
    label: "Neon Pink",
    desc: "Pink heels",
    bgStyle:
      "background: linear-gradient(135deg, oklch(0.7 0.25 350 / 0.3), oklch(0.65 0.22 350 / 0.15))",
    dotColor: "oklch(0.72 0.25 350)",
    icon: "◆",
  },
  {
    label: "Obsidian Black",
    desc: "Black stilettos",
    bgStyle:
      "background: linear-gradient(135deg, oklch(0.12 0 0 / 0.7), oklch(0.08 0 0 / 0.5))",
    dotColor: "oklch(0.3 0 0)",
    icon: "◉",
  },
];

// ── Wardrobe Column ───────────────────────────────────────────────────────────────────────

interface WardrobeColProps {
  label: string;
  icon: typeof Shirt;
  items: typeof TOPS;
  selected: number;
  onSelect: (i: number) => void;
  ocidPrefix: string;
}

function WardrobeColumn({
  label,
  icon: Icon,
  items,
  selected,
  onSelect,
  ocidPrefix,
}: WardrobeColProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5 text-primary/70" />
        <span className="hud-label opacity-80">{label}</span>
      </div>
      {items.map((item, i) => (
        <button
          type="button"
          key={item.label}
          onClick={() => onSelect(i)}
          data-ocid={`${ocidPrefix}.${i + 1}`}
          className={`wardrobe-card w-full ${selected === i ? "selected" : ""}`}
          aria-pressed={selected === i}
        >
          <div className="w-full h-14 rounded-md flex items-center justify-center mb-2 relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: item.bgStyle.replace("background: ", "") }}
            />
            <div
              className="relative z-10 w-5 h-5 rounded-full border border-white/20"
              style={{
                background: item.dotColor,
                boxShadow: `0 0 8px ${item.dotColor}`,
              }}
            />
          </div>
          <div className="text-center">
            <div className="text-xs font-mono font-semibold text-foreground/90 leading-tight">
              {item.label}
            </div>
            <div className="text-[10px] text-muted-foreground/60 mt-0.5">
              {item.desc}
            </div>
          </div>
          {selected === i && (
            <div className="mt-1.5 w-4 h-0.5 rounded-full bg-primary mx-auto" />
          )}
        </button>
      ))}
    </div>
  );
}

// ── Stats strip data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "99.9%", label: "Uptime" },
  { value: "<200ms", label: "Response" },
  { value: "∞", label: "Memory" },
  { value: "50+", label: "Languages" },
];

// ── Page component ───────────────────────────────────────────────────────────────────────

export function HomePage() {
  const {
    wardrobe,
    setWardrobeTop,
    setWardrobeJeans,
    setWardrobeHeels,
    avatarMood,
  } = useAriaStore();
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto bg-background" data-ocid="home.page">
      {/* ── Hero Section ────────────────────────────────────── */}
      <section
        id="hero"
        className="hero-section scanline-overlay relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 px-8 py-16 lg:py-0"
        data-ocid="home.hero_section"
      >
        {/* Deep radial bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 68% 50%, oklch(0.7 0.18 200 / 0.09) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 32% 60%, oklch(0.58 0.17 282 / 0.07) 0%, transparent 55%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.7 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* HUD corner brackets */}
        <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-primary/40 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-primary/40 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-primary/40 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-primary/40 rounded-br-lg pointer-events-none" />

        {/* ── LEFT: Text column ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex-1 max-w-xl text-center lg:text-left"
        >
          {/* System badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span
              className="w-2 h-2 rounded-full bg-primary"
              style={{ boxShadow: "0 0 8px oklch(0.7 0.18 200)" }}
            />
            <span className="hud-label opacity-60 tracking-[0.2em]">
              ARIA SYSTEM · QUANTUM INTERFACE v3.0
            </span>
          </motion.div>

          {/* Large display title */}
          <h1
            className="font-display font-bold leading-[1.05] mb-5 tracking-wider"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              background:
                "linear-gradient(115deg, oklch(0.95 0 0) 0%, oklch(0.7 0.18 200) 45%, oklch(0.58 0.17 282) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Meet Priya
          </h1>

          {/* Subtitle — max 2 lines */}
          <p
            className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 tracking-wide"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.18rem)" }}
          >
            Your Quantum AI — intelligent, reactive, and immersive.
            <br />
            <span className="text-primary/70">
              Voice-native. Emotion-aware. Built for the future.
            </span>
          </p>

          {/* Primary + Secondary CTA */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
            <motion.button
              type="button"
              data-ocid="home.start_chat_button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate({ to: "/" })}
              className="btn-cyan flex items-center gap-2.5"
              style={{
                padding: "0.8rem 2rem",
                borderRadius: "0.5rem",
                boxShadow:
                  "0 0 24px oklch(0.7 0.18 200 / 0.5), 0 0 48px oklch(0.7 0.18 200 / 0.18)",
              }}
            >
              <Bot className="w-4 h-4" />
              Start Chat
            </motion.button>
            <motion.button
              type="button"
              data-ocid="home.explore_capabilities_button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-outline flex items-center gap-2.5"
              style={{ padding: "0.8rem 2rem", borderRadius: "0.5rem" }}
            >
              <ChevronRight className="w-4 h-4" />
              Explore Capabilities
            </motion.button>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.07 }}
                className="glass-panel px-4 py-2.5 rounded-xl text-center min-w-[84px]"
                style={{ borderColor: "oklch(0.7 0.18 200 / 0.25)" }}
              >
                <div className="text-sm font-bold text-primary font-mono">
                  {s.value}
                </div>
                <div className="text-[10px] text-muted-foreground/60 font-mono tracking-wider uppercase mt-0.5">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Quantum Brain Avatar ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex-shrink-0 flex items-center justify-center"
          data-ocid="home.avatar_panel"
        >
          {/* Ambient outer glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: -48,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, oklch(0.7 0.18 200 / 0.1) 0%, oklch(0.58 0.17 282 / 0.07) 50%, transparent 75%)",
              filter: "blur(24px)",
            }}
          />
          {/* Glass frame */}
          <div
            className="relative rounded-3xl"
            style={{
              background: "oklch(0.10 0 0 / 0.55)",
              backdropFilter: "blur(16px)",
              border: "1.5px solid oklch(0.7 0.18 200 / 0.28)",
              padding: "1.5rem",
              boxShadow:
                "0 0 48px oklch(0.7 0.18 200 / 0.16), 0 0 90px oklch(0.58 0.17 282 / 0.09), inset 0 0 28px oklch(0.7 0.18 200 / 0.04)",
            }}
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/60 rounded-tl-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/60 rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/60 rounded-bl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/60 rounded-br-2xl pointer-events-none" />
            {/* HUD badge top */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <div
                className="glass-panel px-4 py-1 rounded-full hud-label text-[10px] tracking-widest whitespace-nowrap"
                style={{ borderColor: "oklch(0.7 0.18 200 / 0.5)" }}
              >
                QUANTUM CORE · ACTIVE
              </div>
            </div>
            {/* HUD side tags */}
            <div className="absolute -bottom-3 left-4 z-20">
              <span className="hud-label text-[9px] opacity-45">
                NEURAL v3.0
              </span>
            </div>
            <div className="absolute -bottom-3 right-4 z-20">
              <span className="hud-label text-[9px] opacity-45">SYS:OK</span>
            </div>
            <HeroQuantumAvatar mood={avatarMood} size={400} />
          </div>
        </motion.div>
      </section>

      {/* ── Feature Highlight Cards ─────────────────────────────── */}
      <section
        id="features"
        className="py-20 px-6 scanline-overlay"
        style={{ background: "oklch(0.09 0.01 200)" }}
        data-ocid="home.features_section"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="hud-label mb-3 opacity-60 tracking-[0.2em]">
              CAPABILITIES
            </div>
            <h2 className="text-4xl font-display font-bold text-foreground uppercase tracking-widest">
              Core Capabilities
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto tracking-wide">
              Powered by ARIA’s quantum neural core — designed for real
              intelligence.
            </p>
          </motion.div>

          {/* 4-card horizontal row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="feature-card group"
                data-ocid={`home.feature.item.${i + 1}`}
                style={
                  {
                    borderColor: `${card.accent}33`,
                    "--card-glow": card.glowColor,
                  } as React.CSSProperties
                }
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: card.gradient
                      ? "linear-gradient(135deg, oklch(0.7 0.18 200 / 0.2), oklch(0.58 0.17 282 / 0.2))"
                      : `${card.accent}18`,
                    border: `1px solid ${card.accent}40`,
                    boxShadow: `0 0 16px ${card.accent}30`,
                  }}
                >
                  <card.icon
                    className="w-7 h-7 relative z-10"
                    style={{
                      color: card.gradient
                        ? "oklch(0.75 0.18 220)"
                        : card.accent,
                      filter: `drop-shadow(0 0 6px ${card.accent})`,
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth"
                    style={{
                      background: card.gradient
                        ? "conic-gradient(from 0deg, oklch(0.7 0.18 200 / 0.3), oklch(0.58 0.17 282 / 0.3), oklch(0.7 0.18 200 / 0.3))"
                        : `radial-gradient(circle, ${card.accent}22, transparent)`,
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-foreground font-display tracking-wide text-base mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed tracking-wide">
                    {card.description}
                  </p>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-smooth"
                  style={{
                    background: card.gradient
                      ? "linear-gradient(90deg, oklch(0.7 0.18 200), oklch(0.58 0.17 282))"
                      : `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                    boxShadow: `0 0 12px ${card.glowColor}`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics Section ────────────────────────────────────── */}
      <section
        className="py-16 px-6"
        style={{ background: "oklch(0.07 0.01 200)" }}
        data-ocid="home.metrics_section"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="hud-label mb-3 opacity-60 tracking-[0.2em]">
              PERFORMANCE METRICS
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground uppercase tracking-widest">
              Built for Speed &amp; Scale
            </h2>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {METRICS.map((m, i) => (
              <MetricCard key={m.label} {...m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Wardrobe Selector ──────────────────────────────────── */}
      <section
        className="py-20 px-6 bg-background scanline-overlay"
        data-ocid="home.wardrobe_section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="hud-label mb-3 opacity-60 tracking-[0.2em]">
              CUSTOMISATION
            </div>
            <h2 className="text-4xl font-display font-bold text-foreground uppercase tracking-widest">
              Wardrobe Selector
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto tracking-wide">
              Dress Priya your way — select an outfit and watch her holographic
              avatar update in real time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-panel rounded-2xl p-6 md:p-8"
            data-ocid="home.wardrobe_panel"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="hud-label opacity-70">
                  OUTFIT CONFIGURATION
                </span>
              </div>
              <div className="hud-label opacity-40 text-[10px]">
                {TOPS[wardrobe.top].label} · {JEANS[wardrobe.jeans].label} ·{" "}
                {HEELS[wardrobe.heels].label}
              </div>
            </div>

            <div className="wardrobe-selector" data-ocid="home.wardrobe_grid">
              <WardrobeColumn
                label="TOPS"
                icon={Shirt}
                items={TOPS}
                selected={wardrobe.top}
                onSelect={setWardrobeTop}
                ocidPrefix="home.wardrobe_top"
              />
              <WardrobeColumn
                label="JEANS"
                icon={Shirt}
                items={JEANS}
                selected={wardrobe.jeans}
                onSelect={setWardrobeJeans}
                ocidPrefix="home.wardrobe_jeans"
              />
              <WardrobeColumn
                label="HEELS"
                icon={Sparkles}
                items={HEELS}
                selected={wardrobe.heels}
                onSelect={setWardrobeHeels}
                ocidPrefix="home.wardrobe_heels"
              />
            </div>

            <p className="text-xs text-muted-foreground/50 text-center mt-6 font-mono">
              ❆ Selection synced to avatar · changes persist across sessions
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────── */}
      <section
        className="py-16 px-6 relative overflow-hidden"
        style={{ background: "oklch(0.09 0.01 282)" }}
        data-ocid="home.cta_section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.58 0.17 282 / 0.1) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <div className="hud-label mb-4 opacity-60 tracking-[0.2em]">
            GET STARTED
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground uppercase tracking-widest mb-4">
            Ready to meet Priya?
          </h2>
          <p className="text-muted-foreground mb-8 tracking-wide">
            Sign in or create an account to begin your personalised AI humanoid
            experience.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/" data-ocid="home.getstarted_button">
              <button
                type="button"
                className="btn-cyan flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                Get Started
              </button>
            </Link>
            <Link to="/login" data-ocid="home.login_button">
              <button
                type="button"
                className="btn-outline flex items-center gap-2"
              >
                Log In
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Credits ─────────────────────────────────────────────── */}
      <section
        className="credits-section"
        data-ocid="home.credits_section"
        style={{ background: "oklch(0.07 0 0)" }}
      >
        <div className="max-w-xl mx-auto space-y-3">
          <div className="hud-label opacity-50 mb-5 tracking-[0.2em]">
            CREDITS
          </div>

          <div
            className="glass-panel rounded-xl px-8 py-6 mx-auto max-w-sm"
            style={{ borderColor: "oklch(0.7 0.18 200 / 0.2)" }}
          >
            <p className="text-sm font-mono text-muted-foreground/50 uppercase tracking-widest mb-2">
              Designed &amp; Developed by
            </p>
            <p className="text-xl font-display font-bold text-primary mb-1">
              Ashish Kumar
            </p>
            <p className="text-sm text-muted-foreground">
              Jharkhand Rai University
            </p>
            <p className="text-sm text-muted-foreground/70">
              Master of Computer Application Student
            </p>
          </div>

          <div className="flex items-center justify-center gap-5 mt-4 opacity-40">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:opacity-100 transition-opacity"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:opacity-100 transition-opacity"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground/40 mt-6 font-mono">
            © {new Date().getFullYear()} ARIA AI Assistant · All rights reserved
          </p>
          <p className="text-[11px] text-muted-foreground/30 font-mono">
            Built with{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined"
                  ? window.location.hostname
                  : "aria-ai",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/40 hover:text-primary/70 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </section>

      {/* ── Floating Action Buttons ───────────────────────────────── */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3 items-end"
        data-ocid="home.fab_group"
      >
        {FABS.map((fab, i) => (
          <motion.div
            key={fab.label}
            initial={{ opacity: 0, scale: 0, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              delay: 0.6 + i * 0.12,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="group flex items-center gap-2"
          >
            <span
              className="opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none px-3 py-1.5 rounded-lg text-xs font-mono tracking-widest uppercase whitespace-nowrap"
              style={{
                background: "oklch(0.12 0 0 / 0.9)",
                border: `1px solid ${fab.color}60`,
                color: fab.color,
                boxShadow: `0 0 10px ${fab.color}30`,
              }}
            >
              {fab.label}
            </span>
            <Link to={fab.to} data-ocid={fab.ocid}>
              <button
                type="button"
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-smooth hover:scale-110"
                aria-label={fab.label}
                style={{
                  background: fab.color,
                  boxShadow: `0 0 20px ${fab.color}60, 0 0 40px ${fab.color}20`,
                  color: "oklch(0.06 0 0)",
                }}
              >
                <fab.icon className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
