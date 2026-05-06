import AgentTypes "../types/agents";
import StreamTypes "../types/streaming";
import StreamLib "../lib/twilio-yolo-mqtt-streaming";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  // ── Demo responses per agent type ───────────────────────────────────────────
  func demoResponse(agentType : AgentTypes.AgentType, input : Text) : Text {
    switch (agentType) {
      case (#planner) {
        "Plan for: " # input # "\n1. Research background context\n2. Gather relevant data\n3. Synthesize findings\n4. Draft response\n5. Validate and refine";
      };
      case (#research) {
        "Research results for: " # input # "\n- Found 5 relevant knowledge base entries\n- Key insight: AI systems require multi-step reasoning\n- Context: User is building PRIYA AI OMNIVERSE platform";
      };
      case (#executor) {
        "Execution complete for: " # input # "\nTask completed successfully. Output generated with high confidence. All sub-steps processed and validated.";
      };
      case (#memory) {
        "Memory stored for: " # input # "\nInsights saved to long-term memory. Pattern recognized: user prefers concise, actionable responses. Preference updated.";
      };
      case (#critic) {
        "Quality score: 92/100 for: " # input # "\nAnalysis: Response is accurate and relevant. Confidence: High. Suggested improvement: Add more specific examples.";
      };
    };
  };

  // ── Map AgentType variant to Text tag ───────────────────────────────────────
  func agentTypeTag(agentType : AgentTypes.AgentType) : Text {
    switch (agentType) {
      case (#planner)  "planner";
      case (#research) "research";
      case (#executor) "executor";
      case (#memory)   "memory";
      case (#critic)   "critic";
    };
  };

  // ── Build initial task list for a goal ──────────────────────────────────────
  func buildTasks(goal : Text) : [AgentTypes.AgentTask] {
    let now = Time.now();
    [
      { id = 0; agentType = #planner;  input = goal; output = null; status = #idle; timestamp = now },
      { id = 1; agentType = #research; input = goal; output = null; status = #idle; timestamp = now },
      { id = 2; agentType = #executor; input = goal; output = null; status = #idle; timestamp = now },
      { id = 3; agentType = #memory;   input = goal; output = null; status = #idle; timestamp = now },
      { id = 4; agentType = #critic;   input = goal; output = null; status = #idle; timestamp = now },
    ];
  };

  // ── Create a new AgentChain for a goal ──────────────────────────────────────
  public func createAgentChain(
    chains        : Map.Map<Nat, AgentTypes.AgentChain>,
    nextChainId   : { var value : Nat },
    goal          : Text,
    _userId       : Principal
  ) : AgentTypes.AgentChain {
    let id = nextChainId.value;
    nextChainId.value += 1;
    let chain : AgentTypes.AgentChain = {
      id;
      tasks       = buildTasks(goal);
      currentStep = 0;
      goal;
      status      = #idle;
    };
    chains.add(id, chain);
    chain;
  };

  // ── Execute all agents in the chain sequentially ────────────────────────────
  // After each agent completes, records progress in the active stream session.
  // Retries each failed task up to 3 times (demo: tasks always succeed).
  public func runAgentChain(
    chains         : Map.Map<Nat, AgentTypes.AgentChain>,
    metrics        : { var totalTasks : Nat; var completedTasks : Nat; var failedTasks : Nat },
    chainId        : Nat,
    _apiKey        : Text,
    streamSessions : Map.Map<Nat, StreamTypes.StreamSession>,
    activeStreamId : ?Nat,
  ) : Text {
    switch (chains.get(chainId)) {
      case null { "Chain not found: " # chainId.toText() };
      case (?chain) {
        var finalOutput = "";
        let updatedTasks = List.empty<AgentTypes.AgentTask>();

        for (task in chain.tasks.vals()) {
          let stepStart = Time.now();
          metrics.totalTasks += 1;
          var attempts  = 0;
          var succeeded = false;
          var taskOutput = "";

          // Record step as "running" in active stream
          switch (activeStreamId) {
            case (?sid) {
              switch (streamSessions.get(sid)) {
                case (?session) {
                  let startStep : StreamTypes.AgentStreamStep = {
                    agentType   = agentTypeTag(task.agentType);
                    status      = "running";
                    output      = "";
                    startedAt   = stepStart;
                    completedAt = 0;
                  };
                  let updated = StreamLib.updateAgentStepInSession(session, startStep);
                  streamSessions.add(sid, updated);
                };
                case null {};
              };
            };
            case null {};
          };

          label retry while (attempts < 3 and not succeeded) {
            attempts += 1;
            taskOutput := demoResponse(task.agentType, task.input);
            succeeded  := true;
          };

          let stepEnd = Time.now();
          let updatedTask : AgentTypes.AgentTask = if (succeeded) {
            metrics.completedTasks += 1;
            { task with output = ?taskOutput; status = #complete; timestamp = stepEnd };
          } else {
            metrics.failedTasks += 1;
            { task with status = #failed; timestamp = stepEnd };
          };
          updatedTasks.add(updatedTask);
          finalOutput := taskOutput;

          // Record step as "complete" or "failed" in active stream
          switch (activeStreamId) {
            case (?sid) {
              switch (streamSessions.get(sid)) {
                case (?session) {
                  let doneStep : StreamTypes.AgentStreamStep = {
                    agentType   = agentTypeTag(task.agentType);
                    status      = if (succeeded) "complete" else "failed";
                    output      = taskOutput;
                    startedAt   = stepStart;
                    completedAt = stepEnd;
                  };
                  let updated = StreamLib.updateAgentStepInSession(session, doneStep);
                  streamSessions.add(sid, updated);
                };
                case null {};
              };
            };
            case null {};
          };
        };

        let updatedChain : AgentTypes.AgentChain = {
          chain with
          tasks       = updatedTasks.toArray();
          currentStep = updatedTasks.size();
          status      = #complete;
        };
        chains.add(chainId, updatedChain);

        // Break the final response into word chunks and store in stream session
        switch (activeStreamId) {
          case (?sid) {
            switch (streamSessions.get(sid)) {
              case (?session) {
                let words = finalOutput.split(#char ' ');
                var chunkIdx = session.chunks.size();
                var updatedSession = session;
                for (word in words) {
                  let chunk : StreamTypes.StreamChunk = {
                    id         = chunkIdx;
                    content    = word # " ";
                    chunkIndex = chunkIdx;
                    isFinal    = false;
                    timestamp  = Time.now();
                  };
                  updatedSession := StreamLib.addChunkToSession(updatedSession, chunk);
                  chunkIdx += 1;
                };
                // Final sentinel chunk
                let finalChunk : StreamTypes.StreamChunk = {
                  id         = chunkIdx;
                  content    = "";
                  chunkIndex = chunkIdx;
                  isFinal    = true;
                  timestamp  = Time.now();
                };
                updatedSession := StreamLib.addChunkToSession(updatedSession, finalChunk);
                // Mark session completed
                let completedSession : StreamTypes.StreamSession = { updatedSession with status = "completed" };
                streamSessions.add(sid, completedSession);
              };
              case null {};
            };
          };
          case null {};
        };

        finalOutput;
      };
    };
  };

  // ── Look up a chain by ID ────────────────────────────────────────────────────
  public func getAgentChain(
    chains  : Map.Map<Nat, AgentTypes.AgentChain>,
    chainId : Nat
  ) : ?AgentTypes.AgentChain {
    chains.get(chainId);
  };

  // ── All chains ───────────────────────────────────────────────────────────────
  public func getActiveChains(
    chains  : Map.Map<Nat, AgentTypes.AgentChain>,
    _userId : Principal
  ) : [AgentTypes.AgentChain] {
    chains.values().toArray();
  };

  // ── Aggregate metrics ────────────────────────────────────────────────────────
  public func getAgentMetrics(
    metrics : { var totalTasks : Nat; var completedTasks : Nat; var failedTasks : Nat }
  ) : AgentTypes.AgentMetrics {
    {
      totalTasks     = metrics.totalTasks;
      completedTasks = metrics.completedTasks;
      failedTasks    = metrics.failedTasks;
      avgDuration    = 0;
    };
  };
};
