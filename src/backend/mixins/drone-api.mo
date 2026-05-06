import DroneTypes "../types/drone";
import DroneLib "../lib/drone";

mixin (
  drones : DroneLib.DroneMap,
  droneAlerts : DroneLib.AlertList,
) {

  /// List all drones (query)
  public query func listDrones() : async [DroneTypes.DroneState] {
    DroneLib.listDrones(drones);
  };

  /// Get a single drone by ID (query)
  public query func getDrone(droneId : Nat) : async ?DroneTypes.DroneState {
    DroneLib.getDroneState(drones, droneId);
  };

  /// Send a flight command: "takeoff" | "land" | "hover" | "return"
  public shared func setDroneCommand(droneId : Nat, command : Text) : async Bool {
    DroneLib.applyCommand(drones, droneId, command);
  };

  /// Get all detection alerts across all drones (query)
  public query func getDetectionAlerts() : async [DroneTypes.DroneAlert] {
    DroneLib.getAllAlerts(droneAlerts);
  };

  /// Get all simulated camera feeds (query)
  public query func getCameraFeeds() : async [DroneTypes.CameraFeed] {
    DroneLib.getCameraFeeds();
  };

  /// Advance the simulation by one tick for all drones
  public shared func triggerSimulation() : async Bool {
    var anyMoved = false;
    for (droneId in [0, 1, 2].vals()) {
      let moved = DroneLib.simulateDroneFlight(drones, droneId);
      if (moved) { anyMoved := true };
    };
    anyMoved;
  };

};
