import Principal "mo:core/Principal";
import Map "mo:core/Map";
import List "mo:core/List";
import AuthTypes "../types/auth";
import AnalyticsTypes "../types/analytics";
import AnalyticsLib "../lib/analytics";
import AdminLib "../lib/admin";

mixin (
  users : Map.Map<Principal, AuthTypes.UserProfile>,
  events : List.List<AnalyticsTypes.AnalyticsEvent>,
  metrics : Map.Map<Principal, AnalyticsTypes.UserMetrics>,
) {
  /// Track a named event for the calling user
  public shared ({ caller }) func trackEvent(eventType : Text, metadata : Text) : async () {
    AnalyticsLib.trackEvent(events, metrics, eventType, caller, metadata);
  };

  /// Return the calling user's own usage metrics
  public query ({ caller }) func getMyMetrics() : async AnalyticsTypes.UserMetrics {
    AnalyticsLib.getUserMetrics(metrics, caller);
  };

  /// Return system-wide aggregated metrics (admin only)
  public query ({ caller }) func getSystemMetrics() : async AnalyticsTypes.SystemMetrics {
    AdminLib.requireAdmin(users, caller);
    AnalyticsLib.getSystemMetrics(metrics, users);
  };

  /// Return revenue metrics for a given month label (admin only)
  public query ({ caller }) func getRevenueMetrics(month : Text) : async AnalyticsTypes.RevenueMetrics {
    AdminLib.requireAdmin(users, caller);
    AnalyticsLib.getRevenueMetrics(users, month);
  };

  /// Return MRR trend for the last N months (admin only)
  public query ({ caller }) func getMRRTrend(months : Nat) : async [AnalyticsTypes.RevenueMetrics] {
    AdminLib.requireAdmin(users, caller);
    AnalyticsLib.getMRRTrend(users, months);
  };

  /// Export analytics data as CSV text (admin only)
  public query ({ caller }) func exportAnalytics() : async Text {
    AdminLib.requireAdmin(users, caller);
    AnalyticsLib.exportAnalyticsCSV(metrics);
  };
};
