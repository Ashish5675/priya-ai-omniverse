import { c as createLucideIcon, f as useQueryClient, u as useAriaStore, r as reactExports, e as useQuery, g as useMutation, I as IndexStatus, j as jsxRuntimeExports, S as Shield, m as motion, a as ChevronLeft, C as ChevronRight, Z as Zap, z as AdminAction, b as ue, t as mockBackend } from "./index-Khuvrpqq.js";
import { S as Search, D as Database } from "./search-CfsztCE7.js";
import { F as FileText } from "./file-text-lUOGEMv0.js";
import { R as RefreshCw } from "./refresh-cw-BAeMeO08.js";
import { L as LoaderCircle } from "./loader-circle-CP0fZB5d.js";
import { C as CircleCheck } from "./circle-check-DKp6tXQ-.js";
import { T as Trash2 } from "./trash-2-BpPdCVwr.js";
import { C as CircleX } from "./circle-x-CQmfZLMl.js";
import { C as CircleAlert } from "./circle-alert-CmI7lxZ-.js";
import { U as Users } from "./users-3y3KoF9a.js";
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
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", key: "ngkwjq" }],
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", key: "iecqi9" }],
  ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6", key: "16zg32" }],
  ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18", key: "nzw8ys" }]
];
const Server = createLucideIcon("server", __iconNode);
const DEMO_USERS = [
  {
    id: "admin-001",
    name: "Admin",
    email: "admin@aria.ai",
    role: "admin",
    tier: "enterprise",
    joined: Date.now() - 864e5 * 90,
    messages: 1240,
    lastActive: Date.now() - 36e5,
    banned: false
  },
  {
    id: "demo-002",
    name: "Demo User",
    email: "demo@priya.ai",
    role: "user",
    tier: "pro",
    joined: Date.now() - 864e5 * 30,
    messages: 247,
    lastActive: Date.now() - 9e5,
    banned: false
  },
  {
    id: "user-003",
    name: "Priya Test",
    email: "priya.test@aria.ai",
    role: "user",
    tier: "pro",
    joined: Date.now() - 864e5 * 14,
    messages: 83,
    lastActive: Date.now() - 72e5,
    banned: false
  },
  {
    id: "user-004",
    name: "Rajesh Kumar",
    email: "rajesh.k@aria.ai",
    role: "user",
    tier: "free",
    joined: Date.now() - 864e5 * 3,
    messages: 12,
    lastActive: Date.now() - 864e5,
    banned: false
  },
  {
    id: "user-005",
    name: "Ananya Singh",
    email: "ananya.s@aria.ai",
    role: "user",
    tier: "enterprise",
    joined: Date.now() - 864e5 * 60,
    messages: 589,
    lastActive: Date.now() - 18e5,
    banned: false
  },
  {
    id: "user-006",
    name: "Vikram Mehta",
    email: "v.mehta@aria.ai",
    role: "user",
    tier: "free",
    joined: Date.now() - 864e5 * 5,
    messages: 28,
    lastActive: Date.now() - 432e5,
    banned: false
  },
  {
    id: "user-007",
    name: "Sneha Patil",
    email: "sneha.p@aria.ai",
    role: "user",
    tier: "pro",
    joined: Date.now() - 864e5 * 21,
    messages: 164,
    lastActive: Date.now() - 54e5,
    banned: true
  },
  {
    id: "user-008",
    name: "Arjun Nair",
    email: "arjun.n@aria.ai",
    role: "user",
    tier: "free",
    joined: Date.now() - 864e5 * 1,
    messages: 4,
    lastActive: Date.now() - 6e5,
    banned: false
  }
];
const DEMO_LOGS = [
  {
    id: 1,
    admin: "Admin",
    action: AdminAction.uploadDoc,
    target: "PRIYA Architecture PDF",
    timestamp: Date.now() - 864e5
  },
  {
    id: 2,
    admin: "Admin",
    action: AdminAction.reindex,
    target: "All Knowledge Documents",
    timestamp: Date.now() - 432e5
  },
  {
    id: 3,
    admin: "Admin",
    action: AdminAction.updateTier,
    target: "demo-002 → PRO",
    timestamp: Date.now() - 36e5
  },
  {
    id: 4,
    admin: "Admin",
    action: AdminAction.banUser,
    target: "spam-principal-999",
    timestamp: Date.now() - 18e5
  },
  {
    id: 5,
    admin: "Admin",
    action: AdminAction.deleteDoc,
    target: "Outdated Policy Document v1",
    timestamp: Date.now() - 9e5
  },
  {
    id: 6,
    admin: "Admin",
    action: AdminAction.uploadDoc,
    target: "Voice Synthesis Technical Guide",
    timestamp: Date.now() - 3e5
  }
];
const SYSTEM_EVENTS = [
  {
    id: 1,
    type: "startup",
    msg: "ARIA OS backend started — all modules online",
    ts: Date.now() - 864e5 * 14
  },
  {
    id: 2,
    type: "reindex",
    msg: "Knowledge base reindex completed — 4 docs, 7 chunks",
    ts: Date.now() - 432e5
  },
  {
    id: 3,
    type: "user_join",
    msg: "New user registered: Arjun Nair (free tier)",
    ts: Date.now() - 864e5
  },
  {
    id: 4,
    type: "reindex",
    msg: "Admin triggered manual reindex",
    ts: Date.now() - 9e5
  },
  {
    id: 5,
    type: "user_join",
    msg: "New user registered: Vikram Mehta (free tier)",
    ts: Date.now() - 864e5 * 5
  }
];
const TIER_STYLE = {
  free: "text-muted-foreground  border-border/40",
  pro: "text-primary           border-primary/40",
  enterprise: "text-amber-400         border-amber-400/40"
};
const ACTION_STYLE = {
  [AdminAction.uploadDoc]: "bg-emerald-500/10  text-emerald-400  border-emerald-500/30",
  [AdminAction.deleteDoc]: "bg-rose-500/10     text-rose-400     border-rose-500/30",
  [AdminAction.banUser]: "bg-rose-500/10     text-rose-400     border-rose-500/30",
  [AdminAction.updateTier]: "bg-amber-500/10    text-amber-400    border-amber-500/30",
  [AdminAction.reindex]: "bg-primary/10      text-primary      border-primary/30"
};
function TierBadge({ tier }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-[10px] font-mono px-1.5 py-0.5 rounded border ${TIER_STYLE[tier] ?? "text-muted-foreground border-border/30"}`,
      children: tier.toUpperCase()
    }
  );
}
function RoleBadge({ role }) {
  const style = role === "admin" ? "text-amber-400 border-amber-400/40" : "text-muted-foreground border-border/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-[10px] font-mono px-1.5 py-0.5 rounded border ${style}`,
      children: role.toUpperCase()
    }
  );
}
function StatusDot({ ok }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-block w-2 h-2 rounded-full ${ok ? "bg-emerald-400 shadow-[0_0_6px_theme(colors.emerald.400)]" : "bg-rose-500"}`
    }
  );
}
function fmtDate(ms) {
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function fmtRelative(ms) {
  const diff = Date.now() - ms;
  if (diff < 6e4) return "Just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function AdminPage() {
  var _a;
  const qc = useQueryClient();
  const { currentUser } = useAriaStore();
  const [activeTab, setActiveTab] = reactExports.useState("users");
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [bannedMap, setBannedMap] = reactExports.useState(
    () => Object.fromEntries(DEMO_USERS.map((u) => [u.id, u.banned]))
  );
  const [tierMap, setTierMap] = reactExports.useState(
    () => Object.fromEntries(DEMO_USERS.map((u) => [u.id, u.tier]))
  );
  const [confirmBan, setConfirmBan] = reactExports.useState(null);
  const [autoRefresh, setAutoRefresh] = reactExports.useState(false);
  const autoRefreshRef = reactExports.useRef(null);
  const PAGE_SIZE = 10;
  const healthQ = useQuery({
    queryKey: ["system-health"],
    queryFn: () => mockBackend.getSystemHealth(),
    refetchInterval: autoRefresh ? 3e4 : false
  });
  const metricsQ = useQuery({
    queryKey: ["system-metrics"],
    queryFn: () => mockBackend.getSystemMetrics(),
    refetchInterval: autoRefresh ? 3e4 : false
  });
  const docsQ = useQuery({
    queryKey: ["admin-docs"],
    queryFn: () => mockBackend.listDocuments()
  });
  const reindexMut = useMutation({
    mutationFn: () => mockBackend.triggerReindex(),
    onSuccess: () => {
      ue.success("Reindex complete — knowledge base refreshed");
      void qc.invalidateQueries({ queryKey: ["admin-docs"] });
    }
  });
  const deleteDocMut = useMutation({
    mutationFn: (docId) => mockBackend.deleteDocument(docId),
    onSuccess: () => {
      ue.success("Document deleted");
      void qc.invalidateQueries({ queryKey: ["admin-docs"] });
    }
  });
  reactExports.useEffect(() => {
    if (autoRefresh) {
      autoRefreshRef.current = setInterval(() => {
        void qc.invalidateQueries({ queryKey: ["system-health"] });
        void qc.invalidateQueries({ queryKey: ["system-metrics"] });
      }, 3e4);
    } else {
      if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
    }
    return () => {
      if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
    };
  }, [autoRefresh, qc]);
  const filteredUsers = DEMO_USERS.filter((u) => {
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  function handleBanToggle(userId) {
    const nowBanned = bannedMap[userId];
    if (!nowBanned) {
      setConfirmBan(userId);
    } else {
      setBannedMap((prev) => ({ ...prev, [userId]: false }));
      ue.success("User unbanned");
    }
  }
  function confirmBanAction() {
    if (!confirmBan) return;
    setBannedMap((prev) => ({ ...prev, [confirmBan]: true }));
    ue.success("User banned");
    setConfirmBan(null);
  }
  function handleTierChange(userId, newTier) {
    setTierMap((prev) => ({ ...prev, [userId]: newTier }));
    ue.success(`Tier updated to ${newTier.toUpperCase()}`);
  }
  const docs = docsQ.data ?? [];
  const totalChunks = docs.reduce((a, d) => a + d.chunks.length, 0);
  docs.filter(
    (d) => d.indexStatus === IndexStatus.indexed
  ).length;
  const storageKb = (docs.length * 24.7).toFixed(1);
  const lastIndexed = docs.length > 0 ? Math.max(...docs.map((d) => Number(d.uploadedAt))) : null;
  const TABS = [
    { id: "users", label: "Users", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }) },
    {
      id: "knowledge",
      label: "Knowledge",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-3.5 h-3.5" })
    },
    {
      id: "health",
      label: "System Health",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5" })
    },
    { id: "logs", label: "Logs", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-auto", "data-ocid": "admin.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl border border-rose-500/50 flex items-center justify-center shrink-0",
              style: { boxShadow: "0 0 16px oklch(0.62 0.21 5 / 0.4)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-rose-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display font-bold text-xl tracking-widest uppercase",
                style: {
                  color: "#e11d48",
                  textShadow: "0 0 20px oklch(0.62 0.21 5 / 0.6)"
                },
                children: "System Administration"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: "Full platform control & monitoring" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[10px] font-mono text-rose-400 font-bold", children: ((currentUser == null ? void 0 : currentUser.name) ?? "A").charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-rose-300", children: (currentUser == null ? void 0 : currentUser.name) ?? "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono px-1 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase", children: "ADMIN" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
        {
          label: "Total Users",
          value: healthQ.data ? healthQ.data.usersCount.toString() : "—",
          color: "text-rose-400",
          glow: "0 0 12px oklch(0.62 0.21 5 / 0.3)"
        },
        {
          label: "Messages",
          value: healthQ.data ? healthQ.data.messagesCount.toString() : "—",
          color: "text-primary",
          glow: "0 0 12px oklch(0.7 0.18 200 / 0.3)"
        },
        {
          label: "Agent Tasks",
          value: healthQ.data ? healthQ.data.agentTasksCount.toString() : "—",
          color: "text-amber-400",
          glow: "0 0 12px oklch(0.8 0.18 85 / 0.3)"
        },
        {
          label: "Uptime (days)",
          value: healthQ.data ? String(Math.floor(Number(healthQ.data.uptime) / 864e5)) : "—",
          color: "text-emerald-400",
          glow: "0 0 12px oklch(0.75 0.15 150 / 0.3)"
        }
      ].map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.07 },
          className: "glass-panel border border-border/20 rounded-xl p-4",
          style: { boxShadow: m.glow },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono uppercase tracking-wider", children: m.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-display font-bold mt-1 ${m.color}`, children: m.value })
          ]
        },
        m.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-1 border-b border-border/20 overflow-x-auto",
          role: "tablist",
          "data-ocid": "admin.tab_bar",
          children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": activeTab === tab.id,
              onClick: () => setActiveTab(tab.id),
              className: `flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono uppercase tracking-widest transition-colors border-b-2 -mb-px whitespace-nowrap ${activeTab === tab.id ? "border-rose-500 text-rose-400" : "border-transparent text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `admin.${tab.id}_tab`,
              children: [
                tab.icon,
                tab.label
              ]
            },
            tab.id
          ))
        }
      ),
      activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "space-y-4",
          "data-ocid": "admin.users_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search users…",
                  value: search,
                  onChange: (e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  },
                  className: "w-full bg-card border border-border/30 rounded-lg pl-8 pr-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-rose-500/50 transition-colors",
                  "data-ocid": "admin.user_search_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/20 bg-card/60", children: [
                "Name",
                "Email",
                "Role",
                "Tier",
                "Joined",
                "Messages",
                "Last Active",
                "Actions"
              ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "text-left px-4 py-3 text-muted-foreground uppercase tracking-wider text-[10px] font-semibold whitespace-nowrap",
                  children: h
                },
                h
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pagedUsers.map((user, idx) => {
                const isBanned = bannedMap[user.id] ?? false;
                const currentTier = tierMap[user.id] ?? user.tier;
                const globalIdx = (page - 1) * PAGE_SIZE + idx + 1;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.tr,
                  {
                    initial: { opacity: 0, x: -4 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: idx * 0.04 },
                    className: `border-b border-border/10 last:border-0 transition-colors ${isBanned ? "bg-rose-500/5" : "hover:bg-card/40"}`,
                    "data-ocid": `admin.user.${globalIdx}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0", children: user.name.charAt(0).toUpperCase() }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate max-w-[100px]", children: user.name }),
                        isBanned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] px-1 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase", children: "Banned" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground truncate max-w-[140px]", children: user.email }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: user.role }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: user.role !== "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          value: currentTier,
                          onChange: (e) => handleTierChange(user.id, e.target.value),
                          className: "bg-card/60 border border-border/30 rounded px-1.5 py-0.5 text-[10px] font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-rose-500/50",
                          "data-ocid": `admin.tier_select.${globalIdx}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "free", children: "FREE" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pro", children: "PRO" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "enterprise", children: "ENTERPRISE" })
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(TierBadge, { tier: currentTier }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: fmtDate(user.joined) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-foreground tabular-nums", children: user.messages.toLocaleString() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: fmtRelative(user.lastActive) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: user.role !== "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleBanToggle(user.id),
                          className: `text-[10px] font-mono px-2 py-1 rounded border transition-colors ${isBanned ? "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10" : "border-rose-500/40 text-rose-400 hover:bg-rose-500/10"}`,
                          "data-ocid": `admin.ban_button.${globalIdx}`,
                          children: isBanned ? "UNBAN" : "BAN"
                        }
                      ) })
                    ]
                  },
                  user.id
                );
              }) })
            ] }) }) }),
            totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground", children: [
                "Showing ",
                (page - 1) * PAGE_SIZE + 1,
                "–",
                Math.min(page * PAGE_SIZE, filteredUsers.length),
                " of",
                " ",
                filteredUsers.length,
                " users"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setPage((p) => Math.max(1, p - 1)),
                    disabled: page === 1,
                    className: "p-1.5 rounded border border-border/30 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors",
                    "data-ocid": "admin.pagination_prev",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 text-xs font-mono text-muted-foreground", children: [
                  page,
                  " / ",
                  totalPages
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                    disabled: page === totalPages,
                    className: "p-1.5 rounded border border-border/30 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors",
                    "data-ocid": "admin.pagination_next",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      activeTab === "knowledge" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "space-y-5",
          "data-ocid": "admin.knowledge_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
              {
                label: "Total Docs",
                value: String(docs.length),
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
                color: "text-primary"
              },
              {
                label: "Total Chunks",
                value: String(totalChunks),
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4" }),
                color: "text-secondary"
              },
              {
                label: "Storage Used",
                value: `${storageKb} KB`,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-4 h-4" }),
                color: "text-amber-400"
              },
              {
                label: "Last Indexed",
                value: lastIndexed ? fmtRelative(lastIndexed) : "Never",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                color: "text-emerald-400"
              }
            ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-panel border border-border/20 rounded-xl p-4 flex items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: s.color, children: s.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono uppercase tracking-wider", children: s.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-lg font-display font-bold mt-0.5 ${s.color}`,
                        children: s.value
                      }
                    )
                  ] })
                ]
              },
              s.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => void reindexMut.mutateAsync(),
                disabled: reindexMut.isPending,
                className: "flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 text-primary text-xs font-mono hover:bg-primary/10 disabled:opacity-50 transition-colors",
                "data-ocid": "admin.reindex_button",
                children: [
                  reindexMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                  "Re-index All"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: docsQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center py-10",
                "data-ocid": "admin.knowledge_loading_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin text-muted-foreground" })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/20 bg-card/60", children: [
                "Title",
                "Type",
                "Uploaded By",
                "Chunks",
                "Upload Date",
                "Status",
                "Actions"
              ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "text-left px-4 py-3 text-muted-foreground uppercase tracking-wider text-[10px] font-semibold whitespace-nowrap",
                  children: h
                },
                h
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: docs.map((doc, idx) => {
                var _a2, _b;
                const isIndexed = doc.indexStatus === IndexStatus.indexed;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.tr,
                  {
                    initial: { opacity: 0, x: -4 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: idx * 0.05 },
                    className: "border-b border-border/10 last:border-0 hover:bg-card/40 transition-colors",
                    "data-ocid": `admin.doc.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground max-w-[160px] truncate", children: doc.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded border border-secondary/30 text-secondary text-[10px] uppercase", children: doc.docType.toString() }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground", children: [
                        ((_b = (_a2 = doc.userId) == null ? void 0 : _a2.toText) == null ? void 0 : _b.call(_a2).slice(0, 12)) ?? "unknown",
                        "…"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-foreground", children: doc.chunks.length }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: fmtDate(Number(doc.uploadedAt)) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: isIndexed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-emerald-400 text-[10px]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                        " Indexed"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-amber-400 text-[10px]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
                        " ",
                        "Pending"
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => void deleteDocMut.mutateAsync(doc.id),
                          disabled: deleteDocMut.isPending,
                          className: "p-1.5 rounded border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 disabled:opacity-50 transition-colors",
                          "aria-label": "Delete document",
                          "data-ocid": `admin.doc_delete_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      ) })
                    ]
                  },
                  doc.id.toString()
                );
              }) })
            ] }) }) })
          ]
        }
      ),
      activeTab === "health" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "space-y-5",
          "data-ocid": "admin.health_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-sm text-foreground uppercase tracking-wider", children: "Real-time Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 cursor-pointer",
                  "data-ocid": "admin.auto_refresh_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: "Auto-refresh (30s)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": autoRefresh,
                        "aria-label": "Toggle auto-refresh",
                        onClick: () => setAutoRefresh((v) => !v),
                        onKeyDown: (e) => {
                          if (e.key === "Enter" || e.key === " ")
                            setAutoRefresh((v) => !v);
                        },
                        className: `relative w-10 h-5 rounded-full border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 ${autoRefresh ? "bg-rose-500/30 border-rose-500/60" : "bg-card border-border/40"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `absolute top-0.5 w-4 h-4 rounded-full transition-all ${autoRefresh ? "left-5 bg-rose-400" : "left-0.5 bg-muted-foreground"}`
                          }
                        )
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
              {
                label: "Backend Server",
                status: true,
                detail: "FastAPI v0.104 · Port 8000"
              },
              {
                label: "Knowledge DB",
                status: true,
                detail: "Vector DB · 4 docs indexed"
              },
              {
                label: "Agent Engine",
                status: true,
                detail: "5 agents active"
              }
            ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-panel border border-border/20 rounded-xl p-4 flex items-start gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { ok: s.status }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground font-semibold", children: s.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: s.detail })
                  ] })
                ]
              },
              s.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel border border-border/20 rounded-xl p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-amber-400" }),
                " API Key Status"
              ] }),
              [
                { name: "OpenAI GPT-4", configured: true },
                { name: "ElevenLabs TTS", configured: true },
                { name: "Google Maps", configured: false },
                { name: "Twilio Voice", configured: false }
              ].map((api) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between py-1.5 border-b border-border/10 last:border-0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground", children: api.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `flex items-center gap-1.5 text-[10px] font-mono ${api.configured ? "text-emerald-400" : "text-rose-400"}`,
                        children: [
                          api.configured ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                          api.configured ? "Configured" : "Missing"
                        ]
                      }
                    )
                  ]
                },
                api.name
              ))
            ] }),
            metricsQ.data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel border border-border/20 rounded-xl p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 text-primary" }),
                " Platform Metrics"
              ] }),
              [
                {
                  label: "Total Users",
                  value: metricsQ.data.totalUsers.toString()
                },
                {
                  label: "Active Users",
                  value: metricsQ.data.activeUsers.toString()
                },
                {
                  label: "Total Messages",
                  value: Number(metricsQ.data.totalMessages).toLocaleString()
                },
                {
                  label: "Voice Sessions",
                  value: Number(
                    metricsQ.data.totalVoiceCalls
                  ).toLocaleString()
                },
                {
                  label: "Agent Tasks",
                  value: Number(
                    metricsQ.data.totalAgentTasks
                  ).toLocaleString()
                },
                {
                  label: "Monthly Revenue",
                  value: `$${metricsQ.data.mrr.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                }
              ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between py-1.5 border-b border-border/10 last:border-0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: m.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold text-foreground tabular-nums", children: m.value })
                  ]
                },
                m.label
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-panel border border-border/20 rounded-xl p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-secondary" }),
                " Recent System Events"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...SYSTEM_EVENTS].sort((a, b) => b.ts - a.ts).map((ev) => {
                const dot = ev.type === "startup" ? "bg-primary" : ev.type === "reindex" ? "bg-amber-400" : "bg-emerald-400";
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-start gap-3 py-1.5 border-b border-border/10 last:border-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `mt-1.5 inline-block w-2 h-2 rounded-full shrink-0 ${dot}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground", children: ev.msg }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: fmtRelative(ev.ts) })
                      ] })
                    ]
                  },
                  ev.id
                );
              }) })
            ] })
          ]
        }
      ),
      activeTab === "logs" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "space-y-3",
          "data-ocid": "admin.logs_panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/20 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/20 bg-card/60 px-4 py-3 grid grid-cols-4 gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Admin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Action" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-1", children: "Target" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Timestamp" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto max-h-[500px]", children: [...DEMO_LOGS].reverse().map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -4 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: idx * 0.04 },
                className: "px-4 py-3 border-b border-border/10 last:border-0 grid grid-cols-4 gap-4 items-center hover:bg-card/40 transition-colors",
                "data-ocid": `admin.log.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[9px] font-mono text-amber-400 font-bold shrink-0", children: log.admin.charAt(0) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground truncate", children: log.admin })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-[10px] font-mono px-2 py-0.5 rounded border ${ACTION_STYLE[log.action.toString()] ?? "text-muted-foreground border-border/30 bg-transparent"}`,
                      children: log.action.toString().toUpperCase()
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground truncate", children: log.target }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground whitespace-nowrap", children: fmtRelative(log.timestamp) })
                ]
              },
              log.id
            )) })
          ] })
        }
      )
    ] }),
    confirmBan !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        "data-ocid": "admin.ban_dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            className: "glass-panel border border-rose-500/40 rounded-2xl p-6 max-w-sm w-full mx-4 space-y-4",
            style: { boxShadow: "0 0 40px oklch(0.62 0.21 5 / 0.3)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-rose-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm uppercase tracking-widest text-rose-400", children: "Confirm Ban" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground leading-relaxed", children: [
                "Are you sure you want to ban",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: (_a = DEMO_USERS.find((u) => u.id === confirmBan)) == null ? void 0 : _a.name }),
                "? This will restrict their access to the platform."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: confirmBanAction,
                    className: "flex-1 py-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-mono uppercase tracking-wider hover:bg-rose-500/30 transition-colors",
                    "data-ocid": "admin.ban_confirm_button",
                    children: "Ban User"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setConfirmBan(null),
                    className: "flex-1 py-2 rounded-lg border border-border/30 text-muted-foreground text-xs font-mono uppercase tracking-wider hover:text-foreground hover:border-border/60 transition-colors",
                    "data-ocid": "admin.ban_cancel_button",
                    children: "Cancel"
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}
export {
  AdminPage
};
