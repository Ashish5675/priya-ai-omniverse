module {
  public type AgentStreamStep = {
    agentType : Text;
    status : Text;
    output : Text;
    startedAt : Int;
    completedAt : Int;
  };

  public type StreamChunk = {
    id : Nat;
    content : Text;
    chunkIndex : Nat;
    isFinal : Bool;
    timestamp : Int;
  };

  public type StreamSession = {
    id : Nat;
    userId : Principal;
    chunks : [StreamChunk];
    agentSteps : [AgentStreamStep];
    status : Text;
    createdAt : Int;
  };
};
