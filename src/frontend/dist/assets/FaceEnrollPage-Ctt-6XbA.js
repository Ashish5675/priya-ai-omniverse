import { i as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence, D as Settings } from "./index-Khuvrpqq.js";
import { a as useHasFaceEnrolled, b as useFaceEnroll, c as useClearFaceData, S as ScanFace } from "./useFaceAuth-ECA5CnHI.js";
import { C as CircleCheck } from "./circle-check-DKp6tXQ-.js";
import { L as LoaderCircle } from "./loader-circle-CP0fZB5d.js";
import { T as Trash2 } from "./trash-2-BpPdCVwr.js";
import { C as Camera } from "./camera-CjBS7uwb.js";
import { C as CircleX } from "./circle-x-CQmfZLMl.js";
function BiometricGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0 pointer-events-none",
      style: {
        backgroundImage: "radial-gradient(circle, oklch(0.7 0.18 200 / 0.35) 1px, transparent 1px)",
        backgroundSize: "18px 18px"
      },
      "aria-hidden": true
    }
  );
}
function ScanLineOverlay({ active }) {
  if (!active) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "absolute left-0 right-0 h-0.5 pointer-events-none z-20",
      style: {
        background: "linear-gradient(90deg, transparent, oklch(0.7 0.18 200 / 0.9), transparent)",
        boxShadow: "0 0 10px oklch(0.7 0.18 200 / 0.8)"
      },
      initial: { top: "0%" },
      animate: { top: ["0%", "100%", "0%"] },
      transition: {
        duration: 2.2,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY
      },
      "aria-hidden": true
    }
  );
}
function FaceEnrollPage() {
  const navigate = useNavigate();
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [status, setStatus] = reactExports.useState("idle");
  const [capturedImage, setCapturedImage] = reactExports.useState(null);
  const [cameraActive, setCameraActive] = reactExports.useState(false);
  const [cameraError, setCameraError] = reactExports.useState("");
  const [errorMessage, setErrorMessage] = reactExports.useState("");
  const { data: hasEnrolled } = useHasFaceEnrolled();
  const enrollMut = useFaceEnroll();
  const clearMut = useClearFaceData();
  const startCamera = reactExports.useCallback(async () => {
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: "user" }
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
  reactExports.useEffect(() => {
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
        err instanceof Error ? err.message : "Enrollment failed."
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
    }
  };
  const handleRetry = () => {
    setCapturedImage(null);
    setStatus("idle");
    void startCamera();
  };
  const statusConfig = {
    idle: {
      text: "Look directly at the camera",
      color: "text-primary"
    },
    capturing: { text: "Capturing…", color: "text-primary" },
    processing: { text: "Encoding biometrics…", color: "text-primary" },
    success: {
      text: "Face enrolled successfully!",
      color: "text-[#39ff14]"
    },
    error: {
      text: errorMessage || "Enrollment failed",
      color: "text-destructive"
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background scanline-overlay flex items-center justify-center p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 pointer-events-none z-0",
        style: {
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.68 0.17 195 / 0.07) 0%, transparent 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 pointer-events-none z-0 opacity-[0.06]",
        style: {
          backgroundImage: "linear-gradient(oklch(0.7 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        className: "w-full max-w-md relative z-10",
        "data-ocid": "face_enroll.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "inline-flex flex-col items-center gap-3",
              initial: { scale: 0.9, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { delay: 0.1, duration: 0.4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-14 h-14", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-xl bg-primary/10 border-2 border-primary/40 animate-pulse-glow" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ScanFace, { className: "absolute inset-0 m-auto w-7 h-7 text-primary" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-[0.12em] text-foreground", children: "FACE ENROLL" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label opacity-60 mt-1", children: "BIOMETRIC REGISTRATION MODULE" })
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasEnrolled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "mb-4 px-4 py-3 rounded-md border border-primary/30 bg-primary/10 text-primary text-xs font-mono flex items-center justify-between gap-3",
              "data-ocid": "face_enroll.already_enrolled_notice",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 flex-shrink-0" }),
                  "Face already enrolled"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => void handleClearFace(),
                    disabled: clearMut.isPending,
                    className: "flex items-center gap-1 text-destructive hover:text-destructive/80 transition-colors text-xs uppercase tracking-wider",
                    "data-ocid": "face_enroll.clear_button",
                    children: [
                      clearMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                      "Clear"
                    ]
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-form corner-brackets relative",
              "data-ocid": "face_enroll.form_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label absolute top-2 left-4 opacity-50", children: "BIOMETRIC CAPTURE" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "relative mx-auto w-[280px] h-[210px] rounded-lg overflow-hidden border-2 border-primary/50 bg-background",
                      "data-ocid": "face_enroll.viewfinder",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BiometricGrid, {}),
                        ["tl", "tr", "bl", "br"].map((corner) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `absolute w-6 h-6 border-primary ${corner === "tl" ? "top-1.5 left-1.5 border-t-2 border-l-2" : ""} ${corner === "tr" ? "top-1.5 right-1.5 border-t-2 border-r-2" : ""} ${corner === "bl" ? "bottom-1.5 left-1.5 border-b-2 border-l-2" : ""} ${corner === "br" ? "bottom-1.5 right-1.5 border-b-2 border-r-2" : ""}`,
                            "aria-hidden": true
                          },
                          corner
                        )),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLineOverlay, { active: status === "processing" }),
                        capturedImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: capturedImage,
                            alt: "Enrolled face preview",
                            className: "w-full h-full object-cover"
                          }
                        ) : cameraActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "video",
                          {
                            ref: videoRef,
                            className: "w-full h-full object-cover scale-x-[-1]",
                            playsInline: true,
                            muted: true,
                            "aria-label": "Camera viewfinder"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex flex-col items-center justify-center gap-2", children: cameraError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-8 h-8 text-muted-foreground" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center px-4", children: cameraError })
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 text-primary animate-spin" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
                          status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              initial: { scale: 0, opacity: 0 },
                              animate: { scale: 1, opacity: 1 },
                              className: "absolute inset-0 flex items-center justify-center bg-background/60",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-14 h-14 text-[#39ff14]" })
                            }
                          ),
                          status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              initial: { scale: 0, opacity: 0 },
                              animate: { scale: 1, opacity: 1 },
                              className: "absolute inset-0 flex items-center justify-center bg-background/60",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-14 h-14 text-destructive" })
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "canvas",
                          {
                            ref: canvasRef,
                            width: 320,
                            height: 240,
                            className: "hidden"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.p,
                    {
                      initial: { opacity: 0, y: -4 },
                      animate: { opacity: 1, y: 0 },
                      className: `text-center text-xs font-mono tracking-widest uppercase ${statusConfig[status].color}`,
                      "data-ocid": "face_enroll.status",
                      children: statusConfig[status].text
                    },
                    status
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    (status === "idle" || status === "capturing") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => void captureAndSave(),
                        disabled: !cameraActive || status === "capturing",
                        className: "btn-cyan w-full flex items-center justify-center gap-2",
                        "data-ocid": "face_enroll.capture_save_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
                          "Capture & Save"
                        ]
                      }
                    ),
                    status === "processing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex items-center justify-center gap-2 py-3 text-primary text-sm font-mono uppercase tracking-widest", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                      "Processing…"
                    ] }),
                    status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => void navigate({ to: "/settings" }),
                        className: "btn-cyan w-full flex items-center justify-center gap-2",
                        "data-ocid": "face_enroll.done_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                          "Done — Back to Settings"
                        ]
                      }
                    ),
                    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleRetry,
                        className: "btn-cyan w-full flex items-center justify-center gap-2",
                        "data-ocid": "face_enroll.retry_button",
                        children: "Retry Capture"
                      }
                    ),
                    status === "success" && hasEnrolled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => void handleClearFace(),
                        disabled: clearMut.isPending,
                        className: "w-full py-2.5 px-3 rounded-md text-xs font-semibold uppercase tracking-widest transition-smooth flex items-center justify-center gap-2 border border-destructive/30 text-destructive/70 hover:border-destructive hover:text-destructive bg-card/30",
                        "data-ocid": "face_enroll.clear_enrolled_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                          "Clear Enrolled Face"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-4 border-t border-border/20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => void navigate({ to: "/settings" }),
                    className: "text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-1.5 mx-auto",
                    "data-ocid": "face_enroll.back_to_settings_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-3.5 h-3.5" }),
                      "Back to Settings"
                    ]
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label opacity-30", children: "BIOMETRIC DATA SECURED · LOCAL PROCESSING ONLY" }) })
        ]
      }
    )
  ] });
}
export {
  FaceEnrollPage
};
