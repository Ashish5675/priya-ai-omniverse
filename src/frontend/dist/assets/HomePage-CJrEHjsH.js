import { c as createLucideIcon, r as reactExports, M as MotionConfigContext, o as frame, p as cancelFrame, j as jsxRuntimeExports, u as useAriaStore, i as useNavigate, m as motion, C as ChevronRight, B as Brain, q as ChartColumn, Z as Zap, L as Link, P as Phone } from "./index-Khuvrpqq.js";
import { M as Mic } from "./mic-DTkU6c4e.js";
import { S as Sparkles } from "./sparkles-CLTf8qIQ.js";
import { F as FileText } from "./file-text-lUOGEMv0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "tonef"
    }
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "9comsn" }]
];
const Github = createLucideIcon("github", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
      key: "1wgbhj"
    }
  ]
];
const Shirt = createLucideIcon("shirt", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6"
    }
  ]
];
const Twitter = createLucideIcon("twitter", __iconNode);
function useAnimationFrame(callback) {
  const initialTimestamp = reactExports.useRef(0);
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  reactExports.useEffect(() => {
    if (isStatic)
      return;
    const provideTimeSinceStart = ({ timestamp, delta }) => {
      if (!initialTimestamp.current)
        initialTimestamp.current = timestamp;
      callback(timestamp - initialTimestamp.current, delta);
    };
    frame.update(provideTimeSinceStart, true);
    return () => cancelFrame(provideTimeSinceStart);
  }, [callback]);
}
const CYAN = "oklch(0.7 0.18 200)";
const PURPLE = "oklch(0.58 0.17 282)";
const SOFT_BLUE = "oklch(0.72 0.16 210)";
const RING_RADII = [85, 105, 125, 145];
const NODE_COUNT = 18;
const PARTICLE_COUNT = 22;
const HEX_INDICES = [0, 1, 2, 3, 4, 5];
const POLY_INDICES = [0, 1, 2, 3];
const NEURAL_INDICES = [0, 1, 2, 3, 4, 5, 6, 7];
const AURA_INDICES = [0, 1, 2, 3, 4, 5];
function makeParticles() {
  const colors = [CYAN, PURPLE, SOFT_BLUE];
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    angle: i / PARTICLE_COUNT * Math.PI * 2,
    radius: 90 + Math.random() * 80,
    size: 1.5 + Math.random() * 2.5,
    speed: 3e-3 + Math.random() * 4e-3,
    opacity: 0.3 + Math.random() * 0.6,
    color: colors[i % colors.length]
  }));
}
function HeroQuantumAvatar({ mood = "idle", size = 440 }) {
  const cx = size / 2;
  const cy = size / 2;
  const particlesRef = reactExports.useRef(makeParticles());
  const coreRotRef = reactExports.useRef(0);
  const innerRotRef = reactExports.useRef(0);
  const tickRef = reactExports.useRef(0);
  const [, forceUpdate] = reactExports.useState(0);
  const frameCount = reactExports.useRef(0);
  const coreSpeed = mood === "thinking" ? 4 : mood === "speaking" ? 3 : 1;
  const particleSpeedMult = mood === "thinking" ? 2.5 : mood === "speaking" ? 2 : 1;
  useAnimationFrame((_, delta) => {
    tickRef.current += delta / 1e3;
    coreRotRef.current += delta / 1e3 * coreSpeed * 0.4;
    innerRotRef.current -= delta / 1e3 * coreSpeed * 0.25;
    for (let i = 0; i < particlesRef.current.length; i++) {
      particlesRef.current[i] = {
        ...particlesRef.current[i],
        angle: particlesRef.current[i].angle + particlesRef.current[i].speed * particleSpeedMult
      };
    }
    frameCount.current += 1;
    if (frameCount.current % 2 === 0) {
      forceUpdate((k) => k + 1);
    }
  });
  const tick = tickRef.current;
  const particles = particlesRef.current;
  const auraColor = mood === "thinking" ? PURPLE : mood === "speaking" ? CYAN : CYAN;
  const auraOpacity = mood === "thinking" ? 0.35 : mood === "speaking" ? 0.45 : mood === "idle" ? 0.18 + Math.sin(tick * 0.8) * 0.06 : 0.28;
  const corePulse = 1 + Math.sin(tick * 1.2) * 0.04;
  const ringPulse = mood === "speaking" ? 1 + Math.sin(tick * 4) * 0.05 : 1;
  const waveRings = mood === "speaking" ? [0, 1, 2] : [];
  const waveExpand = (i) => (tick * 60 + i * 25) % 80;
  const [flashNodes] = reactExports.useState(
    () => Array.from({ length: NODE_COUNT }, (_, i) => i)
  );
  const nodeActive = (i) => mood === "thinking" && Math.sin(tick * (3 + i * 0.4)) > 0.55;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "home.hero_avatar",
      style: {
        width: size,
        height: size,
        position: "relative",
        flexShrink: 0
      },
      "aria-label": "Priya Quantum Brain AI Avatar",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              inset: -24,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${auraColor.replace(")", ` / ${auraOpacity})`)}, transparent 70%)`,
              filter: "blur(28px)",
              pointerEvents: "none",
              transition: "opacity 0.6s ease"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
              height: 32,
              background: `linear-gradient(to bottom, ${CYAN.replace(")", " / 0.18)")}, transparent)`,
              clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
              filter: "blur(6px)",
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: size,
            height: size,
            viewBox: `0 0 ${size} ${size}`,
            style: { display: "block", overflow: "visible" },
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "hqa-core-grad", cx: "50%", cy: "50%", r: "50%", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: CYAN, stopOpacity: "0.9" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "40%", stopColor: SOFT_BLUE, stopOpacity: "0.6" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "80%", stopColor: PURPLE, stopOpacity: "0.3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "transparent", stopOpacity: "0" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "hqa-inner-grad", cx: "50%", cy: "50%", r: "50%", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.9" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: CYAN, stopOpacity: "0.7" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: PURPLE, stopOpacity: "0.2" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "hqa-glow", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "3", result: "blur" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "hqa-strong-glow", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "6", result: "blur" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx,
                  cy,
                  r: 170,
                  fill: "none",
                  stroke: CYAN,
                  strokeWidth: "0",
                  opacity: "0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx,
                  cy,
                  r: 168,
                  fill: "radial-gradient(circle, oklch(0.12 0 0 / 0.95), transparent)",
                  opacity: "0.9"
                }
              ),
              RING_RADII.map((r, ri) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "g",
                {
                  transform: `rotate(${coreRotRef.current * (ri % 2 === 0 ? 1 : -1) * 0.3}, ${cx}, ${cy})`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "ellipse",
                    {
                      cx,
                      cy,
                      rx: r * ringPulse,
                      ry: r * 0.38 * ringPulse,
                      fill: "none",
                      stroke: ri % 2 === 0 ? CYAN : PURPLE,
                      strokeWidth: ri === 1 ? 1.5 : 1,
                      opacity: 0.15 + ri * 0.06,
                      strokeDasharray: `${4 + ri * 2} ${6 + ri * 2}`
                    }
                  )
                },
                r
              )),
              flashNodes.map((i) => {
                const angle = i / NODE_COUNT * Math.PI * 2 + coreRotRef.current * 0.05;
                const ringIdx = i % RING_RADII.length;
                const orbitR = RING_RADII[ringIdx];
                const nx = cx + Math.cos(angle) * orbitR;
                const ny = cy + Math.sin(angle) * orbitR * 0.38;
                const active = nodeActive(i);
                const color = i % 3 === 0 ? CYAN : i % 3 === 1 ? PURPLE : SOFT_BLUE;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "g",
                  {
                    filter: active ? "url(#hqa-strong-glow)" : "url(#hqa-glow)",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: nx,
                          cy: ny,
                          r: active ? 4 : 2.5,
                          fill: color,
                          opacity: active ? 0.95 : 0.4
                        }
                      ),
                      active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: nx,
                          y1: ny,
                          x2: cx,
                          y2: cy,
                          stroke: color,
                          strokeWidth: "0.8",
                          opacity: 0.4,
                          strokeDasharray: "3 5"
                        }
                      )
                    ]
                  },
                  i
                );
              }),
              waveRings.map((i) => {
                const expansion = waveExpand(i);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx,
                    cy,
                    r: 60 + expansion,
                    fill: "none",
                    stroke: SOFT_BLUE,
                    strokeWidth: "2",
                    opacity: Math.max(0, 0.7 - expansion / 80)
                  },
                  i
                );
              }),
              particles.map((p) => {
                const px = cx + Math.cos(p.angle) * p.radius;
                const py = cy + Math.sin(p.angle) * p.radius * 0.45;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: px,
                    cy: py,
                    r: p.size,
                    fill: p.color,
                    opacity: p.opacity * (0.7 + Math.sin(tick + p.id) * 0.3)
                  },
                  p.id
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("g", { transform: `rotate(${coreRotRef.current * 0.6}, ${cx}, ${cy})`, children: HEX_INDICES.map((i) => {
                const angle = i / 6 * Math.PI * 2;
                const gx = cx + Math.cos(angle) * 68;
                const gy = cy + Math.sin(angle) * 68;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "polygon",
                  {
                    points: `${gx},${gy - 5} ${gx + 4.3},${gy + 2.5} ${gx - 4.3},${gy + 2.5}`,
                    fill: i % 2 === 0 ? CYAN : PURPLE,
                    opacity: 0.35,
                    stroke: i % 2 === 0 ? CYAN : PURPLE,
                    strokeWidth: "0.5"
                  },
                  `hex-${i}`
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `rotate(${innerRotRef.current}, ${cx}, ${cy})`, children: [
                POLY_INDICES.map((i) => {
                  const angle = i / 4 * Math.PI * 2 + Math.PI / 4;
                  const px2 = cx + Math.cos(angle) * 38;
                  const py2 = cy + Math.sin(angle) * 38;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: px2 - 4,
                      y: py2 - 4,
                      width: 8,
                      height: 8,
                      fill: "none",
                      stroke: SOFT_BLUE,
                      strokeWidth: "1",
                      opacity: 0.5,
                      transform: `rotate(45, ${px2}, ${py2})`
                    },
                    `poly-${i}`
                  );
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: cx - 38,
                    y1: cy,
                    x2: cx + 38,
                    y2: cy,
                    stroke: SOFT_BLUE,
                    strokeWidth: "0.5",
                    opacity: "0.3"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: cx,
                    y1: cy - 38,
                    x2: cx,
                    y2: cy + 38,
                    stroke: SOFT_BLUE,
                    strokeWidth: "0.5",
                    opacity: "0.3"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "g",
                {
                  filter: "url(#hqa-strong-glow)",
                  transform: `scale(${corePulse}, ${corePulse}) translate(${cx * (1 - corePulse)}, ${cy * (1 - corePulse)})`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        cx,
                        cy,
                        r: 54,
                        fill: "none",
                        stroke: CYAN,
                        strokeWidth: "1.5",
                        opacity: "0.5"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r: 54, fill: CYAN, opacity: "0.04" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        cx,
                        cy,
                        r: 40,
                        fill: "none",
                        stroke: PURPLE,
                        strokeWidth: "1",
                        opacity: "0.35",
                        strokeDasharray: "4 4"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        cx,
                        cy,
                        r: 30,
                        fill: "url(#hqa-core-grad)",
                        opacity: "0.7"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        cx,
                        cy,
                        r: 12,
                        fill: "url(#hqa-inner-grad)",
                        opacity: 0.85 + Math.sin(tick * 2) * 0.1
                      }
                    ),
                    NEURAL_INDICES.map((i) => {
                      const a = i / 8 * Math.PI * 2 + tick * 0.3;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "line",
                        {
                          x1: cx,
                          y1: cy,
                          x2: cx + Math.cos(a) * 28,
                          y2: cy + Math.sin(a) * 28,
                          stroke: i % 2 === 0 ? CYAN : PURPLE,
                          strokeWidth: "0.8",
                          opacity: 0.5 + Math.sin(tick * 2 + i) * 0.25
                        },
                        `neural-${i}`
                      );
                    })
                  ]
                }
              ),
              mood === "speaking" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx,
                    cy,
                    r: 58 + Math.sin(tick * 6) * 8,
                    fill: "none",
                    stroke: CYAN,
                    strokeWidth: "2.5",
                    opacity: 0.6 + Math.sin(tick * 6) * 0.2
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx,
                    cy,
                    r: 70 + Math.sin(tick * 6 + 1) * 10,
                    fill: "none",
                    stroke: PURPLE,
                    strokeWidth: "1.5",
                    opacity: 0.35 + Math.sin(tick * 6 + 1) * 0.15
                  }
                )
              ] }),
              AURA_INDICES.map((i) => {
                const a = i / 6 * Math.PI * 2 + tick * 0.2;
                const r1 = 56;
                const r2 = 80 + Math.sin(tick * 1.5 + i) * 12;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: cx + Math.cos(a) * r1,
                    y1: cy + Math.sin(a) * r1,
                    x2: cx + Math.cos(a) * r2,
                    y2: cy + Math.sin(a) * r2,
                    stroke: i % 2 === 0 ? CYAN : SOFT_BLUE,
                    strokeWidth: "1",
                    opacity: 0.25 + Math.sin(tick + i) * 0.15
                  },
                  `aura-${i}`
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "text",
                {
                  x: cx,
                  y: cy + 100,
                  textAnchor: "middle",
                  fill: CYAN,
                  fontSize: "8",
                  fontFamily: "monospace",
                  letterSpacing: "2",
                  opacity: "0.5",
                  children: "QUANTUM CORE · ONLINE"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const FEATURE_CARDS = [
  {
    icon: Mic,
    title: "Voice Interaction",
    description: "Speak naturally — Priya hears, understands, and replies in a realistic female voice.",
    accent: "oklch(0.7 0.18 200)",
    glowColor: "oklch(0.7 0.18 200 / 0.5)"
  },
  {
    icon: Brain,
    title: "Multi-Agent Intelligence",
    description: "Autonomous agent pipeline: Planner, Research, Executor, and Critic working in concert.",
    accent: "oklch(0.58 0.17 282)",
    glowColor: "oklch(0.58 0.17 282 / 0.5)"
  },
  {
    icon: ChartColumn,
    title: "Real-time Insights",
    description: "Live analytics, market intelligence, and decision-scoring delivered in milliseconds.",
    accent: "oklch(0.72 0.16 210)",
    glowColor: "oklch(0.72 0.16 210 / 0.5)"
  },
  {
    icon: Zap,
    title: "Autonomous Actions",
    description: "Priya executes multi-step tasks end-to-end — from code generation to IoT control.",
    accent: "oklch(0.65 0.18 245)",
    glowColor: "oklch(0.65 0.18 245 / 0.5)",
    gradient: true
  }
];
const METRICS = [
  {
    display: "99.9%",
    target: 99.9,
    suffix: "%",
    label: "UPTIME",
    isFloat: true
  },
  {
    display: "<200ms",
    target: 200,
    suffix: "ms",
    prefix: "<",
    label: "RESPONSE TIME",
    isFloat: false
  },
  {
    display: "50+",
    target: 50,
    suffix: "+",
    label: "LANGUAGES",
    isFloat: false
  }
];
function useCountUp(target, isFloat, duration = 1600) {
  const [count, setCount] = reactExports.useState(0);
  const ref = reactExports.useRef(null);
  const started = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setCount(
              isFloat ? Math.round(eased * target * 10) / 10 : Math.round(eased * target)
            );
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, isFloat, duration]);
  return { count, ref };
}
function MetricCard({
  target,
  suffix,
  prefix = "",
  label,
  isFloat,
  index
}) {
  const { count, ref } = useCountUp(target, isFloat);
  const displayValue = `${prefix}${isFloat ? count.toFixed(1) : count}${suffix}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref,
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.12, duration: 0.5 },
      className: "metrics-card border-animated-cyan flex-1 min-w-[160px]",
      "data-ocid": `home.metric.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metrics-value", children: displayValue }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metrics-label tracking-widest", children: label })
      ]
    }
  );
}
const FABS = [
  {
    icon: Bot,
    label: "Ask AI",
    to: "/",
    ocid: "home.fab_ask_ai",
    color: "oklch(0.7 0.18 200)"
  },
  {
    icon: Phone,
    label: "Start Call",
    to: "/calls",
    ocid: "home.fab_start_call",
    color: "oklch(0.58 0.17 282)"
  },
  {
    icon: FileText,
    label: "Generate Report",
    to: "/insights-dashboard",
    ocid: "home.fab_report",
    color: "oklch(0.72 0.16 210)"
  }
];
const TOPS = [
  {
    label: "Classic White",
    desc: "Clean white top",
    bgStyle: "background: linear-gradient(135deg, oklch(0.9 0 0 / 0.15), oklch(0.95 0 0 / 0.08))",
    dotColor: "oklch(0.95 0 0)",
    icon: "◻"
  },
  {
    label: "Neon Cyan",
    desc: "Glowing cyan top",
    bgStyle: "background: linear-gradient(135deg, oklch(0.7 0.18 200 / 0.25), oklch(0.6 0.18 200 / 0.12))",
    dotColor: "oklch(0.7 0.18 200)",
    icon: "◼"
  },
  {
    label: "Midnight Black",
    desc: "Sleek black top",
    bgStyle: "background: linear-gradient(135deg, oklch(0.15 0 0 / 0.6), oklch(0.1 0 0 / 0.4))",
    dotColor: "oklch(0.4 0 0)",
    icon: "▾"
  }
];
const JEANS = [
  {
    label: "Straight Cut",
    desc: "Blue denim",
    bgStyle: "background: linear-gradient(135deg, oklch(0.5 0.12 250 / 0.35), oklch(0.45 0.1 250 / 0.2))",
    dotColor: "oklch(0.55 0.15 250)",
    icon: "▬"
  },
  {
    label: "Skinny Fit",
    desc: "Dark wash",
    bgStyle: "background: linear-gradient(135deg, oklch(0.3 0.1 250 / 0.4), oklch(0.25 0.08 250 / 0.25))",
    dotColor: "oklch(0.35 0.12 250)",
    icon: "▮"
  },
  {
    label: "Distressed",
    desc: "Light wash + tears",
    bgStyle: "background: linear-gradient(135deg, oklch(0.65 0.1 250 / 0.3), oklch(0.6 0.08 250 / 0.15))",
    dotColor: "oklch(0.65 0.1 250)",
    icon: "▩"
  }
];
const HEELS = [
  {
    label: "Crystal Clear",
    desc: "Transparent heels",
    bgStyle: "background: linear-gradient(135deg, oklch(0.85 0.05 200 / 0.25), oklch(0.9 0.08 200 / 0.15))",
    dotColor: "oklch(0.85 0.05 200)",
    icon: "◇"
  },
  {
    label: "Neon Pink",
    desc: "Pink heels",
    bgStyle: "background: linear-gradient(135deg, oklch(0.7 0.25 350 / 0.3), oklch(0.65 0.22 350 / 0.15))",
    dotColor: "oklch(0.72 0.25 350)",
    icon: "◆"
  },
  {
    label: "Obsidian Black",
    desc: "Black stilettos",
    bgStyle: "background: linear-gradient(135deg, oklch(0.12 0 0 / 0.7), oklch(0.08 0 0 / 0.5))",
    dotColor: "oklch(0.3 0 0)",
    icon: "◉"
  }
];
function WardrobeColumn({
  label,
  icon: Icon,
  items,
  selected,
  onSelect,
  ocidPrefix
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-primary/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label opacity-80", children: label })
    ] }),
    items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onSelect(i),
        "data-ocid": `${ocidPrefix}.${i + 1}`,
        className: `wardrobe-card w-full ${selected === i ? "selected" : ""}`,
        "aria-pressed": selected === i,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-14 rounded-md flex items-center justify-center mb-2 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: { background: item.bgStyle.replace("background: ", "") }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "relative z-10 w-5 h-5 rounded-full border border-white/20",
                style: {
                  background: item.dotColor,
                  boxShadow: `0 0 8px ${item.dotColor}`
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono font-semibold text-foreground/90 leading-tight", children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/60 mt-0.5", children: item.desc })
          ] }),
          selected === i && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 w-4 h-0.5 rounded-full bg-primary mx-auto" })
        ]
      },
      item.label
    ))
  ] });
}
const STATS = [
  { value: "99.9%", label: "Uptime" },
  { value: "<200ms", label: "Response" },
  { value: "∞", label: "Memory" },
  { value: "50+", label: "Languages" }
];
function HomePage() {
  const {
    wardrobe,
    setWardrobeTop,
    setWardrobeJeans,
    setWardrobeHeels,
    avatarMood
  } = useAriaStore();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto bg-background", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: "hero",
        className: "hero-section scanline-overlay relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 px-8 py-16 lg:py-0",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 70% 70% at 68% 50%, oklch(0.7 0.18 200 / 0.09) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 32% 60%, oklch(0.58 0.17 282 / 0.07) 0%, transparent 55%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none opacity-[0.035]",
              style: {
                backgroundImage: "linear-gradient(oklch(0.7 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200) 1px, transparent 1px)",
                backgroundSize: "64px 64px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-primary/40 rounded-tl-lg pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-primary/40 rounded-tr-lg pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-primary/40 rounded-bl-lg pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-primary/40 rounded-br-lg pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -50 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              className: "relative z-10 flex-1 max-w-xl text-center lg:text-left",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.2, duration: 0.5 },
                    className: "inline-flex items-center gap-2 mb-5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-2 h-2 rounded-full bg-primary",
                          style: { boxShadow: "0 0 8px oklch(0.7 0.18 200)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label opacity-60 tracking-[0.2em]", children: "ARIA SYSTEM · QUANTUM INTERFACE v3.0" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "font-display font-bold leading-[1.05] mb-5 tracking-wider",
                    style: {
                      fontSize: "clamp(3rem, 7vw, 5.5rem)",
                      background: "linear-gradient(115deg, oklch(0.95 0 0) 0%, oklch(0.7 0.18 200) 45%, oklch(0.58 0.17 282) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: "Meet Priya"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 tracking-wide",
                    style: { fontSize: "clamp(1rem, 1.6vw, 1.18rem)" },
                    children: [
                      "Your Quantum AI — intelligent, reactive, and immersive.",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/70", children: "Voice-native. Emotion-aware. Built for the future." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      "data-ocid": "home.start_chat_button",
                      whileHover: { scale: 1.06 },
                      whileTap: { scale: 0.97 },
                      onClick: () => navigate({ to: "/" }),
                      className: "btn-cyan flex items-center gap-2.5",
                      style: {
                        padding: "0.8rem 2rem",
                        borderRadius: "0.5rem",
                        boxShadow: "0 0 24px oklch(0.7 0.18 200 / 0.5), 0 0 48px oklch(0.7 0.18 200 / 0.18)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4" }),
                        "Start Chat"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      "data-ocid": "home.explore_capabilities_button",
                      whileHover: { scale: 1.04 },
                      whileTap: { scale: 0.97 },
                      onClick: () => {
                        var _a;
                        return (_a = document.getElementById("features")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                      },
                      className: "btn-outline flex items-center gap-2.5",
                      style: { padding: "0.8rem 2rem", borderRadius: "0.5rem" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }),
                        "Explore Capabilities"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.5, duration: 0.6 },
                    className: "flex flex-wrap gap-3 justify-center lg:justify-start",
                    children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.55 + i * 0.07 },
                        className: "glass-panel px-4 py-2.5 rounded-xl text-center min-w-[84px]",
                        style: { borderColor: "oklch(0.7 0.18 200 / 0.25)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-primary font-mono", children: s.value }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/60 font-mono tracking-wider uppercase mt-0.5", children: s.label })
                        ]
                      },
                      s.label
                    ))
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.82, x: 40 },
              animate: { opacity: 1, scale: 1, x: 0 },
              transition: { delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              className: "relative z-10 flex-shrink-0 flex items-center justify-center",
              "data-ocid": "home.avatar_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute pointer-events-none",
                    style: {
                      inset: -48,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, oklch(0.7 0.18 200 / 0.1) 0%, oklch(0.58 0.17 282 / 0.07) 50%, transparent 75%)",
                      filter: "blur(24px)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative rounded-3xl",
                    style: {
                      background: "oklch(0.10 0 0 / 0.55)",
                      backdropFilter: "blur(16px)",
                      border: "1.5px solid oklch(0.7 0.18 200 / 0.28)",
                      padding: "1.5rem",
                      boxShadow: "0 0 48px oklch(0.7 0.18 200 / 0.16), 0 0 90px oklch(0.58 0.17 282 / 0.09), inset 0 0 28px oklch(0.7 0.18 200 / 0.04)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/60 rounded-tl-2xl pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/60 rounded-tr-2xl pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/60 rounded-bl-2xl pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/60 rounded-br-2xl pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "glass-panel px-4 py-1 rounded-full hud-label text-[10px] tracking-widest whitespace-nowrap",
                          style: { borderColor: "oklch(0.7 0.18 200 / 0.5)" },
                          children: "QUANTUM CORE · ACTIVE"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-3 left-4 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label text-[9px] opacity-45", children: "NEURAL v3.0" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-3 right-4 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label text-[9px] opacity-45", children: "SYS:OK" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroQuantumAvatar, { mood: avatarMood, size: 400 })
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "features",
        className: "py-20 px-6 scanline-overlay",
        style: { background: "oklch(0.09 0.01 200)" },
        "data-ocid": "home.features_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-14",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label mb-3 opacity-60 tracking-[0.2em]", children: "CAPABILITIES" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-display font-bold text-foreground uppercase tracking-widest", children: "Core Capabilities" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4 max-w-xl mx-auto tracking-wide", children: "Powered by ARIA’s quantum neural core — designed for real intelligence." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: FEATURE_CARDS.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 32 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1, duration: 0.55 },
              className: "feature-card group",
              "data-ocid": `home.feature.item.${i + 1}`,
              style: {
                borderColor: `${card.accent}33`,
                "--card-glow": card.glowColor
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden",
                    style: {
                      background: card.gradient ? "linear-gradient(135deg, oklch(0.7 0.18 200 / 0.2), oklch(0.58 0.17 282 / 0.2))" : `${card.accent}18`,
                      border: `1px solid ${card.accent}40`,
                      boxShadow: `0 0 16px ${card.accent}30`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        card.icon,
                        {
                          className: "w-7 h-7 relative z-10",
                          style: {
                            color: card.gradient ? "oklch(0.75 0.18 220)" : card.accent,
                            filter: `drop-shadow(0 0 6px ${card.accent})`
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth",
                          style: {
                            background: card.gradient ? "conic-gradient(from 0deg, oklch(0.7 0.18 200 / 0.3), oklch(0.58 0.17 282 / 0.3), oklch(0.7 0.18 200 / 0.3))" : `radial-gradient(circle, ${card.accent}22, transparent)`
                          }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground font-display tracking-wide text-base mb-1.5", children: card.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed tracking-wide", children: card.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-smooth",
                    style: {
                      background: card.gradient ? "linear-gradient(90deg, oklch(0.7 0.18 200), oklch(0.58 0.17 282))" : `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                      boxShadow: `0 0 12px ${card.glowColor}`
                    }
                  }
                )
              ]
            },
            card.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 px-6",
        style: { background: "oklch(0.07 0.01 200)" },
        "data-ocid": "home.metrics_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label mb-3 opacity-60 tracking-[0.2em]", children: "PERFORMANCE METRICS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground uppercase tracking-widest", children: "Built for Speed & Scale" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-5 justify-center", children: METRICS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { ...m, index: i }, m.label)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-20 px-6 bg-background scanline-overlay",
        "data-ocid": "home.wardrobe_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label mb-3 opacity-60 tracking-[0.2em]", children: "CUSTOMISATION" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-display font-bold text-foreground uppercase tracking-widest", children: "Wardrobe Selector" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-lg mx-auto tracking-wide", children: "Dress Priya your way — select an outfit and watch her holographic avatar update in real time." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.15 },
              className: "glass-panel rounded-2xl p-6 md:p-8",
              "data-ocid": "home.wardrobe_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label opacity-70", children: "OUTFIT CONFIGURATION" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hud-label opacity-40 text-[10px]", children: [
                    TOPS[wardrobe.top].label,
                    " · ",
                    JEANS[wardrobe.jeans].label,
                    " ·",
                    " ",
                    HEELS[wardrobe.heels].label
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wardrobe-selector", "data-ocid": "home.wardrobe_grid", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    WardrobeColumn,
                    {
                      label: "TOPS",
                      icon: Shirt,
                      items: TOPS,
                      selected: wardrobe.top,
                      onSelect: setWardrobeTop,
                      ocidPrefix: "home.wardrobe_top"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    WardrobeColumn,
                    {
                      label: "JEANS",
                      icon: Shirt,
                      items: JEANS,
                      selected: wardrobe.jeans,
                      onSelect: setWardrobeJeans,
                      ocidPrefix: "home.wardrobe_jeans"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    WardrobeColumn,
                    {
                      label: "HEELS",
                      icon: Sparkles,
                      items: HEELS,
                      selected: wardrobe.heels,
                      onSelect: setWardrobeHeels,
                      ocidPrefix: "home.wardrobe_heels"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/50 text-center mt-6 font-mono", children: "❆ Selection synced to avatar · changes persist across sessions" })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-16 px-6 relative overflow-hidden",
        style: { background: "oklch(0.09 0.01 282)" },
        "data-ocid": "home.cta_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.58 0.17 282 / 0.1) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "max-w-2xl mx-auto text-center relative z-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label mb-4 opacity-60 tracking-[0.2em]", children: "GET STARTED" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground uppercase tracking-widest mb-4", children: "Ready to meet Priya?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 tracking-wide", children: "Sign in or create an account to begin your personalised AI humanoid experience." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "home.getstarted_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "btn-cyan flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4" }),
                        "Get Started"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", "data-ocid": "home.login_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "btn-outline flex items-center gap-2",
                      children: "Log In"
                    }
                  ) })
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "credits-section",
        "data-ocid": "home.credits_section",
        style: { background: "oklch(0.07 0 0)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label opacity-50 mb-5 tracking-[0.2em]", children: "CREDITS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-panel rounded-xl px-8 py-6 mx-auto max-w-sm",
              style: { borderColor: "oklch(0.7 0.18 200 / 0.2)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-muted-foreground/50 uppercase tracking-widest mb-2", children: "Designed & Developed by" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-primary mb-1", children: "Ashish Kumar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Jharkhand Rai University" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70", children: "Master of Computer Application Student" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-5 mt-4 opacity-40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://github.com",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "GitHub",
                className: "hover:opacity-100 transition-opacity",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://twitter.com",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Twitter",
                className: "hover:opacity-100 transition-opacity",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/40 mt-6 font-mono", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " ARIA AI Assistant · All rights reserved"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground/30 font-mono", children: [
            "Built with",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "aria-ai"
                )}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary/40 hover:text-primary/70 transition-colors",
                children: "caffeine.ai"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3 items-end",
        "data-ocid": "home.fab_group",
        children: FABS.map((fab, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0, x: 20 },
            animate: { opacity: 1, scale: 1, x: 0 },
            transition: {
              delay: 0.6 + i * 0.12,
              type: "spring",
              stiffness: 260,
              damping: 20
            },
            className: "group flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none px-3 py-1.5 rounded-lg text-xs font-mono tracking-widest uppercase whitespace-nowrap",
                  style: {
                    background: "oklch(0.12 0 0 / 0.9)",
                    border: `1px solid ${fab.color}60`,
                    color: fab.color,
                    boxShadow: `0 0 10px ${fab.color}30`
                  },
                  children: fab.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: fab.to, "data-ocid": fab.ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-[52px] h-[52px] rounded-full flex items-center justify-center transition-smooth hover:scale-110",
                  "aria-label": fab.label,
                  style: {
                    background: fab.color,
                    boxShadow: `0 0 20px ${fab.color}60, 0 0 40px ${fab.color}20`,
                    color: "oklch(0.06 0 0)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(fab.icon, { className: "w-5 h-5" })
                }
              ) })
            ]
          },
          fab.label
        ))
      }
    )
  ] });
}
export {
  HomePage
};
