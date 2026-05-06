import { r as reactExports, j as jsxRuntimeExports } from "./index-Khuvrpqq.js";
function MicIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-12 h-12 text-primary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "19", x2: "12", y2: "22" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "22", x2: "16", y2: "22" })
      ]
    }
  );
}
function AvatarIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-12 h-12 text-primary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "8", r: "4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 20c0-4 3.6-7 8-7s8 3 8 7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "8", r: "1.5", fill: "currentColor", opacity: "0.4" })
      ]
    }
  );
}
function EmotionIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-12 h-12 text-primary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "9", y1: "9", x2: "9.01", y2: "9", strokeWidth: 2.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "15", y1: "9", x2: "15.01", y2: "9", strokeWidth: 2.5 })
      ]
    }
  );
}
function WardrobeIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-12 h-12 text-primary",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H7v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10h3.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" })
    }
  );
}
function BrainIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-12 h-12 text-primary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.85 3 3 0 0 1 .79-5.85A2.5 2.5 0 0 1 9.5 2z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.85 3 3 0 0 0-.79-5.85A2.5 2.5 0 0 0 14.5 2z" })
      ]
    }
  );
}
function CreditCardIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-12 h-12 text-primary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1", y: "4", width: "22", height: "16", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "1", y1: "10", x2: "23", y2: "10" })
      ]
    }
  );
}
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: `p${i}`,
  size: 2 + i % 3,
  top: (i * 17 + 5) % 95,
  left: (i * 23 + 3) % 97,
  duration: 2 + i % 3 * 0.5,
  delay: i * 0.3 % 2
}));
const WAVEFORM_HEIGHTS = [3, 7, 12, 8, 14, 6, 10, 15, 9, 5, 12, 7];
function SlideContainer({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": "true", children: PARTICLES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "absolute rounded-full bg-primary/20",
        style: {
          width: `${p.size}px`,
          height: `${p.size}px`,
          top: `${p.top}%`,
          left: `${p.left}%`,
          animation: `pulse-glow ${p.duration}s ease-in-out ${p.delay}s infinite`
        }
      },
      p.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 pointer-events-none opacity-[0.035]",
        style: {
          backgroundImage: "linear-gradient(oklch(0.7 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full max-w-4xl", children })
  ] });
}
function PricingTable() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["10 msgs/day", "Basic voice", "1 personality mode"],
      color: "oklch(0.65 0 0)"
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/mo",
      features: [
        "Unlimited msgs",
        "HD voice synthesis",
        "All personality modes",
        "Wardrobe sync"
      ],
      color: "oklch(0.7 0.18 200)",
      featured: true
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "/mo",
      features: [
        "Everything in Pro",
        "Emotion detection",
        "Priority support",
        "Custom personality"
      ],
      color: "oklch(0.58 0.17 282)"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mt-4", children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-panel rounded-xl p-4 text-center transition-smooth hover:-translate-y-1",
      style: {
        borderColor: `${plan.color}44`,
        boxShadow: plan.featured ? `0 0 16px ${plan.color}40` : "none"
      },
      children: [
        plan.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "hud-label text-[9px] mb-2",
            style: { color: plan.color },
            children: "★ POPULAR"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-muted-foreground mb-1", children: plan.name.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "font-display font-bold text-xl",
            style: { color: plan.color },
            children: [
              plan.price,
              plan.period && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: plan.period })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "text-[11px] text-muted-foreground font-mono",
            children: [
              "✦ ",
              f
            ]
          },
          f
        )) })
      ]
    },
    plan.name
  )) });
}
function buildSlides() {
  return [
    {
      id: 1,
      hudLabel: "SLIDE 01 · INTRODUCTION",
      title: "Meet Priya",
      subtitle: "Your AI Humanoid Assistant",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(SlideContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label tracking-[0.2em] opacity-70", children: "ARIA SYSTEM · HUMANOID AI v1.0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display font-bold leading-tight",
            style: {
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              background: "linear-gradient(90deg, oklch(0.95 0 0), oklch(0.7 0.18 200), oklch(0.58 0.17 282))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            },
            children: "Meet Priya"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground font-display font-medium", children: "Your AI Humanoid Assistant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass-panel rounded-2xl p-5 max-w-2xl mx-auto",
            style: { borderColor: "oklch(0.7 0.18 200 / 0.3)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono font-semibold", children: "ARIA" }),
              " ",
              "— Autonomous Responsive Intelligence Architecture — is a next-generation AI humanoid platform designed for emotion-aware conversation, real-time voice interaction, and a fully personalised holographic experience."
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-4 pt-2", children: [
          "Voice AI",
          "3D Avatar",
          "Emotion IQ",
          "Wardrobe",
          "Memory"
        ].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "hud-label px-2 py-1 rounded border border-primary/30 bg-primary/8 text-[10px]",
            children: tag
          },
          tag
        )) })
      ] }) })
    },
    {
      id: 2,
      hudLabel: "SLIDE 02 · VOICE SYSTEM",
      title: "Natural Voice Conversation",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(SlideContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-28 h-28 rounded-full flex items-center justify-center border-2 border-primary/60 animate-pulse-glow",
              style: { background: "oklch(0.7 0.18 200 / 0.08)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(MicIcon, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label opacity-80 text-center", children: "VOICE PROCESSING ACTIVE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1 h-10", children: WAVEFORM_HEIGHTS.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-1.5 rounded-full bg-primary",
              style: {
                height: `${h * 2.5}px`,
                animation: `pulse-bar ${0.6 + i * 0.1}s ease-in-out ${i * 0.08}s infinite`,
                opacity: 0.6 + i % 3 * 0.15
              }
            },
            `bar-${i + 1}`
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-primary leading-tight", children: "Natural Voice Conversation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "Priya listens to your voice and",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "automatically speaks replies aloud" }),
            " ",
            "in a natural, synthesised female voice — no button required."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
            ["🎙️", "Speak naturally via browser microphone"],
            ["🔊", "Responses spoken aloud in female voice"],
            ["📝", "Real-time voice-to-text transcription"],
            ["🗣️", "Text-to-voice for every AI reply"]
          ].map(([icon, text]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 glass-panel rounded-lg px-4 py-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: text })
              ]
            },
            text
          )) })
        ] })
      ] }) })
    },
    {
      id: 3,
      hudLabel: "SLIDE 03 · 3D AVATAR",
      title: "3D Holographic Avatar",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(SlideContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-28 h-28 rounded-full flex items-center justify-center border-2 border-primary/60",
              style: {
                background: "oklch(0.7 0.18 200 / 0.08)",
                boxShadow: "0 0 30px oklch(0.7 0.18 200 / 0.3)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarIcon, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label opacity-80", children: "AVATAR STATUS: ONLINE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [
            { label: "IDLE", active: true },
            { label: "THINK", active: false },
            { label: "SPEAK", active: false },
            { label: "HAPPY", active: false }
          ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "hud-label px-2 py-1 rounded text-[9px] border",
              style: {
                borderColor: m.active ? "oklch(0.7 0.18 200 / 0.8)" : "oklch(0.7 0.18 200 / 0.2)",
                color: m.active ? "oklch(0.7 0.18 200)" : "oklch(0.65 0 0)",
                background: m.active ? "oklch(0.7 0.18 200 / 0.12)" : "transparent"
              },
              children: m.label
            },
            m.label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-primary leading-tight", children: "3D Holographic Avatar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "Full 3D humanoid with",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "long brown hair, blue mini dress" }),
            " ",
            "— rendered in a futuristic holographic style with real-time animations."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
            ["💋", "Lip-sync to voice output"],
            ["🙆", "Head nod & gesture animations"],
            ["👁️", "Eye gaze tracking & contact"],
            ["🌊", "Idle body sway"],
            [
              "🔮",
              "4 emotion states: Idle / Thinking / Speaking / Happy"
            ]
          ].map(([icon, text]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 glass-panel rounded-lg px-4 py-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: text })
              ]
            },
            text
          )) })
        ] })
      ] }) })
    },
    {
      id: 4,
      hudLabel: "SLIDE 04 · EMOTION DETECTION",
      title: "Emotion Detection",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(SlideContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-28 h-28 rounded-full flex items-center justify-center border-2 border-secondary/60",
              style: {
                background: "oklch(0.58 0.17 282 / 0.08)",
                boxShadow: "0 0 30px oklch(0.58 0.17 282 / 0.25)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmotionIcon, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "hud-label opacity-80",
              style: { color: "oklch(0.58 0.17 282 / 0.8)" },
              children: "WEBCAM: SCANNING"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
            { label: "😊 Smile", val: 87 },
            { label: "😲 Surprise", val: 12 },
            { label: "😐 Neutral", val: 45 },
            { label: "🤔 Focused", val: 63 }
          ].map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-panel rounded-lg px-3 py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground", children: e.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-primary", children: [
                    e.val,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full bg-primary",
                    style: { width: `${e.val}%`, transition: "width 0.5s" }
                  }
                ) })
              ]
            },
            e.label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-3xl font-display font-bold leading-tight",
              style: { color: "oklch(0.58 0.17 282)" },
              children: "Emotion Detection"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "Webcam-based real-time facial analysis lets Priya",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "mirror your mood" }),
            " — her avatar adjusts expressions to match what you're feeling."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
            "Real-time facial landmark tracking",
            "Avatar mirrors smile, surprise, neutral, focus",
            "Works entirely in your browser — no upload",
            "Camera panel is collapsible and opt-in"
          ].map((text) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 glass-panel rounded-lg px-4 py-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-mono", children: "→" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: text })
              ]
            },
            text
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass-panel rounded-lg px-4 py-2.5 border-secondary/40",
              style: { borderColor: "oklch(0.58 0.17 282 / 0.35)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "hud-label text-[10px]",
                  style: { color: "oklch(0.58 0.17 282 / 0.8)" },
                  children: "🔒 PRIVACY — Camera never streams to server"
                }
              )
            }
          )
        ] })
      ] }) })
    },
    {
      id: 5,
      hudLabel: "SLIDE 05 · WARDROBE",
      title: "Wardrobe & Appearance",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(SlideContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-28 h-28 rounded-full flex items-center justify-center border-2 border-primary/60",
              style: { background: "oklch(0.7 0.18 200 / 0.08)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(WardrobeIcon, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label opacity-80", children: "OUTFIT CONFIGURATION" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 w-full max-w-xs", children: [
            {
              label: "Tops",
              items: ["Classic White", "Neon Cyan", "Midnight Black"]
            },
            {
              label: "Jeans",
              items: ["Straight Cut", "Skinny Fit", "Distressed"]
            },
            {
              label: "Heels",
              items: ["Crystal", "Neon Pink", "Obsidian"]
            }
          ].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label text-[9px] text-center opacity-60", children: cat.label }),
            cat.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "glass-panel rounded px-2 py-1 text-center",
                style: {
                  borderColor: i === 0 ? "oklch(0.7 0.18 200 / 0.6)" : "oklch(0.7 0.18 200 / 0.1)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground", children: item })
              },
              item
            ))
          ] }, cat.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-primary leading-tight", children: "Wardrobe & Appearance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "Dress Priya your way — choose from curated outfits and see changes ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "instantly applied" }),
            " ",
            "to her holographic 3D avatar."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
            "3 top styles — white, neon cyan, midnight black",
            "3 jean styles — straight, skinny, distressed",
            "3 heel styles — crystal, neon pink, obsidian",
            "Changes sync to avatar in real time",
            "Preferences persist across sessions"
          ].map((text) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 glass-panel rounded-lg px-4 py-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-mono", children: "✦" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: text })
              ]
            },
            text
          )) })
        ] })
      ] }) })
    },
    {
      id: 6,
      hudLabel: "SLIDE 06 · AI CONVERSATION",
      title: "Intelligent Conversation",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(SlideContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-28 h-28 rounded-full flex items-center justify-center border-2 border-primary/60",
              style: { background: "oklch(0.7 0.18 200 / 0.08)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainIcon, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label opacity-80", children: "NEURAL CONTEXT: ACTIVE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 w-full max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-panel rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "What was my last topic?" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%]",
                style: {
                  background: "oklch(0.7 0.18 200 / 0.2)",
                  border: "1px solid oklch(0.7 0.18 200 / 0.4)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-mono", children: "You discussed project ideas about AI robotics 🤖" })
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-primary leading-tight", children: "Intelligent Conversation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            "Context-aware AI with",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "persistent memory" }),
            " — Priya remembers your preferences and conversation history across sessions."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
            "Rolling conversation context across sessions",
            "Learns your preferences over time",
            "Integrates with real-world APIs"
          ].map((text) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 glass-panel rounded-lg px-4 py-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-mono", children: "⚡" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: text })
              ]
            },
            text
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label opacity-70 mb-2", children: "PERSONALITY MODES" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["Professional", "Friendly", "Mysterious"].map((mode, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass-panel rounded-lg px-3 py-2 text-center flex-1",
              style: {
                borderColor: i === 1 ? "oklch(0.7 0.18 200 / 0.6)" : "oklch(0.7 0.18 200 / 0.15)",
                boxShadow: i === 1 ? "0 0 10px oklch(0.7 0.18 200 / 0.2)" : "none"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-mono text-muted-foreground", children: mode })
            },
            mode
          )) })
        ] })
      ] }) })
    },
    {
      id: 7,
      hudLabel: "SLIDE 07 · PRICING",
      title: "Subscription Plans",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(SlideContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label opacity-70", children: "SUBSCRIPTION TIERS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-primary", children: "Choose Your Plan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Unlock Priya's full potential with a plan that fits your needs." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full",
            style: { display: "flex", justifyContent: "center" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 glass-panel rounded-lg px-4 py-2",
                style: { borderColor: "oklch(0.7 0.18 200 / 0.3)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCardIcon, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label text-[10px] opacity-60", children: "POWERED BY" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-primary", children: "Secure Stripe Payments" })
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PricingTable, {})
      ] }) })
    },
    {
      id: 8,
      hudLabel: "SLIDE 08 · CREDITS",
      title: "Credits & About",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(SlideContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label tracking-[0.2em] opacity-60", children: "DESIGNED & DEVELOPED BY" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display font-bold",
            style: {
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              background: "linear-gradient(90deg, oklch(0.7 0.18 200), oklch(0.8 0.18 200), oklch(0.7 0.18 200))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            },
            children: "Ashish Kumar"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-panel rounded-2xl px-8 py-5 max-w-lg mx-auto",
            style: { borderColor: "oklch(0.7 0.18 200 / 0.35)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-primary mb-1", children: "Jharkhand Rai University" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-muted-foreground", children: "Master of Computer Application Student" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel rounded-xl px-5 py-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label text-[10px] opacity-50 mb-1", children: "SYSTEM NAME" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-primary", children: "ARIA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground/60 font-mono mt-0.5", children: [
              "Autonomous Responsive",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Intelligence Architecture"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel rounded-xl px-5 py-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label text-[10px] opacity-50 mb-1", children: "ASSISTANT NAME" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-primary", children: "Priya" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground/60 font-mono mt-0.5", children: [
              "Your AI Humanoid",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Companion"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel rounded-xl px-5 py-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label text-[10px] opacity-50 mb-1", children: "VERSION" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-primary", children: "V1.0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground/60 font-mono mt-0.5", children: [
              "Production Release",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              (/* @__PURE__ */ new Date()).getFullYear()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/40 font-mono", children: [
          "Built with",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "aria-ai")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary/50 hover:text-primary/80 transition-colors",
              children: "caffeine.ai"
            }
          )
        ] })
      ] }) })
    }
  ];
}
function ChevronLeft() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-7 h-7",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "15 18 9 12 15 6" })
    }
  );
}
function ChevronRight() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-7 h-7",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "9 18 15 12 9 6" })
    }
  );
}
function PresentationPage() {
  const slides = buildSlides();
  const TOTAL = slides.length;
  const [current, setCurrent] = reactExports.useState(0);
  const [direction, setDirection] = reactExports.useState("next");
  const [animating, setAnimating] = reactExports.useState(false);
  const timeoutRef = reactExports.useRef(null);
  const goTo = (index, dir) => {
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
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });
  reactExports.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const slide = slides[current];
  const exitTo = direction === "next" ? "translateX(-100%)" : "translateX(100%)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col bg-background scanline-overlay",
      style: { height: "calc(100vh - 56px)", minHeight: 0 },
      "data-ocid": "presentation.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-3 border-b border-primary/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label opacity-50", children: slide.hudLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "hud-label text-sm opacity-70",
              "data-ocid": "presentation.slide_counter",
              children: [
                current + 1,
                " / ",
                TOTAL
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-stretch overflow-hidden relative min-h-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: prev,
              disabled: current === 0,
              "aria-label": "Previous slide",
              "data-ocid": "presentation.prev_button",
              className: "flex-shrink-0 flex items-center justify-center w-14 md:w-20 transition-smooth text-muted-foreground hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed hover:bg-primary/5 border-r border-primary/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
          ` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `absolute inset-0 ${!animating ? direction === "next" ? "slide-enter-next" : "slide-enter-prev" : ""}`,
                style: animating ? {
                  transform: exitTo,
                  opacity: 0,
                  transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s"
                } : void 0,
                "data-ocid": `presentation.slide.${current + 1}`,
                children: slide.content
              },
              current
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: next,
              disabled: current === TOTAL - 1,
              "aria-label": "Next slide",
              "data-ocid": "presentation.next_button",
              className: "flex-shrink-0 flex items-center justify-center w-14 md:w-20 transition-smooth text-muted-foreground hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed hover:bg-primary/5 border-l border-primary/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2.5 py-4 border-t border-primary/15", children: slides.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => goTo(i, i > current ? "next" : "prev"),
            "aria-label": `Go to slide ${i + 1}`,
            "data-ocid": `presentation.dot.${i + 1}`,
            className: "transition-smooth hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "block rounded-full",
                style: {
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  background: i === current ? "oklch(0.7 0.18 200)" : "oklch(0.4 0 0)",
                  boxShadow: i === current ? "0 0 8px oklch(0.7 0.18 200 / 0.7)" : "none",
                  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)"
                }
              }
            )
          },
          s.id
        )) })
      ]
    }
  );
}
export {
  PresentationPage
};
