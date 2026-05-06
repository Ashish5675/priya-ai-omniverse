import TrackingTypes "../types/tracking";
import TrackingLib "../lib/tracking";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (
  trackingAssets : TrackingLib.AssetMap,
  geofences : TrackingLib.GeofenceMap,
  geofenceAlerts : TrackingLib.AlertList,
  iotDevices : TrackingLib.DeviceMap,
  nextGeofenceId : { var value : Nat },
  nextGeofenceAlertId : { var value : Nat },
) {

  /// List all tracking assets (query)
  public query func listTrackingAssets() : async [TrackingTypes.TrackingAsset] {
    TrackingLib.listAssets(trackingAssets);
  };

  /// Get a single tracking asset by ID (query)
  public query func getTrackingAsset(assetId : Nat) : async ?TrackingTypes.TrackingAsset {
    TrackingLib.getAsset(trackingAssets, assetId);
  };

  /// List all geofence zones (query)
  public query func listGeofences() : async [TrackingTypes.GeofenceZone] {
    TrackingLib.listGeofences(geofences);
  };

  /// Get all geofence breach alerts (query)
  public query func getGeofenceAlerts() : async [TrackingTypes.GeofenceAlert] {
    TrackingLib.getAllGeofenceAlerts(geofenceAlerts);
  };

  /// Add a new geofence zone
  public shared func addGeofenceZone(
    zoneName : Text,
    centerLat : Float,
    centerLng : Float,
    radius : Float,
  ) : async Nat {
    TrackingLib.addGeofence(geofences, nextGeofenceId, zoneName, centerLat, centerLng, radius);
  };

  /// List all IoT devices (query)
  public query func listIoTDevices() : async [TrackingTypes.IoTDevice] {
    TrackingLib.listIoTDevices(iotDevices);
  };

  /// Send a command to an IoT device
  public shared func sendIoTCommand(deviceId : Nat, command : Text, value : Text) : async Bool {
    TrackingLib.sendIoTCommand(iotDevices, deviceId, command, value);
  };

  /// Advance the tracking simulation by one tick
  public shared func simulateMovement() : async Bool {
    ignore TrackingLib.checkGeofenceAlerts(
      trackingAssets,
      geofences,
      geofenceAlerts,
      nextGeofenceAlertId,
    );
    TrackingLib.simulateAssetMovement(trackingAssets);
  };

};
