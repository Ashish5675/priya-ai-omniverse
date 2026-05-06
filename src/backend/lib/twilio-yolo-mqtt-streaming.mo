import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import CallTypes "../types/calls";
import MqttTypes "../types/mqtt";
import DroneTypes "../types/drone";
import StreamTypes "../types/streaming";

/// Domain logic for Twilio calls, YOLO detection, MQTT IoT, and streaming pipeline.
module {

  // ── Call helpers ───────────────────────────────────────────────────────────

  /// Build a new demo CallRecord with the given id and request.
  public func newCallRecord(
    id : Nat,
    req : CallTypes.CallInitRequest,
    timestamp : Int,
  ) : CallTypes.CallRecord {
    {
      id;
      callSid = "DEMO-" # id.toText();
      callerPhone = req.toPhone;
      duration = 15;
      status = "completed";
      transcript = "Demo call simulation: " # req.message;
      timestamp;
    };
  };

  /// Retrieve a call record by id from the call logs list.
  public func findCallRecord(
    calls : List.List<CallTypes.CallRecord>,
    id : Nat,
  ) : ?CallTypes.CallRecord {
    calls.find(func(r) = r.id == id);
  };

  // ── MQTT helpers ───────────────────────────────────────────────────────────

  /// Initialise 6 demo MQTT devices into the provided map.
  public func initMqttDevices(devices : Map.Map<Nat, MqttTypes.MqttDevice>) {
    let now = Time.now();
    let demoDevices : [(Nat, MqttTypes.MqttDevice)] = [
      (1, { id = 1; topic = "home/sensor/temperature"; deviceType = "Temperature Sensor"; state = "active"; value = 22.5; lastUpdate = now; isOnline = true }),
      (2, { id = 2; topic = "home/lock/front"; deviceType = "Smart Lock"; state = "locked"; value = 0.0; lastUpdate = now; isOnline = true }),
      (3, { id = 3; topic = "home/thermostat/main"; deviceType = "Thermostat"; state = "heating"; value = 21.0; lastUpdate = now; isOnline = true }),
      (4, { id = 4; topic = "home/camera/entrance"; deviceType = "Security Camera"; state = "recording"; value = 0.0; lastUpdate = now; isOnline = true }),
      (5, { id = 5; topic = "home/light/living"; deviceType = "Smart Light"; state = "off"; value = 0.0; lastUpdate = now; isOnline = true }),
      (6, { id = 6; topic = "home/fan/bedroom"; deviceType = "Smart Fan"; state = "off"; value = 0.0; lastUpdate = now; isOnline = true }),
    ];
    for ((k, v) in demoDevices.vals()) {
      devices.add(k, v);
    };
  };

  /// Apply an MqttCommand to a device and return the result.
  public func applyMqttCommand(
    devices : Map.Map<Nat, MqttTypes.MqttDevice>,
    cmd : MqttTypes.MqttCommand,
    timestamp : Int,
  ) : MqttTypes.MqttCommandResult {
    // Find device by topic
    let found = devices.entries().find(func((_, d)) = d.topic == cmd.topic);
    switch (found) {
      case (?(k, device)) {
        let newState = if (cmd.action == "toggle") {
          if (device.state == "on") "off" else "on"
        } else {
          cmd.action
        };
        let updated : MqttTypes.MqttDevice = { device with state = newState; lastUpdate = timestamp };
        devices.add(k, updated);
        { success = true; deviceId = k; newState; timestamp };
      };
      case null {
        { success = false; deviceId = 0; newState = ""; timestamp };
      };
    };
  };

  // ── YOLO helpers ───────────────────────────────────────────────────────────

  // ── Pseudo-random helpers (deterministic, no stdlib Random needed on IC) ──

  func pseudoNat(ts : Int, seed : Nat) : Nat {
    let raw : Int = (ts / 1_000_000 + seed.toInt() * 6364136223846793 + 1442695040888963) % 2147483647;
    if (raw < 0) (-raw).toNat() else raw.toNat();
  };

  func pseudoIdx(ts : Int, seed : Nat, range : Nat) : Nat {
    pseudoNat(ts, seed) % range;
  };

  func pseudoFloat(ts : Int, seed : Nat, lo : Float, hi : Float) : Float {
    let idx = pseudoIdx(ts, seed, 10000);
    lo + (hi - lo) * (idx.toFloat() / 9999.0);
  };

  /// Build a simulated YOLO detection result with 3-5 realistic objects.
  public func simulateYoloDetection(
    cameraId : Text,
    timestamp : Int,
  ) : DroneTypes.YoloDetectionResult {
    let classes = ["person", "vehicle", "truck", "motorcycle", "bicycle", "cat", "dog"];
    let classCount = classes.size();

    // 3 to 5 detections
    let count = pseudoIdx(timestamp, 99, 3) + 3;

    let objList = List.empty<DroneTypes.DetectionObject>();
    var i = 0;
    while (i < count) {
      let classIdx  = pseudoIdx(timestamp,  i * 7  + 1, classCount);
      // confidence in range 0.65..0.98 (6500..9800 / 10000)
      let conf100   = pseudoIdx(timestamp,  i * 13 + 2, 3300) + 6500;
      let confidence : Float = conf100.toFloat() / 10000.0;
      let bx        = pseudoFloat(timestamp, i * 17 + 3, 0.05, 0.80);
      let by        = pseudoFloat(timestamp, i * 19 + 4, 0.05, 0.75);
      let bw        = pseudoFloat(timestamp, i * 23 + 5, 0.05, 0.25);
      let bh        = pseudoFloat(timestamp, i * 29 + 6, 0.05, 0.25);
      objList.add({
        name      = classes[classIdx];
        confidence;
        bbox      = { x = bx; y = by; width = bw; height = bh };
        highAlert = confidence > 0.85;
      });
      i += 1;
    };

    let objects = objList.toArray();
    let sumConf  = objects.foldLeft(0.0, func(acc, o) = acc + o.confidence);
    let avgConf  = if (objects.size() > 0) sumConf / objects.size().toFloat() else 0.0;

    { objects; timestamp; cameraId; confidence = avgConf };
  };

  // ── Streaming helpers ──────────────────────────────────────────────────────

  /// Create a new StreamSession record.
  public func newStreamSession(
    id : Nat,
    userId : Principal,
    timestamp : Int,
  ) : StreamTypes.StreamSession {
    {
      id;
      userId;
      chunks = [];
      agentSteps = [];
      status = "active";
      createdAt = timestamp;
    };
  };

  /// Append a StreamChunk to an existing session.
  public func addChunkToSession(
    session : StreamTypes.StreamSession,
    chunk : StreamTypes.StreamChunk,
  ) : StreamTypes.StreamSession {
    let newChunks = session.chunks.concat([chunk]);
    let newStatus = if (chunk.isFinal) "completed" else session.status;
    { session with chunks = newChunks; status = newStatus };
  };

  /// Update an AgentStreamStep within an existing session (replace by agentType or append).
  public func updateAgentStepInSession(
    session : StreamTypes.StreamSession,
    step : StreamTypes.AgentStreamStep,
  ) : StreamTypes.StreamSession {
    let existingIndex = session.agentSteps.findIndex(func(s) = s.agentType == step.agentType);
    let newSteps = switch (existingIndex) {
      case (?idx) {
        session.agentSteps.mapEntries(func(s, i) = if (i == idx) step else s);
      };
      case null {
        session.agentSteps.concat([step]);
      };
    };
    { session with agentSteps = newSteps };
  };
};
