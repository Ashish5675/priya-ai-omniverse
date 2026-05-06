import {
  AlertCircle,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  Play,
  RefreshCw,
  Send,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { AgentStreamStep } from "../backend";
import {
  useAgentMetrics,
  useCreateChain,
  useListChains,
  useRunChain,
} from "../hooks/useAgents";
import { assembleStreamText, useActiveStream } from "../hooks/useStreaming";
import { useAriaStore } from "../store/useAriaStore";
import type { AgentChain, AgentTask } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const AGENT_ICONS: Record<string, string> = {
  planner: "🧠",
  research: "🔍",
  executor: "⚡",
  memory: "💾",
  critic: "✅",
};
const AGENT_LABELS: Record<string, string> = {
  planner: "Planner",
  research: "Research",
  executor: "Executor",
  memory: "Memory",
  critic: "Critic",
};
const AGENT_DESC: Record<string, string> = {
  planner: "Breaks task into steps",
  research: "Fetches context & data",
  executor: "Runs actions",
  memory: "Stores insights",
  critic: "Validates output",
};
const STATUS_COLORS: Record<string, string> = {
  running: "border-primary/60 text-primary bg-primary/10",
  complete: "border-emerald-400/60 text-emerald-400 bg-emerald-400/10",
  failed: "border-red-400/60 text-red-400 bg-red-400/10",
  idle: "border-muted-foreground/30 text-muted-foreground bg-muted/20",
};

const LIVE_AGENT_ORDER = [
  "planner",
  "research",
  "executor",
  "memory",
  "critic",
] as const;

// ─── Demo data ────────────────────────────────────────────────────────────────

const DEMO_RECENT = [
  { goal: "Research AI trends in 2025", duration: "12.4s", time: "2 min ago" },
  { goal: "Analyze Q4 sales data", duration: "9.8s", time: "18 min ago" },
  {
    goal: "Write product description for ARIA",
    duration: "7.2s",
    time: "1 hr ago",
  },
  {
    goal: "Summarize competitor landscape",
    duration: "15.1s",
    time: "3 hrs ago",
  },
  {
    goal: "Generate investor pitch outline",
    duration: "11.3s",
    time: "Yesterday",
  },
];

const AGENT_TYPES = ["planner", "research", "executor", "memory", "critic"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function elapsedLabel(startedAt: bigint): string {
  if (startedAt === BigInt(0)) return "";
  const ms = Date.now() - Number(startedAt / BigInt(1_000_000));
  if (ms < 0) return "";
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_COLORS[status] ?? STATUS_COLORS.idle;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider ${cls}`}
    >
      {status === "running" && (
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      )}
      {status === "complete" && <CheckCircle2 className="w-3 h-3" />}
      {status === "failed" && <AlertCircle className="w-3 h-3" />}
      {status === "idle" && (
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
      )}
      {status}
    </span>
  );
}

function StepCounter({ current, total }: { current: bigint; total: number }) {
  return (
    <span className="text-[10px] font-mono text-muted-foreground/70">
      {Number(current)}/{total} tasks
    </span>
  );
}

function TaskRow({ task, index }: { task: AgentTask; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const icon = AGENT_ICONS[task.agentType] ?? "🤖";
  const label = AGENT_LABELS[task.agentType] ?? task.agentType;
  const desc = AGENT_DESC[task.agentType] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className="relative pl-8"
      data-ocid={`agents.task_row.${index + 1}`}
    >
      {index < 4 && (
        <div className="absolute left-[14px] top-8 w-px h-full bg-gradient-to-b from-secondary/30 to-transparent" />
      )}
      <div
        className={`absolute left-0 top-2 w-7 h-7 rounded-full border flex items-center justify-center text-sm
          ${task.status === "running" ? "border-primary/70 bg-primary/10 animate-pulse-glow" : ""}
          ${task.status === "complete" ? "border-emerald-400/60 bg-emerald-400/10" : ""}
          ${task.status === "failed" ? "border-red-400/60 bg-red-400/10" : ""}
          ${task.status === "idle" ? "border-muted-foreground/20 bg-muted/10" : ""}
        `}
      >
        {task.status === "running" ? (
          <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
        ) : task.status === "complete" ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        ) : task.status === "failed" ? (
          <AlertCircle className="w-3.5 h-3.5 text-red-400" />
        ) : (
          <span className="text-xs">{icon}</span>
        )}
      </div>

      <div className="glass-panel rounded-lg p-3 mb-2 border border-secondary/20 hover:border-secondary/40 transition-smooth">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{icon}</span>
              <span className="text-xs font-mono font-semibold text-foreground">
                {label}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground/60">
                — {desc}
              </span>
            </div>
            <p className="text-xs font-mono text-muted-foreground truncate">
              {task.input}
            </p>
          </div>
          {task.output && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="shrink-0 text-secondary/70 hover:text-secondary transition-smooth"
              aria-label={expanded ? "Collapse output" : "Expand output"}
            >
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
        <AnimatePresence>
          {expanded && task.output && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 pt-2 border-t border-secondary/20"
            >
              <p className="text-xs font-mono text-foreground/80 leading-relaxed">
                {task.output}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {task.status === "failed" && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] font-mono text-red-400">
              Execution failed
            </span>
            <button
              type="button"
              className="text-[10px] font-mono text-primary hover:glow-cyan transition-smooth flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Live Step Row (for streaming view) ───────────────────────────────────────

function LiveStepRow({
  step,
  index,
  isLast,
}: { step: AgentStreamStep; index: number; isLast: boolean }) {
  const isRunning = step.status === "running";
  const isComplete = step.status === "complete";
  const isPending = step.status === "pending";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative pl-9"
      data-ocid={`agents.live_step.${index + 1}`}
    >
      {/* Connector line */}
      {!isLast && (
        <div
          className="absolute left-[14px] top-7 bottom-0 w-px"
          style={{
            background: isComplete
              ? "linear-gradient(to bottom, oklch(0.65 0.18 155/0.6), oklch(0.65 0.18 155/0.1))"
              : "linear-gradient(to bottom, oklch(0.7 0.18 200/0.2), transparent)",
          }}
        />
      )}

      {/* Step circle */}
      <div
        className={`absolute left-0 top-1.5 w-7 h-7 rounded-full border flex items-center justify-center text-sm z-10
          ${isRunning ? "border-primary/70 bg-primary/10" : ""}
          ${isComplete ? "border-emerald-400/60 bg-emerald-400/10" : ""}
          ${isPending ? "border-border/20 bg-transparent" : ""}
        `}
      >
        {isRunning ? (
          <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
        ) : isComplete ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <span className="text-xs opacity-40">
            {AGENT_ICONS[step.agentType] ?? "·"}
          </span>
        )}
      </div>

      {/* Card */}
      <div
        className={`glass-panel rounded-xl p-3 mb-3 border transition-all duration-300 ${
          isRunning
            ? "border-primary/50 shadow-[0_0_16px_oklch(0.7_0.18_200/0.2)]"
            : isComplete
              ? "border-emerald-400/30"
              : "border-border/10"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {AGENT_ICONS[step.agentType] ?? "🤖"}
            </span>
            <span
              className={`text-xs font-mono font-bold tracking-wider ${
                isRunning
                  ? "text-primary"
                  : isComplete
                    ? "text-emerald-400"
                    : "text-muted-foreground/40"
              }`}
            >
              {AGENT_LABELS[step.agentType] ?? step.agentType}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/50">
              — {AGENT_DESC[step.agentType] ?? ""}
            </span>
          </div>
          {(isRunning || isComplete) && (
            <span className="text-[9px] font-mono text-muted-foreground/40 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {elapsedLabel(step.startedAt)}
            </span>
          )}
        </div>

        {isComplete && step.output && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-mono text-muted-foreground/80 leading-relaxed mt-1"
          >
            {step.output}
          </motion.p>
        )}

        {isRunning && (
          <motion.div
            className="flex items-center gap-1.5 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {(["d1", "d2", "d3"] as const).map((id, i) => (
              <motion.span
                key={id}
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.15,
                }}
              />
            ))}
            <span className="text-[10px] font-mono text-primary/60 tracking-widest ml-1">
              PROCESSING
            </span>
          </motion.div>
        )}

        {/* Running glow pulse */}
        {isRunning && (
          <motion.div
            className="absolute inset-0 rounded-xl border border-primary/30 pointer-events-none"
            animate={{ opacity: [0.5, 0] }}
            transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
          />
        )}
      </div>
    </motion.div>
  );
}

// ─── Left Panel ───────────────────────────────────────────────────────────────

function ActiveChainsPanel({
  chains,
  isLoading,
  selectedId,
  onSelect,
}: {
  chains: AgentChain[];
  isLoading: boolean;
  selectedId: bigint | null;
  onSelect: (c: AgentChain) => void;
}) {
  const [goal, setGoal] = useState("");
  const createChain = useCreateChain();
  const runChain = useRunChain();
  const { setActiveAgentChain } = useAriaStore();

  const handleCreate = async () => {
    if (!goal.trim()) return;
    try {
      await createChain.mutateAsync({ goal });
      toast.success("Agent chain created");
      setGoal("");
    } catch {
      toast.error("Failed to create chain");
    }
  };

  const handleRun = async (chain: AgentChain) => {
    setActiveAgentChain(chain);
    try {
      await runChain.mutateAsync({ chainId: chain.id });
      toast.success("Chain execution started");
    } catch {
      toast.error("Failed to run chain");
    }
  };

  return (
    <div className="flex flex-col h-full gap-3" data-ocid="agents.chains_panel">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span className="hud-label text-secondary/80">Active Chains</span>
        <span className="ml-auto text-[10px] font-mono text-muted-foreground/60">
          {chains.length} total
        </span>
      </div>

      <div
        className="glass-panel rounded-xl p-3 border border-secondary/30"
        data-ocid="agents.create_panel"
      >
        <p className="hud-label text-secondary mb-2">New Task</p>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void handleCreate();
            }
          }}
          placeholder="Enter goal for autonomous agents..."
          rows={2}
          className="w-full bg-background/40 border border-border/40 rounded-lg px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-secondary/60 resize-none transition-smooth"
          data-ocid="agents.goal_input"
        />
        <button
          type="button"
          onClick={() => void handleCreate()}
          disabled={!goal.trim() || createChain.isPending}
          className="mt-2 w-full btn-cyan py-2 rounded-lg text-xs flex items-center justify-center gap-2 disabled:opacity-40"
          style={{
            background: "oklch(0.58 0.17 282)",
            color: "oklch(0.95 0 0)",
          }}
          data-ocid="agents.create_button"
        >
          {createChain.isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {createChain.isPending ? "Creating..." : "Create + Run"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
        {isLoading && (
          <div
            className="flex items-center justify-center py-8 gap-2 text-muted-foreground"
            data-ocid="agents.loading_state"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs font-mono">Loading chains...</span>
          </div>
        )}
        {!isLoading && chains.length === 0 && (
          <div
            className="glass-panel rounded-xl p-6 text-center border border-secondary/10"
            data-ocid="agents.empty_state"
          >
            <Brain className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-xs font-mono text-muted-foreground/60">
              No chains yet. Create one above.
            </p>
          </div>
        )}
        {chains.map((chain, idx) => {
          const isSelected = chain.id === selectedId;
          return (
            <motion.button
              key={chain.id.toString()}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelect(chain)}
              className={`w-full text-left glass-panel rounded-xl p-3 border transition-smooth cursor-pointer
                ${isSelected ? "border-secondary/70 shadow-[0_0_12px_oklch(0.58_0.17_282/0.3)]" : "border-secondary/20 hover:border-secondary/50"}
              `}
              data-ocid={`agents.chain_item.${idx + 1}`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`mt-0.5 w-2 h-2 rounded-full shrink-0
                  ${chain.status === "running" ? "bg-primary animate-pulse" : ""}
                  ${chain.status === "complete" ? "bg-emerald-400" : ""}
                  ${chain.status === "failed" ? "bg-red-400" : ""}
                  ${chain.status === "idle" ? "bg-muted-foreground/40" : ""}
                `}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-foreground line-clamp-2 leading-relaxed">
                    {chain.goal}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <StatusBadge status={chain.status} />
                    <StepCounter
                      current={chain.currentStep}
                      total={chain.tasks.length}
                    />
                  </div>
                </div>
              </div>
              {chain.status === "idle" && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    void handleRun(chain);
                  }}
                  disabled={runChain.isPending}
                  className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-primary/30 hover:border-primary text-primary text-[10px] font-mono hover:glow-cyan transition-smooth disabled:opacity-40"
                  data-ocid={`agents.run_button.${idx + 1}`}
                >
                  <Play className="w-3 h-3" /> Run Chain
                </button>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Center Panel (Chain Detail + Live Stream) ────────────────────────────────

function ChainDetailPanel({ chain }: { chain: AgentChain | null }) {
  const { data: activeStream, isStreaming } = useActiveStream();
  const [viewMode, setViewMode] = useState<"timeline" | "live">("timeline");

  // Normalise live steps: fill gaps with pending
  const liveSteps: AgentStreamStep[] = LIVE_AGENT_ORDER.map((type) => {
    const found = activeStream?.agentSteps?.find((s) => s.agentType === type);
    return (
      found ?? {
        agentType: type,
        status: "pending",
        output: "",
        startedAt: BigInt(0),
        completedAt: BigInt(0),
      }
    );
  });

  const assembledText = activeStream?.chunks
    ? assembleStreamText(activeStream.chunks)
    : "";

  if (!chain && !isStreaming) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full text-center gap-4"
        data-ocid="agents.detail_empty"
      >
        <div className="w-16 h-16 rounded-2xl border border-secondary/20 flex items-center justify-center glass-panel">
          <Zap className="w-8 h-8 text-secondary/30" />
        </div>
        <div>
          <p className="text-sm font-mono text-muted-foreground/60">
            No chain selected
          </p>
          <p className="text-xs font-mono text-muted-foreground/40 mt-1">
            Click a chain to view the execution timeline
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-3" data-ocid="agents.detail_panel">
      {/* Tab row */}
      <div className="flex items-center gap-2" data-ocid="agents.view_tabs">
        <button
          type="button"
          onClick={() => setViewMode("timeline")}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider border transition-all duration-200 ${
            viewMode === "timeline"
              ? "border-secondary/70 text-secondary bg-secondary/10"
              : "border-border/30 text-muted-foreground/50 hover:border-secondary/40"
          }`}
          data-ocid="agents.timeline_tab"
        >
          Timeline
        </button>
        <button
          type="button"
          onClick={() => setViewMode("live")}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider border transition-all duration-200 flex items-center gap-1.5 ${
            viewMode === "live"
              ? "border-primary/70 text-primary bg-primary/10"
              : "border-border/30 text-muted-foreground/50 hover:border-primary/40"
          }`}
          data-ocid="agents.live_tab"
        >
          Live Feed
          {isStreaming && (
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </button>
      </div>

      {/* ── Timeline view ── */}
      {viewMode === "timeline" && chain && (
        <>
          <div className="glass-panel rounded-xl p-4 border border-secondary/40 corner-brackets flex-shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="hud-label text-secondary mb-1">Goal</p>
                <p className="text-sm font-mono text-foreground leading-relaxed">
                  {chain.goal}
                </p>
              </div>
              <StatusBadge status={chain.status} />
            </div>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-secondary/20">
              <span className="text-[10px] font-mono text-muted-foreground">
                Step{" "}
                <span className="text-secondary">
                  {Number(chain.currentStep)}
                </span>{" "}
                / <span className="text-foreground">{chain.tasks.length}</span>
              </span>
              {chain.status === "running" && (
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-primary">
                  <Loader2 className="w-3 h-3 animate-spin" /> Executing...
                </span>
              )}
              <span className="ml-auto text-[10px] font-mono text-muted-foreground/50">
                ID #{chain.id.toString()}
              </span>
            </div>
          </div>

          <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden flex-shrink-0">
            <motion.div
              className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${chain.tasks.length > 0 ? (Number(chain.currentStep) / chain.tasks.length) * 100 : 0}%`,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1">
            <p className="hud-label text-muted-foreground/60 mb-3">
              Execution Timeline
            </p>
            {chain.tasks.length === 0 && (
              <p className="text-xs font-mono text-muted-foreground/40 text-center py-4">
                No tasks generated yet
              </p>
            )}
            {chain.tasks.map((task, idx) => (
              <TaskRow key={task.id.toString()} task={task} index={idx} />
            ))}
          </div>

          {chain.status === "complete" &&
            chain.tasks[chain.tasks.length - 1]?.output && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-xl p-4 border border-emerald-400/30 bg-emerald-400/5 flex-shrink-0"
                data-ocid="agents.final_output"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="hud-label text-emerald-400">
                    Priya's Response
                  </span>
                </div>
                <p className="text-sm font-mono text-foreground/90 leading-relaxed">
                  {chain.tasks[chain.tasks.length - 1].output}
                </p>
              </motion.div>
            )}
        </>
      )}

      {/* ── Live feed view ── */}
      {viewMode === "live" && (
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-0">
          {/* Status header */}
          <div className="glass-panel rounded-xl p-3 border border-primary/30 flex-shrink-0 flex items-center gap-2.5">
            {isStreaming ? (
              <>
                <motion.span
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
                <span className="text-[11px] font-mono text-primary tracking-widest">
                  LIVE EXECUTION
                </span>
                <span className="ml-auto text-[10px] font-mono text-muted-foreground/40">
                  Session #{activeStream?.id?.toString()}
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                <span className="text-[11px] font-mono text-muted-foreground/50 tracking-widest">
                  AWAITING EXECUTION
                </span>
              </>
            )}
          </div>

          {/* Agent step timeline */}
          <div className="flex-1 overflow-y-auto">
            <p className="hud-label text-muted-foreground/60 mb-3">
              Agent Pipeline
            </p>
            {liveSteps.map((step, i) => (
              <LiveStepRow
                key={step.agentType}
                step={step}
                index={i}
                isLast={i === liveSteps.length - 1}
              />
            ))}
          </div>

          {/* Assembled output stream */}
          {assembledText && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-xl p-3 border border-primary/20 flex-shrink-0"
              data-ocid="agents.stream_output"
            >
              <p className="hud-label text-primary/70 mb-2">Output Stream</p>
              <p className="text-xs font-mono text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {assembledText}
                {isStreaming && (
                  <motion.span
                    className="inline-block w-0.5 h-3.5 bg-primary ml-0.5 align-text-bottom"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                )}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Empty timeline when no chain selected */}
      {viewMode === "timeline" && !chain && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs font-mono text-muted-foreground/40">
            Select a chain to see its timeline
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Right Panel ──────────────────────────────────────────────────────────────

function AgentMetricsPanel({
  metrics,
}: { metrics: ReturnType<typeof useAgentMetrics>["data"] }) {
  const total = metrics ? Number(metrics.totalTasks) : 0;
  const completed = metrics ? Number(metrics.completedTasks) : 0;
  const failed = metrics ? Number(metrics.failedTasks) : 0;
  const avgDuration = metrics
    ? (Number(metrics.avgDuration) / 1000).toFixed(1)
    : "0.0";
  const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const agentTaskCounts = AGENT_TYPES.map((type, i) => ({
    type,
    icon: AGENT_ICONS[type],
    label: AGENT_LABELS[type],
    count: total > 0 ? Math.round(total / 5) + (i === 0 ? total % 5 : 0) : 0,
    pct: total > 0 ? 100 / 5 : 0,
  }));

  return (
    <div
      className="flex flex-col h-full gap-4"
      data-ocid="agents.metrics_panel"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="hud-label text-primary/80">Agent Metrics</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          {
            label: "Total Tasks",
            value: total.toString(),
            icon: Brain,
            color: "text-primary",
          },
          {
            label: "Completed",
            value: completed.toString(),
            icon: CheckCircle2,
            color: "text-emerald-400",
          },
          {
            label: "Failed",
            value: failed.toString(),
            icon: AlertCircle,
            color: "text-red-400",
          },
          {
            label: "Avg Duration",
            value: `${avgDuration}s`,
            icon: Clock,
            color: "text-secondary",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-panel rounded-xl p-3 border border-primary/15 flex flex-col gap-1"
            data-ocid={`agents.metric_${stat.label.toLowerCase().replace(" ", "_")}`}
          >
            <div className="flex items-center justify-between">
              <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
              <span className={`text-lg font-display font-bold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-xl p-3 border border-primary/15">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-muted-foreground/70">
            Success Rate
          </span>
          <span className="text-sm font-display font-bold text-emerald-400">
            {successRate}%
          </span>
        </div>
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400/70 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${successRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[9px] font-mono text-muted-foreground/40">
            0%
          </span>
          <span className="text-[9px] font-mono text-muted-foreground/40">
            100%
          </span>
        </div>
      </div>

      <div className="glass-panel rounded-xl p-3 border border-primary/15">
        <p className="hud-label text-muted-foreground/60 mb-3">
          Agent Breakdown
        </p>
        <div className="space-y-2">
          {agentTaskCounts.map((agent) => (
            <div key={agent.type} className="flex items-center gap-2">
              <span className="text-sm w-5 text-center">{agent.icon}</span>
              <span className="text-[10px] font-mono text-muted-foreground/80 w-16 shrink-0">
                {agent.label}
              </span>
              <div className="flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-secondary/60 to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${agent.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground/60 w-5 text-right">
                {agent.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-xl p-3 border border-primary/15 overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-3.5 h-3.5 text-primary/70" />
          <span className="hud-label text-muted-foreground/60">
            Recent Activity
          </span>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-48">
          {DEMO_RECENT.map((item, idx) => (
            <motion.div
              key={item.goal}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.07 }}
              className="flex items-start gap-2 py-1.5 border-b border-border/20 last:border-0"
              data-ocid={`agents.recent_item.${idx + 1}`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-foreground/80 line-clamp-1">
                  {item.goal}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] font-mono text-muted-foreground/50">
                    {item.duration}
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground/40">
                    {item.time}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AgentsPage() {
  const [selectedChain, setSelectedChain] = useState<AgentChain | null>(null);
  const { data: chains = [], isLoading } = useListChains();
  const { data: metrics } = useAgentMetrics();
  const { isStreaming } = useActiveStream();

  return (
    <div
      className="flex flex-col h-full min-h-0 scanline-overlay"
      data-ocid="agents.page"
    >
      {/* Page header */}
      <div className="shrink-0 px-5 py-4 border-b border-secondary/20 flex items-center gap-3 bg-card/60 backdrop-blur-sm">
        <div className="w-9 h-9 rounded-xl border border-secondary/50 flex items-center justify-center glow-purple">
          <Brain className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h1
            className="font-display font-bold text-base text-foreground tracking-widest uppercase"
            style={{ textShadow: "0 0 16px oklch(0.58 0.17 282 / 0.6)" }}
          >
            AI Agent Control Center
          </h1>
          <p className="text-[10px] font-mono text-muted-foreground/60">
            AutoGPT-style autonomous task chains · 5-agent orchestration
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-secondary/30 bg-secondary/10">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-mono text-secondary">ONLINE</span>
          </div>
          {isStreaming && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/10"
              data-ocid="agents.live_badge"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="text-[10px] font-mono text-primary">LIVE</span>
            </motion.div>
          )}
          <span className="text-[10px] font-mono text-muted-foreground/40">
            {chains.filter((c) => c.status === "running").length} running
          </span>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="flex-1 min-h-0 grid grid-cols-[30%_40%_30%] gap-0 divide-x divide-secondary/10">
        <div className="min-h-0 overflow-hidden p-4">
          <ActiveChainsPanel
            chains={chains}
            isLoading={isLoading}
            selectedId={selectedChain?.id ?? null}
            onSelect={setSelectedChain}
          />
        </div>
        <div className="min-h-0 overflow-hidden p-4 bg-card/20">
          <ChainDetailPanel chain={selectedChain} />
        </div>
        <div className="min-h-0 overflow-hidden p-4">
          <AgentMetricsPanel metrics={metrics} />
        </div>
      </div>
    </div>
  );
}
