import TrackingTypes "../types/tracking";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

module {
  public type AssetMap = Map.Map<Nat, TrackingTypes.TrackingAsset>;
  public type GeofenceMap = Map.Map<Nat, TrackingTypes.GeofenceZone>;
  public type AlertList = List.List<TrackingTypes.GeofenceAlert>;
  public type DeviceMap = Map.Map<Nat, TrackingTypes.IoTDevice>;

  // ── Demo seed data ────────────────────────────────────────────────────────

  /// Initialise 5 demo tracking assets in the Nagpur area
  public func initAssets(assets : AssetMap) {
    let seeds : [(Nat, Text, Float, Float)] = [
      (0, "Vehicle Alpha",   21.1458, 79.0882),
      (1, "Vehicle Beta",    21.1520, 79.0950),
      (2, "Patrol Unit C",   21.1390, 79.0810),
      (3, "Ambulance D",     21.1600, 79.1000),
      (4, "Drone Carrier E", 21.1300, 79.0750),
    ];
    for ((id, assetName, lat, lng) in seeds.vals()) {
      let asset : TrackingTypes.TrackingAsset = {
        id;
        name = assetName;
        lat;
        lng;
        speed = 0.0;
        heading = 0.0;
        status = "active";
        battery = ?(90 - id.toInt() * 10);
        timestamp = Time.now();
      };
      assets.add(id, asset);
    };
  };

  /// Initialise 6 demo IoT smart-home devices
  public func initIoTDevices(devices : DeviceMap) {
    let seeds : [(Nat, Text, Text, Text)] = [
      (0, "Living Room Light",  "light",      "off"),
      (1, "Thermostat",         "thermostat", "22 C"),
      (2, "Front Door Lock",    "lock",       "locked"),
      (3, "Security Camera",    "camera",     "on"),
      (4, "Ceiling Fan",        "fan",        "off"),
      (5, "Garage Door",        "door",       "closed"),
    ];
    for ((id, deviceName, deviceType, state) in seeds.vals()) {
      let device : TrackingTypes.IoTDevice = {
        id;
        name = deviceName;
        deviceType;
        state;
        isOnline = true;
        lastSeen = Time.now();
      };
      devices.add(id, device);
    };
  };

  // ── Asset queries ─────────────────────────────────────────────────────────

  public func getAsset(assets : AssetMap, assetId : Nat) : ?TrackingTypes.TrackingAsset {
    assets.get(assetId);
  };

  public func listAssets(assets : AssetMap) : [TrackingTypes.TrackingAsset] {
    let buf = List.empty<TrackingTypes.TrackingAsset>();
    for ((_, a) in assets.entries()) {
      buf.add(a);
    };
    buf.toArray();
  };

  // ── Asset mutations ───────────────────────────────────────────────────────

  public func updateAssetPosition(
    assets : AssetMap,
    assetId : Nat,
    lat : Float,
    lng : Float,
    speed : Float,
    heading : Float,
  ) : Bool {
    switch (assets.get(assetId)) {
      case null false;
      case (?asset) {
        assets.add(assetId, { asset with lat; lng; speed; heading; timestamp = Time.now() });
        true;
      };
    };
  };

  // ── Geofence ──────────────────────────────────────────────────────────────

  public func addGeofence(
    geofences : GeofenceMap,
    nextId : { var value : Nat },
    zoneName : Text,
    centerLat : Float,
    centerLng : Float,
    radius : Float,
  ) : Nat {
    let id = nextId.value;
    let zone : TrackingTypes.GeofenceZone = {
      id;
      name = zoneName;
      centerLat;
      centerLng;
      radius;
      isActive = true;
    };
    geofences.add(id, zone);
    nextId.value += 1;
    id;
  };

  public func listGeofences(geofences : GeofenceMap) : [TrackingTypes.GeofenceZone] {
    let buf = List.empty<TrackingTypes.GeofenceZone>();
    for ((_, z) in geofences.entries()) {
      buf.add(z);
    };
    buf.toArray();
  };

  /// Check all assets against all active geofences — returns new alerts.
  public func checkGeofenceAlerts(
    assets : AssetMap,
    geofences : GeofenceMap,
    alerts : AlertList,
    nextAlertId : { var value : Nat },
  ) : [TrackingTypes.GeofenceAlert] {
    let newAlerts = List.empty<TrackingTypes.GeofenceAlert>();
    for ((_, zone) in geofences.entries()) {
      if (zone.isActive) {
        for ((_, asset) in assets.entries()) {
          let dist = approxDistKm(asset.lat, asset.lng, zone.centerLat, zone.centerLng);
          if (dist <= zone.radius / 1000.0) {
            let id = nextAlertId.value;
            let alert : TrackingTypes.GeofenceAlert = {
              id;
              assetId = asset.id;
              zoneId = zone.id;
              alertType = "enter";
              timestamp = Time.now();
            };
            alerts.add(alert);
            newAlerts.add(alert);
            nextAlertId.value += 1;
          };
        };
      };
    };
    newAlerts.toArray();
  };

  public func getAllGeofenceAlerts(alerts : AlertList) : [TrackingTypes.GeofenceAlert] {
    alerts.toArray();
  };

  // ── IoT ───────────────────────────────────────────────────────────────────

  public func listIoTDevices(devices : DeviceMap) : [TrackingTypes.IoTDevice] {
    let buf = List.empty<TrackingTypes.IoTDevice>();
    for ((_, d) in devices.entries()) {
      buf.add(d);
    };
    buf.toArray();
  };

  /// Apply a command to an IoT device (demo state machine)
  public func sendIoTCommand(
    devices : DeviceMap,
    deviceId : Nat,
    command : Text,
    value : Text,
  ) : Bool {
    switch (devices.get(deviceId)) {
      case null false;
      case (?device) {
        let newState = switch (command) {
          case "turn_on"  "on";
          case "turn_off" "off";
          case "set"      value;
          case "lock"     "locked";
          case "unlock"   "unlocked";
          case "open"     "open";
          case "close"    "closed";
          case _          device.state;
        };
        devices.add(deviceId, { device with state = newState; lastSeen = Time.now() });
        true;
      };
    };
  };

  // ── Simulation ────────────────────────────────────────────────────────────

  /// Advance one simulation tick: move each asset by a small deterministic delta
  public func simulateAssetMovement(assets : AssetMap) : Bool {
    let t = Time.now();
    let tickMs : Int = (t / 1_000_000) % 1000;
    for ((id, asset) in assets.entries()) {
    let iId : Int = id.toInt();
      let dLat : Float = ((tickMs + iId * 7) % 11).toFloat() * 0.0001 - (0.0001 * 5.0);
      let dLng : Float = ((tickMs + iId * 13) % 11).toFloat() * 0.0001 - (0.0001 * 5.0);
      let newSpeed : Float = ((tickMs + iId * 3) % 60).toFloat();
      let newHeading : Float = ((tickMs + iId * 17) % 360).toFloat();
      assets.add(id, {
        asset with
        lat = asset.lat + dLat;
        lng = asset.lng + dLng;
        speed = newSpeed;
        heading = newHeading;
        timestamp = t;
      });
    };
    true;
  };

  // ── Helpers ───────────────────────────────────────────────────────────────

  /// Approximate equirectangular distance in km (good enough for small distances).
  func approxDistKm(lat1 : Float, lng1 : Float, lat2 : Float, lng2 : Float) : Float {
    let dLat = (lat2 - lat1) * 111.0;
    let dLng = (lng2 - lng1) * 111.0;
    // sqrt approximation: use sum of squares and compare against radius^2 where possible
    // For small distances, just use pythagorean distance in km
    let dist2 = dLat * dLat + dLng * dLng;
    // integer-free sqrt via Newton's method (3 iterations, sufficient for demo)
    if (dist2 <= 0.0) {
      0.0;
    } else {
      var x = dist2;
      x := (x + dist2 / x) / 2.0;
      x := (x + dist2 / x) / 2.0;
      x := (x + dist2 / x) / 2.0;
      x;
    };
  };
};
