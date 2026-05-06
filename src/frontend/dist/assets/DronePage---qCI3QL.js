import { c as createLucideIcon, e as useQuery, f as useQueryClient, g as useMutation, t as mockBackend, r as reactExports, j as jsxRuntimeExports, m as motion, x as MapPin, Z as Zap, A as AnimatePresence, b as ue } from "./index-Khuvrpqq.js";
import { C as Camera } from "./camera-CjBS7uwb.js";
import { T as TriangleAlert } from "./triangle-alert-BkETKDKG.js";
import { P as Play } from "./play-DV-pb5yX.js";
import { D as Download } from "./download-CWzM3EmD.js";
import { N as Navigation } from "./navigation-P8l08Klw.js";
import { R as RotateCcw } from "./rotate-ccw-BtW9BWRh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9", key: "1vaf9d" }],
  ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5", key: "u1ii0m" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5", key: "1j5fej" }],
  ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19", key: "10b0cb" }]
];
const Radio = createLucideIcon("radio", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z", key: "14u9p9" }
  ]
];
const Triangle = createLucideIcon("triangle", __iconNode);
const droneKeys = {
  all: ["drone"],
  list: () => [...droneKeys.all, "list"],
  alerts: () => [...droneKeys.all, "alerts"],
  cameras: () => [...droneKeys.all, "cameras"],
  detectionHistory: () => [...droneKeys.all, "detectionHistory"]
};
function useDetectionAlerts() {
  return useQuery({
    queryKey: droneKeys.alerts(),
    queryFn: () => mockBackend.getDetectionAlerts()
  });
}
function useDetectionHistory() {
  return useQuery({
    queryKey: droneKeys.detectionHistory(),
    queryFn: () => mockBackend.getDetectionHistory(),
    refetchInterval: 2e3
  });
}
function useInitDetection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => mockBackend.initDetectionModule(),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: droneKeys.detectionHistory()
      });
    }
  });
}
function useYoloDetection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req) => mockBackend.runYoloDetection(req),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: droneKeys.detectionHistory()
      });
    }
  });
}
const DRONE_LABELS = ["Drone 1", "Drone 2", "Drone 3"];
const CMD_DEFS = [
  {
    cmd: "takeoff",
    label: "Takeoff",
    color: "border-green-400/60 text-green-400 hover:bg-green-400/15",
    icon: "▲"
  },
  {
    cmd: "land",
    label: "Land",
    color: "border-red-400/60 text-red-400 hover:bg-red-400/15",
    icon: "▼"
  },
  {
    cmd: "hover",
    label: "Hover",
    color: "border-blue-400/60 text-blue-400 hover:bg-blue-400/15",
    icon: "◈"
  },
  {
    cmd: "rtb",
    label: "Return to Base",
    color: "border-amber-400/60 text-amber-400 hover:bg-amber-400/15",
    icon: "↩"
  }
];
const STATUS_BADGE = {
  flying: "bg-green-400/20 text-green-400 border-green-400/50",
  idle: "bg-muted/40 text-muted-foreground border-border/40",
  landing: "bg-amber-400/20 text-amber-400 border-amber-400/50",
  emergency: "bg-red-500/20 text-red-400 border-red-400/50"
};
const CLASS_COLORS = {
  person: {
    border: "rgba(0,217,255,0.8)",
    bg: "rgba(0,217,255,0.07)",
    text: "#00d9ff",
    glow: "0 0 8px rgba(0,217,255,0.5)"
  },
  car: {
    border: "rgba(245,158,11,0.8)",
    bg: "rgba(245,158,11,0.07)",
    text: "#f59e0b",
    glow: "0 0 8px rgba(245,158,11,0.5)"
  },
  truck: {
    border: "rgba(239,68,68,0.8)",
    bg: "rgba(239,68,68,0.07)",
    text: "#ef4444",
    glow: "0 0 8px rgba(239,68,68,0.5)"
  },
  motorcycle: {
    border: "rgba(167,139,250,0.8)",
    bg: "rgba(167,139,250,0.07)",
    text: "#a78bfa",
    glow: "0 0 8px rgba(167,139,250,0.5)"
  },
  bus: {
    border: "rgba(245,158,11,0.8)",
    bg: "rgba(245,158,11,0.07)",
    text: "#f59e0b",
    glow: "0 0 8px rgba(245,158,11,0.5)"
  },
  bicycle: {
    border: "rgba(52,211,153,0.8)",
    bg: "rgba(52,211,153,0.07)",
    text: "#34d399",
    glow: "0 0 8px rgba(52,211,153,0.5)"
  },
  backpack: {
    border: "rgba(0,217,255,0.6)",
    bg: "rgba(0,217,255,0.05)",
    text: "#00d9ff",
    glow: "0 0 6px rgba(0,217,255,0.3)"
  },
  knife: {
    border: "rgba(239,68,68,0.9)",
    bg: "rgba(239,68,68,0.1)",
    text: "#ef4444",
    glow: "0 0 12px rgba(239,68,68,0.7)"
  }
};
const DEFAULT_COLOR = {
  border: "rgba(0,217,255,0.7)",
  bg: "rgba(0,217,255,0.05)",
  text: "#00d9ff",
  glow: "0 0 6px rgba(0,217,255,0.3)"
};
function getClassColor(className) {
  return CLASS_COLORS[className.toLowerCase()] ?? DEFAULT_COLOR;
}
function isHighAlert(obj) {
  return obj.highAlert || obj.confidence > 0.85;
}
function YoloBoundingBox({ obj }) {
  const colors = getClassColor(obj.name);
  const alert = isHighAlert(obj);
  const confPct = Math.round(obj.confidence * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.85 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.7 },
      transition: { duration: 0.25 },
      className: "absolute pointer-events-none",
      style: {
        left: `${obj.bbox.x}%`,
        top: `${obj.bbox.y}%`,
        width: `${obj.bbox.width}%`,
        height: `${obj.bbox.height}%`,
        border: `1.5px solid ${alert ? "rgba(239,68,68,0.9)" : colors.border}`,
        background: alert ? "rgba(239,68,68,0.06)" : colors.bg,
        boxShadow: alert ? "0 0 14px rgba(239,68,68,0.6)" : colors.glow,
        animation: alert ? "pulse 1.2s ease-in-out infinite" : void 0
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 w-2 h-2 border-t border-l",
            style: { borderColor: alert ? "#ef4444" : colors.border }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 right-0 w-2 h-2 border-t border-r",
            style: { borderColor: alert ? "#ef4444" : colors.border }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 left-0 w-2 h-2 border-b border-l",
            style: { borderColor: alert ? "#ef4444" : colors.border }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 right-0 w-2 h-2 border-b border-r",
            style: { borderColor: alert ? "#ef4444" : colors.border }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute -top-5 left-0 flex items-center gap-1 px-1 py-px text-[8px] font-mono whitespace-nowrap",
            style: {
              background: "rgba(0,0,0,0.8)",
              color: alert ? "#ef4444" : colors.text,
              border: `1px solid ${alert ? "rgba(239,68,68,0.5)" : colors.border}`
            },
            children: [
              alert && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-red-400 animate-pulse" }),
              obj.name.toUpperCase(),
              " ",
              confPct,
              "%"
            ]
          }
        ),
        alert && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-5 right-0 text-[7px] font-mono px-1 py-px bg-red-500/80 text-white rounded-sm", children: "⚠ ALERT" })
      ]
    },
    `${obj.name}-${obj.bbox.x}-${obj.bbox.y}`
  );
}
function YoloCameraFeed({
  objects,
  isScanning,
  cameraId
}) {
  const [scanY, setScanY] = reactExports.useState(0);
  const rafRef = reactExports.useRef(0);
  const startRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    let running = true;
    const tick = (ts) => {
      if (!running) return;
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      setScanY(elapsed % 2800 / 2800);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);
  const alertCount = objects.filter(isHighAlert).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-xl overflow-hidden border-2",
      style: {
        width: "100%",
        height: 200,
        background: "#020a0f",
        borderColor: alertCount > 0 ? "rgba(239,68,68,0.7)" : "rgba(0,217,255,0.3)",
        boxShadow: alertCount > 0 ? "0 0 20px rgba(239,68,68,0.3)" : "0 0 12px rgba(0,217,255,0.12)"
      },
      "data-ocid": "drone.yolo_feed",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-15",
            style: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-10",
            style: {
              backgroundImage: "linear-gradient(rgba(0,217,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.4) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-0 w-full pointer-events-none",
            style: {
              top: `${scanY * 100}%`,
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.65), transparent)",
              boxShadow: "0 0 8px rgba(0,217,255,0.5)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: objects.map((obj, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(YoloBoundingBox, { obj }, `${i}-${obj.name}-${obj.bbox.x}`)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 border border-red-500/40 rounded px-1.5 py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-red-400 tracking-widest", children: "LIVE" })
        ] }),
        alertCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            animate: { opacity: [1, 0.3, 1] },
            transition: { duration: 0.8, repeat: Number.POSITIVE_INFINITY },
            className: "absolute top-2 right-8 flex items-center gap-1 bg-red-500/80 rounded px-1.5 py-0.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-2.5 h-2.5 text-white" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[8px] font-mono text-white font-bold", children: [
                alertCount,
                " ALERT",
                alertCount > 1 ? "S" : ""
              ] })
            ]
          }
        ),
        isScanning && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-2 border-cyan-400/50 rounded-xl animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-2 right-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground/70 uppercase tracking-wider", children: cameraId }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-mono text-cyan-400/60", children: [
            objects.length,
            " OBJ"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 text-[8px] font-mono text-cyan-400/60 border border-cyan-400/20 px-1 py-0.5 rounded bg-black/40", children: "YOLOv8" })
      ]
    }
  );
}
function CameraFeedCard({
  feedIndex,
  isActive,
  onClick
}) {
  const [scanY, setScanY] = reactExports.useState(0);
  const rafRef = reactExports.useRef(0);
  const startRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    let running = true;
    const tick = (ts) => {
      if (!running) return;
      if (!startRef.current) startRef.current = ts;
      setScanY((ts - startRef.current) % 3e3 / 3e3);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);
  const feedNames = ["Gate Alpha", "Perimeter Beta", "Roof Delta"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: `relative rounded-lg overflow-hidden cursor-pointer border transition-smooth ${isActive ? "border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.3)]" : "border-border/30 hover:border-amber-400/40"}`,
      style: { aspectRatio: "16/9", background: "#020a0f" },
      onClick,
      whileHover: { scale: 1.02 },
      "data-ocid": `drone.camera_feed.${feedIndex + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-10",
            style: {
              backgroundImage: "linear-gradient(rgba(0,217,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.4) 1px, transparent 1px)",
              backgroundSize: "16px 16px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-0 w-full h-px pointer-events-none",
            style: {
              top: `${scanY * 100}%`,
              background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.6), transparent)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-1 left-1 flex items-center gap-1 bg-black/60 border border-red-500/30 rounded px-1 py-px", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-red-500 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[7px] font-mono text-red-400", children: "LIVE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1 left-1 right-1 flex justify-between items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[7px] font-mono text-muted-foreground/70", children: feedNames[feedIndex] }),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[7px] font-mono text-amber-400 border border-amber-400/40 px-0.5 rounded", children: "SEL" })
        ] })
      ]
    }
  );
}
function MapView({ drones }) {
  const [angle, setAngle] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => setAngle((a) => (a + 0.4) % 360), 50);
    return () => clearInterval(id);
  }, []);
  const orbitPositions = drones.map((_, i) => {
    const baseAngle = angle + i * 120;
    const rad = baseAngle * Math.PI / 180;
    const radiusPct = 28 + i * 6;
    return {
      cx: 50 + Math.cos(rad) * radiusPct,
      cy: 50 + Math.sin(rad) * radiusPct
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-full rounded-xl overflow-hidden scanline-overlay",
      style: {
        background: "radial-gradient(ellipse at center, #021820 0%, #010a0d 70%, #000 100%)",
        minHeight: 180
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-20",
            style: {
              backgroundImage: "radial-gradient(circle, rgba(0,217,255,0.5) 1px, transparent 1px)",
              backgroundSize: "18px 18px"
            }
          }
        ),
        [15, 25, 35].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute border border-cyan-400/10 rounded-full",
            style: {
              left: `${50 - r}%`,
              top: `${50 - r}%`,
              width: `${r * 2}%`,
              height: `${r * 2}%`
            }
          },
          r
        )),
        drones.map((drone, i) => {
          const pos = orbitPositions[i];
          const batt = Number(drone.battery);
          const battColor = batt > 60 ? "#22c55e" : batt > 30 ? "#f59e0b" : "#ef4444";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5",
              style: { left: `${pos.cx}%`, top: `${pos.cy}%` },
              "data-ocid": `drone.map_marker.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative",
                    style: { filter: `drop-shadow(0 0 4px ${battColor})` },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Triangle,
                        {
                          className: "w-3 h-3",
                          style: { color: battColor, fill: battColor, opacity: 0.9 }
                        }
                      ),
                      drone.status === "flying" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 rounded-full animate-ping opacity-30",
                          style: { background: battColor }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-[7px] font-mono px-1 py-px rounded",
                    style: {
                      background: "rgba(0,0,0,0.7)",
                      border: `1px solid ${battColor}40`,
                      color: battColor,
                      whiteSpace: "nowrap"
                    },
                    children: [
                      "D",
                      i + 1,
                      " | ",
                      drone.altitude,
                      "m | ",
                      batt,
                      "%"
                    ]
                  }
                )
              ]
            },
            drone.id.toString()
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 text-[8px] font-mono text-cyan-400/50", children: "N↑" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2 text-[8px] font-mono text-muted-foreground/40", children: "SIM" })
      ]
    }
  );
}
function HistoryRow({
  record,
  index
}) {
  const ts = Number(record.timestamp);
  const timeStr = Number.isFinite(ts) ? new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) : "--:--:--";
  const alertObjs = record.objects.filter(isHighAlert);
  const maxConf = record.objects.reduce((m, o) => Math.max(m, o.confidence), 0);
  const confPct = Math.round(maxConf * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.04 },
      className: `flex items-start gap-2.5 px-2.5 py-2 rounded-lg border text-[10px] font-mono ${alertObjs.length > 0 ? "border-red-400/40 bg-red-400/5" : "border-border/20 bg-muted/10"}`,
      "data-ocid": `drone.history_item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 mt-0.5", children: alertObjs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            animate: { opacity: [1, 0.3, 1] },
            transition: { duration: 0.9, repeat: Number.POSITIVE_INFINITY },
            children: "⚠️"
          }
        ) : "📷" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400/80 font-bold uppercase tracking-wider", children: record.cameraId }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/70", children: [
              record.objects.length,
              " obj"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 ml-auto", children: timeStr })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [
            record.objects.slice(0, 4).map((o, i) => {
              const colors = getClassColor(o.name);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-1 py-px rounded text-[8px]",
                  style: {
                    color: colors.text,
                    background: colors.bg,
                    border: `1px solid ${colors.border}`
                  },
                  children: o.name
                },
                `${o.name}-${i}`
              );
            }),
            record.objects.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/40 text-[8px]", children: [
              "+",
              record.objects.length - 4
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-muted-foreground/50", children: "CONF" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1 bg-muted/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-all",
                style: {
                  width: `${confPct}%`,
                  background: confPct > 85 ? "#ef4444" : confPct > 70 ? "#f59e0b" : "#00d9ff"
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[8px]",
                style: {
                  color: confPct > 85 ? "#ef4444" : confPct > 70 ? "#f59e0b" : "#00d9ff"
                },
                children: [
                  confPct,
                  "%"
                ]
              }
            )
          ] })
        ] }),
        alertObjs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            animate: { opacity: [1, 0.2, 1] },
            transition: { duration: 0.7, repeat: Number.POSITIVE_INFINITY },
            className: "shrink-0 text-[8px] font-bold text-red-400 border border-red-400/50 px-1 py-px rounded self-start",
            children: "HIGH"
          }
        )
      ]
    }
  );
}
function DronePage() {
  const [drones, setDrones] = reactExports.useState([
    {
      id: BigInt(1),
      lat: 28.6139,
      lng: 77.209,
      altitude: 120,
      speed: 45,
      battery: BigInt(78),
      status: "flying"
    },
    {
      id: BigInt(2),
      lat: 19.076,
      lng: 72.8777,
      altitude: 85,
      speed: 30,
      battery: BigInt(45),
      status: "flying"
    },
    {
      id: BigInt(3),
      lat: 12.9716,
      lng: 77.5946,
      altitude: 0,
      speed: 0,
      battery: BigInt(95),
      status: "idle"
    }
  ]);
  const [activeFeed, setActiveFeed] = reactExports.useState(0);
  const [activeDroneTab, setActiveDroneTab] = reactExports.useState(0);
  const CAMERA_IDS = ["camera-alpha", "camera-beta", "camera-delta"];
  const { data: detectionHistory = [] } = useDetectionHistory();
  const { data: _alerts = [] } = useDetectionAlerts();
  const initDetection = useInitDetection();
  const yoloMutation = useYoloDetection();
  const [liveDetections, setLiveDetections] = reactExports.useState([]);
  const [activeCameraId, setActiveCameraId] = reactExports.useState(CAMERA_IDS[0]);
  const initMutate = initDetection.mutate;
  reactExports.useEffect(() => {
    initMutate();
  }, [initMutate]);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setDrones(
        (prev) => prev.map((d) => {
          if (d.status !== "flying") return d;
          const newBatt = BigInt(Math.max(0, Number(d.battery) - 1));
          return {
            ...d,
            lat: d.lat + (Math.random() - 0.5) * 8e-3,
            lng: d.lng + (Math.random() - 0.5) * 8e-3,
            speed: Math.max(10, d.speed + (Math.random() - 0.5) * 4),
            battery: newBatt,
            status: Number(newBatt) <= 0 ? "landing" : d.status
          };
        })
      );
    }, 3e3);
    return () => clearInterval(interval);
  }, []);
  reactExports.useEffect(() => {
    if (detectionHistory.length > 0) {
      const latest = detectionHistory[0];
      if (latest) setLiveDetections(latest.objects);
    }
  }, [detectionHistory]);
  const handleRunYolo = async () => {
    const cameraId = CAMERA_IDS[activeFeed];
    setActiveCameraId(cameraId);
    try {
      const result = await yoloMutation.mutateAsync({
        imageData: "demo-frame-base64",
        cameraId
      });
      setLiveDetections(result.objects);
      const alertCount = result.objects.filter(isHighAlert).length;
      if (alertCount > 0) {
        ue.error(
          `⚠ ${alertCount} HIGH ALERT detection${alertCount > 1 ? "s" : ""} — ${cameraId}`,
          { duration: 4e3 }
        );
      } else {
        ue.success(
          `YOLO scan complete — ${result.objects.length} object${result.objects.length !== 1 ? "s" : ""} detected`,
          { duration: 2500 }
        );
      }
    } catch {
      ue.error("Detection scan failed");
    }
  };
  const handleFeedSelect = (i) => {
    setActiveFeed(i);
    setActiveCameraId(CAMERA_IDS[i]);
  };
  const handleCommand = async (cmd) => {
    const drone = drones[activeDroneTab];
    if (!drone) return;
    try {
      await mockBackend.setDroneCommand(drone.id, cmd);
      setDrones(
        (prev) => prev.map((d, i) => {
          if (i !== activeDroneTab) return d;
          if (cmd === "takeoff")
            return { ...d, status: "flying", altitude: 80, speed: 35 };
          if (cmd === "land") return { ...d, status: "landing" };
          if (cmd === "hover") return { ...d, speed: 0 };
          if (cmd === "rtb") return { ...d, status: "landing" };
          return d;
        })
      );
      ue.success(`Command sent: ${cmd.toUpperCase()}`, { duration: 2500 });
    } catch {
      ue.error("Command failed");
    }
  };
  const exportLog = () => {
    const rows = detectionHistory.flatMap(
      (r) => r.objects.map(
        (o) => `${new Date(Number(r.timestamp)).toISOString()},${r.cameraId},${o.name},${Math.round(o.confidence * 100)}%,${o.highAlert ? "HIGH" : "NORMAL"}`
      )
    );
    const csv = ["Timestamp,Camera,Class,Confidence,Alert", ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `yolo-detection-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("Log exported as CSV");
  };
  const selectedDrone = drones[activeDroneTab];
  const batt = selectedDrone ? Number(selectedDrone.battery) : 0;
  const battColor = batt > 60 ? "bg-green-400" : batt > 30 ? "bg-amber-400" : "bg-red-500";
  const battBorder = batt > 60 ? "border-green-400/40" : batt > 30 ? "border-amber-400/40" : "border-red-500/40";
  const totalAlerts = detectionHistory.reduce(
    (sum, r) => sum + r.objects.filter(isHighAlert).length,
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 space-y-4 overflow-auto", "data-ocid": "drone.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center justify-between flex-wrap gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-xl border border-amber-400/50 flex items-center justify-center",
                style: {
                  boxShadow: "0 0 16px rgba(245,158,11,0.35)",
                  background: "rgba(245,158,11,0.08)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5 text-amber-400" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "font-mono font-bold text-lg tracking-widest uppercase text-foreground",
                  style: { textShadow: "0 0 14px rgba(245,158,11,0.5)" },
                  children: "Drone & Camera AI Command Center"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground tracking-wider", children: "ARIA OMNIVERSE • YOLO v8 PRODUCTION DETECTION ENGINE" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            totalAlerts > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                animate: { opacity: [1, 0.4, 1] },
                transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
                className: "flex items-center gap-1.5 border border-red-400/60 bg-red-400/10 px-2 py-1 rounded-lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 text-red-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-red-400 font-bold", children: [
                    totalAlerts,
                    " ALERTS"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3 h-3 text-green-400 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-green-400 tracking-widest", children: "LIVE SIM" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/60", children: "|" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground", children: [
              drones.filter((d) => d.status === "flying").length,
              " AIRBORNE"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scaleX: 0.95 },
        animate: { opacity: 1, scaleX: 1 },
        className: "flex items-center gap-3 px-4 py-2.5 rounded-xl border border-amber-400/50",
        style: {
          background: "rgba(245,158,11,0.08)",
          boxShadow: "0 0 20px rgba(245,158,11,0.12)"
        },
        "data-ocid": "drone.warning_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 text-base", children: "⚠️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-amber-400 tracking-widest uppercase font-bold", children: "SIMULATION MODE — Safe Demo Only" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-amber-400/70 ml-2 hidden sm:block", children: "No real drone hardware connected. YOLO detection is simulated for demonstration." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.1 },
          className: "glass-panel rounded-xl p-4 space-y-3",
          "data-ocid": "drone.yolo_detection_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-amber-400 uppercase tracking-widest", children: "YOLO Detection Feed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground border border-border/30 px-1.5 py-0.5 rounded", children: activeCameraId }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => void handleRunYolo(),
                    disabled: yoloMutation.isPending,
                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-400/60 text-cyan-400 text-[10px] font-mono uppercase tracking-wider hover:bg-cyan-400/10 transition-smooth disabled:opacity-50",
                    style: {
                      boxShadow: yoloMutation.isPending ? void 0 : "0 0 10px rgba(0,217,255,0.2)"
                    },
                    "data-ocid": "drone.run_yolo_button",
                    children: [
                      yoloMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 border border-cyan-400/50 border-t-cyan-400 rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3" }),
                      yoloMutation.isPending ? "Scanning…" : "Live Scan"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YoloCameraFeed,
              {
                objects: liveDetections,
                isScanning: yoloMutation.isPending,
                cameraId: activeCameraId
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              CameraFeedCard,
              {
                feedIndex: i,
                isActive: activeFeed === i,
                onClick: () => handleFeedSelect(i)
              },
              i
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1 border-t border-border/20 flex-wrap", children: [
              [
                { label: "Person", color: "#00d9ff" },
                { label: "Vehicle", color: "#f59e0b" },
                { label: "Motorcycle", color: "#a78bfa" },
                { label: "Truck", color: "#ef4444" }
              ].map(({ label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-1.5 h-1.5 rounded-full",
                    style: { background: color }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground", children: label })
              ] }, label)),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-sm border border-red-400/80 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-red-400", children: "High Alert (>85%)" })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.15 },
          className: "glass-panel rounded-xl p-4 space-y-3",
          "data-ocid": "drone.map_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-amber-400 uppercase tracking-widest", children: "Tactical Map View" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground border border-border/30 px-1.5 py-0.5 rounded", children: "3 UNITS TRACKED" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapView, { drones }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: drones.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-mono text-amber-400/70", children: DRONE_LABELS[i] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[8px] font-mono text-muted-foreground", children: [
                d.lat.toFixed(3),
                ", ",
                d.lng.toFixed(3)
              ] })
            ] }, d.id.toString())) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.2 },
          className: "glass-panel rounded-xl p-4 flex flex-col gap-3",
          "data-ocid": "drone.detection_log_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-shrink-0 flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-amber-400 uppercase tracking-widest", children: "Detection History" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: totalAlerts > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.span,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: [1, 0.3, 1] },
                    transition: {
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY
                    },
                    className: "text-[8px] font-mono text-red-400 border border-red-400/40 px-1 rounded",
                    children: [
                      "⚠ ",
                      totalAlerts,
                      " ALERTS"
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: exportLog,
                  className: "flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground border border-border/40 px-2 py-1 rounded hover:border-amber-400/50 hover:text-amber-400 transition-smooth",
                  "data-ocid": "drone.export_log_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                    "Export CSV"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "overflow-y-auto flex-1 space-y-1.5 max-h-72 pr-1",
                "data-ocid": "drone.detection_list",
                children: detectionHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center justify-center h-32 gap-2",
                    "data-ocid": "drone.detection_empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-muted-foreground/40" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/50", children: "No detections yet — run Live Scan" })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: detectionHistory.map((record, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  HistoryRow,
                  {
                    record,
                    index: i
                  },
                  record.id.toString()
                )) })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.25 },
          className: "glass-panel rounded-xl p-4 space-y-4",
          "data-ocid": "drone.control_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-4 h-4 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-amber-400 uppercase tracking-widest", children: "Control Panel" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", "data-ocid": "drone.drone_selector_tabs", children: DRONE_LABELS.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveDroneTab(i),
                className: `flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono uppercase tracking-wider border transition-smooth ${activeDroneTab === i ? "border-amber-400/70 text-amber-400 bg-amber-400/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : "border-border/30 text-muted-foreground hover:border-amber-400/30 hover:text-amber-300"}`,
                "data-ocid": `drone.drone_tab.${i + 1}`,
                children: label
              },
              label
            )) }),
            selectedDrone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "STATUS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-widest ${STATUS_BADGE[selectedDrone.status] ?? STATUS_BADGE.idle}`,
                    children: selectedDrone.status
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", "data-ocid": "drone.battery_meter", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "BATTERY" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-[10px] font-mono ${batt > 60 ? "text-green-400" : batt > 30 ? "text-amber-400" : "text-red-400"}`,
                      children: [
                        batt,
                        "%"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-2 rounded-full bg-muted/40 border ${battBorder} overflow-hidden`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: `h-full rounded-full ${battColor}`,
                        style: { width: `${batt}%` },
                        animate: { width: `${batt}%` },
                        transition: { duration: 0.5 }
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground", children: "ALTITUDE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-mono font-bold text-foreground leading-none", children: selectedDrone.altitude }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground mb-0.5", children: "m" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "h-full bg-cyan-400 rounded-full",
                      style: {
                        width: `${Math.min(100, selectedDrone.altitude / 150 * 100)}%`
                      }
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground", children: "SPEED" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-mono font-bold text-foreground leading-none", children: Math.round(selectedDrone.speed) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground mb-0.5", children: "km/h" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "h-full bg-purple-400 rounded-full",
                      style: {
                        width: `${Math.min(100, selectedDrone.speed / 80 * 100)}%`
                      }
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-[9px] font-mono text-muted-foreground border border-border/20 rounded-lg px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "LAT" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground/80", children: selectedDrone.lat.toFixed(5) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "LNG" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground/80", children: selectedDrone.lng.toFixed(5) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid grid-cols-2 gap-2",
                  "data-ocid": "drone.command_buttons",
                  children: CMD_DEFS.map(({ cmd, label, color, icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => void handleCommand(cmd),
                      className: `flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-[10px] font-mono uppercase tracking-wider transition-smooth ${color}`,
                      "data-ocid": `drone.${cmd}_button`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm leading-none", children: icon }),
                        label
                      ]
                    },
                    cmd
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setDrones(
                      (prev) => prev.map((d, i) => ({
                        ...d,
                        battery: BigInt(85 + i * 5),
                        status: i < 2 ? "flying" : "idle",
                        altitude: i < 2 ? 80 + i * 20 : 0,
                        speed: i < 2 ? 30 + i * 10 : 0
                      }))
                    );
                    setLiveDetections([]);
                    ue.success("Simulation reset");
                  },
                  className: "w-full flex items-center justify-center gap-2 py-1.5 rounded-lg border border-border/30 text-[9px] font-mono text-muted-foreground hover:border-cyan-400/30 hover:text-cyan-400 transition-smooth",
                  "data-ocid": "drone.reset_simulation_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3" }),
                    "Reset Simulation"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  DronePage
};
