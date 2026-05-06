import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/subscription";
import AuthTypes "../types/auth";
import Principal "mo:core/Principal";

module {
  public type SubscriptionMap = Map.Map<Principal, Types.Subscription>;

  /// Return existing subscription for a user, or a default free subscription
  public func getStatus(
    subscriptions : SubscriptionMap,
    userId : Principal,
  ) : Types.SubscriptionStatus {
    switch (subscriptions.get(userId)) {
      case (?sub) { { tier = sub.tier; active = sub.active; startDate = sub.startDate } };
      case null { { tier = #free; active = true; startDate = Time.now() } };
    };
  };

  /// Upsert subscription tier for a user (called after successful Stripe payment)
  public func update(
    subscriptions : SubscriptionMap,
    userId : Principal,
    tier : AuthTypes.SubscriptionTier,
  ) {
    let startDate = switch (subscriptions.get(userId)) {
      case (?existing) existing.startDate;
      case null Time.now();
    };
    let sub : Types.Subscription = {
      userId;
      tier;
      startDate;
      active = true;
    };
    subscriptions.add(userId, sub);
  };

  /// Downgrade user to free tier
  public func cancel(
    subscriptions : SubscriptionMap,
    userId : Principal,
  ) {
    switch (subscriptions.get(userId)) {
      case null {};
      case (?sub) {
        let cancelled : Types.Subscription = { sub with tier = #free; active = false };
        subscriptions.add(userId, cancelled);
      };
    };
  };
};
