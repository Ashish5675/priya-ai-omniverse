import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  MqttCommand,
  MqttCommandResult,
  MqttDevice,
  MqttDeviceHistory,
} from "../backend";
import { mockBackend } from "../mocks/backend";

// ─── Demo-mode simulation helpers ─────────────────────────────────────────────

const DEMO_TOPICS = [
  "home/livingroom/light",
  "home/frontdoor/lock",
  "office/hvac/thermostat",
  "security/cam1/status",
  "home/bedroom/fan",
  "factory/sensor1/temperature",
];

const DEMO_TYPES = [
  "smart-light",
  "smart-lock",
  "thermostat",
  "security-camera",
  "smart-fan",
  "temperature-sensor",
];

const DEMO_STATES = ["on", "locked", "22", "armed", "medium", "24.5"];

// Simulate polling: cycle states slightly each call
let _demoTick = 0;

function buildDemoDevices(): MqttDevice[] {
  _demoTick++;
  const tempOffset = Math.sin(_demoTick * 0.3) * 2;
  return DEMO_TOPICS.map((topic, i) => {
    const baseState = DEMO_STATES[i];
    const state =
      DEMO_TYPES[i] === "temperature-sensor"
        ? String((24 + tempOffset).toFixed(1))
        : baseState;
    return {
      id: BigInt(i + 1),
      topic,
      deviceType: DEMO_TYPES[i],
      state,
      value: DEMO_TYPES[i] === "temperature-sensor" ? 24 + tempOffset : 0,
      lastUpdate: BigInt(Date.now() - Math.floor(Math.random() * 5000)),
      isOnline: i !== 3 || _demoTick % 8 !== 0, // camera goes offline occasionally
    } satisfies MqttDevice;
  });
}

let _demoDevices: MqttDevice[] = buildDemoDevices();
let _demoHistory: Record<string, MqttDeviceHistory[]> = {};
let _demoInitialized = false;

function buildDemoHistory(deviceId: bigint): MqttDeviceHistory[] {
  const key = deviceId.toString();
  if (!_demoHistory[key]) {
    const now = Date.now();
    _demoHistory[key] = Array.from({ length: 8 }, (_, i) => ({
      deviceId,
      state: DEMO_STATES[Number(deviceId) - 1] ?? "on",
      value: Math.random() * 30,
      timestamp: BigInt(now - (7 - i) * 60_000),
    }));
  }
  return _demoHistory[key];
}

function applyDemoCommand(cmd: MqttCommand): MqttCommandResult {
  const idx = _demoDevices.findIndex((d) => d.topic === cmd.topic);
  if (idx !== -1) {
    _demoDevices = _demoDevices.map((d, i) =>
      i === idx
        ? { ...d, state: cmd.payload, lastUpdate: BigInt(Date.now()) }
        : d,
    );
    const key = _demoDevices[idx].id.toString();
    _demoHistory[key] = [
      {
        deviceId: _demoDevices[idx].id,
        state: cmd.payload,
        value: Number.parseFloat(cmd.payload) || 0,
        timestamp: BigInt(Date.now()),
      },
      ...(_demoHistory[key] ?? []),
    ].slice(0, 20);
  }
  return {
    success: true,
    deviceId: _demoDevices[idx]?.id ?? BigInt(0),
    newState: cmd.payload,
    timestamp: BigInt(Date.now()),
  };
}

// ─── useInitMqtt ──────────────────────────────────────────────────────────────

export function useInitMqtt() {
  const { actor, isFetching } = useActor(createActor);

  return useMutation({
    mutationFn: async () => {
      if (!actor || isFetching) {
        // Demo mode: no-op
        _demoInitialized = true;
        _demoDevices = buildDemoDevices();
        return true;
      }
      try {
        return await actor.initMqttModule();
      } catch {
        _demoInitialized = true;
        return true;
      }
    },
  });
}

// ─── useMqttDevices ──────────────────────────────────────────────────────────

export function useMqttDevices() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<MqttDevice[]>({
    queryKey: ["mqtt-devices"],
    queryFn: async () => {
      // Try real backend first
      if (actor && !isFetching) {
        try {
          const result = await actor.getMqttDevices();
          if (result.length > 0) return result;
        } catch {
          // fall through to demo
        }
      }
      // Demo / fallback
      try {
        const result = await mockBackend.getMqttDevices();
        if (result && (result as MqttDevice[]).length > 0)
          return result as MqttDevice[];
      } catch {
        // fall through to local demo
      }
      _demoDevices = buildDemoDevices();
      return _demoDevices;
    },
    refetchInterval: 2000,
  });
}

// ─── useSendMqttCommand ───────────────────────────────────────────────────────

export function useSendMqttCommand() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<MqttCommandResult, Error, MqttCommand>({
    mutationFn: async (cmd: MqttCommand) => {
      if (actor && !isFetching) {
        try {
          return await actor.sendMqttCommand(cmd);
        } catch {
          // fall through
        }
      }
      try {
        const r = await mockBackend.sendMqttCommand(cmd);
        return r as MqttCommandResult;
      } catch {
        return applyDemoCommand(cmd);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["mqtt-devices"] });
      void qc.invalidateQueries({ queryKey: ["mqtt-history"] });
    },
  });
}

// ─── useMqttHistory ──────────────────────────────────────────────────────────

export function useMqttHistory(deviceId: bigint | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<MqttDeviceHistory[]>({
    queryKey: ["mqtt-history", deviceId?.toString()],
    queryFn: async () => {
      if (!deviceId) return [] as MqttDeviceHistory[];
      if (actor && !isFetching) {
        try {
          const result = await actor.getMqttDeviceHistory(deviceId);
          if (result.length > 0) return result;
        } catch {
          // fall through
        }
      }
      try {
        const result = await mockBackend.getMqttDeviceHistory(deviceId);
        if (result && (result as MqttDeviceHistory[]).length > 0)
          return result as MqttDeviceHistory[];
      } catch {
        // fall through
      }
      return buildDemoHistory(deviceId);
    },
    enabled: deviceId !== null,
  });
}

export type { MqttDevice, MqttDeviceHistory, MqttCommandResult };
