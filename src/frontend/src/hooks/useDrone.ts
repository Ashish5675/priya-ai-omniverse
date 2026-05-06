import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { DetectionHistoryRecord, YoloDetectionResult } from "../backend";
import { mockBackend } from "../mocks/backend";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const droneKeys = {
  all: ["drone"] as const,
  list: () => [...droneKeys.all, "list"] as const,
  alerts: () => [...droneKeys.all, "alerts"] as const,
  cameras: () => [...droneKeys.all, "cameras"] as const,
  detectionHistory: () => [...droneKeys.all, "detectionHistory"] as const,
};

// ─── Re-export backend types for pages ────────────────────────────────────────

export type { DetectionHistoryRecord, YoloDetectionResult };

// ─── Drone Queries ────────────────────────────────────────────────────────────

export function useListDrones() {
  return useQuery({
    queryKey: droneKeys.list(),
    queryFn: () => mockBackend.listDrones(),
    refetchInterval: 3000,
  });
}

export function useDetectionAlerts() {
  return useQuery({
    queryKey: droneKeys.alerts(),
    queryFn: () => mockBackend.getDetectionAlerts(),
  });
}

export function useCameraFeeds() {
  return useQuery({
    queryKey: droneKeys.cameras(),
    queryFn: () => mockBackend.getCameraFeeds(),
  });
}

// ─── YOLO Detection ───────────────────────────────────────────────────────────

export function useDetectionHistory() {
  return useQuery<DetectionHistoryRecord[]>({
    queryKey: droneKeys.detectionHistory(),
    queryFn: () => mockBackend.getDetectionHistory(),
    refetchInterval: 2000,
  });
}

export function useInitDetection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => mockBackend.initDetectionModule(),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: droneKeys.detectionHistory(),
      });
    },
  });
}

export function useYoloDetection() {
  const queryClient = useQueryClient();
  return useMutation<
    YoloDetectionResult,
    Error,
    { imageData: string; cameraId: string }
  >({
    mutationFn: (req) => mockBackend.runYoloDetection(req),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: droneKeys.detectionHistory(),
      });
    },
  });
}

// ─── Drone Commands ───────────────────────────────────────────────────────────

export function useDroneCommand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, cmd }: { id: bigint; cmd: string }) =>
      mockBackend.setDroneCommand(id, cmd),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: droneKeys.list() });
    },
  });
}

export function useTriggerSimulation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => mockBackend.triggerSimulation(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: droneKeys.list() });
    },
  });
}
