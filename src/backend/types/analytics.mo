module {
  public type AnalyticsEvent = {
    eventType : Text;
    userId : Principal;
    metadata : Text;
    timestamp : Int;
  };

  public type UserMetrics = {
    userId : Principal;
    messageCount : Nat;
    voiceCount : Nat;
    agentTaskCount : Nat;
    lastActive : Int;
  };

  public type SystemMetrics = {
    totalUsers : Nat;
    activeUsers : Nat;
    totalMessages : Nat;
    totalVoiceCalls : Nat;
    totalAgentTasks : Nat;
    mrr : Float;
  };

  public type TierBreakdown = {
    free : Nat;
    pro : Nat;
    enterprise : Nat;
  };

  public type RevenueMetrics = {
    month : Text;
    mrr : Float;
    arpu : Float;
    churnRate : Float;
    tierBreakdown : TierBreakdown;
  };
};
