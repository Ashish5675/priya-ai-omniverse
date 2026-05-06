import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import {
  Clock,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  PhoneOff,
  RefreshCw,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CallModal } from "../components/CallModal";
import { useCallLogs, useInitCalls } from "../hooks/useCalls";
import type { CallRecord } from "../hooks/useCalls";
import { useAriaStore } from "../store/useAriaStore";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(seconds: bigint): string {
  const s = Number(seconds);
  if (s === 0) return "—";
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const r = (s % 60).toString().padStart(2, "0");
  return `${m}:${r}`;
}

function formatTimestamp(ts: bigint): string {
  try {
    const ms = Number(ts);
    return formatDistanceToNow(new Date(ms), { addSuffix: true });
  } catch {
    return "—";
  }
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const classes: Record<string, string> = {
    completed: "bg-green-500/20 text-green-300 border-green-500/30",
    active: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
    failed: "bg-red-500/20 text-red-300 border-red-500/30",
    missed: "bg-amber-400/20 text-amber-300 border-amber-400/30",
  };
  const icons: Record<string, React.ReactNode> = {
    completed: <Phone className="w-3 h-3" />,
    active: <Phone className="w-3 h-3 animate-pulse" />,
    failed: <PhoneOff className="w-3 h-3" />,
    missed: <PhoneMissed className="w-3 h-3" />,
  };
  const cls =
    classes[status] ?? "bg-muted text-muted-foreground border-border/30";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono border ${cls}`}
    >
      {icons[status] ?? null}
      {status.toUpperCase()}
    </span>
  );
}

// ─── Row skeleton ─────────────────────────────────────────────────────────────

const SKELETON_COL_KEYS = ["sc0", "sc1", "sc2", "sc3", "sc4"] as const;
const SKELETON_ROW_KEYS = ["sr0", "sr1", "sr2", "sr3"] as const;

function RowSkeleton() {
  return (
    <tr className="border-b border-border/20">
      {SKELETON_COL_KEYS.map((key) => (
        <td key={key} className="px-4 py-3">
          <Skeleton className="h-4 w-full bg-muted/40 rounded" />
        </td>
      ))}
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function CallsPage() {
  const { data: logs = [], isLoading, refetch } = useCallLogs();
  const [modalOpen, setModalOpen] = useState(false);
  const [incomingCall, setIncomingCall] = useState<{
    phone: string;
    greeting: string;
  } | null>(null);
  const language = useAriaStore((s) => s.language);

  // Init call module on mount to seed demo data
  useInitCalls();

  // Simulate an incoming call
  function handleSimulateIncoming() {
    const greeting =
      language === "hindi"
        ? "नमस्ते, मैं प्रिया हूँ। आपकी कैसे सहायता करूँ?"
        : language === "nagpuri"
          ? "नमस्कार, मैं प्रिया हूँ। का सेवा करना हे?"
          : "Hello, this is Priya. How may I assist you today?";
    setIncomingCall({ phone: "+91-9000-000-000", greeting });
    setModalOpen(true);
    // TTS fires inside CallModal useEffect for incoming calls — do NOT call speakText here
  }

  function handleCloseModal() {
    setModalOpen(false);
    setIncomingCall(null);
  }

  return (
    <div
      className="flex-1 p-6 space-y-6 scanline-overlay"
      data-ocid="calls.page"
    >
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <p className="hud-label mb-1">ARIA OMNIVERSE — MODULE</p>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Phone className="w-6 h-6 text-primary" />
            Call Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh */}
          <button
            type="button"
            className="btn-outline flex items-center gap-1.5 !py-2 !px-3 !text-xs"
            onClick={() => refetch()}
            data-ocid="calls.refresh_button"
            aria-label="Refresh call logs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>

          {/* Simulate incoming */}
          <button
            type="button"
            className="btn-outline flex items-center gap-1.5 !py-2 !px-3 !text-xs"
            onClick={handleSimulateIncoming}
            data-ocid="calls.simulate_incoming_button"
          >
            <PhoneIncoming className="w-3.5 h-3.5" />
            Simulate Incoming
          </button>

          {/* New call */}
          <button
            type="button"
            className="btn-cyan flex items-center gap-2"
            onClick={() => {
              setIncomingCall(null);
              setModalOpen(true);
            }}
            data-ocid="calls.new_call_button"
          >
            <Phone className="w-4 h-4" />
            New Call
          </button>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {(
          [
            {
              label: "Total Calls",
              value: logs.length,
              icon: <Phone className="w-4 h-4 text-primary" />,
            },
            {
              label: "Completed",
              value: logs.filter((l) => l.status === "completed").length,
              icon: <Phone className="w-4 h-4 text-green-400" />,
            },
            {
              label: "Missed",
              value: logs.filter((l) => l.status === "missed").length,
              icon: <PhoneMissed className="w-4 h-4 text-amber-400" />,
            },
            {
              label: "Avg Duration",
              value: (() => {
                const completed = logs.filter(
                  (l) => l.status === "completed" && Number(l.duration) > 0,
                );
                if (!completed.length) return "—";
                const avg =
                  completed.reduce((a, l) => a + Number(l.duration), 0) /
                  completed.length;
                const m = Math.floor(avg / 60)
                  .toString()
                  .padStart(2, "0");
                const s = Math.round(avg % 60)
                  .toString()
                  .padStart(2, "0");
                return `${m}:${s}`;
              })(),
              icon: <Clock className="w-4 h-4 text-secondary" />,
            },
          ] as {
            label: string;
            value: number | string;
            icon: React.ReactNode;
          }[]
        ).map((stat) => (
          <div
            key={stat.label}
            className="module-panel flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center border border-border/30">
              {stat.icon}
            </div>
            <div>
              <p className="hud-label">{stat.label}</p>
              <p className="text-foreground font-mono text-lg font-bold">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
        className="module-panel overflow-hidden !p-0"
      >
        <div className="px-5 py-3 border-b border-border/20 flex items-center gap-2">
          <span className="hud-label">Call Log</span>
          <Badge
            variant="outline"
            className="ml-auto text-xs font-mono border-primary/30 text-primary/70"
          >
            Live · every 5s
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="calls.table">
            <thead>
              <tr className="border-b border-border/20 text-left">
                {["Phone", "Duration", "Status", "Transcript", "Time"].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 hud-label font-semibold">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                SKELETON_ROW_KEYS.map((key) => <RowSkeleton key={key} />)
              ) : logs.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-muted-foreground font-mono"
                    data-ocid="calls.empty_state"
                  >
                    No call records yet. Start your first call.
                  </td>
                </tr>
              ) : (
                logs.map((record: CallRecord, idx: number) => (
                  <CallRow
                    key={record.id.toString()}
                    record={record}
                    index={idx + 1}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <CallModal
        open={modalOpen}
        onClose={handleCloseModal}
        incomingCall={incomingCall}
      />
    </div>
  );
}

// ─── Call Row ─────────────────────────────────────────────────────────────────

function CallRow({ record, index }: { record: CallRecord; index: number }) {
  const isDemo = record.callSid.startsWith("DEMO-");

  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="border-b border-border/10 hover:bg-card/50 transition-colors"
      data-ocid={`calls.item.${index}`}
    >
      {/* Phone */}
      <td className="px-4 py-3 font-mono text-foreground">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-primary/60 shrink-0" />
          <span className="truncate max-w-[140px]">{record.callerPhone}</span>
          {isDemo && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 shrink-0">
              SIM
            </span>
          )}
        </div>
      </td>

      {/* Duration */}
      <td className="px-4 py-3 font-mono text-right text-muted-foreground tabular-nums">
        {formatDuration(record.duration)}
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <StatusBadge status={record.status} />
      </td>

      {/* Transcript */}
      <td className="px-4 py-3 max-w-xs">
        {record.transcript ? (
          <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
            {record.transcript}
          </p>
        ) : (
          <span className="text-muted-foreground/40 text-xs font-mono">—</span>
        )}
      </td>

      {/* Time */}
      <td className="px-4 py-3 text-xs font-mono text-muted-foreground whitespace-nowrap">
        {formatTimestamp(record.timestamp)}
      </td>
    </motion.tr>
  );
}
