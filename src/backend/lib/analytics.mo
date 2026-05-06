import Array "mo:core/Array";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Types "../types/analytics";
import AuthTypes "../types/auth";

module {
  public type EventList = List.List<Types.AnalyticsEvent>;
  public type MetricsMap = Map.Map<Principal, Types.UserMetrics>;

  /// Track an analytics event for a user
  public func trackEvent(
    events : EventList,
    metrics : MetricsMap,
    eventType : Text,
    userId : Principal,
    metadata : Text,
  ) {
    let event : Types.AnalyticsEvent = {
      eventType;
      userId;
      metadata;
      timestamp = Time.now();
    };
    events.add(event);
    // Ensure a metrics entry exists for this user
    switch (metrics.get(userId)) {
      case null {
        let m : Types.UserMetrics = {
          userId;
          messageCount = 0;
          voiceCount = 0;
          agentTaskCount = 0;
          lastActive = Time.now();
        };
        metrics.add(userId, m);
      };
      case (?existing) {
        let updated : Types.UserMetrics = { existing with lastActive = Time.now() };
        metrics.add(userId, updated);
      };
    };
  };

  /// Increment message count for a user
  public func incrementUserMessage(metrics : MetricsMap, userId : Principal) {
    let now = Time.now();
    switch (metrics.get(userId)) {
      case null {
        let m : Types.UserMetrics = {
          userId;
          messageCount = 1;
          voiceCount = 0;
          agentTaskCount = 0;
          lastActive = now;
        };
        metrics.add(userId, m);
      };
      case (?existing) {
        let updated : Types.UserMetrics = {
          existing with
          messageCount = existing.messageCount + 1;
          lastActive = now;
        };
        metrics.add(userId, updated);
      };
    };
  };

  /// Increment voice count for a user
  public func incrementUserVoice(metrics : MetricsMap, userId : Principal) {
    let now = Time.now();
    switch (metrics.get(userId)) {
      case null {
        let m : Types.UserMetrics = {
          userId;
          messageCount = 0;
          voiceCount = 1;
          agentTaskCount = 0;
          lastActive = now;
        };
        metrics.add(userId, m);
      };
      case (?existing) {
        let updated : Types.UserMetrics = {
          existing with
          voiceCount = existing.voiceCount + 1;
          lastActive = now;
        };
        metrics.add(userId, updated);
      };
    };
  };

  /// Increment agent task count for a user
  public func incrementUserAgent(metrics : MetricsMap, userId : Principal) {
    let now = Time.now();
    switch (metrics.get(userId)) {
      case null {
        let m : Types.UserMetrics = {
          userId;
          messageCount = 0;
          voiceCount = 0;
          agentTaskCount = 1;
          lastActive = now;
        };
        metrics.add(userId, m);
      };
      case (?existing) {
        let updated : Types.UserMetrics = {
          existing with
          agentTaskCount = existing.agentTaskCount + 1;
          lastActive = now;
        };
        metrics.add(userId, updated);
      };
    };
  };

  /// Get metrics for a specific user
  public func getUserMetrics(metrics : MetricsMap, userId : Principal) : Types.UserMetrics {
    switch (metrics.get(userId)) {
      case (?m) m;
      case null {
        {
          userId;
          messageCount = 0;
          voiceCount = 0;
          agentTaskCount = 0;
          lastActive = 0;
        };
      };
    };
  };

  /// Aggregate system-wide metrics across all users
  public func getSystemMetrics(
    metrics : MetricsMap,
    users : Map.Map<Principal, AuthTypes.UserProfile>,
  ) : Types.SystemMetrics {
    var totalMessages : Nat = 0;
    var totalVoice : Nat = 0;
    var totalAgentTasks : Nat = 0;
    var proCount : Nat = 0;
    var enterpriseCount : Nat = 0;

    metrics.forEach(func(_id, m) {
      totalMessages += m.messageCount;
      totalVoice += m.voiceCount;
      totalAgentTasks += m.agentTaskCount;
    });

    users.forEach(func(_id, u) {
      switch (u.tier) {
        case (#pro) { proCount += 1 };
        case (#enterprise) { enterpriseCount += 1 };
        case (#free) {};
      };
    });

    let mrr : Float = proCount.toFloat() * 29.0 + enterpriseCount.toFloat() * 199.0;

    {
      totalUsers = users.size();
      activeUsers = metrics.size();
      totalMessages;
      totalVoiceCalls = totalVoice;
      totalAgentTasks;
      mrr;
    };
  };

  /// Calculate MRR and revenue metrics for a given month label
  public func getRevenueMetrics(
    users : Map.Map<Principal, AuthTypes.UserProfile>,
    month : Text,
  ) : Types.RevenueMetrics {
    var freeCount : Nat = 0;
    var proCount : Nat = 0;
    var enterpriseCount : Nat = 0;

    users.forEach(func(_id, u) {
      switch (u.tier) {
        case (#free) { freeCount += 1 };
        case (#pro) { proCount += 1 };
        case (#enterprise) { enterpriseCount += 1 };
      };
    });

    let mrr : Float = proCount.toFloat() * 29.0 + enterpriseCount.toFloat() * 199.0;
    let total = proCount + enterpriseCount;
    let arpu : Float = if (total == 0) 0.0 else mrr / total.toFloat();

    {
      month;
      mrr;
      arpu;
      churnRate = 0.0; // simplified — no churn tracking in demo
      tierBreakdown = { free = freeCount; pro = proCount; enterprise = enterpriseCount };
    };
  };

  /// Return the last N months of MRR using the current snapshot (demo: all same value)
  public func getMRRTrend(
    users : Map.Map<Principal, AuthTypes.UserProfile>,
    months : Nat,
  ) : [Types.RevenueMetrics] {
    let current = getRevenueMetrics(users, "current");
    // Build array of N entries using tabulate — demo uses same snapshot for all months
    let monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    Array.tabulate<Types.RevenueMetrics>(
      months,
      func(i) {
        let monthLabel = if (i < monthLabels.size()) monthLabels[i] else "M" # (i + 1).toText();
        { current with month = monthLabel };
      },
    );
  };

  /// Count users active this month (lastActive within last 30 days in nanoseconds)
  public func getActiveUsersThisMonth(metrics : MetricsMap) : Nat {
    let thirtyDaysNs : Int = 30 * 24 * 60 * 60 * 1_000_000_000;
    let cutoff : Int = Time.now() - thirtyDaysNs;
    var count : Nat = 0;
    metrics.forEach(func(_id, m) {
      if (m.lastActive >= cutoff) { count += 1 };
    });
    count;
  };

  /// Export analytics data as a CSV-formatted text string
  public func exportAnalyticsCSV(metrics : MetricsMap) : Text {
    var csv = "userId,messageCount,voiceCount,agentTaskCount,lastActive\n";
    metrics.forEach(func(id, m) {
      csv #= id.toText() # "," # m.messageCount.toText() # "," # m.voiceCount.toText() # "," # m.agentTaskCount.toText() # "," # debug_show(m.lastActive) # "\n";
    });
    csv;
  };
};
