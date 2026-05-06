import { createActor } from "@/backend";
import type { AgentStreamStep, StreamChunk, StreamSession } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Assemble helper ──────────────────────────────────────────────────────────

/** Concatenate stream chunks in chunkIndex order into a single string */
export function assembleStreamText(chunks: StreamChunk[]): string {
  return [...chunks]
    .sort((a, b) =>
      a.chunkIndex < b.chunkIndex ? -1 : a.chunkIndex > b.chunkIndex ? 1 : 0,
    )
    .map((c) => c.content)
    .join("");
}

// ─── useActiveStream ─────────────────────────────────────────────────────────

/** Poll the active stream session. Polling interval is 500ms while status=="active", 2000ms otherwise. */
export function useActiveStream() {
  const { actor, isFetching } = useActor(createActor);

  const query = useQuery<StreamSession | null>({
    queryKey: ["activeStream"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getActiveStream();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: (q) => {
      const data = q.state.data;
      if (data?.status === "active") return 500;
      return 2000;
    },
    staleTime: 400,
  });

  const isStreaming = query.data?.status === "active";
  const hasFinalChunk =
    query.data?.chunks?.some((c: StreamChunk) => c.isFinal) ?? false;

  return { ...query, isStreaming, hasFinalChunk };
}

// ─── useCreateStreamSession ───────────────────────────────────────────────────

export function useCreateStreamSession() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<StreamSession, Error>({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createStreamSession();
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["activeStream"] });
    },
  });
}

// ─── useGetStreamSession ──────────────────────────────────────────────────────

export function useGetStreamSession(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<StreamSession | null>({
    queryKey: ["streamSession", id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getStreamSession(id);
    },
    enabled: !!actor && !isFetching && id != null,
    refetchInterval: 1000,
  });
}

// ─── Re-export types for convenience ─────────────────────────────────────────
export type { AgentStreamStep, StreamChunk, StreamSession };
