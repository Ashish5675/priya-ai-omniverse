import { BarChart3, Brain, Lightbulb, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Static data ──────────────────────────────────────────────────────────────

const FORECAST_DATA = [
  { day: "Mon", performance: 82, taskVolume: 210 },
  { day: "Tue", performance: 85, taskVolume: 280 },
  { day: "Wed", performance: 87, taskVolume: 260 },
  { day: "Thu", performance: 84, taskVolume: 310 },
  { day: "Fri", performance: 89, taskVolume: 340 },
  { day: "Sat", performance: 91, taskVolume: 290 },
  { day: "Sun", performance: 88, taskVolume: 220 },
];

const INSIGHT_BULLETS = [
  { icon: "📈", text: "Tester agent improved 15% accuracy in last 24 hours" },
  { icon: "⏰", text: "Peak usage is Tuesday 2–4 PM — scale workers then" },
  { icon: "🌐", text: "Hindi language queries up 34% this week" },
  { icon: "📚", text: "Knowledge base searches increased 2× since last month" },
  {
    icon: "⏱️",
    text: "Average session length: 12 minutes (▲3 min vs last week)",
  },
];

const SCENARIO_PRESETS = [
  "Scale to 10k users",
  "Add GPU acceleration",
  "Launch mobile app",
  "Expand to 5 languages",
];

const KPI_CARDS = [
  {
    label: "AI Accuracy",
    value: "87.3%",
    trend: "+2.1%",
    sparkline: [80, 82, 81, 84, 85, 87, 87],
    color: "text-primary",
    border: "border-primary/30",
    glow: "oklch(0.7 0.18 200 / 0.3)",
  },
  {
    label: "Tasks Completed",
    value: "1,247",
    trend: "+18%",
    sparkline: [900, 1020, 980, 1100, 1150, 1200, 1247],
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    glow: "oklch(0.65 0.18 155 / 0.3)",
  },
  {
    label: "Avg Response",
    value: "1.4s",
    trend: "-0.3s",
    sparkline: [2.1, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4],
    color: "text-amber-400",
    border: "border-amber-400/30",
    glow: "oklch(0.75 0.15 85 / 0.3)",
  },
  {
    label: "User Growth",
    value: "+23%",
    trend: "this month",
    sparkline: [5, 8, 10, 14, 17, 20, 23],
    color: "text-secondary",
    border: "border-secondary/30",
    glow: "oklch(0.58 0.17 282 / 0.3)",
  },
];

// ─── Sparkline SVG ────────────────────────────────────────────────────────────

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const W = 72;
  const H = 24;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * W;
    const y = H - ((v - min) / range) * (H * 0.85) - 2;
    return `${x},${y}`;
  });
  return (
    <svg width={W} height={H} className="overflow-visible shrink-0">
      <title>Sparkline</title>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Heatmap ─────────────────────────────────────────────────────────────────

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function UsageHeatmap() {
  // Deterministic simulated usage 7 days × 24 hours
  const data = DAYS.map((_, di) =>
    Array.from({ length: 24 }, (__, hi) => {
      const base = di < 5 ? 0.3 : 0.1; // weekday vs weekend
      const peakH = di === 1 ? (hi >= 14 && hi <= 16 ? 1.0 : 0) : 0;
      const morningH = hi >= 9 && hi <= 11 ? 0.5 : 0;
      const eveningH = hi >= 18 && hi <= 21 ? 0.6 : 0;
      return Math.min(
        1,
        base + peakH + morningH + eveningH + ((di * 7 + hi) % 5) * 0.04,
      );
    }),
  );
  const HOURS = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="overflow-x-auto" data-ocid="insights.heatmap">
      <div className="flex gap-1 mb-1 pl-8">
        {HOURS.filter((h) => h % 3 === 0).map((h) => (
          <div
            key={h}
            className="text-[8px] font-mono text-muted-foreground/40"
            style={{ width: `${(3 / 24) * (24 * 11)}px`, textAlign: "center" }}
          >
            {h}h
          </div>
        ))}
      </div>
      {DAYS.map((day, di) => (
        <div key={day} className="flex items-center gap-1 mb-0.5">
          <span className="text-[9px] font-mono text-muted-foreground/50 w-7 shrink-0 text-right">
            {day}
          </span>
          {HOURS.map((h) => {
            const val = data[di][h];
            const lightness = 0.18 + val * 0.52;
            const chroma = val * 0.18;
            return (
              <div
                key={h}
                title={`${day} ${h}:00 — intensity ${Math.round(val * 100)}%`}
                className="rounded-[2px] w-2.5 h-2.5 shrink-0 transition-colors"
                style={{
                  background:
                    val < 0.05
                      ? "oklch(0.12 0 0)"
                      : `oklch(${lightness} ${chroma} 200)`,
                }}
              />
            );
          })}
        </div>
      ))}
      <div className="flex items-center gap-2 mt-2 ml-8">
        <span className="text-[9px] font-mono text-muted-foreground/40">
          Low
        </span>
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => (
          <div
            key={v}
            className="w-2.5 h-2.5 rounded-[2px]"
            style={{ background: `oklch(${0.18 + v * 0.52} ${v * 0.18} 200)` }}
          />
        ))}
        <span className="text-[9px] font-mono text-muted-foreground/40">
          High
        </span>
      </div>
    </div>
  );
}

// ─── Decision Engine ─────────────────────────────────────────────────────────

function scoreScenario(text: string) {
  const len = text.length;
  const risk = Math.min(10, Math.max(1, Math.round((len % 9) + 2)));
  const feasibility = Math.min(10, Math.max(1, Math.round(10 - (len % 7))));
  const viability = Math.round(((10 - risk + feasibility) / 20) * 100);
  return { risk, feasibility, viability };
}

function DecisionEngine() {
  const [scenario, setScenario] = useState("");
  const [result, setResult] = useState<{
    risk: number;
    feasibility: number;
    viability: number;
  } | null>(null);

  const evaluate = () => {
    if (!scenario.trim()) return;
    setResult(scoreScenario(scenario));
  };

  const radarData = result
    ? [
        { axis: "Risk Mgmt", value: 10 - result.risk },
        { axis: "Feasibility", value: result.feasibility },
        { axis: "Viability", value: result.viability / 10 },
        {
          axis: "Scalability",
          value: Math.round(7 + Math.sin(scenario.length) * 2),
        },
        { axis: "ROI", value: Math.round(6 + (scenario.length % 4)) },
      ]
    : [];

  return (
    <div
      className="glass-panel rounded-xl border border-primary/20 p-4"
      data-ocid="insights.decision_engine"
    >
      <div className="flex items-center gap-2 mb-3">
        <Brain className="w-4 h-4 text-primary" />
        <span className="hud-label text-primary/80">
          Decision-Making Engine
        </span>
      </div>
      <div className="flex gap-2 mb-2">
        <input
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          placeholder="Enter a scenario to evaluate..."
          className="flex-1 bg-background/40 border border-border/40 rounded-lg px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-smooth"
          data-ocid="insights.scenario_input"
        />
        <button
          type="button"
          onClick={evaluate}
          disabled={!scenario.trim()}
          className="px-3 py-2 rounded-lg btn-cyan text-xs font-mono disabled:opacity-40 shrink-0"
          data-ocid="insights.evaluate_button"
        >
          Evaluate
        </button>
      </div>
      {/* Presets */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {SCENARIO_PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setScenario(p);
              setResult(scoreScenario(p));
            }}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-primary/30 text-primary/70 hover:bg-primary/10 hover:text-primary transition-colors"
            data-ocid={`insights.preset_${p.toLowerCase().replace(/ /g, "_")}`}
          >
            {p}
          </button>
        ))}
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Scores */}
          <div className="space-y-3">
            {[
              {
                label: "Risk Score",
                value: result.risk,
                max: 10,
                color: "text-red-400",
                barColor: "bg-red-400",
              },
              {
                label: "Feasibility",
                value: result.feasibility,
                max: 10,
                color: "text-emerald-400",
                barColor: "bg-emerald-400",
              },
              {
                label: "Overall Viability",
                value: result.viability,
                max: 100,
                color: "text-primary",
                barColor: "bg-primary",
              },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-muted-foreground/70">
                    {s.label}
                  </span>
                  <span className={`text-sm font-display font-bold ${s.color}`}>
                    {s.value}
                    {s.label.includes("Viability") ? "%" : "/10"}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${s.barColor}`}
                    animate={{ width: `${(s.value / s.max) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Radar */}
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="oklch(0.5 0 0 / 0.2)" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{
                    fontSize: 9,
                    fill: "oklch(0.7 0 0 / 0.6)",
                    fontFamily: "JetBrainsMono,monospace",
                  }}
                />
                <Radar
                  dataKey="value"
                  stroke="oklch(0.7 0.18 200)"
                  fill="oklch(0.7 0.18 200 / 0.2)"
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function InsightsDashboardPage() {
  return (
    <div
      className="flex-1 p-5 space-y-5 overflow-auto"
      data-ocid="insights.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl border border-primary/40 flex items-center justify-center"
          style={{ boxShadow: "0 0 12px oklch(0.7 0.18 200 / 0.4)" }}
        >
          <BarChart3 className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h1
            className="font-display font-bold text-base text-foreground tracking-widest uppercase"
            style={{ textShadow: "0 0 16px oklch(0.7 0.18 200 / 0.6)" }}
          >
            Insights Dashboard
          </h1>
          <p className="text-[10px] font-mono text-muted-foreground/60">
            Smart analytics · predictions · decision engine
          </p>
        </div>
      </div>

      {/* KPI row */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
        data-ocid="insights.kpi_row"
      >
        {KPI_CARDS.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`glass-panel rounded-xl p-4 border ${kpi.border} relative overflow-hidden`}
            style={{ boxShadow: `0 0 12px ${kpi.glow}` }}
            data-ocid={`insights.kpi.${i + 1}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">
                {kpi.label}
              </span>
              <Sparkline
                values={kpi.sparkline}
                color={kpi.color.replace("text-", "")}
              />
            </div>
            <p
              className={`text-2xl font-display font-bold leading-none ${kpi.color}`}
            >
              {kpi.value}
            </p>
            <span className="text-[10px] font-mono text-muted-foreground/50 mt-1 block">
              {kpi.trend}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Predictions chart + Data insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2 glass-panel border border-primary/20 rounded-xl p-4"
          data-ocid="insights.forecast_chart"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest">
              7-Day AI Forecast
            </span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FORECAST_DATA}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.5 0 0 / 0.1)"
                />
                <XAxis
                  dataKey="day"
                  tick={{
                    fontSize: 9,
                    fill: "oklch(0.6 0 0 / 0.6)",
                    fontFamily: "JetBrainsMono,monospace",
                  }}
                />
                <YAxis
                  tick={{
                    fontSize: 9,
                    fill: "oklch(0.6 0 0 / 0.6)",
                    fontFamily: "JetBrainsMono,monospace",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.08 0 0)",
                    border: "1px solid oklch(0.7 0.18 200 / 0.4)",
                    fontSize: 10,
                    fontFamily: "JetBrainsMono,monospace",
                  }}
                  labelStyle={{ color: "oklch(0.7 0.18 200)" }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: 9,
                    fontFamily: "JetBrainsMono,monospace",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="oklch(0.7 0.18 200)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "oklch(0.7 0.18 200)" }}
                  name="AI Performance"
                />
                <Line
                  type="monotone"
                  dataKey="taskVolume"
                  stroke="oklch(0.58 0.17 282)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "oklch(0.58 0.17 282)" }}
                  name="Task Volume"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel border border-secondary/20 rounded-xl p-4"
          data-ocid="insights.data_insights"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-secondary" />
            <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">
              Data Insights
            </span>
          </div>
          <div className="space-y-3">
            {INSIGHT_BULLETS.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
                className="flex items-start gap-2.5"
                data-ocid={`insights.insight.${i + 1}`}
              >
                <span className="text-sm shrink-0">{item.icon}</span>
                <p className="text-[11px] font-mono text-muted-foreground/80 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decision Engine */}
      <DecisionEngine />

      {/* Usage Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel border border-primary/15 rounded-xl p-4"
        data-ocid="insights.heatmap_panel"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-mono text-primary uppercase tracking-widest">
            Usage Heatmap — 7 Days × 24 Hours
          </span>
        </div>
        <UsageHeatmap />
      </motion.div>
    </div>
  );
}
