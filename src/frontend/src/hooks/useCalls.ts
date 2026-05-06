import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface CallRecord {
  id: bigint;
  callSid: string;
  callerPhone: string;
  duration: bigint;
  status: string;
  transcript: string;
  timestamp: bigint;
}

export interface MakeCallRequest {
  toPhone: string;
  message: string;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

let callIdCounter = BigInt(4);

const mockCallLogs: CallRecord[] = [
  {
    id: BigInt(1),
    callSid: "DEMO-CA001",
    callerPhone: "+91-9876543210",
    duration: BigInt(142),
    status: "completed",
    transcript:
      "Hello, I need help setting up my IoT devices. Priya guided through the MQTT configuration step by step.",
    timestamp: BigInt(Date.now() - 1000 * 60 * 45),
  },
  {
    id: BigInt(2),
    callSid: "DEMO-CA002",
    callerPhone: "+91-8765432109",
    duration: BigInt(0),
    status: "missed",
    transcript: "",
    timestamp: BigInt(Date.now() - 1000 * 60 * 120),
  },
  {
    id: BigInt(3),
    callSid: "DEMO-CA003",
    callerPhone: "+1-555-987-6543",
    duration: BigInt(317),
    status: "completed",
    transcript:
      "Legal document analysis requested. Priya reviewed the NDA clauses, flagged three risk areas, and provided compliance suggestions.",
    timestamp: BigInt(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: BigInt(4),
    callSid: "CA8f2e1a3b4c5d",
    callerPhone: "+44-7700-900123",
    duration: BigInt(58),
    status: "failed",
    transcript: "Connection dropped during initial greeting phase.",
    timestamp: BigInt(Date.now() - 1000 * 60 * 60 * 7),
  },
];

// ─── Simulated mock backend ────────────────────────────────────────────────────

const callsMock = {
  getCallLogs: async (): Promise<CallRecord[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return [...mockCallLogs].reverse();
  },

  makeCall: async (req: MakeCallRequest): Promise<CallRecord> => {
    await new Promise((r) => setTimeout(r, 800));
    callIdCounter += BigInt(1);
    const record: CallRecord = {
      id: callIdCounter,
      callSid: `DEMO-CA${String(callIdCounter).padStart(3, "0")}`,
      callerPhone: req.toPhone,
      duration: BigInt(0),
      status: "active",
      transcript: req.message
        ? `Message queued: "${req.message}"`
        : "Connecting…",
      timestamp: BigInt(Date.now()),
    };
    mockCallLogs.push(record);
    return record;
  },

  getCallRecord: async (id: bigint): Promise<CallRecord | null> => {
    await new Promise((r) => setTimeout(r, 200));
    return mockCallLogs.find((c) => c.id === id) ?? null;
  },

  initCallModule: async (): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 300));
    return true;
  },
};

// ─── Query keys ────────────────────────────────────────────────────────────────

export const callKeys = {
  all: ["calls"] as const,
  logs: () => [...callKeys.all, "logs"] as const,
  record: (id: bigint) => [...callKeys.all, "record", id.toString()] as const,
  init: () => [...callKeys.all, "init"] as const,
};

// ─── Hooks ─────────────────────────────────────────────────────────────────────

export function useCallLogs() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<CallRecord[]>({
    queryKey: callKeys.logs(),
    queryFn: async () => {
      try {
        if (actor && !isFetching) {
          const records = await (
            actor as unknown as {
              getCallLogs: () => Promise<CallRecord[]>;
            }
          ).getCallLogs();
          return records;
        }
      } catch {
        // fall through to mock
      }
      return callsMock.getCallLogs();
    },
    enabled: true,
    refetchInterval: 5000,
  });
}

export function useMakeCall() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<CallRecord, Error, MakeCallRequest>({
    mutationFn: async (req) => {
      try {
        if (actor) {
          return await (
            actor as unknown as {
              makeCall: (r: MakeCallRequest) => Promise<CallRecord>;
            }
          ).makeCall(req);
        }
      } catch {
        // fall through to mock
      }
      return callsMock.makeCall(req);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: callKeys.logs() });
    },
  });
}

export function useGetCallRecord(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<CallRecord | null>({
    queryKey: callKeys.record(id ?? BigInt(0)),
    queryFn: async () => {
      if (!id) return null;
      try {
        if (actor && !isFetching) {
          return await (
            actor as unknown as {
              getCallRecord: (id: bigint) => Promise<CallRecord | null>;
            }
          ).getCallRecord(id);
        }
      } catch {
        // fall through to mock
      }
      return callsMock.getCallRecord(id);
    },
    enabled: !!id,
  });
}

export function useInitCalls() {
  const { actor } = useActor(createActor);

  return useQuery<boolean>({
    queryKey: callKeys.init(),
    queryFn: async () => {
      try {
        if (actor) {
          return await (
            actor as unknown as {
              initCallModule: () => Promise<boolean>;
            }
          ).initCallModule();
        }
      } catch {
        // fall through to mock
      }
      return callsMock.initCallModule();
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}
