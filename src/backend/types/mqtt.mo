module {
  public type MqttDevice = {
    id : Nat;
    topic : Text;
    deviceType : Text;
    state : Text;
    value : Float;
    lastUpdate : Int;
    isOnline : Bool;
  };

  public type MqttCommand = {
    topic : Text;
    payload : Text;
    action : Text;
  };

  public type MqttCommandResult = {
    success : Bool;
    deviceId : Nat;
    newState : Text;
    timestamp : Int;
  };

  public type MqttDeviceHistory = {
    deviceId : Nat;
    state : Text;
    value : Float;
    timestamp : Int;
  };
};
