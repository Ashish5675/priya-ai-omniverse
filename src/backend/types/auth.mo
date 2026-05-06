module {
  public type UserId = Principal;

  public type UserRole = {
    #user;
    #admin;
  };

  public type SubscriptionTier = {
    #free;
    #pro;
    #enterprise;
  };

  public type UserProfile = {
    id : UserId;
    name : Text;
    email : Text;
    role : UserRole;
    tier : SubscriptionTier;
    createdAt : Int;
  };

  public type LoginResult = {
    #ok : UserProfile;
    #err : Text;
  };

  public type RegisterResult = {
    #ok : UserProfile;
    #err : Text;
  };
};
