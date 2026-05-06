import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Download,
  Eye,
  FileText,
  Loader2,
  Lock,
  MessageSquare,
  Scale,
  Send,
  Shield,
  Trash2,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { mockBackend } from "../mocks/backend";
import type { LegalClause, LegalDocument } from "../types";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface QAEntry {
  question: string;
  answer: string;
  timestamp: Date;
}

// ─── Demo Data ─────────────────────────────────────────────────────────────────

const DEMO_QA: QAEntry[] = [
  {
    question: "Who are the parties involved?",
    answer:
      'The agreement is between ARIA Technologies Pvt. Ltd. ("Licensor") and the end user ("Licensee"). ARIA Technologies grants a limited, non-exclusive license under the terms specified in Section 2.',
    timestamp: new Date(Date.now() - 120000),
  },
];

// ─── Clause config ─────────────────────────────────────────────────────────────

interface ClauseConfig {
  icon: React.ReactNode;
  label: string;
  borderClass: string;
  bgClass: string;
  badgeClass: string;
  textClass: string;
}

const CLAUSE_CONFIG: Record<string, ClauseConfig> = {
  payment: {
    icon: <DollarSign className="w-3.5 h-3.5" />,
    label: "Payment Clause",
    borderClass: "border-yellow-500/40",
    bgClass: "bg-yellow-500/5",
    badgeClass: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
    textClass: "text-yellow-400",
  },
  termination: {
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    label: "Termination Clause",
    borderClass: "border-red-500/40",
    bgClass: "bg-red-500/5",
    badgeClass: "bg-red-500/20 border-red-500/50 text-red-400",
    textClass: "text-red-400",
  },
  confidentiality: {
    icon: <Lock className="w-3.5 h-3.5" />,
    label: "Confidentiality",
    borderClass: "border-blue-400/40",
    bgClass: "bg-blue-400/5",
    badgeClass: "bg-blue-400/20 border-blue-400/50 text-blue-400",
    textClass: "text-blue-400",
  },
  liability: {
    icon: <Scale className="w-3.5 h-3.5" />,
    label: "Liability",
    borderClass: "border-orange-400/40",
    bgClass: "bg-orange-400/5",
    badgeClass: "bg-orange-400/20 border-orange-400/50 text-orange-400",
    textClass: "text-orange-400",
  },
  indemnity: {
    icon: <Shield className="w-3.5 h-3.5" />,
    label: "Indemnity",
    borderClass: "border-purple-400/40",
    bgClass: "bg-purple-400/5",
    badgeClass: "bg-purple-400/20 border-purple-400/50 text-purple-400",
    textClass: "text-purple-400",
  },
  data_processing: {
    icon: <Lock className="w-3.5 h-3.5" />,
    label: "Data Processing",
    borderClass: "border-indigo-400/40",
    bgClass: "bg-indigo-400/5",
    badgeClass: "bg-indigo-400/20 border-indigo-400/50 text-indigo-400",
    textClass: "text-indigo-400",
  },
};

const DEFAULT_CLAUSE_CONFIG: ClauseConfig = {
  icon: <FileText className="w-3.5 h-3.5" />,
  label: "General Clause",
  borderClass: "border-border/30",
  bgClass: "bg-muted/20",
  badgeClass: "bg-muted/30 border-border/40 text-muted-foreground",
  textClass: "text-muted-foreground",
};

const SAMPLE_QUESTIONS = [
  "Who are the parties?",
  "What are the payment terms?",
  "When does this expire?",
  "What are the liability limits?",
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ doc }: { doc: LegalDocument }) {
  if (doc.clauses.length > 0 && doc.summary) {
    return (
      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border bg-green-500/15 border-green-500/40 text-green-400 uppercase tracking-wider">
        ✓ Analyzed
      </span>
    );
  }
  if (doc.summary) {
    return (
      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border bg-blue-400/15 border-blue-400/40 text-blue-400 uppercase tracking-wider">
        Summarized
      </span>
    );
  }
  return (
    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border bg-muted/30 border-border/30 text-muted-foreground uppercase tracking-wider">
      Pending
    </span>
  );
}

function ClauseCard({ clause, index }: { clause: LegalClause; index: number }) {
  const [open, setOpen] = useState(true);
  const cfg = CLAUSE_CONFIG[clause.clauseType] ?? DEFAULT_CLAUSE_CONFIG;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`rounded-lg border ${cfg.borderClass} ${cfg.bgClass} overflow-hidden`}
      data-ocid={`legal.clause.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left"
      >
        <span className={`${cfg.textClass} shrink-0`}>{cfg.icon}</span>
        <span
          className={`text-xs font-mono px-2 py-0.5 rounded border ${cfg.badgeClass} inline-flex items-center gap-1 shrink-0`}
        >
          {cfg.label}
        </span>
        <span className="flex-1 text-[10px] font-mono text-muted-foreground truncate min-w-0">
          pos {clause.id.toString()}
        </span>
        {open ? (
          <ChevronDown className={`w-3.5 h-3.5 ${cfg.textClass} shrink-0`} />
        ) : (
          <ChevronRight className={`w-3.5 h-3.5 ${cfg.textClass} shrink-0`} />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-3 pb-3 text-xs font-mono text-muted-foreground leading-relaxed border-t border-inherit pt-2">
              {clause.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Queries ────────────────────────────────────────────────────────────────────

function useLegalDocs() {
  return useQuery<LegalDocument[]>({
    queryKey: ["legal-docs"],
    queryFn: async () => {
      const docs = await mockBackend.listLegalDocuments();
      return docs.map((d) => ({
        id: d.id,
        title: d.title,
        content: d.content,
        uploadedAt: d.uploadedAt,
        summary: d.summary,
        clauses: d.clauses.map((c) => ({
          id: c.id,
          clauseType: c.clauseType,
          text: c.text,
        })),
      }));
    },
  });
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function LegalPage() {
  const qc = useQueryClient();
  const { data: docs = [], isLoading } = useLegalDocs();
  const [selectedId, setSelectedId] = useState<bigint | null>(BigInt(1));
  const [question, setQuestion] = useState("");
  const [qaHistory, setQaHistory] = useState<QAEntry[]>(DEMO_QA);
  const [docTitle, setDocTitle] = useState("");
  const [docContent, setDocContent] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedDoc = docs.find((d) => d.id === selectedId) ?? null;

  // Upload mutation
  const uploadMut = useMutation({
    mutationFn: async ({ t, c }: { t: string; c: string }) =>
      mockBackend.uploadLegalDocument(t, c),
    onSuccess: (newId) => {
      void qc.invalidateQueries({ queryKey: ["legal-docs"] });
      toast.success("Document uploaded successfully");
      setDocTitle("");
      setDocContent("");
      setSelectedId(newId);
    },
  });

  // Analyze: runs summarize + clause extraction together
  const analyzeMut = useMutation({
    mutationFn: async (docId: bigint) => {
      setIsAnalyzing(true);
      await mockBackend.summarizeLegalDocument(docId);
      await mockBackend.extractDocumentClauses(docId);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["legal-docs"] });
      setIsAnalyzing(false);
      toast.success("Document analyzed — summary and clauses extracted");
    },
    onError: () => {
      setIsAnalyzing(false);
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (docId: bigint) => mockBackend.deleteLegalDocument(docId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["legal-docs"] });
      setSelectedId(null);
      toast.success("Document deleted");
    },
  });

  const askMut = useMutation({
    mutationFn: async ({ docId, q }: { docId: bigint; q: string }) =>
      mockBackend.askDocumentQuestion(docId, q),
    onSuccess: (answer, { q }) => {
      setQaHistory((prev) => [
        { question: q, answer, timestamp: new Date() },
        ...prev,
      ]);
      setQuestion("");
    },
  });

  // File drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setDocTitle(file.name.replace(/\.[^.]+$/, ""));
      setDocContent((ev.target?.result as string) ?? "");
    };
    reader.readAsText(file);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setDocTitle(file.name.replace(/\.[^.]+$/, ""));
        setDocContent((ev.target?.result as string) ?? "");
      };
      reader.readAsText(file);
    },
    [],
  );

  const handleExport = useCallback(() => {
    if (!selectedDoc) return;
    let content = `# ${selectedDoc.title}\n`;
    content += `Uploaded: ${new Date(Number(selectedDoc.uploadedAt)).toLocaleString()}\n\n`;
    if (selectedDoc.summary) {
      content += `## Summary\n${selectedDoc.summary}\n\n`;
    }
    if (selectedDoc.clauses.length > 0) {
      content += `## Clauses (${selectedDoc.clauses.length})\n`;
      selectedDoc.clauses.forEach((c, i) => {
        content += `\n### ${i + 1}. ${c.clauseType.replace("_", " ").toUpperCase()}\n${c.text}\n`;
      });
    }
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedDoc.title.replace(/\s+/g, "_")}_summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Summary exported");
  }, [selectedDoc]);

  const submitQuestion = useCallback(
    (q: string) => {
      if (!selectedDoc || !q.trim()) return;
      void askMut.mutateAsync({ docId: selectedDoc.id, q: q.trim() });
    },
    [selectedDoc, askMut],
  );

  return (
    <div
      className="flex-1 flex flex-col h-full overflow-hidden"
      data-ocid="legal.page"
    >
      {/* ── Header ── */}
      <div className="px-6 pt-5 pb-4 border-b border-indigo-500/20 bg-card/60 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl border border-indigo-500/50 flex items-center justify-center"
            style={{ boxShadow: "0 0 14px oklch(62% 0.2 270 / 0.4)" }}
          >
            <Scale className="w-4.5 h-4.5 text-indigo-400" />
          </div>
          <div>
            <h1
              className="font-display font-bold text-lg tracking-widest uppercase text-foreground"
              style={{ textShadow: "0 0 18px oklch(62% 0.2 270 / 0.7)" }}
            >
              Legal AI &amp; Document Analysis
            </h1>
            <p className="text-[10px] font-mono text-indigo-400/70 tracking-wider uppercase">
              Upload · Analyze · Summarize · Extract Clauses · Q&amp;A
            </p>
          </div>
        </div>
      </div>

      {/* ── Three-Panel Layout ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── PANEL 1: Upload & Doc List (30%) ── */}
        <div className="w-[30%] border-r border-indigo-500/15 flex flex-col overflow-hidden bg-background/30">
          <div className="p-4 border-b border-indigo-500/15 shrink-0">
            <p className="hud-label text-indigo-400/80 mb-3">Upload Document</p>

            {/* Drag-and-drop zone */}
            <button
              type="button"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                w-full relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-smooth
                ${
                  isDragging
                    ? "border-indigo-400 bg-indigo-400/10"
                    : "border-indigo-500/30 hover:border-indigo-400/60 hover:bg-indigo-400/5"
                }
              `}
              data-ocid="legal.dropzone"
            >
              <Upload className="w-6 h-6 text-indigo-400/60 mx-auto mb-1.5" />
              <p className="text-[11px] font-mono text-indigo-400/70">
                Drop PDF, DOCX, TXT
              </p>
              <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2 my-3">
              <div className="flex-1 h-px bg-border/30" />
              <span className="text-[9px] font-mono text-muted-foreground uppercase">
                or paste text
              </span>
              <div className="flex-1 h-px bg-border/30" />
            </div>

            {/* Text paste form */}
            <div className="space-y-2">
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="Document title..."
                className="w-full bg-input/60 border border-indigo-500/20 focus:border-indigo-400/60 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none transition-smooth placeholder:text-muted-foreground/50"
                data-ocid="legal.title_input"
              />
              <textarea
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                placeholder="Paste legal document text here..."
                rows={4}
                className="w-full bg-input/60 border border-indigo-500/20 focus:border-indigo-400/60 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none transition-smooth resize-none placeholder:text-muted-foreground/50"
                data-ocid="legal.content_textarea"
              />
              <button
                type="button"
                onClick={() =>
                  void uploadMut.mutateAsync({ t: docTitle, c: docContent })
                }
                disabled={
                  !docTitle.trim() || !docContent.trim() || uploadMut.isPending
                }
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-smooth"
                data-ocid="legal.upload_button"
              >
                {uploadMut.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                {uploadMut.isPending ? "Uploading..." : "Upload Document"}
              </button>
            </div>
          </div>

          {/* Document list */}
          <div
            className="flex-1 overflow-y-auto p-3 space-y-1.5"
            data-ocid="legal.doc_list"
          >
            <p className="hud-label text-muted-foreground mb-2">
              Documents ({docs.length})
            </p>

            {isLoading && (
              <div
                className="flex items-center gap-2 py-6 justify-center"
                data-ocid="legal.loading_state"
              >
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span className="text-xs font-mono text-muted-foreground">
                  Loading...
                </span>
              </div>
            )}

            {!isLoading && docs.length === 0 && (
              <div className="py-8 text-center" data-ocid="legal.empty_state">
                <FileText className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
                <p className="text-xs font-mono text-muted-foreground">
                  No documents yet
                </p>
              </div>
            )}

            {docs.map((doc, idx) => (
              <motion.button
                key={doc.id.toString()}
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  setSelectedId(doc.id);
                  setQaHistory(doc.id === BigInt(1) ? DEMO_QA : []);
                }}
                className={`
                  w-full text-left rounded-xl p-3 border transition-smooth group
                  ${
                    selectedId === doc.id
                      ? "border-indigo-500/60 bg-indigo-500/10"
                      : "border-border/20 bg-card/40 hover:border-indigo-500/30 hover:bg-indigo-500/5"
                  }
                `}
                data-ocid={`legal.doc.${idx + 1}`}
              >
                <div className="flex items-start gap-2">
                  <FileText
                    className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${selectedId === doc.id ? "text-indigo-400" : "text-muted-foreground"}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono text-foreground truncate leading-snug">
                      {doc.title}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      {new Date(Number(doc.uploadedAt)).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </p>
                    <div className="mt-1.5">
                      <StatusBadge doc={doc} />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      void deleteMut.mutateAsync(doc.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center rounded text-destructive hover:bg-destructive/10 transition-smooth shrink-0"
                    data-ocid={`legal.delete_button.${idx + 1}`}
                    aria-label="Delete document"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── PANEL 2: Analysis (center 40%) ── */}
        <div className="w-[40%] border-r border-indigo-500/15 flex flex-col overflow-hidden">
          {!selectedDoc ? (
            <div
              className="flex-1 flex items-center justify-center"
              data-ocid="legal.select_state"
            >
              <div className="text-center p-8">
                <div
                  className="w-16 h-16 rounded-2xl border border-indigo-500/20 flex items-center justify-center mx-auto mb-4"
                  style={{ boxShadow: "0 0 30px oklch(62% 0.2 270 / 0.1)" }}
                >
                  <Scale className="w-7 h-7 text-indigo-500/30" />
                </div>
                <p className="text-sm font-mono text-muted-foreground">
                  Select a document to analyze
                </p>
                <p className="text-xs font-mono text-muted-foreground/50 mt-1">
                  Upload or choose from your library
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Doc info header */}
              <div className="px-4 pt-4 pb-3 border-b border-indigo-500/15 shrink-0 bg-indigo-500/5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-mono font-semibold text-foreground truncate">
                      {selectedDoc.title}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      Uploaded{" "}
                      {new Date(Number(selectedDoc.uploadedAt)).toLocaleString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                      {" · "}
                      {Math.ceil(selectedDoc.content.length / 1000)}KB
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <StatusBadge doc={selectedDoc} />
                    <button
                      type="button"
                      onClick={() => void deleteMut.mutateAsync(selectedDoc.id)}
                      className="w-6 h-6 flex items-center justify-center rounded text-destructive hover:bg-destructive/10 transition-smooth"
                      data-ocid="legal.delete_button"
                      aria-label="Delete document"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Analyze button */}
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => void analyzeMut.mutateAsync(selectedDoc.id)}
                    disabled={analyzeMut.isPending || isAnalyzing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-[11px] font-mono disabled:opacity-50 transition-smooth"
                    data-ocid="legal.analyze_button"
                  >
                    {analyzeMut.isPending || isAnalyzing ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Eye className="w-3 h-3" />
                    )}
                    Analyze Document
                  </button>
                  {(selectedDoc.summary ?? selectedDoc.clauses.length > 0) && (
                    <button
                      type="button"
                      onClick={handleExport}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/30 hover:border-indigo-500/30 text-muted-foreground hover:text-indigo-400 text-[11px] font-mono transition-smooth"
                      data-ocid="legal.export_button"
                    >
                      <Download className="w-3 h-3" />
                      Export
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable analysis area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Analyzing animation */}
                <AnimatePresence>
                  {(analyzeMut.isPending || isAnalyzing) && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="glass-panel rounded-xl p-4 border border-indigo-500/30 scanline-overlay"
                      data-ocid="legal.analyzing_state"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 shrink-0">
                          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-ping" />
                          <div className="absolute inset-1 rounded-full bg-indigo-500/20 animate-pulse" />
                          <Loader2 className="absolute inset-1.5 w-5 h-5 text-indigo-400 animate-spin" />
                        </div>
                        <div>
                          <p className="text-xs font-mono text-indigo-400 font-semibold">
                            Priya is analyzing your document...
                          </p>
                          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                            Running RAG extraction · Clause detection · Risk
                            scoring
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 h-0.5 w-full bg-muted/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-400 rounded-full animate-pulse"
                          style={{ width: "60%" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Summary section */}
                {selectedDoc.summary && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-teal-400/30 bg-teal-400/5 overflow-hidden"
                    data-ocid="legal.summary_card"
                  >
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-teal-400/20 bg-teal-400/10">
                      <div className="w-1 h-4 rounded-full bg-teal-400 shrink-0" />
                      <p className="hud-label text-teal-400">AI Summary</p>
                    </div>
                    <p className="px-4 py-3 text-xs font-mono text-muted-foreground leading-relaxed">
                      {selectedDoc.summary}
                    </p>
                  </motion.div>
                )}

                {/* Clauses section */}
                {selectedDoc.clauses.length > 0 && (
                  <div className="space-y-2" data-ocid="legal.clauses_section">
                    <div className="flex items-center gap-2">
                      <p className="hud-label text-muted-foreground">
                        Extracted Clauses ({selectedDoc.clauses.length})
                      </p>
                    </div>
                    {selectedDoc.clauses.map((clause, ci) => (
                      <ClauseCard
                        key={clause.id.toString()}
                        clause={clause}
                        index={ci}
                      />
                    ))}
                  </div>
                )}

                {/* Empty analysis state */}
                {!selectedDoc.summary &&
                  selectedDoc.clauses.length === 0 &&
                  !analyzeMut.isPending &&
                  !isAnalyzing && (
                    <div
                      className="text-center py-10"
                      data-ocid="legal.analysis_empty_state"
                    >
                      <Eye className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
                      <p className="text-xs font-mono text-muted-foreground">
                        Click "Analyze Document" to generate a summary and
                        extract clauses
                      </p>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>

        {/* ── PANEL 3: Q&A (right 30%) ── */}
        <div className="w-[30%] flex flex-col overflow-hidden bg-background/20">
          <div className="px-4 pt-4 pb-3 border-b border-indigo-500/15 shrink-0">
            <p className="hud-label text-indigo-400/80 mb-1">
              Document Q&amp;A
            </p>
            <p className="text-[10px] font-mono text-muted-foreground">
              {selectedDoc
                ? `Ask about "${selectedDoc.title}"`
                : "Select a document first"}
            </p>
          </div>

          {/* Q&A history */}
          <div
            className="flex-1 overflow-y-auto p-3 space-y-3"
            data-ocid="legal.qa_history"
          >
            {qaHistory.length === 0 && (
              <div
                className="text-center py-8"
                data-ocid="legal.qa_empty_state"
              >
                <MessageSquare className="w-7 h-7 text-muted-foreground/20 mx-auto mb-2" />
                <p className="text-[11px] font-mono text-muted-foreground">
                  No questions yet. Ask anything about the document.
                </p>
              </div>
            )}
            {qaHistory.map((entry, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <motion.div
                key={`qa-${entry.timestamp.getTime()}-${idx}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="space-y-1.5"
                data-ocid={`legal.qa.${idx + 1}`}
              >
                {/* User question */}
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-indigo-500/15 border border-indigo-500/30 rounded-xl rounded-tr-sm px-3 py-2 max-w-[90%]">
                    <p className="text-[11px] font-mono text-indigo-300 leading-snug">
                      {entry.question}
                    </p>
                  </div>
                </div>
                {/* Priya answer */}
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Scale className="w-2.5 h-2.5 text-indigo-400" />
                  </div>
                  <div className="bg-card/60 border-l-2 border-indigo-500/50 rounded-xl rounded-tl-sm px-3 py-2.5 flex-1">
                    <p className="text-[11px] font-mono text-foreground leading-relaxed">
                      {entry.answer}
                    </p>
                    <p className="text-[9px] font-mono text-muted-foreground mt-1.5">
                      {entry.timestamp.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Loading answer state */}
            {askMut.isPending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
                data-ocid="legal.qa_loading_state"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                  <Loader2 className="w-2.5 h-2.5 text-indigo-400 animate-spin" />
                </div>
                <div className="bg-card/60 border-l-2 border-indigo-500/30 rounded-xl px-3 py-2.5">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sample question pills */}
          {selectedDoc && (
            <div className="px-3 py-2 border-t border-indigo-500/10 shrink-0">
              <div
                className="flex flex-wrap gap-1.5"
                data-ocid="legal.sample_questions"
              >
                {SAMPLE_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setQuestion(q);
                    }}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-indigo-500/25 text-indigo-400/70 hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-500/10 transition-smooth"
                    data-ocid="legal.sample_question_pill"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="p-3 border-t border-indigo-500/20 bg-card/30 shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && question.trim() && selectedDoc) {
                    submitQuestion(question);
                  }
                }}
                placeholder={
                  selectedDoc
                    ? "Ask about this document..."
                    : "Select a document first..."
                }
                disabled={!selectedDoc || askMut.isPending}
                className="flex-1 bg-input/50 border border-indigo-500/20 focus:border-indigo-400/60 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none transition-smooth placeholder:text-muted-foreground/40 disabled:opacity-40"
                data-ocid="legal.question_input"
              />
              <button
                type="button"
                onClick={() => submitQuestion(question)}
                disabled={!selectedDoc || !question.trim() || askMut.isPending}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed transition-smooth shrink-0"
                data-ocid="legal.ask_button"
                aria-label="Ask question"
              >
                {askMut.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
