import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  hudLabel: string;
  content: React.ReactNode;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function MicIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12 text-primary"
    >
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

function AvatarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12 text-primary"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function EmotionIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12 text-primary"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2.5} />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2.5} />
    </svg>
  );
}

function WardrobeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12 text-primary"
    >
      <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H7v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10h3.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12 text-primary"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.85 3 3 0 0 1 .79-5.85A2.5 2.5 0 0 1 9.5 2z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.85 3 3 0 0 0-.79-5.85A2.5 2.5 0 0 0 14.5 2z" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12 text-primary"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: `p${i}`,
  size: 2 + (i % 3),
  top: (i * 17 + 5) % 95,
  left: (i * 23 + 3) % 97,
  duration: 2 + (i % 3) * 0.5,
  delay: (i * 0.3) % 2,
}));

const WAVEFORM_HEIGHTS = [3, 7, 12, 8, 14, 6, 10, 15, 9, 5, 12, 7] as const;

// ─── Shared slide layout ──────────────────────────────────────────────────────

function SlideContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden">
      {/* Particle dots */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `pulse-glow ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 w-full max-w-4xl">{children}</div>
    </div>
  );
}

// ─── Pricing table for slide 7 ────────────────────────────────────────────────

function PricingTable() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["10 msgs/day", "Basic voice", "1 personality mode"],
      color: "oklch(0.65 0 0)",
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/mo",
      features: [
        "Unlimited msgs",
        "HD voice synthesis",
        "All personality modes",
        "Wardrobe sync",
      ],
      color: "oklch(0.7 0.18 200)",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "/mo",
      features: [
        "Everything in Pro",
        "Emotion detection",
        "Priority support",
        "Custom personality",
      ],
      color: "oklch(0.58 0.17 282)",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className="glass-panel rounded-xl p-4 text-center transition-smooth hover:-translate-y-1"
          style={{
            borderColor: `${plan.color}44`,
            boxShadow: plan.featured ? `0 0 16px ${plan.color}40` : "none",
          }}
        >
          {plan.featured && (
            <div
              className="hud-label text-[9px] mb-2"
              style={{ color: plan.color }}
            >
              ★ POPULAR
            </div>
          )}
          <div className="font-mono text-xs text-muted-foreground mb-1">
            {plan.name.toUpperCase()}
          </div>
          <div
            className="font-display font-bold text-xl"
            style={{ color: plan.color }}
          >
            {plan.price}
            {plan.period && (
              <span className="text-sm font-normal text-muted-foreground">
                {plan.period}
              </span>
            )}
          </div>
          <ul className="mt-3 space-y-1.5">
            {plan.features.map((f) => (
              <li
                key={f}
                className="text-[11px] text-muted-foreground font-mono"
              >
                ✦ {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── Slide definitions ────────────────────────────────────────────────────────

function buildSlides(): Slide[] {
  return [
    {
      id: 1,
      hudLabel: "SLIDE 01 · INTRODUCTION",
      title: "Meet Priya",
      subtitle: "Your AI Humanoid Assistant",
      content: (
        <SlideContainer>
          <div className="text-center space-y-6">
            <div className="hud-label tracking-[0.2em] opacity-70">
              ARIA SYSTEM · HUMANOID AI v1.0
            </div>
            <h1
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                background:
                  "linear-gradient(90deg, oklch(0.95 0 0), oklch(0.7 0.18 200), oklch(0.58 0.17 282))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Meet Priya
            </h1>
            <p className="text-xl text-muted-foreground font-display font-medium">
              Your AI Humanoid Assistant
            </p>
            <div
              className="glass-panel rounded-2xl p-5 max-w-2xl mx-auto"
              style={{ borderColor: "oklch(0.7 0.18 200 / 0.3)" }}
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary font-mono font-semibold">
                  ARIA
                </span>{" "}
                — Autonomous Responsive Intelligence Architecture — is a
                next-generation AI humanoid platform designed for emotion-aware
                conversation, real-time voice interaction, and a fully
                personalised holographic experience.
              </p>
            </div>
            <div className="flex justify-center gap-4 pt-2">
              {[
                "Voice AI",
                "3D Avatar",
                "Emotion IQ",
                "Wardrobe",
                "Memory",
              ].map((tag) => (
                <span
                  key={tag}
                  className="hud-label px-2 py-1 rounded border border-primary/30 bg-primary/8 text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SlideContainer>
      ),
    },
    {
      id: 2,
      hudLabel: "SLIDE 02 · VOICE SYSTEM",
      title: "Natural Voice Conversation",
      content: (
        <SlideContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Icon side */}
            <div className="flex flex-col items-center gap-5">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center border-2 border-primary/60 animate-pulse-glow"
                style={{ background: "oklch(0.7 0.18 200 / 0.08)" }}
              >
                <MicIcon />
              </div>
              <div className="hud-label opacity-80 text-center">
                VOICE PROCESSING ACTIVE
              </div>
              {/* Waveform bars */}
              <div className="flex items-end gap-1 h-10">
                {WAVEFORM_HEIGHTS.map((h, i) => (
                  <div
                    key={`bar-${i + 1}`}
                    className="w-1.5 rounded-full bg-primary"
                    style={{
                      height: `${h * 2.5}px`,
                      animation: `pulse-bar ${0.6 + i * 0.1}s ease-in-out ${i * 0.08}s infinite`,
                      opacity: 0.6 + (i % 3) * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Text side */}
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-primary leading-tight">
                Natural Voice Conversation
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Priya listens to your voice and{" "}
                <span className="text-primary">
                  automatically speaks replies aloud
                </span>{" "}
                in a natural, synthesised female voice — no button required.
              </p>
              <div className="space-y-2">
                {[
                  ["🎙️", "Speak naturally via browser microphone"],
                  ["🔊", "Responses spoken aloud in female voice"],
                  ["📝", "Real-time voice-to-text transcription"],
                  ["🗣️", "Text-to-voice for every AI reply"],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 glass-panel rounded-lg px-4 py-2.5"
                  >
                    <span className="text-base">{icon}</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideContainer>
      ),
    },
    {
      id: 3,
      hudLabel: "SLIDE 03 · 3D AVATAR",
      title: "3D Holographic Avatar",
      content: (
        <SlideContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center gap-5">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center border-2 border-primary/60"
                style={{
                  background: "oklch(0.7 0.18 200 / 0.08)",
                  boxShadow: "0 0 30px oklch(0.7 0.18 200 / 0.3)",
                }}
              >
                <AvatarIcon />
              </div>
              <div className="hud-label opacity-80">AVATAR STATUS: ONLINE</div>
              {/* Mood states */}
              <div className="flex gap-2">
                {[
                  { label: "IDLE", active: true },
                  { label: "THINK", active: false },
                  { label: "SPEAK", active: false },
                  { label: "HAPPY", active: false },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="hud-label px-2 py-1 rounded text-[9px] border"
                    style={{
                      borderColor: m.active
                        ? "oklch(0.7 0.18 200 / 0.8)"
                        : "oklch(0.7 0.18 200 / 0.2)",
                      color: m.active
                        ? "oklch(0.7 0.18 200)"
                        : "oklch(0.65 0 0)",
                      background: m.active
                        ? "oklch(0.7 0.18 200 / 0.12)"
                        : "transparent",
                    }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-primary leading-tight">
                3D Holographic Avatar
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full 3D humanoid with{" "}
                <span className="text-primary">
                  long brown hair, blue mini dress
                </span>{" "}
                — rendered in a futuristic holographic style with real-time
                animations.
              </p>
              <div className="space-y-2">
                {[
                  ["💋", "Lip-sync to voice output"],
                  ["🙆", "Head nod & gesture animations"],
                  ["👁️", "Eye gaze tracking & contact"],
                  ["🌊", "Idle body sway"],
                  [
                    "🔮",
                    "4 emotion states: Idle / Thinking / Speaking / Happy",
                  ],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 glass-panel rounded-lg px-4 py-2.5"
                  >
                    <span className="text-sm">{icon}</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideContainer>
      ),
    },
    {
      id: 4,
      hudLabel: "SLIDE 04 · EMOTION DETECTION",
      title: "Emotion Detection",
      content: (
        <SlideContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center gap-5">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center border-2 border-secondary/60"
                style={{
                  background: "oklch(0.58 0.17 282 / 0.08)",
                  boxShadow: "0 0 30px oklch(0.58 0.17 282 / 0.25)",
                }}
              >
                <EmotionIcon />
              </div>
              <div
                className="hud-label opacity-80"
                style={{ color: "oklch(0.58 0.17 282 / 0.8)" }}
              >
                WEBCAM: SCANNING
              </div>
              {/* Emotion chips */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "😊 Smile", val: 87 },
                  { label: "😲 Surprise", val: 12 },
                  { label: "😐 Neutral", val: 45 },
                  { label: "🤔 Focused", val: 63 },
                ].map((e) => (
                  <div
                    key={e.label}
                    className="glass-panel rounded-lg px-3 py-2"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {e.label}
                      </span>
                      <span className="text-[11px] font-mono text-primary">
                        {e.val}%
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${e.val}%`, transition: "width 0.5s" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2
                className="text-3xl font-display font-bold leading-tight"
                style={{ color: "oklch(0.58 0.17 282)" }}
              >
                Emotion Detection
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Webcam-based real-time facial analysis lets Priya{" "}
                <span className="text-primary">mirror your mood</span> — her
                avatar adjusts expressions to match what you're feeling.
              </p>
              <div className="space-y-2">
                {[
                  "Real-time facial landmark tracking",
                  "Avatar mirrors smile, surprise, neutral, focus",
                  "Works entirely in your browser — no upload",
                  "Camera panel is collapsible and opt-in",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 glass-panel rounded-lg px-4 py-2.5"
                  >
                    <span className="text-primary text-xs font-mono">→</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="glass-panel rounded-lg px-4 py-2.5 border-secondary/40"
                style={{ borderColor: "oklch(0.58 0.17 282 / 0.35)" }}
              >
                <span
                  className="hud-label text-[10px]"
                  style={{ color: "oklch(0.58 0.17 282 / 0.8)" }}
                >
                  🔒 PRIVACY — Camera never streams to server
                </span>
              </div>
            </div>
          </div>
        </SlideContainer>
      ),
    },
    {
      id: 5,
      hudLabel: "SLIDE 05 · WARDROBE",
      title: "Wardrobe & Appearance",
      content: (
        <SlideContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center gap-5">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center border-2 border-primary/60"
                style={{ background: "oklch(0.7 0.18 200 / 0.08)" }}
              >
                <WardrobeIcon />
              </div>
              <div className="hud-label opacity-80">OUTFIT CONFIGURATION</div>
              {/* Wardrobe grid preview */}
              <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                {[
                  {
                    label: "Tops",
                    items: ["Classic White", "Neon Cyan", "Midnight Black"],
                  },
                  {
                    label: "Jeans",
                    items: ["Straight Cut", "Skinny Fit", "Distressed"],
                  },
                  {
                    label: "Heels",
                    items: ["Crystal", "Neon Pink", "Obsidian"],
                  },
                ].map((cat) => (
                  <div key={cat.label} className="space-y-1">
                    <div className="hud-label text-[9px] text-center opacity-60">
                      {cat.label}
                    </div>
                    {cat.items.map((item, i) => (
                      <div
                        key={item}
                        className="glass-panel rounded px-2 py-1 text-center"
                        style={{
                          borderColor:
                            i === 0
                              ? "oklch(0.7 0.18 200 / 0.6)"
                              : "oklch(0.7 0.18 200 / 0.1)",
                        }}
                      >
                        <span className="text-[9px] font-mono text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-primary leading-tight">
                Wardrobe & Appearance
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dress Priya your way — choose from curated outfits and see
                changes <span className="text-primary">instantly applied</span>{" "}
                to her holographic 3D avatar.
              </p>
              <div className="space-y-2">
                {[
                  "3 top styles — white, neon cyan, midnight black",
                  "3 jean styles — straight, skinny, distressed",
                  "3 heel styles — crystal, neon pink, obsidian",
                  "Changes sync to avatar in real time",
                  "Preferences persist across sessions",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 glass-panel rounded-lg px-4 py-2.5"
                  >
                    <span className="text-primary text-xs font-mono">✦</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideContainer>
      ),
    },
    {
      id: 6,
      hudLabel: "SLIDE 06 · AI CONVERSATION",
      title: "Intelligent Conversation",
      content: (
        <SlideContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center gap-5">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center border-2 border-primary/60"
                style={{ background: "oklch(0.7 0.18 200 / 0.08)" }}
              >
                <BrainIcon />
              </div>
              <div className="hud-label opacity-80">NEURAL CONTEXT: ACTIVE</div>
              {/* Chat preview bubbles */}
              <div className="space-y-2 w-full max-w-xs">
                <div className="flex justify-start">
                  <div className="glass-panel rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                    <p className="text-xs text-muted-foreground font-mono">
                      What was my last topic?
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div
                    className="rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%]"
                    style={{
                      background: "oklch(0.7 0.18 200 / 0.2)",
                      border: "1px solid oklch(0.7 0.18 200 / 0.4)",
                    }}
                  >
                    <p className="text-xs text-primary font-mono">
                      You discussed project ideas about AI robotics 🤖
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-bold text-primary leading-tight">
                Intelligent Conversation
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Context-aware AI with{" "}
                <span className="text-primary">persistent memory</span> — Priya
                remembers your preferences and conversation history across
                sessions.
              </p>
              <div className="space-y-2">
                {[
                  "Rolling conversation context across sessions",
                  "Learns your preferences over time",
                  "Integrates with real-world APIs",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 glass-panel rounded-lg px-4 py-2.5"
                  >
                    <span className="text-primary text-xs font-mono">⚡</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="hud-label opacity-70 mb-2">PERSONALITY MODES</div>
              <div className="flex gap-2">
                {["Professional", "Friendly", "Mysterious"].map((mode, i) => (
                  <div
                    key={mode}
                    className="glass-panel rounded-lg px-3 py-2 text-center flex-1"
                    style={{
                      borderColor:
                        i === 1
                          ? "oklch(0.7 0.18 200 / 0.6)"
                          : "oklch(0.7 0.18 200 / 0.15)",
                      boxShadow:
                        i === 1 ? "0 0 10px oklch(0.7 0.18 200 / 0.2)" : "none",
                    }}
                  >
                    <div className="text-[11px] font-mono text-muted-foreground">
                      {mode}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideContainer>
      ),
    },
    {
      id: 7,
      hudLabel: "SLIDE 07 · PRICING",
      title: "Subscription Plans",
      content: (
        <SlideContainer>
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <div className="hud-label opacity-70">SUBSCRIPTION TIERS</div>
              <h2 className="text-3xl font-display font-bold text-primary">
                Choose Your Plan
              </h2>
              <p className="text-sm text-muted-foreground">
                Unlock Priya's full potential with a plan that fits your needs.
              </p>
            </div>
            <div
              className="w-full"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                className="flex items-center gap-3 glass-panel rounded-lg px-4 py-2"
                style={{ borderColor: "oklch(0.7 0.18 200 / 0.3)" }}
              >
                <CreditCardIcon />
                <div>
                  <div className="hud-label text-[10px] opacity-60">
                    POWERED BY
                  </div>
                  <div className="font-mono text-sm text-primary">
                    Secure Stripe Payments
                  </div>
                </div>
              </div>
            </div>
            <PricingTable />
          </div>
        </SlideContainer>
      ),
    },
    {
      id: 8,
      hudLabel: "SLIDE 08 · CREDITS",
      title: "Credits & About",
      content: (
        <SlideContainer>
          <div className="text-center space-y-6">
            <div className="hud-label tracking-[0.2em] opacity-60">
              DESIGNED & DEVELOPED BY
            </div>
            <div>
              <h1
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  background:
                    "linear-gradient(90deg, oklch(0.7 0.18 200), oklch(0.8 0.18 200), oklch(0.7 0.18 200))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Ashish Kumar
              </h1>
            </div>
            <div
              className="glass-panel rounded-2xl px-8 py-5 max-w-lg mx-auto"
              style={{ borderColor: "oklch(0.7 0.18 200 / 0.35)" }}
            >
              <p className="font-mono text-sm text-primary mb-1">
                Jharkhand Rai University
              </p>
              <p className="font-mono text-sm text-muted-foreground">
                Master of Computer Application Student
              </p>
            </div>
            <div className="flex justify-center gap-6">
              <div className="glass-panel rounded-xl px-5 py-3 text-center">
                <div className="hud-label text-[10px] opacity-50 mb-1">
                  SYSTEM NAME
                </div>
                <div className="font-mono text-sm text-primary">ARIA</div>
                <div className="text-[10px] text-muted-foreground/60 font-mono mt-0.5">
                  Autonomous Responsive
                  <br />
                  Intelligence Architecture
                </div>
              </div>
              <div className="glass-panel rounded-xl px-5 py-3 text-center">
                <div className="hud-label text-[10px] opacity-50 mb-1">
                  ASSISTANT NAME
                </div>
                <div className="font-mono text-sm text-primary">Priya</div>
                <div className="text-[10px] text-muted-foreground/60 font-mono mt-0.5">
                  Your AI Humanoid
                  <br />
                  Companion
                </div>
              </div>
              <div className="glass-panel rounded-xl px-5 py-3 text-center">
                <div className="hud-label text-[10px] opacity-50 mb-1">
                  VERSION
                </div>
                <div className="font-mono text-sm text-primary">V1.0</div>
                <div className="text-[10px] text-muted-foreground/60 font-mono mt-0.5">
                  Production Release
                  <br />
                  {new Date().getFullYear()}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/40 font-mono">
              Built with{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "aria-ai")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/50 hover:text-primary/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </SlideContainer>
      ),
    },
  ];
}

// ─── Chevron icons ────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function PresentationPage() {
  const slides = buildSlides();
  const TOTAL = slides.length;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number, dir: "next" | "prev") => {
    if (animating || index === current) return;
    setDirection(dir);
    setAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 350);
  };

  const next = () => {
    if (current < TOTAL - 1) goTo(current + 1, "next");
  };

  const prev = () => {
    if (current > 0) goTo(current - 1, "prev");
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const slide = slides[current];

  const exitTo =
    direction === "next" ? "translateX(-100%)" : "translateX(100%)";

  return (
    <div
      className="flex-1 flex flex-col bg-background scanline-overlay"
      style={{ height: "calc(100vh - 56px)", minHeight: 0 }}
      data-ocid="presentation.page"
    >
      {/* Slide counter + HUD top */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-primary/15">
        <div className="hud-label opacity-50">{slide.hudLabel}</div>
        <div
          className="hud-label text-sm opacity-70"
          data-ocid="presentation.slide_counter"
        >
          {current + 1} / {TOTAL}
        </div>
      </div>

      {/* Main slide area */}
      <div className="flex-1 flex items-stretch overflow-hidden relative min-h-0">
        {/* Prev button */}
        <button
          type="button"
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous slide"
          data-ocid="presentation.prev_button"
          className="flex-shrink-0 flex items-center justify-center w-14 md:w-20 transition-smooth text-muted-foreground hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed hover:bg-primary/5 border-r border-primary/10"
        >
          <ChevronLeft />
        </button>

        {/* Slide content */}
        <div className="flex-1 relative overflow-hidden">
          <style>{`
            @keyframes slideInNext {
              from { transform: translateX(100%); opacity: 0; }
              to   { transform: translateX(0);    opacity: 1; }
            }
            @keyframes slideInPrev {
              from { transform: translateX(-100%); opacity: 0; }
              to   { transform: translateX(0);     opacity: 1; }
            }
            .slide-enter-next { animation: slideInNext 0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
            .slide-enter-prev { animation: slideInPrev 0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
          `}</style>

          <div
            key={current}
            className={`absolute inset-0 ${!animating ? (direction === "next" ? "slide-enter-next" : "slide-enter-prev") : ""}`}
            style={
              animating
                ? {
                    transform: exitTo,
                    opacity: 0,
                    transition:
                      "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s",
                  }
                : undefined
            }
            data-ocid={`presentation.slide.${current + 1}`}
          >
            {slide.content}
          </div>
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={next}
          disabled={current === TOTAL - 1}
          aria-label="Next slide"
          data-ocid="presentation.next_button"
          className="flex-shrink-0 flex items-center justify-center w-14 md:w-20 transition-smooth text-muted-foreground hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed hover:bg-primary/5 border-l border-primary/10"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2.5 py-4 border-t border-primary/15">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            aria-label={`Go to slide ${i + 1}`}
            data-ocid={`presentation.dot.${i + 1}`}
            className="transition-smooth hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          >
            <span
              className="block rounded-full"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background:
                  i === current ? "oklch(0.7 0.18 200)" : "oklch(0.4 0 0)",
                boxShadow:
                  i === current ? "0 0 8px oklch(0.7 0.18 200 / 0.7)" : "none",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
