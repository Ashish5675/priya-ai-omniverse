import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Battery,
  Bell,
  BellOff,
  Camera,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  DoorClosed,
  DoorOpen,
  Fan,
  Flame,
  Info,
  Lightbulb,
  Loader2,
  Lock,
  MapPin,
  Navigation,
  RefreshCw,
  Smartphone,
  Thermometer,
  Trash2,
  Unlock,
  User,
  Wifi,
  WifiOff,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useInitMqtt,
  useMqttDevices,
  useMqttHistory,
  useSendMqttCommand,
} from "../hooks/useMqtt";
import type { MqttDevice } from "../hooks/useMqtt";
import { mockBackend } from "../mocks/backend";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrackingAsset {
  id: bigint;
  name: string;
  lat: number;
  lng: number;
  speed: number;
  heading: number;
  status: string;
  battery?: bigint;
}

interface Geofence {
  id: bigint;
  name: string;
  centerLat: number;
  centerLng: number;
  radius: number;
  isActive: boolean;
}

interface AlertLog {
  id: string;
  timestamp: number;
  assetOrDevice: string;
  description: string;
  severity: "info" | "warning" | "critical";
}

// ─── Geofence automation type ─────────────────────────────────────────────────
interface GeofenceRule {
  id: string;
  geofenceId: string;
  geofenceName: string;
  deviceTopic: string;
  deviceName: string;
  action: string;
  enabled: boolean;
}

// ─── Asset type config ────────────────────────────────────────────────────────

const ASSET_CONFIG: Record<
  string,
  { icon: React.ReactNode; color: string; dotColor: string; label: string }
> = {
  vehicle: {
    icon: <Car className="w-3 h-3" />,
    color: "#0d9488",
    dotColor: "bg-teal-400",
    label: "Vehicle",
  },
  person: {
    icon: <User className="w-3 h-3" />,
    color: "#a78bfa",
    dotColor: "bg-violet-400",
    label: "Person",
  },
  device: {
    icon: <Smartphone className="w-3 h-3" />,
    color: "#00d9ff",
    dotColor: "bg-cyan-400",
    label: "Device",
  },
};

function getAssetType(name: string): string {
  const lower = name.toLowerCase();
  if (
    lower.includes("vehicle") ||
    lower.includes("truck") ||
    lower.includes("car")
  )
    return "vehicle";
  if (
    lower.includes("unit") ||
    lower.includes("patrol") ||
    lower.includes("person")
  )
    return "person";
  return "device";
}

// ─── MQTT device icon/config ──────────────────────────────────────────────────

const MQTT_DEVICE_CONFIG: Record<
  string,
  { icon: React.ReactNode; unit?: string; color: string; label: string }
> = {
  "temperature-sensor": {
    icon: <Thermometer className="w-4 h-4" />,
    unit: "°C",
    color: "#f59e0b",
    label: "Temp Sensor",
  },
  "smart-lock": {
    icon: <Lock className="w-4 h-4" />,
    color: "#00d9ff",
    label: "Smart Lock",
  },
  thermostat: {
    icon: <Thermometer className="w-4 h-4" />,
    unit: "°C",
    color: "#06b6d4",
    label: "Thermostat",
  },
  "security-camera": {
    icon: <Camera className="w-4 h-4" />,
    color: "#f87171",
    label: "Camera",
  },
  "smart-light": {
    icon: <Lightbulb className="w-4 h-4" />,
    color: "#fbbf24",
    label: "Smart Light",
  },
  "smart-fan": {
    icon: <Fan className="w-4 h-4" />,
    color: "#4ade80",
    label: "Smart Fan",
  },
};

function getMqttDeviceConfig(deviceType: string) {
  return (
    MQTT_DEVICE_CONFIG[deviceType] ?? {
      icon: <Wifi className="w-4 h-4" />,
      color: "#00d9ff",
      label: deviceType,
    }
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useTrackingAssets() {
  return useQuery<TrackingAsset[]>({
    queryKey: ["tracking-assets"],
    queryFn: async () => {
      const result = await mockBackend.listTrackingAssets();
      return result as TrackingAsset[];
    },
    refetchInterval: 2000,
  });
}

function useGeofences() {
  return useQuery<Geofence[]>({
    queryKey: ["geofences"],
    queryFn: async () => {
      const result = await mockBackend.listGeofences();
      return result as Geofence[];
    },
  });
}

// ─── Map Panel ────────────────────────────────────────────────────────────────

const MAP_CENTER = { lat: 21.1458, lng: 79.0882 };
const MAP_RANGE = { lat: 0.18, lng: 0.22 };

function latLngToPercent(lat: number, lng: number): { x: number; y: number } {
  const x =
    ((lng - (MAP_CENTER.lng - MAP_RANGE.lng / 2)) / MAP_RANGE.lng) * 100;
  const y =
    (1 - (lat - (MAP_CENTER.lat - MAP_RANGE.lat / 2)) / MAP_RANGE.lat) * 100;
  return { x: Math.max(3, Math.min(97, x)), y: Math.max(3, Math.min(97, y)) };
}

interface MapPanelProps {
  assets: TrackingAsset[];
  geofences: Geofence[];
  selectedAssetId: bigint | null;
  onSelectAsset: (id: bigint) => void;
}

function MapPanel({
  assets,
  geofences,
  selectedAssetId,
  onSelectAsset,
}: MapPanelProps) {
  const [hoveredAsset, setHoveredAsset] = useState<bigint | null>(null);

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden border border-teal-500/30"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.08 0.02 200) 0%, oklch(0.06 0.01 200) 100%)",
        boxShadow: "0 0 30px oklch(0.7 0.18 180 / 0.1)",
      }}
      data-ocid="tracking.map_panel"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="oklch(0.7 0.18 180)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.7 0.18 200 / 0.3) 2px, oklch(0.7 0.18 200 / 0.3) 4px)",
        }}
      />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal-500/40 font-mono text-[10px] text-teal-400"
          style={{
            background: "oklch(0.06 0 0 / 0.85)",
            backdropFilter: "blur(8px)",
          }}
        >
          <MapPin className="w-3 h-3" />
          Nagpur, India — 21.1458°N 79.0882°E
        </div>
      </div>
      {geofences.map((gf) => {
        const pos = latLngToPercent(gf.centerLat, gf.centerLng);
        const radiusPct = (gf.radius / 20000) * 100;
        return (
          <div
            key={gf.id.toString()}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${radiusPct * 2.5}%`,
              height: `${radiusPct * 2.5}%`,
              border: `1.5px dashed ${gf.isActive ? "#00d9ff" : "oklch(0.5 0 0)"}`,
              background: gf.isActive
                ? "oklch(0.7 0.18 200 / 0.05)"
                : "transparent",
            }}
          >
            <span
              className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] whitespace-nowrap"
              style={{ color: gf.isActive ? "#00d9ff" : "oklch(0.5 0 0)" }}
            >
              {gf.name}
            </span>
          </div>
        );
      })}
      {assets.map((asset) => {
        const pos = latLngToPercent(asset.lat, asset.lng);
        const type = getAssetType(asset.name);
        const cfg = ASSET_CONFIG[type] ?? ASSET_CONFIG.device;
        const isHovered = hoveredAsset === asset.id;
        const isSelected = selectedAssetId === asset.id;
        return (
          <button
            type="button"
            key={asset.id.toString()}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 bg-transparent border-0 p-0"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onMouseEnter={() => setHoveredAsset(asset.id)}
            onMouseLeave={() => setHoveredAsset(null)}
            onClick={() => onSelectAsset(asset.id)}
            data-ocid={`tracking.map_asset.${Number(asset.id)}`}
          >
            {asset.status === "active" && (
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-40"
                style={{ background: cfg.color, transform: "scale(2)" }}
              />
            )}
            <div
              className="relative w-6 h-6 rounded-full flex items-center justify-center border-2 transition-transform duration-200"
              style={{
                background: `${cfg.color}22`,
                borderColor: cfg.color,
                boxShadow: isSelected
                  ? `0 0 12px ${cfg.color}`
                  : isHovered
                    ? `0 0 8px ${cfg.color}80`
                    : "none",
                transform: isSelected ? "scale(1.3)" : "scale(1)",
                color: cfg.color,
              }}
            >
              {cfg.icon}
            </div>
            <span
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] whitespace-nowrap"
              style={{ color: cfg.color }}
            >
              {asset.name.split(" ")[0]}
            </span>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.12 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                >
                  <div
                    className="px-2.5 py-2 rounded-lg border font-mono text-[10px] whitespace-nowrap min-w-[140px]"
                    style={{
                      background: "oklch(0.1 0 0 / 0.95)",
                      borderColor: `${cfg.color}60`,
                      boxShadow: `0 4px 16px ${cfg.color}30`,
                    }}
                  >
                    <p className="font-bold mb-1" style={{ color: cfg.color }}>
                      {asset.name}
                    </p>
                    <p className="text-muted-foreground">
                      Speed: {asset.speed} km/h
                    </p>
                    <p className="text-muted-foreground">
                      Heading: {asset.heading}°
                    </p>
                    <p className="text-muted-foreground capitalize">
                      Status:{" "}
                      <span
                        style={{
                          color:
                            asset.status === "active"
                              ? "#4ade80"
                              : asset.status === "idle"
                                ? "#fbbf24"
                                : "#f87171",
                        }}
                      >
                        {asset.status}
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}
      <div className="absolute bottom-3 right-3 opacity-50">
        <Navigation className="w-4 h-4 text-teal-400" />
        <span className="block text-center font-mono text-[8px] text-teal-400 mt-0.5">
          N
        </span>
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-1 opacity-50">
        <div className="w-12 h-0.5 bg-teal-400" />
        <span className="font-mono text-[8px] text-teal-400">~10km</span>
      </div>
    </div>
  );
}

// ─── Asset List Panel ─────────────────────────────────────────────────────────

interface AssetListProps {
  assets: TrackingAsset[];
  isLoading: boolean;
  selectedAssetId: bigint | null;
  onSelectAsset: (id: bigint) => void;
  onSimulate: () => void;
  isSimulating: boolean;
}

function BatteryBar({ value }: { value: number }) {
  const color = value > 60 ? "#4ade80" : value > 30 ? "#fbbf24" : "#f87171";
  return (
    <div className="flex items-center gap-1.5" title={`${value}%`}>
      <div className="w-10 h-1.5 rounded-full bg-border/30 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="font-mono text-[9px]" style={{ color }}>
        {value}%
      </span>
    </div>
  );
}

function AssetListPanel({
  assets,
  isLoading,
  selectedAssetId,
  onSelectAsset,
  onSimulate,
  isSimulating,
}: AssetListProps) {
  return (
    <div
      className="flex flex-col h-full rounded-xl border border-teal-500/30 overflow-hidden"
      style={{ background: "oklch(0.09 0.01 200 / 0.95)" }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-teal-500/20">
        <span className="font-mono text-xs text-teal-400 uppercase tracking-widest">
          Assets ({assets.length})
        </span>
        <button
          type="button"
          onClick={onSimulate}
          disabled={isSimulating}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-teal-500/40 text-teal-400 text-[10px] font-mono hover:bg-teal-500/10 transition-smooth disabled:opacity-50"
          data-ocid="tracking.simulate_button"
        >
          <RefreshCw
            className={`w-3 h-3 ${isSimulating ? "animate-spin" : ""}`}
          />
          Simulate
        </button>
      </div>
      <div className="grid grid-cols-[1fr_80px_60px_70px_80px] gap-x-2 px-4 py-2 border-b border-border/20">
        {["Name", "Speed", "Status", "Battery", "Updated"].map((h) => (
          <span
            key={h}
            className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest"
          >
            {h}
          </span>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <div
            className="flex items-center justify-center py-8"
            data-ocid="tracking.assets_loading_state"
          >
            <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
          </div>
        )}
        {assets.map((asset, idx) => {
          const type = getAssetType(asset.name);
          const cfg = ASSET_CONFIG[type] ?? ASSET_CONFIG.device;
          const isSelected = selectedAssetId === asset.id;
          const battery =
            asset.battery !== undefined ? Number(asset.battery) : null;
          return (
            <motion.div
              key={asset.id.toString()}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="grid grid-cols-[1fr_80px_60px_70px_80px] gap-x-2 px-4 py-2.5 cursor-pointer border-b border-border/10 hover:bg-teal-500/5 transition-smooth items-center"
              style={{
                borderLeft: isSelected
                  ? `2px solid ${cfg.color}`
                  : "2px solid transparent",
              }}
              onClick={() => onSelectAsset(asset.id)}
              data-ocid={`tracking.asset.${idx + 1}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex-shrink-0" style={{ color: cfg.color }}>
                  {cfg.icon}
                </span>
                <span className="font-mono text-[11px] text-foreground truncate">
                  {asset.name}
                </span>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                {asset.speed} km/h
              </span>
              <span
                className={`inline-flex items-center gap-1 font-mono text-[9px] px-1.5 py-0.5 rounded border w-fit ${asset.status === "active" ? "text-green-400 border-green-400/30 bg-green-400/5" : asset.status === "idle" ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/5" : "text-muted-foreground border-border/30"}`}
              >
                <span
                  className={`w-1 h-1 rounded-full ${asset.status === "active" ? "bg-green-400 animate-pulse" : asset.status === "idle" ? "bg-yellow-400" : "bg-muted-foreground"}`}
                />
                {asset.status}
              </span>
              <div>
                {battery !== null ? (
                  <BatteryBar value={battery} />
                ) : (
                  <span className="font-mono text-[9px] text-muted-foreground/40">
                    N/A
                  </span>
                )}
              </div>
              <span className="font-mono text-[9px] text-muted-foreground/60">
                just now
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MQTT Device Card ─────────────────────────────────────────────────────────

interface MqttDeviceCardProps {
  device: MqttDevice;
  index: number;
  onCommand: (topic: string, payload: string) => void;
  isPending: boolean;
  onClick: (device: MqttDevice) => void;
}

function MqttDeviceCard({
  device,
  index,
  onCommand,
  isPending,
  onClick,
}: MqttDeviceCardProps) {
  const cfg = getMqttDeviceConfig(device.deviceType);
  const [tempValue, setTempValue] = useState(() => {
    const parsed = Number.parseFloat(device.state);
    return Number.isNaN(parsed) ? 22 : parsed;
  });
  const [fanSpeed, setFanSpeed] = useState<string>(
    ["off", "low", "medium", "high"].includes(device.state)
      ? device.state
      : "medium",
  );
  const [isPulsing, setIsPulsing] = useState(false);

  const fire = (payload: string) => {
    onCommand(device.topic, payload);
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 800);
  };

  const isToggle =
    device.deviceType === "smart-light" ||
    device.deviceType === "security-camera" ||
    device.deviceType === "smart-lock";
  const isActive =
    device.state === "on" ||
    device.state === "armed" ||
    device.state === "locked";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative rounded-xl border p-3 cursor-pointer overflow-hidden transition-smooth"
      style={{
        borderColor: isPulsing ? cfg.color : `${cfg.color}30`,
        background: isPulsing ? `${cfg.color}08` : "oklch(0.11 0.01 200)",
        boxShadow: isPulsing
          ? `0 0 18px ${cfg.color}40`
          : "0 0 0px transparent",
      }}
      onClick={() => onClick(device)}
      data-ocid={`tracking.mqtt_device.${index + 1}`}
    >
      {isPulsing && (
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: `${cfg.color}18` }}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${cfg.color}18`, color: cfg.color }}
          >
            {cfg.icon}
          </div>
          <div>
            <p className="font-mono text-[10px] text-foreground leading-tight truncate max-w-[100px]">
              {cfg.label}
            </p>
            <p className="font-mono text-[8px] text-muted-foreground/60 truncate max-w-[100px]">
              {device.topic}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          {device.isOnline ? (
            <span className="flex items-center gap-1 font-mono text-[8px] text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online
            </span>
          ) : (
            <span className="flex items-center gap-1 font-mono text-[8px] text-muted-foreground/50">
              <WifiOff className="w-2.5 h-2.5" />
              Offline
            </span>
          )}
        </div>
      </div>

      {/* Value display */}
      <div className="mb-2 font-mono text-[11px]" style={{ color: cfg.color }}>
        {device.deviceType === "temperature-sensor" ||
        device.deviceType === "thermostat" ? (
          <span>
            {Number.parseFloat(device.state).toFixed(1)}
            {cfg.unit}
          </span>
        ) : (
          <span className="capitalize">{device.state}</span>
        )}
      </div>

      {/* Controls */}
      {isToggle && (
        <button
          type="button"
          disabled={isPending || !device.isOnline}
          onClick={(e) => {
            e.stopPropagation();
            fire(isActive ? "off" : "on");
          }}
          className="w-full py-1 rounded border font-mono text-[9px] flex items-center justify-center gap-1.5 transition-smooth disabled:opacity-40"
          style={{
            borderColor: isActive ? cfg.color : "oklch(0.25 0 0)",
            color: isActive ? cfg.color : "oklch(0.5 0 0)",
            background: isActive ? `${cfg.color}10` : "transparent",
          }}
          data-ocid={`tracking.mqtt_toggle.${index + 1}`}
        >
          {device.deviceType === "smart-lock" ? (
            isActive ? (
              <Lock className="w-3 h-3" />
            ) : (
              <Unlock className="w-3 h-3" />
            )
          ) : null}
          {device.state.toUpperCase()}
        </button>
      )}

      {(device.deviceType === "thermostat" ||
        device.deviceType === "temperature-sensor") &&
        device.isOnline && (
          <fieldset
            className="space-y-1 border-0 p-0 m-0"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-muted-foreground">
                Set temp
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    const v = Math.max(16, tempValue - 1);
                    setTempValue(v);
                    fire(String(v));
                  }}
                  className="w-5 h-5 rounded border border-border/30 font-mono text-[9px] flex items-center justify-center hover:border-cyan-500/50 transition-smooth"
                  data-ocid={`tracking.mqtt_thermo_down.${index + 1}`}
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    const v = Math.min(35, tempValue + 1);
                    setTempValue(v);
                    fire(String(v));
                  }}
                  className="w-5 h-5 rounded border border-border/30 font-mono text-[9px] flex items-center justify-center hover:border-cyan-500/50 transition-smooth"
                  data-ocid={`tracking.mqtt_thermo_up.${index + 1}`}
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
              </div>
            </div>
            <input
              type="range"
              min={16}
              max={35}
              value={tempValue}
              onChange={(e) => {
                const v = Number(e.target.value);
                setTempValue(v);
                fire(String(v));
              }}
              className="w-full h-1 rounded cursor-pointer accent-cyan-400"
              data-ocid={`tracking.mqtt_thermo_slider.${index + 1}`}
            />
          </fieldset>
        )}

      {device.deviceType === "smart-fan" && device.isOnline && (
        <fieldset
          className="flex gap-1 mt-1 border-0 p-0 m-0"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {(["off", "low", "med", "high"] as const).map((v) => {
            const realVal = v === "med" ? "medium" : v;
            const isAct = v === "med" ? fanSpeed === "medium" : fanSpeed === v;
            return (
              <button
                key={v}
                type="button"
                disabled={isPending}
                onClick={() => {
                  setFanSpeed(realVal);
                  fire(realVal);
                }}
                className="flex-1 py-0.5 rounded font-mono text-[8px] border transition-smooth"
                style={{
                  borderColor: isAct ? cfg.color : "oklch(0.2 0 0)",
                  color: isAct ? cfg.color : "oklch(0.5 0 0)",
                  background: isAct ? `${cfg.color}12` : "transparent",
                }}
                data-ocid={`tracking.mqtt_fan_${v}.${index + 1}`}
              >
                {v.toUpperCase()}
              </button>
            );
          })}
        </fieldset>
      )}

      {/* History hint */}
      <div className="mt-2 flex items-center gap-1 opacity-40">
        <ChevronRight className="w-3 h-3 text-muted-foreground" />
        <span className="font-mono text-[8px] text-muted-foreground">
          View history
        </span>
      </div>
    </motion.div>
  );
}

// ─── Device History Drawer ────────────────────────────────────────────────────

interface DeviceHistoryDrawerProps {
  device: MqttDevice | null;
  onClose: () => void;
}

function DeviceHistoryDrawer({ device, onClose }: DeviceHistoryDrawerProps) {
  const { data: history = [], isLoading } = useMqttHistory(device?.id ?? null);
  const cfg = device ? getMqttDeviceConfig(device.deviceType) : null;

  return (
    <AnimatePresence>
      {device && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-80 flex flex-col border-l border-cyan-500/30 overflow-hidden"
            style={{ background: "oklch(0.08 0.01 200)" }}
            data-ocid="tracking.mqtt_history_drawer"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${cfg?.color ?? "#00d9ff"}18`,
                    color: cfg?.color ?? "#00d9ff",
                  }}
                >
                  {cfg?.icon}
                </div>
                <div>
                  <p className="font-mono text-[11px] text-foreground font-bold">
                    {cfg?.label}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground/60 truncate max-w-[160px]">
                    {device.topic}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg border border-border/30 text-muted-foreground hover:text-foreground hover:border-border/60 transition-smooth"
                data-ocid="tracking.mqtt_history_close_button"
                aria-label="Close history drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current state */}
            <div className="px-5 py-3 border-b border-border/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  Current State
                </span>
                {device.isOnline ? (
                  <span className="flex items-center gap-1 font-mono text-[9px] text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground/50">
                    <WifiOff className="w-2.5 h-2.5" />
                    Offline
                  </span>
                )}
              </div>
              <p
                className="font-mono text-base mt-1 font-bold"
                style={{ color: cfg?.color ?? "#00d9ff" }}
              >
                {device.state}
                {cfg?.unit && (
                  <span className="text-sm ml-0.5 opacity-70">{cfg.unit}</span>
                )}
              </p>
            </div>

            {/* History timeline */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-3">
                State History
              </p>
              {isLoading ? (
                <div
                  className="flex items-center justify-center py-6"
                  data-ocid="tracking.mqtt_history_loading_state"
                >
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                </div>
              ) : history.length === 0 ? (
                <div
                  className="text-center py-6"
                  data-ocid="tracking.mqtt_history_empty_state"
                >
                  <Clock className="w-6 h-6 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="font-mono text-[10px] text-muted-foreground/40">
                    No history yet
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-border/20" />
                  <div className="space-y-3">
                    {history.map((entry, idx) => {
                      const ts = Number(entry.timestamp);
                      const date = new Date(ts > 1e15 ? ts / 1_000_000 : ts);
                      const timeStr = date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      });
                      return (
                        <motion.div
                          key={`${entry.deviceId.toString()}-${idx}`}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="flex items-start gap-3 pl-7"
                          data-ocid={`tracking.mqtt_history_item.${idx + 1}`}
                        >
                          <div
                            className="absolute left-2 w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 mt-0.5"
                            style={{
                              borderColor: cfg?.color ?? "#00d9ff",
                              background:
                                idx === 0
                                  ? (cfg?.color ?? "#00d9ff")
                                  : "oklch(0.08 0.01 200)",
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className="font-mono text-[10px] font-bold truncate"
                                style={{ color: cfg?.color ?? "#00d9ff" }}
                              >
                                {entry.state}
                                {cfg?.unit && (
                                  <span className="opacity-60 ml-0.5">
                                    {cfg.unit}
                                  </span>
                                )}
                              </span>
                              <span className="font-mono text-[8px] text-muted-foreground/50 flex-shrink-0">
                                {timeStr}
                              </span>
                            </div>
                            {entry.value !== 0 && (
                              <p className="font-mono text-[9px] text-muted-foreground/60">
                                val: {entry.value.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── MQTT Device Grid ─────────────────────────────────────────────────────────

interface MqttDeviceGridProps {
  devices: MqttDevice[];
  isLoading: boolean;
  isDemoMode: boolean;
  onCommand: (topic: string, payload: string) => void;
  isPending: boolean;
  onDeviceClick: (device: MqttDevice) => void;
}

function MqttDeviceGrid({
  devices,
  isLoading,
  isDemoMode,
  onCommand,
  isPending,
  onDeviceClick,
}: MqttDeviceGridProps) {
  return (
    <div
      className="flex flex-col h-full rounded-xl border border-cyan-500/30 overflow-hidden"
      style={{ background: "oklch(0.09 0.01 200 / 0.95)" }}
      data-ocid="tracking.mqtt_panel"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
            MQTT IoT Devices
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 font-mono text-[9px] text-cyan-400">
            {devices.length}
          </span>
        </div>
        {isDemoMode ? (
          <span
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 font-mono text-[9px] text-yellow-400"
            data-ocid="tracking.mqtt_demo_badge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Demo Mode
          </span>
        ) : (
          <span
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-green-500/40 bg-green-500/10 font-mono text-[9px] text-green-400"
            data-ocid="tracking.mqtt_connected_badge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            MQTT Connected
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {isLoading ? (
          <div
            className="flex items-center justify-center py-10"
            data-ocid="tracking.mqtt_loading_state"
          >
            <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
          </div>
        ) : devices.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 gap-2"
            data-ocid="tracking.mqtt_empty_state"
          >
            <WifiOff className="w-7 h-7 text-muted-foreground/30" />
            <p className="font-mono text-xs text-muted-foreground/40">
              No devices found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
            {devices.map((device, idx) => (
              <MqttDeviceCard
                key={device.id.toString()}
                device={device}
                index={idx}
                onCommand={onCommand}
                isPending={isPending}
                onClick={onDeviceClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Geofence Automation Panel ────────────────────────────────────────────────

interface GeofenceAutomationProps {
  geofences: Geofence[];
  mqttDevices: MqttDevice[];
  onAlertAdded: (alert: AlertLog) => void;
}

const GEOFENCE_ACTIONS = [
  "Turn ON",
  "Turn OFF",
  "Lock",
  "Unlock",
  "Arm",
  "Disarm",
];

function GeofenceAutomationPanel({
  geofences,
  mqttDevices,
  onAlertAdded,
}: GeofenceAutomationProps) {
  const [rules, setRules] = useState<GeofenceRule[]>([
    {
      id: "rule-1",
      geofenceId: "gf-1",
      geofenceName: "HQ Perimeter",
      deviceTopic: "home/frontdoor/lock",
      deviceName: "Front Door Lock",
      action: "Lock",
      enabled: true,
    },
    {
      id: "rule-2",
      geofenceId: "gf-2",
      geofenceName: "Server Farm Zone",
      deviceTopic: "security/cam1/status",
      deviceName: "Security Camera",
      action: "Arm",
      enabled: false,
    },
  ]);
  const [newGf, setNewGf] = useState(geofences[0]?.name ?? "");
  const [newDevice, setNewDevice] = useState(mqttDevices[0]?.topic ?? "");
  const [newAction, setNewAction] = useState(GEOFENCE_ACTIONS[0]);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );
    const rule = rules.find((r) => r.id === id);
    if (rule) {
      onAlertAdded({
        id: `gf-rule-${Date.now()}`,
        timestamp: Date.now(),
        assetOrDevice: rule.deviceName,
        description: `Geofence rule "${rule.geofenceName} → ${rule.action}" ${!rule.enabled ? "enabled" : "disabled"}`,
        severity: "info",
      });
    }
  };

  const addRule = () => {
    if (!newGf || !newDevice) return;
    const deviceObj = mqttDevices.find((d) => d.topic === newDevice);
    const cfg = deviceObj ? getMqttDeviceConfig(deviceObj.deviceType) : null;
    const newRule: GeofenceRule = {
      id: `rule-${Date.now()}`,
      geofenceId: newGf,
      geofenceName: newGf,
      deviceTopic: newDevice,
      deviceName: cfg?.label ?? newDevice,
      action: newAction,
      enabled: true,
    };
    setRules((prev) => [newRule, ...prev]);
    onAlertAdded({
      id: `gf-new-${Date.now()}`,
      timestamp: Date.now(),
      assetOrDevice: newRule.deviceName,
      description: `New geofence automation: "${newRule.geofenceName} → ${newRule.action}"`,
      severity: "info",
    });
  };

  return (
    <div
      className="rounded-xl border border-violet-500/30 p-4 space-y-3"
      style={{ background: "oklch(0.09 0.01 200 / 0.95)" }}
      data-ocid="tracking.geofence_automation"
    >
      <div className="flex items-center gap-2 mb-1">
        <MapPin className="w-3.5 h-3.5 text-violet-400" />
        <span className="font-mono text-xs text-violet-400 uppercase tracking-widest">
          Geofence Automation
        </span>
      </div>

      <div className="space-y-2">
        {rules.map((rule, idx) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg border border-border/20"
            style={{
              background: rule.enabled
                ? "oklch(0.58 0.17 282 / 0.05)"
                : "transparent",
            }}
            data-ocid={`tracking.geofence_rule.${idx + 1}`}
          >
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] text-foreground truncate">
                <span className="text-violet-400">{rule.geofenceName}</span>
                <span className="text-muted-foreground mx-1.5">→</span>
                <span className="text-cyan-400">{rule.deviceName}</span>
                <span className="text-muted-foreground mx-1.5">·</span>
                <span className="text-foreground/80">{rule.action}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleRule(rule.id)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono text-[9px] transition-smooth flex-shrink-0"
              style={{
                borderColor: rule.enabled ? "#a78bfa" : "oklch(0.25 0 0)",
                color: rule.enabled ? "#a78bfa" : "oklch(0.5 0 0)",
                background: rule.enabled
                  ? "oklch(0.58 0.17 282 / 0.1)"
                  : "transparent",
              }}
              data-ocid={`tracking.geofence_rule_toggle.${idx + 1}`}
            >
              {rule.enabled ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <span className="w-3 h-3 rounded-full border border-current inline-block" />
              )}
              {rule.enabled ? "Active" : "Off"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Add rule row */}
      <div className="flex items-center gap-2 pt-2 border-t border-border/10">
        <select
          value={newGf}
          onChange={(e) => setNewGf(e.target.value)}
          className="flex-1 min-w-0 bg-card border border-border/30 rounded px-2 py-1 font-mono text-[9px] text-foreground focus:outline-none focus:border-violet-500/60"
          data-ocid="tracking.geofence_select"
        >
          {geofences.map((g) => (
            <option key={g.id.toString()} value={g.name}>
              {g.name}
            </option>
          ))}
          {geofences.length === 0 && (
            <option value="HQ Perimeter">HQ Perimeter</option>
          )}
        </select>
        <select
          value={newDevice}
          onChange={(e) => setNewDevice(e.target.value)}
          className="flex-1 min-w-0 bg-card border border-border/30 rounded px-2 py-1 font-mono text-[9px] text-foreground focus:outline-none focus:border-cyan-500/60"
          data-ocid="tracking.geofence_device_select"
        >
          {mqttDevices.map((d) => (
            <option key={d.id.toString()} value={d.topic}>
              {getMqttDeviceConfig(d.deviceType).label}
            </option>
          ))}
          {mqttDevices.length === 0 && (
            <option value="home/frontdoor/lock">Front Door Lock</option>
          )}
        </select>
        <select
          value={newAction}
          onChange={(e) => setNewAction(e.target.value)}
          className="w-20 bg-card border border-border/30 rounded px-2 py-1 font-mono text-[9px] text-foreground focus:outline-none focus:border-violet-500/60"
          data-ocid="tracking.geofence_action_select"
        >
          {GEOFENCE_ACTIONS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addRule}
          className="px-2.5 py-1 rounded-lg border border-violet-500/40 text-violet-400 font-mono text-[9px] hover:bg-violet-500/10 transition-smooth flex-shrink-0"
          data-ocid="tracking.geofence_add_button"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

// ─── Alert Log ────────────────────────────────────────────────────────────────

const SEVERITY_CONFIG = {
  info: { color: "#00d9ff", icon: <Info className="w-3 h-3" />, label: "INFO" },
  warning: {
    color: "#f59e0b",
    icon: <AlertTriangle className="w-3 h-3" />,
    label: "WARN",
  },
  critical: {
    color: "#f87171",
    icon: <Flame className="w-3 h-3" />,
    label: "CRIT",
  },
};

const INITIAL_ALERTS: AlertLog[] = [
  {
    id: "a1",
    timestamp: Date.now() - 120000,
    assetOrDevice: "Security Vehicle Alpha",
    description: "Entered HQ Perimeter geofence",
    severity: "info",
  },
  {
    id: "a2",
    timestamp: Date.now() - 90000,
    assetOrDevice: "Front Door Lock",
    description: "Door unlocked remotely by admin",
    severity: "warning",
  },
  {
    id: "a3",
    timestamp: Date.now() - 60000,
    assetOrDevice: "Patrol Unit Beta",
    description: "Asset went offline unexpectedly",
    severity: "critical",
  },
  {
    id: "a4",
    timestamp: Date.now() - 30000,
    assetOrDevice: "Security Camera",
    description: "Motion detected in restricted zone",
    severity: "warning",
  },
  {
    id: "a5",
    timestamp: Date.now() - 15000,
    assetOrDevice: "Emergency Response Unit",
    description: "Exited Server Farm Zone boundary",
    severity: "info",
  },
];

const SIMULATED_ALERTS: AlertLog[] = [
  {
    id: "s1",
    timestamp: 0,
    assetOrDevice: "Living Room Light",
    description: "Turned on via MQTT command",
    severity: "info",
  },
  {
    id: "s2",
    timestamp: 0,
    assetOrDevice: "Logistics Truck Delta",
    description: "Speed exceeded 80 km/h limit",
    severity: "warning",
  },
  {
    id: "s3",
    timestamp: 0,
    assetOrDevice: "Garage Door",
    description: "Opened at unusual hour",
    severity: "critical",
  },
  {
    id: "s4",
    timestamp: 0,
    assetOrDevice: "HVAC Controller",
    description: "Device came back online",
    severity: "info",
  },
  {
    id: "s5",
    timestamp: 0,
    assetOrDevice: "Security Camera",
    description: "Armed — perimeter secured",
    severity: "info",
  },
];

function formatAlertTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface AlertLogPanelProps {
  alerts: AlertLog[];
  onClear: () => void;
}

function AlertLogPanel({ alerts, onClear }: AlertLogPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevLen = useRef(alerts.length);

  if (prevLen.current !== alerts.length && scrollRef.current) {
    scrollRef.current.scrollTop = 0;
    prevLen.current = alerts.length;
  }

  return (
    <div
      className="flex flex-col h-full rounded-xl border border-violet-500/30 overflow-hidden"
      style={{ background: "oklch(0.09 0.01 200 / 0.95)" }}
      data-ocid="tracking.alert_log"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-violet-500/20">
        <div className="flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-mono text-xs text-violet-400 uppercase tracking-widest">
            Alert Log
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-violet-400/20 border border-violet-400/30 font-mono text-[9px] text-violet-400">
            {alerts.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border/30 text-muted-foreground text-[10px] font-mono hover:text-foreground hover:border-border/60 transition-smooth"
          data-ocid="tracking.clear_alerts_button"
        >
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-0">
        <AnimatePresence initial={false}>
          {alerts.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-8 gap-2"
              data-ocid="tracking.alerts_empty_state"
            >
              <BellOff className="w-6 h-6 text-muted-foreground/30" />
              <span className="font-mono text-xs text-muted-foreground/40">
                No alerts
              </span>
            </div>
          )}
          {alerts.map((alert, idx) => {
            const sev = SEVERITY_CONFIG[alert.severity];
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 px-4 py-3 border-b border-border/10 hover:bg-white/[0.02] transition-smooth"
                data-ocid={`tracking.alert.${idx + 1}`}
              >
                <div
                  className="flex-shrink-0 mt-0.5 p-1 rounded"
                  style={{ color: sev.color, background: `${sev.color}15` }}
                >
                  {sev.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="font-mono text-[10px] font-bold"
                      style={{ color: sev.color }}
                    >
                      [{sev.label}]
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {alert.assetOrDevice}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground/50 ml-auto flex-shrink-0">
                      {formatAlertTime(alert.timestamp)}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-foreground/80 leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function TrackingPage() {
  const qc = useQueryClient();
  const { data: assets = [], isLoading: assetsLoading } = useTrackingAssets();
  const { data: geofences = [] } = useGeofences();
  const { data: mqttDevices = [], isLoading: mqttLoading } = useMqttDevices();
  const sendMqttCmd = useSendMqttCommand();
  const initMqtt = useInitMqtt();

  const [selectedAssetId, setSelectedAssetId] = useState<bigint | null>(null);
  const [alerts, setAlerts] = useState<AlertLog[]>(INITIAL_ALERTS);
  const [selectedMqttDevice, setSelectedMqttDevice] =
    useState<MqttDevice | null>(null);
  const alertIndexRef = useRef(0);
  const initMqttRef = useRef(initMqtt.mutate);
  initMqttRef.current = initMqtt.mutate;

  // Init MQTT on mount
  useEffect(() => {
    initMqttRef.current();
  }, []);

  // Determine if we're in demo mode (no real MQTT broker)
  const isDemoMode =
    mqttDevices.length === 0 || !mqttDevices.some((d) => d.isOnline);

  const simulateMut = useMutation({
    mutationFn: async () => mockBackend.simulateMovement(),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["tracking-assets"] });
      const alert: AlertLog = {
        id: `sim-${Date.now()}`,
        timestamp: Date.now(),
        assetOrDevice: "All Assets",
        description: "GPS positions updated via simulation",
        severity: "info",
      };
      setAlerts((prev) => [alert, ...prev].slice(0, 50));
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const template =
        SIMULATED_ALERTS[alertIndexRef.current % SIMULATED_ALERTS.length];
      alertIndexRef.current++;
      setAlerts((prev) =>
        [
          { ...template, id: `auto-${Date.now()}`, timestamp: Date.now() },
          ...prev,
        ].slice(0, 50),
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleMqttCommand = useCallback(
    (topic: string, payload: string) => {
      const device = mqttDevices.find((d) => d.topic === topic);
      void sendMqttCmd.mutateAsync({ topic, payload, action: "set" });
      const alert: AlertLog = {
        id: `mqtt-${Date.now()}`,
        timestamp: Date.now(),
        assetOrDevice: device
          ? getMqttDeviceConfig(device.deviceType).label
          : topic,
        description: `MQTT command: ${topic} → ${payload}`,
        severity: "info",
      };
      setAlerts((prev) => [alert, ...prev].slice(0, 50));
    },
    [sendMqttCmd, mqttDevices],
  );

  const handleClearAlerts = useCallback(() => setAlerts([]), []);

  const handleSimulate = useCallback(() => {
    void simulateMut.mutateAsync();
  }, [simulateMut]);

  const handleAlertAdded = useCallback((alert: AlertLog) => {
    setAlerts((prev) => [alert, ...prev].slice(0, 50));
  }, []);

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      data-ocid="tracking.page"
    >
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 py-4 border-b border-teal-500/20"
        style={{ background: "oklch(0.08 0.01 200 / 0.8)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "oklch(0.52 0.18 180 / 0.15)",
              border: "1px solid oklch(0.52 0.18 180 / 0.4)",
              boxShadow: "0 0 12px oklch(0.52 0.18 180 / 0.25)",
            }}
          >
            <MapPin className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <h1
              className="font-display font-bold text-base text-foreground tracking-widest uppercase"
              style={{ textShadow: "0 0 20px oklch(0.52 0.18 180 / 0.5)" }}
            >
              Live Tracking &amp; IoT Control Center
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground">
              Nagpur, India · {assets.length} active assets ·{" "}
              {mqttDevices.length} MQTT devices
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {isDemoMode ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-yellow-500/40 bg-yellow-500/10 font-mono text-[9px] text-yellow-400">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                Demo Mode
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/40 bg-green-500/10 font-mono text-[9px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                MQTT Connected
              </span>
            )}
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-teal-400">
              <Zap className="w-3 h-3" />
              Live
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Row 1: Map (60%) + Asset list (40%) */}
        <div
          className="grid grid-cols-5 gap-3"
          style={{ minHeight: "280px", height: "28vh" }}
        >
          <div className="col-span-3">
            <MapPanel
              assets={assets}
              geofences={geofences}
              selectedAssetId={selectedAssetId}
              onSelectAsset={setSelectedAssetId}
            />
          </div>
          <div className="col-span-2">
            <AssetListPanel
              assets={assets}
              isLoading={assetsLoading}
              selectedAssetId={selectedAssetId}
              onSelectAsset={setSelectedAssetId}
              onSimulate={handleSimulate}
              isSimulating={simulateMut.isPending}
            />
          </div>
        </div>

        {/* Row 2: MQTT Device Grid */}
        <div style={{ minHeight: "260px", height: "28vh" }}>
          <MqttDeviceGrid
            devices={mqttDevices}
            isLoading={mqttLoading}
            isDemoMode={isDemoMode}
            onCommand={handleMqttCommand}
            isPending={sendMqttCmd.isPending}
            onDeviceClick={setSelectedMqttDevice}
          />
        </div>

        {/* Row 3: Geofence Automation + Alert Log */}
        <div className="grid grid-cols-2 gap-3" style={{ minHeight: "220px" }}>
          <GeofenceAutomationPanel
            geofences={geofences}
            mqttDevices={mqttDevices}
            onAlertAdded={handleAlertAdded}
          />
          <AlertLogPanel alerts={alerts} onClear={handleClearAlerts} />
        </div>
      </div>

      {/* Device History Drawer */}
      <DeviceHistoryDrawer
        device={selectedMqttDevice}
        onClose={() => setSelectedMqttDevice(null)}
      />
    </div>
  );
}
