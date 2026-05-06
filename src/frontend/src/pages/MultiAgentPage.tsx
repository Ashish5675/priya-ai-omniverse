import { CheckCircle2, Loader2, Pause, Play, Users2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AgentStatus = "idle" | "working" | "done";

interface AgentDef {
  id: string;
  name: string;
  role: string;
  roleDesc: string;
  color: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
  tasksCompleted: number;
  avgTime: string;
  qualityScore: number;
}

interface FeedMessage {
  id: number;
  agent: string;
  color: string;
  time: string;
  text: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const AGENTS: AgentDef[] = [
  {
    id: "architect",
    name: "Architect",
    role: "Systems Design",
    roleDesc:
      "Designs high-level structure and technical blueprints for the project",
    color: "cyan",
    glowColor: "oklch(0.7 0.18 200 / 0.4)",
    borderColor: "border-primary/60",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
    tasksCompleted: 34,
    avgTime: "2.1s",
    qualityScore: 94,
  },
  {
    id: "developer",
    name: "Developer",
    role: "Code Generation",
    roleDesc:
      "Writes production-ready code across frontend and backend modules",
    color: "green",
    glowColor: "oklch(0.65 0.18 155 / 0.4)",
    borderColor: "border-emerald-400/60",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    tasksCompleted: 58,
    avgTime: "3.7s",
    qualityScore: 91,
  },
  {
    id: "tester",
    name: "Tester",
    role: "Quality Assurance",
    roleDesc:
      "Runs test suites, validates logic, and reports errors for self-correction",
    color: "amber",
    glowColor: "oklch(0.75 0.15 85 / 0.4)",
    borderColor: "border-amber-400/60",
    textColor: "text-amber-400",
    bgColor: "bg-amber-400/10",
    tasksCompleted: 47,
    avgTime: "1.9s",
    qualityScore: 97,
  },
  {
    id: "reviewer",
    name: "Reviewer",
    role: "Final Validation",
    roleDesc:
      "Performs code review, checks standards, and approves or rejects outputs",
    color: "purple",
    glowColor: "oklch(0.58 0.17 282 / 0.4)",
    borderColor: "border-secondary/60",
    textColor: "text-secondary",
    bgColor: "bg-secondary/10",
    tasksCompleted: 29,
    avgTime: "1.4s",
    qualityScore: 99,
  },
];

const SEED_MESSAGES: FeedMessage[] = [
  {
    id: 1,
    agent: "Architect",
    color: "text-primary",
    time: "09:41:02",
    text: "Received task: design REST API schema for user module",
  },
  {
    id: 2,
    agent: "Developer",
    color: "text-emerald-400",
    time: "09:41:05",
    text: "Acknowledged schema — generating endpoint handlers",
  },
  {
    id: 3,
    agent: "Tester",
    color: "text-amber-400",
    time: "09:41:11",
    text: "Preparing test suite: 12 unit tests + 4 integration tests",
  },
  {
    id: 4,
    agent: "Reviewer",
    color: "text-secondary",
    time: "09:41:18",
    text: "Reviewing Developer output — 2 style issues flagged",
  },
  {
    id: 5,
    agent: "Developer",
    color: "text-emerald-400",
    time: "09:41:21",
    text: "Patch applied — style issues resolved. Re-submitting.",
  },
];

const LIVE_MESSAGES: FeedMessage[] = [
  {
    id: 10,
    agent: "Architect",
    color: "text-primary",
    time: "",
    text: "Delegating authentication module to Developer",
  },
  {
    id: 11,
    agent: "Developer",
    color: "text-emerald-400",
    time: "",
    text: "Generating JWT middleware and auth routes...",
  },
  {
    id: 12,
    agent: "Tester",
    color: "text-amber-400",
    time: "",
    text: "Running auth test suite — 18/20 passing",
  },
  {
    id: 13,
    agent: "Reviewer",
    color: "text-secondary",
    time: "",
    text: "Code review complete — approved with minor notes",
  },
  {
    id: 14,
    agent: "Architect",
    color: "text-primary",
    time: "",
    text: "Moving to next module: database layer",
  },
  {
    id: 15,
    agent: "Developer",
    color: "text-emerald-400",
    time: "",
    text: "Scaffolding ORM models and migration files",
  },
  {
    id: 16,
    agent: "Tester",
    color: "text-amber-400",
    time: "",
    text: "DB layer: all schema tests passed ✓",
  },
];

const TASKS_BY_AGENT: Record<string, string[]> = {
  architect: ["Design API schema", "Plan auth flow", "DB architecture"],
  developer: ["Generate handlers", "Write JWT logic", "Create models"],
  tester: ["Unit tests: auth", "Integration: DB", "Coverage: 94%"],
  reviewer: ["Review PR #12", "Approve auth", "Final validation"],
};

function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}

// ─── Agent Card ───────────────────────────────────────────────────────────────

function AgentCard({
  agent,
  status,
}: { agent: AgentDef; status: AgentStatus }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-panel rounded-xl p-4 border transition-all duration-500 ${
        status === "working"
          ? `${agent.borderColor} shadow-[0_0_20px_${agent.glowColor}]`
          : "border-border/20"
      }`}
      data-ocid={`multi-agent.agent_card.${agent.id}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <span className={`text-sm font-display font-bold ${agent.textColor}`}>
            {agent.name}
          </span>
          <p
            className={`text-[10px] font-mono ${agent.textColor} opacity-70 mt-0.5`}
          >
            {agent.role}
          </p>
        </div>
        <span
          className={`text-[9px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${
            status === "working"
              ? `${agent.borderColor} ${agent.textColor} ${agent.bgColor}`
              : status === "done"
                ? "border-emerald-400/40 text-emerald-400 bg-emerald-400/10"
                : "border-border/30 text-muted-foreground/50 bg-transparent"
          }`}
        >
          {status === "working"
            ? "● WORKING"
            : status === "done"
              ? "✓ DONE"
              : "○ IDLE"}
        </span>
      </div>
      <p className="text-[10px] font-mono text-muted-foreground/60 leading-relaxed mb-3">
        {agent.roleDesc}
      </p>
      <div className="space-y-1.5">
        {[
          { label: "Tasks", value: agent.tasksCompleted.toString() },
          { label: "Avg Time", value: agent.avgTime },
          { label: "Quality", value: `${agent.qualityScore}%` },
        ].map((m) => (
          <div key={m.label} className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-muted-foreground/50">
              {m.label}
            </span>
            <span
              className={`text-[10px] font-mono font-bold ${agent.textColor}`}
            >
              {m.value}
            </span>
          </div>
        ))}
      </div>
      {/* Quality bar */}
      <div className="mt-2 h-1 rounded-full bg-muted/20 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--tw-color, currentColor)" }}
          animate={{ width: `${agent.qualityScore}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          data-color={agent.color}
        />
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function MultiAgentPage() {
  const [isActive, setIsActive] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<
    Record<string, AgentStatus>
  >(Object.fromEntries(AGENTS.map((a) => [a.id, "idle"])));
  const [feed, setFeed] = useState<FeedMessage[]>(SEED_MESSAGES);
  const [msgIdx, setMsgIdx] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current)
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
  });

  // Cycle active agent every 2.5s when active
  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => {
      setActiveAgent((prev) => {
        const ids = AGENTS.map((a) => a.id);
        const next = ids[(ids.indexOf(prev ?? "") + 1) % ids.length];
        setAgentStatuses(
          Object.fromEntries(
            ids.map((id) => [id, id === next ? "working" : "done"]),
          ),
        );
        return next;
      });
    }, 2500);
    return () => clearInterval(t);
  }, [isActive]);

  // Append live messages
  useEffect(() => {
    if (!isActive) return;
    if (msgIdx >= LIVE_MESSAGES.length) return;
    const t = setInterval(() => {
      setFeed((prev) => [
        ...prev,
        { ...LIVE_MESSAGES[msgIdx], time: nowTime(), id: Date.now() },
      ]);
      setMsgIdx((i) => i + 1);
    }, 3000);
    return () => clearInterval(t);
  }, [isActive, msgIdx]);

  const handleToggle = () => {
    setIsActive((v) => {
      if (v) {
        // Stop
        setAgentStatuses(Object.fromEntries(AGENTS.map((a) => [a.id, "idle"])));
        setActiveAgent(null);
      } else {
        // Start
        setAgentStatuses((prev) => ({ ...prev, architect: "working" }));
        setActiveAgent("architect");
        setMsgIdx(0);
      }
      return !v;
    });
  };

  return (
    <div
      className="flex flex-col h-full min-h-0 scanline-overlay"
      data-ocid="multi-agent.page"
    >
      {/* Header */}
      <div className="shrink-0 px-5 py-4 border-b border-secondary/20 flex items-center gap-3 bg-card/60 backdrop-blur-sm">
        <div className="w-9 h-9 rounded-xl border border-secondary/50 flex items-center justify-center glow-purple">
          <Users2 className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h1
            className="font-display font-bold text-base text-foreground tracking-widest uppercase"
            style={{ textShadow: "0 0 16px oklch(0.58 0.17 282 / 0.6)" }}
          >
            Multi-Agent Collaboration
          </h1>
          <p className="text-[10px] font-mono text-muted-foreground/60">
            Architect · Developer · Tester · Reviewer — real-time task
            delegation
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-secondary/40 bg-secondary/10"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-secondary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.7, repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="text-[10px] font-mono text-secondary">
                ACTIVE
              </span>
            </motion.div>
          )}
          <button
            type="button"
            onClick={handleToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              isActive
                ? "border-red-400/40 text-red-400 hover:bg-red-400/10"
                : "border-secondary/40 text-secondary hover:bg-secondary/10"
            }`}
            data-ocid="multi-agent.toggle_button"
          >
            {isActive ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Stop Collaboration
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Start Collaboration
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 min-h-0 grid grid-cols-[1fr_300px] divide-x divide-secondary/10 overflow-hidden">
        {/* LEFT: Agent grid + swimlane */}
        <div className="flex flex-col gap-4 p-4 overflow-y-auto">
          {/* 2x2 Agent cards */}
          <div
            className="grid grid-cols-2 gap-3"
            data-ocid="multi-agent.agents_grid"
          >
            {AGENTS.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                status={agentStatuses[agent.id] ?? "idle"}
              />
            ))}
          </div>

          {/* Swimlane */}
          <div
            className="glass-panel rounded-xl border border-secondary/20 overflow-hidden"
            data-ocid="multi-agent.swimlane"
          >
            <div className="px-4 py-2.5 border-b border-secondary/15 flex items-center gap-2">
              <span className="hud-label text-secondary/70">
                Task Delegation Flow
              </span>
            </div>
            <div className="p-4">
              {/* Arrow flow */}
              <div className="flex items-start gap-0">
                {AGENTS.map((agent, i) => (
                  <div key={agent.id} className="flex items-center flex-1">
                    <div className="flex-1">
                      {/* Agent column */}
                      <div
                        className={`rounded-lg border px-2 py-2 text-center transition-all duration-500 ${
                          activeAgent === agent.id
                            ? `${agent.borderColor} ${agent.bgColor} shadow-[0_0_12px_${agent.glowColor}]`
                            : "border-border/20"
                        }`}
                        data-ocid={`multi-agent.lane_${agent.id}`}
                      >
                        <span
                          className={`text-[10px] font-mono font-bold block ${
                            activeAgent === agent.id
                              ? agent.textColor
                              : "text-muted-foreground/50"
                          }`}
                        >
                          {agent.name}
                        </span>
                        {/* Task chips */}
                        <div className="mt-2 space-y-1">
                          {TASKS_BY_AGENT[agent.id]?.slice(0, 2).map((task) => (
                            <div
                              key={task}
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                activeAgent === agent.id
                                  ? `${agent.borderColor} ${agent.textColor} ${agent.bgColor}`
                                  : "border-border/15 text-muted-foreground/40"
                              }`}
                            >
                              {task}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Arrow */}
                    {i < AGENTS.length - 1 && (
                      <div className="flex items-center px-1 shrink-0">
                        <motion.svg
                          width="20"
                          height="12"
                          viewBox="0 0 20 12"
                          animate={{ opacity: isActive ? [0.4, 1, 0.4] : 0.3 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.3,
                          }}
                        >
                          <title>Flow arrow</title>
                          <path
                            d="M0 6 L14 6 M10 2 L18 6 L10 10"
                            stroke="oklch(0.58 0.17 282 / 0.8)"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance metrics row */}
          <div
            className="glass-panel rounded-xl border border-primary/15 p-4"
            data-ocid="multi-agent.metrics_row"
          >
            <p className="hud-label text-muted-foreground/60 mb-3">
              Performance Metrics
            </p>
            <div className="grid grid-cols-4 gap-3">
              {AGENTS.map((agent) => (
                <div key={agent.id} className="space-y-1.5">
                  <span
                    className={`text-[10px] font-mono font-bold ${agent.textColor}`}
                  >
                    {agent.name}
                  </span>
                  {[
                    { label: "Tasks", value: agent.tasksCompleted, max: 60 },
                    { label: "Quality", value: agent.qualityScore, max: 100 },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[9px] font-mono text-muted-foreground/50">
                          {m.label}
                        </span>
                        <span
                          className={`text-[9px] font-mono ${agent.textColor}`}
                        >
                          {m.value}
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-muted/20 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "var(--agent-color)" }}
                          animate={{ width: `${(m.value / m.max) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Communication feed */}
        <div
          className="flex flex-col min-h-0"
          data-ocid="multi-agent.feed_panel"
        >
          <div className="shrink-0 px-4 py-2.5 border-b border-secondary/15 flex items-center gap-2">
            {isActive ? (
              <motion.span
                className="w-2 h-2 rounded-full bg-secondary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
              />
            ) : (
              <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            )}
            <span className="hud-label text-secondary/70">
              Inter-Agent Feed
            </span>
            <span className="ml-auto text-[9px] font-mono text-muted-foreground/40">
              {feed.length} msgs
            </span>
          </div>
          <div ref={feedRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            <AnimatePresence initial={false}>
              {feed.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel rounded-lg p-2.5 border border-border/15"
                  data-ocid={`multi-agent.feed_msg.${msg.id}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold ${msg.color}`}
                    >
                      {msg.agent}
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground/40">
                      {msg.time}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-muted-foreground/80 leading-relaxed">
                    {msg.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {isActive && (
            <div className="shrink-0 p-3 border-t border-secondary/10 flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 text-secondary animate-spin" />
              <span className="text-[10px] font-mono text-secondary/70">
                Agents collaborating...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
