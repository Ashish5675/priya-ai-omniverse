import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useAriaStore, m as motion, L as Link, Z as Zap, b as ue } from "./index-Khuvrpqq.js";
import { I as Input, B as Button } from "./input-CRtbQ8IC.js";
import { P as Primitive, L as Label } from "./label-US7eUxms.js";
import { c as cn } from "./utils-Cd0OWsoi.js";
import { c as useGetSettings, d as useSaveSettings, b as useClearHistory } from "./useConversation-ClGi6Ix9.js";
import { U as User } from "./user-CjenePbQ.js";
import { E as EyeOff } from "./eye-off-OQCBq75A.js";
import { E as Eye } from "./eye-flE3EMrY.js";
import { T as Trash2 } from "./trash-2-BpPdCVwr.js";
import "./index-DwOZ_d1F.js";
import "./clsx-DgYk2OaC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = createLucideIcon("key", __iconNode$2);
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
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const PERSONALITY_OPTIONS = [
  {
    id: "professional",
    label: "Professional",
    desc: "Precise, focused, efficient. Optimal for high-stakes work tasks.",
    icon: "◈"
  },
  {
    id: "friendly",
    label: "Friendly",
    desc: "Warm, conversational, empathetic. Great for casual use and creativity.",
    icon: "◎"
  },
  {
    id: "mysterious",
    label: "Mysterious",
    desc: "Enigmatic, philosophical, thought-provoking. For deep exploration.",
    icon: "◉"
  }
];
const GLOW_PRESETS = [
  { value: "#00d9ff", label: "Cyan" },
  { value: "#7c3aed", label: "Purple" },
  { value: "#0066ff", label: "Electric Blue" }
];
function AvatarOrbPreview({ color }) {
  const canvasRef = reactExports.useRef(null);
  const frameRef = reactExports.useRef(0);
  const timeRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    const draw = (timestamp) => {
      timeRef.current = timestamp;
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const t = timestamp * 1e-3;
      const outerGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, 95);
      outerGrad.addColorStop(0, `${color}00`);
      outerGrad.addColorStop(0.6, `${color}18`);
      outerGrad.addColorStop(1, `${color}40`);
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.fillStyle = outerGrad;
      ctx.fill();
      const pulse = 0.8 + Math.sin(t * 1.5) * 0.15;
      ctx.beginPath();
      ctx.arc(cx, cy, 60 * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}60`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      const orbGrad = ctx.createRadialGradient(cx - 10, cy - 10, 5, cx, cy, 45);
      orbGrad.addColorStop(0, `${color}ff`);
      orbGrad.addColorStop(0.4, `${color}cc`);
      orbGrad.addColorStop(0.8, `${color}44`);
      orbGrad.addColorStop(1, `${color}00`);
      ctx.beginPath();
      ctx.arc(cx, cy, 45, 0, Math.PI * 2);
      ctx.fillStyle = orbGrad;
      ctx.fill();
      for (let i = 0; i < 4; i++) {
        const angle = t * 0.8 + i * Math.PI / 2;
        const r = 65;
        ctx.beginPath();
        ctx.arc(cx, cy, r, angle, angle + Math.PI * 0.4);
        ctx.strokeStyle = `${color}${i % 2 === 0 ? "80" : "40"}`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * Math.PI * 2 + t * 0.5;
        const dist = 28 + Math.sin(t * 2 + i) * 8;
        const dx = cx + Math.cos(a) * dist;
        const dy = cy + Math.sin(a) * dist;
        const alpha = 0.4 + Math.sin(t * 3 + i * 1.2) * 0.3;
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [color]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-[200px] h-[200px] rounded-2xl overflow-hidden glass-panel flex items-center justify-center",
      "data-ocid": "avatar-orb-preview",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "canvas",
          {
            ref: canvasRef,
            className: "w-full h-full",
            style: { imageRendering: "pixelated" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-0 right-0 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/60 tracking-widest uppercase", children: "Avatar Preview" }) })
      ]
    }
  );
}
function SectionCard({
  icon,
  title,
  ocid,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "glass-panel rounded-2xl p-6",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 flex items-center justify-center text-primary", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm tracking-widest uppercase text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" })
        ] }),
        children
      ]
    }
  );
}
function SettingsPage() {
  var _a;
  const { settings, updateSettings } = useAriaStore();
  const [glowColor, setGlowColor] = reactExports.useState(settings.glowColor);
  const [personality, setPersonality] = reactExports.useState(
    settings.personality || "professional"
  );
  const [apiKey, setApiKey] = reactExports.useState(settings.apiKey);
  const [showKey, setShowKey] = reactExports.useState(false);
  const [customColor, setCustomColor] = reactExports.useState("");
  const { data: backendSettings, isLoading: loadingSettings } = useGetSettings();
  const saveMutation = useSaveSettings();
  const clearHistory = useClearHistory();
  reactExports.useEffect(() => {
    if (backendSettings) {
      setPersonality(backendSettings.personality || "professional");
      setGlowColor(backendSettings.glowColor || "#00d9ff");
      setApiKey(backendSettings.apiKey || "");
      updateSettings({
        personality: backendSettings.personality || "professional",
        glowColor: backendSettings.glowColor || "#00d9ff",
        apiKey: backendSettings.apiKey || ""
      });
    }
  }, [backendSettings, updateSettings]);
  const handleColorSelect = (color) => {
    setGlowColor(color);
    updateSettings({ glowColor: color });
  };
  const handleCustomColorChange = (e) => {
    const val = e.target.value;
    setCustomColor(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      setGlowColor(val);
      updateSettings({ glowColor: val });
    }
  };
  const handlePersonalityChange = (val) => {
    setPersonality(val);
    updateSettings({ personality: val });
  };
  const handleClearHistory = () => {
    clearHistory.mutate(void 0, {
      onSuccess: () => {
        ue.success("History cleared", {
          description: "All conversation history has been erased."
        });
      },
      onError: () => {
        ue.error("Failed to clear history");
      }
    });
  };
  const handleSave = () => {
    saveMutation.mutate(
      { personality, glowColor, apiKey },
      {
        onSuccess: () => {
          updateSettings({ personality, glowColor, apiKey });
          ue.success("Configuration saved", {
            description: "ARIA settings have been updated successfully."
          });
        },
        onError: () => {
          ue.error("Save failed", {
            description: "Unable to persist settings. Please try again."
          });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto scanline-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -12 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.3 },
        className: "mb-8",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-mono group",
            "data-ocid": "settings-back",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" }),
              "Return to ARIA"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex items-center gap-4 mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl border border-primary/60 flex items-center justify-center glow-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl tracking-widest uppercase", children: "System Configuration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-mono tracking-wider", children: "Customize ARIA's behavior, appearance & connectivity" })
          ] })
        ]
      }
    ),
    loadingSettings ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-12 justify-center text-muted-foreground font-mono text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
      "Loading configuration..."
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionCard,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
            title: "Personality Mode",
            ocid: "personality-section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex flex-col gap-2",
                "data-ocid": "personality-selector",
                children: PERSONALITY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handlePersonalityChange(opt.id),
                    "aria-pressed": personality === opt.id,
                    className: `flex items-start gap-3 p-4 rounded-xl border text-left cursor-pointer transition-smooth ${personality === opt.id ? "border-primary/60 bg-primary/5 glow-cyan" : "border-border/30 hover:border-border/60 hover:bg-card/50"}`,
                    "data-ocid": `personality-opt-${opt.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `mt-0.5 text-base font-mono ${personality === opt.id ? "text-primary" : "text-muted-foreground"}`,
                          children: opt.icon
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `font-semibold text-sm ${personality === opt.id ? "text-foreground" : "text-muted-foreground"}`,
                            children: opt.label
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-0.5 leading-relaxed", children: opt.desc })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `ml-auto mt-1 w-3 h-3 rounded-full border-2 shrink-0 transition-smooth ${personality === opt.id ? "border-primary bg-primary glow-cyan" : "border-border/50"}`
                        }
                      )
                    ]
                  },
                  opt.id
                ))
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionCard,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-4 h-4" }),
            title: "Avatar Glow Color",
            ocid: "glow-color-section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: GLOW_PRESETS.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleColorSelect(preset.value),
                  className: `flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-mono transition-smooth ${glowColor === preset.value ? "border-primary/60 bg-primary/10 text-foreground" : "border-border/30 hover:border-border/60 text-muted-foreground hover:bg-card/40"}`,
                  "data-ocid": `glow-preset-${preset.label.toLowerCase().replace(" ", "-")}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-3.5 h-3.5 rounded-full shrink-0 ring-1 ring-white/10",
                        style: { backgroundColor: preset.value }
                      }
                    ),
                    preset.label
                  ]
                },
                preset.value
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-lg border border-border/40 shrink-0 ring-1 ring-white/5",
                    style: { backgroundColor: glowColor }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "text",
                    value: customColor || glowColor,
                    onChange: handleCustomColorChange,
                    placeholder: "#00d9ff",
                    className: "font-mono text-sm bg-card/50 border-border/40 focus:border-primary/60 pl-3",
                    "data-ocid": "glow-color-custom-input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "color",
                    value: glowColor,
                    onChange: (e) => handleColorSelect(e.target.value),
                    className: "w-9 h-9 rounded-lg border border-border/40 cursor-pointer bg-transparent p-0.5",
                    "aria-label": "Color picker",
                    "data-ocid": "glow-color-picker"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/50 font-mono", children: "Enter a valid hex code or use the color picker for custom colors." })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionCard,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-4 h-4" }),
            title: "API Configuration",
            ocid: "api-key-section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "openai-api-key",
                  className: "text-sm text-muted-foreground font-mono tracking-wider",
                  children: "OpenAI API Key"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "openai-api-key",
                    type: showKey ? "text" : "password",
                    value: apiKey,
                    onChange: (e) => setApiKey(e.target.value),
                    placeholder: "sk-...",
                    className: "font-mono text-sm bg-card/50 border-border/40 focus:border-primary/60 pr-20",
                    "data-ocid": "api-key-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowKey(!showKey),
                    "aria-label": showKey ? "Hide API key" : "Show API key",
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors",
                    "data-ocid": "api-key-toggle",
                    children: showKey ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/50 font-mono leading-relaxed", children: "Your key is encrypted at rest and never logged. Required for live AI responses." })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "border-border/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "destructive",
              onClick: handleClearHistory,
              disabled: clearHistory.isPending,
              className: "gap-2 bg-destructive/10 border border-destructive/40 hover:bg-destructive/20 text-destructive font-mono text-sm",
              "data-ocid": "clear-history-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                clearHistory.isPending ? "Clearing..." : "Clear History"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              whileHover: { scale: 1.02 },
              whileTap: { scale: 0.98 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: handleSave,
                  disabled: saveMutation.isPending,
                  className: "gap-2 bg-primary/20 border border-primary/60 hover:bg-primary/30 hover:glow-cyan text-primary font-mono text-sm transition-smooth",
                  "data-ocid": "save-settings-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                    saveMutation.isPending ? "Saving..." : "Save Configuration"
                  ]
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 lg:pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarOrbPreview, { color: glowColor }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground/60 tracking-widest uppercase", children: "Live Preview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-primary/80 tracking-wider", children: ((_a = PERSONALITY_OPTIONS.find((p) => p.id === personality)) == null ? void 0 : _a.label) ?? personality })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  SettingsPage
};
