import { d as useActor, f as useQueryClient, g as useMutation, e as useQuery, t as mockBackend, h as createActor } from "./index-Khuvrpqq.js";
const USE_MOCK = true;
const agentKeys = {
  all: ["agents"],
  chains: () => [...agentKeys.all, "chains"],
  chain: (id) => [...agentKeys.all, "chain", id.toString()],
  metrics: () => [...agentKeys.all, "metrics"]
};
function mapBackendChain(raw) {
  return {
    id: raw.id,
    goal: raw.goal,
    status: raw.status,
    currentStep: raw.currentStep,
    tasks: raw.tasks.map((t) => ({
      id: t.id,
      agentType: t.agentType,
      input: t.input,
      output: t.output,
      status: t.status,
      timestamp: t.timestamp
    }))
  };
}
function useListChains() {
  useActor(createActor);
  return useQuery({
    queryKey: agentKeys.chains(),
    queryFn: async () => {
      {
        const chains2 = await mockBackend.listChains();
        return chains2.map(mapBackendChain);
      }
    },
    enabled: USE_MOCK,
    refetchInterval: 3e3
  });
}
function useCreateChain() {
  useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ goal }) => {
      return mockBackend.createChain(goal);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: agentKeys.chains() });
    }
  });
}
function useRunChain() {
  useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ chainId }) => {
      return mockBackend.runChain(chainId);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: agentKeys.chains() });
    }
  });
}
function useAgentMetrics() {
  useActor(createActor);
  return useQuery({
    queryKey: agentKeys.metrics(),
    queryFn: async () => {
      return mockBackend.getAgentMetrics();
    },
    enabled: USE_MOCK
  });
}
function assembleStreamText(chunks) {
  return [...chunks].sort(
    (a, b) => a.chunkIndex < b.chunkIndex ? -1 : a.chunkIndex > b.chunkIndex ? 1 : 0
  ).map((c) => c.content).join("");
}
function useActiveStream() {
  var _a, _b, _c;
  const { actor, isFetching } = useActor(createActor);
  const query = useQuery({
    queryKey: ["activeStream"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getActiveStream();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: (q) => {
      const data = q.state.data;
      if ((data == null ? void 0 : data.status) === "active") return 500;
      return 2e3;
    },
    staleTime: 400
  });
  const isStreaming = ((_a = query.data) == null ? void 0 : _a.status) === "active";
  const hasFinalChunk = ((_c = (_b = query.data) == null ? void 0 : _b.chunks) == null ? void 0 : _c.some((c) => c.isFinal)) ?? false;
  return { ...query, isStreaming, hasFinalChunk };
}
export {
  useRunChain as a,
  useActiveStream as b,
  useListChains as c,
  useAgentMetrics as d,
  assembleStreamText as e,
  useCreateChain as u
};
