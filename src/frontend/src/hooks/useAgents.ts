import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockBackend } from "../mocks/backend";
import type { AgentChain } from "../types";

const USE_MOCK = true;

// ─── Query keys ───────────────────────────────────────────────────────────────

export const agentKeys = {
  all: ["agents"] as const,
  chains: () => [...agentKeys.all, "chains"] as const,
  chain: (id: bigint) => [...agentKeys.all, "chain", id.toString()] as const,
  metrics: () => [...agentKeys.all, "metrics"] as const,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapBackendChain(
  raw: Awaited<ReturnType<typeof mockBackend.listChains>>[number],
): AgentChain {
  return {
    id: raw.id,
    goal: raw.goal,
    status: raw.status as string,
    currentStep: raw.currentStep,
    tasks: raw.tasks.map((t) => ({
      id: t.id,
      agentType: t.agentType as string,
      input: t.input,
      output: t.output,
      status: t.status as string,
      timestamp: t.timestamp,
    })),
  };
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useListChains() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<AgentChain[]>({
    queryKey: agentKeys.chains(),
    queryFn: async () => {
      if (USE_MOCK) {
        const chains = await mockBackend.listChains();
        return chains.map(mapBackendChain);
      }
      if (!actor) return [];
      const chains = await actor.listChains();
      return chains.map(mapBackendChain);
    },
    enabled: USE_MOCK || (!!actor && !isFetching),
    refetchInterval: 3000,
  });
}

export function useGetChain(chainId: bigint) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<AgentChain | null>({
    queryKey: agentKeys.chain(chainId),
    queryFn: async () => {
      if (USE_MOCK) {
        const raw = await mockBackend.getChain(chainId);
        return raw ? mapBackendChain(raw) : null;
      }
      if (!actor) return null;
      const raw = await actor.getChain(chainId);
      return raw ? mapBackendChain(raw) : null;
    },
    enabled: USE_MOCK || (!!actor && !isFetching),
    refetchInterval: 2000,
  });
}

export function useCreateChain() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<bigint, Error, { goal: string }>({
    mutationFn: async ({ goal }) => {
      if (USE_MOCK) return mockBackend.createChain(goal);
      if (!actor) throw new Error("Actor not ready");
      return actor.createChain(goal);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: agentKeys.chains() });
    },
  });
}

export function useRunChain() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<string, Error, { chainId: bigint }>({
    mutationFn: async ({ chainId }) => {
      if (USE_MOCK) return mockBackend.runChain(chainId);
      if (!actor) throw new Error("Actor not ready");
      return actor.runChain(chainId);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: agentKeys.chains() });
    },
  });
}

export function useAgentMetrics() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: agentKeys.metrics(),
    queryFn: async () => {
      if (USE_MOCK) return mockBackend.getAgentMetrics();
      if (!actor) return null;
      return actor.getAgentMetrics();
    },
    enabled: USE_MOCK || (!!actor && !isFetching),
  });
}
