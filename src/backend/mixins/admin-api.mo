import Principal "mo:core/Principal";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import AuthTypes "../types/auth";
import AdminTypes "../types/admin";
import AdminLib "../lib/admin";

mixin (
  users : Map.Map<Principal, AuthTypes.UserProfile>,
  banned : Map.Map<Principal, Bool>,
  adminLogs : List.List<AdminTypes.AdminLog>,
  adminLogNextId : { var value : Nat },
  systemStats : { var startTime : Int; var totalMessages : Nat; var totalAgentTasks : Nat },
) {
  /// List all registered user profiles (admin only)
  public query ({ caller }) func listAllUsers() : async [AuthTypes.UserProfile] {
    AdminLib.requireAdmin(users, caller);
    AdminLib.listAllUsers(users);
  };

  /// Ban a user account (admin only)
  public shared ({ caller }) func banUser(userId : Principal) : async Bool {
    AdminLib.requireAdmin(users, caller);
    let result = AdminLib.banUser(users, banned, userId);
    AdminLib.logAdminAction(adminLogs, adminLogNextId.value, caller, #banUser, userId.toText());
    adminLogNextId.value += 1;
    result;
  };

  /// Update a user's subscription tier (admin only). Accepts tier as Text: "free" | "pro" | "enterprise"
  public shared ({ caller }) func updateUserTier(userId : Principal, tier : Text) : async Bool {
    AdminLib.requireAdmin(users, caller);
    let parsedTier : AuthTypes.SubscriptionTier = switch (tier) {
      case ("pro") #pro;
      case ("enterprise") #enterprise;
      case (_) #free;
    };
    let result = AdminLib.updateUserTier(users, userId, parsedTier);
    AdminLib.logAdminAction(adminLogs, adminLogNextId.value, caller, #updateTier, userId.toText() # ":" # tier);
    adminLogNextId.value += 1;
    result;
  };

  /// Return all admin action logs (admin only)
  public query ({ caller }) func getAdminLogs() : async [AdminTypes.AdminLog] {
    AdminLib.requireAdmin(users, caller);
    AdminLib.listAdminLogs(adminLogs);
  };

  /// Return a system health snapshot (admin only)
  public query ({ caller }) func getSystemHealth() : async { usersCount : Nat; messagesCount : Nat; agentTasksCount : Nat; uptime : Int } {
    AdminLib.requireAdmin(users, caller);
    AdminLib.getSystemHealth(users, systemStats.totalMessages, systemStats.totalAgentTasks, systemStats.startTime);
  };

  /// Trigger a re-index of all knowledge documents (admin only, demo simulation)
  public shared ({ caller }) func triggerReindex() : async Bool {
    AdminLib.requireAdmin(users, caller);
    AdminLib.logAdminAction(adminLogs, adminLogNextId.value, caller, #reindex, "all");
    adminLogNextId.value += 1;
    true; // demo: always succeeds
  };
};
