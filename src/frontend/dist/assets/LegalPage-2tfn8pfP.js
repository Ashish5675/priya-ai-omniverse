import { f as useQueryClient, r as reactExports, g as useMutation, b as ue, j as jsxRuntimeExports, y as Scale, m as motion, A as AnimatePresence, e as useQuery, t as mockBackend, C as ChevronRight, S as Shield } from "./index-Khuvrpqq.js";
import { U as Upload } from "./upload-DU9VWZEO.js";
import { L as LoaderCircle } from "./loader-circle-CP0fZB5d.js";
import { F as FileText } from "./file-text-lUOGEMv0.js";
import { T as Trash2 } from "./trash-2-BpPdCVwr.js";
import { E as Eye } from "./eye-flE3EMrY.js";
import { D as Download } from "./download-CWzM3EmD.js";
import { M as MessageSquare, D as DollarSign } from "./message-square-0Y9uutsd.js";
import { S as Send } from "./send-D1wP-YNk.js";
import { C as ChevronDown } from "./chevron-down-DSDUGHV4.js";
import { L as Lock } from "./lock-CugnE4Qv.js";
import { T as TriangleAlert } from "./triangle-alert-BkETKDKG.js";
const DEMO_QA = [
  {
    question: "Who are the parties involved?",
    answer: 'The agreement is between ARIA Technologies Pvt. Ltd. ("Licensor") and the end user ("Licensee"). ARIA Technologies grants a limited, non-exclusive license under the terms specified in Section 2.',
    timestamp: new Date(Date.now() - 12e4)
  }
];
const CLAUSE_CONFIG = {
  payment: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3.5 h-3.5" }),
    label: "Payment Clause",
    borderClass: "border-yellow-500/40",
    bgClass: "bg-yellow-500/5",
    badgeClass: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
    textClass: "text-yellow-400"
  },
  termination: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
    label: "Termination Clause",
    borderClass: "border-red-500/40",
    bgClass: "bg-red-500/5",
    badgeClass: "bg-red-500/20 border-red-500/50 text-red-400",
    textClass: "text-red-400"
  },
  confidentiality: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }),
    label: "Confidentiality",
    borderClass: "border-blue-400/40",
    bgClass: "bg-blue-400/5",
    badgeClass: "bg-blue-400/20 border-blue-400/50 text-blue-400",
    textClass: "text-blue-400"
  },
  liability: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-3.5 h-3.5" }),
    label: "Liability",
    borderClass: "border-orange-400/40",
    bgClass: "bg-orange-400/5",
    badgeClass: "bg-orange-400/20 border-orange-400/50 text-orange-400",
    textClass: "text-orange-400"
  },
  indemnity: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
    label: "Indemnity",
    borderClass: "border-purple-400/40",
    bgClass: "bg-purple-400/5",
    badgeClass: "bg-purple-400/20 border-purple-400/50 text-purple-400",
    textClass: "text-purple-400"
  },
  data_processing: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }),
    label: "Data Processing",
    borderClass: "border-indigo-400/40",
    bgClass: "bg-indigo-400/5",
    badgeClass: "bg-indigo-400/20 border-indigo-400/50 text-indigo-400",
    textClass: "text-indigo-400"
  }
};
const DEFAULT_CLAUSE_CONFIG = {
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
  label: "General Clause",
  borderClass: "border-border/30",
  bgClass: "bg-muted/20",
  badgeClass: "bg-muted/30 border-border/40 text-muted-foreground",
  textClass: "text-muted-foreground"
};
const SAMPLE_QUESTIONS = [
  "Who are the parties?",
  "What are the payment terms?",
  "When does this expire?",
  "What are the liability limits?"
];
function StatusBadge({ doc }) {
  if (doc.clauses.length > 0 && doc.summary) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono px-1.5 py-0.5 rounded border bg-green-500/15 border-green-500/40 text-green-400 uppercase tracking-wider", children: "✓ Analyzed" });
  }
  if (doc.summary) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono px-1.5 py-0.5 rounded border bg-blue-400/15 border-blue-400/40 text-blue-400 uppercase tracking-wider", children: "Summarized" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono px-1.5 py-0.5 rounded border bg-muted/30 border-border/30 text-muted-foreground uppercase tracking-wider", children: "Pending" });
}
function ClauseCard({ clause, index }) {
  const [open, setOpen] = reactExports.useState(true);
  const cfg = CLAUSE_CONFIG[clause.clauseType] ?? DEFAULT_CLAUSE_CONFIG;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06 },
      className: `rounded-lg border ${cfg.borderClass} ${cfg.bgClass} overflow-hidden`,
      "data-ocid": `legal.clause.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-center gap-2 px-3 py-2.5 text-left",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${cfg.textClass} shrink-0`, children: cfg.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-mono px-2 py-0.5 rounded border ${cfg.badgeClass} inline-flex items-center gap-1 shrink-0`,
                  children: cfg.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 text-[10px] font-mono text-muted-foreground truncate min-w-0", children: [
                "pos ",
                clause.id.toString()
              ] }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `w-3.5 h-3.5 ${cfg.textClass} shrink-0` }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: `w-3.5 h-3.5 ${cfg.textClass} shrink-0` })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pb-3 text-xs font-mono text-muted-foreground leading-relaxed border-t border-inherit pt-2", children: clause.text })
          }
        ) })
      ]
    }
  );
}
function useLegalDocs() {
  return useQuery({
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
          text: c.text
        }))
      }));
    }
  });
}
function LegalPage() {
  const qc = useQueryClient();
  const { data: docs = [], isLoading } = useLegalDocs();
  const [selectedId, setSelectedId] = reactExports.useState(BigInt(1));
  const [question, setQuestion] = reactExports.useState("");
  const [qaHistory, setQaHistory] = reactExports.useState(DEMO_QA);
  const [docTitle, setDocTitle] = reactExports.useState("");
  const [docContent, setDocContent] = reactExports.useState("");
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [isAnalyzing, setIsAnalyzing] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const selectedDoc = docs.find((d) => d.id === selectedId) ?? null;
  const uploadMut = useMutation({
    mutationFn: async ({ t, c }) => mockBackend.uploadLegalDocument(t, c),
    onSuccess: (newId) => {
      void qc.invalidateQueries({ queryKey: ["legal-docs"] });
      ue.success("Document uploaded successfully");
      setDocTitle("");
      setDocContent("");
      setSelectedId(newId);
    }
  });
  const analyzeMut = useMutation({
    mutationFn: async (docId) => {
      setIsAnalyzing(true);
      await mockBackend.summarizeLegalDocument(docId);
      await mockBackend.extractDocumentClauses(docId);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["legal-docs"] });
      setIsAnalyzing(false);
      ue.success("Document analyzed — summary and clauses extracted");
    },
    onError: () => {
      setIsAnalyzing(false);
    }
  });
  const deleteMut = useMutation({
    mutationFn: async (docId) => mockBackend.deleteLegalDocument(docId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["legal-docs"] });
      setSelectedId(null);
      ue.success("Document deleted");
    }
  });
  const askMut = useMutation({
    mutationFn: async ({ docId, q }) => mockBackend.askDocumentQuestion(docId, q),
    onSuccess: (answer, { q }) => {
      setQaHistory((prev) => [
        { question: q, answer, timestamp: /* @__PURE__ */ new Date() },
        ...prev
      ]);
      setQuestion("");
    }
  });
  const handleDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = reactExports.useCallback(() => setIsDragging(false), []);
  const handleDrop = reactExports.useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a;
      setDocTitle(file.name.replace(/\.[^.]+$/, ""));
      setDocContent(((_a = ev.target) == null ? void 0 : _a.result) ?? "");
    };
    reader.readAsText(file);
  }, []);
  const handleFileSelect = reactExports.useCallback(
    (e) => {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        var _a2;
        setDocTitle(file.name.replace(/\.[^.]+$/, ""));
        setDocContent(((_a2 = ev.target) == null ? void 0 : _a2.result) ?? "");
      };
      reader.readAsText(file);
    },
    []
  );
  const handleExport = reactExports.useCallback(() => {
    if (!selectedDoc) return;
    let content = `# ${selectedDoc.title}
`;
    content += `Uploaded: ${new Date(Number(selectedDoc.uploadedAt)).toLocaleString()}

`;
    if (selectedDoc.summary) {
      content += `## Summary
${selectedDoc.summary}

`;
    }
    if (selectedDoc.clauses.length > 0) {
      content += `## Clauses (${selectedDoc.clauses.length})
`;
      selectedDoc.clauses.forEach((c, i) => {
        content += `
### ${i + 1}. ${c.clauseType.replace("_", " ").toUpperCase()}
${c.text}
`;
      });
    }
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedDoc.title.replace(/\s+/g, "_")}_summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
    ue.success("Summary exported");
  }, [selectedDoc]);
  const submitQuestion = reactExports.useCallback(
    (q) => {
      if (!selectedDoc || !q.trim()) return;
      void askMut.mutateAsync({ docId: selectedDoc.id, q: q.trim() });
    },
    [selectedDoc, askMut]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col h-full overflow-hidden",
      "data-ocid": "legal.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-5 pb-4 border-b border-indigo-500/20 bg-card/60 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-9 h-9 rounded-xl border border-indigo-500/50 flex items-center justify-center",
              style: { boxShadow: "0 0 14px oklch(62% 0.2 270 / 0.4)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-4.5 h-4.5 text-indigo-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display font-bold text-lg tracking-widest uppercase text-foreground",
                style: { textShadow: "0 0 18px oklch(62% 0.2 270 / 0.7)" },
                children: "Legal AI & Document Analysis"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-indigo-400/70 tracking-wider uppercase", children: "Upload · Analyze · Summarize · Extract Clauses · Q&A" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[30%] border-r border-indigo-500/15 flex flex-col overflow-hidden bg-background/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-indigo-500/15 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label text-indigo-400/80 mb-3", children: "Upload Document" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onDragOver: handleDragOver,
                  onDragLeave: handleDragLeave,
                  onDrop: handleDrop,
                  onClick: () => {
                    var _a;
                    return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                  },
                  className: `
                w-full relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-smooth
                ${isDragging ? "border-indigo-400 bg-indigo-400/10" : "border-indigo-500/30 hover:border-indigo-400/60 hover:bg-indigo-400/5"}
              `,
                  "data-ocid": "legal.dropzone",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-indigo-400/60 mx-auto mb-1.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-indigo-400/70", children: "Drop PDF, DOCX, TXT" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground mt-0.5", children: "or click to browse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        ref: fileInputRef,
                        type: "file",
                        accept: ".pdf,.docx,.txt",
                        onChange: handleFileSelect,
                        className: "hidden"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 my-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground uppercase", children: "or paste text" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/30" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: docTitle,
                    onChange: (e) => setDocTitle(e.target.value),
                    placeholder: "Document title...",
                    className: "w-full bg-input/60 border border-indigo-500/20 focus:border-indigo-400/60 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none transition-smooth placeholder:text-muted-foreground/50",
                    "data-ocid": "legal.title_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    value: docContent,
                    onChange: (e) => setDocContent(e.target.value),
                    placeholder: "Paste legal document text here...",
                    rows: 4,
                    className: "w-full bg-input/60 border border-indigo-500/20 focus:border-indigo-400/60 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none transition-smooth resize-none placeholder:text-muted-foreground/50",
                    "data-ocid": "legal.content_textarea"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => void uploadMut.mutateAsync({ t: docTitle, c: docContent }),
                    disabled: !docTitle.trim() || !docContent.trim() || uploadMut.isPending,
                    className: "w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-mono disabled:opacity-40 disabled:cursor-not-allowed transition-smooth",
                    "data-ocid": "legal.upload_button",
                    children: [
                      uploadMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
                      uploadMut.isPending ? "Uploading..." : "Upload Document"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-1 overflow-y-auto p-3 space-y-1.5",
                "data-ocid": "legal.doc_list",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "hud-label text-muted-foreground mb-2", children: [
                    "Documents (",
                    docs.length,
                    ")"
                  ] }),
                  isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 py-6 justify-center",
                      "data-ocid": "legal.loading_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-indigo-400" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: "Loading..." })
                      ]
                    }
                  ),
                  !isLoading && docs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center", "data-ocid": "legal.empty_state", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-muted-foreground/20 mx-auto mb-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: "No documents yet" })
                  ] }),
                  docs.map((doc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "button",
                      initial: { opacity: 0, x: -8 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: idx * 0.05 },
                      onClick: () => {
                        setSelectedId(doc.id);
                        setQaHistory(doc.id === BigInt(1) ? DEMO_QA : []);
                      },
                      className: `
                  w-full text-left rounded-xl p-3 border transition-smooth group
                  ${selectedId === doc.id ? "border-indigo-500/60 bg-indigo-500/10" : "border-border/20 bg-card/40 hover:border-indigo-500/30 hover:bg-indigo-500/5"}
                `,
                      "data-ocid": `legal.doc.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          FileText,
                          {
                            className: `w-3.5 h-3.5 mt-0.5 shrink-0 ${selectedId === doc.id ? "text-indigo-400" : "text-muted-foreground"}`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground truncate leading-snug", children: doc.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground mt-0.5", children: new Date(Number(doc.uploadedAt)).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { doc }) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: (e) => {
                              e.stopPropagation();
                              void deleteMut.mutateAsync(doc.id);
                            },
                            className: "opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center rounded text-destructive hover:bg-destructive/10 transition-smooth shrink-0",
                            "data-ocid": `legal.delete_button.${idx + 1}`,
                            "aria-label": "Delete document",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                          }
                        )
                      ] })
                    },
                    doc.id.toString()
                  ))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[40%] border-r border-indigo-500/15 flex flex-col overflow-hidden", children: !selectedDoc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 flex items-center justify-center",
              "data-ocid": "legal.select_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-2xl border border-indigo-500/20 flex items-center justify-center mx-auto mb-4",
                    style: { boxShadow: "0 0 30px oklch(62% 0.2 270 / 0.1)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-7 h-7 text-indigo-500/30" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-muted-foreground", children: "Select a document to analyze" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground/50 mt-1", children: "Upload or choose from your library" })
              ] })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-indigo-500/15 shrink-0 bg-indigo-500/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-semibold text-foreground truncate", children: selectedDoc.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground mt-0.5", children: [
                    "Uploaded",
                    " ",
                    new Date(Number(selectedDoc.uploadedAt)).toLocaleString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      }
                    ),
                    " · ",
                    Math.ceil(selectedDoc.content.length / 1e3),
                    "KB"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { doc: selectedDoc }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => void deleteMut.mutateAsync(selectedDoc.id),
                      className: "w-6 h-6 flex items-center justify-center rounded text-destructive hover:bg-destructive/10 transition-smooth",
                      "data-ocid": "legal.delete_button",
                      "aria-label": "Delete document",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => void analyzeMut.mutateAsync(selectedDoc.id),
                    disabled: analyzeMut.isPending || isAnalyzing,
                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-[11px] font-mono disabled:opacity-50 transition-smooth",
                    "data-ocid": "legal.analyze_button",
                    children: [
                      analyzeMut.isPending || isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                      "Analyze Document"
                    ]
                  }
                ),
                (selectedDoc.summary ?? selectedDoc.clauses.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleExport,
                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/30 hover:border-indigo-500/30 text-muted-foreground hover:text-indigo-400 text-[11px] font-mono transition-smooth",
                    "data-ocid": "legal.export_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                      "Export"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: (analyzeMut.isPending || isAnalyzing) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: -8 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -8 },
                  className: "glass-panel rounded-xl p-4 border border-indigo-500/30 scanline-overlay",
                  "data-ocid": "legal.analyzing_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-8 h-8 shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-ping" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-1 rounded-full bg-indigo-500/20 animate-pulse" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "absolute inset-1.5 w-5 h-5 text-indigo-400 animate-spin" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-indigo-400 font-semibold", children: "Priya is analyzing your document..." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground mt-0.5", children: "Running RAG extraction · Clause detection · Risk scoring" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-0.5 w-full bg-muted/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full bg-indigo-400 rounded-full animate-pulse",
                        style: { width: "60%" }
                      }
                    ) })
                  ]
                }
              ) }),
              selectedDoc.summary && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  className: "rounded-xl border border-teal-400/30 bg-teal-400/5 overflow-hidden",
                  "data-ocid": "legal.summary_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2.5 border-b border-teal-400/20 bg-teal-400/10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-4 rounded-full bg-teal-400 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label text-teal-400", children: "AI Summary" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 py-3 text-xs font-mono text-muted-foreground leading-relaxed", children: selectedDoc.summary })
                  ]
                }
              ),
              selectedDoc.clauses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "legal.clauses_section", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "hud-label text-muted-foreground", children: [
                  "Extracted Clauses (",
                  selectedDoc.clauses.length,
                  ")"
                ] }) }),
                selectedDoc.clauses.map((clause, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ClauseCard,
                  {
                    clause,
                    index: ci
                  },
                  clause.id.toString()
                ))
              ] }),
              !selectedDoc.summary && selectedDoc.clauses.length === 0 && !analyzeMut.isPending && !isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center py-10",
                  "data-ocid": "legal.analysis_empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-8 h-8 text-muted-foreground/20 mx-auto mb-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: 'Click "Analyze Document" to generate a summary and extract clauses' })
                  ]
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[30%] flex flex-col overflow-hidden bg-background/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-indigo-500/15 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label text-indigo-400/80 mb-1", children: "Document Q&A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground", children: selectedDoc ? `Ask about "${selectedDoc.title}"` : "Select a document first" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-1 overflow-y-auto p-3 space-y-3",
                "data-ocid": "legal.qa_history",
                children: [
                  qaHistory.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "text-center py-8",
                      "data-ocid": "legal.qa_empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-7 h-7 text-muted-foreground/20 mx-auto mb-2" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-muted-foreground", children: "No questions yet. Ask anything about the document." })
                      ]
                    }
                  ),
                  qaHistory.map((entry, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: idx * 0.04 },
                        className: "space-y-1.5",
                        "data-ocid": `legal.qa.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-2 justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-indigo-500/15 border border-indigo-500/30 rounded-xl rounded-tr-sm px-3 py-2 max-w-[90%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-indigo-300 leading-snug", children: entry.question }) }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "w-2.5 h-2.5 text-indigo-400" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/60 border-l-2 border-indigo-500/50 rounded-xl rounded-tl-sm px-3 py-2.5 flex-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-foreground leading-relaxed", children: entry.answer }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-mono text-muted-foreground mt-1.5", children: entry.timestamp.toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit"
                              }) })
                            ] })
                          ] })
                        ]
                      },
                      `qa-${entry.timestamp.getTime()}-${idx}`
                    )
                  )),
                  askMut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      className: "flex items-center gap-2",
                      "data-ocid": "legal.qa_loading_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-2.5 h-2.5 text-indigo-400 animate-spin" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card/60 border-l-2 border-indigo-500/30 rounded-xl px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce",
                            style: { animationDelay: `${i * 0.15}s` }
                          },
                          i
                        )) }) })
                      ]
                    }
                  )
                ]
              }
            ),
            selectedDoc && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 border-t border-indigo-500/10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex flex-wrap gap-1.5",
                "data-ocid": "legal.sample_questions",
                children: SAMPLE_QUESTIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setQuestion(q);
                    },
                    className: "text-[10px] font-mono px-2.5 py-1 rounded-full border border-indigo-500/25 text-indigo-400/70 hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-500/10 transition-smooth",
                    "data-ocid": "legal.sample_question_pill",
                    children: q
                  },
                  q
                ))
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-indigo-500/20 bg-card/30 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: question,
                  onChange: (e) => setQuestion(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && question.trim() && selectedDoc) {
                      submitQuestion(question);
                    }
                  },
                  placeholder: selectedDoc ? "Ask about this document..." : "Select a document first...",
                  disabled: !selectedDoc || askMut.isPending,
                  className: "flex-1 bg-input/50 border border-indigo-500/20 focus:border-indigo-400/60 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none transition-smooth placeholder:text-muted-foreground/40 disabled:opacity-40",
                  "data-ocid": "legal.question_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => submitQuestion(question),
                  disabled: !selectedDoc || !question.trim() || askMut.isPending,
                  className: "w-8 h-8 flex items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed transition-smooth shrink-0",
                  "data-ocid": "legal.ask_button",
                  "aria-label": "Ask question",
                  children: askMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) })
          ] })
        ] })
      ]
    }
  );
}
export {
  LegalPage
};
