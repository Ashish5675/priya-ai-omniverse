import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockBackend } from "../mocks/backend";
import type { Language, VoiceSettings } from "../types";

const USE_MOCK = true;

// ─── Query keys ───────────────────────────────────────────────────────────────

export const voiceKeys = {
  all: ["voice"] as const,
  settings: () => [...voiceKeys.all, "settings"] as const,
  sessions: () => [...voiceKeys.all, "sessions"] as const,
};

// ─── Backend hooks ────────────────────────────────────────────────────────────

export function useVoiceSettings() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<VoiceSettings>({
    queryKey: voiceKeys.settings(),
    queryFn: async () => {
      if (USE_MOCK) {
        const s = await mockBackend.getVoiceSettings();
        return {
          language: s.language as Language,
          autoPlay: s.autoPlay,
          continuousMode: s.continuousMode,
          speed: s.speed,
          pitch: s.pitch,
        };
      }
      if (!actor)
        return {
          language: "english",
          autoPlay: true,
          continuousMode: false,
          speed: 1,
          pitch: 1,
        };
      const s = await actor.getVoiceSettings();
      return {
        language: s.language as Language,
        autoPlay: s.autoPlay,
        continuousMode: s.continuousMode,
        speed: s.speed,
        pitch: s.pitch,
      };
    },
    enabled: USE_MOCK || (!!actor && !isFetching),
  });
}

export function useSaveVoiceSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<boolean, Error, VoiceSettings>({
    mutationFn: async (settings) => {
      if (USE_MOCK)
        return mockBackend.saveVoiceSettings(
          settings as Parameters<typeof mockBackend.saveVoiceSettings>[0],
        );
      if (!actor) throw new Error("Actor not ready");
      return actor.saveVoiceSettings(
        settings as Parameters<typeof actor.saveVoiceSettings>[0],
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: voiceKeys.settings() });
    },
  });
}

export function useTranslateForLanguage() {
  const { actor } = useActor(createActor);

  return useMutation<string, Error, { text: string; language: Language }>({
    mutationFn: async ({ text, language }) => {
      if (USE_MOCK) return mockBackend.translateForLanguage(text, language);
      if (!actor) throw new Error("Actor not ready");
      return actor.translateForLanguage(text, language);
    },
  });
}

// ─── Speech Recognition ───────────────────────────────────────────────────────

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionEvent = {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionResultList = {
  length: number;
  [index: number]: SpeechRecognitionResult;
};

type SpeechRecognitionResult = {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
};

type SpeechRecognitionAlternative = {
  transcript: string;
};

export const LANG_CODES: Record<Language, string> = {
  english: "en-US",
  hindi: "hi-IN",
  nagpuri: "hi-IN",
};

let activeRecognition: SpeechRecognitionInstance | null = null;

export function startSpeechRecognition(
  language: Language,
  onResult: (transcript: string, isFinal: boolean) => void,
  onEnd?: () => void,
): () => void {
  // Stop any existing recognition
  if (activeRecognition) {
    activeRecognition.stop();
    activeRecognition = null;
  }

  const SpeechRecognitionCtor =
    (
      window as unknown as {
        SpeechRecognition?: new () => SpeechRecognitionInstance;
        webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
      }
    ).SpeechRecognition ||
    (
      window as unknown as {
        webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
      }
    ).webkitSpeechRecognition;

  if (!SpeechRecognitionCtor) {
    console.warn("Speech recognition not supported in this browser");
    return () => {};
  }

  const recognition = new SpeechRecognitionCtor();
  recognition.lang = LANG_CODES[language];
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    for (let i = 0; i < event.results.length; i++) {
      const result = event.results[i];
      const transcript = result[0].transcript;
      onResult(transcript, result.isFinal);
    }
  };

  recognition.onerror = () => {
    activeRecognition = null;
    onEnd?.();
  };

  recognition.onend = () => {
    activeRecognition = null;
    onEnd?.();
  };

  recognition.start();
  activeRecognition = recognition;

  return () => {
    recognition.stop();
    activeRecognition = null;
  };
}

// ─── Text-to-Speech ───────────────────────────────────────────────────────────

export function speakText(
  text: string,
  language: Language,
  settings?: Partial<VoiceSettings>,
): void {
  if (!window.speechSynthesis) return;

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = LANG_CODES[language];
  utterance.rate = settings?.speed ?? 1.0;
  utterance.pitch = settings?.pitch ?? 1.0;

  // Prepend Nagpuri intro
  const finalText = language === "nagpuri" ? `नागपुरी में, ${text}` : text;

  utterance.text = finalText;

  // Select best available voice
  const voices = window.speechSynthesis.getVoices();
  const langCode = LANG_CODES[language];

  const preferredVoice =
    voices.find((v) => v.lang === langCode && v.localService) ||
    voices.find((v) => v.lang.startsWith(langCode.split("-")[0])) ||
    voices.find(
      (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female"),
    ) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null;

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
