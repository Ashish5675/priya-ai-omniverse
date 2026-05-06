module {
  public type TrackingAsset = {
    id : Nat;
    name : Text;
    lat : Float;
    lng : Float;
    speed : Float;
    heading : Float;
    status : Text;
    battery : ?Int;
    timestamp : Int;
  };

  public type GeofenceZone = {
    id : Nat;
    name : Text;
    centerLat : Float;
    centerLng : Float;
    radius : Float;
    isActive : Bool;
  };

  public type GeofenceAlert = {
    id : Nat;
    assetId : Nat;
    zoneId : Nat;
    alertType : Text;
    timestamp : Int;
  };

  public type IoTDevice = {
    id : Nat;
    name : Text;
    deviceType : Text;
    state : Text;
    isOnline : Bool;
    lastSeen : Int;
  };

  public type IoTCommand = {
    deviceId : Nat;
    command : Text;
    value : Text;
    timestamp : Int;
  };
};
