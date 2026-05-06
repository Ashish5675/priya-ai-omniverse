module {
  public type CallStatus = {
    #connecting;
    #active;
    #completed;
    #missed;
    #failed;
  };

  public type CallRecord = {
    id : Nat;
    callSid : Text;
    callerPhone : Text;
    duration : Nat;
    status : Text;
    transcript : Text;
    timestamp : Int;
  };

  public type CallInitRequest = {
    toPhone : Text;
    message : Text;
  };
};
