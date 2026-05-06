import type { VoiceProfile } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  extractMFCC,
  useDeleteVoiceProfile,
  useEnrollVoiceProfile,
  useListVoiceProfiles,
} from "@/hooks/useVoiceProfile";
import { useAriaStore } from "@/store/useAriaStore";
import {
  AlertTriangle,
  CheckCircle2,
  Mic,
  MicOff,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_PROFILES = 10;
const PHRASE_DURATION_MS = 5000;
const PHRASES = [
  "Hello Priya, how are you today?",
  "Priya, open the assistant for me.",
  "Hey Priya, tell me something interesting.",
];

const RELATIONSHIP_OPTIONS = [
  "Mom",
  "Dad",
  "Brother",
  "Sister",
  "Spouse",
  "Friend",
  "Colleague",
  "Other",
] as const;

type Relationship = (typeof RELATIONSHIP_OPTIONS)[number];

const RELATIONSHIP_COLORS: Record<Relationship, string> = {
  Mom: "bg-pink-900/40 text-pink-300 border-pink-700/50",
  Dad: "bg-blue-900/40 text-blue-300 border-blue-700/50",
  Brother: "bg-indigo-900/40 text-indigo-300 border-indigo-700/50",
  Sister: "bg-purple-900/40 text-purple-300 border-purple-700/50",
  Spouse: "bg-rose-900/40 text-rose-300 border-rose-700/50",
  Friend: "bg-cyan-900/40 text-cyan-300 border-cyan-700/50",
  Colleague: "bg-yellow-900/40 text-yellow-300 border-yellow-700/50",
  Other: "bg-muted text-muted-foreground border-border",
};

function getRelBadgeClass(rel: string): string {
  return (
    RELATIONSHIP_COLORS[rel as Relationship] ??
    "bg-muted text-muted-foreground border-border"
  );
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProfileCard({
  profile,
  index,
  onDelete,
}: {
  profile: VoiceProfile;
  index: number;
  onDelete: (p: VoiceProfile) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-card/60 px-4 py-3 backdrop-blur-sm"
      data-ocid={`voice_enroll.item.${index + 1}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
          <Users size={16} />
        </div>
        <div className="min-w-0">
          <p className="truncate font-mono text-sm font-semibold text-foreground">
            {profile.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {Number(profile.enrolledPhrases)} phrase
            {Number(profile.enrolledPhrases) !== 1 ? "s" : ""} &middot; Enrolled{" "}
            {formatDate(profile.enrolledAt)}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs font-medium ${getRelBadgeClass(profile.relationship)}`}
        >
          {profile.relationship}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDelete(profile)}
          data-ocid={`voice_enroll.delete_button.${index + 1}`}
        >
          <Trash2 size={14} />
          <span className="sr-only">Delete {profile.name}</span>
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Recording state type ─────────────────────────────────────────────────────

type RecordingState =
  | "idle"
  | "recording"
  | "done"
  | "processing"
  | "success"
  | "error";

// ─── Main page ────────────────────────────────────────────────────────────────

export function VoiceEnrollPage() {
  const currentUser = useAriaStore((s) => s.currentUser);
  const settings = useAriaStore((s) => s.settings);
  const updateSettings = useAriaStore((s) => s.updateSettings);

  // Announce speaker identity — stored in settings.personality as a flag prefix
  const announceIdentity =
    settings.personality?.includes("announce_speaker") ?? false;
  function setAnnounceIdentity(val: boolean) {
    const base = (settings.personality ?? "friendly").replace(
      /\|announce_speaker/g,
      "",
    );
    updateSettings({ personality: val ? `${base}|announce_speaker` : base });
  }

  const userId = currentUser?.id?.toString() ?? "demo_user";
  const { data: profiles = [], isLoading } = useListVoiceProfiles(userId);
  const enrollMutation = useEnrollVoiceProfile();
  const deleteMutation = useDeleteVoiceProfile();

  // ─── Form state ─────────────────────────────────────────────────────────
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState<Relationship | "">("");

  // ─── Recording state ─────────────────────────────────────────────────────
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [countdown, setCountdown] = useState(0);
  const [collectedBuffers, setCollectedBuffers] = useState<AudioBuffer[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Delete confirmation dialog ──────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<VoiceProfile | null>(null);

  // ─── Recording logic ──────────────────────────────────────────────────────
  const startRecording = useCallback(async () => {
    if (phraseIndex >= PHRASES.length) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        for (const t of stream.getTracks()) t.stop();
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const arrayBuffer = await blob.arrayBuffer();
        const audioCtx = new AudioContext();
        try {
          const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);
          setCollectedBuffers((prev) => [...prev, decodedBuffer]);
        } catch {
          // Fallback: skip this phrase's buffer if decode fails
        } finally {
          await audioCtx.close();
        }
        const nextIndex = phraseIndex + 1;
        setPhraseIndex(nextIndex);
        if (nextIndex >= PHRASES.length) {
          setRecordingState("done");
        } else {
          setRecordingState("idle");
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecordingState("recording");
      setCountdown(PHRASE_DURATION_MS / 1000);

      let remaining = PHRASE_DURATION_MS / 1000;
      countdownRef.current = setInterval(() => {
        remaining -= 1;
        setCountdown(remaining);
        if (remaining <= 0) {
          clearInterval(countdownRef.current!);
          recorder.stop();
        }
      }, 1000);
    } catch {
      setRecordingState("error");
    }
  }, [phraseIndex]);

  const stopEarly = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    mediaRecorderRef.current?.stop();
  }, []);

  // ─── Enroll logic ─────────────────────────────────────────────────────────
  const handleEnroll = useCallback(async () => {
    if (!name.trim() || !relationship || collectedBuffers.length === 0) return;
    setRecordingState("processing");

    try {
      // Average MFCC features across all recorded phrases
      const allMfccs = await Promise.all(
        collectedBuffers.map((buf) => extractMFCC(buf)),
      );
      const avgMfcc = allMfccs[0].map(
        (_, i) =>
          allMfccs.reduce((sum, mfcc) => sum + mfcc[i], 0) / allMfccs.length,
      );

      await enrollMutation.mutateAsync({
        userId,
        name: name.trim(),
        relationship,
        mfccFeatures: avgMfcc,
      });

      setRecordingState("success");
      // Reset form after short delay
      setTimeout(() => {
        setName("");
        setRelationship("");
        setPhraseIndex(0);
        setCollectedBuffers([]);
        setRecordingState("idle");
      }, 1500);
    } catch {
      setRecordingState("error");
    }
  }, [name, relationship, collectedBuffers, enrollMutation, userId]);

  const resetForm = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    mediaRecorderRef.current?.stop();
    setName("");
    setRelationship("");
    setPhraseIndex(0);
    setCollectedBuffers([]);
    setRecordingState("idle");
  }, []);

  // ─── Derived state ────────────────────────────────────────────────────────
  const atMaxProfiles = profiles.length >= MAX_PROFILES;
  const progressPct = (phraseIndex / PHRASES.length) * 100;
  const isRecording = recordingState === "recording";
  const canEnroll =
    recordingState === "done" && name.trim().length > 0 && relationship !== "";

  return (
    <div
      className="min-h-screen bg-background px-4 py-8 font-mono"
      data-ocid="voice_enroll.page"
    >
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        aria-hidden
      >
        <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,217,255,0.4)_2px,rgba(0,217,255,0.4)_4px)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl space-y-8">
        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-1"
          data-ocid="voice_enroll.section"
        >
          <h1 className="font-mono text-2xl font-bold tracking-wider text-primary drop-shadow-[0_0_12px_oklch(var(--primary))]">
            VOICE ENROLLMENT
          </h1>
          <p className="text-sm text-muted-foreground">
            Teach Priya to recognize your family and friends
          </p>
        </motion.div>

        {/* ── Announce Identity toggle ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between rounded-lg border border-border/60 bg-card/60 px-4 py-3 backdrop-blur-sm"
        >
          <div>
            <p className="text-sm font-semibold text-foreground">
              Announce Speaker Identity
            </p>
            <p className="text-xs text-muted-foreground">
              Priya says the person's name aloud before processing their message
            </p>
          </div>
          <Switch
            checked={announceIdentity}
            onCheckedChange={setAnnounceIdentity}
            data-ocid="voice_enroll.toggle"
          />
        </motion.div>

        {/* ── Enrolled profiles ── */}
        <section data-ocid="voice_enroll.list">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              Enrolled Profiles
            </h2>
            <Badge
              variant="outline"
              className="border-border font-mono text-muted-foreground"
            >
              {profiles.length} / {MAX_PROFILES}
            </Badge>
          </div>

          {isLoading ? (
            <div className="space-y-2" data-ocid="voice_enroll.loading_state">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 animate-pulse rounded-lg bg-card/40"
                />
              ))}
            </div>
          ) : profiles.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 bg-card/30 py-10 text-center"
              data-ocid="voice_enroll.empty_state"
            >
              <Users size={32} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No voice profiles enrolled yet
              </p>
              <p className="text-xs text-muted-foreground/60">
                Add profiles below so Priya can greet your loved ones by name
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="space-y-2">
                {profiles.map((profile, i) => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    index={i}
                    onDelete={setDeleteTarget}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}

          {atMaxProfiles && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 flex items-center gap-2 rounded-lg border border-yellow-700/50 bg-yellow-900/20 px-4 py-3"
              data-ocid="voice_enroll.error_state"
            >
              <AlertTriangle size={16} className="shrink-0 text-yellow-400" />
              <p className="text-xs text-yellow-300">
                Maximum of {MAX_PROFILES} profiles reached. Delete a profile to
                add a new one.
              </p>
            </motion.div>
          )}
        </section>

        {/* ── Add new profile form ── */}
        <AnimatePresence>
          {!atMaxProfiles && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border border-primary/30 bg-card/70 p-5 shadow-[0_0_24px_oklch(var(--primary)/0.08)] backdrop-blur-md"
              data-ocid="voice_enroll.panel"
            >
              <div className="mb-4 flex items-center gap-2">
                <UserPlus size={16} className="text-primary" />
                <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                  Add New Profile
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="vp-name"
                    className="text-xs text-muted-foreground"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="vp-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav"
                    className="border-border/60 bg-background/60 font-mono text-sm placeholder:text-muted-foreground/50"
                    data-ocid="voice_enroll.input"
                    autoComplete="off"
                  />
                </div>

                {/* Relationship */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="vp-rel"
                    className="text-xs text-muted-foreground"
                  >
                    Relationship
                  </Label>
                  <Select
                    value={relationship}
                    onValueChange={(v) => setRelationship(v as Relationship)}
                  >
                    <SelectTrigger
                      id="vp-rel"
                      className="border-border/60 bg-background/60 font-mono text-sm"
                      data-ocid="voice_enroll.select"
                    >
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent className="border-border/60 bg-popover font-mono">
                      {RELATIONSHIP_OPTIONS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Recording section */}
              <div className="mt-5 space-y-3">
                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Phrases recorded</span>
                    <span className="font-mono">
                      {phraseIndex} / {PHRASES.length}
                    </span>
                  </div>
                  <Progress
                    value={progressPct}
                    className="h-1.5 bg-muted [&>div]:bg-primary"
                    data-ocid="voice_enroll.loading_state"
                  />
                </div>

                {/* Phrase prompt */}
                {phraseIndex < PHRASES.length && (
                  <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary/70">
                      Phrase {phraseIndex + 1} of {PHRASES.length} — say:
                    </p>
                    <p className="font-mono text-sm font-medium text-foreground">
                      &ldquo;{PHRASES[phraseIndex]}&rdquo;
                    </p>
                  </div>
                )}

                {/* Recording controls */}
                <div className="flex items-center gap-3">
                  {recordingState === "idle" &&
                    phraseIndex < PHRASES.length && (
                      <Button
                        type="button"
                        onClick={startRecording}
                        disabled={!name.trim() || !relationship}
                        className="gap-2 border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                        variant="outline"
                        data-ocid="voice_enroll.primary_button"
                      >
                        <Mic size={14} />
                        Start Recording
                      </Button>
                    )}

                  {isRecording && (
                    <>
                      {/* Pulsing red mic */}
                      <div className="relative flex items-center gap-3">
                        <span className="relative flex h-4 w-4">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                          <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
                        </span>
                        <span className="font-mono text-sm text-red-400">
                          Recording...
                        </span>
                        <span className="font-mono text-sm tabular-nums text-muted-foreground">
                          {countdown}s
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={stopEarly}
                        className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                        data-ocid="voice_enroll.secondary_button"
                      >
                        <MicOff size={12} />
                        Stop Early
                      </Button>
                    </>
                  )}

                  {recordingState === "processing" && (
                    <div
                      className="flex items-center gap-2 text-sm text-primary"
                      data-ocid="voice_enroll.loading_state"
                    >
                      <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Extracting voice features...
                    </div>
                  )}

                  {recordingState === "success" && (
                    <div
                      className="flex items-center gap-2 text-sm text-green-400"
                      data-ocid="voice_enroll.success_state"
                    >
                      <CheckCircle2 size={16} />
                      Profile enrolled!
                    </div>
                  )}

                  {recordingState === "error" && (
                    <div
                      className="flex items-center gap-2 text-sm text-destructive"
                      data-ocid="voice_enroll.error_state"
                    >
                      <AlertTriangle size={14} />
                      Error. Check microphone permissions.
                    </div>
                  )}

                  {recordingState === "done" && (
                    <span className="font-mono text-xs text-green-400">
                      All phrases recorded ✓
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    type="button"
                    onClick={handleEnroll}
                    disabled={!canEnroll || enrollMutation.isPending}
                    className="gap-2"
                    data-ocid="voice_enroll.submit_button"
                  >
                    <UserPlus size={14} />
                    Enroll Profile
                  </Button>
                  {phraseIndex > 0 &&
                    recordingState !== "processing" &&
                    recordingState !== "success" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={resetForm}
                        className="text-xs text-muted-foreground hover:text-foreground"
                        data-ocid="voice_enroll.cancel_button"
                      >
                        Reset
                      </Button>
                    )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* ── Delete confirmation dialog ── */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <DialogContent
          className="border-border/60 bg-card font-mono"
          data-ocid="voice_enroll.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Delete Voice Profile
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Remove{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.name}
              </span>{" "}
              ({deleteTarget?.relationship})? Priya will no longer recognize
              this voice.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setDeleteTarget(null)}
              data-ocid="voice_enroll.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={async () => {
                if (!deleteTarget) return;
                await deleteMutation.mutateAsync({
                  userId,
                  profileId: deleteTarget.id,
                });
                setDeleteTarget(null);
              }}
              disabled={deleteMutation.isPending}
              data-ocid="voice_enroll.confirm_button"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
