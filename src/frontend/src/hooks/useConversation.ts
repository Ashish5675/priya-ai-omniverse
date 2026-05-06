import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ChatMessage } from "../backend";
import { mockBackend } from "../mocks/backend";
import { useAriaStore } from "../store/useAriaStore";
import type { Message, Settings } from "../types";

// ─── Simulated fallback (used when canister is unavailable) ──────────────────

let _simMessages: Message[] = [
  {
    id: BigInt(1),
    role: "assistant",
    content:
      "Hello! I'm Priya — your advanced AI assistant. How may I help you today?",
    // nanoseconds convention matching backend Time.now()
    timestamp: BigInt(Date.now()) * BigInt(1_000_000),
  },
];
let _simNextId = BigInt(2);
let _simSettings: Settings = {
  personality: "friendly",
  glowColor: "#00d9ff",
  apiKey: "",
};

async function simAddMessage(role: string, content: string): Promise<Message> {
  const msg: Message = {
    id: _simNextId++,
    role,
    content,
    // nanoseconds convention matching backend Time.now()
    timestamp: BigInt(Date.now()) * BigInt(1_000_000),
  };
  _simMessages.push(msg);
  return msg;
}

async function simGetHistory(): Promise<Message[]> {
  return [..._simMessages];
}

async function simClearHistory(): Promise<void> {
  _simMessages = [];
  _simNextId = BigInt(1);
}

async function simGetSettings(): Promise<Settings> {
  return { ..._simSettings };
}

async function simSaveSettings(
  personality: string,
  glowColor: string,
  apiKey: string,
): Promise<void> {
  _simSettings = { personality, glowColor, apiKey };
}

// Responses that should be treated as "no real answer" from the backend LLM
const BACKEND_FALLBACK_STRINGS = [
  "i am processing your request",
  "processing your request",
];

function isBackendFallbackResponse(response: string): boolean {
  const normalized = response.trim().toLowerCase();
  return (
    BACKEND_FALLBACK_STRINGS.some((f) => normalized.includes(f)) ||
    normalized === ""
  );
}

async function simCallLLM(
  userMessage: string,
  personality: string,
): Promise<string> {
  const lower = userMessage.toLowerCase();
  const personalityPrefixes: Record<string, string> = {
    professional: "Based on my analysis: ",
    friendly: "Of course! ",
    mysterious: "The answer unfolds... ",
  };
  const prefix = personalityPrefixes[personality] ?? "";

  if (lower.includes("hello") || lower.includes("hi"))
    return `${prefix}Hello! I'm Priya, your AI assistant. I'm here and ready to help — what's on your mind?`;
  if (lower.includes("help") || lower.includes("what can"))
    return `${prefix}I can assist you with analysis, answering questions, creative writing, planning, and much more. Just tell me what you need!`;
  if (lower.includes("who are you") || lower.includes("what are you"))
    return `${prefix}I'm Priya — an advanced AI assistant designed to help, inform, and inspire. Think of me as your intelligent companion for any task.`;
  if (lower.includes("how are you") || lower.includes("how r u"))
    return `${prefix}I'm doing wonderfully, thank you for asking! My systems are fully online and I'm ready to assist you.`;
  if (lower.includes("weather"))
    return `${prefix}I don't have live weather data right now, but I'd suggest checking a weather app for real-time conditions in your area. Can I help with something else?`;
  if (lower.includes("time") || lower.includes("date"))
    return `${prefix}I don't have access to a real-time clock, but your device can show you the exact time. Is there something else I can help you with?`;
  if (lower.includes("name"))
    return `${prefix}My name is Priya! I'm here to be your helpful, intelligent AI companion.`;

  const genericResponses = [
    `${prefix}That's an interesting topic! I'd love to dive deeper — could you share a bit more about what you're looking for?`,
    `${prefix}Great question. Based on my knowledge, there are several angles to consider here. What aspect would you like to explore first?`,
    `${prefix}I understand what you're asking. Let me offer my perspective: this is a nuanced subject worth thinking through carefully.`,
    `${prefix}I'm fully engaged and here to help! Could you give me a little more context so I can give you the best possible answer?`,
    `${prefix}Absolutely — I've processed your message and I'm ready to help you work through this. What outcome are you hoping for?`,
    `${prefix}Wonderful! I have quite a bit of knowledge on this. Let's explore it together — what do you already know about it?`,
  ];
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// ─── Speech synthesis ────────────────────────────────────────────────────────

const FEMALE_VOICE_HINTS = [
  "google uk english female",
  "samantha",
  "victoria",
  "zira",
  "female",
  "karen",
  "moira",
  "tessa",
  "fiona",
  "allison",
  "ava",
  "natasha",
  "susan",
  "emma",
];

/**
 * Async voice picker — waits for voices to load if the list is empty.
 * Returns the best female voice, or falls back to any English voice, then any voice.
 */
async function pickFemaleVoice(): Promise<SpeechSynthesisVoice | null> {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;

  let voices = window.speechSynthesis.getVoices();

  // Voices may not be loaded on first call — wait for voiceschanged (3s timeout)
  if (!voices.length) {
    await new Promise<void>((resolve) => {
      const timeout = setTimeout(resolve, 3000);
      window.speechSynthesis.addEventListener(
        "voiceschanged",
        () => {
          clearTimeout(timeout);
          resolve();
        },
        { once: true },
      );
    });
    voices = window.speechSynthesis.getVoices();
  }

  if (!voices.length) return null;

  // Try female name hints (case-insensitive)
  for (const hint of FEMALE_VOICE_HINTS) {
    const match = voices.find((v) => v.name.toLowerCase().includes(hint));
    if (match) return match;
  }

  // Fall back to any English voice
  const englishVoice = voices.find((v) => v.lang.startsWith("en"));
  if (englishVoice) return englishVoice;

  // Last resort: first available voice
  return voices[0] ?? null;
}

/**
 * Speak text aloud via the browser SpeechSynthesis API with a realistic female voice.
 * Automatically handles async voice loading and Chrome's tab-focus pause bug.
 */
export async function speakText(
  text: string,
  onStart: () => void,
  onEnd: () => void,
): Promise<void> {
  // Feature-detect SpeechSynthesis
  if (typeof window === "undefined" || !window.speechSynthesis) {
    // Graceful fallback: simulate speaking duration
    onStart();
    const fallbackMs = Math.max(3000, text.split(" ").length * 120);
    setTimeout(onEnd, fallbackMs);
    return;
  }

  // Cancel any currently playing utterance
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.pitch = 1.15; // Natural female pitch
  utterance.rate = 0.95; // Slightly slower = more realistic
  utterance.volume = 1.0;

  // Await async voice picker so voices are definitely loaded
  const voice = await pickFemaleVoice();
  if (voice) utterance.voice = voice;

  // Chrome bug workaround: Chrome pauses speech when tab loses focus.
  // Resume every 14 seconds while speaking.
  let resumeInterval: ReturnType<typeof setInterval> | null = null;

  utterance.onstart = () => {
    onStart();
    resumeInterval = setInterval(() => {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 14000);
  };

  utterance.onend = () => {
    if (resumeInterval) clearInterval(resumeInterval);
    setTimeout(onEnd, 1000);
  };

  utterance.onerror = (e) => {
    console.error("[Priya TTS] SpeechSynthesis error:", e.error);
    if (resumeInterval) clearInterval(resumeInterval);
    onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

export function useGetHistory() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Message[]>({
    queryKey: ["conversation", "history"],
    queryFn: async () => {
      if (!actor) return simGetHistory();
      try {
        return await actor.getHistory();
      } catch {
        return simGetHistory();
      }
    },
    enabled: !isFetching,
    refetchInterval: false,
  });
}

export function useGetSettings() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Settings>({
    queryKey: ["settings"],
    queryFn: async () => {
      if (!actor) return simGetSettings();
      try {
        return await actor.getSettings();
      } catch {
        return simGetSettings();
      }
    },
    enabled: !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useSaveSettings() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (s: Settings) => {
      if (!actor) {
        return simSaveSettings(s.personality, s.glowColor, s.apiKey);
      }
      try {
        await actor.saveSettings(s.personality, s.glowColor, s.apiKey);
      } catch {
        await simSaveSettings(s.personality, s.glowColor, s.apiKey);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const { setAvatarMood, setIsSpeaking, settings } = useAriaStore();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (userContent: string) => {
      // 1. Persist user message
      let persistedUserMsg: Message;
      if (actor) {
        try {
          persistedUserMsg = await actor.addMessage("user", userContent);
        } catch {
          persistedUserMsg = await simAddMessage("user", userContent);
        }
      } else {
        persistedUserMsg = await simAddMessage("user", userContent);
      }

      setAvatarMood("thinking");

      // 2. Build messages array for LLM context
      let history: Message[] = [];
      try {
        history = actor ? await actor.getHistory() : await simGetHistory();
      } catch {
        history = await simGetHistory();
      }

      const chatMessages: ChatMessage[] = history.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // 3. Call LLM (canister or fallback)
      let llmResponse: string;
      if (actor) {
        try {
          llmResponse = await actor.callLLM(
            chatMessages,
            settings.apiKey,
            settings.personality,
          );
          // If backend returns a placeholder (no API key configured), fall back to simulated response
          if (isBackendFallbackResponse(llmResponse)) {
            await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));
            llmResponse = await simCallLLM(userContent, settings.personality);
          }
        } catch {
          await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
          llmResponse = await simCallLLM(userContent, settings.personality);
        }
      } else {
        await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
        llmResponse = await simCallLLM(userContent, settings.personality);
      }

      // 4. Persist assistant response
      let assistantMsg: Message;
      if (actor) {
        try {
          assistantMsg = await actor.addMessage("assistant", llmResponse);
        } catch {
          assistantMsg = await simAddMessage("assistant", llmResponse);
        }
      } else {
        assistantMsg = await simAddMessage("assistant", llmResponse);
      }

      setAvatarMood("speaking");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      void persistedUserMsg;
      return assistantMsg;
    },
    onSuccess: (assistantMsg) => {
      queryClient.invalidateQueries({ queryKey: ["conversation", "history"] });
      // TTS fires here — single location to avoid double-speak
      void speakText(
        assistantMsg.content,
        () => setIsSpeaking(true),
        () => {
          setIsSpeaking(false);
          setAvatarMood("idle");
        },
      );
    },
    onError: () => {
      setAvatarMood("alert");
      setTimeout(() => setAvatarMood("idle"), 2000);
    },
  });
}

export function useClearHistory() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async () => {
      if (actor) {
        try {
          await actor.clearHistory();
        } catch {
          await simClearHistory();
        }
      } else {
        await simClearHistory();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversation", "history"] });
    },
  });
}

// Re-export mockBackend so it can be consumed by Playwright mocks
export { mockBackend };

// Re-export pickFemaleVoice for testing / external use
export { pickFemaleVoice };
