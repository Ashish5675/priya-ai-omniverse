module {
  public type DroneStatus = {
    #idle;
    #flying;
    #landing;
    #emergency;
  };

  public type DroneState = {
    id : Nat;
    lat : Float;
    lng : Float;
    altitude : Float;
    speed : Float;
    battery : Int;
    status : DroneStatus;
    timestamp : Int;
  };

  public type BoundingBox = {
    x : Float;
    y : Float;
    width : Float;
    height : Float;
  };

  public type DetectionObject = {
    name : Text;
    confidence : Float;
    bbox : BoundingBox;
    highAlert : Bool;
  };

  public type DroneAlert = {
    id : Nat;
    droneId : Nat;
    alertType : Text;
    description : Text;
    timestamp : Int;
  };

  public type CameraFeed = {
    id : Nat;
    name : Text;
    streamUrl : Text;
    isActive : Bool;
  };

  // ── YOLO detection types ──────────────────────────────────────────────────

  public type YoloDetectionRequest = {
    imageData : Text;
    cameraId : Text;
  };

  public type YoloDetectionResult = {
    objects : [DetectionObject];
    timestamp : Int;
    cameraId : Text;
    confidence : Float;
  };

  public type DetectionHistoryRecord = {
    id : Nat;
    cameraId : Text;
    objects : [DetectionObject];
    timestamp : Int;
  };
};
