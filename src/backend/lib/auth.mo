import Types "../types/auth";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public type UserMap = Map.Map<Types.UserId, Types.UserProfile>;

  /// Create a new user profile with free tier role
  public func createUser(
    users : UserMap,
    id : Types.UserId,
    name : Text,
    email : Text,
  ) : Types.UserProfile {
    let profile : Types.UserProfile = {
      id;
      name;
      email;
      role = #user;
      tier = #free;
      createdAt = Time.now();
    };
    users.add(id, profile);
    profile;
  };

  /// Create an admin user profile
  public func createAdminUser(
    id : Types.UserId,
    name : Text,
    email : Text,
  ) : Types.UserProfile {
    {
      id;
      name;
      email;
      role = #admin;
      tier = #enterprise;
      createdAt = Time.now();
    };
  };

  /// Validate admin credentials (hardcoded admin/admin123)
  public func validateAdminCredentials(username : Text, password : Text) : Bool {
    username == "admin" and password == "admin123";
  };

  /// Look up a user by Principal
  public func getUser(users : UserMap, id : Types.UserId) : ?Types.UserProfile {
    users.get(id);
  };

  /// Update an existing user profile
  public func updateUser(users : UserMap, profile : Types.UserProfile) : Bool {
    switch (users.get(profile.id)) {
      case null false;
      case (?_) {
        users.add(profile.id, profile);
        true;
      };
    };
  };

  /// Register a new user — returns error if already exists
  public func register(
    users : UserMap,
    id : Types.UserId,
    name : Text,
    email : Text,
  ) : Types.RegisterResult {
    switch (users.get(id)) {
      case (?_) #err("User already registered");
      case null {
        let profile = createUser(users, id, name, email);
        #ok(profile);
      };
    };
  };

  /// Upgrade a user's subscription tier
  public func upgradeTier(
    users : UserMap,
    id : Types.UserId,
    tier : Types.SubscriptionTier,
  ) : Bool {
    switch (users.get(id)) {
      case null false;
      case (?profile) {
        let updated : Types.UserProfile = { profile with tier };
        users.add(id, updated);
        true;
      };
    };
  };
};
