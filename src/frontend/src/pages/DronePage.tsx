import {
  AlertTriangle,
  Camera,
  Download,
  MapPin,
  Navigation,
  Play,
  Radio,
  RotateCcw,
  Triangle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { DetectionObject } from "../backend";
import {
  useDetectionAlerts,
  useDetectionHistory,
  useInitDetection,
  useYoloDetection,
} from "../hooks/useDrone";
import type { DetectionHistoryRecord } from "../hooks/useDrone";
import { mockBackend } from "../mocks/backend";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Drone {
  id: bigint;
  lat: number;
  lng: number;
  altitude: number;
  speed: number;
  battery: bigint;
  status: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const DRONE_LABELS = ["Drone 1", "Drone 2", "Drone 3"];

const CMD_DEFS = [
  {
    cmd: "takeoff",
    label: "Takeoff",
    color: "border-green-400/60 text-green-400 hover:bg-green-400/15",
    icon: "▲",
  },
  {
    cmd: "land",
    label: "Land",
    color: "border-red-400/60 text-red-400 hover:bg-red-400/15",
    icon: "▼",
  },
  {
    cmd: "hover",
    label: "Hover",
    color: "border-blue-400/60 text-blue-400 hover:bg-blue-400/15",
    icon: "◈",
  },
  {
    cmd: "rtb",
    label: "Return to Base",
    color: "border-amber-400/60 text-amber-400 hover:bg-amber-400/15",
    icon: "↩",
  },
];

const STATUS_BADGE: Record<string, string> = {
  flying: "bg-green-400/20 text-green-400 border-green-400/50",
  idle: "bg-muted/40 text-muted-foreground border-border/40",
  landing: "bg-amber-400/20 text-amber-400 border-amber-400/50",
  emergency: "bg-red-500/20 text-red-400 border-red-400/50",
};

// className → color scheme
const CLASS_COLORS: Record<
  string,
  { border: string; bg: string; text: string; glow: string }
> = {
  person: {
    border: "rgba(0,217,255,0.8)",
    bg: "rgba(0,217,255,0.07)",
    text: "#00d9ff",
    glow: "0 0 8px rgba(0,217,255,0.5)",
  },
  car: {
    border: "rgba(245,158,11,0.8)",
    bg: "rgba(245,158,11,0.07)",
    text: "#f59e0b",
    glow: "0 0 8px rgba(245,158,11,0.5)",
  },
  truck: {
    border: "rgba(239,68,68,0.8)",
    bg: "rgba(239,68,68,0.07)",
    text: "#ef4444",
    glow: "0 0 8px rgba(239,68,68,0.5)",
  },
  motorcycle: {
    border: "rgba(167,139,250,0.8)",
    bg: "rgba(167,139,250,0.07)",
    text: "#a78bfa",
    glow: "0 0 8px rgba(167,139,250,0.5)",
  },
  bus: {
    border: "rgba(245,158,11,0.8)",
    bg: "rgba(245,158,11,0.07)",
    text: "#f59e0b",
    glow: "0 0 8px rgba(245,158,11,0.5)",
  },
  bicycle: {
    border: "rgba(52,211,153,0.8)",
    bg: "rgba(52,211,153,0.07)",
    text: "#34d399",
    glow: "0 0 8px rgba(52,211,153,0.5)",
  },
  backpack: {
    border: "rgba(0,217,255,0.6)",
    bg: "rgba(0,217,255,0.05)",
    text: "#00d9ff",
    glow: "0 0 6px rgba(0,217,255,0.3)",
  },
  knife: {
    border: "rgba(239,68,68,0.9)",
    bg: "rgba(239,68,68,0.1)",
    text: "#ef4444",
    glow: "0 0 12px rgba(239,68,68,0.7)",
  },
};

const DEFAULT_COLOR = {
  border: "rgba(0,217,255,0.7)",
  bg: "rgba(0,217,255,0.05)",
  text: "#00d9ff",
  glow: "0 0 6px rgba(0,217,255,0.3)",
};

function getClassColor(className: string) {
  return CLASS_COLORS[className.toLowerCase()] ?? DEFAULT_COLOR;
}

function isHighAlert(obj: DetectionObject): boolean {
  return obj.highAlert || obj.confidence > 0.85;
}

// ─── YOLO Bounding Box Overlay ─────────────────────────────────────────────────

function YoloBoundingBox({ obj }: { obj: DetectionObject }) {
  const colors = getClassColor(obj.name);
  const alert = isHighAlert(obj);
  const confPct = Math.round(obj.confidence * 100);

  return (
    <motion.div
      key={`${obj.name}-${obj.bbox.x}-${obj.bbox.y}`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.25 }}
      className="absolute pointer-events-none"
      style={{
        left: `${obj.bbox.x}%`,
        top: `${obj.bbox.y}%`,
        width: `${obj.bbox.width}%`,
        height: `${obj.bbox.height}%`,
        border: `1.5px solid ${alert ? "rgba(239,68,68,0.9)" : colors.border}`,
        background: alert ? "rgba(239,68,68,0.06)" : colors.bg,
        boxShadow: alert ? "0 0 14px rgba(239,68,68,0.6)" : colors.glow,
        animation: alert ? "pulse 1.2s ease-in-out infinite" : undefined,
      }}
    >
      {/* Corner brackets */}
      <div
        className="absolute top-0 left-0 w-2 h-2 border-t border-l"
        style={{ borderColor: alert ? "#ef4444" : colors.border }}
      />
      <div
        className="absolute top-0 right-0 w-2 h-2 border-t border-r"
        style={{ borderColor: alert ? "#ef4444" : colors.border }}
      />
      <div
        className="absolute bottom-0 left-0 w-2 h-2 border-b border-l"
        style={{ borderColor: alert ? "#ef4444" : colors.border }}
      />
      <div
        className="absolute bottom-0 right-0 w-2 h-2 border-b border-r"
        style={{ borderColor: alert ? "#ef4444" : colors.border }}
      />

      {/* Label */}
      <div
        className="absolute -top-5 left-0 flex items-center gap-1 px-1 py-px text-[8px] font-mono whitespace-nowrap"
        style={{
          background: "rgba(0,0,0,0.8)",
          color: alert ? "#ef4444" : colors.text,
          border: `1px solid ${alert ? "rgba(239,68,68,0.5)" : colors.border}`,
        }}
      >
        {alert && (
          <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
        )}
        {obj.name.toUpperCase()} {confPct}%
      </div>

      {/* High-alert badge */}
      {alert && (
        <div className="absolute -top-5 right-0 text-[7px] font-mono px-1 py-px bg-red-500/80 text-white rounded-sm">
          ⚠ ALERT
        </div>
      )}
    </motion.div>
  );
}

// ─── YOLO Camera Feed Panel ────────────────────────────────────────────────────

function YoloCameraFeed({
  objects,
  isScanning,
  cameraId,
}: {
  objects: DetectionObject[];
  isScanning: boolean;
  cameraId: string;
}) {
  const [scanY, setScanY] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    let running = true;
    const tick = (ts: number) => {
      if (!running) return;
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      setScanY((elapsed % 2800) / 2800);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const alertCount = objects.filter(isHighAlert).length;

  return (
    <div
      className="relative rounded-xl overflow-hidden border-2"
      style={{
        width: "100%",
        height: 200,
        background: "#020a0f",
        borderColor:
          alertCount > 0 ? "rgba(239,68,68,0.7)" : "rgba(0,217,255,0.3)",
        boxShadow:
          alertCount > 0
            ? "0 0 20px rgba(239,68,68,0.3)"
            : "0 0 12px rgba(0,217,255,0.12)",
      }}
      data-ocid="drone.yolo_feed"
    >
      {/* Static noise */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,217,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Scanline */}
      <div
        className="absolute left-0 w-full pointer-events-none"
        style={{
          top: `${scanY * 100}%`,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,217,255,0.65), transparent)",
          boxShadow: "0 0 8px rgba(0,217,255,0.5)",
        }}
      />

      {/* YOLO Bounding boxes */}
      <AnimatePresence>
        {objects.map((obj, i) => (
          <YoloBoundingBox key={`${i}-${obj.name}-${obj.bbox.x}`} obj={obj} />
        ))}
      </AnimatePresence>

      {/* LIVE badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 border border-red-500/40 rounded px-1.5 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[9px] font-mono text-red-400 tracking-widest">
          LIVE
        </span>
      </div>

      {/* Alert indicator */}
      {alertCount > 0 && (
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-2 right-8 flex items-center gap-1 bg-red-500/80 rounded px-1.5 py-0.5"
        >
          <AlertTriangle className="w-2.5 h-2.5 text-white" />
          <span className="text-[8px] font-mono text-white font-bold">
            {alertCount} ALERT{alertCount > 1 ? "S" : ""}
          </span>
        </motion.div>
      )}

      {/* Scanning indicator */}
      {isScanning && (
        <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-xl animate-pulse" />
      )}

      {/* Camera ID */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <span className="text-[9px] font-mono text-muted-foreground/70 uppercase tracking-wider">
          {cameraId}
        </span>
        <span className="text-[9px] font-mono text-cyan-400/60">
          {objects.length} OBJ
        </span>
      </div>

      {/* YOLO badge */}
      <div className="absolute top-2 right-2 text-[8px] font-mono text-cyan-400/60 border border-cyan-400/20 px-1 py-0.5 rounded bg-black/40">
        YOLOv8
      </div>
    </div>
  );
}

// ─── Camera Feed Card (small thumbnail row) ────────────────────────────────────

function CameraFeedCard({
  feedIndex,
  isActive,
  onClick,
}: { feedIndex: number; isActive: boolean; onClick: () => void }) {
  const [scanY, setScanY] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    let running = true;
    const tick = (ts: number) => {
      if (!running) return;
      if (!startRef.current) startRef.current = ts;
      setScanY(((ts - startRef.current) % 3000) / 3000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const feedNames = ["Gate Alpha", "Perimeter Beta", "Roof Delta"];

  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden cursor-pointer border transition-smooth ${isActive ? "border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.3)]" : "border-border/30 hover:border-amber-400/40"}`}
      style={{ aspectRatio: "16/9", background: "#020a0f" }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      data-ocid={`drone.camera_feed.${feedIndex + 1}`}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,217,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.4) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div
        className="absolute left-0 w-full h-px pointer-events-none"
        style={{
          top: `${scanY * 100}%`,
          background:
            "linear-gradient(90deg, transparent, rgba(0,217,255,0.6), transparent)",
        }}
      />
      <div className="absolute top-1 left-1 flex items-center gap-1 bg-black/60 border border-red-500/30 rounded px-1 py-px">
        <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[7px] font-mono text-red-400">LIVE</span>
      </div>
      <div className="absolute bottom-1 left-1 right-1 flex justify-between items-end">
        <span className="text-[7px] font-mono text-muted-foreground/70">
          {feedNames[feedIndex]}
        </span>
        {isActive && (
          <span className="text-[7px] font-mono text-amber-400 border border-amber-400/40 px-0.5 rounded">
            SEL
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Map View ──────────────────────────────────────────────────────────────────

function MapView({ drones }: { drones: Drone[] }) {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAngle((a) => (a + 0.4) % 360), 50);
    return () => clearInterval(id);
  }, []);

  const orbitPositions = drones.map((_, i) => {
    const baseAngle = angle + i * 120;
    const rad = (baseAngle * Math.PI) / 180;
    const radiusPct = 28 + i * 6;
    return {
      cx: 50 + Math.cos(rad) * radiusPct,
      cy: 50 + Math.sin(rad) * radiusPct,
    };
  });

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden scanline-overlay"
      style={{
        background:
          "radial-gradient(ellipse at center, #021820 0%, #010a0d 70%, #000 100%)",
        minHeight: 180,
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,217,255,0.5) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {[15, 25, 35].map((r) => (
        <div
          key={r}
          className="absolute border border-cyan-400/10 rounded-full"
          style={{
            left: `${50 - r}%`,
            top: `${50 - r}%`,
            width: `${r * 2}%`,
            height: `${r * 2}%`,
          }}
        />
      ))}
      {drones.map((drone, i) => {
        const pos = orbitPositions[i];
        const batt = Number(drone.battery);
        const battColor =
          batt > 60 ? "#22c55e" : batt > 30 ? "#f59e0b" : "#ef4444";
        return (
          <div
            key={drone.id.toString()}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
            style={{ left: `${pos.cx}%`, top: `${pos.cy}%` }}
            data-ocid={`drone.map_marker.${i + 1}`}
          >
            <div
              className="relative"
              style={{ filter: `drop-shadow(0 0 4px ${battColor})` }}
            >
              <Triangle
                className="w-3 h-3"
                style={{ color: battColor, fill: battColor, opacity: 0.9 }}
              />
              {drone.status === "flying" && (
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ background: battColor }}
                />
              )}
            </div>
            <div
              className="text-[7px] font-mono px-1 py-px rounded"
              style={{
                background: "rgba(0,0,0,0.7)",
                border: `1px solid ${battColor}40`,
                color: battColor,
                whiteSpace: "nowrap",
              }}
            >
              D{i + 1} | {drone.altitude}m | {batt}%
            </div>
          </div>
        );
      })}
      <div className="absolute top-2 right-2 text-[8px] font-mono text-cyan-400/50">
        N↑
      </div>
      <div className="absolute bottom-2 right-2 text-[8px] font-mono text-muted-foreground/40">
        SIM
      </div>
    </div>
  );
}

// ─── Detection History Row ─────────────────────────────────────────────────────

function HistoryRow({
  record,
  index,
}: { record: DetectionHistoryRecord; index: number }) {
  const ts = Number(record.timestamp);
  const timeStr = Number.isFinite(ts)
    ? new Date(ts).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";
  const alertObjs = record.objects.filter(isHighAlert);
  const maxConf = record.objects.reduce((m, o) => Math.max(m, o.confidence), 0);
  const confPct = Math.round(maxConf * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`flex items-start gap-2.5 px-2.5 py-2 rounded-lg border text-[10px] font-mono ${alertObjs.length > 0 ? "border-red-400/40 bg-red-400/5" : "border-border/20 bg-muted/10"}`}
      data-ocid={`drone.history_item.${index + 1}`}
    >
      <div className="shrink-0 mt-0.5">
        {alertObjs.length > 0 ? (
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY }}
          >
            ⚠️
          </motion.span>
        ) : (
          "📷"
        )}
      </div>
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-amber-400/80 font-bold uppercase tracking-wider">
            {record.cameraId}
          </span>
          <span className="text-muted-foreground/70">
            {record.objects.length} obj
          </span>
          <span className="text-muted-foreground/50 ml-auto">{timeStr}</span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {record.objects.slice(0, 4).map((o, i) => {
            const colors = getClassColor(o.name);
            return (
              <span
                key={`${o.name}-${i}`}
                className="px-1 py-px rounded text-[8px]"
                style={{
                  color: colors.text,
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {o.name}
              </span>
            );
          })}
          {record.objects.length > 4 && (
            <span className="text-muted-foreground/40 text-[8px]">
              +{record.objects.length - 4}
            </span>
          )}
        </div>
        {/* Confidence bar */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[8px] text-muted-foreground/50">CONF</span>
          <div className="flex-1 h-1 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${confPct}%`,
                background:
                  confPct > 85
                    ? "#ef4444"
                    : confPct > 70
                      ? "#f59e0b"
                      : "#00d9ff",
              }}
            />
          </div>
          <span
            className="text-[8px]"
            style={{
              color:
                confPct > 85 ? "#ef4444" : confPct > 70 ? "#f59e0b" : "#00d9ff",
            }}
          >
            {confPct}%
          </span>
        </div>
      </div>
      {alertObjs.length > 0 && (
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.7, repeat: Number.POSITIVE_INFINITY }}
          className="shrink-0 text-[8px] font-bold text-red-400 border border-red-400/50 px-1 py-px rounded self-start"
        >
          HIGH
        </motion.span>
      )}
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function DronePage() {
  const [drones, setDrones] = useState<Drone[]>([
    {
      id: BigInt(1),
      lat: 28.6139,
      lng: 77.209,
      altitude: 120,
      speed: 45,
      battery: BigInt(78),
      status: "flying",
    },
    {
      id: BigInt(2),
      lat: 19.076,
      lng: 72.8777,
      altitude: 85,
      speed: 30,
      battery: BigInt(45),
      status: "flying",
    },
    {
      id: BigInt(3),
      lat: 12.9716,
      lng: 77.5946,
      altitude: 0,
      speed: 0,
      battery: BigInt(95),
      status: "idle",
    },
  ]);

  const [activeFeed, setActiveFeed] = useState(0);
  const [activeDroneTab, setActiveDroneTab] = useState(0);

  const CAMERA_IDS = ["camera-alpha", "camera-beta", "camera-delta"];

  // YOLO hooks
  const { data: detectionHistory = [] } = useDetectionHistory();
  const { data: _alerts = [] } = useDetectionAlerts();
  const initDetection = useInitDetection();
  const yoloMutation = useYoloDetection();

  const [liveDetections, setLiveDetections] = useState<DetectionObject[]>([]);
  const [activeCameraId, setActiveCameraId] = useState(CAMERA_IDS[0]);

  const initMutate = initDetection.mutate;

  // Init on mount
  useEffect(() => {
    initMutate();
  }, [initMutate]);

  // Drone simulation tick
  useEffect(() => {
    const interval = setInterval(() => {
      setDrones((prev) =>
        prev.map((d) => {
          if (d.status !== "flying") return d;
          const newBatt = BigInt(Math.max(0, Number(d.battery) - 1));
          return {
            ...d,
            lat: d.lat + (Math.random() - 0.5) * 0.008,
            lng: d.lng + (Math.random() - 0.5) * 0.008,
            speed: Math.max(10, d.speed + (Math.random() - 0.5) * 4),
            battery: newBatt,
            status: Number(newBatt) <= 0 ? "landing" : d.status,
          };
        }),
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-update live detections from history
  useEffect(() => {
    if (detectionHistory.length > 0) {
      const latest = detectionHistory[0];
      if (latest) setLiveDetections(latest.objects);
    }
  }, [detectionHistory]);

  const handleRunYolo = async () => {
    const cameraId = CAMERA_IDS[activeFeed];
    setActiveCameraId(cameraId);
    try {
      const result = await yoloMutation.mutateAsync({
        imageData: "demo-frame-base64",
        cameraId,
      });
      setLiveDetections(result.objects);
      const alertCount = result.objects.filter(isHighAlert).length;
      if (alertCount > 0) {
        toast.error(
          `⚠ ${alertCount} HIGH ALERT detection${alertCount > 1 ? "s" : ""} — ${cameraId}`,
          { duration: 4000 },
        );
      } else {
        toast.success(
          `YOLO scan complete — ${result.objects.length} object${result.objects.length !== 1 ? "s" : ""} detected`,
          { duration: 2500 },
        );
      }
    } catch {
      toast.error("Detection scan failed");
    }
  };

  const handleFeedSelect = (i: number) => {
    setActiveFeed(i);
    setActiveCameraId(CAMERA_IDS[i]);
  };

  const handleCommand = async (cmd: string) => {
    const drone = drones[activeDroneTab];
    if (!drone) return;
    try {
      await mockBackend.setDroneCommand(drone.id, cmd);
      setDrones((prev) =>
        prev.map((d, i) => {
          if (i !== activeDroneTab) return d;
          if (cmd === "takeoff")
            return { ...d, status: "flying", altitude: 80, speed: 35 };
          if (cmd === "land") return { ...d, status: "landing" };
          if (cmd === "hover") return { ...d, speed: 0 };
          if (cmd === "rtb") return { ...d, status: "landing" };
          return d;
        }),
      );
      toast.success(`Command sent: ${cmd.toUpperCase()}`, { duration: 2500 });
    } catch {
      toast.error("Command failed");
    }
  };

  const exportLog = () => {
    const rows = detectionHistory.flatMap((r) =>
      r.objects.map(
        (o) =>
          `${new Date(Number(r.timestamp)).toISOString()},${r.cameraId},${o.name},${Math.round(o.confidence * 100)}%,${o.highAlert ? "HIGH" : "NORMAL"}`,
      ),
    );
    const csv = ["Timestamp,Camera,Class,Confidence,Alert", ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `yolo-detection-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Log exported as CSV");
  };

  const selectedDrone = drones[activeDroneTab];
  const batt = selectedDrone ? Number(selectedDrone.battery) : 0;
  const battColor =
    batt > 60 ? "bg-green-400" : batt > 30 ? "bg-amber-400" : "bg-red-500";
  const battBorder =
    batt > 60
      ? "border-green-400/40"
      : batt > 30
        ? "border-amber-400/40"
        : "border-red-500/40";

  const totalAlerts = detectionHistory.reduce(
    (sum, r) => sum + r.objects.filter(isHighAlert).length,
    0,
  );

  return (
    <div className="flex-1 p-4 space-y-4 overflow-auto" data-ocid="drone.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl border border-amber-400/50 flex items-center justify-center"
            style={{
              boxShadow: "0 0 16px rgba(245,158,11,0.35)",
              background: "rgba(245,158,11,0.08)",
            }}
          >
            <Camera className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1
              className="font-mono font-bold text-lg tracking-widest uppercase text-foreground"
              style={{ textShadow: "0 0 14px rgba(245,158,11,0.5)" }}
            >
              Drone &amp; Camera AI Command Center
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground tracking-wider">
              ARIA OMNIVERSE • YOLO v8 PRODUCTION DETECTION ENGINE
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {totalAlerts > 0 && (
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="flex items-center gap-1.5 border border-red-400/60 bg-red-400/10 px-2 py-1 rounded-lg"
            >
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span className="text-[10px] font-mono text-red-400 font-bold">
                {totalAlerts} ALERTS
              </span>
            </motion.div>
          )}
          <Radio className="w-3 h-3 text-green-400 animate-pulse" />
          <span className="text-[10px] font-mono text-green-400 tracking-widest">
            LIVE SIM
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/60">
            |
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {drones.filter((d) => d.status === "flying").length} AIRBORNE
          </span>
        </div>
      </motion.div>

      {/* Warning Banner */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.95 }}
        animate={{ opacity: 1, scaleX: 1 }}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-amber-400/50"
        style={{
          background: "rgba(245,158,11,0.08)",
          boxShadow: "0 0 20px rgba(245,158,11,0.12)",
        }}
        data-ocid="drone.warning_banner"
      >
        <span className="text-amber-400 text-base">⚠️</span>
        <span className="font-mono text-xs text-amber-400 tracking-widest uppercase font-bold">
          SIMULATION MODE — Safe Demo Only
        </span>
        <span className="font-mono text-xs text-amber-400/70 ml-2 hidden sm:block">
          No real drone hardware connected. YOLO detection is simulated for
          demonstration.
        </span>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* ── YOLO Detection Panel (top-left) ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-xl p-4 space-y-3"
          data-ocid="drone.yolo_detection_panel"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">
                YOLO Detection Feed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-muted-foreground border border-border/30 px-1.5 py-0.5 rounded">
                {activeCameraId}
              </span>
              <button
                type="button"
                onClick={() => void handleRunYolo()}
                disabled={yoloMutation.isPending}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-400/60 text-cyan-400 text-[10px] font-mono uppercase tracking-wider hover:bg-cyan-400/10 transition-smooth disabled:opacity-50"
                style={{
                  boxShadow: yoloMutation.isPending
                    ? undefined
                    : "0 0 10px rgba(0,217,255,0.2)",
                }}
                data-ocid="drone.run_yolo_button"
              >
                {yoloMutation.isPending ? (
                  <span className="w-3 h-3 border border-cyan-400/50 border-t-cyan-400 rounded-full animate-spin" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
                {yoloMutation.isPending ? "Scanning…" : "Live Scan"}
              </button>
            </div>
          </div>

          {/* Camera feed with YOLO boxes */}
          <YoloCameraFeed
            objects={liveDetections}
            isScanning={yoloMutation.isPending}
            cameraId={activeCameraId}
          />

          {/* Camera thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <CameraFeedCard
                key={i}
                feedIndex={i}
                isActive={activeFeed === i}
                onClick={() => handleFeedSelect(i)}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 pt-1 border-t border-border/20 flex-wrap">
            {[
              { label: "Person", color: "#00d9ff" },
              { label: "Vehicle", color: "#f59e0b" },
              { label: "Motorcycle", color: "#a78bfa" },
              { label: "Truck", color: "#ef4444" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: color }}
                />
                <span className="text-[9px] font-mono text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 ml-auto">
              <div className="w-2 h-2 rounded-sm border border-red-400/80 animate-pulse" />
              <span className="text-[9px] font-mono text-red-400">
                High Alert (&gt;85%)
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Map View (top-right) ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-panel rounded-xl p-4 space-y-3"
          data-ocid="drone.map_panel"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">
                Tactical Map View
              </span>
            </div>
            <span className="text-[9px] font-mono text-muted-foreground border border-border/30 px-1.5 py-0.5 rounded">
              3 UNITS TRACKED
            </span>
          </div>
          <div className="h-52">
            <MapView drones={drones} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {drones.map((d, i) => (
              <div key={d.id.toString()} className="text-center">
                <div className="text-[9px] font-mono text-amber-400/70">
                  {DRONE_LABELS[i]}
                </div>
                <div className="text-[8px] font-mono text-muted-foreground">
                  {d.lat.toFixed(3)}, {d.lng.toFixed(3)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Detection History Log (bottom-left) ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-xl p-4 flex flex-col gap-3"
          data-ocid="drone.detection_log_panel"
        >
          <div className="flex items-center justify-between flex-shrink-0 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">
                Detection History
              </span>
              <AnimatePresence>
                {totalAlerts > 0 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="text-[8px] font-mono text-red-400 border border-red-400/40 px-1 rounded"
                  >
                    ⚠ {totalAlerts} ALERTS
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={exportLog}
              className="flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground border border-border/40 px-2 py-1 rounded hover:border-amber-400/50 hover:text-amber-400 transition-smooth"
              data-ocid="drone.export_log_button"
            >
              <Download className="w-3 h-3" />
              Export CSV
            </button>
          </div>

          <div
            className="overflow-y-auto flex-1 space-y-1.5 max-h-72 pr-1"
            data-ocid="drone.detection_list"
          >
            {detectionHistory.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-32 gap-2"
                data-ocid="drone.detection_empty_state"
              >
                <Camera className="w-6 h-6 text-muted-foreground/40" />
                <span className="text-[10px] font-mono text-muted-foreground/50">
                  No detections yet — run Live Scan
                </span>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {detectionHistory.map((record, i) => (
                  <HistoryRow
                    key={record.id.toString()}
                    record={record}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* ── Control Panel (bottom-right) ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-panel rounded-xl p-4 space-y-4"
          data-ocid="drone.control_panel"
        >
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">
              Control Panel
            </span>
          </div>

          {/* Drone selector tabs */}
          <div className="flex gap-2" data-ocid="drone.drone_selector_tabs">
            {DRONE_LABELS.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveDroneTab(i)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono uppercase tracking-wider border transition-smooth ${activeDroneTab === i ? "border-amber-400/70 text-amber-400 bg-amber-400/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : "border-border/30 text-muted-foreground hover:border-amber-400/30 hover:text-amber-300"}`}
                data-ocid={`drone.drone_tab.${i + 1}`}
              >
                {label}
              </button>
            ))}
          </div>

          {selectedDrone && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">
                  STATUS
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-widest ${STATUS_BADGE[selectedDrone.status] ?? STATUS_BADGE.idle}`}
                >
                  {selectedDrone.status}
                </span>
              </div>

              <div className="space-y-1" data-ocid="drone.battery_meter">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    BATTERY
                  </span>
                  <span
                    className={`text-[10px] font-mono ${batt > 60 ? "text-green-400" : batt > 30 ? "text-amber-400" : "text-red-400"}`}
                  >
                    {batt}%
                  </span>
                </div>
                <div
                  className={`h-2 rounded-full bg-muted/40 border ${battBorder} overflow-hidden`}
                >
                  <motion.div
                    className={`h-full rounded-full ${battColor}`}
                    style={{ width: `${batt}%` }}
                    animate={{ width: `${batt}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-muted-foreground">
                    ALTITUDE
                  </span>
                  <div className="flex items-end gap-1">
                    <span className="text-lg font-mono font-bold text-foreground leading-none">
                      {selectedDrone.altitude}
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground mb-0.5">
                      m
                    </span>
                  </div>
                  <div className="h-1 bg-muted/40 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{
                        width: `${Math.min(100, (selectedDrone.altitude / 150) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-muted-foreground">
                    SPEED
                  </span>
                  <div className="flex items-end gap-1">
                    <span className="text-lg font-mono font-bold text-foreground leading-none">
                      {Math.round(selectedDrone.speed)}
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground mb-0.5">
                      km/h
                    </span>
                  </div>
                  <div className="h-1 bg-muted/40 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-purple-400 rounded-full"
                      style={{
                        width: `${Math.min(100, (selectedDrone.speed / 80) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-muted-foreground border border-border/20 rounded-lg px-3 py-2">
                <div>
                  <span className="text-muted-foreground/60">LAT</span>
                  <div className="text-foreground/80">
                    {selectedDrone.lat.toFixed(5)}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground/60">LNG</span>
                  <div className="text-foreground/80">
                    {selectedDrone.lng.toFixed(5)}
                  </div>
                </div>
              </div>

              <div
                className="grid grid-cols-2 gap-2"
                data-ocid="drone.command_buttons"
              >
                {CMD_DEFS.map(({ cmd, label, color, icon }) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => void handleCommand(cmd)}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-[10px] font-mono uppercase tracking-wider transition-smooth ${color}`}
                    data-ocid={`drone.${cmd}_button`}
                  >
                    <span className="text-sm leading-none">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setDrones((prev) =>
                    prev.map((d, i) => ({
                      ...d,
                      battery: BigInt(85 + i * 5),
                      status: i < 2 ? "flying" : "idle",
                      altitude: i < 2 ? 80 + i * 20 : 0,
                      speed: i < 2 ? 30 + i * 10 : 0,
                    })),
                  );
                  setLiveDetections([]);
                  toast.success("Simulation reset");
                }}
                className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg border border-border/30 text-[9px] font-mono text-muted-foreground hover:border-cyan-400/30 hover:text-cyan-400 transition-smooth"
                data-ocid="drone.reset_simulation_button"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Simulation
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
