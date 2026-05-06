import AuthTypes "../types/auth";

module {
  /// A user's subscription record
  public type Subscription = {
    userId : Principal;
    tier : AuthTypes.SubscriptionTier;
    startDate : Int;
    active : Bool;
  };

  /// Public view returned to callers
  public type SubscriptionStatus = {
    tier : AuthTypes.SubscriptionTier;
    active : Bool;
    startDate : Int;
  };
};
