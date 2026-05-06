import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GeneticProfile } from "../types";
import type {
  AgentChain,
  AuthState,
  AvatarMood,
  Language,
  Settings,
  SubscriptionTier,
  UserProfile,
  UserRole,
  VoiceSettings,
  WardrobeSelection,
} from "../types";

interface AriaState extends AuthState {
  // Avatar & UI state
  avatarMood: AvatarMood;
  isSpeaking: boolean;
  isListening: boolean;
  settings: Settings;
  inputValue: string;

  // Wardrobe state
  wardrobe: WardrobeSelection;

  // Language & Voice state
  language: Language;
  isVoiceListening: boolean;
  voiceSettings: VoiceSettings;

  // Agent state
  activeAgentChain: AgentChain | null;
  agentsPanelOpen: boolean;

  // Thinking state
  isThinking: boolean;
  setIsThinking: (val: boolean) => void;

  // Voice speaker announcement
  announceVoiceSpeaker: boolean;
  setAnnounceVoiceSpeaker: (val: boolean) => void;

  // Genetic profile (silently updated)
  geneticProfile: GeneticProfile | null;
  recordGeneticInteraction: (topic: string, language: string) => void;

  // Avatar actions
  setAvatarMood: (mood: AvatarMood) => void;
  setIsSpeaking: (val: boolean) => void;
  setIsListening: (val: boolean) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setInputValue: (val: string) => void;

  // Auth actions
  login: (user: UserProfile) => void;
  logout: () => void;
  setUser: (user: UserProfile | null) => void;
  setSubscriptionTier: (tier: SubscriptionTier) => void;

  // Wardrobe actions
  setWardrobeTop: (index: number) => void;
  setWardrobeJeans: (index: number) => void;
  setWardrobeHeels: (index: number) => void;

  // Language & Voice actions
  setLanguage: (lang: Language) => void;
  setIsVoiceListening: (v: boolean) => void;
  setVoiceSettings: (settings: VoiceSettings) => void;

  // Agent actions
  setActiveAgentChain: (chain: AgentChain | null) => void;
  setAgentsPanelOpen: (open: boolean) => void;
}

const defaultSettings: Settings = {
  personality: "friendly",
  glowColor: "#00d9ff",
  apiKey: "",
};

const defaultWardrobe: WardrobeSelection = {
  top: 0,
  jeans: 0,
  heels: 0,
};

const defaultVoiceSettings: VoiceSettings = {
  language: "english",
  autoPlay: true,
  continuousMode: false,
  speed: 1.0,
  pitch: 1.0,
};

export const useAriaStore = create<AriaState>()(
  persist(
    (set) => ({
      // Avatar & UI defaults
      avatarMood: "idle",
      isSpeaking: false,
      isListening: false,
      settings: defaultSettings,
      inputValue: "",

      // Auth defaults
      currentUser: null,
      isAuthenticated: false,
      userRole: null,
      subscriptionTier: null,

      // Wardrobe defaults
      wardrobe: defaultWardrobe,

      // Language & Voice defaults
      language: "english",
      isVoiceListening: false,
      voiceSettings: defaultVoiceSettings,

      // Agent defaults
      activeAgentChain: null,
      agentsPanelOpen: false,

      // Thinking state
      isThinking: false,
      setIsThinking: (val) => set({ isThinking: val }),

      // Voice speaker announcement
      announceVoiceSpeaker: true,
      setAnnounceVoiceSpeaker: (val) => set({ announceVoiceSpeaker: val }),

      // Genetic profile
      geneticProfile: null,
      recordGeneticInteraction: (topic, language) =>
        set((state) => {
          const prev = state.geneticProfile;
          const userId = state.currentUser?.id ?? "anonymous";
          if (!prev) {
            return {
              geneticProfile: {
                userId,
                dominantLanguage: language,
                dominantDomain: topic,
                technicalDepth: 1,
                formalityLevel: 1,
              },
            };
          }
          return {
            geneticProfile: {
              ...prev,
              dominantLanguage: language,
              dominantDomain: topic,
              technicalDepth: Math.min(10, prev.technicalDepth + 0.1),
              formalityLevel: Math.min(10, prev.formalityLevel + 0.05),
            },
          };
        }),

      // Avatar actions
      setAvatarMood: (mood) => set({ avatarMood: mood }),
      setIsSpeaking: (val) => set({ isSpeaking: val }),
      setIsListening: (val) => set({ isListening: val }),
      updateSettings: (partial) =>
        set((state) => ({ settings: { ...state.settings, ...partial } })),
      setInputValue: (val) => set({ inputValue: val }),

      // Auth actions
      login: (user) =>
        set({
          currentUser: user,
          isAuthenticated: true,
          userRole: user.role as UserRole,
          subscriptionTier: user.tier as SubscriptionTier,
        }),
      logout: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
          userRole: null,
          subscriptionTier: null,
        }),
      setUser: (user) =>
        set({
          currentUser: user,
          isAuthenticated: !!user,
          userRole: user ? (user.role as UserRole) : null,
          subscriptionTier: user ? (user.tier as SubscriptionTier) : null,
        }),
      setSubscriptionTier: (tier) => set({ subscriptionTier: tier }),

      // Wardrobe actions
      setWardrobeTop: (index) =>
        set((state) => ({ wardrobe: { ...state.wardrobe, top: index } })),
      setWardrobeJeans: (index) =>
        set((state) => ({ wardrobe: { ...state.wardrobe, jeans: index } })),
      setWardrobeHeels: (index) =>
        set((state) => ({ wardrobe: { ...state.wardrobe, heels: index } })),

      // Language & Voice actions
      setLanguage: (lang) => set({ language: lang }),
      setIsVoiceListening: (v) => set({ isVoiceListening: v }),
      setVoiceSettings: (settings) => set({ voiceSettings: settings }),

      // Agent actions
      setActiveAgentChain: (chain) => set({ activeAgentChain: chain }),
      setAgentsPanelOpen: (open) => set({ agentsPanelOpen: open }),
    }),
    {
      name: "aria-store",
      partialize: (state) => ({
        settings: state.settings,
        wardrobe: state.wardrobe,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        userRole: state.userRole,
        subscriptionTier: state.subscriptionTier,
        language: state.language,
        voiceSettings: state.voiceSettings,
        announceVoiceSpeaker: state.announceVoiceSpeaker,
        geneticProfile: state.geneticProfile,
      }),
    },
  ),
);
