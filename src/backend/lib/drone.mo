import DroneTypes "../types/drone";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  public type DroneMap = Map.Map<Nat, DroneTypes.DroneState>;
  public type AlertList = List.List<DroneTypes.DroneAlert>;

  // ── Demo seed data ────────────────────────────────────────────────────────

  /// Initialise 3 demo drones in the Nagpur area (21.1458° N, 79.0882° E)
  public func initDrones(drones : DroneMap) {
    let seeds : [(Nat, Float, Float)] = [
      (0, 21.1458, 79.0882),
      (1, 21.1520, 79.0950),
      (2, 21.1390, 79.0810),
    ];
    for ((id, lat, lng) in seeds.vals()) {
      let state : DroneTypes.DroneState = {
        id;
        lat;
        lng;
        altitude = 0.0;
        speed = 0.0;
        battery = 100;
        status = #idle;
        timestamp = Time.now();
      };
      drones.add(id, state);
    };
  };

  // ── Queries ───────────────────────────────────────────────────────────────

  public func getDroneState(drones : DroneMap, droneId : Nat) : ?DroneTypes.DroneState {
    drones.get(droneId);
  };

  public func listDrones(drones : DroneMap) : [DroneTypes.DroneState] {
    let buf = List.empty<DroneTypes.DroneState>();
    for ((_, state) in drones.entries()) {
      buf.add(state);
    };
    buf.toArray();
  };

  public func getAlerts(alerts : AlertList, droneId : Nat) : [DroneTypes.DroneAlert] {
    alerts.filter(func(a) { a.droneId == droneId }).toArray();
  };

  public func getAllAlerts(alerts : AlertList) : [DroneTypes.DroneAlert] {
    alerts.toArray();
  };

  public func getCameraFeeds() : [DroneTypes.CameraFeed] {
    [
       { id = 0; name = "Drone Alpha – Nagpur Central"; streamUrl = "sim://feed/0"; isActive = true },
      { id = 1; name = "Drone Beta – Sitabuldi"; streamUrl = "sim://feed/1"; isActive = true },
      { id = 2; name = "Drone Gamma – Wardha Road"; streamUrl = "sim://feed/2"; isActive = false },
    ];
  };

  // ── Updates ───────────────────────────────────────────────────────────────

  public func updateDronePosition(
    drones : DroneMap,
    droneId : Nat,
    lat : Float,
    lng : Float,
    altitude : Float,
  ) : Bool {
    switch (drones.get(droneId)) {
      case null false;
      case (?state) {
        drones.add(droneId, { state with lat; lng; altitude; timestamp = Time.now() });
        true;
      };
    };
  };

  public func setDroneStatus(
    drones : DroneMap,
    droneId : Nat,
    status : DroneTypes.DroneStatus,
  ) : Bool {
    switch (drones.get(droneId)) {
      case null false;
      case (?state) {
        let speed : Float = switch (status) {
          case (#flying) 15.0;
          case (#landing) 3.0;
          case (#idle) 0.0;
          case (#emergency) 0.0;
        };
        let altitude : Float = switch (status) {
          case (#flying) 50.0;
          case (#landing) 0.0;
          case _ state.altitude;
        };
        drones.add(droneId, { state with status; speed; altitude; timestamp = Time.now() });
        true;
      };
    };
  };

  public func addDetection(
    drones : DroneMap,
    alerts : AlertList,
    nextAlertId : { var value : Nat },
    droneId : Nat,
    objects : [DroneTypes.DetectionObject],
  ) : Nat {
    if (objects.size() == 0) { return nextAlertId.value };
    switch (drones.get(droneId)) {
      case null { nextAlertId.value };
      case (?_) {
        let id = nextAlertId.value;
        let desc = "Detected: " # debug_show(objects.size()) # " object(s) — " #
          objects[0].name # " (" # floatToPercent(objects[0].confidence) # " conf)";
        let alert : DroneTypes.DroneAlert = {
          id;
          droneId;
          alertType = "detection";
          description = desc;
          timestamp = Time.now();
        };
        alerts.add(alert);
        nextAlertId.value += 1;
        id;
      };
    };
  };

  /// Advance one simulation tick: move drone by a small random-ish delta,
  /// drain battery 1–3 %, set status to #flying.
  public func simulateDroneFlight(
    drones : DroneMap,
    droneId : Nat,
  ) : Bool {
    switch (drones.get(droneId)) {
      case null false;
      case (?state) {
        // Deterministic "pseudo-random" delta based on current timestamp
        let t = Time.now();
        let tickNs = (t / 1_000_000) % 1000; // 0-999 ms component
        let dLat : Float = ((tickNs % 10).toFloat() - 5.0) * 0.0001;
        let dLng : Float = (((tickNs / 10) % 10).toFloat() - 5.0) * 0.0001;
        let drain : Int = 1 + (tickNs % 3 : Int);
        let newBattery : Int = if (state.battery > drain) state.battery - drain else 0;
        let newStatus : DroneTypes.DroneStatus = if (newBattery == 0) #emergency else #flying;
        drones.add(
          droneId,
          {
            state with
            lat = state.lat + dLat;
            lng = state.lng + dLng;
            altitude = 50.0;
            speed = 12.0;
            battery = newBattery;
            status = newStatus;
            timestamp = t;
          },
        );
        true;
      };
    };
  };

  // ── Command handler ───────────────────────────────────────────────────────

  public func applyCommand(
    drones : DroneMap,
    droneId : Nat,
    command : Text,
  ) : Bool {
    let status : ?DroneTypes.DroneStatus = switch (command) {
      case "takeoff" ?#flying;
      case "land" ?#landing;
      case "hover" ?#flying;
      case "return" ?#landing;
      case _ null;
    };
    switch (status) {
      case null false;
      case (?s) setDroneStatus(drones, droneId, s);
    };
  };

  // ── Helpers ───────────────────────────────────────────────────────────────

  func floatToPercent(f : Float) : Text {
    debug_show(f) # "%";
  };
};
