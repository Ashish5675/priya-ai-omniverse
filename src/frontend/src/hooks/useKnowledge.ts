import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockBackend } from "../mocks/backend";
import type { KnowledgeDocument } from "../types";

const USE_MOCK = true;

// ─── Query keys ───────────────────────────────────────────────────────────────

export const knowledgeKeys = {
  all: ["knowledge"] as const,
  documents: () => [...knowledgeKeys.all, "documents"] as const,
  search: (q: string) => [...knowledgeKeys.all, "search", q] as const,
  stats: () => [...knowledgeKeys.all, "stats"] as const,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapDoc(
  raw: Awaited<ReturnType<typeof mockBackend.listDocuments>>[number],
): KnowledgeDocument {
  return {
    id: raw.id,
    title: raw.title,
    docType: raw.docType as string,
    content: raw.content,
    uploadedAt: raw.uploadedAt,
    indexStatus: raw.indexStatus as string,
    chunks: raw.chunks.map((c) => ({
      id: c.id,
      text: c.text,
      similarity: c.similarity,
    })),
  };
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useListDocuments() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<KnowledgeDocument[]>({
    queryKey: knowledgeKeys.documents(),
    queryFn: async () => {
      if (USE_MOCK) {
        const docs = await mockBackend.listDocuments();
        return docs.map(mapDoc);
      }
      if (!actor) return [];
      const docs = await actor.listDocuments();
      return docs.map(mapDoc);
    },
    enabled: USE_MOCK || (!!actor && !isFetching),
  });
}

export function useUploadDocument() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<
    bigint,
    Error,
    { title: string; docType: string; content: string }
  >({
    mutationFn: async ({ title, docType, content }) => {
      if (USE_MOCK) return mockBackend.uploadDocument(title, docType, content);
      if (!actor) throw new Error("Actor not ready");
      return actor.uploadDocument(title, docType, content);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: knowledgeKeys.documents() });
      void qc.invalidateQueries({ queryKey: knowledgeKeys.stats() });
    },
  });
}

export function useDeleteDocument() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<boolean, Error, { docId: bigint }>({
    mutationFn: async ({ docId }) => {
      if (USE_MOCK) return mockBackend.deleteDocument(docId);
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteDocument(docId);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: knowledgeKeys.documents() });
      void qc.invalidateQueries({ queryKey: knowledgeKeys.stats() });
    },
  });
}

export function useSearchKnowledge(searchQuery: string, topK = BigInt(5)) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: knowledgeKeys.search(searchQuery),
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      if (USE_MOCK) return mockBackend.searchKnowledge(searchQuery, topK);
      if (!actor) return [];
      return actor.searchKnowledge(searchQuery, topK);
    },
    enabled: (USE_MOCK || (!!actor && !isFetching)) && !!searchQuery.trim(),
  });
}

export function useKnowledgeStats() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: knowledgeKeys.stats(),
    queryFn: async () => {
      if (USE_MOCK) return mockBackend.getKnowledgeStats();
      if (!actor) return null;
      return actor.getKnowledgeStats();
    },
    enabled: USE_MOCK || (!!actor && !isFetching),
  });
}
