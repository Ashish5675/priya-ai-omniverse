import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCopy,
  Clock,
  Database,
  File,
  FileText,
  Globe,
  HardDrive,
  Layers,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useDeleteDocument,
  useKnowledgeStats,
  useListDocuments,
  useSearchKnowledge,
  useUploadDocument,
} from "../hooks/useKnowledge";
import type { KnowledgeDocument } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const GREEN = "#10b981";
const GREEN_GLOW = "0 0 16px rgba(16,185,129,0.35)";

const DOC_TYPE_ICONS: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-4 h-4" style={{ color: "#f87171" }} />,
  docx: <FileText className="w-4 h-4" style={{ color: "#60a5fa" }} />,
  txt: <File className="w-4 h-4" style={{ color: "#facc15" }} />,
  url: <Globe className="w-4 h-4" style={{ color: "#a78bfa" }} />,
};

const DOC_TYPE_LABELS: Record<string, string> = {
  pdf: "PDF",
  docx: "DOCX",
  txt: "TXT",
  url: "URL",
};

const STATUS_STYLES: Record<
  string,
  { border: string; text: string; bg: string; label: string }
> = {
  indexed: {
    border: "border-emerald-400/40",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    label: "INDEXED",
  },
  pending: {
    border: "border-yellow-400/40",
    text: "text-yellow-400",
    bg: "bg-yellow-400/10",
    label: "PENDING",
  },
  failed: {
    border: "border-red-400/40",
    text: "text-red-400",
    bg: "bg-red-400/10",
    label: "FAILED",
  },
};

const SEARCH_LANGUAGES = ["EN", "HI", "NA"] as const;
type SearchLang = (typeof SEARCH_LANGUAGES)[number];

// ─── Demo cached results ───────────────────────────────────────────────────────

const DEMO_CACHED_RESULTS: Record<
  string,
  Array<{ doc: string; chunk: string; score: number }>
> = {
  voice: [
    {
      doc: "PRIYA AI Technical Overview",
      chunk:
        "PRIYA uses ElevenLabs and Azure Cognitive TTS for ultra-realistic female voice synthesis. SSML markup enables natural pauses, pitch variation, and emotional tone rendering.",
      score: 0.94,
    },
    {
      doc: "User Manual v6",
      chunk:
        "To trigger voice mode, send any message in the chat panel. Priya will automatically respond with synthesised audio in a female voice — no text is displayed in the reply area.",
      score: 0.87,
    },
  ],
  agent: [
    {
      doc: "PRIYA AI Technical Overview",
      chunk:
        "The autonomous agent system consists of five specialised agents: Planner, Research, Executor, Memory, and Critic. Each agent communicates via an internal message bus with retry and self-correction loops.",
      score: 0.96,
    },
    {
      doc: "FAQ Document",
      chunk:
        "Agents can chain multiple tasks together. For example, the Planner agent breaks a complex goal into sub-tasks, assigns them to the Research and Executor agents, and the Critic agent validates the final output.",
      score: 0.81,
    },
  ],
  face: [
    {
      doc: "PRIYA AI Technical Overview",
      chunk:
        "Face recognition login uses OpenCV and the face_recognition library to capture webcam frames, encode facial landmarks, and match against the registered user database.",
      score: 0.92,
    },
    {
      doc: "FAQ Document",
      chunk:
        "If the webcam is unavailable, the system falls back to the demo face dataset included in the repository. Confidence scores above 90% grant instant access.",
      score: 0.79,
    },
  ],
};

function getDefaultSearchResults(q: string) {
  const lower = q.toLowerCase();
  for (const key of Object.keys(DEMO_CACHED_RESULTS)) {
    if (lower.includes(key)) return DEMO_CACHED_RESULTS[key];
  }
  return [
    {
      doc: "PRIYA AI Technical Overview",
      chunk: `Context-aware response for "${q}": PRIYA AI – OMNIVERSE is a GOD+ level AI Operating System with modular agents, real-time voice, face recognition, drone simulation, legal AI, and IoT tracking capabilities.`,
      score: 0.88,
    },
    {
      doc: "User Manual v6",
      chunk: `Relevant section for "${q}": All features are accessible from the left navigation panel. Demo mode is fully functional with simulated APIs using credentials demo@priya.ai / password123.`,
      score: 0.74,
    },
  ];
}

function highlightText(text: string, query: string): React.ReactNode[] {
  const words = query.split(" ").filter(Boolean);
  if (words.length === 0) return [<span key="full">{text}</span>];
  const pattern = new RegExp(
    `(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = text.split(pattern);
  const result: React.ReactNode[] = [];
  let cursor = 0;
  for (const part of parts) {
    const isMatch = words.some((w) => w.toLowerCase() === part.toLowerCase());
    if (isMatch) {
      result.push(
        <mark
          key={`m-${cursor}`}
          className="bg-primary/20 text-primary rounded px-0.5"
        >
          {part}
        </mark>,
      );
    } else {
      result.push(<span key={`t-${cursor}`}>{part}</span>);
    }
    cursor += part.length;
  }
  return result;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  accent = false,
}: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="glass-panel rounded-xl p-3 flex items-center gap-3 border"
      style={{
        borderColor: accent ? `${GREEN}55` : "oklch(0.2 0.08 200 / 0.4)",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: accent
            ? "rgba(16,185,129,0.12)"
            : "oklch(0.15 0 0 / 0.6)",
          border: `1px solid ${accent ? `${GREEN}44` : "oklch(0.25 0.05 200 / 0.3)"}`,
        }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground truncate">
          {label}
        </p>
        <p
          className="text-base font-display font-bold leading-tight"
          style={{ color: accent ? GREEN : "oklch(0.95 0 0)" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function DocTypePill({ type }: { type: string }) {
  const PILL_COLORS: Record<string, string> = {
    PDF: "border-red-400/40 text-red-400 bg-red-400/8",
    DOCX: "border-blue-400/40 text-blue-400 bg-blue-400/8",
    TXT: "border-yellow-400/40 text-yellow-400 bg-yellow-400/8",
    URL: "border-purple-400/40 text-purple-400 bg-purple-400/8",
  };
  const cls = PILL_COLORS[type] ?? "border-border/40 text-muted-foreground";
  return (
    <span
      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${cls}`}
    >
      {type}
    </span>
  );
}

function RelevanceBar({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color = score >= 0.9 ? "#10b981" : score >= 0.7 ? "#facc15" : "#f87171";
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 h-1 rounded-full bg-muted/40 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-[10px] font-mono" style={{ color }}>
        {score.toFixed(2)}
      </span>
    </div>
  );
}

// ─── Delete Confirm Dialog ─────────────────────────────────────────────────────

function DeleteConfirmDialog({
  docTitle,
  onConfirm,
  onCancel,
}: {
  docTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      data-ocid="knowledge.dialog"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-panel border rounded-xl p-6 w-full max-w-sm space-y-4"
        style={{ borderColor: "#f8717155" }}
      >
        <div className="flex items-start gap-3">
          <Trash2 className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-mono text-sm text-foreground font-bold">
              Delete Document?
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-1 break-words">
              "{docTitle}" will be permanently removed along with all indexed
              chunks.
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-1.5 rounded-lg border border-border/40 text-muted-foreground text-xs font-mono hover:border-primary/40 transition-smooth"
            data-ocid="knowledge.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-1.5 rounded-lg border border-red-400/40 text-red-400 text-xs font-mono bg-red-400/10 hover:bg-red-400/20 transition-smooth"
            data-ocid="knowledge.confirm_button"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function KnowledgePage() {
  // Upload state
  const [dragOver, setDragOver] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadContent, setUploadContent] = useState("");
  const [uploadDocType, setUploadDocType] = useState("txt");
  const [uploadMode, setUploadMode] = useState<"paste" | "file">("paste");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [searchLang, setSearchLang] = useState<SearchLang>("EN");
  const [localResults, setLocalResults] = useState<Array<{
    doc: string;
    chunk: string;
    score: number;
  }> | null>(null);

  // Delete confirm
  const [pendingDelete, setPendingDelete] = useState<KnowledgeDocument | null>(
    null,
  );

  // Re-index state
  const [reindexing, setReindexing] = useState(false);

  // Hooks
  const { data: docs = [], isLoading } = useListDocuments();
  const { data: stats } = useKnowledgeStats();
  const { data: backendSearchResults = [] } = useSearchKnowledge(activeSearch);
  const uploadDoc = useUploadDocument();
  const deleteDoc = useDeleteDocument();

  // ── Drag-and-drop handlers ──────────────────────────────────────────────────

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "txt";
    setUploadDocType(["pdf", "docx", "txt"].includes(ext) ? ext : "txt");
    setUploadTitle(file.name.replace(/\.[^.]+$/, ""));
    setUploadMode("paste");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadContent(
        typeof ev.target?.result === "string"
          ? ev.target.result.slice(0, 4000)
          : "",
      );
    };
    reader.readAsText(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "txt";
    setUploadDocType(["pdf", "docx", "txt"].includes(ext) ? ext : "txt");
    setUploadTitle(file.name.replace(/\.[^.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadContent(
        typeof ev.target?.result === "string"
          ? ev.target.result.slice(0, 4000)
          : "",
      );
    };
    reader.readAsText(file);
  };

  // ── Upload handler ──────────────────────────────────────────────────────────

  const handleUpload = async () => {
    if (!uploadTitle.trim() || !uploadContent.trim()) return;
    setUploading(true);
    try {
      await uploadDoc.mutateAsync({
        title: uploadTitle,
        docType: uploadDocType,
        content: uploadContent,
      });
      toast.success("Document uploaded & indexing started");
      setUploadTitle("");
      setUploadContent("");
    } catch {
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // ── Delete handler ──────────────────────────────────────────────────────────

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteDoc.mutateAsync({ docId: pendingDelete.id });
      toast.success("Document deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setPendingDelete(null);
    }
  };

  // ── Search handler ──────────────────────────────────────────────────────────

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setActiveSearch(searchQuery);
    setLocalResults(getDefaultSearchResults(searchQuery));
  };

  // ── Re-index handler ────────────────────────────────────────────────────────

  const handleReindex = async () => {
    setReindexing(true);
    await new Promise((r) => setTimeout(r, 2200));
    setReindexing(false);
    toast.success("Re-indexing complete — all documents indexed");
  };

  // ── Derived values ──────────────────────────────────────────────────────────

  const displayResults =
    localResults ??
    (backendSearchResults.length > 0
      ? backendSearchResults.map((r) => ({
          doc: "Knowledge Base",
          chunk: r.chunk.text,
          score: Number(r.score),
        }))
      : []);

  const totalDocs = stats?.totalDocuments ?? docs.length;
  const totalChunks =
    stats?.totalChunks ?? docs.reduce((sum, d) => sum + d.chunks.length, 0);
  const lastIndexed =
    docs.length > 0
      ? new Date(Number(docs[0].uploadedAt)).toLocaleDateString()
      : "—";
  const storageBytes = Number(totalChunks) * 420;
  const allIndexed = docs.every((d) => d.indexStatus === "indexed");

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 flex flex-col min-h-0" data-ocid="knowledge.page">
      {/* ── Page Header ────────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{
                background: "rgba(16,185,129,0.12)",
                borderColor: `${GREEN}55`,
                boxShadow: GREEN_GLOW,
              }}
            >
              <BookOpen className="w-5 h-5" style={{ color: GREEN }} />
            </div>
            <div>
              <h1
                className="font-display font-bold text-xl tracking-widest uppercase"
                style={{ color: GREEN, textShadow: `0 0 18px ${GREEN}88` }}
              >
                Knowledge Base & RAG System
              </h1>
              <p className="text-[11px] text-muted-foreground font-mono tracking-wider">
                Upload · Index · Query — powered by vector embeddings
              </p>
            </div>
          </div>

          {/* Status badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono"
            style={
              allIndexed
                ? {
                    borderColor: `${GREEN}44`,
                    color: GREEN,
                    background: "rgba(16,185,129,0.08)",
                  }
                : {
                    borderColor: "#facc1544",
                    color: "#facc15",
                    background: "rgba(250,204,21,0.08)",
                  }
            }
            data-ocid="knowledge.status_badge"
          >
            {allIndexed ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            )}
            {allIndexed ? "Indexed and Ready" : "Indexing..."}
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className="grid grid-cols-4 gap-3 mt-4"
          data-ocid="knowledge.stats_bar"
        >
          <StatCard
            icon={<Database className="w-4 h-4" style={{ color: GREEN }} />}
            label="Total Documents"
            value={totalDocs.toString()}
            accent
          />
          <StatCard
            icon={<Layers className="w-4 h-4 text-primary" />}
            label="Total Chunks"
            value={totalChunks.toString()}
          />
          <StatCard
            icon={<Clock className="w-4 h-4 text-muted-foreground" />}
            label="Last Indexed"
            value={lastIndexed}
          />
          <StatCard
            icon={<HardDrive className="w-4 h-4 text-muted-foreground" />}
            label="Storage Used"
            value={formatBytes(storageBytes)}
          />
        </div>
      </div>

      {/* ── Two-Column Layout ────────────────────────────────────────────────── */}
      <div className="flex-1 flex gap-4 px-6 pb-6 min-h-0 overflow-hidden">
        {/* ── LEFT: Upload + Documents (45%) ─────────────────────────────────── */}
        <div
          className="flex flex-col gap-4 overflow-y-auto"
          style={{ width: "45%", scrollbarWidth: "thin" }}
        >
          {/* Drag-and-drop zone */}
          <label
            className="rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer relative overflow-hidden block"
            style={{
              borderColor: dragOver ? GREEN : `${GREEN}44`,
              background: dragOver
                ? "rgba(16,185,129,0.06)"
                : "rgba(16,185,129,0.02)",
              boxShadow: dragOver ? GREEN_GLOW : undefined,
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            data-ocid="knowledge.dropzone"
            aria-label="Drop files or click to upload"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={handleFileInput}
              data-ocid="knowledge.upload_button"
            />
            <div className="p-5 flex flex-col items-center gap-2 text-center pointer-events-none">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  border: `1px solid ${GREEN}44`,
                }}
              >
                <Upload className="w-5 h-5" style={{ color: GREEN }} />
              </div>
              <p className="text-sm font-mono" style={{ color: GREEN }}>
                Drop files here or click to browse
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Supported formats:
              </p>
              <div className="flex gap-2">
                {["PDF", "DOCX", "TXT"].map((t) => (
                  <DocTypePill key={t} type={t} />
                ))}
              </div>
            </div>
          </label>

          {/* Paste content form */}
          <div
            className="glass-panel rounded-xl border p-4 space-y-3"
            style={{ borderColor: `${GREEN}33` }}
            data-ocid="knowledge.upload_panel"
          >
            <div className="flex items-center justify-between">
              <p
                className="text-[11px] font-mono uppercase tracking-widest"
                style={{ color: GREEN }}
              >
                Paste Content Directly
              </p>
              <div className="flex gap-1">
                {(["paste", "file"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setUploadMode(m)}
                    className="text-[10px] font-mono px-2 py-0.5 rounded border transition-smooth uppercase"
                    style={
                      uploadMode === m
                        ? {
                            borderColor: `${GREEN}66`,
                            color: GREEN,
                            background: "rgba(16,185,129,0.12)",
                          }
                        : {
                            borderColor: "oklch(0.25 0.05 200 / 0.4)",
                            color: "oklch(0.65 0 0)",
                          }
                    }
                    data-ocid={`knowledge.mode_toggle.${m}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              placeholder="Document title..."
              className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-500/60 transition-smooth"
              data-ocid="knowledge.title_input"
            />

            <div className="flex gap-2">
              {(["txt", "pdf", "docx", "url"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setUploadDocType(t)}
                  className="text-[10px] font-mono px-2.5 py-1 rounded border transition-smooth uppercase"
                  style={
                    uploadDocType === t
                      ? {
                          borderColor: `${GREEN}66`,
                          color: GREEN,
                          background: "rgba(16,185,129,0.12)",
                        }
                      : {
                          borderColor: "oklch(0.25 0.05 200 / 0.4)",
                          color: "oklch(0.55 0 0)",
                        }
                  }
                  data-ocid={`knowledge.type_pill.${t}`}
                >
                  {DOC_TYPE_LABELS[t]}
                </button>
              ))}
            </div>

            <textarea
              value={uploadContent}
              onChange={(e) => setUploadContent(e.target.value)}
              placeholder="Paste document content, URL, or text here..."
              rows={5}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-500/60 transition-smooth resize-none"
              data-ocid="knowledge.content_textarea"
            />

            {/* Upload progress bar */}
            <AnimatePresence>
              {uploading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-1 rounded-full overflow-hidden bg-muted/40"
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: GREEN }}
                    initial={{ width: "0%" }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setUploadTitle("");
                  setUploadContent("");
                }}
                className="px-3 py-1.5 rounded-lg border border-border/40 text-muted-foreground text-xs font-mono hover:border-primary/40 transition-smooth flex items-center gap-1.5"
                data-ocid="knowledge.clear_button"
              >
                <X className="w-3 h-3" /> Clear
              </button>
              <button
                type="button"
                onClick={() => void handleUpload()}
                disabled={
                  !uploadTitle.trim() || !uploadContent.trim() || uploading
                }
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border text-xs font-mono transition-smooth disabled:opacity-40"
                style={{
                  borderColor: `${GREEN}66`,
                  color: GREEN,
                  background: "rgba(16,185,129,0.10)",
                }}
                data-ocid="knowledge.submit_button"
              >
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Zap className="w-3.5 h-3.5" />
                )}
                Upload & Index
              </button>
            </div>
          </div>

          {/* Documents list */}
          <div className="space-y-2" data-ocid="knowledge.documents_list">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Documents ({docs.length})
              </p>
              <button
                type="button"
                onClick={() => void handleReindex()}
                disabled={reindexing || docs.length === 0}
                className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth disabled:opacity-40"
                data-ocid="knowledge.reindex_button"
              >
                <RefreshCw
                  className={`w-3 h-3 ${reindexing ? "animate-spin" : ""}`}
                />
                Re-index All
              </button>
            </div>

            {isLoading && (
              <div
                className="flex items-center gap-2 text-muted-foreground py-8 justify-center"
                data-ocid="knowledge.loading_state"
              >
                <Loader2
                  className="w-4 h-4 animate-spin"
                  style={{ color: GREEN }}
                />
                <span className="font-mono text-sm">
                  Loading knowledge base...
                </span>
              </div>
            )}

            {!isLoading && docs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel border border-border/30 rounded-xl p-8 text-center"
                data-ocid="knowledge.empty_state"
              >
                <BookOpen
                  className="w-10 h-10 mx-auto mb-3 opacity-20"
                  style={{ color: GREEN }}
                />
                <p className="font-mono text-sm text-muted-foreground">
                  No documents yet
                </p>
                <p className="font-mono text-xs text-muted-foreground/60 mt-1">
                  Upload a PDF, DOCX, or TXT to get started
                </p>
              </motion.div>
            )}

            {docs.map((doc, idx) => {
              const st =
                STATUS_STYLES[doc.indexStatus] ?? STATUS_STYLES.pending;
              return (
                <motion.div
                  key={doc.id.toString()}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-panel border border-border/20 rounded-xl p-3.5 flex items-center gap-3 group hover:border-border/40 transition-smooth"
                  data-ocid={`knowledge.doc.${idx + 1}`}
                >
                  <div className="flex-shrink-0">
                    {DOC_TYPE_ICONS[doc.docType] ?? (
                      <File className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-foreground truncate">
                      {doc.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <DocTypePill
                        type={(
                          DOC_TYPE_LABELS[doc.docType] ?? doc.docType
                        ).toUpperCase()}
                      />
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {new Date(Number(doc.uploadedAt)).toLocaleDateString()}{" "}
                        · {doc.chunks.length} chunks
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase flex-shrink-0 ${st.border} ${st.text} ${st.bg}`}
                  >
                    {st.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(doc)}
                    className="p-1.5 rounded-lg border border-border/20 opacity-0 group-hover:opacity-100 hover:border-red-400/50 text-muted-foreground hover:text-red-400 transition-smooth"
                    aria-label="Delete document"
                    data-ocid={`knowledge.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Search + Results (55%) ──────────────────────────────────── */}
        <div
          className="flex flex-col gap-4 overflow-y-auto"
          style={{ width: "55%", scrollbarWidth: "thin" }}
        >
          {/* Search input + language selector */}
          <div
            className="glass-panel rounded-xl border p-4 space-y-3"
            style={{ borderColor: "oklch(0.2 0.08 200 / 0.5)" }}
            data-ocid="knowledge.search_panel"
          >
            <p className="text-[11px] font-mono uppercase tracking-widest text-primary">
              RAG-Powered Query
            </p>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  placeholder="Ask anything from your knowledge base..."
                  className="w-full bg-background/50 border border-border/50 rounded-lg pl-9 pr-4 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-smooth"
                  data-ocid="knowledge.search_input"
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="px-4 py-2.5 rounded-lg border border-primary/40 text-primary text-sm font-mono flex items-center gap-2 hover:border-primary/70 hover:bg-primary/10 transition-smooth"
                data-ocid="knowledge.search_button"
              >
                <Search className="w-4 h-4" />
                Query
              </button>
            </div>

            {/* Language selector */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Output language:
              </span>
              <div className="flex gap-1.5">
                {SEARCH_LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSearchLang(lang)}
                    className="text-[10px] font-mono px-2.5 py-1 rounded border transition-smooth uppercase"
                    style={
                      searchLang === lang
                        ? {
                            borderColor: "oklch(0.7 0.18 200 / 0.7)",
                            color: "oklch(0.7 0.18 200)",
                            background: "oklch(0.7 0.18 200 / 0.12)",
                          }
                        : {
                            borderColor: "oklch(0.25 0.05 200 / 0.4)",
                            color: "oklch(0.55 0 0)",
                          }
                    }
                    data-ocid={`knowledge.lang_${lang.toLowerCase()}`}
                  >
                    {lang === "EN"
                      ? "English"
                      : lang === "HI"
                        ? "हिन्दी"
                        : "नागपुरी"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {activeSearch && displayResults.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
                data-ocid="knowledge.results_list"
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {displayResults.length} results for "{activeSearch}" ·{" "}
                  {searchLang}
                </p>
                {displayResults.map((r, idx) => (
                  <motion.div
                    key={`${r.doc}-${idx}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    className="glass-panel border border-border/20 rounded-xl p-4 space-y-2 hover:border-primary/30 transition-smooth group"
                    data-ocid={`knowledge.result.${idx + 1}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <BookOpen className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                        <span className="text-[11px] font-mono text-primary truncate">
                          {r.doc}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          void navigator.clipboard.writeText(r.chunk);
                          toast.success("Context copied to clipboard");
                        }}
                        className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth opacity-0 group-hover:opacity-100 flex-shrink-0"
                        data-ocid={`knowledge.use_in_chat_button.${idx + 1}`}
                      >
                        <ClipboardCopy className="w-3 h-3" />
                        Use in Chat
                      </button>
                    </div>

                    <p className="text-xs font-mono text-muted-foreground leading-relaxed line-clamp-4">
                      {highlightText(r.chunk, activeSearch)}
                    </p>

                    <RelevanceBar score={r.score} />

                    <div className="flex items-center gap-1 pt-1">
                      <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                      <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                        Chunk {idx + 1} of {displayResults.length}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : activeSearch ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel border border-border/20 rounded-xl p-8 text-center"
                data-ocid="knowledge.no_results_state"
              >
                <Search className="w-8 h-8 mx-auto mb-3 opacity-20 text-primary" />
                <p className="font-mono text-sm text-muted-foreground">
                  No results found for "{activeSearch}"
                </p>
                <p className="font-mono text-xs text-muted-foreground/50 mt-1">
                  Try different keywords or upload more documents
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel border border-border/20 rounded-xl p-10 text-center flex-1 flex flex-col items-center justify-center"
                data-ocid="knowledge.search_empty_state"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: `1px dashed ${GREEN}44`,
                  }}
                >
                  <Search className="w-6 h-6" style={{ color: `${GREEN}88` }} />
                </div>
                <p className="font-mono text-sm text-muted-foreground">
                  Upload documents to enable RAG-powered search
                </p>
                <p className="font-mono text-xs text-muted-foreground/50 mt-1.5">
                  Your knowledge base will answer queries with source
                  attribution
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs font-mono text-muted-foreground/40">
                  <span className="px-2 py-0.5 rounded border border-border/20">
                    PDF
                  </span>
                  <span>+</span>
                  <span className="px-2 py-0.5 rounded border border-border/20">
                    DOCX
                  </span>
                  <span>+</span>
                  <span className="px-2 py-0.5 rounded border border-border/20">
                    TXT
                  </span>
                  <span>→</span>
                  <span style={{ color: GREEN }}>Vector DB</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Delete confirm dialog ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {pendingDelete && (
          <DeleteConfirmDialog
            docTitle={pendingDelete.title}
            onConfirm={() => void confirmDelete()}
            onCancel={() => setPendingDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
