import Map "mo:core/Map";
import SubTypes "../types/subscription";
import SubLib "../lib/subscription";
import AuthTypes "../types/auth";
import Principal "mo:core/Principal";

mixin (subscriptions : Map.Map<Principal, SubTypes.Subscription>) {

  /// Return the caller's current subscription tier and active status
  public query ({ caller }) func getSubscriptionStatus() : async SubTypes.SubscriptionStatus {
    SubLib.getStatus(subscriptions, caller);
  };

  /// Update the caller's subscription tier after a successful Stripe payment
  public shared ({ caller }) func updateSubscription(tier : AuthTypes.SubscriptionTier) : async () {
    SubLib.update(subscriptions, caller, tier);
  };

  /// Cancel the caller's subscription and downgrade to free
  public shared ({ caller }) func cancelSubscription() : async () {
    SubLib.cancel(subscriptions, caller);
  };
};
