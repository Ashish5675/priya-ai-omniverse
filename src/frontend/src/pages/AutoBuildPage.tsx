import {
  CheckCircle2,
  Download,
  Hammer,
  Loader2,
  RefreshCcw,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type StepStatus = "pending" | "running" | "done";

interface BuildStep {
  id: string;
  name: string;
  output: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  "Build a weather dashboard",
  "Create a todo app",
  "Analyze stock trends",
  "Design a login system",
];

const BUILD_STEPS: BuildStep[] = [
  {
    id: "understand",
    name: "Understanding requirements",
    output: "Goal parsed: 5 modules identified, 3 API endpoints scoped",
  },
  {
    id: "architect",
    name: "Designing architecture",
    output:
      "Component tree: App → Layout → Pages → Hooks. REST API layer mapped.",
  },
  {
    id: "codegen",
    name: "Generating code structure",
    output:
      "12 files generated: index.html, styles.css, app.js, api.js, utils.js + 7 more",
  },
  {
    id: "validate",
    name: "Running validation tests",
    output: "22/22 unit tests passing. No critical issues found.",
  },
  {
    id: "output",
    name: "Preparing output",
    output: "Bundle optimized. README generated. project.zip ready (47 KB).",
  },
];

const GENERATED_FILES = [
  "index.html",
  "styles.css",
  "app.js",
  "api.js",
  "README.md",
];

const STEP_DELAY_MS = 1800;

// ─── Thinking Visualization ───────────────────────────────────────────────────

function ThinkingViz() {
  const NODES = [
    { cx: 80, cy: 50 },
    { cx: 160, cy: 25 },
    { cx: 240, cy: 50 },
    { cx: 200, cy: 95 },
    { cx: 120, cy: 95 },
    { cx: 80, cy: 130 },
    { cx: 200, cy: 130 },
    { cx: 160, cy: 155 },
  ];
  const EDGES = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [4, 5],
    [3, 6],
    [5, 7],
    [6, 7],
    [1, 4],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass-panel rounded-xl border border-primary/30 p-4 mb-4"
      data-ocid="auto-build.thinking_viz"
      style={{ boxShadow: "0 0 20px oklch(0.7 0.18 200 / 0.2)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.span
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
        />
        <span className="text-[10px] font-mono text-primary tracking-widest">
          Priya is reasoning...
        </span>
      </div>
      <svg width="100%" viewBox="0 0 280 180" className="overflow-visible">
        <title>Neural reasoning visualization</title>
        <defs>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={`e-${a}-${b}`}
            x1={NODES[a].cx}
            y1={NODES[a].cy}
            x2={NODES[b].cx}
            y2={NODES[b].cy}
            stroke="oklch(0.7 0.18 200 / 0.4)"
            strokeWidth="1"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
        {NODES.map((n, i) => (
          <motion.circle
            key={`node-${n.cx}-${n.cy}`}
            cx={n.cx}
            cy={n.cy}
            r={i === 4 ? 8 : 5}
            fill={
              i === 4
                ? "oklch(0.7 0.18 200 / 0.3)"
                : "oklch(0.7 0.18 200 / 0.1)"
            }
            stroke="oklch(0.7 0.18 200)"
            strokeWidth="1.5"
            filter="url(#nodeGlow)"
            animate={{ r: i === 4 ? [8, 11, 8] : [5, 7, 5] }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AutoBuildPage() {
  const [goal, setGoal] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>(
    Object.fromEntries(BUILD_STEPS.map((s) => [s.id, "pending"])),
  );
  const [stepOutputs, setStepOutputs] = useState<Record<string, string>>({});
  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  const [eta, setEta] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const totalSteps = BUILD_STEPS.length;
  const completedSteps = Object.values(stepStatuses).filter(
    (s) => s === "done",
  ).length;
  const progress = isDone
    ? 100
    : currentStepIdx < 0
      ? 0
      : Math.round(((completedSteps + 0.5) / totalSteps) * 100);

  useEffect(() => {
    if (!isBuilding) return;
    const remaining = totalSteps - completedSteps;
    setEta(remaining * Math.ceil(STEP_DELAY_MS / 1000));
  }, [completedSteps, isBuilding, totalSteps]);

  const handleStart = () => {
    if (!goal.trim()) return;
    setIsBuilding(true);
    setIsDone(false);
    setIsThinking(true);
    setStepStatuses(
      Object.fromEntries(BUILD_STEPS.map((s) => [s.id, "pending"])),
    );
    setStepOutputs({});
    setCurrentStepIdx(0);
    setEta(totalSteps * Math.ceil(STEP_DELAY_MS / 1000));

    BUILD_STEPS.forEach((step, i) => {
      // Running
      setTimeout(() => {
        setCurrentStepIdx(i);
        setStepStatuses((prev) => ({ ...prev, [step.id]: "running" }));
        if (i === 1) setIsThinking(false); // hide thinking after step 1
      }, i * STEP_DELAY_MS);
      // Done
      setTimeout(
        () => {
          setStepStatuses((prev) => ({ ...prev, [step.id]: "done" }));
          setStepOutputs((prev) => ({ ...prev, [step.id]: step.output }));
          if (i === BUILD_STEPS.length - 1) {
            setIsBuilding(false);
            setIsDone(true);
            setIsThinking(false);
          }
        },
        i * STEP_DELAY_MS + STEP_DELAY_MS - 200,
      );
    });
  };

  const handleAbort = () => {
    setIsBuilding(false);
    setIsThinking(false);
    setIsDone(false);
    setStepStatuses(
      Object.fromEntries(BUILD_STEPS.map((s) => [s.id, "pending"])),
    );
    setStepOutputs({});
    setCurrentStepIdx(-1);
  };

  return (
    <div
      className="flex flex-col h-full min-h-0 scanline-overlay"
      data-ocid="auto-build.page"
    >
      {/* Header */}
      <div className="shrink-0 px-5 py-4 border-b border-primary/20 flex items-center gap-3 bg-card/60 backdrop-blur-sm">
        <div className="w-9 h-9 rounded-xl border border-primary/50 flex items-center justify-center glow-cyan">
          <Hammer className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1
            className="font-display font-bold text-base text-foreground tracking-widest uppercase"
            style={{ textShadow: "0 0 16px oklch(0.7 0.18 200 / 0.6)" }}
          >
            Auto Build Projects
          </h1>
          <p className="text-[10px] font-mono text-muted-foreground/60">
            Enter any goal — Priya breaks it into steps and builds it
            autonomously
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {isBuilding && (
            <button
              type="button"
              onClick={handleAbort}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-400/40 text-red-400 text-xs font-mono hover:bg-red-400/10 transition-colors"
              data-ocid="auto-build.abort_button"
            >
              <X className="w-3.5 h-3.5" /> Abort
            </button>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 min-h-0 grid grid-cols-[360px_1fr] divide-x divide-primary/10 overflow-hidden">
        {/* LEFT: Goal input + suggestions */}
        <div className="flex flex-col gap-4 p-4 overflow-y-auto">
          {/* Goal input */}
          <div
            className="glass-panel rounded-xl p-4 border border-primary/30"
            data-ocid="auto-build.goal_panel"
          >
            <p className="hud-label text-primary mb-2">Your Goal</p>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Describe what you want to build..."
              rows={4}
              disabled={isBuilding}
              className="w-full bg-background/40 border border-border/40 rounded-lg px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 resize-none transition-smooth disabled:opacity-60"
              data-ocid="auto-build.goal_input"
            />
            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    if (!isBuilding) setGoal(s);
                  }}
                  disabled={isBuilding}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-primary/30 text-primary/70 hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-40"
                  data-ocid={`auto-build.suggestion_${s.toLowerCase().replace(/ /g, "_")}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleStart}
              disabled={!goal.trim() || isBuilding}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg btn-cyan text-xs font-mono font-bold disabled:opacity-40 transition-all"
              data-ocid="auto-build.start_button"
            >
              {isBuilding ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Building...
                </>
              ) : (
                <>
                  <Hammer className="w-3.5 h-3.5" /> Start Building
                </>
              )}
            </button>
          </div>

          {/* Progress bar */}
          {(isBuilding || isDone) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-xl p-3 border border-primary/20"
              data-ocid="auto-build.progress_panel"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-primary">
                  {progress}% complete
                </span>
                {isBuilding && eta > 0 && (
                  <span className="text-[10px] font-mono text-muted-foreground/50">
                    ETA: {eta}s
                  </span>
                )}
                {isDone && (
                  <span className="text-[10px] font-mono text-emerald-400">
                    ✓ Done
                  </span>
                )}
              </div>
              <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}

          {/* Results panel */}
          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-panel rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4"
                data-ocid="auto-build.results_panel"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="hud-label text-emerald-400">
                    Project Summary
                  </span>
                </div>
                <p className="text-[11px] font-mono text-muted-foreground/80 mb-3 leading-relaxed">
                  Goal: <span className="text-foreground/90">{goal}</span>
                </p>
                <p className="text-[10px] font-mono text-muted-foreground/60 mb-2">
                  Generated Files:
                </p>
                <div className="space-y-1 mb-4">
                  {GENERATED_FILES.map((f, i) => (
                    <div
                      key={f}
                      className="flex items-center gap-2"
                      data-ocid={`auto-build.file.${i + 1}`}
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400/70 shrink-0" />
                      <span className="text-[10px] font-mono text-foreground/80">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setGoal(`${goal} (refined)`);
                      handleStart();
                    }}
                    disabled={isBuilding}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-primary/40 text-primary text-[11px] font-mono hover:bg-primary/10 transition-colors"
                    data-ocid="auto-build.refine_button"
                  >
                    <RefreshCcw className="w-3 h-3" /> Refine
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      toast.success("project.zip download started!")
                    }
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-emerald-400/40 text-emerald-400 text-[11px] font-mono hover:bg-emerald-400/10 transition-colors"
                    data-ocid="auto-build.export_button"
                  >
                    <Download className="w-3 h-3" /> Export
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Thinking + Step timeline */}
        <div
          className="flex flex-col min-h-0 p-4 overflow-y-auto"
          ref={timelineRef}
          data-ocid="auto-build.timeline"
        >
          {/* Thinking viz */}
          <AnimatePresence>{isThinking && <ThinkingViz />}</AnimatePresence>

          {/* Steps */}
          {(isBuilding || isDone || currentStepIdx >= 0) && (
            <div className="space-y-3">
              <p className="hud-label text-muted-foreground/60">
                Execution Timeline
              </p>
              {BUILD_STEPS.map((step, i) => {
                const status = stepStatuses[step.id];
                const isVisible = i <= currentStepIdx || isDone;
                return (
                  <AnimatePresence key={step.id}>
                    {isVisible && (
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.05 }}
                        className={`flex gap-3 p-3 rounded-xl border transition-all duration-500 ${
                          status === "running"
                            ? "border-primary/60 bg-primary/5 shadow-[0_0_12px_oklch(0.7_0.18_200/0.15)]"
                            : status === "done"
                              ? "border-emerald-400/30 bg-emerald-400/5"
                              : "border-border/15"
                        }`}
                        data-ocid={`auto-build.step.${i + 1}`}
                      >
                        {/* Step icon */}
                        <div
                          className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            status === "running"
                              ? "border-primary/70 bg-primary/10"
                              : status === "done"
                                ? "border-emerald-400/50 bg-emerald-400/10"
                                : "border-border/20"
                          }`}
                        >
                          {status === "running" ? (
                            <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                          ) : status === "done" ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <span className="text-[10px] font-mono text-muted-foreground/40">
                              {i + 1}
                            </span>
                          )}
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-mono font-bold ${
                                status === "running"
                                  ? "text-primary"
                                  : status === "done"
                                    ? "text-emerald-400"
                                    : "text-muted-foreground/40"
                              }`}
                            >
                              {step.name}
                            </span>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border ${
                                status === "running"
                                  ? "border-primary/50 text-primary"
                                  : status === "done"
                                    ? "border-emerald-400/40 text-emerald-400"
                                    : "border-border/20 text-muted-foreground/30"
                              }`}
                            >
                              {status === "running"
                                ? "● running"
                                : status === "done"
                                  ? "✓ done"
                                  : "○ pending"}
                            </span>
                          </div>
                          {/* Running dots */}
                          {status === "running" && (
                            <div className="flex gap-1 mt-1.5">
                              {(["d1", "d2", "d3"] as const).map((id, di) => (
                                <motion.span
                                  key={id}
                                  className="w-1.5 h-1.5 rounded-full bg-primary"
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: di * 0.15,
                                  }}
                                />
                              ))}
                            </div>
                          )}
                          {/* Output */}
                          {status === "done" && stepOutputs[step.id] && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[10px] font-mono text-muted-foreground/70 mt-1.5 leading-relaxed"
                            >
                              {stepOutputs[step.id]}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {!isBuilding && !isDone && currentStepIdx < 0 && (
            <div
              className="flex flex-col items-center justify-center flex-1 gap-4 text-center"
              data-ocid="auto-build.empty_state"
            >
              <div className="w-16 h-16 rounded-2xl border border-primary/20 flex items-center justify-center glass-panel">
                <Hammer className="w-8 h-8 text-primary/30" />
              </div>
              <div>
                <p className="text-sm font-mono text-muted-foreground/60">
                  No build running
                </p>
                <p className="text-xs font-mono text-muted-foreground/40 mt-1">
                  Enter a goal on the left and click Start Building
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
