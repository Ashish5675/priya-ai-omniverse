module {
  public type AgentType = {
    #planner;
    #research;
    #executor;
    #memory;
    #critic;
  };

  public type AgentStatus = {
    #idle;
    #running;
    #complete;
    #failed;
  };

  public type AgentTask = {
    id : Nat;
    agentType : AgentType;
    input : Text;
    output : ?Text;
    status : AgentStatus;
    timestamp : Int;
  };

  public type AgentChain = {
    id : Nat;
    tasks : [AgentTask];
    currentStep : Nat;
    goal : Text;
    status : AgentStatus;
  };

  public type AgentMetrics = {
    totalTasks : Nat;
    completedTasks : Nat;
    failedTasks : Nat;
    avgDuration : Int;
  };
};
