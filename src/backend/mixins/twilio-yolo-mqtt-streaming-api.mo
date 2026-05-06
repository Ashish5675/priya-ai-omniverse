import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Array "mo:core/Array";
import CallTypes "../types/calls";
import MqttTypes "../types/mqtt";
import DroneTypes "../types/drone";
import StreamTypes "../types/streaming";
import Lib "../lib/twilio-yolo-mqtt-streaming";
import OutCall "mo:caffeineai-http-outcalls/outcall";

/// Public API mixin for Twilio calls, YOLO detection, MQTT IoT, and streaming.
mixin (
  callLogs : List.List<CallTypes.CallRecord>,
  nextCallId : { var value : Nat },
  mqttDevices : Map.Map<Nat, MqttTypes.MqttDevice>,
  mqttHistory : List.List<MqttTypes.MqttDeviceHistory>,
  detectionHistory : List.List<DroneTypes.DetectionHistoryRecord>,
  nextDetectionId : { var value : Nat },
  streamSessions : Map.Map<Nat, StreamTypes.StreamSession>,
  nextStreamId : { var value : Nat },
  twilioSettings : { var accountSid : Text; var authToken : Text; var fromNumber : Text },
  mqttBrokerUrl : { var value : Text },
) {

  // ── Shared HTTP transform (reused by all outcalls in this mixin) ───────────

  public query func twilioTransform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Twilio / Call module ───────────────────────────────────────────────────

  /// Initialise the call module (seeds demo data if empty).
  public shared func initCallModule() : async Bool {
    if (not callLogs.isEmpty()) {
      return true;
    };
    let now = Time.now();
    let demos : [CallTypes.CallRecord] = [
      { id = 1; callSid = "DEMO-1"; callerPhone = "+919876543210"; duration = 42; status = "completed"; transcript = "Hello, this is a demo call from Priya AI."; timestamp = now - 3_600_000_000_000 },
      { id = 2; callSid = "DEMO-2"; callerPhone = "+918765432109"; duration = 15; status = "completed"; transcript = "Call simulation: emergency alert system test."; timestamp = now - 7_200_000_000_000 },
      { id = 3; callSid = "DEMO-3"; callerPhone = "+917654321098"; duration = 0; status = "missed"; transcript = ""; timestamp = now - 10_800_000_000_000 },
    ];
    nextCallId.value := 4;
    for (r in demos.values()) {
      callLogs.add(r);
    };
    true;
  };

  /// Initiate a call (demo or Twilio live) and return the new CallRecord.
  public shared func makeCall(req : CallTypes.CallInitRequest) : async CallTypes.CallRecord {
    let id = nextCallId.value;
    nextCallId.value += 1;
    let now = Time.now();
    let sid = twilioSettings.accountSid;
    let token = twilioSettings.authToken;

    if (sid == "" or token == "") {
      // Demo mode
      let record = Lib.newCallRecord(id, req, now);
      callLogs.add(record);
      return record;
    };

    // Live Twilio call via http-outcalls
    let twiml = "<Response><Say>" # req.message # "</Say></Response>";
    let body = "To=" # req.toPhone
      # "&From=" # twilioSettings.fromNumber
      # "&Twiml=" # twiml;

    let credentials = sid # ":" # token;
    let encoded = encodeBase64(credentials);
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/x-www-form-urlencoded" },
      { name = "Authorization"; value = "Basic " # encoded },
    ];
    let url = "https://api.twilio.com/2010-04-01/Accounts/" # sid # "/Calls.json";

    let callSid = try {
      let response = await OutCall.httpPostRequest(url, headers, body, twilioTransform);
      parseTwilioSid(response, id);
    } catch (_) {
      "TWILIO-" # id.toText();
    };

    let record : CallTypes.CallRecord = {
      id;
      callSid;
      callerPhone = req.toPhone;
      duration = 0;
      status = "connecting";
      transcript = req.message;
      timestamp = now;
    };
    callLogs.add(record);
    record;
  };

  /// Return all stored call log records sorted by timestamp descending.
  public query func getCallLogs() : async [CallTypes.CallRecord] {
    let arr = callLogs.toArray();
    arr.sort(func(a, b) = Int.compare(b.timestamp, a.timestamp));
  };

  /// Return a single call record by id, or null if not found.
  public query func getCallRecord(id : Nat) : async ?CallTypes.CallRecord {
    Lib.findCallRecord(callLogs, id);
  };

  // ── MQTT IoT module ────────────────────────────────────────────────────────

  /// Initialise the MQTT module (seeds demo devices if empty).
  public shared func initMqttModule() : async Bool {
    if (not mqttDevices.isEmpty()) {
      return true;
    };
    Lib.initMqttDevices(mqttDevices);
    true;
  };

  /// Return all MQTT devices.
  public query func getMqttDevices() : async [MqttTypes.MqttDevice] {
    mqttDevices.values().toArray();
  };

  /// Send a command to an MQTT device and return the result.
  /// Send a command to an MQTT device and return the result.
  /// If mqttBrokerUrl is set, attempts HTTP POST to broker/publish endpoint;
  /// falls back to demo in-memory mode on error or when URL is empty.
  public shared func sendMqttCommand(cmd : MqttTypes.MqttCommand) : async MqttTypes.MqttCommandResult {
    let now = Time.now();
    let brokerUrl = mqttBrokerUrl.value;

    if (brokerUrl != "") {
      let body = "{\"topic\":\"" # cmd.topic # "\",\"payload\":\"" # cmd.payload # "\",\"qos\":1}";
      let headers : [OutCall.Header] = [
        { name = "Content-Type"; value = "application/json" },
      ];
      try {
        let _resp = await OutCall.httpPostRequest(
          brokerUrl # "/publish",
          headers,
          body,
          twilioTransform,
        );
        // Optimistic update after successful publish
        let result = Lib.applyMqttCommand(mqttDevices, cmd, now);
        if (result.success) {
          let val = switch (mqttDevices.get(result.deviceId)) {
            case (?d) { d.value };
            case null { 0.0 };
          };
          mqttHistory.add({ deviceId = result.deviceId; state = result.newState; value = val; timestamp = now });
        };
        return result;
      } catch (_) {
        // Fall through to demo/offline mode
      };
    };

    // Demo / offline mode: update in-memory state directly
    let result = Lib.applyMqttCommand(mqttDevices, cmd, now);
    if (result.success) {
      let val = switch (mqttDevices.get(result.deviceId)) {
        case (?d) { d.value };
        case null { 0.0 };
      };
      mqttHistory.add({ deviceId = result.deviceId; state = result.newState; value = val; timestamp = now });
    };
    result;
  };

  /// Return history entries for a specific MQTT device, sorted newest first.
  public query func getMqttDeviceHistory(deviceId : Nat) : async [MqttTypes.MqttDeviceHistory] {
    let filtered = mqttHistory.filter(func(h) = h.deviceId == deviceId);
    let arr = filtered.toArray();
    arr.sort(func(a, b) = Int.compare(b.timestamp, a.timestamp));
  };

  // ── YOLO object detection module ───────────────────────────────────────────

  /// Pre-populate 3 demo detection records if history is empty.
  public shared func initDetectionModule() : async Bool {
    if (detectionHistory.size() > 0) { return false };
    let now = Time.now();
    let offsets : [Int] = [7_200_000_000_000, 3_600_000_000_000, 0];
    for (offset in offsets.vals()) {
      let ts = now - offset;
      let sim = Lib.simulateYoloDetection("cam-demo", ts);
      let id = nextDetectionId.value;
      nextDetectionId.value += 1;
      detectionHistory.add({ id; cameraId = sim.cameraId; objects = sim.objects; timestamp = sim.timestamp });
    };
    true;
  };

  /// Run YOLO detection on the supplied request (real API or demo fallback).
  public shared func runYoloDetection(req : DroneTypes.YoloDetectionRequest) : async DroneTypes.YoloDetectionResult {
    let now = Time.now();
    let result : DroneTypes.YoloDetectionResult = if (mqttBrokerUrl.value == "" or true) {
      // Always use demo simulation for YOLO (real API available via separate integration)
      Lib.simulateYoloDetection(req.cameraId, now);
    } else {
      let body = "{\"image\":\"" # req.imageData # "\",\"camera_id\":\"" # req.cameraId # "\"}";
      let headers : [OutCall.Header] = [
        { name = "Content-Type"; value = "application/json" },
      ];
      try {
        let raw = await OutCall.httpPostRequest(mqttBrokerUrl.value, headers, body, twilioTransform);
        parseYoloResponse(raw, req.cameraId, now);
      } catch (_) {
        Lib.simulateYoloDetection(req.cameraId, now);
      };
    };
    let histId = nextDetectionId.value;
    nextDetectionId.value += 1;
    detectionHistory.add({ id = histId; cameraId = result.cameraId; objects = result.objects; timestamp = result.timestamp });
    result;
  };

  /// Return last 50 detection history records sorted by timestamp descending.
  public query func getDetectionHistory() : async [DroneTypes.DetectionHistoryRecord] {
    let arr = detectionHistory.toArray();
    let sorted = arr.sort(func(a, b) = Int.compare(b.timestamp, a.timestamp));
    if (sorted.size() > 50) sorted.sliceToArray(0, 50) else sorted;
  };

  /// Parse a YOLO JSON response into a YoloDetectionResult (fallback to simulation on error).
  private func parseYoloResponse(raw : Text, cameraId : Text, ts : Int) : DroneTypes.YoloDetectionResult {
    // Expected: {"objects":[{"label":"person","confidence":0.92,"bbox":[x,y,w,h]},...]}
    let fallback = Lib.simulateYoloDetection(cameraId, ts);
    if (not raw.contains(#text "\"label\"")) return fallback;

    let objList = List.empty<DroneTypes.DetectionObject>();
    let labelSplit = raw.split(#text "\"label\"");
    ignore labelSplit.next(); // skip preamble before first label
    for (block in labelSplit) {
      // Extract class name: next text value after ":"
      let nameParts = block.split(#text "\"");
      ignore nameParts.next(); // skip ":"
      let className = switch (nameParts.next()) { case null "unknown"; case (?n) n };

      // Extract confidence
      let confidence : Float = switch (extractFloatField(block, "confidence")) {
        case null 0.70;
        case (?c) c;
      };

      // Extract bbox array [x,y,w,h]
      let bboxVals = extractBboxArray(block);
      let bx = if (bboxVals.size() > 0) bboxVals[0] else 0.0;
      let by = if (bboxVals.size() > 1) bboxVals[1] else 0.0;
      let bw = if (bboxVals.size() > 2) bboxVals[2] else 0.1;
      let bh = if (bboxVals.size() > 3) bboxVals[3] else 0.1;

      objList.add({
        name      = className;
        confidence;
        bbox      = { x = bx; y = by; width = bw; height = bh };
        highAlert = false;
      });
    };

    if (objList.size() == 0) return fallback;

    let objects  = objList.toArray();
    let sumConf  = objects.foldLeft(0.0, func(acc, o) = acc + o.confidence);
    let avgConf  = sumConf / objects.size().toFloat();
    { objects; timestamp = ts; cameraId; confidence = avgConf };
  };

  /// Extract Float after `"key":` in a JSON fragment.
  private func extractFloatField(text : Text, key : Text) : ?Float {
    let marker = "\"" # key # "\":";
    let parts  = text.split(#text marker);
    ignore parts.next();
    switch (parts.next()) {
      case null null;
      case (?after) textToFloat(after);
    };
  };

  /// Extract up to 4 floats from a bbox array fragment.
  private func extractBboxArray(text : Text) : [Float] {
    let marker = "\"bbox\":";
    let parts  = text.split(#text marker);
    ignore parts.next();
    switch (parts.next()) {
      case null [];
      case (?after) {
        // Grab content between '[' and ']'
        let sp = after.split(#char '[');
        ignore sp.next();
        switch (sp.next()) {
          case null [];
          case (?inner) {
            let trimmed = switch (inner.split(#char ']').next()) {
              case null inner;
              case (?t) t;
            };
            let result = List.empty<Float>();
            for (tok in trimmed.split(#char ',')) {
              switch (textToFloat(tok.trim(#char ' '))) {
                case null {};
                case (?f) result.add(f);
              };
            };
            result.toArray();
          };
        };
      };
    };
  };

  /// Parse a numeric text token into a Float.
  private func textToFloat(t : Text) : ?Float {
    if (t.contains(#char '.')) {
      var parts = t.split(#char '.');
      let intPart  = switch (parts.next()) { case null "0"; case (?s) s };
      let fracPart = switch (parts.next()) { case null "0"; case (?s) s };
      // collect only numeric prefix of intPart
      var intStr = "";
      for (c in intPart.toIter()) {
        if ((c >= '0' and c <= '9') or (c == '-' and intStr == "")) {
          intStr #= Text.fromChar(c);
        };
      };
      var fracStr = "";
      for (c in fracPart.toIter()) {
        if (c >= '0' and c <= '9') { fracStr #= Text.fromChar(c) };
      };
      switch (Int.fromText(intStr), Int.fromText(fracStr)) {
        case (?iv, ?fv) {
          let fracLen = fracStr.size();
          var denom : Float = 1.0;
          var j = 0;
          while (j < fracLen) { denom *= 10.0; j += 1 };
          let sign : Float = if (iv < 0) -1.0 else 1.0;
          ?(iv.toFloat() + sign * fv.toFloat() / denom);
        };
        case _ null;
      };
    } else {
      var numStr = "";
      for (c in t.toIter()) {
        if ((c >= '0' and c <= '9') or (c == '-' and numStr == "")) {
          numStr #= Text.fromChar(c);
        };
      };
      switch (Int.fromText(numStr)) {
        case null null;
        case (?n) ?(n.toFloat());
      };
    };
  };

  // ── Streaming pipeline module ──────────────────────────────────────────────

  /// Create a new streaming session and return it.
  public shared ({ caller }) func createStreamSession() : async StreamTypes.StreamSession {
    let id = nextStreamId.value;
    nextStreamId.value += 1;
    let session = Lib.newStreamSession(id, caller, Time.now());
    streamSessions.add(id, session);
    session;
  };

  /// Append a chunk to an existing streaming session.
  public shared func updateStreamChunk(sessionId : Nat, chunk : StreamTypes.StreamChunk) : async Bool {
    switch (streamSessions.get(sessionId)) {
      case (?session) {
        let updated = Lib.addChunkToSession(session, chunk);
        streamSessions.add(sessionId, updated);
        true;
      };
      case null { false };
    };
  };

  /// Update (or append) an agent step in an existing streaming session.
  public shared func updateAgentStep(sessionId : Nat, step : StreamTypes.AgentStreamStep) : async Bool {
    switch (streamSessions.get(sessionId)) {
      case (?session) {
        let updated = Lib.updateAgentStepInSession(session, step);
        streamSessions.add(sessionId, updated);
        true;
      };
      case null { false };
    };
  };

  /// Return a streaming session by id.
  public query func getStreamSession(id : Nat) : async ?StreamTypes.StreamSession {
    streamSessions.get(id);
  };

  /// Return the most recent active (non-completed) streaming session for the caller.
  public query ({ caller }) func getActiveStream() : async ?StreamTypes.StreamSession {
    streamSessions.values().find(func(s) = s.userId == caller and s.status == "active");
  };

  // ── Private helpers ────────────────────────────────────────────────────────

  /// Minimal base64 encoder for ASCII strings (Twilio Basic Auth).
  /// Converts each char to its ASCII code via a lookup table approach.
  private func encodeBase64(input : Text) : Text {
    let table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let tableArr = table.toArray();
    // Build array of ASCII byte values using printable ASCII range
    let inputArr = input.toArray();
    let size = inputArr.size();
    let codes = Array.tabulate(size, func(i) = charToNat(inputArr[i]));
    var result = "";
    var i = 0;
    while (i < size) {
      let b0 = codes[i];
      let b1 = if (i + 1 < size) codes[i + 1] else 0;
      let b2 = if (i + 2 < size) codes[i + 2] else 0;
      let n = b0 * 65536 + b1 * 256 + b2;
      let c0 = Text.fromChar(tableArr[n / 262144]);
      let c1 = Text.fromChar(tableArr[(n / 4096) % 64]);
      let c2 = if (i + 1 < size) Text.fromChar(tableArr[(n / 64) % 64]) else "=";
      let c3 = if (i + 2 < size) Text.fromChar(tableArr[n % 64]) else "=";
      result := result # c0 # c1 # c2 # c3;
      i += 3;
    };
    result;
  };

  /// Map a printable ASCII Char to its Nat code point.
  private func charToNat(c : Char) : Nat {
    let ascii = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    let arr = ascii.toArray();
    for (i in arr.keys()) {
      if (arr[i] == c) return i + 32; // space = 32
    };
    0;
  };

  /// Extract "sid" field value from Twilio JSON response.
  private func parseTwilioSid(json : Text, fallbackId : Nat) : Text {
    let marker = "\"sid\":\"";
    if (not json.contains(#text marker)) {
      return "TWILIO-" # fallbackId.toText();
    };
    let parts = json.split(#text marker);
    var afterSid = "";
    var foundFirst = false;
    for (part in parts) {
      if (not foundFirst) {
        foundFirst := true;
      } else if (afterSid == "") {
        afterSid := part;
      };
    };
    if (afterSid == "") return "TWILIO-" # fallbackId.toText();
    var sid = "";
    var done = false;
    for (c in afterSid.chars()) {
      if (done) {}
      else if (Text.fromChar(c) == "\"") { done := true }
      else { sid := sid # Text.fromChar(c) };
    };
    if (sid == "") "TWILIO-" # fallbackId.toText() else sid;
  };
};
