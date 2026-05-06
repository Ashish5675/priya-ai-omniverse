import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  Loader2,
  RefreshCw,
  Search,
  Server,
  Shield,
  Trash2,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AdminAction, IndexStatus, SubscriptionTier } from "../backend";
import { mockBackend } from "../mocks/backend";
import { useAriaStore } from "../store/useAriaStore";

// ─── Demo-extended data ──────────────────────────────────────────────────────

const DEMO_USERS = [
  {
    id: "admin-001",
    name: "Admin",
    email: "admin@aria.ai",
    role: "admin",
    tier: "enterprise",
    joined: Date.now() - 86400000 * 90,
    messages: 1240,
    lastActive: Date.now() - 3600000,
    banned: false,
  },
  {
    id: "demo-002",
    name: "Demo User",
    email: "demo@priya.ai",
    role: "user",
    tier: "pro",
    joined: Date.now() - 86400000 * 30,
    messages: 247,
    lastActive: Date.now() - 900000,
    banned: false,
  },
  {
    id: "user-003",
    name: "Priya Test",
    email: "priya.test@aria.ai",
    role: "user",
    tier: "pro",
    joined: Date.now() - 86400000 * 14,
    messages: 83,
    lastActive: Date.now() - 7200000,
    banned: false,
  },
  {
    id: "user-004",
    name: "Rajesh Kumar",
    email: "rajesh.k@aria.ai",
    role: "user",
    tier: "free",
    joined: Date.now() - 86400000 * 3,
    messages: 12,
    lastActive: Date.now() - 86400000,
    banned: false,
  },
  {
    id: "user-005",
    name: "Ananya Singh",
    email: "ananya.s@aria.ai",
    role: "user",
    tier: "enterprise",
    joined: Date.now() - 86400000 * 60,
    messages: 589,
    lastActive: Date.now() - 1800000,
    banned: false,
  },
  {
    id: "user-006",
    name: "Vikram Mehta",
    email: "v.mehta@aria.ai",
    role: "user",
    tier: "free",
    joined: Date.now() - 86400000 * 5,
    messages: 28,
    lastActive: Date.now() - 43200000,
    banned: false,
  },
  {
    id: "user-007",
    name: "Sneha Patil",
    email: "sneha.p@aria.ai",
    role: "user",
    tier: "pro",
    joined: Date.now() - 86400000 * 21,
    messages: 164,
    lastActive: Date.now() - 5400000,
    banned: true,
  },
  {
    id: "user-008",
    name: "Arjun Nair",
    email: "arjun.n@aria.ai",
    role: "user",
    tier: "free",
    joined: Date.now() - 86400000 * 1,
    messages: 4,
    lastActive: Date.now() - 600000,
    banned: false,
  },
];

const DEMO_LOGS = [
  {
    id: 1,
    admin: "Admin",
    action: AdminAction.uploadDoc,
    target: "PRIYA Architecture PDF",
    timestamp: Date.now() - 86400000,
  },
  {
    id: 2,
    admin: "Admin",
    action: AdminAction.reindex,
    target: "All Knowledge Documents",
    timestamp: Date.now() - 43200000,
  },
  {
    id: 3,
    admin: "Admin",
    action: AdminAction.updateTier,
    target: "demo-002 → PRO",
    timestamp: Date.now() - 3600000,
  },
  {
    id: 4,
    admin: "Admin",
    action: AdminAction.banUser,
    target: "spam-principal-999",
    timestamp: Date.now() - 1800000,
  },
  {
    id: 5,
    admin: "Admin",
    action: AdminAction.deleteDoc,
    target: "Outdated Policy Document v1",
    timestamp: Date.now() - 900000,
  },
  {
    id: 6,
    admin: "Admin",
    action: AdminAction.uploadDoc,
    target: "Voice Synthesis Technical Guide",
    timestamp: Date.now() - 300000,
  },
];

const SYSTEM_EVENTS = [
  {
    id: 1,
    type: "startup",
    msg: "ARIA OS backend started — all modules online",
    ts: Date.now() - 86400000 * 14,
  },
  {
    id: 2,
    type: "reindex",
    msg: "Knowledge base reindex completed — 4 docs, 7 chunks",
    ts: Date.now() - 43200000,
  },
  {
    id: 3,
    type: "user_join",
    msg: "New user registered: Arjun Nair (free tier)",
    ts: Date.now() - 86400000,
  },
  {
    id: 4,
    type: "reindex",
    msg: "Admin triggered manual reindex",
    ts: Date.now() - 900000,
  },
  {
    id: 5,
    type: "user_join",
    msg: "New user registered: Vikram Mehta (free tier)",
    ts: Date.now() - 86400000 * 5,
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type TabId = "users" | "knowledge" | "health" | "logs";

interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  tier: string;
  joined: number;
  messages: number;
  lastActive: number;
  banned: boolean;
}

// ─── Tier Badge ──────────────────────────────────────────────────────────────

const TIER_STYLE: Record<string, string> = {
  free: "text-muted-foreground  border-border/40",
  pro: "text-primary           border-primary/40",
  enterprise: "text-amber-400         border-amber-400/40",
};

const ACTION_STYLE: Record<string, string> = {
  [AdminAction.uploadDoc]:
    "bg-emerald-500/10  text-emerald-400  border-emerald-500/30",
  [AdminAction.deleteDoc]:
    "bg-rose-500/10     text-rose-400     border-rose-500/30",
  [AdminAction.banUser]:
    "bg-rose-500/10     text-rose-400     border-rose-500/30",
  [AdminAction.updateTier]:
    "bg-amber-500/10    text-amber-400    border-amber-500/30",
  [AdminAction.reindex]:
    "bg-primary/10      text-primary      border-primary/30",
};

function TierBadge({ tier }: { tier: string }) {
  return (
    <span
      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${TIER_STYLE[tier] ?? "text-muted-foreground border-border/30"}`}
    >
      {tier.toUpperCase()}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  const style =
    role === "admin"
      ? "text-amber-400 border-amber-400/40"
      : "text-muted-foreground border-border/30";
  return (
    <span
      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${style}`}
    >
      {role.toUpperCase()}
    </span>
  );
}

function StatusDot({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${ok ? "bg-emerald-400 shadow-[0_0_6px_theme(colors.emerald.400)]" : "bg-rose-500"}`}
    />
  );
}

function fmtDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function fmtRelative(ms: number) {
  const diff = Date.now() - ms;
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AdminPage() {
  const qc = useQueryClient();
  const { currentUser } = useAriaStore();
  const [activeTab, setActiveTab] = useState<TabId>("users");

  // Users tab state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [bannedMap, setBannedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(DEMO_USERS.map((u) => [u.id, u.banned])),
  );
  const [tierMap, setTierMap] = useState<Record<string, string>>(() =>
    Object.fromEntries(DEMO_USERS.map((u) => [u.id, u.tier])),
  );
  const [confirmBan, setConfirmBan] = useState<string | null>(null);

  // Health tab state
  const [autoRefresh, setAutoRefresh] = useState(false);
  const autoRefreshRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const PAGE_SIZE = 10;

  // ─── Queries ──────────────────────────────────────────────────────────────
  const healthQ = useQuery({
    queryKey: ["system-health"],
    queryFn: () => mockBackend.getSystemHealth(),
    refetchInterval: autoRefresh ? 30000 : false,
  });

  const metricsQ = useQuery({
    queryKey: ["system-metrics"],
    queryFn: () => mockBackend.getSystemMetrics(),
    refetchInterval: autoRefresh ? 30000 : false,
  });

  const docsQ = useQuery({
    queryKey: ["admin-docs"],
    queryFn: () => mockBackend.listDocuments(),
  });

  // ─── Mutations ────────────────────────────────────────────────────────────
  const reindexMut = useMutation({
    mutationFn: () => mockBackend.triggerReindex(),
    onSuccess: () => {
      toast.success("Reindex complete — knowledge base refreshed");
      void qc.invalidateQueries({ queryKey: ["admin-docs"] });
    },
  });

  const deleteDocMut = useMutation({
    mutationFn: (docId: bigint) => mockBackend.deleteDocument(docId),
    onSuccess: () => {
      toast.success("Document deleted");
      void qc.invalidateQueries({ queryKey: ["admin-docs"] });
    },
  });

  // ─── Auto-refresh side-effect ─────────────────────────────────────────────
  useEffect(() => {
    if (autoRefresh) {
      autoRefreshRef.current = setInterval(() => {
        void qc.invalidateQueries({ queryKey: ["system-health"] });
        void qc.invalidateQueries({ queryKey: ["system-metrics"] });
      }, 30000);
    } else {
      if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
    }
    return () => {
      if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
    };
  }, [autoRefresh, qc]);

  // ─── Filtered users ────────────────────────────────────────────────────────
  const filteredUsers = DEMO_USERS.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers: DemoUser[] = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  function handleBanToggle(userId: string) {
    const nowBanned = bannedMap[userId];
    if (!nowBanned) {
      setConfirmBan(userId);
    } else {
      setBannedMap((prev) => ({ ...prev, [userId]: false }));
      toast.success("User unbanned");
    }
  }

  function confirmBanAction() {
    if (!confirmBan) return;
    setBannedMap((prev) => ({ ...prev, [confirmBan]: true }));
    toast.success("User banned");
    setConfirmBan(null);
  }

  function handleTierChange(userId: string, newTier: string) {
    setTierMap((prev) => ({ ...prev, [userId]: newTier }));
    toast.success(`Tier updated to ${newTier.toUpperCase()}`);
  }

  // ─── Knowledge stats ───────────────────────────────────────────────────────
  const docs = docsQ.data ?? [];
  const totalChunks = docs.reduce((a, d) => a + d.chunks.length, 0);
  const _indexedCount = docs.filter(
    (d) => d.indexStatus === IndexStatus.indexed,
  ).length;
  const storageKb = (docs.length * 24.7).toFixed(1);
  const lastIndexed =
    docs.length > 0 ? Math.max(...docs.map((d) => Number(d.uploadedAt))) : null;

  const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "users", label: "Users", icon: <Users className="w-3.5 h-3.5" /> },
    {
      id: "knowledge",
      label: "Knowledge",
      icon: <Database className="w-3.5 h-3.5" />,
    },
    {
      id: "health",
      label: "System Health",
      icon: <Activity className="w-3.5 h-3.5" />,
    },
    { id: "logs", label: "Logs", icon: <FileText className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex-1 overflow-auto" data-ocid="admin.page">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl border border-rose-500/50 flex items-center justify-center shrink-0"
              style={{ boxShadow: "0 0 16px oklch(0.62 0.21 5 / 0.4)" }}
            >
              <Shield className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h1
                className="font-display font-bold text-xl tracking-widest uppercase"
                style={{
                  color: "#e11d48",
                  textShadow: "0 0 20px oklch(0.62 0.21 5 / 0.6)",
                }}
              >
                System Administration
              </h1>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                Full platform control &amp; monitoring
              </p>
            </div>
          </div>
          {/* Admin badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/5">
            <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[10px] font-mono text-rose-400 font-bold">
              {(currentUser?.name ?? "A").charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-mono text-rose-300">
              {currentUser?.name ?? "Admin"}
            </span>
            <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase">
              ADMIN
            </span>
          </div>
        </div>

        {/* ── Quick Stats ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Total Users",
              value: healthQ.data ? healthQ.data.usersCount.toString() : "—",
              color: "text-rose-400",
              glow: "0 0 12px oklch(0.62 0.21 5 / 0.3)",
            },
            {
              label: "Messages",
              value: healthQ.data ? healthQ.data.messagesCount.toString() : "—",
              color: "text-primary",
              glow: "0 0 12px oklch(0.7 0.18 200 / 0.3)",
            },
            {
              label: "Agent Tasks",
              value: healthQ.data
                ? healthQ.data.agentTasksCount.toString()
                : "—",
              color: "text-amber-400",
              glow: "0 0 12px oklch(0.8 0.18 85 / 0.3)",
            },
            {
              label: "Uptime (days)",
              value: healthQ.data
                ? String(Math.floor(Number(healthQ.data.uptime) / 86400000))
                : "—",
              color: "text-emerald-400",
              glow: "0 0 12px oklch(0.75 0.15 150 / 0.3)",
            },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-panel border border-border/20 rounded-xl p-4"
              style={{ boxShadow: m.glow }}
            >
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                {m.label}
              </p>
              <p className={`text-2xl font-display font-bold mt-1 ${m.color}`}>
                {m.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Tab Bar ────────────────────────────────────────────────────── */}
        <div
          className="flex gap-1 border-b border-border/20 overflow-x-auto"
          role="tablist"
          data-ocid="admin.tab_bar"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono uppercase tracking-widest transition-colors border-b-2 -mb-px whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-rose-500 text-rose-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`admin.${tab.id}_tab`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── USERS TAB ──────────────────────────────────────────────────── */}
        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
            data-ocid="admin.users_panel"
          >
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-card border border-border/30 rounded-lg pl-8 pr-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-rose-500/50 transition-colors"
                data-ocid="admin.user_search_input"
              />
            </div>

            {/* Table wrapper */}
            <div className="rounded-xl border border-border/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-border/20 bg-card/60">
                      {[
                        "Name",
                        "Email",
                        "Role",
                        "Tier",
                        "Joined",
                        "Messages",
                        "Last Active",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-muted-foreground uppercase tracking-wider text-[10px] font-semibold whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pagedUsers.map((user, idx) => {
                      const isBanned = bannedMap[user.id] ?? false;
                      const currentTier = tierMap[user.id] ?? user.tier;
                      const globalIdx = (page - 1) * PAGE_SIZE + idx + 1;
                      return (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className={`border-b border-border/10 last:border-0 transition-colors ${
                            isBanned ? "bg-rose-500/5" : "hover:bg-card/40"
                          }`}
                          data-ocid={`admin.user.${globalIdx}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-foreground truncate max-w-[100px]">
                                {user.name}
                              </span>
                              {isBanned && (
                                <span className="text-[9px] px-1 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase">
                                  Banned
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground truncate max-w-[140px]">
                            {user.email}
                          </td>
                          <td className="px-4 py-3">
                            <RoleBadge role={user.role} />
                          </td>
                          <td className="px-4 py-3">
                            {user.role !== "admin" ? (
                              <select
                                value={currentTier}
                                onChange={(e) =>
                                  handleTierChange(user.id, e.target.value)
                                }
                                className="bg-card/60 border border-border/30 rounded px-1.5 py-0.5 text-[10px] font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                                data-ocid={`admin.tier_select.${globalIdx}`}
                              >
                                <option value="free">FREE</option>
                                <option value="pro">PRO</option>
                                <option value="enterprise">ENTERPRISE</option>
                              </select>
                            ) : (
                              <TierBadge tier={currentTier} />
                            )}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                            {fmtDate(user.joined)}
                          </td>
                          <td className="px-4 py-3 text-right text-foreground tabular-nums">
                            {user.messages.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                            {fmtRelative(user.lastActive)}
                          </td>
                          <td className="px-4 py-3">
                            {user.role !== "admin" && (
                              <button
                                type="button"
                                onClick={() => handleBanToggle(user.id)}
                                className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors ${
                                  isBanned
                                    ? "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                                    : "border-rose-500/40 text-rose-400 hover:bg-rose-500/10"
                                }`}
                                data-ocid={`admin.ban_button.${globalIdx}`}
                              >
                                {isBanned ? "UNBAN" : "BAN"}
                              </button>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-mono text-muted-foreground">
                  Showing {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, filteredUsers.length)} of{" "}
                  {filteredUsers.length} users
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 rounded border border-border/30 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                    data-ocid="admin.pagination_prev"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono text-muted-foreground">
                    {page} / {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-1.5 rounded border border-border/30 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                    data-ocid="admin.pagination_next"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ── KNOWLEDGE TAB ──────────────────────────────────────────────── */}
        {activeTab === "knowledge" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
            data-ocid="admin.knowledge_panel"
          >
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Total Docs",
                  value: String(docs.length),
                  icon: <FileText className="w-4 h-4" />,
                  color: "text-primary",
                },
                {
                  label: "Total Chunks",
                  value: String(totalChunks),
                  icon: <Database className="w-4 h-4" />,
                  color: "text-secondary",
                },
                {
                  label: "Storage Used",
                  value: `${storageKb} KB`,
                  icon: <Server className="w-4 h-4" />,
                  color: "text-amber-400",
                },
                {
                  label: "Last Indexed",
                  value: lastIndexed ? fmtRelative(lastIndexed) : "Never",
                  icon: <RefreshCw className="w-4 h-4" />,
                  color: "text-emerald-400",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass-panel border border-border/20 rounded-xl p-4 flex items-center gap-3"
                >
                  <span className={s.color}>{s.icon}</span>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                      {s.label}
                    </p>
                    <p
                      className={`text-lg font-display font-bold mt-0.5 ${s.color}`}
                    >
                      {s.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Re-index button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => void reindexMut.mutateAsync()}
                disabled={reindexMut.isPending}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 text-primary text-xs font-mono hover:bg-primary/10 disabled:opacity-50 transition-colors"
                data-ocid="admin.reindex_button"
              >
                {reindexMut.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                Re-index All
              </button>
            </div>

            {/* Documents table */}
            <div className="rounded-xl border border-border/20 overflow-hidden">
              <div className="overflow-x-auto">
                {docsQ.isLoading ? (
                  <div
                    className="flex items-center justify-center py-10"
                    data-ocid="admin.knowledge_loading_state"
                  >
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-border/20 bg-card/60">
                        {[
                          "Title",
                          "Type",
                          "Uploaded By",
                          "Chunks",
                          "Upload Date",
                          "Status",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left px-4 py-3 text-muted-foreground uppercase tracking-wider text-[10px] font-semibold whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {docs.map((doc, idx) => {
                        const isIndexed =
                          doc.indexStatus === IndexStatus.indexed;
                        return (
                          <motion.tr
                            key={doc.id.toString()}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="border-b border-border/10 last:border-0 hover:bg-card/40 transition-colors"
                            data-ocid={`admin.doc.${idx + 1}`}
                          >
                            <td className="px-4 py-3 text-foreground max-w-[160px] truncate">
                              {doc.title}
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-1.5 py-0.5 rounded border border-secondary/30 text-secondary text-[10px] uppercase">
                                {doc.docType.toString()}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {doc.userId?.toText?.().slice(0, 12) ?? "unknown"}
                              …
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums text-foreground">
                              {doc.chunks.length}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                              {fmtDate(Number(doc.uploadedAt))}
                            </td>
                            <td className="px-4 py-3">
                              {isIndexed ? (
                                <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                                  <CheckCircle2 className="w-3 h-3" /> Indexed
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-amber-400 text-[10px]">
                                  <Loader2 className="w-3 h-3 animate-spin" />{" "}
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                type="button"
                                onClick={() =>
                                  void deleteDocMut.mutateAsync(doc.id)
                                }
                                disabled={deleteDocMut.isPending}
                                className="p-1.5 rounded border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 disabled:opacity-50 transition-colors"
                                aria-label="Delete document"
                                data-ocid={`admin.doc_delete_button.${idx + 1}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── SYSTEM HEALTH TAB ──────────────────────────────────────────── */}
        {activeTab === "health" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
            data-ocid="admin.health_panel"
          >
            {/* Auto-refresh toggle */}
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-sm text-foreground uppercase tracking-wider">
                Real-time Status
              </h2>
              <div
                className="flex items-center gap-2 cursor-pointer"
                data-ocid="admin.auto_refresh_toggle"
              >
                <span className="text-xs font-mono text-muted-foreground">
                  Auto-refresh (30s)
                </span>
                <button
                  type="button"
                  aria-pressed={autoRefresh}
                  aria-label="Toggle auto-refresh"
                  onClick={() => setAutoRefresh((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setAutoRefresh((v) => !v);
                  }}
                  className={`relative w-10 h-5 rounded-full border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 ${
                    autoRefresh
                      ? "bg-rose-500/30 border-rose-500/60"
                      : "bg-card border-border/40"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                      autoRefresh
                        ? "left-5 bg-rose-400"
                        : "left-0.5 bg-muted-foreground"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* System status cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  label: "Backend Server",
                  status: true,
                  detail: "FastAPI v0.104 · Port 8000",
                },
                {
                  label: "Knowledge DB",
                  status: true,
                  detail: "Vector DB · 4 docs indexed",
                },
                {
                  label: "Agent Engine",
                  status: true,
                  detail: "5 agents active",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass-panel border border-border/20 rounded-xl p-4 flex items-start gap-3"
                >
                  <StatusDot ok={s.status} />
                  <div>
                    <p className="font-mono text-xs text-foreground font-semibold">
                      {s.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {s.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* API Key Status */}
            <div className="glass-panel border border-border/20 rounded-xl p-5 space-y-3">
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> API Key Status
              </h3>
              {[
                { name: "OpenAI GPT-4", configured: true },
                { name: "ElevenLabs TTS", configured: true },
                { name: "Google Maps", configured: false },
                { name: "Twilio Voice", configured: false },
              ].map((api) => (
                <div
                  key={api.name}
                  className="flex items-center justify-between py-1.5 border-b border-border/10 last:border-0"
                >
                  <span className="font-mono text-xs text-foreground">
                    {api.name}
                  </span>
                  <span
                    className={`flex items-center gap-1.5 text-[10px] font-mono ${api.configured ? "text-emerald-400" : "text-rose-400"}`}
                  >
                    {api.configured ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    {api.configured ? "Configured" : "Missing"}
                  </span>
                </div>
              ))}
            </div>

            {/* Detailed metrics */}
            {metricsQ.data && (
              <div className="glass-panel border border-border/20 rounded-xl p-5 space-y-3">
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-primary" /> Platform
                  Metrics
                </h3>
                {[
                  {
                    label: "Total Users",
                    value: metricsQ.data.totalUsers.toString(),
                  },
                  {
                    label: "Active Users",
                    value: metricsQ.data.activeUsers.toString(),
                  },
                  {
                    label: "Total Messages",
                    value: Number(metricsQ.data.totalMessages).toLocaleString(),
                  },
                  {
                    label: "Voice Sessions",
                    value: Number(
                      metricsQ.data.totalVoiceCalls,
                    ).toLocaleString(),
                  },
                  {
                    label: "Agent Tasks",
                    value: Number(
                      metricsQ.data.totalAgentTasks,
                    ).toLocaleString(),
                  },
                  {
                    label: "Monthly Revenue",
                    value: `$${metricsQ.data.mrr.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between py-1.5 border-b border-border/10 last:border-0"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {m.label}
                    </span>
                    <span className="font-mono text-xs font-bold text-foreground tabular-nums">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* System Events */}
            <div className="glass-panel border border-border/20 rounded-xl p-5 space-y-3">
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-secondary" /> Recent
                System Events
              </h3>
              <div className="space-y-2">
                {[...SYSTEM_EVENTS]
                  .sort((a, b) => b.ts - a.ts)
                  .map((ev) => {
                    const dot =
                      ev.type === "startup"
                        ? "bg-primary"
                        : ev.type === "reindex"
                          ? "bg-amber-400"
                          : "bg-emerald-400";
                    return (
                      <div
                        key={ev.id}
                        className="flex items-start gap-3 py-1.5 border-b border-border/10 last:border-0"
                      >
                        <span
                          className={`mt-1.5 inline-block w-2 h-2 rounded-full shrink-0 ${dot}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-xs text-foreground">
                            {ev.msg}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {fmtRelative(ev.ts)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── LOGS TAB ───────────────────────────────────────────────────── */}
        {activeTab === "logs" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
            data-ocid="admin.logs_panel"
          >
            <div className="rounded-xl border border-border/20 overflow-hidden">
              <div className="border-b border-border/20 bg-card/60 px-4 py-3 grid grid-cols-4 gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                <span>Admin</span>
                <span>Action</span>
                <span className="col-span-1">Target</span>
                <span>Timestamp</span>
              </div>
              <div className="overflow-y-auto max-h-[500px]">
                {[...DEMO_LOGS].reverse().map((log, idx) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="px-4 py-3 border-b border-border/10 last:border-0 grid grid-cols-4 gap-4 items-center hover:bg-card/40 transition-colors"
                    data-ocid={`admin.log.${idx + 1}`}
                  >
                    {/* Admin */}
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[9px] font-mono text-amber-400 font-bold shrink-0">
                        {log.admin.charAt(0)}
                      </div>
                      <span className="font-mono text-xs text-foreground truncate">
                        {log.admin}
                      </span>
                    </div>
                    {/* Action badge */}
                    <div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${ACTION_STYLE[log.action.toString()] ?? "text-muted-foreground border-border/30 bg-transparent"}`}
                      >
                        {log.action.toString().toUpperCase()}
                      </span>
                    </div>
                    {/* Target */}
                    <span className="font-mono text-[11px] text-muted-foreground truncate">
                      {log.target}
                    </span>
                    {/* Timestamp */}
                    <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                      {fmtRelative(log.timestamp)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Ban Confirmation Dialog ─────────────────────────────────────── */}
      {confirmBan !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          data-ocid="admin.ban_dialog"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel border border-rose-500/40 rounded-2xl p-6 max-w-sm w-full mx-4 space-y-4"
            style={{ boxShadow: "0 0 40px oklch(0.62 0.21 5 / 0.3)" }}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-rose-400">
                Confirm Ban
              </h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to ban{" "}
              <span className="text-foreground font-semibold">
                {DEMO_USERS.find((u) => u.id === confirmBan)?.name}
              </span>
              ? This will restrict their access to the platform.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={confirmBanAction}
                className="flex-1 py-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-mono uppercase tracking-wider hover:bg-rose-500/30 transition-colors"
                data-ocid="admin.ban_confirm_button"
              >
                Ban User
              </button>
              <button
                type="button"
                onClick={() => setConfirmBan(null)}
                className="flex-1 py-2 rounded-lg border border-border/30 text-muted-foreground text-xs font-mono uppercase tracking-wider hover:text-foreground hover:border-border/60 transition-colors"
                data-ocid="admin.ban_cancel_button"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
