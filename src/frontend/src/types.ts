export interface Message {
  id: bigint;
  role: string;
  content: string;
  timestamp: bigint;
}

export interface Settings {
  personality: string;
  glowColor: string;
  apiKey: string;
}

export type AvatarMood = "idle" | "speaking" | "thinking" | "happy" | "alert";

export interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

// Auth & User types
export type SubscriptionTier = "free" | "pro" | "enterprise";
export type UserRole = "user" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tier: SubscriptionTier;
}

export interface AuthState {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  subscriptionTier: SubscriptionTier | null;
}

// Wardrobe types
export type WardrobeItemType = "top" | "jeans" | "heels";

export interface WardrobeSelection {
  top: number;
  jeans: number;
  heels: number;
}

// Subscription types
export interface SubscriptionStatus {
  active: boolean;
  tier: SubscriptionTier;
  startDate: bigint;
}

// ─── Language & Voice ──────────────────────────────────────────────────────────

export type Language = "english" | "hindi" | "nagpuri";

export interface VoiceSettings {
  language: Language;
  autoPlay: boolean;
  continuousMode: boolean;
  speed: number;
  pitch: number;
}

// ─── Agent types ───────────────────────────────────────────────────────────────

export interface AgentTask {
  id: bigint;
  agentType: string;
  input: string;
  output?: string;
  status: string;
  timestamp: bigint;
}

export interface AgentChain {
  id: bigint;
  tasks: AgentTask[];
  currentStep: bigint;
  goal: string;
  status: string;
}

// ─── Knowledge types ───────────────────────────────────────────────────────────

export interface KnowledgeChunkLocal {
  id: bigint;
  text: string;
  similarity: number;
}

export interface KnowledgeDocument {
  id: bigint;
  title: string;
  docType: string;
  content: string;
  uploadedAt: bigint;
  indexStatus: string;
  chunks: KnowledgeChunkLocal[];
}

// ─── Drone types ───────────────────────────────────────────────────────────────

export interface DroneState {
  id: bigint;
  lat: number;
  lng: number;
  altitude: number;
  speed: number;
  battery: number;
  status: string;
  timestamp: bigint;
}

export interface DetectionAlert {
  id: bigint;
  droneId: bigint;
  alertType: string;
  description: string;
  timestamp: bigint;
}

// ─── Legal types ───────────────────────────────────────────────────────────────

export interface LegalClause {
  id: bigint;
  clauseType: string;
  text: string;
}

export interface LegalDocument {
  id: bigint;
  title: string;
  content: string;
  uploadedAt: bigint;
  summary?: string;
  clauses: LegalClause[];
}

// ─── Tracking & IoT types ──────────────────────────────────────────────────────

export interface TrackingAsset {
  id: bigint;
  name: string;
  lat: number;
  lng: number;
  speed: number;
  heading: number;
  status: string;
  battery?: number;
}

export interface IoTDevice {
  id: bigint;
  name: string;
  deviceType: string;
  state: string;
  isOnline: boolean;
  lastSeen: bigint;
}

// ─── Analytics & Admin types ───────────────────────────────────────────────────

export interface UserMetrics {
  userId: string;
  messageCount: bigint;
  voiceCount: bigint;
  agentTaskCount: bigint;
  lastActive: bigint;
}

export interface SystemMetrics {
  totalUsers: bigint;
  activeUsers: bigint;
  totalMessages: bigint;
  totalVoiceCalls: bigint;
  totalAgentTasks: bigint;
  mrr: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  tier: string;
  createdAt: bigint;
}

// ─── Trading types ─────────────────────────────────────────────────────────────

export interface StockSymbol {
  symbol: string;
  name: string;
  sector: string;
  basePrice: number;
}

export interface StockPrice {
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date: string;
}

export interface Portfolio {
  userId: string;
  holdings: Array<{
    symbol: string;
    quantity: number;
    avgCost: number;
    currentValue: number;
    pnl: number;
  }>;
  totalValue: number;
  totalPnl: number;
  pnlPercent: number;
}

export interface Transaction {
  id: string;
  userId: string;
  symbol: string;
  action: "buy" | "sell";
  quantity: number;
  price: number;
  timestamp: number;
  note: string;
}

// ─── Voice & Genetic types ──────────────────────────────────────────────────────

export interface VoiceProfile {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  mfccFeatures: number[];
  enrolledPhrases: string[];
  enrolledAt: number;
}

export interface GeneticProfile {
  userId: string;
  dominantLanguage: string;
  dominantDomain: string;
  technicalDepth: number;
  formalityLevel: number;
}
