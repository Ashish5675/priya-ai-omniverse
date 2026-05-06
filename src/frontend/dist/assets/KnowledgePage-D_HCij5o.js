import { c as createLucideIcon, d as useActor, e as useQuery, f as useQueryClient, g as useMutation, t as mockBackend, h as createActor, r as reactExports, j as jsxRuntimeExports, w as BookOpen, A as AnimatePresence, m as motion, Z as Zap, b as ue, C as ChevronRight, G as Globe } from "./index-Khuvrpqq.js";
import { C as CircleCheck } from "./circle-check-DKp6tXQ-.js";
import { L as LoaderCircle } from "./loader-circle-CP0fZB5d.js";
import { D as Database, S as Search } from "./search-CfsztCE7.js";
import { C as Clock } from "./clock-Cvc138nV.js";
import { U as Upload } from "./upload-DU9VWZEO.js";
import { X } from "./x-V8iWEkoj.js";
import { R as RefreshCw } from "./refresh-cw-BAeMeO08.js";
import { F as File } from "./file-jT4EpzhL.js";
import { T as Trash2 } from "./trash-2-BpPdCVwr.js";
import { F as FileText } from "./file-text-lUOGEMv0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
];
const ClipboardCopy = createLucideIcon("clipboard-copy", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
];
const HardDrive = createLucideIcon("hard-drive", __iconNode$1);
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
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode);
const USE_MOCK = true;
const knowledgeKeys = {
  all: ["knowledge"],
  documents: () => [...knowledgeKeys.all, "documents"],
  search: (q) => [...knowledgeKeys.all, "search", q],
  stats: () => [...knowledgeKeys.all, "stats"]
};
function mapDoc(raw) {
  return {
    id: raw.id,
    title: raw.title,
    docType: raw.docType,
    content: raw.content,
    uploadedAt: raw.uploadedAt,
    indexStatus: raw.indexStatus,
    chunks: raw.chunks.map((c) => ({
      id: c.id,
      text: c.text,
      similarity: c.similarity
    }))
  };
}
function useListDocuments() {
  useActor(createActor);
  return useQuery({
    queryKey: knowledgeKeys.documents(),
    queryFn: async () => {
      {
        const docs2 = await mockBackend.listDocuments();
        return docs2.map(mapDoc);
      }
    },
    enabled: USE_MOCK
  });
}
function useUploadDocument() {
  useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, docType, content }) => {
      return mockBackend.uploadDocument(title, docType, content);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: knowledgeKeys.documents() });
      void qc.invalidateQueries({ queryKey: knowledgeKeys.stats() });
    }
  });
}
function useDeleteDocument() {
  useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ docId }) => {
      return mockBackend.deleteDocument(docId);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: knowledgeKeys.documents() });
      void qc.invalidateQueries({ queryKey: knowledgeKeys.stats() });
    }
  });
}
function useSearchKnowledge(searchQuery, topK = BigInt(5)) {
  useActor(createActor);
  return useQuery({
    queryKey: knowledgeKeys.search(searchQuery),
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      return mockBackend.searchKnowledge(searchQuery, topK);
    },
    enabled: !!searchQuery.trim()
  });
}
function useKnowledgeStats() {
  useActor(createActor);
  return useQuery({
    queryKey: knowledgeKeys.stats(),
    queryFn: async () => {
      return mockBackend.getKnowledgeStats();
    },
    enabled: USE_MOCK
  });
}
const GREEN = "#10b981";
const GREEN_GLOW = "0 0 16px rgba(16,185,129,0.35)";
const DOC_TYPE_ICONS = {
  pdf: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4", style: { color: "#f87171" } }),
  docx: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4", style: { color: "#60a5fa" } }),
  txt: /* @__PURE__ */ jsxRuntimeExports.jsx(File, { className: "w-4 h-4", style: { color: "#facc15" } }),
  url: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4", style: { color: "#a78bfa" } })
};
const DOC_TYPE_LABELS = {
  pdf: "PDF",
  docx: "DOCX",
  txt: "TXT",
  url: "URL"
};
const STATUS_STYLES = {
  indexed: {
    border: "border-emerald-400/40",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    label: "INDEXED"
  },
  pending: {
    border: "border-yellow-400/40",
    text: "text-yellow-400",
    bg: "bg-yellow-400/10",
    label: "PENDING"
  },
  failed: {
    border: "border-red-400/40",
    text: "text-red-400",
    bg: "bg-red-400/10",
    label: "FAILED"
  }
};
const SEARCH_LANGUAGES = ["EN", "HI", "NA"];
const DEMO_CACHED_RESULTS = {
  voice: [
    {
      doc: "PRIYA AI Technical Overview",
      chunk: "PRIYA uses ElevenLabs and Azure Cognitive TTS for ultra-realistic female voice synthesis. SSML markup enables natural pauses, pitch variation, and emotional tone rendering.",
      score: 0.94
    },
    {
      doc: "User Manual v6",
      chunk: "To trigger voice mode, send any message in the chat panel. Priya will automatically respond with synthesised audio in a female voice — no text is displayed in the reply area.",
      score: 0.87
    }
  ],
  agent: [
    {
      doc: "PRIYA AI Technical Overview",
      chunk: "The autonomous agent system consists of five specialised agents: Planner, Research, Executor, Memory, and Critic. Each agent communicates via an internal message bus with retry and self-correction loops.",
      score: 0.96
    },
    {
      doc: "FAQ Document",
      chunk: "Agents can chain multiple tasks together. For example, the Planner agent breaks a complex goal into sub-tasks, assigns them to the Research and Executor agents, and the Critic agent validates the final output.",
      score: 0.81
    }
  ],
  face: [
    {
      doc: "PRIYA AI Technical Overview",
      chunk: "Face recognition login uses OpenCV and the face_recognition library to capture webcam frames, encode facial landmarks, and match against the registered user database.",
      score: 0.92
    },
    {
      doc: "FAQ Document",
      chunk: "If the webcam is unavailable, the system falls back to the demo face dataset included in the repository. Confidence scores above 90% grant instant access.",
      score: 0.79
    }
  ]
};
function getDefaultSearchResults(q) {
  const lower = q.toLowerCase();
  for (const key of Object.keys(DEMO_CACHED_RESULTS)) {
    if (lower.includes(key)) return DEMO_CACHED_RESULTS[key];
  }
  return [
    {
      doc: "PRIYA AI Technical Overview",
      chunk: `Context-aware response for "${q}": PRIYA AI – OMNIVERSE is a GOD+ level AI Operating System with modular agents, real-time voice, face recognition, drone simulation, legal AI, and IoT tracking capabilities.`,
      score: 0.88
    },
    {
      doc: "User Manual v6",
      chunk: `Relevant section for "${q}": All features are accessible from the left navigation panel. Demo mode is fully functional with simulated APIs using credentials demo@priya.ai / password123.`,
      score: 0.74
    }
  ];
}
function highlightText(text, query) {
  const words = query.split(" ").filter(Boolean);
  if (words.length === 0) return [/* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text }, "full")];
  const pattern = new RegExp(
    `(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi"
  );
  const parts = text.split(pattern);
  const result = [];
  let cursor = 0;
  for (const part of parts) {
    const isMatch = words.some((w) => w.toLowerCase() === part.toLowerCase());
    if (isMatch) {
      result.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "mark",
          {
            className: "bg-primary/20 text-primary rounded px-0.5",
            children: part
          },
          `m-${cursor}`
        )
      );
    } else {
      result.push(/* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, `t-${cursor}`));
    }
    cursor += part.length;
  }
  return result;
}
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
function StatCard({
  icon,
  label,
  value,
  accent = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-panel rounded-xl p-3 flex items-center gap-3 border",
      style: {
        borderColor: accent ? `${GREEN}55` : "oklch(0.2 0.08 200 / 0.4)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            style: {
              background: accent ? "rgba(16,185,129,0.12)" : "oklch(0.15 0 0 / 0.6)",
              border: `1px solid ${accent ? `${GREEN}44` : "oklch(0.25 0.05 200 / 0.3)"}`
            },
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground truncate", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-base font-display font-bold leading-tight",
              style: { color: accent ? GREEN : "oklch(0.95 0 0)" },
              children: value
            }
          )
        ] })
      ]
    }
  );
}
function DocTypePill({ type }) {
  const PILL_COLORS = {
    PDF: "border-red-400/40 text-red-400 bg-red-400/8",
    DOCX: "border-blue-400/40 text-blue-400 bg-blue-400/8",
    TXT: "border-yellow-400/40 text-yellow-400 bg-yellow-400/8",
    URL: "border-purple-400/40 text-purple-400 bg-purple-400/8"
  };
  const cls = PILL_COLORS[type] ?? "border-border/40 text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${cls}`,
      children: type
    }
  );
}
function RelevanceBar({ score }) {
  const pct = Math.round(score * 100);
  const color = score >= 0.9 ? "#10b981" : score >= 0.7 ? "#facc15" : "#f87171";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1 rounded-full bg-muted/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full transition-all duration-500",
        style: { width: `${pct}%`, background: color }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono", style: { color }, children: score.toFixed(2) })
  ] });
}
function DeleteConfirmDialog({
  docTitle,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",
      "data-ocid": "knowledge.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.9, opacity: 0 },
          className: "glass-panel border rounded-xl p-6 w-full max-w-sm space-y-4",
          style: { borderColor: "#f8717155" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground font-bold", children: "Delete Document?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mt-1 break-words", children: [
                  '"',
                  docTitle,
                  '" will be permanently removed along with all indexed chunks.'
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  className: "px-4 py-1.5 rounded-lg border border-border/40 text-muted-foreground text-xs font-mono hover:border-primary/40 transition-smooth",
                  "data-ocid": "knowledge.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onConfirm,
                  className: "px-4 py-1.5 rounded-lg border border-red-400/40 text-red-400 text-xs font-mono bg-red-400/10 hover:bg-red-400/20 transition-smooth",
                  "data-ocid": "knowledge.confirm_button",
                  children: "Delete"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function KnowledgePage() {
  const [dragOver, setDragOver] = reactExports.useState(false);
  const [uploadTitle, setUploadTitle] = reactExports.useState("");
  const [uploadContent, setUploadContent] = reactExports.useState("");
  const [uploadDocType, setUploadDocType] = reactExports.useState("txt");
  const [uploadMode, setUploadMode] = reactExports.useState("paste");
  const [uploading, setUploading] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeSearch, setActiveSearch] = reactExports.useState("");
  const [searchLang, setSearchLang] = reactExports.useState("EN");
  const [localResults, setLocalResults] = reactExports.useState(null);
  const [pendingDelete, setPendingDelete] = reactExports.useState(
    null
  );
  const [reindexing, setReindexing] = reactExports.useState(false);
  const { data: docs = [], isLoading } = useListDocuments();
  const { data: stats } = useKnowledgeStats();
  const { data: backendSearchResults = [] } = useSearchKnowledge(activeSearch);
  const uploadDoc = useUploadDocument();
  const deleteDoc = useDeleteDocument();
  const handleDrop = reactExports.useCallback((e) => {
    var _a;
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const ext = ((_a = file.name.split(".").pop()) == null ? void 0 : _a.toLowerCase()) ?? "txt";
    setUploadDocType(["pdf", "docx", "txt"].includes(ext) ? ext : "txt");
    setUploadTitle(file.name.replace(/\.[^.]+$/, ""));
    setUploadMode("paste");
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      setUploadContent(
        typeof ((_a2 = ev.target) == null ? void 0 : _a2.result) === "string" ? ev.target.result.slice(0, 4e3) : ""
      );
    };
    reader.readAsText(file);
  }, []);
  const handleFileInput = (e) => {
    var _a, _b;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const ext = ((_b = file.name.split(".").pop()) == null ? void 0 : _b.toLowerCase()) ?? "txt";
    setUploadDocType(["pdf", "docx", "txt"].includes(ext) ? ext : "txt");
    setUploadTitle(file.name.replace(/\.[^.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      setUploadContent(
        typeof ((_a2 = ev.target) == null ? void 0 : _a2.result) === "string" ? ev.target.result.slice(0, 4e3) : ""
      );
    };
    reader.readAsText(file);
  };
  const handleUpload = async () => {
    if (!uploadTitle.trim() || !uploadContent.trim()) return;
    setUploading(true);
    try {
      await uploadDoc.mutateAsync({
        title: uploadTitle,
        docType: uploadDocType,
        content: uploadContent
      });
      ue.success("Document uploaded & indexing started");
      setUploadTitle("");
      setUploadContent("");
    } catch {
      ue.error("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };
  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteDoc.mutateAsync({ docId: pendingDelete.id });
      ue.success("Document deleted");
    } catch {
      ue.error("Delete failed");
    } finally {
      setPendingDelete(null);
    }
  };
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setActiveSearch(searchQuery);
    setLocalResults(getDefaultSearchResults(searchQuery));
  };
  const handleReindex = async () => {
    setReindexing(true);
    await new Promise((r) => setTimeout(r, 2200));
    setReindexing(false);
    ue.success("Re-indexing complete — all documents indexed");
  };
  const displayResults = localResults ?? (backendSearchResults.length > 0 ? backendSearchResults.map((r) => ({
    doc: "Knowledge Base",
    chunk: r.chunk.text,
    score: Number(r.score)
  })) : []);
  const totalDocs = (stats == null ? void 0 : stats.totalDocuments) ?? docs.length;
  const totalChunks = (stats == null ? void 0 : stats.totalChunks) ?? docs.reduce((sum, d) => sum + d.chunks.length, 0);
  const lastIndexed = docs.length > 0 ? new Date(Number(docs[0].uploadedAt)).toLocaleDateString() : "—";
  const storageBytes = Number(totalChunks) * 420;
  const allIndexed = docs.every((d) => d.indexStatus === "indexed");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-h-0", "data-ocid": "knowledge.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 px-6 pt-6 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center border",
              style: {
                background: "rgba(16,185,129,0.12)",
                borderColor: `${GREEN}55`,
                boxShadow: GREEN_GLOW
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5", style: { color: GREEN } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display font-bold text-xl tracking-widest uppercase",
                style: { color: GREEN, textShadow: `0 0 18px ${GREEN}88` },
                children: "Knowledge Base & RAG System"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground font-mono tracking-wider", children: "Upload · Index · Query — powered by vector embeddings" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono",
            style: allIndexed ? {
              borderColor: `${GREEN}44`,
              color: GREEN,
              background: "rgba(16,185,129,0.08)"
            } : {
              borderColor: "#facc1544",
              color: "#facc15",
              background: "rgba(250,204,21,0.08)"
            },
            "data-ocid": "knowledge.status_badge",
            children: [
              allIndexed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
              allIndexed ? "Indexed and Ready" : "Indexing..."
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-4 gap-3 mt-4",
          "data-ocid": "knowledge.stats_bar",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4", style: { color: GREEN } }),
                label: "Total Documents",
                value: totalDocs.toString(),
                accent: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-primary" }),
                label: "Total Chunks",
                value: totalChunks.toString()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-muted-foreground" }),
                label: "Last Indexed",
                value: lastIndexed
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4 text-muted-foreground" }),
                label: "Storage Used",
                value: formatBytes(storageBytes)
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex gap-4 px-6 pb-6 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col gap-4 overflow-y-auto",
          style: { width: "45%", scrollbarWidth: "thin" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: "rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer relative overflow-hidden block",
                style: {
                  borderColor: dragOver ? GREEN : `${GREEN}44`,
                  background: dragOver ? "rgba(16,185,129,0.06)" : "rgba(16,185,129,0.02)",
                  boxShadow: dragOver ? GREEN_GLOW : void 0
                },
                onDragOver: (e) => {
                  e.preventDefault();
                  setDragOver(true);
                },
                onDragLeave: () => setDragOver(false),
                onDrop: handleDrop,
                "data-ocid": "knowledge.dropzone",
                "aria-label": "Drop files or click to upload",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: fileInputRef,
                      type: "file",
                      accept: ".pdf,.docx,.txt",
                      className: "hidden",
                      onChange: handleFileInput,
                      "data-ocid": "knowledge.upload_button"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col items-center gap-2 text-center pointer-events-none", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-10 h-10 rounded-xl flex items-center justify-center",
                        style: {
                          background: "rgba(16,185,129,0.12)",
                          border: `1px solid ${GREEN}44`
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5", style: { color: GREEN } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono", style: { color: GREEN }, children: "Drop files here or click to browse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "Supported formats:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["PDF", "DOCX", "TXT"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(DocTypePill, { type: t }, t)) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-panel rounded-xl border p-4 space-y-3",
                style: { borderColor: `${GREEN}33` },
                "data-ocid": "knowledge.upload_panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-[11px] font-mono uppercase tracking-widest",
                        style: { color: GREEN },
                        children: "Paste Content Directly"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["paste", "file"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setUploadMode(m),
                        className: "text-[10px] font-mono px-2 py-0.5 rounded border transition-smooth uppercase",
                        style: uploadMode === m ? {
                          borderColor: `${GREEN}66`,
                          color: GREEN,
                          background: "rgba(16,185,129,0.12)"
                        } : {
                          borderColor: "oklch(0.25 0.05 200 / 0.4)",
                          color: "oklch(0.65 0 0)"
                        },
                        "data-ocid": `knowledge.mode_toggle.${m}`,
                        children: m
                      },
                      m
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: uploadTitle,
                      onChange: (e) => setUploadTitle(e.target.value),
                      placeholder: "Document title...",
                      className: "w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-500/60 transition-smooth",
                      "data-ocid": "knowledge.title_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["txt", "pdf", "docx", "url"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setUploadDocType(t),
                      className: "text-[10px] font-mono px-2.5 py-1 rounded border transition-smooth uppercase",
                      style: uploadDocType === t ? {
                        borderColor: `${GREEN}66`,
                        color: GREEN,
                        background: "rgba(16,185,129,0.12)"
                      } : {
                        borderColor: "oklch(0.25 0.05 200 / 0.4)",
                        color: "oklch(0.55 0 0)"
                      },
                      "data-ocid": `knowledge.type_pill.${t}`,
                      children: DOC_TYPE_LABELS[t]
                    },
                    t
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      value: uploadContent,
                      onChange: (e) => setUploadContent(e.target.value),
                      placeholder: "Paste document content, URL, or text here...",
                      rows: 5,
                      className: "w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-500/60 transition-smooth resize-none",
                      "data-ocid": "knowledge.content_textarea"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: uploading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      exit: { opacity: 0 },
                      className: "h-1 rounded-full overflow-hidden bg-muted/40",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          className: "h-full rounded-full",
                          style: { background: GREEN },
                          initial: { width: "0%" },
                          animate: { width: "90%" },
                          transition: { duration: 1.8, ease: "easeInOut" }
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setUploadTitle("");
                          setUploadContent("");
                        },
                        className: "px-3 py-1.5 rounded-lg border border-border/40 text-muted-foreground text-xs font-mono hover:border-primary/40 transition-smooth flex items-center gap-1.5",
                        "data-ocid": "knowledge.clear_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                          " Clear"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => void handleUpload(),
                        disabled: !uploadTitle.trim() || !uploadContent.trim() || uploading,
                        className: "flex items-center gap-2 px-4 py-1.5 rounded-lg border text-xs font-mono transition-smooth disabled:opacity-40",
                        style: {
                          borderColor: `${GREEN}66`,
                          color: GREEN,
                          background: "rgba(16,185,129,0.10)"
                        },
                        "data-ocid": "knowledge.submit_button",
                        children: [
                          uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                          "Upload & Index"
                        ]
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "knowledge.documents_list", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: [
                  "Documents (",
                  docs.length,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => void handleReindex(),
                    disabled: reindexing || docs.length === 0,
                    className: "flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth disabled:opacity-40",
                    "data-ocid": "knowledge.reindex_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        RefreshCw,
                        {
                          className: `w-3 h-3 ${reindexing ? "animate-spin" : ""}`
                        }
                      ),
                      "Re-index All"
                    ]
                  }
                )
              ] }),
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-muted-foreground py-8 justify-center",
                  "data-ocid": "knowledge.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      LoaderCircle,
                      {
                        className: "w-4 h-4 animate-spin",
                        style: { color: GREEN }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: "Loading knowledge base..." })
                  ]
                }
              ),
              !isLoading && docs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "glass-panel border border-border/30 rounded-xl p-8 text-center",
                  "data-ocid": "knowledge.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      BookOpen,
                      {
                        className: "w-10 h-10 mx-auto mb-3 opacity-20",
                        style: { color: GREEN }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-muted-foreground", children: "No documents yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground/60 mt-1", children: "Upload a PDF, DOCX, or TXT to get started" })
                  ]
                }
              ),
              docs.map((doc, idx) => {
                const st = STATUS_STYLES[doc.indexStatus] ?? STATUS_STYLES.pending;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -12 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: idx * 0.05 },
                    className: "glass-panel border border-border/20 rounded-xl p-3.5 flex items-center gap-3 group hover:border-border/40 transition-smooth",
                    "data-ocid": `knowledge.doc.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: DOC_TYPE_ICONS[doc.docType] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(File, { className: "w-4 h-4 text-muted-foreground" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground truncate", children: doc.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            DocTypePill,
                            {
                              type: (DOC_TYPE_LABELS[doc.docType] ?? doc.docType).toUpperCase()
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono", children: [
                            new Date(Number(doc.uploadedAt)).toLocaleDateString(),
                            " ",
                            "· ",
                            doc.chunks.length,
                            " chunks"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-[10px] font-mono px-2 py-0.5 rounded border uppercase flex-shrink-0 ${st.border} ${st.text} ${st.bg}`,
                          children: st.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setPendingDelete(doc),
                          className: "p-1.5 rounded-lg border border-border/20 opacity-0 group-hover:opacity-100 hover:border-red-400/50 text-muted-foreground hover:text-red-400 transition-smooth",
                          "aria-label": "Delete document",
                          "data-ocid": `knowledge.delete_button.${idx + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ]
                  },
                  doc.id.toString()
                );
              })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col gap-4 overflow-y-auto",
          style: { width: "55%", scrollbarWidth: "thin" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-panel rounded-xl border p-4 space-y-3",
                style: { borderColor: "oklch(0.2 0.08 200 / 0.5)" },
                "data-ocid": "knowledge.search_panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono uppercase tracking-widest text-primary", children: "RAG-Powered Query" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: searchQuery,
                          onChange: (e) => setSearchQuery(e.target.value),
                          onKeyDown: (e) => {
                            if (e.key === "Enter") handleSearch();
                          },
                          placeholder: "Ask anything from your knowledge base...",
                          className: "w-full bg-background/50 border border-border/50 rounded-lg pl-9 pr-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-smooth",
                          "data-ocid": "knowledge.search_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleSearch,
                        className: "px-4 py-2.5 rounded-lg border border-primary/40 text-primary text-sm font-mono flex items-center gap-2 hover:border-primary/70 hover:bg-primary/10 transition-smooth",
                        "data-ocid": "knowledge.search_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                          "Query"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest", children: "Output language:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: SEARCH_LANGUAGES.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSearchLang(lang),
                        className: "text-[10px] font-mono px-2.5 py-1 rounded border transition-smooth uppercase",
                        style: searchLang === lang ? {
                          borderColor: "oklch(0.7 0.18 200 / 0.7)",
                          color: "oklch(0.7 0.18 200)",
                          background: "oklch(0.7 0.18 200 / 0.12)"
                        } : {
                          borderColor: "oklch(0.25 0.05 200 / 0.4)",
                          color: "oklch(0.55 0 0)"
                        },
                        "data-ocid": `knowledge.lang_${lang.toLowerCase()}`,
                        children: lang === "EN" ? "English" : lang === "HI" ? "हिन्दी" : "नागपुरी"
                      },
                      lang
                    )) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: activeSearch && displayResults.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0 },
                className: "space-y-3",
                "data-ocid": "knowledge.results_list",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: [
                    displayResults.length,
                    ' results for "',
                    activeSearch,
                    '" ·',
                    " ",
                    searchLang
                  ] }),
                  displayResults.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, x: 12 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: idx * 0.07 },
                      className: "glass-panel border border-border/20 rounded-xl p-4 space-y-2 hover:border-primary/30 transition-smooth group",
                      "data-ocid": `knowledge.result.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5 flex-shrink-0 text-primary" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-primary truncate", children: r.doc })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                void navigator.clipboard.writeText(r.chunk);
                                ue.success("Context copied to clipboard");
                              },
                              className: "flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth opacity-0 group-hover:opacity-100 flex-shrink-0",
                              "data-ocid": `knowledge.use_in_chat_button.${idx + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "w-3 h-3" }),
                                "Use in Chat"
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground leading-relaxed line-clamp-4", children: highlightText(r.chunk, activeSearch) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RelevanceBar, { score: r.score }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 pt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground/40" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest", children: [
                            "Chunk ",
                            idx + 1,
                            " of ",
                            displayResults.length
                          ] })
                        ] })
                      ]
                    },
                    `${r.doc}-${idx}`
                  ))
                ]
              },
              "results"
            ) : activeSearch ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "glass-panel border border-border/20 rounded-xl p-8 text-center",
                "data-ocid": "knowledge.no_results_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8 mx-auto mb-3 opacity-20 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm text-muted-foreground", children: [
                    'No results found for "',
                    activeSearch,
                    '"'
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground/50 mt-1", children: "Try different keywords or upload more documents" })
                ]
              },
              "no-results"
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "glass-panel border border-border/20 rounded-xl p-10 text-center flex-1 flex flex-col items-center justify-center",
                "data-ocid": "knowledge.search_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4",
                      style: {
                        background: "rgba(16,185,129,0.08)",
                        border: `1px dashed ${GREEN}44`
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-6 h-6", style: { color: `${GREEN}88` } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-muted-foreground", children: "Upload documents to enable RAG-powered search" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground/50 mt-1.5", children: "Your knowledge base will answer queries with source attribution" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-4 text-xs font-mono text-muted-foreground/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded border border-border/20", children: "PDF" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded border border-border/20", children: "DOCX" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded border border-border/20", children: "TXT" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "→" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: GREEN }, children: "Vector DB" })
                  ] })
                ]
              },
              "empty"
            ) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: pendingDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmDialog,
      {
        docTitle: pendingDelete.title,
        onConfirm: () => void confirmDelete(),
        onCancel: () => setPendingDelete(null)
      }
    ) })
  ] });
}
export {
  KnowledgePage
};
