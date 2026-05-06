import { 
  AdminAction,
  AgentStatus,
  AgentType,
  DocumentType,
  DroneStatus,
  IndexStatus,
  Language,
  SubscriptionTier,
  TransactionAction,
  UserRole,
 } from "../backend";
import type { DetectionHistoryRecord, DetectionObject, YoloDetectionResult, backendInterface } from "../backend";

// ─── Counters ─────────────────────────────────────────────────────────────────

let messageIdCounter = BigInt(2);
let docIdCounter = BigInt(10);
let chainIdCounter = BigInt(1);
let legalDocIdCounter = BigInt(5);

// ─── Demo Users ───────────────────────────────────────────────────────────────

const mockAdminProfile = {
  id: { toText: () => "admin-principal-001" } as unknown as ReturnType<
    typeof import("@icp-sdk/core/principal").Principal.fromText
  >,
  name: "Admin",
  email: "admin@aria.ai",
  role: UserRole.admin,
  tier: SubscriptionTier.enterprise,
  createdAt: BigInt(Date.now() - 86400000 * 30),
};

const mockDemoProfile = {
  id: { toText: () => "demo-principal-002" } as unknown as ReturnType<
    typeof import("@icp-sdk/core/principal").Principal.fromText
  >,
  name: "Demo User",
  email: "demo@priya.ai",
  role: UserRole.user,
  tier: SubscriptionTier.pro,
  createdAt: BigInt(Date.now() - 86400000 * 7),
};

let currentUser: typeof mockAdminProfile | typeof mockDemoProfile | null = null;
let currentTier: SubscriptionTier = SubscriptionTier.free;

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockAgentChains = [
  {
    id: BigInt(1),
    goal: "Research and summarize the latest advancements in AI language models",
    status: AgentStatus.complete,
    currentStep: BigInt(5),
    tasks: [
      { id: BigInt(1), agentType: AgentType.planner, input: "Plan research strategy", output: "Breaking into 5 sub-tasks", status: AgentStatus.complete, timestamp: BigInt(Date.now() - 300000) },
      { id: BigInt(2), agentType: AgentType.research, input: "Search for recent AI papers", output: "Found 12 relevant papers on GPT-4, Claude 3, Gemini Ultra", status: AgentStatus.complete, timestamp: BigInt(Date.now() - 240000) },
      { id: BigInt(3), agentType: AgentType.executor, input: "Extract key insights", output: "Extracted 8 key findings about transformer architectures", status: AgentStatus.complete, timestamp: BigInt(Date.now() - 180000) },
      { id: BigInt(4), agentType: AgentType.memory, input: "Store findings in long-term memory", output: "Saved 8 knowledge chunks to vector DB", status: AgentStatus.complete, timestamp: BigInt(Date.now() - 120000) },
      { id: BigInt(5), agentType: AgentType.critic, input: "Validate output quality", output: "Quality score: 94/100 — Output approved", status: AgentStatus.complete, timestamp: BigInt(Date.now() - 60000) },
    ],
  },
  {
    id: BigInt(2),
    goal: "Analyze legal contract for potential risks and compliance issues",
    status: AgentStatus.running,
    currentStep: BigInt(2),
    tasks: [
      { id: BigInt(6), agentType: AgentType.planner, input: "Define analysis scope", output: "Identified 6 risk categories to check", status: AgentStatus.complete, timestamp: BigInt(Date.now() - 60000) },
      { id: BigInt(7), agentType: AgentType.executor, input: "Extract contract clauses", output: undefined, status: AgentStatus.running, timestamp: BigInt(Date.now() - 10000) },
    ],
  },
  {
    id: BigInt(3),
    goal: "Monitor live drone feeds and detect anomalies in sector 7",
    status: AgentStatus.idle,
    currentStep: BigInt(0),
    tasks: [],
  },
];

const mockKnowledgeDocs = [
  {
    id: BigInt(1),
    title: "PRIYA AI System Architecture",
    docType: DocumentType.pdf,
    content: "Comprehensive overview of the PRIYA AI OMNIVERSE GOD+ Level system architecture including multi-agent systems, neural networks, and deployment strategies.",
    uploadedAt: BigInt(Date.now() - 86400000 * 5),
    indexStatus: IndexStatus.indexed,
    userId: mockDemoProfile.id,
    chunks: [
      { id: BigInt(1), chunkIndex: BigInt(0), text: "PRIYA AI uses a transformer-based architecture with 175B parameters", embeddingVector: [], similarity: 0.95, docId: BigInt(1) },
      { id: BigInt(2), chunkIndex: BigInt(1), text: "Multi-agent orchestration enables parallel task execution", embeddingVector: [], similarity: 0.88, docId: BigInt(1) },
    ],
  },
  {
    id: BigInt(2),
    title: "Voice Synthesis Technical Guide",
    docType: DocumentType.docx,
    content: "Technical documentation for ElevenLabs and Web Speech API integration for multilingual voice synthesis in English, Hindi, and Nagpuri.",
    uploadedAt: BigInt(Date.now() - 86400000 * 3),
    indexStatus: IndexStatus.indexed,
    userId: mockDemoProfile.id,
    chunks: [
      { id: BigInt(3), chunkIndex: BigInt(0), text: "ElevenLabs API provides ultra-realistic voice synthesis with SSML support", embeddingVector: [], similarity: 0.92, docId: BigInt(2) },
    ],
  },
  {
    id: BigInt(3),
    title: "Drone Surveillance Operations Manual",
    docType: DocumentType.pdf,
    content: "Operational guidelines for autonomous drone surveillance, YOLO object detection integration, and emergency response protocols.",
    uploadedAt: BigInt(Date.now() - 86400000),
    indexStatus: IndexStatus.pending,
    userId: mockDemoProfile.id,
    chunks: [],
  },
  {
    id: BigInt(4),
    title: "Legal AI Contract Analysis Framework",
    docType: DocumentType.txt,
    content: "Framework for automated legal document analysis using RAG, including clause extraction, risk scoring, and compliance checking.",
    uploadedAt: BigInt(Date.now() - 3600000),
    indexStatus: IndexStatus.indexed,
    userId: mockDemoProfile.id,
    chunks: [
      { id: BigInt(4), chunkIndex: BigInt(0), text: "RAG-based legal analysis achieves 91% accuracy on standard contracts", embeddingVector: [], similarity: 0.89, docId: BigInt(4) },
    ],
  },
];

const mockDrones = [
  { id: BigInt(1), lat: 28.6139, lng: 77.2090, altitude: 120, speed: 45, battery: BigInt(78), status: DroneStatus.flying, timestamp: BigInt(Date.now()) },
  { id: BigInt(2), lat: 19.0760, lng: 72.8777, altitude: 85, speed: 30, battery: BigInt(45), status: DroneStatus.flying, timestamp: BigInt(Date.now()) },
  { id: BigInt(3), lat: 12.9716, lng: 77.5946, altitude: 0, speed: 0, battery: BigInt(95), status: DroneStatus.idle, timestamp: BigInt(Date.now()) },
];

const mockCameraFeeds = [
  { id: BigInt(1), name: "Gate Camera Alpha", isActive: true, streamUrl: "rtsp://camera1.local/stream" },
  { id: BigInt(2), name: "Perimeter View Beta", isActive: true, streamUrl: "rtsp://camera2.local/stream" },
  { id: BigInt(3), name: "Roof Cam Delta", isActive: false, streamUrl: "rtsp://camera3.local/stream" },
];

const mockDroneAlerts = [
  { id: BigInt(1), droneId: BigInt(1), alertType: "motion_detected", description: "Unidentified vehicle detected in restricted zone A7", timestamp: BigInt(Date.now() - 180000) },
  { id: BigInt(2), droneId: BigInt(2), alertType: "low_battery", description: "Battery below 50% — consider returning to base", timestamp: BigInt(Date.now() - 90000) },
  { id: BigInt(3), droneId: BigInt(1), alertType: "perimeter_breach", description: "Person crossing north boundary at coordinates 28.6142, 77.2095", timestamp: BigInt(Date.now() - 30000) },
];

const mockLegalDocs = [
  {
    id: BigInt(1),
    title: "Software License Agreement — ARIA Platform v3.0",
    content: "This Software License Agreement ('Agreement') is entered into as of the Effective Date between ARIA Technologies Pvt. Ltd. ('Licensor') and the end user ('Licensee'). The Licensor hereby grants the Licensee a non-exclusive, non-transferable license to use the ARIA AI Platform software...",
    userId: mockDemoProfile.id,
    summary: "Standard SaaS license agreement. Key risks: auto-renewal clause (Section 8.3), data processing limitations (Section 12), and liability cap of 3 months fees (Section 15).",
    uploadedAt: BigInt(Date.now() - 86400000 * 2),
    clauses: [
      { id: BigInt(1), clauseType: "liability", startPos: BigInt(450), endPos: BigInt(600), text: "Licensor's total liability shall not exceed three (3) months of subscription fees paid by Licensee.", docId: BigInt(1) },
      { id: BigInt(2), clauseType: "termination", startPos: BigInt(700), endPos: BigInt(850), text: "Either party may terminate this Agreement with 30 days written notice.", docId: BigInt(1) },
      { id: BigInt(3), clauseType: "data_processing", startPos: BigInt(900), endPos: BigInt(1100), text: "Licensee grants Licensor permission to process anonymized usage data for service improvement.", docId: BigInt(1) },
    ],
  },
  {
    id: BigInt(2),
    title: "Non-Disclosure Agreement — Project Omniverse",
    content: "This NDA is between ARIA Technologies and Jharkhand Rai University regarding Project Omniverse research collaboration...",
    userId: mockDemoProfile.id,
    summary: undefined,
    uploadedAt: BigInt(Date.now() - 3600000),
    clauses: [],
  },
];

const mockTrackingAssets = [
  { id: BigInt(1), name: "Security Vehicle Alpha", lat: 28.6139, lng: 77.2090, speed: 35, heading: 90, status: "active", battery: BigInt(82), timestamp: BigInt(Date.now()) },
  { id: BigInt(2), name: "Patrol Unit Beta", lat: 19.0760, lng: 72.8777, speed: 0, heading: 180, status: "idle", battery: BigInt(65), timestamp: BigInt(Date.now()) },
  { id: BigInt(3), name: "Emergency Response Unit", lat: 12.9716, lng: 77.5946, speed: 75, heading: 45, status: "active", battery: undefined, timestamp: BigInt(Date.now()) },
  { id: BigInt(4), name: "Logistics Truck Delta", lat: 22.5726, lng: 88.3639, speed: 55, heading: 270, status: "active", battery: undefined, timestamp: BigInt(Date.now()) },
];

const mockGeofences = [
  { id: BigInt(1), name: "HQ Perimeter", centerLat: 28.6139, centerLng: 77.2090, radius: 500, isActive: true },
  { id: BigInt(2), name: "Server Farm Zone", centerLat: 19.0760, centerLng: 72.8777, radius: 200, isActive: true },
  { id: BigInt(3), name: "Restricted Research Area", centerLat: 12.9716, centerLng: 77.5946, radius: 100, isActive: false },
];

const mockIoTDevices = [
  { id: BigInt(1), name: "Main Entrance Lock", deviceType: "lock", state: "locked", isOnline: true, lastSeen: BigInt(Date.now() - 5000) },
  { id: BigInt(2), name: "Server Room Temp Sensor", deviceType: "sensor", state: "21.5°C", isOnline: true, lastSeen: BigInt(Date.now() - 10000) },
  { id: BigInt(3), name: "Perimeter Lights", deviceType: "light", state: "on", isOnline: true, lastSeen: BigInt(Date.now() - 2000) },
  { id: BigInt(4), name: "HVAC Controller", deviceType: "hvac", state: "cooling", isOnline: false, lastSeen: BigInt(Date.now() - 600000) },
  { id: BigInt(5), name: "Backup Generator", deviceType: "power", state: "standby", isOnline: true, lastSeen: BigInt(Date.now() - 1000) },
];

const mockAdminUsers = [
  mockAdminProfile,
  mockDemoProfile,
  {
    id: { toText: () => "user-principal-003" } as unknown as ReturnType<typeof import("@icp-sdk/core/principal").Principal.fromText>,
    name: "Priya Test",
    email: "priya.test@aria.ai",
    role: UserRole.user,
    tier: SubscriptionTier.pro,
    createdAt: BigInt(Date.now() - 86400000 * 14),
  },
  {
    id: { toText: () => "user-principal-004" } as unknown as ReturnType<typeof import("@icp-sdk/core/principal").Principal.fromText>,
    name: "Rajesh Kumar",
    email: "rajesh.k@aria.ai",
    role: UserRole.user,
    tier: SubscriptionTier.free,
    createdAt: BigInt(Date.now() - 86400000 * 3),
  },
];

const mockAdminLogs = [
  { id: BigInt(1), action: AdminAction.uploadDoc, target: "PRIYA Architecture PDF", timestamp: BigInt(Date.now() - 86400000), adminId: mockAdminProfile.id },
  { id: BigInt(2), action: AdminAction.reindex, target: "All Knowledge Documents", timestamp: BigInt(Date.now() - 43200000), adminId: mockAdminProfile.id },
  { id: BigInt(3), action: AdminAction.updateTier, target: "demo-principal-002 → PRO", timestamp: BigInt(Date.now() - 3600000), adminId: mockAdminProfile.id },
  { id: BigInt(4), action: AdminAction.banUser, target: "spam-principal-999", timestamp: BigInt(Date.now() - 1800000), adminId: mockAdminProfile.id },
];

let mockVoiceSettings = {
  language: Language.english,
  autoPlay: true,
  continuousMode: false,
  speed: 1.0,
  pitch: 1.0,
};

const enrolledFaces: string[] = [];

let detectionIdCounter = BigInt(100);
let historyIdCounter = BigInt(50);

const YOLO_CLASS_DEFS: Array<{
  name: string;
  minConf: number;
  maxConf: number;
  highAlert: boolean;
}> = [
  { name: "person", minConf: 0.82, maxConf: 0.98, highAlert: false },
  { name: "car", minConf: 0.75, maxConf: 0.95, highAlert: false },
  { name: "truck", minConf: 0.70, maxConf: 0.92, highAlert: true },
  { name: "motorcycle", minConf: 0.68, maxConf: 0.90, highAlert: false },
  { name: "bus", minConf: 0.72, maxConf: 0.93, highAlert: false },
  { name: "bicycle", minConf: 0.65, maxConf: 0.88, highAlert: false },
  { name: "backpack", minConf: 0.60, maxConf: 0.85, highAlert: false },
  { name: "knife", minConf: 0.55, maxConf: 0.88, highAlert: true },
];

const CAMERA_IDS = ["camera-alpha", "camera-beta", "camera-delta"] as const;

function generateDetectionObjects(count: number): DetectionObject[] {
  return Array.from<unknown, DetectionObject>({ length: count }, (_, i) => {
    const def = YOLO_CLASS_DEFS[Math.floor(Math.random() * YOLO_CLASS_DEFS.length)];
    const rawConf = def.minConf + Math.random() * (def.maxConf - def.minConf);
    return {
      highAlert: def.highAlert || rawConf > 0.92,
      name: def.name,
      confidence: Math.round(rawConf * 1000) / 1000,
      bbox: {
        x: Math.round(8 + Math.random() * 65),
        y: Math.round(8 + Math.random() * 60),
        width: Math.round(10 + Math.random() * 20),
        height: Math.round(12 + Math.random() * 22),
      },
    };
  });
}

const mockDetectionHistory: DetectionHistoryRecord[] = Array.from<unknown, DetectionHistoryRecord>(
  { length: 8 },
  (_, i) => ({
    id: BigInt(i + 1),
    cameraId: CAMERA_IDS[i % 3],
    objects: generateDetectionObjects(1 + Math.floor(Math.random() * 3)),
    timestamp: BigInt(Date.now() - (8 - i) * 12000),
  }),
);

let detectionModuleInitialized = false;

// ─── Mock Backend Implementation ──────────────────────────────────────────────

export const mockBackend: backendInterface = {
  // ─── Chat ───────────────────────────────────────────────────────────────────
  addMessage: async (role: string, content: string) => ({
    id: ++messageIdCounter,
    content,
    role,
    timestamp: BigInt(Date.now()),
  }),

  callLLM: async (_messages, _apiKey, personality) => {
    const responses: Record<string, string> = {
      professional: "I am Priya, your advanced AI assistant. How may I assist you today?",
      friendly: "Hey there! I'm Priya and I'm so excited to chat with you! What's on your mind?",
      mysterious: "I sense you have questions... The answers lie within, waiting to be discovered.",
    };
    return responses[personality] ?? "Hello. I am Priya. How can I help you?";
  },

  clearHistory: async () => undefined,

  getHistory: async () => [
    { id: BigInt(1), content: "Hello! I am Priya, your AI assistant. How can I help you today?", role: "assistant", timestamp: BigInt(Date.now() - 60000) },
    { id: BigInt(2), content: "What can you do?", role: "user", timestamp: BigInt(Date.now() - 30000) },
  ],

  getSettings: async () => ({ personality: "friendly", glowColor: "#00d9ff", apiKey: "" }),

  saveSettings: async () => undefined,

  transform: async (input) => ({ status: BigInt(200), body: input.response.body, headers: [] }),

  // ─── Auth ───────────────────────────────────────────────────────────────────
  adminLogin: async (username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      currentUser = mockAdminProfile;
      currentTier = SubscriptionTier.enterprise;
      return { __kind__: "ok" as const, ok: mockAdminProfile };
    }
    return { __kind__: "err" as const, err: "Invalid credentials" };
  },

  demoLogin: async () => {
    currentUser = mockDemoProfile;
    currentTier = SubscriptionTier.pro;
    return { __kind__: "ok" as const, ok: mockDemoProfile };
  },

  register: async (name: string, email: string) => {
    const newUser = {
      id: { toText: () => `user-${Date.now()}` } as unknown as ReturnType<typeof import("@icp-sdk/core/principal").Principal.fromText>,
      name,
      email,
      role: UserRole.user,
      tier: SubscriptionTier.free,
      createdAt: BigInt(Date.now()),
    };
    currentUser = newUser;
    currentTier = SubscriptionTier.free;
    return { __kind__: "ok" as const, ok: newUser };
  },

  logout: async () => {
    currentUser = null;
    currentTier = SubscriptionTier.free;
  },

  getUserProfile: async () => currentUser,
  getUserRole: async () => (currentUser ? currentUser.role : null),
  getUserSubscription: async () => (currentUser ? currentTier : null),

  // ─── Subscription ───────────────────────────────────────────────────────────
  getSubscriptionStatus: async () => ({
    active: currentTier !== SubscriptionTier.free,
    tier: currentTier,
    startDate: BigInt(Date.now() - 86400000 * 7),
  }),

  upgradeSubscription: async (tier: SubscriptionTier) => {
    if (!currentUser) return false;
    currentTier = tier;
    if (currentUser) currentUser = { ...currentUser, tier };
    return true;
  },

  updateSubscription: async (tier) => {
    currentTier = tier as unknown as SubscriptionTier;
  },

  cancelSubscription: async () => {
    currentTier = SubscriptionTier.free;
    if (currentUser) currentUser = { ...currentUser, tier: SubscriptionTier.free };
  },

  // ─── Agents ─────────────────────────────────────────────────────────────────
  createChain: async (goal: string) => {
    const newId = ++chainIdCounter;
    mockAgentChains.push({
      id: newId,
      goal,
      status: AgentStatus.idle,
      currentStep: BigInt(0),
      tasks: [],
    });
    return newId;
  },

  runChain: async (chainId: bigint) => {
    const chain = mockAgentChains.find((c) => c.id === chainId);
    if (!chain) return "Chain not found";
    chain.status = AgentStatus.running;
    // Simulate completion after a delay
    setTimeout(() => {
      chain.status = AgentStatus.complete;
    }, 3000);
    return `Chain ${chainId} started successfully`;
  },

  getChain: async (chainId: bigint) => {
    return mockAgentChains.find((c) => c.id === chainId) ?? null;
  },

  listChains: async () => mockAgentChains,

  getAgentMetrics: async () => ({
    totalTasks: BigInt(47),
    completedTasks: BigInt(44),
    failedTasks: BigInt(3),
    avgDuration: BigInt(12500),
  }),

  // ─── Knowledge ──────────────────────────────────────────────────────────────
  uploadDocument: async (title: string, docType: string, content: string) => {
    const newId = ++docIdCounter;
    mockKnowledgeDocs.push({
      id: newId,
      title,
      docType: docType as DocumentType,
      content,
      uploadedAt: BigInt(Date.now()),
      indexStatus: IndexStatus.pending,
      userId: currentUser?.id ?? mockDemoProfile.id,
      chunks: [],
    });
    setTimeout(() => {
      const doc = mockKnowledgeDocs.find((d) => d.id === newId);
      if (doc) doc.indexStatus = IndexStatus.indexed;
    }, 2000);
    return newId;
  },

  listDocuments: async () => mockKnowledgeDocs,

  deleteDocument: async (docId: bigint) => {
    const idx = mockKnowledgeDocs.findIndex((d) => d.id === docId);
    if (idx >= 0) { mockKnowledgeDocs.splice(idx, 1); return true; }
    return false;
  },

  searchKnowledge: async (searchQuery: string, topK: bigint) => {
    const results = mockKnowledgeDocs
      .flatMap((doc) => doc.chunks.map((chunk) => ({ chunk, score: chunk.similarity })))
      .filter((r) => r.chunk.text.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, Number(topK));
    return results;
  },

  getKnowledgeStats: async () => ({
    totalDocuments: BigInt(mockKnowledgeDocs.length),
    indexedDocs: BigInt(mockKnowledgeDocs.filter((d) => d.indexStatus === IndexStatus.indexed).length),
    totalChunks: BigInt(mockKnowledgeDocs.reduce((acc, d) => acc + d.chunks.length, 0)),
  }),

  // ─── Voice ──────────────────────────────────────────────────────────────────
  getVoiceSettings: async () => mockVoiceSettings,

  saveVoiceSettings: async (settings) => {
    mockVoiceSettings = { ...settings };
    return true;
  },

  logVoiceSession: async (_language, _transcription, _synthesis) => {
    return BigInt(Date.now());
  },

  getVoiceSessions: async () => [
    { id: BigInt(1), userId: mockDemoProfile.id, language: Language.english, transcription: "Tell me about yourself", synthesis: "I am Priya, your AI assistant", timestamp: BigInt(Date.now() - 3600000) },
    { id: BigInt(2), userId: mockDemoProfile.id, language: Language.hindi, transcription: "आप कैसे हैं", synthesis: "मैं ठीक हूं, धन्यवाद", timestamp: BigInt(Date.now() - 1800000) },
  ],

  translateForLanguage: async (text: string, language: string) => {
    if (language === "hindi") {
      const translations: Record<string, string> = {
        "Hello": "नमस्ते",
        "How are you": "आप कैसे हैं",
        "I am Priya": "मैं प्रिया हूं",
      };
      return translations[text] ?? `${text} [हिन्दी]`;
    }
    if (language === "nagpuri") {
      return `${text} [नागपुरी में]`;
    }
    return text;
  },

  // ─── Drone ──────────────────────────────────────────────────────────────────
  listDrones: async () => mockDrones,

  getDrone: async (droneId: bigint) => mockDrones.find((d) => d.id === droneId) ?? null,

  setDroneCommand: async (droneId: bigint, command: string) => {
    const drone = mockDrones.find((d) => d.id === droneId);
    if (!drone) return false;
    if (command === "land") drone.status = DroneStatus.landing;
    if (command === "takeoff") drone.status = DroneStatus.flying;
    if (command === "idle") drone.status = DroneStatus.idle;
    return true;
  },

  getDetectionAlerts: async () => mockDroneAlerts,

  getCameraFeeds: async () => mockCameraFeeds,

  triggerSimulation: async () => {
    mockDrones.forEach((drone) => {
      if (drone.status === DroneStatus.flying) {
        drone.lat += (Math.random() - 0.5) * 0.01;
        drone.lng += (Math.random() - 0.5) * 0.01;
        drone.battery = BigInt(Math.max(0, Number(drone.battery) - 1));
      }
    });
    return true;
  },

  // ─── Legal ──────────────────────────────────────────────────────────────────
  uploadLegalDocument: async (title: string, content: string) => {
    const newId = ++legalDocIdCounter;
    mockLegalDocs.push({
      id: newId,
      title,
      content,
      userId: currentUser?.id ?? mockDemoProfile.id,
      summary: undefined,
      uploadedAt: BigInt(Date.now()),
      clauses: [],
    });
    return newId;
  },

  listLegalDocuments: async () => mockLegalDocs,

  getLegalDocument: async (docId: bigint) => mockLegalDocs.find((d) => d.id === docId) ?? null,

  deleteLegalDocument: async (docId: bigint) => {
    const idx = mockLegalDocs.findIndex((d) => d.id === docId);
    if (idx >= 0) { mockLegalDocs.splice(idx, 1); return true; }
    return false;
  },

  summarizeLegalDocument: async (docId: bigint) => {
    const doc = mockLegalDocs.find((d) => d.id === docId);
    if (!doc) return "Document not found";
    const summary = `AI Summary: This document contains ${doc.clauses.length} clauses. Key provisions include liability limitations, termination rights, and data processing terms. Risk level: MEDIUM. Recommended review: Sections 8, 12, and 15.`;
    doc.summary = summary;
    return summary;
  },

  extractDocumentClauses: async (docId: bigint) => {
    const doc = mockLegalDocs.find((d) => d.id === docId);
    if (!doc) return [];
    if (doc.clauses.length === 0) {
      doc.clauses = [
        { id: BigInt(Date.now()), clauseType: "indemnity", startPos: BigInt(100), endPos: BigInt(250), text: "Each party shall indemnify and hold harmless the other party from claims arising from its breach.", docId },
        { id: BigInt(Date.now() + 1), clauseType: "confidentiality", startPos: BigInt(300), endPos: BigInt(450), text: "All proprietary information shared under this agreement shall remain strictly confidential.", docId },
      ];
    }
    return doc.clauses;
  },

  askDocumentQuestion: async (docId: bigint, question: string) => {
    const doc = mockLegalDocs.find((d) => d.id === docId);
    if (!doc) return "Document not found";
    return `Based on "${doc.title}": Regarding "${question}" — The document specifies standard terms. Please consult a legal professional for binding interpretation. [AI Analysis: 87% confidence]`;
  },

  exportDocumentSummary: async (docId: bigint, format: string) => ({
    docId,
    format,
    content: `# Document Export\n\nFormat: ${format}\nGenerated: ${new Date().toISOString()}\n\nSummary available for professional review.`,
  }),

  // ─── Tracking ───────────────────────────────────────────────────────────────
  listTrackingAssets: async () => mockTrackingAssets,

  getTrackingAsset: async (assetId: bigint) => mockTrackingAssets.find((a) => a.id === assetId) ?? null,

  listGeofences: async () => mockGeofences,

  getGeofenceAlerts: async () => [
    { id: BigInt(1), assetId: BigInt(1), zoneId: BigInt(1), alertType: "entry", timestamp: BigInt(Date.now() - 120000) },
    { id: BigInt(2), assetId: BigInt(3), zoneId: BigInt(2), alertType: "exit", timestamp: BigInt(Date.now() - 30000) },
  ],

  addGeofenceZone: async (_zoneName, _centerLat, _centerLng, _radius) => {
    return BigInt(mockGeofences.length + 1);
  },

  listIoTDevices: async () => mockIoTDevices,

  sendIoTCommand: async (deviceId: bigint, _command: string, value: string) => {
    const device = mockIoTDevices.find((d) => d.id === deviceId);
    if (!device) return false;
    device.state = value;
    device.lastSeen = BigInt(Date.now());
    return true;
  },

  simulateMovement: async () => {
    mockTrackingAssets.forEach((asset) => {
      if (asset.status === "active") {
        asset.lat += (Math.random() - 0.5) * 0.005;
        asset.lng += (Math.random() - 0.5) * 0.005;
      }
    });
    return true;
  },

  // ─── Analytics ──────────────────────────────────────────────────────────────
  trackEvent: async (_eventType: string, _metadata: string) => undefined,

  getMyMetrics: async () => ({
    userId: currentUser?.id ?? mockDemoProfile.id,
    messageCount: BigInt(247),
    voiceCount: BigInt(89),
    agentTaskCount: BigInt(34),
    lastActive: BigInt(Date.now()),
  }),

  getSystemMetrics: async () => ({
    totalUsers: BigInt(1247),
    activeUsers: BigInt(389),
    totalMessages: BigInt(58420),
    totalVoiceCalls: BigInt(12750),
    totalAgentTasks: BigInt(5390),
    mrr: 17503.0,
  }),

  getRevenueMetrics: async (month: string) => ({
    month,
    mrr: 17503.0,
    arpu: 14.03,
    churnRate: 2.1,
    tierBreakdown: { free: BigInt(847), pro: BigInt(350), enterprise: BigInt(50) },
  }),

  getMRRTrend: async (months: bigint) => {
    const trend: Array<{ month: string; mrr: number; arpu: number; churnRate: number; tierBreakdown: { free: bigint; pro: bigint; enterprise: bigint } }> = [];
    const now = new Date();
    for (let i = Number(months) - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      trend.push({
        month,
        mrr: 12000 + Math.random() * 6000,
        arpu: 12 + Math.random() * 4,
        churnRate: 1.5 + Math.random() * 2,
        tierBreakdown: { free: BigInt(700 + Math.floor(Math.random() * 200)), pro: BigInt(250 + Math.floor(Math.random() * 150)), enterprise: BigInt(40 + Math.floor(Math.random() * 20)) },
      });
    }
    return trend;
  },

  exportAnalytics: async () => JSON.stringify({ exported: true, timestamp: new Date().toISOString(), metrics: "see dashboard" }),

  // ─── Admin ──────────────────────────────────────────────────────────────────
  listAllUsers: async () => mockAdminUsers,

  banUser: async (_userId) => true,

  updateUserTier: async (_userId, _tier) => true,

  getAdminLogs: async () => mockAdminLogs,

  getSystemHealth: async () => ({
    uptime: BigInt(Date.now() - 86400000 * 14),
    usersCount: BigInt(mockAdminUsers.length),
    messagesCount: BigInt(58420),
    agentTasksCount: BigInt(5390),
  }),

  triggerReindex: async () => {
    mockKnowledgeDocs.forEach((doc) => {
      doc.indexStatus = IndexStatus.indexed;
    });
    return true;
  },

  // ─── Face Recognition ───────────────────────────────────────────────────────
  enrollFace: async (encoding: string) => {
    if (!enrolledFaces.includes(encoding)) enrolledFaces.push(encoding);
    return true;
  },

  verifyFaceLogin: async (encoding: string) => {
    const found = enrolledFaces.includes(encoding) || enrolledFaces.length > 0;
    return [found, found ? mockDemoProfile.id : null] as [boolean, typeof mockDemoProfile.id | null];
  },

  hasFaceEnrolled: async () => enrolledFaces.length > 0,

  clearMyFaceData: async () => {
    enrolledFaces.length = 0;
    return true;
  },

  listEnrolledFaces: async () => (enrolledFaces.length > 0 ? [mockDemoProfile.id] : []),

  // ─── YOLO / Detection ───────────────────────────────────────────────────────
  runYoloDetection: async (req): Promise<YoloDetectionResult> => {
    const objects = generateDetectionObjects(1 + Math.floor(Math.random() * 4));
    const overallConf = objects.reduce((sum, o) => sum + o.confidence, 0) / objects.length;
    const record: DetectionHistoryRecord = {
      id: ++historyIdCounter,
      cameraId: req.cameraId,
      objects,
      timestamp: BigInt(Date.now()),
    };
    mockDetectionHistory.unshift(record);
    if (mockDetectionHistory.length > 30) mockDetectionHistory.pop();
    detectionIdCounter = ++detectionIdCounter;
    return {
      objects,
      timestamp: record.timestamp,
      cameraId: req.cameraId,
      confidence: Math.round(overallConf * 1000) / 1000,
    };
  },

  getDetectionHistory: async (): Promise<DetectionHistoryRecord[]> => {
    return mockDetectionHistory.slice(0, 10);
  },

  initDetectionModule: async (): Promise<boolean> => {
    if (!detectionModuleInitialized) {
      detectionModuleInitialized = true;
      // Seed additional history on first init
      const seed: DetectionHistoryRecord[] = Array.from<unknown, DetectionHistoryRecord>(
        { length: 4 },
        (_, i) => ({
          id: ++historyIdCounter,
          cameraId: CAMERA_IDS[i % 3],
          objects: generateDetectionObjects(2 + Math.floor(Math.random() * 2)),
          timestamp: BigInt(Date.now() - i * 5000),
        }),
      );
      mockDetectionHistory.unshift(...seed);
    }
    return true;
  },

  // ─── Call / Twilio (stubs) ───────────────────────────────────────────────────
  initCallModule: async () => true,

  makeCall: async (req) => ({
    id: BigInt(Date.now()),
    callSid: `CA${Math.random().toString(36).slice(2, 18).toUpperCase()}`,
    callerPhone: req.toPhone,
    status: "initiated",
    duration: BigInt(0),
    transcript: req.message,
    timestamp: BigInt(Date.now()),
  }),

  getCallLogs: async () => [
    { id: BigInt(1), callSid: "CA1A2B3C4D5E6F7G8H", callerPhone: "+91-9876543210", status: "completed", duration: BigInt(127), transcript: "Demo call — AI successfully responded to inquiry", timestamp: BigInt(Date.now() - 3600000) },
    { id: BigInt(2), callSid: "CA9H8G7F6E5D4C3B2A", callerPhone: "+91-8765432109", status: "completed", duration: BigInt(45), transcript: "Automated status update delivered", timestamp: BigInt(Date.now() - 7200000) },
  ],

  getCallRecord: async (id) => {
    const logs = [
      { id: BigInt(1), callSid: "CA1A2B3C4D5E6F7G8H", callerPhone: "+91-9876543210", status: "completed", duration: BigInt(127), transcript: "Demo call transcript", timestamp: BigInt(Date.now() - 3600000) },
    ];
    return logs.find((l) => l.id === id) ?? null;
  },

  twilioTransform: async (input) => ({ status: BigInt(200), body: input.response.body, headers: [] }),

  // ─── MQTT (stubs) ────────────────────────────────────────────────────────────
  initMqttModule: async () => true,

  getMqttDevices: async () => [
    { id: BigInt(1), topic: "sensors/temp/1", deviceType: "sensor", state: "active", value: 23.4, isOnline: true, lastUpdate: BigInt(Date.now() - 5000) },
    { id: BigInt(2), topic: "actuators/lock/1", deviceType: "lock", state: "locked", value: 0, isOnline: true, lastUpdate: BigInt(Date.now() - 2000) },
  ],

  getMqttDeviceHistory: async (deviceId) => [
    { deviceId, value: 22.1, state: "active", timestamp: BigInt(Date.now() - 60000) },
    { deviceId, value: 23.4, state: "active", timestamp: BigInt(Date.now() - 30000) },
  ],

  sendMqttCommand: async (cmd) => ({
    deviceId: BigInt(1),
    newState: cmd.action,
    success: true,
    timestamp: BigInt(Date.now()),
  }),

  // ─── Stream ──────────────────────────────────────────────────────────────────
  createStreamSession: async () => {
    const session: import("../backend").StreamSession = {
      id: BigInt(Date.now()),
      userId: mockDemoProfile.id,
      chunks: [] as import("../backend").StreamChunk[],
      agentSteps: [] as import("../backend").AgentStreamStep[],
      status: "idle",
      createdAt: BigInt(Date.now()),
    };
    return session;
  },

  getActiveStream: async () => null,

  getStreamSession: async (id: bigint) => {
    const demo: import("../backend").StreamSession = {
      id,
      userId: mockDemoProfile.id,
      chunks: [
        { id: BigInt(1), content: "Analyzing your request", chunkIndex: BigInt(0), isFinal: false, timestamp: BigInt(Date.now() - 3000) },
        { id: BigInt(2), content: " and gathering context", chunkIndex: BigInt(1), isFinal: false, timestamp: BigInt(Date.now() - 2000) },
        { id: BigInt(3), content: ". Response ready.", chunkIndex: BigInt(2), isFinal: true, timestamp: BigInt(Date.now() - 1000) },
      ] as import("../backend").StreamChunk[],
      agentSteps: [
        { agentType: "planner", status: "complete", output: "Task decomposed into 3 steps", startedAt: BigInt(Date.now() - 4000), completedAt: BigInt(Date.now() - 3500) },
        { agentType: "research", status: "complete", output: "Retrieved 4 relevant knowledge chunks", startedAt: BigInt(Date.now() - 3500), completedAt: BigInt(Date.now() - 2800) },
        { agentType: "executor", status: "running", output: "", startedAt: BigInt(Date.now() - 2800), completedAt: BigInt(0) },
        { agentType: "memory", status: "pending", output: "", startedAt: BigInt(0), completedAt: BigInt(0) },
        { agentType: "critic", status: "pending", output: "", startedAt: BigInt(0), completedAt: BigInt(0) },
      ] as import("../backend").AgentStreamStep[],
      status: "active",
      createdAt: BigInt(Date.now() - 5000),
    };
    return demo;
  },

  updateStreamChunk: async () => true,
  updateAgentStep: async () => true,

  // ─── Voice Profiles (family/friends recognition) ────────────────────────────
  enrollVoiceProfile: async (userId, name, relationship, mfccFeatures) => ({
    id: `vp-${Date.now()}`,
    userId,
    name,
    relationship,
    mfccFeatures,
    enrolledPhrases: BigInt(1),
    enrolledAt: BigInt(Date.now()),
  }),

  listVoiceProfiles: async (_userId) => [
    { id: "vp-001", userId: "demo", name: "Maa", relationship: "mother", mfccFeatures: [], enrolledPhrases: BigInt(3), enrolledAt: BigInt(Date.now() - 86400000 * 7) },
    { id: "vp-002", userId: "demo", name: "Papa", relationship: "father", mfccFeatures: [], enrolledPhrases: BigInt(2), enrolledAt: BigInt(Date.now() - 86400000 * 5) },
    { id: "vp-003", userId: "demo", name: "Rahul", relationship: "friend", mfccFeatures: [], enrolledPhrases: BigInt(4), enrolledAt: BigInt(Date.now() - 86400000 * 3) },
  ],

  deleteVoiceProfile: async (_userId, _profileId) => true,

  matchVoiceProfile: async (_userId, _inputMfcc) => ({
    profileId: "vp-001",
    name: "Maa",
    confidence: 0.87,
  }),

  recordInteraction: async (_userId, _topicTags) => undefined,

  // ─── Genetic Learning ────────────────────────────────────────────────────────
  getGeneticProfile: async (userId) => ({
    userId,
    dominantLanguage: "english",
    dominantDomain: "software_engineering",
    formalityLevel: 0.65,
    technicalDepth: 0.80,
    preferences: [
      { key: "language", value: "english", weight: 0.9, userId, updatedAt: BigInt(Date.now() - 3600000) },
      { key: "response_style", value: "technical", weight: 0.75, userId, updatedAt: BigInt(Date.now() - 7200000) },
    ],
    lastAdapted: BigInt(Date.now() - 1800000),
  }),

  updateGeneticPreference: async (_userId, _key, _value, _weight) => undefined,

  // ─── Trading / Portfolio ─────────────────────────────────────────────────────
  getStockSymbols: async () => [
    { symbol: "RELIANCE", name: "Reliance Industries", sector: "Energy" },
    { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT" },
    { symbol: "INFY", name: "Infosys", sector: "IT" },
    { symbol: "HDFCBANK", name: "HDFC Bank", sector: "Banking" },
    { symbol: "WIPRO", name: "Wipro", sector: "IT" },
  ],

  getStockPrice: async (symbol) => ({
    symbol,
    open: 2400 + Math.random() * 200,
    high: 2600 + Math.random() * 100,
    low: 2300 + Math.random() * 100,
    close: 2500 + Math.random() * 150,
    volume: BigInt(Math.floor(Math.random() * 5000000)),
    date: BigInt(Date.now()),
  }),

  getStockHistory: async (symbol, days) => {
    const history: { symbol: string; open: number; high: number; low: number; close: number; volume: bigint; date: bigint }[] = [];
    const base = 2400;
    for (let i = Number(days) - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const close = base + Math.sin(i * 0.3) * 200 + Math.random() * 100;
      history.push({
        symbol,
        open: close - Math.random() * 30,
        high: close + Math.random() * 50,
        low: close - Math.random() * 50,
        close,
        volume: BigInt(Math.floor(Math.random() * 5000000)),
        date: BigInt(d.getTime()),
      });
    }
    return history;
  },

  getPortfolio: async (userId) => ({
    userId,
    holdings: [
      { symbol: "TCS", quantity: BigInt(10), avgCost: 3200 },
      { symbol: "RELIANCE", quantity: BigInt(5), avgCost: 2450 },
      { symbol: "INFY", quantity: BigInt(15), avgCost: 1550 },
    ],
    totalValue: 94750,
    lastUpdated: BigInt(Date.now()),
  }),

  executeSimulatedTrade: async (userId, symbol, action, quantity) => ({
    id: `txn-${Date.now()}`,
    userId,
    symbol,
    action,
    quantity,
    price: 2500 + Math.random() * 200,
    timestamp: BigInt(Date.now()),
    note: "Simulation Only — not a real trade",
  }),

  getTransactionHistory: async (userId) => [
    { id: "txn-001", userId, symbol: "TCS", action: TransactionAction.buy, quantity: BigInt(5), price: 3180, timestamp: BigInt(Date.now() - 86400000 * 3), note: "Simulation Only" },
    { id: "txn-002", userId, symbol: "RELIANCE", action: TransactionAction.buy, quantity: BigInt(3), price: 2420, timestamp: BigInt(Date.now() - 86400000 * 1), note: "Simulation Only" },
  ],
};
