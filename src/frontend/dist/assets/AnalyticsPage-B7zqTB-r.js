import { j as jsxRuntimeExports, q as ChartColumn, m as motion, B as Brain, e as useQuery, r as reactExports, t as mockBackend } from "./index-Khuvrpqq.js";
import { D as Download } from "./download-CWzM3EmD.js";
import { U as Users } from "./users-3y3KoF9a.js";
import { M as MessageSquare, D as DollarSign } from "./message-square-0Y9uutsd.js";
import { M as Mic } from "./mic-DTkU6c4e.js";
import { T as TrendingUp } from "./trending-up-CAfJ9bVg.js";
const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const MRR_TREND = [0, 320, 740, 1200, 1820, 2400];
const SIGNUPS = [5, 8, 14, 22, 35, 45];
const AGENT_TASKS = {
  Planner: [12, 18, 15, 22, 19, 25, 28],
  Executor: [8, 14, 11, 17, 15, 20, 23],
  Critic: [5, 7, 6, 9, 8, 11, 13]
};
const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIER_DATA = [
  {
    label: "Free",
    pct: 60,
    count: 756,
    color: "#6b7280",
    fill: "rgba(107,114,128,0.3)"
  },
  {
    label: "Pro",
    pct: 30,
    count: 378,
    color: "#0ea5e9",
    fill: "rgba(14,165,233,0.35)"
  },
  {
    label: "Enterprise",
    pct: 10,
    count: 126,
    color: "#a855f7",
    fill: "rgba(168,85,247,0.35)"
  }
];
const AGENT_COLORS = {
  Planner: "#0ea5e9",
  Executor: "#a855f7",
  Critic: "#22c55e"
};
function useAnalyticsData() {
  return {
    system: useQuery({
      queryKey: ["system-metrics"],
      queryFn: () => mockBackend.getSystemMetrics()
    })
  };
}
function Sparkline({
  values,
  color = "#0ea5e9"
}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pts = values.map((v, i) => {
    const x = i / (values.length - 1) * w;
    const y = h - (v - min) / range * h * 0.85 - 2;
    return `${x},${y}`;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: w, height: h, className: "overflow-visible", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Sparkline chart" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "polyline",
      {
        points: pts.join(" "),
        fill: "none",
        stroke: color,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function MRRLineChart() {
  const [hovered, setHovered] = reactExports.useState(null);
  const W = 480;
  const H = 180;
  const PL = 48;
  const PR = 16;
  const PT = 16;
  const PB = 32;
  const cw = W - PL - PR;
  const ch = H - PT - PB;
  const maxV = 2400;
  const yTicks = [0, 600, 1200, 1800, 2400];
  const ptX = (i) => PL + i / (MONTHS.length - 1) * cw;
  const ptY = (v) => PT + ch - v / maxV * ch;
  const linePts = MONTHS.map((_, i) => `${ptX(i)},${ptY(MRR_TREND[i])}`).join(
    " "
  );
  const areaPath = [
    `M${ptX(0)},${ptY(MRR_TREND[0])}`,
    ...MONTHS.slice(1).map((_, i) => `L${ptX(i + 1)},${ptY(MRR_TREND[i + 1])}`),
    `L${ptX(MONTHS.length - 1)},${PT + ch}`,
    `L${ptX(0)},${PT + ch} Z`
  ].join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", style: { height: H }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "100%",
      viewBox: `0 0 ${W} ${H}`,
      preserveAspectRatio: "xMidYMid meet",
      className: "overflow-visible",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "MRR trend line chart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "mrrGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#0ea5e9", stopOpacity: "0.35" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#0ea5e9", stopOpacity: "0.02" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "glowLine", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "1.5", result: "blur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "blur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] })
        ] }),
        yTicks.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: PL,
              y1: ptY(v),
              x2: PL + cw,
              y2: ptY(v),
              stroke: "rgba(14,165,233,0.1)",
              strokeWidth: "1",
              strokeDasharray: "3 3"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: PL - 4,
              y: ptY(v) + 4,
              textAnchor: "end",
              fontSize: "10",
              fill: "rgba(255,255,255,0.35)",
              fontFamily: "JetBrainsMono,monospace",
              children: v >= 1e3 ? `$${v / 1e3}k` : `$${v}`
            }
          )
        ] }, v)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: areaPath, fill: "url(#mrrGrad)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polyline",
          {
            points: linePts,
            fill: "none",
            stroke: "#0ea5e9",
            strokeWidth: "2.5",
            strokeLinejoin: "round",
            filter: "url(#glowLine)"
          }
        ),
        MONTHS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: ptX(i),
            y: H - 6,
            textAnchor: "middle",
            fontSize: "10",
            fill: "rgba(255,255,255,0.4)",
            fontFamily: "JetBrainsMono,monospace",
            children: m
          },
          m
        )),
        MONTHS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "g",
          {
            onMouseEnter: () => setHovered(i),
            onMouseLeave: () => setHovered(null),
            style: { cursor: "crosshair" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: ptX(i),
                  cy: ptY(MRR_TREND[i]),
                  r: hovered === i ? 6 : 4,
                  fill: hovered === i ? "#0ea5e9" : "#0c0f14",
                  stroke: "#0ea5e9",
                  strokeWidth: "2"
                }
              ),
              hovered === i && /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x: ptX(i) - 34,
                    y: ptY(MRR_TREND[i]) - 28,
                    width: "68",
                    height: "22",
                    rx: "4",
                    fill: "rgba(14,165,233,0.15)",
                    stroke: "#0ea5e9",
                    strokeWidth: "0.8"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: ptX(i),
                    y: ptY(MRR_TREND[i]) - 13,
                    textAnchor: "middle",
                    fontSize: "10",
                    fill: "#0ea5e9",
                    fontWeight: "bold",
                    fontFamily: "JetBrainsMono,monospace",
                    children: `${m} · $${MRR_TREND[i].toLocaleString()}`
                  }
                )
              ] })
            ]
          },
          `pt-${m}`
        ))
      ]
    }
  ) });
}
function TierDonut({ total }) {
  const R = 68;
  const r = 44;
  const cx = 88;
  const cy = 88;
  let startAngle = -Math.PI / 2;
  const arcs = TIER_DATA.map((t) => {
    const angle = t.pct / 100 * 2 * Math.PI;
    const x1 = cx + R * Math.cos(startAngle);
    const y1 = cy + R * Math.sin(startAngle);
    const x2 = cx + R * Math.cos(startAngle + angle);
    const y2 = cy + R * Math.sin(startAngle + angle);
    const ix1 = cx + r * Math.cos(startAngle + angle);
    const iy1 = cy + r * Math.sin(startAngle + angle);
    const ix2 = cx + r * Math.cos(startAngle);
    const iy2 = cy + r * Math.sin(startAngle);
    const large = angle > Math.PI ? 1 : 0;
    const d = `M${x1} ${y1} A${R} ${R} 0 ${large} 1 ${x2} ${y2} L${ix1} ${iy1} A${r} ${r} 0 ${large} 0 ${ix2} ${iy2} Z`;
    startAngle += angle;
    return { ...t, d };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "176", height: "176", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Tier distribution donut chart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: arcs.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: `gf-${a.label}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "1.5", result: "blur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "blur" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
        ] })
      ] }, `gf-${a.label}`)) }),
      arcs.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: a.d,
          fill: a.fill,
          stroke: a.color,
          strokeWidth: "1.5",
          filter: `url(#gf-${a.label})`
        },
        a.label
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx, cy, r: r - 2, fill: "rgba(6,9,14,0.95)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "text",
        {
          x: cx,
          y: cy - 8,
          textAnchor: "middle",
          fontSize: "22",
          fontWeight: "bold",
          fill: "rgba(255,255,255,0.9)",
          fontFamily: "GeneralSans,sans-serif",
          children: total.toLocaleString()
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "text",
        {
          x: cx,
          y: cy + 10,
          textAnchor: "middle",
          fontSize: "10",
          fill: "rgba(255,255,255,0.4)",
          fontFamily: "JetBrainsMono,monospace",
          children: "Total Users"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 flex-wrap justify-center", children: TIER_DATA.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
          style: { background: t.color }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground", children: t.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-[11px] font-mono font-bold",
          style: { color: t.color },
          children: t.count
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground/50", children: [
        "(",
        t.pct,
        "%)"
      ] })
    ] }, t.label)) })
  ] });
}
function SignupsBarChart() {
  const max = Math.max(...SIGNUPS);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-28", children: SIGNUPS.map((v, i) => {
      const pct = v / max * 100;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex-1 flex flex-col items-center gap-1",
          "data-ocid": `analytics.signup_bar.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-sky-400 font-bold", children: v }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scaleY: 0 },
                animate: { scaleY: 1 },
                transition: { delay: i * 0.08, duration: 0.5, ease: "backOut" },
                className: "w-full rounded-t",
                style: {
                  height: `${pct}%`,
                  background: "linear-gradient(to top, rgba(14,165,233,0.6), rgba(14,165,233,0.95))",
                  boxShadow: "0 0 8px rgba(14,165,233,0.4)",
                  transformOrigin: "bottom"
                }
              }
            )
          ]
        },
        MONTHS[i]
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: MONTHS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground/60", children: m }) }, m)) })
  ] });
}
function AgentTaskChart() {
  const W = 320;
  const H = 120;
  const PL = 32;
  const PR = 8;
  const PT = 12;
  const PB = 24;
  const cw = W - PL - PR;
  const ch = H - PT - PB;
  const allVals = Object.values(AGENT_TASKS).flat();
  const maxV = Math.max(...allVals);
  const ptX = (i) => PL + i / (WEEK_LABELS.length - 1) * cw;
  const ptY = (v) => PT + ch - v / maxV * ch;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "100%",
      viewBox: `0 0 ${W} ${H}`,
      preserveAspectRatio: "xMidYMid meet",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Agent task trend chart" }),
        [0, 0.5, 1].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: PL,
            y1: PT + ch * (1 - f),
            x2: PL + cw,
            y2: PT + ch * (1 - f),
            stroke: "rgba(255,255,255,0.06)",
            strokeWidth: "1"
          },
          f
        )),
        Object.entries(AGENT_TASKS).map(([agent, vals]) => {
          const pts = vals.map((v, i) => `${ptX(i)},${ptY(v)}`).join(" ");
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "polyline",
            {
              points: pts,
              fill: "none",
              stroke: AGENT_COLORS[agent],
              strokeWidth: "2",
              strokeLinejoin: "round",
              style: { filter: `drop-shadow(0 0 3px ${AGENT_COLORS[agent]}80)` }
            },
            agent
          );
        }),
        WEEK_LABELS.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: ptX(i),
            y: H - 6,
            textAnchor: "middle",
            fontSize: "9",
            fill: "rgba(255,255,255,0.35)",
            fontFamily: "JetBrainsMono,monospace",
            children: d
          },
          d
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: PL - 4,
            y: PT + 4,
            textAnchor: "end",
            fontSize: "9",
            fill: "rgba(255,255,255,0.3)",
            fontFamily: "JetBrainsMono,monospace",
            children: maxV
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: PL - 4,
            y: PT + ch + 4,
            textAnchor: "end",
            fontSize: "9",
            fill: "rgba(255,255,255,0.3)",
            fontFamily: "JetBrainsMono,monospace",
            children: "0"
          }
        )
      ]
    }
  );
}
function exportAnalytics(sm) {
  const rows = [
    ["Metric", "Value"],
    ["Total Users", Number((sm == null ? void 0 : sm.totalUsers) ?? 1260)],
    ["Active Users", Number((sm == null ? void 0 : sm.activeUsers) ?? 340)],
    ["Total Messages", Number((sm == null ? void 0 : sm.totalMessages) ?? 15120)],
    ["Voice Calls", Number((sm == null ? void 0 : sm.totalVoiceCalls) ?? 882)],
    ["Agent Tasks", Number((sm == null ? void 0 : sm.totalAgentTasks) ?? 4410)],
    ["MRR ($)", Number((sm == null ? void 0 : sm.mrr) ?? 2400)],
    ...MONTHS.map((m, i) => [`MRR ${m}`, MRR_TREND[i]]),
    ...MONTHS.map((m, i) => [`Signups ${m}`, SIGNUPS[i]])
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "priya-analytics.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function KPICard({
  label,
  value,
  sub,
  trend,
  trendUp,
  sparkline,
  icon,
  ocid,
  extra
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "glass-panel border border-sky-500/20 rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "linear-gradient(135deg, rgba(14,165,233,0.04) 0%, transparent 60%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sky-400", children: icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest", children: label })
          ] }),
          trend && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${trendUp ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`,
              children: [
                trendUp ? "▲" : "▼",
                " ",
                trend
              ]
            }
          ),
          sparkline && /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { values: sparkline, color: "#0ea5e9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-sky-300 leading-none", children: value }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground/70", children: sub }),
        extra
      ]
    }
  );
}
function AnalyticsPage() {
  const { system } = useAnalyticsData();
  const sm = system.data;
  const totalUsers = Number((sm == null ? void 0 : sm.totalUsers) ?? 1260);
  const activeUsers = Number((sm == null ? void 0 : sm.activeUsers) ?? 340);
  const totalMessages = Number((sm == null ? void 0 : sm.totalMessages) ?? 15120);
  const voiceCalls = Number((sm == null ? void 0 : sm.totalVoiceCalls) ?? 882);
  const mrr = Number((sm == null ? void 0 : sm.mrr) ?? 2400);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 p-5 space-y-5 overflow-auto",
      "data-ocid": "analytics.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-9 h-9 rounded-xl border border-sky-500/40 flex items-center justify-center",
                style: { boxShadow: "0 0 12px rgba(14,165,233,0.3)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-sky-400" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "font-display font-bold text-lg text-foreground tracking-widest uppercase",
                  style: { textShadow: "0 0 18px rgba(14,165,233,0.6)" },
                  children: "Analytics Dashboard"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground", children: "Platform metrics & revenue insights" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => exportAnalytics(sm),
              className: "flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sky-500/30 text-sky-400 text-xs font-mono hover:bg-sky-500/10 transition-colors",
              "data-ocid": "analytics.export_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                "Export CSV"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Total Users",
              value: totalUsers.toLocaleString(),
              trend: "18%",
              trendUp: true,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              ocid: "analytics.kpi.total_users"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Active Users",
              value: activeUsers.toLocaleString(),
              sparkline: [180, 220, 195, 260, 310, 340],
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              ocid: "analytics.kpi.active_users"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Total Messages",
              value: totalMessages.toLocaleString(),
              sub: "Avg 12 per user",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
              ocid: "analytics.kpi.messages"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Voice Calls",
              value: voiceCalls.toLocaleString(),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4" }),
              ocid: "analytics.kpi.voice_calls",
              extra: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: [
                { l: "EN", c: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
                {
                  l: "HI",
                  c: "bg-orange-500/20 text-orange-300 border-orange-500/30"
                },
                {
                  l: "NA",
                  c: "bg-purple-500/20 text-purple-300 border-purple-500/30"
                }
              ].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[9px] font-mono border px-1.5 py-0.5 rounded-full ${p.c}`,
                  children: p.l
                },
                p.l
              )) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Monthly Recurring Revenue",
              value: `$${mrr.toLocaleString()}`,
              sub: "This month",
              trend: "12%",
              trendUp: true,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4" }),
              ocid: "analytics.kpi.mrr"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -16 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.15 },
              className: "lg:col-span-2 glass-panel border border-sky-500/20 rounded-xl p-5 space-y-3",
              "data-ocid": "analytics.mrr_trend.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-sky-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-sky-400 uppercase tracking-widest", children: "MRR Trend — Last 6 Months" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(MRRLineChart, {})
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 16 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2 },
              className: "glass-panel border border-purple-500/20 rounded-xl p-5 flex flex-col items-center gap-3",
              "data-ocid": "analytics.tier_distribution.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-purple-400 uppercase tracking-widest self-start", children: "Tier Distribution" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TierDonut, { total: totalUsers })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.25 },
              className: "glass-panel border border-sky-500/20 rounded-xl p-5 space-y-3",
              "data-ocid": "analytics.signups.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-sky-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-sky-400 uppercase tracking-widest", children: "Monthly Signups" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[9px] font-mono text-emerald-400/70", children: "+45 this month" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SignupsBarChart, {})
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3 },
              className: "glass-panel border border-purple-500/20 rounded-xl p-5 space-y-3",
              "data-ocid": "analytics.agent_tasks.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4 text-purple-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-purple-400 uppercase tracking-widest", children: "Agent Task Trend — 7 Days" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AgentTaskChart, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 flex-wrap", children: Object.entries(AGENT_COLORS).map(([agent, color]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-5 h-0.5 rounded-full inline-block flex-shrink-0",
                      style: { background: color, boxShadow: `0 0 4px ${color}` }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: agent })
                ] }, agent)) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  AnalyticsPage
};
