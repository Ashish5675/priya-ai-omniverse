import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AuthTypes "../types/auth";
import AdminTypes "../types/admin";

module {
  public type UserMap = Map.Map<Principal, AuthTypes.UserProfile>;
  public type BannedSet = Map.Map<Principal, Bool>;
  public type AdminLogList = List.List<AdminTypes.AdminLog>;

  /// Verify caller is admin — traps if not
  public func requireAdmin(users : UserMap, caller : Principal) {
    switch (users.get(caller)) {
      case (?u) {
        switch (u.role) {
          case (#admin) {};
          case (_) Runtime.trap("Admin access required");
        };
      };
      case null Runtime.trap("Admin access required");
    };
  };

  /// Check if the caller is an admin without trapping
  public func isAdmin(users : UserMap, caller : Principal) : Bool {
    switch (users.get(caller)) {
      case (?u) {
        switch (u.role) {
          case (#admin) true;
          case (_) false;
        };
      };
      case null false;
    };
  };

  /// Return all registered user profiles
  public func listAllUsers(users : UserMap) : [AuthTypes.UserProfile] {
    users.values().toArray();
  };

  /// Ban a user by flagging them in the banned map
  public func banUser(users : UserMap, banned : BannedSet, userId : Principal) : Bool {
    switch (users.get(userId)) {
      case null false;
      case (?_) {
        banned.add(userId, true);
        true;
      };
    };
  };

  /// Remove a user from the banned map
  public func unbanUser(banned : BannedSet, userId : Principal) : Bool {
    switch (banned.get(userId)) {
      case null false;
      case (?_) {
        banned.remove(userId);
        true;
      };
    };
  };

  /// Update the subscription tier of a user
  public func updateUserTier(
    users : UserMap,
    userId : Principal,
    tier : AuthTypes.SubscriptionTier,
  ) : Bool {
    switch (users.get(userId)) {
      case null false;
      case (?profile) {
        let updated : AuthTypes.UserProfile = { profile with tier };
        users.add(userId, updated);
        true;
      };
    };
  };

  /// Return all admin action logs
  public func listAdminLogs(logs : AdminLogList) : [AdminTypes.AdminLog] {
    logs.toArray();
  };

  /// Append a new admin action log entry
  public func logAdminAction(
    logs : AdminLogList,
    nextId : Nat,
    adminId : Principal,
    action : AdminTypes.AdminAction,
    target : Text,
  ) {
    let entry : AdminTypes.AdminLog = {
      id = nextId;
      adminId;
      action;
      target;
      timestamp = Time.now();
    };
    logs.add(entry);
  };

  /// Return simulated knowledge stats (demo mode)
  public func getKnowledgeStats() : AdminTypes.KnowledgeStats {
    {
      docCount = 12;
      chunkCount = 340;
      lastIndexed = Time.now();
      storageBytes = 2_048_000;
    };
  };

  /// Return system health snapshot
  public func getSystemHealth(
    users : UserMap,
    totalMessages : Nat,
    totalAgentTasks : Nat,
    startTime : Int,
  ) : { usersCount : Nat; messagesCount : Nat; agentTasksCount : Nat; uptime : Int } {
    {
      usersCount = users.size();
      messagesCount = totalMessages;
      agentTasksCount = totalAgentTasks;
      uptime = Time.now() - startTime;
    };
  };
};
