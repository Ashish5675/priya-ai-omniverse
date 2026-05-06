import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface IoTDevice {
    id: bigint;
    name: string;
    isOnline: boolean;
    state: string;
    deviceType: string;
    lastSeen: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface GeofenceAlert {
    id: bigint;
    alertType: string;
    assetId: bigint;
    timestamp: bigint;
    zoneId: bigint;
}
export interface LegalClause {
    id: bigint;
    startPos: bigint;
    text: string;
    clauseType: string;
    docId: bigint;
    endPos: bigint;
}
export interface YoloDetectionResult {
    objects: Array<DetectionObject>;
    timestamp: bigint;
    confidence: number;
    cameraId: string;
}
export interface VoiceSettings {
    continuousMode: boolean;
    autoPlay: boolean;
    language: Language;
    speed: number;
    pitch: number;
}
export interface TrackingAsset {
    id: bigint;
    lat: number;
    lng: number;
    status: string;
    name: string;
    heading: number;
    speed: number;
    timestamp: bigint;
    battery?: bigint;
}
export interface MqttDevice {
    id: bigint;
    topic: string;
    value: number;
    lastUpdate: bigint;
    isOnline: boolean;
    state: string;
    deviceType: string;
}
export interface ChatMessage {
    content: string;
    role: string;
}
export interface BoundingBox {
    x: number;
    y: number;
    height: number;
    width: number;
}
export interface VoiceProfile {
    id: string;
    relationship: string;
    mfccFeatures: Array<number>;
    userId: string;
    name: string;
    enrolledPhrases: bigint;
    enrolledAt: bigint;
}
export interface MqttCommandResult {
    deviceId: bigint;
    timestamp: bigint;
    newState: string;
    success: boolean;
}
export interface StockSymbol {
    name: string;
    sector: string;
    symbol: string;
}
export interface KnowledgeStats {
    indexedDocs: bigint;
    totalChunks: bigint;
    totalDocuments: bigint;
}
export interface GeofenceZone {
    id: bigint;
    name: string;
    isActive: boolean;
    radius: number;
    centerLat: number;
    centerLng: number;
}
export interface RevenueMetrics {
    mrr: number;
    month: string;
    arpu: number;
    churnRate: number;
    tierBreakdown: TierBreakdown;
}
export interface CallRecord {
    id: bigint;
    status: string;
    duration: bigint;
    callerPhone: string;
    callSid: string;
    timestamp: bigint;
    transcript: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface StreamSession {
    id: bigint;
    status: string;
    userId: Principal;
    createdAt: bigint;
    agentSteps: Array<AgentStreamStep>;
    chunks: Array<StreamChunk>;
}
export type UserId = Principal;
export interface LegalDocument {
    id: bigint;
    title: string;
    content: string;
    userId: Principal;
    clauses: Array<LegalClause>;
    summary?: string;
    uploadedAt: bigint;
}
export interface AgentMetrics {
    totalTasks: bigint;
    completedTasks: bigint;
    avgDuration: bigint;
    failedTasks: bigint;
}
export interface YoloDetectionRequest {
    imageData: string;
    cameraId: string;
}
export interface CallInitRequest {
    toPhone: string;
    message: string;
}
export type LoginResult = {
    __kind__: "ok";
    ok: UserProfile;
} | {
    __kind__: "err";
    err: string;
};
export interface KnowledgeDocument {
    id: bigint;
    title: string;
    content: string;
    indexStatus: IndexStatus;
    userId: Principal;
    chunks: Array<KnowledgeChunk>;
    docType: DocumentType;
    uploadedAt: bigint;
}
export interface UserProfile {
    id: UserId;
    name: string;
    createdAt: bigint;
    role: UserRole;
    tier: SubscriptionTier;
    email: string;
}
export interface MqttCommand {
    topic: string;
    action: string;
    payload: string;
}
export interface AgentChain {
    id: bigint;
    status: AgentStatus;
    tasks: Array<AgentTask>;
    goal: string;
    currentStep: bigint;
}
export interface DroneState {
    id: bigint;
    lat: number;
    lng: number;
    status: DroneStatus;
    altitude: number;
    speed: number;
    timestamp: bigint;
    battery: bigint;
}
export interface VoiceMatch {
    name: string;
    profileId: string;
    confidence: number;
}
export interface GeneticProfile {
    technicalDepth: number;
    userId: string;
    preferences: Array<UserPreference>;
    dominantDomain: string;
    formalityLevel: number;
    dominantLanguage: string;
    lastAdapted: bigint;
}
export interface KnowledgeChunk {
    id: bigint;
    chunkIndex: bigint;
    text: string;
    embeddingVector: Array<number>;
    similarity: number;
    docId: bigint;
}
export interface AgentTask {
    id: bigint;
    status: AgentStatus;
    output?: string;
    agentType: AgentType;
    timestamp: bigint;
    input: string;
}
export interface Transaction {
    id: string;
    action: TransactionAction;
    userId: string;
    note: string;
    timestamp: bigint;
    quantity: bigint;
    price: number;
    symbol: string;
}
export interface CameraFeed {
    id: bigint;
    name: string;
    isActive: boolean;
    streamUrl: string;
}
export type RegisterResult = {
    __kind__: "ok";
    ok: UserProfile;
} | {
    __kind__: "err";
    err: string;
};
export interface StockPrice {
    low: number;
    date: bigint;
    high: number;
    close: number;
    open: number;
    volume: bigint;
    symbol: string;
}
export interface LegalExport {
    content: string;
    docId: bigint;
    format: string;
}
export interface Holding {
    avgCost: number;
    quantity: bigint;
    symbol: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Portfolio {
    totalValue: number;
    userId: string;
    holdings: Array<Holding>;
    lastUpdated: bigint;
}
export interface SubscriptionStatus {
    active: boolean;
    tier: SubscriptionTier;
    startDate: bigint;
}
export interface SystemMetrics {
    mrr: number;
    activeUsers: bigint;
    totalMessages: bigint;
    totalVoiceCalls: bigint;
    totalUsers: bigint;
    totalAgentTasks: bigint;
}
export interface KnowledgeResult {
    chunk: KnowledgeChunk;
    score: number;
}
export interface VoiceSession {
    id: bigint;
    synthesis: string;
    userId: Principal;
    language: Language;
    transcription: string;
    timestamp: bigint;
}
export interface DetectionObject {
    highAlert: boolean;
    bbox: BoundingBox;
    name: string;
    confidence: number;
}
export interface AgentStreamStep {
    status: string;
    completedAt: bigint;
    output: string;
    startedAt: bigint;
    agentType: string;
}
export interface UserPreference {
    key: string;
    weight: number;
    value: string;
    userId: string;
    updatedAt: bigint;
}
export interface DroneAlert {
    id: bigint;
    droneId: bigint;
    alertType: string;
    description: string;
    timestamp: bigint;
}
export interface TierBreakdown {
    pro: bigint;
    enterprise: bigint;
    free: bigint;
}
export interface MqttDeviceHistory {
    value: number;
    state: string;
    deviceId: bigint;
    timestamp: bigint;
}
export interface Settings {
    personality: string;
    glowColor: string;
    apiKey: string;
}
export interface Message {
    id: bigint;
    content: string;
    role: string;
    timestamp: bigint;
}
export interface StreamChunk {
    id: bigint;
    content: string;
    chunkIndex: bigint;
    isFinal: boolean;
    timestamp: bigint;
}
export interface DetectionHistoryRecord {
    id: bigint;
    objects: Array<DetectionObject>;
    timestamp: bigint;
    cameraId: string;
}
export interface UserMetrics {
    userId: Principal;
    agentTaskCount: bigint;
    messageCount: bigint;
    lastActive: bigint;
    voiceCount: bigint;
}
export interface AdminLog {
    id: bigint;
    action: AdminAction;
    target: string;
    timestamp: bigint;
    adminId: Principal;
}
export enum AdminAction {
    updateTier = "updateTier",
    banUser = "banUser",
    uploadDoc = "uploadDoc",
    reindex = "reindex",
    deleteDoc = "deleteDoc"
}
export enum AgentStatus {
    idle = "idle",
    complete = "complete",
    failed = "failed",
    running = "running"
}
export enum AgentType {
    memory = "memory",
    research = "research",
    critic = "critic",
    planner = "planner",
    executor = "executor"
}
export enum DocumentType {
    pdf = "pdf",
    txt = "txt",
    url = "url",
    docx = "docx"
}
export enum DroneStatus {
    emergency = "emergency",
    idle = "idle",
    flying = "flying",
    landing = "landing"
}
export enum IndexStatus {
    pending = "pending",
    indexed = "indexed",
    failed = "failed"
}
export enum Language {
    hindi = "hindi",
    nagpuri = "nagpuri",
    english = "english"
}
export enum SubscriptionTier {
    pro = "pro",
    enterprise = "enterprise",
    free = "free"
}
export enum TransactionAction {
    buy = "buy",
    sell = "sell"
}
export enum UserRole {
    admin = "admin",
    user = "user"
}
export interface backendInterface {
    addGeofenceZone(zoneName: string, centerLat: number, centerLng: number, radius: number): Promise<bigint>;
    addMessage(role: string, content: string): Promise<Message>;
    adminLogin(username: string, password: string): Promise<LoginResult>;
    askDocumentQuestion(docId: bigint, question: string): Promise<string>;
    banUser(userId: Principal): Promise<boolean>;
    callLLM(messages: Array<ChatMessage>, apiKey: string, personality: string): Promise<string>;
    cancelSubscription(): Promise<void>;
    clearHistory(): Promise<void>;
    clearMyFaceData(): Promise<boolean>;
    createChain(goal: string): Promise<bigint>;
    createStreamSession(): Promise<StreamSession>;
    deleteDocument(docId: bigint): Promise<boolean>;
    deleteLegalDocument(docId: bigint): Promise<boolean>;
    deleteVoiceProfile(userId: string, profileId: string): Promise<boolean>;
    demoLogin(): Promise<LoginResult>;
    enrollFace(encoding: string): Promise<boolean>;
    enrollVoiceProfile(userId: string, name: string, relationship: string, mfccFeatures: Array<number>): Promise<VoiceProfile>;
    executeSimulatedTrade(userId: string, symbol: string, action: TransactionAction, quantity: bigint): Promise<Transaction>;
    exportAnalytics(): Promise<string>;
    exportDocumentSummary(docId: bigint, format: string): Promise<LegalExport>;
    extractDocumentClauses(docId: bigint): Promise<Array<LegalClause>>;
    getActiveStream(): Promise<StreamSession | null>;
    getAdminLogs(): Promise<Array<AdminLog>>;
    getAgentMetrics(): Promise<AgentMetrics>;
    getCallLogs(): Promise<Array<CallRecord>>;
    getCallRecord(id: bigint): Promise<CallRecord | null>;
    getCameraFeeds(): Promise<Array<CameraFeed>>;
    getChain(chainId: bigint): Promise<AgentChain | null>;
    getDetectionAlerts(): Promise<Array<DroneAlert>>;
    getDetectionHistory(): Promise<Array<DetectionHistoryRecord>>;
    getDrone(droneId: bigint): Promise<DroneState | null>;
    getGeneticProfile(userId: string): Promise<GeneticProfile>;
    getGeofenceAlerts(): Promise<Array<GeofenceAlert>>;
    getHistory(): Promise<Array<Message>>;
    getKnowledgeStats(): Promise<KnowledgeStats>;
    getLegalDocument(docId: bigint): Promise<LegalDocument | null>;
    getMRRTrend(months: bigint): Promise<Array<RevenueMetrics>>;
    getMqttDeviceHistory(deviceId: bigint): Promise<Array<MqttDeviceHistory>>;
    getMqttDevices(): Promise<Array<MqttDevice>>;
    getMyMetrics(): Promise<UserMetrics>;
    getPortfolio(userId: string): Promise<Portfolio>;
    getRevenueMetrics(month: string): Promise<RevenueMetrics>;
    getSettings(): Promise<Settings>;
    getStockHistory(symbol: string, days: bigint): Promise<Array<StockPrice>>;
    getStockPrice(symbol: string): Promise<StockPrice>;
    getStockSymbols(): Promise<Array<StockSymbol>>;
    getStreamSession(id: bigint): Promise<StreamSession | null>;
    getSubscriptionStatus(): Promise<SubscriptionStatus>;
    getSystemHealth(): Promise<{
        messagesCount: bigint;
        uptime: bigint;
        usersCount: bigint;
        agentTasksCount: bigint;
    }>;
    getSystemMetrics(): Promise<SystemMetrics>;
    getTrackingAsset(assetId: bigint): Promise<TrackingAsset | null>;
    getTransactionHistory(userId: string): Promise<Array<Transaction>>;
    getUserProfile(): Promise<UserProfile | null>;
    getUserRole(): Promise<UserRole | null>;
    getUserSubscription(): Promise<SubscriptionTier | null>;
    getVoiceSessions(): Promise<Array<VoiceSession>>;
    getVoiceSettings(): Promise<VoiceSettings>;
    hasFaceEnrolled(): Promise<boolean>;
    initCallModule(): Promise<boolean>;
    initDetectionModule(): Promise<boolean>;
    initMqttModule(): Promise<boolean>;
    listAllUsers(): Promise<Array<UserProfile>>;
    listChains(): Promise<Array<AgentChain>>;
    listDocuments(): Promise<Array<KnowledgeDocument>>;
    listDrones(): Promise<Array<DroneState>>;
    listEnrolledFaces(): Promise<Array<Principal>>;
    listGeofences(): Promise<Array<GeofenceZone>>;
    listIoTDevices(): Promise<Array<IoTDevice>>;
    listLegalDocuments(): Promise<Array<LegalDocument>>;
    listTrackingAssets(): Promise<Array<TrackingAsset>>;
    listVoiceProfiles(userId: string): Promise<Array<VoiceProfile>>;
    logVoiceSession(language: string, transcription: string, synthesis: string): Promise<bigint>;
    logout(): Promise<void>;
    makeCall(req: CallInitRequest): Promise<CallRecord>;
    matchVoiceProfile(userId: string, inputMfcc: Array<number>): Promise<VoiceMatch | null>;
    recordInteraction(userId: string, topicTags: Array<string>): Promise<void>;
    register(name: string, email: string): Promise<RegisterResult>;
    runChain(chainId: bigint): Promise<string>;
    runYoloDetection(req: YoloDetectionRequest): Promise<YoloDetectionResult>;
    saveSettings(personality: string, glowColor: string, apiKey: string): Promise<void>;
    saveVoiceSettings(settings: VoiceSettings): Promise<boolean>;
    searchKnowledge(searchQuery: string, topK: bigint): Promise<Array<KnowledgeResult>>;
    sendIoTCommand(deviceId: bigint, command: string, value: string): Promise<boolean>;
    sendMqttCommand(cmd: MqttCommand): Promise<MqttCommandResult>;
    setDroneCommand(droneId: bigint, command: string): Promise<boolean>;
    simulateMovement(): Promise<boolean>;
    summarizeLegalDocument(docId: bigint): Promise<string>;
    trackEvent(eventType: string, metadata: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    translateForLanguage(text: string, language: string): Promise<string>;
    triggerReindex(): Promise<boolean>;
    triggerSimulation(): Promise<boolean>;
    twilioTransform(input: TransformationInput): Promise<TransformationOutput>;
    updateAgentStep(sessionId: bigint, step: AgentStreamStep): Promise<boolean>;
    updateGeneticPreference(userId: string, key: string, value: string, weight: number): Promise<void>;
    updateStreamChunk(sessionId: bigint, chunk: StreamChunk): Promise<boolean>;
    updateSubscription(tier: SubscriptionTier): Promise<void>;
    updateUserTier(userId: Principal, tier: string): Promise<boolean>;
    upgradeSubscription(tier: SubscriptionTier): Promise<boolean>;
    uploadDocument(title: string, docType: string, content: string): Promise<bigint>;
    uploadLegalDocument(title: string, content: string): Promise<bigint>;
    verifyFaceLogin(encoding: string): Promise<[boolean, Principal | null]>;
}
