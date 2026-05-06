import { Mic, Phone, PhoneIncoming, PhoneOff, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { CallRecord } from "../hooks/useCalls";
import { useMakeCall } from "../hooks/useCalls";
import { speakText } from "../hooks/useVoice";
import { useAriaStore } from "../store/useAriaStore";

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalView = "form" | "active" | "ending";

interface CallModalProps {
  open: boolean;
  onClose: () => void;
  incomingCall?: { phone: string; greeting: string } | null;
}

// ─── Voice bars animation ─────────────────────────────────────────────────────

const BAR_KEYS = ["b0", "b1", "b2", "b3", "b4", "b5", "b6"] as const;

function VoiceBars() {
  return (
    <div className="flex items-end gap-[3px] h-8">
      {BAR_KEYS.map((key, i) => (
        <span
          key={key}
          className="w-[4px] rounded-full bg-primary"
          style={{
            height: `${30 + Math.sin(i * 1.2) * 50}%`,
            animation: `pulse-bar ${0.6 + i * 0.1}s ease-in-out ${i * 0.08}s infinite`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

// ─── Duration formatter ───────────────────────────────────────────────────────

function formatDuration(secs: number): string {
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CallModal({ open, onClose, incomingCall }: CallModalProps) {
  const [view, setView] = useState<ModalView>("form");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [activeRecord, setActiveRecord] = useState<CallRecord | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const makeCall = useMakeCall();
  const language = useAriaStore((s) => s.language);

  // Reset state when modal opens/closes.
  // We intentionally depend only on `open` — we want this to fire once when the
  // modal opens, not on every re-render caused by parent re-creating incomingCall.
  const incomingPhone = incomingCall?.phone ?? "";
  const incomingGreeting = incomingCall?.greeting ?? "";

  useEffect(() => {
    if (open) {
      if (incomingPhone) {
        setView("active");
        setPhone(incomingPhone);
        setElapsed(0);
        startTimer();
        speakText(incomingGreeting, language);
      } else {
        setView("form");
        setPhone("");
        setMessage("");
        setElapsed(0);
      }
    } else {
      clearAll();
    }
  }, [open, incomingPhone, incomingGreeting, language]); // eslint-disable-line react-hooks/exhaustive-deps

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  }

  function clearAll() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (endingTimerRef.current) clearTimeout(endingTimerRef.current);
    setElapsed(0);
    setActiveRecord(null);
  }

  async function handleStartCall() {
    if (!phone.trim()) {
      toast.error("Enter a phone number");
      return;
    }
    try {
      const record = await makeCall.mutateAsync({
        toPhone: phone.trim(),
        message: message.trim(),
      });
      setActiveRecord(record);
      setView("active");
      setElapsed(0);
      startTimer();
      toast.success(`Connecting to ${phone.trim()}…`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Call failed");
    }
  }

  function handleHangUp() {
    clearAll();
    setView("ending");
    toast.info("Call ended");
    endingTimerRef.current = setTimeout(() => {
      onClose();
      setView("form");
    }, 3000);
  }

  const isDemo =
    activeRecord?.callSid.startsWith("DEMO-") ?? incomingCall != null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              if (view === "form") onClose();
            }}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 32 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md glass-panel scanline-overlay rounded-xl overflow-hidden"
              data-ocid="call.dialog"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
                <div className="flex items-center gap-2">
                  {incomingCall && view === "active" ? (
                    <PhoneIncoming className="w-5 h-5 text-primary animate-pulse" />
                  ) : (
                    <Phone className="w-5 h-5 text-primary" />
                  )}
                  <span className="font-mono text-sm tracking-widest uppercase text-primary/80">
                    {view === "form"
                      ? "New Call"
                      : view === "active"
                        ? incomingCall
                          ? "Incoming Call"
                          : "Active Call"
                        : "Call Ending"}
                  </span>
                  {isDemo && (
                    <span className="ml-2 px-2 py-0.5 rounded text-xs font-mono bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                      SIMULATED
                    </span>
                  )}
                </div>
                {view === "form" && (
                  <button
                    type="button"
                    aria-label="Close"
                    data-ocid="call.close_button"
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Body */}
              <AnimatePresence mode="wait">
                {view === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    className="p-6 flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="call-phone" className="hud-label">
                        Phone Number
                      </label>
                      <input
                        id="call-phone"
                        className="input-holographic"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") void handleStartCall();
                        }}
                        data-ocid="call.phone_input"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="call-message" className="hud-label">
                        Message for Priya (optional)
                      </label>
                      <textarea
                        id="call-message"
                        className="input-holographic resize-none"
                        rows={3}
                        placeholder="Say something to the caller when connected…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        data-ocid="call.message_textarea"
                      />
                    </div>

                    <div className="flex gap-3 mt-2">
                      <button
                        type="button"
                        className="btn-outline flex-1"
                        onClick={onClose}
                        data-ocid="call.cancel_button"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn-cyan flex-1 flex items-center justify-center gap-2"
                        onClick={() => void handleStartCall()}
                        disabled={makeCall.isPending}
                        data-ocid="call.submit_button"
                      >
                        {makeCall.isPending ? (
                          <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                          <Phone className="w-4 h-4" />
                        )}
                        Start Call
                      </button>
                    </div>
                  </motion.div>
                )}

                {view === "active" && (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="p-6 flex flex-col items-center gap-5"
                  >
                    {/* Avatar pulse ring */}
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-20 h-20 rounded-full bg-primary/20 animate-ping" />
                      <span className="absolute w-24 h-24 rounded-full bg-primary/10 animate-pulse" />
                      <div className="relative z-10 w-16 h-16 rounded-full bg-card border-2 border-primary glow-cyan flex items-center justify-center">
                        <Mic className="w-7 h-7 text-primary" />
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-foreground font-semibold text-lg">
                        {phone}
                      </p>
                      <p className="text-primary font-mono text-2xl tracking-widest mt-1">
                        {formatDuration(elapsed)}
                      </p>
                      <p className="text-muted-foreground text-xs mt-1 font-mono uppercase tracking-widest">
                        {incomingCall ? "Priya speaking…" : "Connected"}
                      </p>
                    </div>

                    {/* Voice waveform */}
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-xs text-muted-foreground font-mono">
                        PRIYA
                      </span>
                      <VoiceBars />
                      <span className="text-xs text-muted-foreground font-mono">
                        LIVE
                      </span>
                    </div>

                    {/* Hang up */}
                    <button
                      type="button"
                      className="w-14 h-14 rounded-full bg-destructive flex items-center justify-center hover:opacity-90 transition-smooth glow-purple shadow-lg"
                      onClick={handleHangUp}
                      data-ocid="call.hangup_button"
                      aria-label="Hang up"
                    >
                      <PhoneOff className="w-6 h-6 text-destructive-foreground" />
                    </button>
                  </motion.div>
                )}

                {view === "ending" && (
                  <motion.div
                    key="ending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 flex flex-col items-center gap-4 text-center"
                  >
                    <PhoneOff className="w-10 h-10 text-muted-foreground" />
                    <p className="text-foreground font-semibold">Call Ended</p>
                    <p className="text-muted-foreground text-sm font-mono">
                      Duration: {formatDuration(elapsed)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Closing in 3 seconds…
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
