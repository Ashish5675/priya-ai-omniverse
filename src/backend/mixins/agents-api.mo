import AgentTypes "../types/agents";
import StreamTypes "../types/streaming";
import AgentLib   "../lib/agents";
import Map "mo:core/Map";

mixin (
  chains         : Map.Map<Nat, AgentTypes.AgentChain>,
  nextChainId    : { var value : Nat },
  agentMetrics   : { var totalTasks : Nat; var completedTasks : Nat; var failedTasks : Nat },
  streamSessions : Map.Map<Nat, StreamTypes.StreamSession>,
) {
  // ── Create a new agent chain for the caller ──────────────────────────────────
  public shared ({ caller }) func createChain(goal : Text) : async Nat {
    let chain = AgentLib.createAgentChain(chains, nextChainId, goal, caller);
    chain.id;
  };

  // ── Run all agents in a chain and stream progress into the active session ─────
  public shared ({ caller }) func runChain(chainId : Nat) : async Text {
    // Find the most recent active stream session for this caller
    let activeStreamId : ?Nat = do {
      var found : ?Nat = null;
      for ((sid, session) in streamSessions.entries()) {
        if (session.userId == caller and session.status == "active") {
          found := ?sid;
        };
      };
      found;
    };
    AgentLib.runAgentChain(chains, agentMetrics, chainId, "", streamSessions, activeStreamId);
  };

  // ── Look up a specific chain ─────────────────────────────────────────────────
  public query func getChain(chainId : Nat) : async ?AgentTypes.AgentChain {
    AgentLib.getAgentChain(chains, chainId);
  };

  // ── List all chains owned by the caller ─────────────────────────────────────
  public shared query ({ caller }) func listChains() : async [AgentTypes.AgentChain] {
    AgentLib.getActiveChains(chains, caller);
  };

  // ── Aggregate metrics ────────────────────────────────────────────────────────
  public query func getAgentMetrics() : async AgentTypes.AgentMetrics {
    AgentLib.getAgentMetrics(agentMetrics);
  };
};
