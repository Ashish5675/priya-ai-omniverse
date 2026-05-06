import { r as reactExports, j as jsxRuntimeExports, B as Brain, m as motion, u as useAriaStore, Z as Zap, b as ue, A as AnimatePresence } from "./index-Khuvrpqq.js";
import { c as useListChains, d as useAgentMetrics, b as useActiveStream, u as useCreateChain, a as useRunChain, e as assembleStreamText } from "./useStreaming-DIGIUmgN.js";
import { L as LoaderCircle } from "./loader-circle-CP0fZB5d.js";
import { S as Send } from "./send-D1wP-YNk.js";
import { P as Play } from "./play-DV-pb5yX.js";
import { C as CircleCheck } from "./circle-check-DKp6tXQ-.js";
import { C as CircleAlert } from "./circle-alert-CmI7lxZ-.js";
import { C as Clock } from "./clock-Cvc138nV.js";
import { T as TrendingUp } from "./trending-up-CAfJ9bVg.js";
import { C as ChevronUp } from "./chevron-up-BIQ3il5z.js";
import { C as ChevronDown } from "./chevron-down-DSDUGHV4.js";
import { R as RefreshCw } from "./refresh-cw-BAeMeO08.js";
const AGENT_ICONS = {
  planner: "🧠",
  research: "🔍",
  executor: "⚡",
  memory: "💾",
  critic: "✅"
};
const AGENT_LABELS = {
  planner: "Planner",
  research: "Research",
  executor: "Executor",
  memory: "Memory",
  critic: "Critic"
};
const AGENT_DESC = {
  planner: "Breaks task into steps",
  research: "Fetches context & data",
  executor: "Runs actions",
  memory: "Stores insights",
  critic: "Validates output"
};
const STATUS_COLORS = {
  running: "border-primary/60 text-primary bg-primary/10",
  complete: "border-emerald-400/60 text-emerald-400 bg-emerald-400/10",
  failed: "border-red-400/60 text-red-400 bg-red-400/10",
  idle: "border-muted-foreground/30 text-muted-foreground bg-muted/20"
};
const LIVE_AGENT_ORDER = [
  "planner",
  "research",
  "executor",
  "memory",
  "critic"
];
const DEMO_RECENT = [
  { goal: "Research AI trends in 2025", duration: "12.4s", time: "2 min ago" },
  { goal: "Analyze Q4 sales data", duration: "9.8s", time: "18 min ago" },
  {
    goal: "Write product description for ARIA",
    duration: "7.2s",
    time: "1 hr ago"
  },
  {
    goal: "Summarize competitor landscape",
    duration: "15.1s",
    time: "3 hrs ago"
  },
  {
    goal: "Generate investor pitch outline",
    duration: "11.3s",
    time: "Yesterday"
  }
];
const AGENT_TYPES = ["planner", "research", "executor", "memory", "critic"];
function elapsedLabel(startedAt) {
  if (startedAt === BigInt(0)) return "";
  const ms = Date.now() - Number(startedAt / BigInt(1e6));
  if (ms < 0) return "";
  return ms < 1e3 ? `${ms}ms` : `${(ms / 1e3).toFixed(1)}s`;
}
function StatusBadge({ status }) {
  const cls = STATUS_COLORS[status] ?? STATUS_COLORS.idle;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider ${cls}`,
      children: [
        status === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
        status === "complete" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
        status === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
        status === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-muted-foreground/50" }),
        status
      ]
    }
  );
}
function StepCounter({ current, total }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground/70", children: [
    Number(current),
    "/",
    total,
    " tasks"
  ] });
}
function TaskRow({ task, index }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const icon = AGENT_ICONS[task.agentType] ?? "🤖";
  const label = AGENT_LABELS[task.agentType] ?? task.agentType;
  const desc = AGENT_DESC[task.agentType] ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.07 },
      className: "relative pl-8",
      "data-ocid": `agents.task_row.${index + 1}`,
      children: [
        index < 4 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[14px] top-8 w-px h-full bg-gradient-to-b from-secondary/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute left-0 top-2 w-7 h-7 rounded-full border flex items-center justify-center text-sm
          ${task.status === "running" ? "border-primary/70 bg-primary/10 animate-pulse-glow" : ""}
          ${task.status === "complete" ? "border-emerald-400/60 bg-emerald-400/10" : ""}
          ${task.status === "failed" ? "border-red-400/60 bg-red-400/10" : ""}
          ${task.status === "idle" ? "border-muted-foreground/20 bg-muted/10" : ""}
        `,
            children: task.status === "running" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 text-primary animate-spin" }) : task.status === "complete" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-400" }) : task.status === "failed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-red-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: icon })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel rounded-lg p-3 mb-2 border border-secondary/20 hover:border-secondary/40 transition-smooth", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-semibold text-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground/60", children: [
                  "— ",
                  desc
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground truncate", children: task.input })
            ] }),
            task.output && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setExpanded(!expanded),
                className: "shrink-0 text-secondary/70 hover:text-secondary transition-smooth",
                "aria-label": expanded ? "Collapse output" : "Expand output",
                children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && task.output && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "mt-2 pt-2 border-t border-secondary/20",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground/80 leading-relaxed", children: task.output })
            }
          ) }),
          task.status === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-red-400", children: "Execution failed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "text-[10px] font-mono text-primary hover:glow-cyan transition-smooth flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                  " Retry"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function LiveStepRow({
  step,
  index,
  isLast
}) {
  const isRunning = step.status === "running";
  const isComplete = step.status === "complete";
  const isPending = step.status === "pending";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: isPending ? 0.35 : 1, x: 0 },
      transition: { delay: index * 0.05 },
      className: "relative pl-9",
      "data-ocid": `agents.live_step.${index + 1}`,
      children: [
        !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-[14px] top-7 bottom-0 w-px",
            style: {
              background: isComplete ? "linear-gradient(to bottom, oklch(0.65 0.18 155/0.6), oklch(0.65 0.18 155/0.1))" : "linear-gradient(to bottom, oklch(0.7 0.18 200/0.2), transparent)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute left-0 top-1.5 w-7 h-7 rounded-full border flex items-center justify-center text-sm z-10
          ${isRunning ? "border-primary/70 bg-primary/10" : ""}
          ${isComplete ? "border-emerald-400/60 bg-emerald-400/10" : ""}
          ${isPending ? "border-border/20 bg-transparent" : ""}
        `,
            children: isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 text-primary animate-spin" }) : isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-40", children: AGENT_ICONS[step.agentType] ?? "·" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `glass-panel rounded-xl p-3 mb-3 border transition-all duration-300 ${isRunning ? "border-primary/50 shadow-[0_0_16px_oklch(0.7_0.18_200/0.2)]" : isComplete ? "border-emerald-400/30" : "border-border/10"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: AGENT_ICONS[step.agentType] ?? "🤖" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-mono font-bold tracking-wider ${isRunning ? "text-primary" : isComplete ? "text-emerald-400" : "text-muted-foreground/40"}`,
                      children: AGENT_LABELS[step.agentType] ?? step.agentType
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground/50", children: [
                    "— ",
                    AGENT_DESC[step.agentType] ?? ""
                  ] })
                ] }),
                (isRunning || isComplete) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-mono text-muted-foreground/40 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5" }),
                  elapsedLabel(step.startedAt)
                ] })
              ] }),
              isComplete && step.output && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "text-[11px] font-mono text-muted-foreground/80 leading-relaxed mt-1",
                  children: step.output
                }
              ),
              isRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "flex items-center gap-1.5 mt-1",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  children: [
                    ["d1", "d2", "d3"].map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.span,
                      {
                        className: "w-1.5 h-1.5 rounded-full bg-primary",
                        animate: { opacity: [0.3, 1, 0.3] },
                        transition: {
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.15
                        }
                      },
                      id
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-primary/60 tracking-widest ml-1", children: "PROCESSING" })
                  ]
                }
              ),
              isRunning && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute inset-0 rounded-xl border border-primary/30 pointer-events-none",
                  animate: { opacity: [0.5, 0] },
                  transition: { duration: 1.4, repeat: Number.POSITIVE_INFINITY }
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function ActiveChainsPanel({
  chains,
  isLoading,
  selectedId,
  onSelect
}) {
  const [goal, setGoal] = reactExports.useState("");
  const createChain = useCreateChain();
  const runChain = useRunChain();
  const { setActiveAgentChain } = useAriaStore();
  const handleCreate = async () => {
    if (!goal.trim()) return;
    try {
      await createChain.mutateAsync({ goal });
      ue.success("Agent chain created");
      setGoal("");
    } catch {
      ue.error("Failed to create chain");
    }
  };
  const handleRun = async (chain) => {
    setActiveAgentChain(chain);
    try {
      await runChain.mutateAsync({ chainId: chain.id });
      ue.success("Chain execution started");
    } catch {
      ue.error("Failed to run chain");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full gap-3", "data-ocid": "agents.chains_panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-secondary animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label text-secondary/80", children: "Active Chains" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] font-mono text-muted-foreground/60", children: [
        chains.length,
        " total"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-panel rounded-xl p-3 border border-secondary/30",
        "data-ocid": "agents.create_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label text-secondary mb-2", children: "New Task" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: goal,
              onChange: (e) => setGoal(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleCreate();
                }
              },
              placeholder: "Enter goal for autonomous agents...",
              rows: 2,
              className: "w-full bg-background/40 border border-border/40 rounded-lg px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-secondary/60 resize-none transition-smooth",
              "data-ocid": "agents.goal_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => void handleCreate(),
              disabled: !goal.trim() || createChain.isPending,
              className: "mt-2 w-full btn-cyan py-2 rounded-lg text-xs flex items-center justify-center gap-2 disabled:opacity-40",
              style: {
                background: "oklch(0.58 0.17 282)",
                color: "oklch(0.95 0 0)"
              },
              "data-ocid": "agents.create_button",
              children: [
                createChain.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" }),
                createChain.isPending ? "Creating..." : "Create + Run"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto space-y-2 pr-0.5", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-center py-8 gap-2 text-muted-foreground",
          "data-ocid": "agents.loading_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono", children: "Loading chains..." })
          ]
        }
      ),
      !isLoading && chains.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-panel rounded-xl p-6 text-center border border-secondary/10",
          "data-ocid": "agents.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-10 h-10 text-muted-foreground/20 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground/60", children: "No chains yet. Create one above." })
          ]
        }
      ),
      chains.map((chain, idx) => {
        const isSelected = chain.id === selectedId;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: idx * 0.05 },
            onClick: () => onSelect(chain),
            className: `w-full text-left glass-panel rounded-xl p-3 border transition-smooth cursor-pointer
                ${isSelected ? "border-secondary/70 shadow-[0_0_12px_oklch(0.58_0.17_282/0.3)]" : "border-secondary/20 hover:border-secondary/50"}
              `,
            "data-ocid": `agents.chain_item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `mt-0.5 w-2 h-2 rounded-full shrink-0
                  ${chain.status === "running" ? "bg-primary animate-pulse" : ""}
                  ${chain.status === "complete" ? "bg-emerald-400" : ""}
                  ${chain.status === "failed" ? "bg-red-400" : ""}
                  ${chain.status === "idle" ? "bg-muted-foreground/40" : ""}
                `
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground line-clamp-2 leading-relaxed", children: chain.goal }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: chain.status }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StepCounter,
                      {
                        current: chain.currentStep,
                        total: chain.tasks.length
                      }
                    )
                  ] })
                ] })
              ] }),
              chain.status === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    void handleRun(chain);
                  },
                  disabled: runChain.isPending,
                  className: "mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-primary/30 hover:border-primary text-primary text-[10px] font-mono hover:glow-cyan transition-smooth disabled:opacity-40",
                  "data-ocid": `agents.run_button.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3" }),
                    " Run Chain"
                  ]
                }
              )
            ]
          },
          chain.id.toString()
        );
      })
    ] })
  ] });
}
function ChainDetailPanel({ chain }) {
  var _a, _b;
  const { data: activeStream, isStreaming } = useActiveStream();
  const [viewMode, setViewMode] = reactExports.useState("timeline");
  const liveSteps = LIVE_AGENT_ORDER.map((type) => {
    var _a2;
    const found = (_a2 = activeStream == null ? void 0 : activeStream.agentSteps) == null ? void 0 : _a2.find((s) => s.agentType === type);
    return found ?? {
      agentType: type,
      status: "pending",
      output: "",
      startedAt: BigInt(0),
      completedAt: BigInt(0)
    };
  });
  const assembledText = (activeStream == null ? void 0 : activeStream.chunks) ? assembleStreamText(activeStream.chunks) : "";
  if (!chain && !isStreaming) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-full text-center gap-4",
        "data-ocid": "agents.detail_empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl border border-secondary/20 flex items-center justify-center glass-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-8 h-8 text-secondary/30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-muted-foreground/60", children: "No chain selected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground/40 mt-1", children: "Click a chain to view the execution timeline" })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full gap-3", "data-ocid": "agents.detail_panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", "data-ocid": "agents.view_tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setViewMode("timeline"),
          className: `px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider border transition-all duration-200 ${viewMode === "timeline" ? "border-secondary/70 text-secondary bg-secondary/10" : "border-border/30 text-muted-foreground/50 hover:border-secondary/40"}`,
          "data-ocid": "agents.timeline_tab",
          children: "Timeline"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setViewMode("live"),
          className: `px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider border transition-all duration-200 flex items-center gap-1.5 ${viewMode === "live" ? "border-primary/70 text-primary bg-primary/10" : "border-border/30 text-muted-foreground/50 hover:border-primary/40"}`,
          "data-ocid": "agents.live_tab",
          children: [
            "Live Feed",
            isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                className: "w-1.5 h-1.5 rounded-full bg-primary",
                animate: { opacity: [1, 0.3, 1] },
                transition: { duration: 0.6, repeat: Number.POSITIVE_INFINITY }
              }
            )
          ]
        }
      )
    ] }),
    viewMode === "timeline" && chain && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel rounded-xl p-4 border border-secondary/40 corner-brackets flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label text-secondary mb-1", children: "Goal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-foreground leading-relaxed", children: chain.goal })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: chain.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3 pt-3 border-t border-secondary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground", children: [
            "Step",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary", children: Number(chain.currentStep) }),
            " ",
            "/ ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: chain.tasks.length })
          ] }),
          chain.status === "running" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[10px] font-mono text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
            " Executing..."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] font-mono text-muted-foreground/50", children: [
            "ID #",
            chain.id.toString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted/30 rounded-full overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "h-full bg-gradient-to-r from-secondary to-primary rounded-full",
          initial: { width: 0 },
          animate: {
            width: `${chain.tasks.length > 0 ? Number(chain.currentStep) / chain.tasks.length * 100 : 0}%`
          },
          transition: { duration: 0.8, ease: "easeOut" }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label text-muted-foreground/60 mb-3", children: "Execution Timeline" }),
        chain.tasks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground/40 text-center py-4", children: "No tasks generated yet" }),
        chain.tasks.map((task, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskRow, { task, index: idx }, task.id.toString()))
      ] }),
      chain.status === "complete" && ((_a = chain.tasks[chain.tasks.length - 1]) == null ? void 0 : _a.output) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "glass-panel rounded-xl p-4 border border-emerald-400/30 bg-emerald-400/5 flex-shrink-0",
          "data-ocid": "agents.final_output",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label text-emerald-400", children: "Priya's Response" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-foreground/90 leading-relaxed", children: chain.tasks[chain.tasks.length - 1].output })
          ]
        }
      )
    ] }),
    viewMode === "live" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-3 overflow-y-auto min-h-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-panel rounded-xl p-3 border border-primary/30 flex-shrink-0 flex items-center gap-2.5", children: isStreaming ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            className: "w-2 h-2 rounded-full bg-primary",
            animate: { opacity: [1, 0.3, 1] },
            transition: {
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-primary tracking-widest", children: "LIVE EXECUTION" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] font-mono text-muted-foreground/40", children: [
          "Session #",
          (_b = activeStream == null ? void 0 : activeStream.id) == null ? void 0 : _b.toString()
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-muted-foreground/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground/50 tracking-widest", children: "AWAITING EXECUTION" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label text-muted-foreground/60 mb-3", children: "Agent Pipeline" }),
        liveSteps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          LiveStepRow,
          {
            step,
            index: i,
            isLast: i === liveSteps.length - 1
          },
          step.agentType
        ))
      ] }),
      assembledText && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "glass-panel rounded-xl p-3 border border-primary/20 flex-shrink-0",
          "data-ocid": "agents.stream_output",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label text-primary/70 mb-2", children: "Output Stream" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-foreground/80 leading-relaxed whitespace-pre-wrap", children: [
              assembledText,
              isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  className: "inline-block w-0.5 h-3.5 bg-primary ml-0.5 align-text-bottom",
                  animate: { opacity: [1, 0] },
                  transition: {
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY
                  }
                }
              )
            ] })
          ]
        }
      )
    ] }),
    viewMode === "timeline" && !chain && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground/40", children: "Select a chain to see its timeline" }) })
  ] });
}
function AgentMetricsPanel({
  metrics
}) {
  const total = metrics ? Number(metrics.totalTasks) : 0;
  const completed = metrics ? Number(metrics.completedTasks) : 0;
  const failed = metrics ? Number(metrics.failedTasks) : 0;
  const avgDuration = metrics ? (Number(metrics.avgDuration) / 1e3).toFixed(1) : "0.0";
  const successRate = total > 0 ? Math.round(completed / total * 100) : 0;
  const agentTaskCounts = AGENT_TYPES.map((type, i) => ({
    type,
    icon: AGENT_ICONS[type],
    label: AGENT_LABELS[type],
    count: total > 0 ? Math.round(total / 5) + (i === 0 ? total % 5 : 0) : 0,
    pct: total > 0 ? 100 / 5 : 0
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full gap-4",
      "data-ocid": "agents.metrics_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label text-primary/80", children: "Agent Metrics" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
          {
            label: "Total Tasks",
            value: total.toString(),
            icon: Brain,
            color: "text-primary"
          },
          {
            label: "Completed",
            value: completed.toString(),
            icon: CircleCheck,
            color: "text-emerald-400"
          },
          {
            label: "Failed",
            value: failed.toString(),
            icon: CircleAlert,
            color: "text-red-400"
          },
          {
            label: "Avg Duration",
            value: `${avgDuration}s`,
            icon: Clock,
            color: "text-secondary"
          }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-panel rounded-xl p-3 border border-primary/15 flex flex-col gap-1",
            "data-ocid": `agents.metric_${stat.label.toLowerCase().replace(" ", "_")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: `w-3.5 h-3.5 ${stat.color}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-lg font-display font-bold ${stat.color}`, children: stat.value })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground/70", children: stat.label })
            ]
          },
          stat.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel rounded-xl p-3 border border-primary/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/70", children: "Success Rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-display font-bold text-emerald-400", children: [
              successRate,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full bg-gradient-to-r from-emerald-400/70 to-emerald-400 rounded-full",
              initial: { width: 0 },
              animate: { width: `${successRate}%` },
              transition: { duration: 1, ease: "easeOut" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground/40", children: "0%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground/40", children: "100%" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel rounded-xl p-3 border border-primary/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label text-muted-foreground/60 mb-3", children: "Agent Breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: agentTaskCounts.map((agent) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm w-5 text-center", children: agent.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/80 w-16 shrink-0", children: agent.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full bg-gradient-to-r from-secondary/60 to-secondary rounded-full",
                initial: { width: 0 },
                animate: { width: `${agent.pct}%` },
                transition: { duration: 0.8, delay: 0.1 }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/60 w-5 text-right", children: agent.count })
          ] }, agent.type)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 glass-panel rounded-xl p-3 border border-primary/15 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-primary/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label text-muted-foreground/60", children: "Recent Activity" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 overflow-y-auto max-h-48", children: DEMO_RECENT.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 8 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: idx * 0.07 },
              className: "flex items-start gap-2 py-1.5 border-b border-border/20 last:border-0",
              "data-ocid": `agents.recent_item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-emerald-400 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-foreground/80 line-clamp-1", children: item.goal }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground/50", children: item.duration }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground/40", children: item.time })
                  ] })
                ] })
              ]
            },
            item.goal
          )) })
        ] })
      ]
    }
  );
}
function AgentsPage() {
  const [selectedChain, setSelectedChain] = reactExports.useState(null);
  const { data: chains = [], isLoading } = useListChains();
  const { data: metrics } = useAgentMetrics();
  const { isStreaming } = useActiveStream();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full min-h-0 scanline-overlay",
      "data-ocid": "agents.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 px-5 py-4 border-b border-secondary/20 flex items-center gap-3 bg-card/60 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl border border-secondary/50 flex items-center justify-center glow-purple", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 text-secondary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display font-bold text-base text-foreground tracking-widest uppercase",
                style: { textShadow: "0 0 16px oklch(0.58 0.17 282 / 0.6)" },
                children: "AI Agent Control Center"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground/60", children: "AutoGPT-style autonomous task chains · 5-agent orchestration" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-secondary/30 bg-secondary/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-secondary", children: "ONLINE" })
            ] }),
            isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/10",
                "data-ocid": "agents.live_badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.span,
                    {
                      className: "w-1.5 h-1.5 rounded-full bg-primary",
                      animate: { opacity: [1, 0.3, 1] },
                      transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-primary", children: "LIVE" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground/40", children: [
              chains.filter((c) => c.status === "running").length,
              " running"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0 grid grid-cols-[30%_40%_30%] gap-0 divide-x divide-secondary/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 overflow-hidden p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActiveChainsPanel,
            {
              chains,
              isLoading,
              selectedId: (selectedChain == null ? void 0 : selectedChain.id) ?? null,
              onSelect: setSelectedChain
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 overflow-hidden p-4 bg-card/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChainDetailPanel, { chain: selectedChain }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 overflow-hidden p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AgentMetricsPanel, { metrics }) })
        ] })
      ]
    }
  );
}
export {
  AgentsPage
};
