import Types "types";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import ConversationApi "mixins/conversation-api";
import SettingsApi "mixins/settings-api";
import LlmApi "mixins/llm-api";
import AuthApi "mixins/auth-api";
import SubscriptionApi "mixins/subscription-api";
import DroneApi "mixins/drone-api";
import LegalApi "mixins/legal-api";
import TrackingApi "mixins/tracking-api";
import AgentsApi "mixins/agents-api";
import KnowledgeApi "mixins/knowledge-api";
import VoiceApi "mixins/voice-api";
import AnalyticsApi "mixins/analytics-api";
import AdminApi "mixins/admin-api";
import FaceApi "mixins/face-api";
import LlmLib "lib/llm";
import AuthTypes "types/auth";
import SubTypes "types/subscription";
import DroneTypes "types/drone";
import LegalTypes "types/legal";
import TrackingTypes "types/tracking";
import AgentTypes "types/agents";
import KnowledgeTypes "types/knowledge";
import VoiceTypes "types/voice";
import AnalyticsTypes "types/analytics";
import AdminTypes "types/admin";
import DroneLib "lib/drone";
import TrackingLib "lib/tracking";
import CallTypes "types/calls";
import MqttTypes "types/mqtt";
import StreamTypes "types/streaming";
import TwilioApi "mixins/twilio-yolo-mqtt-streaming-api";
import TradingApi "mixins/trading-api";
import GeneticApi "mixins/genetic-api";
import VoiceProfileApi "mixins/voiceprofile-api";
import TradingTypes "types/trading";
import GeneticTypes "types/genetic";
import VoiceProfileTypes "types/voiceprofile";

actor {
  // ── Core state ─────────────────────────────────────────────────────────────
  let messages = List.empty<Types.Message>();
  let nextMessageId = { var value : Nat = 0 };
  let settingsState = { var value : Types.Settings = LlmLib.defaultSettings() };
  let users = Map.empty<Principal, AuthTypes.UserProfile>();
  let subscriptions = Map.empty<Principal, SubTypes.Subscription>();

  // ── Drone state ────────────────────────────────────────────────────────────
  let drones : Map.Map<Nat, DroneTypes.DroneState> = Map.empty<Nat, DroneTypes.DroneState>();
  let droneAlerts : List.List<DroneTypes.DroneAlert> = List.empty<DroneTypes.DroneAlert>();
  let nextDroneAlertId = { var value : Nat = 0 };
  let _droneInit = DroneLib.initDrones(drones);

  // ── Legal state ────────────────────────────────────────────────────────────
  let legalDocs : Map.Map<Nat, LegalTypes.LegalDocument> = Map.empty<Nat, LegalTypes.LegalDocument>();
  let nextLegalDocId = { var value : Nat = 0 };

  // ── Tracking state ─────────────────────────────────────────────────────────
  let trackingAssets : Map.Map<Nat, TrackingTypes.TrackingAsset> = Map.empty<Nat, TrackingTypes.TrackingAsset>();
  let geofences : Map.Map<Nat, TrackingTypes.GeofenceZone> = Map.empty<Nat, TrackingTypes.GeofenceZone>();
  let geofenceAlerts : List.List<TrackingTypes.GeofenceAlert> = List.empty<TrackingTypes.GeofenceAlert>();
  let iotDevices : Map.Map<Nat, TrackingTypes.IoTDevice> = Map.empty<Nat, TrackingTypes.IoTDevice>();
  let nextGeofenceId = { var value : Nat = 0 };
  let nextGeofenceAlertId = { var value : Nat = 0 };
  let _assetsInit = TrackingLib.initAssets(trackingAssets);
  let _iotInit = TrackingLib.initIoTDevices(iotDevices);

  // ── Agents state ───────────────────────────────────────────────────────────
  let agentChains = Map.empty<Nat, AgentTypes.AgentChain>();
  let nextChainId = { var value : Nat = 0 };
  let agentMetrics = { var totalTasks : Nat = 0; var completedTasks : Nat = 0; var failedTasks : Nat = 0 };

  // ── Knowledge state ────────────────────────────────────────────────────────
  let knowledgeDocs = Map.empty<Nat, KnowledgeTypes.KnowledgeDocument>();
  let nextDocId = { var value : Nat = 0 };

  // ── Voice state ────────────────────────────────────────────────────────────
  let voiceSettingsMap = Map.empty<Principal, VoiceTypes.VoiceSettings>();
  let voiceSessionsMap = Map.empty<Nat, VoiceTypes.VoiceSession>();
  let nextVoiceSessionId = { var value : Nat = 0 };

  // ── Analytics state ────────────────────────────────────────────────────────
  let analyticsEvents = List.empty<AnalyticsTypes.AnalyticsEvent>();
  let userMetricsStore = Map.empty<Principal, AnalyticsTypes.UserMetrics>();

  // ── Admin state ────────────────────────────────────────────────────────────
  let bannedUsers = Map.empty<Principal, Bool>();
  let adminLogs = List.empty<AdminTypes.AdminLog>();
  let adminLogNextId = { var value : Nat = 0 };
  let systemStats = { var startTime : Int = Time.now(); var totalMessages : Nat = 0; var totalAgentTasks : Nat = 0 };

  // ── Face state ─────────────────────────────────────────────────────────────
  let faceEncodings = Map.empty<Principal, Text>();

  // ── Trading state ──────────────────────────────────────────────────────────
  let tradingTransactions = List.empty<TradingTypes.Transaction>();
  let txIdCounter = { var value : Nat = 0 };

  // ── Genetic state ──────────────────────────────────────────────────────────
  let geneticStore = Map.empty<Text, List.List<GeneticTypes.UserPreference>>();

  // ── Voice-profile state ────────────────────────────────────────────────────
  let vpStore     = Map.empty<Text, List.List<VoiceProfileTypes.VoiceProfile>>();
  let vpIdCounter = { var value : Nat = 0 };

  // ── Twilio / YOLO / MQTT / Streaming state ─────────────────────────────────
  let callLogs = List.empty<CallTypes.CallRecord>();
  let nextCallId = { var value : Nat = 1 };
  let mqttDevices = Map.empty<Nat, MqttTypes.MqttDevice>();
  let mqttHistory = List.empty<MqttTypes.MqttDeviceHistory>();
  let detectionHistory = List.empty<DroneTypes.DetectionHistoryRecord>();
  let nextDetectionId = { var value : Nat = 1 };
  let streamSessions = Map.empty<Nat, StreamTypes.StreamSession>();
  let nextStreamId = { var value : Nat = 1 };
  let twilioSettings = { var accountSid : Text = ""; var authToken : Text = ""; var fromNumber : Text = "" };
  let mqttBrokerUrl = { var value : Text = "" };

  // ── Mixin composition ──────────────────────────────────────────────────────
  include ConversationApi(messages, nextMessageId);
  include SettingsApi(settingsState);
  include LlmApi();
  include AuthApi(users);
  include SubscriptionApi(subscriptions);
  include DroneApi(drones, droneAlerts);
  include LegalApi(legalDocs, nextLegalDocId);
  include TrackingApi(trackingAssets, geofences, geofenceAlerts, iotDevices, nextGeofenceId, nextGeofenceAlertId);
  include AgentsApi(agentChains, nextChainId, agentMetrics, streamSessions);
  include KnowledgeApi(knowledgeDocs, nextDocId);
  include VoiceApi(voiceSettingsMap, voiceSessionsMap, nextVoiceSessionId);
  include AnalyticsApi(users, analyticsEvents, userMetricsStore);
  include AdminApi(users, bannedUsers, adminLogs, adminLogNextId, systemStats);
  include FaceApi(users, faceEncodings);
  include TwilioApi(callLogs, nextCallId, mqttDevices, mqttHistory, detectionHistory, nextDetectionId, streamSessions, nextStreamId, twilioSettings, mqttBrokerUrl);
  include TradingApi(tradingTransactions, txIdCounter);
  include GeneticApi(geneticStore);
  include VoiceProfileApi(vpStore, vpIdCounter);
};
