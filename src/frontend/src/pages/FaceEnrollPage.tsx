import { useNavigate } from "@tanstack/react-router";
import {
  Camera,
  CheckCircle2,
  Loader2,
  ScanFace,
  Settings,
  Trash2,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useClearFaceData,
  useFaceEnroll,
  useHasFaceEnrolled,
} from "../hooks/useFaceAuth";

// ─── Biometric dot grid overlay ───────────────────────────────────────────────
function BiometricGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, oklch(0.7 0.18 200 / 0.35) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
      aria-hidden
    />
  );
}

// ─── Scanning animation ───────────────────────────────────────────────────────
function ScanLineOverlay({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      className="absolute left-0 right-0 h-0.5 pointer-events-none z-20"
      style={{
        background:
          "linear-gradient(90deg, transparent, oklch(0.7 0.18 200 / 0.9), transparent)",
        boxShadow: "0 0 10px oklch(0.7 0.18 200 / 0.8)",
      }}
      initial={{ top: "0%" }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{
        duration: 2.2,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
      aria-hidden
    />
  );
}

// ─── Enroll State Type ────────────────────────────────────────────────────────
type EnrollStatus = "idle" | "capturing" | "processing" | "success" | "error";

// ─── Main Component ───────────────────────────────────────────────────────────
export function FaceEnrollPage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<EnrollStatus>("idle");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: hasEnrolled } = useHasFaceEnrolled();
  const enrollMut = useFaceEnroll();
  const clearMut = useClearFaceData();

  const startCamera = useCallback(async () => {
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      setStatus("idle");
    } catch {
      setCameraError("Camera unavailable. Check browser permissions.");
    }
  }, []);

  useEffect(() => {
    void startCamera();
    return () => {
      if (streamRef.current) {
        for (const t of streamRef.current.getTracks()) t.stop();
        streamRef.current = null;
      }
    };
  }, [startCamera]);

  const stopCamera = () => {
    if (streamRef.current) {
      for (const t of streamRef.current.getTracks()) t.stop();
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureAndSave = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setStatus("capturing");
    ctx.drawImage(video, 0, 0, 320, 240);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    setCapturedImage(dataUrl);
    stopCamera();

    setStatus("processing");
    try {
      await enrollMut.mutateAsync({ encoding: dataUrl });
      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Enrollment failed.",
      );
      setStatus("error");
    }
  };

  const handleClearFace = async () => {
    try {
      await clearMut.mutateAsync();
      setCapturedImage(null);
      setStatus("idle");
      void startCamera();
    } catch {
      // silently ignore
    }
  };

  const handleRetry = () => {
    setCapturedImage(null);
    setStatus("idle");
    void startCamera();
  };

  const statusConfig: Record<EnrollStatus, { text: string; color: string }> = {
    idle: {
      text: "Look directly at the camera",
      color: "text-primary",
    },
    capturing: { text: "Capturing…", color: "text-primary" },
    processing: { text: "Encoding biometrics…", color: "text-primary" },
    success: {
      text: "Face enrolled successfully!",
      color: "text-[#39ff14]",
    },
    error: {
      text: errorMessage || "Enrollment failed",
      color: "text-destructive",
    },
  };

  return (
    <div className="min-h-screen bg-background scanline-overlay flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.68 0.17 195 / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md relative z-10"
        data-ocid="face_enroll.panel"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex flex-col items-center gap-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-xl bg-primary/10 border-2 border-primary/40 animate-pulse-glow" />
              <ScanFace className="absolute inset-0 m-auto w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-[0.12em] text-foreground">
                FACE ENROLL
              </h1>
              <p className="hud-label opacity-60 mt-1">
                BIOMETRIC REGISTRATION MODULE
              </p>
            </div>
          </motion.div>
        </div>

        {/* Already enrolled notice */}
        <AnimatePresence>
          {hasEnrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 px-4 py-3 rounded-md border border-primary/30 bg-primary/10 text-primary text-xs font-mono flex items-center justify-between gap-3"
              data-ocid="face_enroll.already_enrolled_notice"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                Face already enrolled
              </span>
              <button
                type="button"
                onClick={() => void handleClearFace()}
                disabled={clearMut.isPending}
                className="flex items-center gap-1 text-destructive hover:text-destructive/80 transition-colors text-xs uppercase tracking-wider"
                data-ocid="face_enroll.clear_button"
              >
                {clearMut.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Panel */}
        <div
          className="glass-form corner-brackets relative"
          data-ocid="face_enroll.form_panel"
        >
          <div className="hud-label absolute top-2 left-4 opacity-50">
            BIOMETRIC CAPTURE
          </div>

          <div className="mt-6 space-y-5">
            {/* Camera Viewfinder */}
            <div
              className="relative mx-auto w-[280px] h-[210px] rounded-lg overflow-hidden border-2 border-primary/50 bg-background"
              data-ocid="face_enroll.viewfinder"
            >
              <BiometricGrid />

              {/* Corner brackets */}
              {(["tl", "tr", "bl", "br"] as const).map((corner) => (
                <div
                  key={corner}
                  className={`absolute w-6 h-6 border-primary ${corner === "tl" ? "top-1.5 left-1.5 border-t-2 border-l-2" : ""} ${corner === "tr" ? "top-1.5 right-1.5 border-t-2 border-r-2" : ""} ${corner === "bl" ? "bottom-1.5 left-1.5 border-b-2 border-l-2" : ""} ${corner === "br" ? "bottom-1.5 right-1.5 border-b-2 border-r-2" : ""}`}
                  aria-hidden
                />
              ))}

              <ScanLineOverlay active={status === "processing"} />

              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Enrolled face preview"
                  className="w-full h-full object-cover"
                />
              ) : cameraActive ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover scale-x-[-1]"
                  playsInline
                  muted
                  aria-label="Camera viewfinder"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  {cameraError ? (
                    <>
                      <Camera className="w-8 h-8 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground text-center px-4">
                        {cameraError}
                      </p>
                    </>
                  ) : (
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  )}
                </div>
              )}

              {/* Result overlay */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-background/60"
                  >
                    <CheckCircle2 className="w-14 h-14 text-[#39ff14]" />
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-background/60"
                  >
                    <XCircle className="w-14 h-14 text-destructive" />
                  </motion.div>
                )}
              </AnimatePresence>

              <canvas
                ref={canvasRef}
                width={320}
                height={240}
                className="hidden"
              />
            </div>

            {/* Status message */}
            <motion.p
              key={status}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center text-xs font-mono tracking-widest uppercase ${statusConfig[status].color}`}
              data-ocid="face_enroll.status"
            >
              {statusConfig[status].text}
            </motion.p>

            {/* Action buttons */}
            <div className="space-y-2">
              {(status === "idle" || status === "capturing") && (
                <button
                  type="button"
                  onClick={() => void captureAndSave()}
                  disabled={!cameraActive || status === "capturing"}
                  className="btn-cyan w-full flex items-center justify-center gap-2"
                  data-ocid="face_enroll.capture_save_button"
                >
                  <Camera className="w-4 h-4" />
                  Capture &amp; Save
                </button>
              )}

              {status === "processing" && (
                <div className="w-full flex items-center justify-center gap-2 py-3 text-primary text-sm font-mono uppercase tracking-widest">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing…
                </div>
              )}

              {status === "success" && (
                <button
                  type="button"
                  onClick={() => void navigate({ to: "/settings" })}
                  className="btn-cyan w-full flex items-center justify-center gap-2"
                  data-ocid="face_enroll.done_button"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Done — Back to Settings
                </button>
              )}

              {status === "error" && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="btn-cyan w-full flex items-center justify-center gap-2"
                  data-ocid="face_enroll.retry_button"
                >
                  Retry Capture
                </button>
              )}

              {/* Clear enrolled face */}
              {status === "success" && hasEnrolled && (
                <button
                  type="button"
                  onClick={() => void handleClearFace()}
                  disabled={clearMut.isPending}
                  className="w-full py-2.5 px-3 rounded-md text-xs font-semibold uppercase tracking-widest transition-smooth flex items-center justify-center gap-2 border border-destructive/30 text-destructive/70 hover:border-destructive hover:text-destructive bg-card/30"
                  data-ocid="face_enroll.clear_enrolled_button"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Enrolled Face
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-border/20 text-center">
            <button
              type="button"
              onClick={() => void navigate({ to: "/settings" })}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-1.5 mx-auto"
              data-ocid="face_enroll.back_to_settings_link"
            >
              <Settings className="w-3.5 h-3.5" />
              Back to Settings
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="hud-label opacity-30">
            BIOMETRIC DATA SECURED · LOCAL PROCESSING ONLY
          </p>
        </div>
      </motion.div>
    </div>
  );
}
