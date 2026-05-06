import AuthTypes "../types/auth";
import AuthLib "../lib/auth";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

mixin (users : AuthLib.UserMap) {

  /// Register a new user account (free tier)
  public shared ({ caller }) func register(name : Text, email : Text) : async AuthTypes.RegisterResult {
    AuthLib.register(users, caller, name, email);
  };

  /// Demo login — instant access as a demo user (free tier)
  public shared ({ caller }) func demoLogin() : async AuthTypes.LoginResult {
    switch (AuthLib.getUser(users, caller)) {
      case (?profile) #ok(profile);
      case null {
        let profile = AuthLib.createUser(users, caller, "Demo User", "demo@priya.ai");
        #ok(profile);
      };
    };
  };

  /// Admin login with hardcoded credentials (admin / admin123)
  public shared ({ caller }) func adminLogin(username : Text, password : Text) : async AuthTypes.LoginResult {
    if (not AuthLib.validateAdminCredentials(username, password)) {
      return #err("Invalid credentials");
    };
    switch (AuthLib.getUser(users, caller)) {
      case (?profile) #ok(profile);
      case null {
        let profile = AuthLib.createAdminUser(caller, "Administrator", "admin@priya.ai");
        users.add(caller, profile);
        #ok(profile);
      };
    };
  };

  /// Logout — no-op since sessions are caller-scoped on-chain
  public shared ({ caller }) func logout() : async () {
    // Internet Computer principals are stateless sessions; nothing to clear
  };

  /// Get the caller's own profile
  public query ({ caller }) func getUserProfile() : async ?AuthTypes.UserProfile {
    AuthLib.getUser(users, caller);
  };

  /// Get the caller's role
  public query ({ caller }) func getUserRole() : async ?AuthTypes.UserRole {
    switch (AuthLib.getUser(users, caller)) {
      case (?profile) ?profile.role;
      case null null;
    };
  };

  /// Get the caller's subscription tier
  public query ({ caller }) func getUserSubscription() : async ?AuthTypes.SubscriptionTier {
    switch (AuthLib.getUser(users, caller)) {
      case (?profile) ?profile.tier;
      case null null;
    };
  };

  /// Upgrade the caller's subscription tier
  public shared ({ caller }) func upgradeSubscription(tier : AuthTypes.SubscriptionTier) : async Bool {
    AuthLib.upgradeTier(users, caller, tier);
  };

};
