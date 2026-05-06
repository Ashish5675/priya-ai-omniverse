import { createActor } from "@/backend";
import type { VoiceMatch, VoiceProfile } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Query keys ───────────────────────────────────────────────────────────────

const vpKeys = {
  all: ["voiceProfiles"] as const,
  list: (userId: string) => [...vpKeys.all, "list", userId] as const,
};

// ─── React Query hooks ────────────────────────────────────────────────────────

export function useListVoiceProfiles(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VoiceProfile[]>({
    queryKey: vpKeys.list(userId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVoiceProfiles(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useEnrollVoiceProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    VoiceProfile,
    Error,
    {
      userId: string;
      name: string;
      relationship: string;
      mfccFeatures: number[];
    }
  >({
    mutationFn: async ({ userId, name, relationship, mfccFeatures }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.enrollVoiceProfile(userId, name, relationship, mfccFeatures);
    },
    onSuccess: (_data, variables) => {
      void qc.invalidateQueries({ queryKey: vpKeys.list(variables.userId) });
    },
  });
}

export function useDeleteVoiceProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, { userId: string; profileId: string }>({
    mutationFn: async ({ userId, profileId }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteVoiceProfile(userId, profileId);
    },
    onSuccess: (_data, variables) => {
      void qc.invalidateQueries({ queryKey: vpKeys.list(variables.userId) });
    },
  });
}

export function useMatchVoiceProfile() {
  const { actor } = useActor(createActor);
  return useMutation<
    VoiceMatch | null,
    Error,
    { userId: string; inputMfcc: number[] }
  >({
    mutationFn: async ({ userId, inputMfcc }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.matchVoiceProfile(userId, inputMfcc);
    },
  });
}

// ─── Audio DSP utilities (Web Audio API — no external libs) ───────────────────

/** Number of MFCC-like frequency bands to extract */
const MFCC_BANDS = 13;

/**
 * Apply a Hamming window to a Float32 frame to reduce spectral leakage.
 */
function applyHammingWindow(frame: Float32Array): Float32Array {
  const N = frame.length;
  const windowed = new Float32Array(N);
  for (let n = 0; n < N; n++) {
    windowed[n] =
      frame[n] * (0.54 - 0.46 * Math.cos((2 * Math.PI * n) / (N - 1)));
  }
  return windowed;
}

/**
 * Apply a simple Discrete Cosine Transform (DCT-II) to an array of energies
 * to produce cepstral coefficients.
 */
function dct(energies: number[]): number[] {
  const N = energies.length;
  return Array.from({ length: MFCC_BANDS }, (_, k) => {
    let sum = 0;
    for (let n = 0; n < N; n++) {
      sum += energies[n] * Math.cos((Math.PI * k * (2 * n + 1)) / (2 * N));
    }
    return sum * Math.sqrt(2 / N);
  });
}

/**
 * Extract 13 MFCC-like cepstral coefficients from an AudioBuffer.
 * Uses Web Audio API AnalyserNode for FFT, then mel-spaced band energies + DCT.
 * No external libraries — pure browser APIs only.
 */
export async function extractMFCC(audioBuffer: AudioBuffer): Promise<number[]> {
  // Offline context for headless FFT processing
  const sampleRate = audioBuffer.sampleRate;
  const offlineCtx = new OfflineAudioContext(1, audioBuffer.length, sampleRate);

  const source = offlineCtx.createBufferSource();
  source.buffer = audioBuffer;

  // Analyser for frequency data
  const analyser = offlineCtx.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0;

  source.connect(analyser);
  analyser.connect(offlineCtx.destination);
  source.start(0);

  await offlineCtx.startRendering();

  // Get frequency magnitude data
  const freqData = new Float32Array(analyser.frequencyBinCount);
  analyser.getFloatFrequencyData(freqData);

  // Convert dB to linear power
  const linearPower = Array.from(freqData).map((db) => 10 ** (db / 10));

  // Build mel-spaced filter banks (26 bands) across 0–sampleRate/2
  const numBands = 26;
  const nyquist = sampleRate / 2;
  const melMin = 2595 * Math.log10(1 + 0 / 700);
  const melMax = 2595 * Math.log10(1 + nyquist / 700);

  // Evenly spaced mel points → convert back to Hz → bin indices
  const melPoints = Array.from(
    { length: numBands + 2 },
    (_, i) => melMin + (i / (numBands + 1)) * (melMax - melMin),
  );
  const hzPoints = melPoints.map((m) => 700 * (10 ** (m / 2595) - 1));
  const binPoints = hzPoints.map((hz) =>
    Math.floor(((analyser.fftSize + 1) * hz) / sampleRate),
  );

  // Apply triangular filter bank to get band energies
  const bandEnergies: number[] = [];
  for (let m = 1; m <= numBands; m++) {
    let energy = 0;
    const lo = binPoints[m - 1];
    const center = binPoints[m];
    const hi = binPoints[m + 1];

    for (let k = lo; k < center; k++) {
      energy += linearPower[k] * ((k - lo) / (center - lo));
    }
    for (let k = center; k <= hi; k++) {
      energy += linearPower[k] * ((hi - k) / (hi - center));
    }
    bandEnergies.push(Math.max(energy, 1e-10));
  }

  // Apply log to band energies before DCT
  const logEnergies = bandEnergies.map(Math.log);

  // Apply Hamming window and DCT to get cepstral coefficients
  const frame = new Float32Array(logEnergies);
  const windowed = applyHammingWindow(frame);
  const mfcc = dct(Array.from(windowed));

  return mfcc;
}

/**
 * Compute cosine similarity between two equal-length numeric vectors.
 * Returns a value in [-1, 1]. Higher means more similar.
 */
export function computeCosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] ** 2;
    normB += b[i] ** 2;
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}
