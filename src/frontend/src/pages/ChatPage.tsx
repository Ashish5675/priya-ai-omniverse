import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Mic,
  MicOff,
  Send,
  Trash2,
  Volume2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AgentStreamStep } from "../backend";
import { PriyaAvatar } from "../components/PriyaAvatar";
import { QuantumBrain } from "../components/QuantumBrain";
import { useCreateChain, useRunChain } from "../hooks/useAgents";
import {
  speakText,
  useClearHistory,
  useGetHistory,
  useSendMessage,
} from "../hooks/useConversation";
import { useActiveStream } from "../hooks/useStreaming";
import {
  LANG_CODES,
  startSpeechRecognition,
  stopSpeaking,
} from "../hooks/useVoice";
import { useAriaStore } from "../store/useAriaStore";
import type { Language, Message } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const LIME = "#39FF14";

const LANG_LABELS: Record<Language, string> = {
  english: "EN",
  hindi: "हिन्दी",
  nagpuri: "NA",
};

const AGENT_STEPS = ["Planner", "Research", "Executor", "Critic"] as const;

const HAPPY_KEYWORDS = [
  "thank",
  "thanks",
  "great",
  "perfect",
  "excellent",
  "awesome",
  "amazing",
  "wonderful",
  "love",
  "fantastic",
  "brilliant",
];

function detectHappy(text: string) {
  const l = text.toLowerCase();
  return HAPPY_KEYWORDS.some((k) => l.includes(k));
}

// ─── Waveform ─────────────────────────────────────────────────────────────────

function SpeakingWaveform() {
  const bars = [0.45, 0.8, 1.0, 0.7, 0.5];
  const barIds = ["b0", "b1", "b2", "b3", "b4"] as const;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      className="flex justify-start mb-4"
      data-ocid="chat.priya_speaking_indicator"
    >
      <div className="flex items-center gap-2 glass-panel border-primary/30 rounded-2xl px-4 py-3">
        <Volume2 className="w-3.5 h-3.5 text-primary/70 shrink-0" />
        <div className="flex items-end gap-[3px] h-6">
          {bars.map((h, i) => (
            <motion.span
              key={barIds[i]}
              className="w-[3px] rounded-full"
              style={{ background: "oklch(0.7 0.18 200)", minHeight: 3 }}
              animate={{
                height: [
                  `${h * 12}px`,
                  `${h * 22}px`,
                  `${h * 8}px`,
                  `${h * 20}px`,
                  `${h * 12}px`,
                ],
              }}
              transition={{
                duration: 0.7 + i * 0.05,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.09,
              }}
            />
          ))}
        </div>
        <span className="text-[10px] font-mono text-primary/60 tracking-widest">
          PRIYA
        </span>
      </div>
    </motion.div>
  );
}

// ─── User message bubble ──────────────────────────────────────────────────────

function UserBubble({ message, index }: { message: Message; index: number }) {
  const tsMs = Number(message.timestamp / BigInt(1_000_000));
  const timeStr = new Date(tsMs).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.2) }}
      className="flex justify-end mb-4"
      data-ocid={`chat.message.${index + 1}`}
    >
      <div
        className="max-w-[76%] rounded-2xl px-4 py-3 border border-primary/25"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.05 200 / 0.9), oklch(0.1 0.04 280 / 0.85))",
        }}
      >
        <p
          className="break-words min-w-0 text-sm leading-relaxed"
          style={{ color: LIME }}
        >
          {message.content}
        </p>
        <span className="text-[10px] text-muted-foreground/50 mt-1.5 block font-mono text-right">
          {timeStr}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Thinking / Streaming dots ────────────────────────────────────────────────

function ThinkingDots({ isStreaming }: { isStreaming?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="flex justify-start mb-4"
      data-ocid="chat.thinking_indicator"
    >
      <div className="glass-panel border-primary/20 rounded-2xl px-4 py-3 flex items-center gap-1.5">
        <span className="text-[10px] font-mono text-primary/60 tracking-widest mr-1">
          PRIYA
        </span>
        {(["a", "b", "c"] as const).map((id, i) => (
          <motion.span
            key={id}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.7, 1.3, 0.7] }}
            transition={{
              duration: 0.7,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.18,
            }}
          />
        ))}
        {isStreaming && (
          <span className="text-[10px] font-mono text-primary/50 ml-2 tracking-widest">
            STREAMING
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Agent pipeline badge (bottom of avatar panel) ───────────────────────────

function AgentPipeline({ stepIndex }: { stepIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="px-3 py-2 glass-panel border-primary/15 rounded-xl text-[10px] font-mono"
      data-ocid="chat.agent_pipeline"
    >
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-muted-foreground/60 mr-1">Agents:</span>
        {AGENT_STEPS.map((step, i) => (
          <span
            key={step}
            className={`flex items-center gap-1 transition-colors duration-300 ${
              i === stepIndex
                ? "text-primary font-bold"
                : i < stepIndex
                  ? "text-muted-foreground/40 line-through"
                  : "text-muted-foreground/30"
            }`}
          >
            {i === stepIndex && (
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
            {step}
            {i < AGENT_STEPS.length - 1 && (
              <span className="text-muted-foreground/25 mx-0.5">→</span>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Language pills ───────────────────────────────────────────────────────────

function LangPills({
  current,
  onChange,
}: { current: Language; onChange: (l: Language) => void }) {
  const langs: Language[] = ["english", "hindi", "nagpuri"];
  return (
    <div className="flex gap-1" data-ocid="chat.language_selector">
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          data-ocid={`chat.lang_${l}_button`}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border transition-all duration-200 ${
            current === l
              ? "bg-primary/20 border-primary/70 text-primary shadow-[0_0_8px_oklch(0.7_0.18_200_/_0.4)]"
              : "border-border/30 text-muted-foreground/50 hover:border-primary/40 hover:text-primary/70"
          }`}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}

// ─── Mic ring ─────────────────────────────────────────────────────────────────

function MicRing() {
  return (
    <>
      <motion.span
        className="absolute inset-0 rounded-xl border-2 border-[#39FF14]/60"
        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.span
        className="absolute inset-0 rounded-xl border border-[#39FF14]/30"
        animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.3,
        }}
      />
    </>
  );
}

// ─── Live Pipeline Feed Sidebar ───────────────────────────────────────────────

const STEP_ORDER = [
  "planner",
  "research",
  "executor",
  "memory",
  "critic",
] as const;
const STEP_ICONS: Record<string, string> = {
  planner: "🧠",
  research: "🔍",
  executor: "⚡",
  memory: "💾",
  critic: "✅",
};
const STEP_LABELS: Record<string, string> = {
  planner: "Planner",
  research: "Research",
  executor: "Executor",
  memory: "Memory",
  critic: "Critic",
};

function elapsedMs(startedAt: bigint): string {
  if (startedAt === BigInt(0)) return "";
  const ms = Date.now() - Number(startedAt / BigInt(1_000_000));
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function StepBadge({ step, index }: { step: AgentStreamStep; index: number }) {
  const isRunning = step.status === "running";
  const isComplete = step.status === "complete";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`relative flex items-start gap-2.5 p-2.5 rounded-xl border transition-all duration-300 ${
        isRunning
          ? "border-primary/60 bg-primary/5 shadow-[0_0_12px_oklch(0.7_0.18_200/0.2)]"
          : isComplete
            ? "border-emerald-400/40 bg-emerald-400/5"
            : "border-border/15 bg-transparent opacity-40"
      }`}
      data-ocid={`chat.pipeline_step.${index + 1}`}
    >
      {/* Step icon / status */}
      <div
        className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[11px] ${
          isRunning
            ? "border-primary/70 bg-primary/10"
            : isComplete
              ? "border-emerald-400/60 bg-emerald-400/10"
              : "border-border/30 bg-transparent"
        }`}
      >
        {isRunning ? (
          <Loader2 className="w-3 h-3 text-primary animate-spin" />
        ) : isComplete ? (
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        ) : (
          <span>{STEP_ICONS[step.agentType] ?? "·"}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span
            className={`text-[10px] font-mono font-bold tracking-wider ${
              isRunning
                ? "text-primary"
                : isComplete
                  ? "text-emerald-400"
                  : "text-muted-foreground/40"
            }`}
          >
            {STEP_LABELS[step.agentType] ?? step.agentType}
          </span>
          {(isRunning || isComplete) && (
            <span className="text-[9px] font-mono text-muted-foreground/40 flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5" />
              {elapsedMs(step.startedAt)}
            </span>
          )}
        </div>
        {isComplete && step.output && (
          <p className="text-[10px] font-mono text-muted-foreground/70 line-clamp-2 leading-relaxed">
            {step.output.slice(0, 60)}
            {step.output.length > 60 ? "…" : ""}
          </p>
        )}
        {isRunning && (
          <p className="text-[10px] font-mono text-primary/50 tracking-widest">
            Processing…
          </p>
        )}
      </div>

      {/* Running cyan glow pulse */}
      {isRunning && (
        <motion.div
          className="absolute inset-0 rounded-xl border border-primary/30 pointer-events-none"
          animate={{ opacity: [0.5, 0] }}
          transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </motion.div>
  );
}

function PipelineSidebar({
  steps,
  isOpen,
  onToggle,
}: {
  steps: AgentStreamStep[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  // Normalise step order: fill in missing steps as pending
  const orderedSteps: AgentStreamStep[] = STEP_ORDER.map((type) => {
    const found = steps.find((s) => s.agentType === type);
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

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 220 : 36 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex-shrink-0 border-l border-border/20 bg-card/40 backdrop-blur-sm overflow-hidden"
      data-ocid="chat.pipeline_sidebar"
    >
      {/* Toggle button */}
      <button
        type="button"
        onClick={onToggle}
        className="absolute top-3 left-0 w-9 h-9 flex items-center justify-center z-10 text-primary/60 hover:text-primary transition-colors"
        aria-label={isOpen ? "Collapse pipeline feed" : "Expand pipeline feed"}
        data-ocid="chat.pipeline_toggle"
      >
        {isOpen ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Content (visible only when open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 pl-9 pr-2 pt-2 pb-3 flex flex-col gap-1.5 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center gap-1.5 mb-1 mt-1">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="text-[9px] font-mono text-primary/70 tracking-widest uppercase">
                Live Pipeline
              </span>
            </div>

            {/* Steps */}
            {orderedSteps.map((step, i) => (
              <StepBadge key={step.agentType} step={step} index={i} />
            ))}

            {/* Connector lines */}
            <div
              className="absolute left-[calc(9px+14px)] top-[52px] w-px pointer-events-none"
              style={{
                height: `${orderedSteps.length * 52}px`,
                background:
                  "linear-gradient(to bottom, oklch(0.7 0.18 200 / 0.2), transparent)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed: mini status dots */}
      {!isOpen && (
        <div className="absolute top-12 left-0 w-9 flex flex-col items-center gap-2">
          {orderedSteps.map((step, i) => (
            <div
              key={step.agentType}
              title={STEP_LABELS[step.agentType]}
              className={`w-2 h-2 rounded-full border transition-colors ${
                step.status === "running"
                  ? "bg-primary border-primary/60 animate-pulse"
                  : step.status === "complete"
                    ? "bg-emerald-400 border-emerald-400/60"
                    : "bg-transparent border-border/30"
              }`}
              data-ocid={`chat.pipeline_dot.${i + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── ChatPage ─────────────────────────────────────────────────────────────────

export function ChatPage() {
  const { data: rawMessages = [], isLoading } = useGetHistory();
  const sendMessage = useSendMessage();
  const clearHistory = useClearHistory();
  const createChain = useCreateChain();
  const runChain = useRunChain();
  const { data: activeStream, isStreaming, hasFinalChunk } = useActiveStream();

  const {
    inputValue,
    setInputValue,
    isVoiceListening,
    setIsVoiceListening,
    isSpeaking,
    setIsSpeaking,
    setAvatarMood,
    language,
    setLanguage,
    voiceSettings,
    activeAgentChain,
    setActiveAgentChain,
    isThinking,
    setIsThinking,
    recordGeneticInteraction,
  } = useAriaStore();

  const bottomRef = useRef<HTMLDivElement>(null);
  const stopRecognitionRef = useRef<(() => void) | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showClear, setShowClear] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const [pipelineOpen, setPipelineOpen] = useState(false);

  // Only show user messages; Priya speaks via audio only
  const userMessages = rawMessages.filter((m: Message) => m.role === "user");

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const resetIdle = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setAvatarMood("idle"), 5000);
  }, [setAvatarMood]);

  // ESC key handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stopSpeaking();
        setIsSpeaking(false);
        if (stopRecognitionRef.current) {
          stopRecognitionRef.current();
          stopRecognitionRef.current = null;
          setIsVoiceListening(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setIsSpeaking, setIsVoiceListening]);

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (stopRecognitionRef.current) stopRecognitionRef.current();
    };
  }, []);

  // Simulate agent step cycling when activeAgentChain is set
  useEffect(() => {
    if (!activeAgentChain) {
      setAgentStep(0);
      return;
    }
    setAgentStep(0);
    const interval = setInterval(() => {
      setAgentStep((s) => {
        if (s >= AGENT_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => setActiveAgentChain(null), 800);
          return s;
        }
        return s + 1;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [activeAgentChain, setActiveAgentChain]);

  // Auto-open pipeline sidebar when streaming becomes active
  useEffect(() => {
    if (isStreaming && !hasFinalChunk) {
      setPipelineOpen(true);
    }
  }, [isStreaming, hasFinalChunk]);

  // ─── Mic toggle ──────────────────────────────────────────────────────────────

  const toggleMic = () => {
    if (isVoiceListening) {
      stopRecognitionRef.current?.();
      stopRecognitionRef.current = null;
      setIsVoiceListening(false);
      return;
    }
    setIsVoiceListening(true);
    const stop = startSpeechRecognition(
      language,
      (transcript, isFinal) => {
        setInputValue(transcript);
        if (isFinal) {
          setIsVoiceListening(false);
          stopRecognitionRef.current = null;
        }
      },
      () => setIsVoiceListening(false),
    );
    stopRecognitionRef.current = stop;
  };

  // ─── Send ─────────────────────────────────────────────────────────────────────

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || sendMessage.isPending) return;

    if (isVoiceListening) {
      stopRecognitionRef.current?.();
      stopRecognitionRef.current = null;
      setIsVoiceListening(false);
    }

    setInputValue("");
    setAvatarMood("thinking");
    setIsThinking(true);
    // Silent genetic learning
    const topicWords = trimmed.split(/\s+/).slice(0, 3).join(" ");
    recordGeneticInteraction(topicWords, language);

    try {
      const chainId = await createChain.mutateAsync({ goal: trimmed });
      const fakeChain = {
        id: chainId,
        goal: trimmed,
        status: "running",
        currentStep: BigInt(0),
        tasks: [],
      };
      setActiveAgentChain(fakeChain);
      void runChain.mutateAsync({ chainId });
    } catch {
      // Agent chain optional
    }

    sendMessage.mutate(trimmed, {
      onSuccess: (assistantMsg) => {
        const responseText = assistantMsg?.content ?? "";
        setIsThinking(false);
        const mood =
          detectHappy(trimmed) || detectHappy(responseText)
            ? "happy"
            : "speaking";
        setAvatarMood(mood);
        resetIdle();
        scrollToBottom();

        const langCode = LANG_CODES[language];
        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(responseText);
          utter.lang = langCode;
          utter.rate = voiceSettings.speed ?? 0.95;
          utter.pitch = voiceSettings.pitch ?? 1.15;
          utter.volume = 1.0;

          const pickVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            return (
              voices.find((v) => v.lang === langCode && !v.localService) ||
              voices.find((v) => v.lang.startsWith(langCode.split("-")[0])) ||
              voices.find(
                (v) =>
                  v.lang.startsWith("en") &&
                  /female|woman|zira|samantha|victoria/i.test(v.name),
              ) ||
              voices.find((v) => v.lang.startsWith("en")) ||
              null
            );
          };

          const voice = pickVoice();
          if (voice) utter.voice = voice;

          let resumeInterval: ReturnType<typeof setInterval> | null = null;
          utter.onstart = () => {
            setIsThinking(false);
            setIsSpeaking(true);
            resumeInterval = setInterval(() => {
              if (window.speechSynthesis.paused)
                window.speechSynthesis.resume();
            }, 14000);
          };
          utter.onend = () => {
            if (resumeInterval) clearInterval(resumeInterval);
            setTimeout(() => {
              setIsSpeaking(false);
              setAvatarMood("idle");
            }, 600);
          };
          utter.onerror = () => {
            if (resumeInterval) clearInterval(resumeInterval);
            setIsSpeaking(false);
            setAvatarMood("idle");
          };

          if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.addEventListener(
              "voiceschanged",
              () => {
                const v = pickVoice();
                if (v) utter.voice = v;
                window.speechSynthesis.speak(utter);
              },
              { once: true },
            );
          } else {
            window.speechSynthesis.speak(utter);
          }
        } else {
          void speakText(
            responseText,
            () => setIsSpeaking(true),
            () => {
              setIsSpeaking(false);
              setAvatarMood("idle");
            },
          );
        }
      },
      onError: () => {
        setIsThinking(false);
        setAvatarMood("alert");
        resetIdle();
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  // Pipeline steps from active stream
  const pipelineSteps: AgentStreamStep[] = activeStream?.agentSteps ?? [];

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div
      className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-4rem)] relative"
      data-ocid="chat-page"
    >
      {/* Scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.06) 2px, oklch(0 0 0 / 0.06) 4px)",
        }}
        aria-hidden
      />

      {/* ── Left: Priya Avatar ─────────────────────────────────────────────────── */}
      <div className="lg:w-[30%] xl:w-[28%] flex-shrink-0 border-r border-border/20 flex flex-col items-center justify-center bg-background/60 relative gap-4 py-6 px-4">
        <div className="relative flex items-center justify-center">
          <AnimatePresence>
            {isSpeaking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow:
                    "0 0 48px 16px oklch(0.7 0.18 200 / 0.35), 0 0 80px 32px oklch(0.7 0.18 200 / 0.15)",
                }}
              />
            )}
          </AnimatePresence>
          <motion.div
            animate={
              isSpeaking ? { scale: [1, 1.015, 1, 1.012, 1] } : { scale: 1 }
            }
            transition={{
              duration: 1.4,
              repeat: isSpeaking ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            <PriyaAvatar height={380} />
          </motion.div>
        </div>

        {/* Avatar status label */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            {isSpeaking ? (
              <motion.div
                key="speaking"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2 justify-center"
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
                <span className="text-[11px] font-mono text-primary tracking-widest uppercase">
                  Speaking
                </span>
              </motion.div>
            ) : isVoiceListening ? (
              <motion.div
                key="listening"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-2 justify-center"
              >
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ background: LIME }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
                <span
                  className="text-[11px] font-mono tracking-widest uppercase"
                  style={{ color: LIME }}
                >
                  Listening
                </span>
              </motion.div>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11px] font-mono text-muted-foreground/40 tracking-widest uppercase"
              >
                Idle
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {activeAgentChain && (
            <div className="w-full px-2">
              <AgentPipeline stepIndex={agentStep} />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Right: Chat + Pipeline Sidebar ────────────────────────────────────── */}
      <div className="flex-1 flex min-w-0 overflow-hidden">
        {/* Chat column */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Chat header */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b border-border/20 glass-panel flex-shrink-0"
            data-ocid="chat.header"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-primary/70 tracking-widest uppercase">
                PRIYA CHAT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="text-[10px] font-mono text-muted-foreground/50">
                Audio-only responses
              </span>
              {isStreaming && !hasFinalChunk && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-mono text-primary tracking-widest flex items-center gap-1"
                  data-ocid="chat.streaming_badge"
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      duration: 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  LIVE
                </motion.span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <LangPills current={language} onChange={setLanguage} />
              {/* Pipeline toggle */}
              <button
                type="button"
                onClick={() => setPipelineOpen((p) => !p)}
                className={`text-[10px] font-mono flex items-center gap-1 px-2 py-1 rounded-lg border transition-all duration-200 ${
                  pipelineOpen
                    ? "border-primary/50 text-primary bg-primary/10"
                    : "border-border/30 text-muted-foreground/50 hover:border-primary/40 hover:text-primary/70"
                }`}
                data-ocid="chat.pipeline_open_modal_button"
                aria-label="Toggle pipeline feed"
              >
                <span>Pipeline</span>
                {isStreaming && !hasFinalChunk && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowClear(true)}
                className="text-[10px] text-muted-foreground/40 hover:text-destructive transition-colors flex items-center gap-1 font-mono"
                data-ocid="chat.clear_trigger"
                aria-label="Clear history"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea
            className="flex-1 px-5 pt-4"
            data-ocid="chat.message_list"
          >
            {isLoading ? (
              <div className="space-y-4 p-4">
                {(["s1", "s2", "s3"] as const).map((id) => (
                  <Skeleton
                    key={id}
                    className="h-12 w-3/4 ml-auto rounded-2xl"
                  />
                ))}
              </div>
            ) : (
              <div className="pb-4">
                {userMessages.length === 0 && !sendMessage.isPending && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mt-8 mb-8"
                    data-ocid="chat.empty_state"
                  >
                    <div className="glass-panel border-primary/20 rounded-2xl px-6 py-5 max-w-sm text-center">
                      <div
                        className="w-10 h-10 rounded-full border border-primary/60 flex items-center justify-center mx-auto mb-3"
                        style={{
                          boxShadow: "0 0 12px oklch(0.7 0.18 200 / 0.4)",
                        }}
                      >
                        <span className="text-sm font-bold text-primary font-mono">
                          P
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                        I'm{" "}
                        <span className="text-primary font-semibold">
                          Priya
                        </span>
                        .<br />
                        Type or speak — I'll reply in voice.
                      </p>
                      <p className="text-[10px] text-muted-foreground/40 mt-2 font-mono">
                        ESC stops speech · Shift+Enter = newline
                      </p>
                    </div>
                  </motion.div>
                )}

                {userMessages.map((msg: Message, i: number) => (
                  <UserBubble key={String(msg.id)} message={msg} index={i} />
                ))}

                {/* Quantum Brain — visible while Priya is thinking, disappears when audio starts */}
                <AnimatePresence>
                  {isThinking && (
                    <motion.div
                      key="quantum-brain"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="my-3 px-1"
                      data-ocid="chat.quantum_brain"
                    >
                      <QuantumBrain isVisible={isThinking} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {sendMessage.isPending && (
                    <ThinkingDots
                      key="thinking"
                      isStreaming={isStreaming && !hasFinalChunk}
                    />
                  )}
                  {isSpeaking && !sendMessage.isPending && (
                    <SpeakingWaveform key="waveform" />
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input area */}
          <div
            className="border-t border-border/20 p-4 glass-panel flex-shrink-0"
            data-ocid="chat.input_area"
          >
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative min-w-0">
                {isVoiceListening && (
                  <motion.div
                    className="absolute -top-7 left-0 text-[10px] font-mono tracking-widest flex items-center gap-1"
                    style={{ color: LIME }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ background: LIME }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{
                        duration: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    LISTENING...
                  </motion.div>
                )}
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isVoiceListening ? "Listening…" : "Message Priya…"
                  }
                  className="min-h-[48px] max-h-[120px] resize-none bg-card/60 border-border/40 focus:border-primary/60 font-mono text-sm placeholder:text-muted-foreground/30 pr-4 rounded-xl transition-colors"
                  style={{ color: LIME, caretColor: LIME }}
                  data-ocid="chat.input"
                />
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={!inputValue.trim() || sendMessage.isPending}
                  className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-primary/15 border-primary/50 text-primary hover:bg-primary/25 hover:shadow-[0_0_10px_oklch(0.7_0.18_200_/_0.4)]"
                  data-ocid="chat.send_button"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
                <div className="relative">
                  {isVoiceListening && <MicRing />}
                  <button
                    type="button"
                    onClick={toggleMic}
                    className={`relative w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 z-10 ${
                      isVoiceListening
                        ? "border-[#39FF14]/70 bg-[#39FF14]/10 text-[#39FF14]"
                        : "border-border/40 hover:border-primary/50 text-muted-foreground hover:text-primary"
                    }`}
                    data-ocid="chat.mic_button"
                    aria-label={
                      isVoiceListening ? "Stop recording" : "Start voice input"
                    }
                  >
                    {isVoiceListening ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 px-0.5">
              <p className="text-[10px] text-muted-foreground/40 font-mono">
                Enter → send · Shift+Enter → newline · ESC → stop voice
              </p>
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border"
                style={
                  language === "english"
                    ? {
                        color: "oklch(0.7 0.18 200)",
                        borderColor: "oklch(0.7 0.18 200 / 0.3)",
                      }
                    : { color: LIME, borderColor: `${LIME}44` }
                }
                data-ocid="chat.current_lang_badge"
              >
                {LANG_LABELS[language]}
              </span>
            </div>
          </div>
        </div>

        {/* Pipeline sidebar */}
        <PipelineSidebar
          steps={pipelineSteps}
          isOpen={pipelineOpen}
          onToggle={() => setPipelineOpen((p) => !p)}
        />
      </div>

      {/* ── Clear Confirm Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {showClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setShowClear(false)}
            data-ocid="chat.clear_dialog"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel border-primary/20 rounded-2xl p-6 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display font-bold text-lg mb-2">
                Clear History?
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Priya will lose all conversation context for this session.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-xl border border-border/40 text-sm font-mono hover:border-primary/40 transition-colors"
                  onClick={() => setShowClear(false)}
                  data-ocid="chat.clear_cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-xl border border-destructive/50 bg-destructive/15 text-destructive text-sm font-mono hover:bg-destructive/25 transition-colors"
                  onClick={() => {
                    clearHistory.mutate();
                    setShowClear(false);
                  }}
                  data-ocid="chat.clear_confirm_button"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
