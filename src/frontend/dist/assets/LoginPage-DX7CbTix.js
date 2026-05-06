import { i as useNavigate, k as useLogin, l as useDemoLogin, r as reactExports, j as jsxRuntimeExports, m as motion, Z as Zap, S as Shield, U as UserCheck, A as AnimatePresence } from "./index-Khuvrpqq.js";
import { S as ScanFace, u as useFaceVerify } from "./useFaceAuth-ECA5CnHI.js";
import { M as Mail } from "./mail-BrG595_5.js";
import { L as LoaderCircle } from "./loader-circle-CP0fZB5d.js";
import { L as Lock } from "./lock-CugnE4Qv.js";
import { E as EyeOff } from "./eye-off-OQCBq75A.js";
import { E as Eye } from "./eye-flE3EMrY.js";
import { U as User } from "./user-CjenePbQ.js";
import { C as Camera } from "./camera-CjBS7uwb.js";
import { C as CircleCheck } from "./circle-check-DKp6tXQ-.js";
import { C as CircleX } from "./circle-x-CQmfZLMl.js";
import { R as RefreshCw } from "./refresh-cw-BAeMeO08.js";
function ParticleField() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId;
    const particles = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      drift: (Math.random() - 0.5) * 0.3
    }));
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.7 0.18 200 / ${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "fixed inset-0 pointer-events-none z-0",
      "aria-label": "Decorative particle animation"
    }
  );
}
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
function FaceLoginPanel({
  onSuccess
}) {
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [faceStatus, setFaceStatus] = reactExports.useState("idle");
  const [capturedImage, setCapturedImage] = reactExports.useState(null);
  const [cameraActive, setCameraActive] = reactExports.useState(false);
  const [cameraError, setCameraError] = reactExports.useState("");
  const navigate = useNavigate();
  const faceMut = useFaceVerify();
  const stopCamera = () => {
    if (streamRef.current) {
      for (const t of streamRef.current.getTracks()) t.stop();
      streamRef.current = null;
    }
    setCameraActive(false);
  };
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
      setFaceStatus("idle");
    } catch {
      setCameraError("Camera unavailable. Use Demo Face to test.");
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
  const captureFace = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, 320, 240);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    setCapturedImage(dataUrl);
    setFaceStatus("scanning");
    stopCamera();
    await runVerification(dataUrl);
  };
  const runVerification = async (encoding) => {
    try {
      await faceMut.mutateAsync({ encoding });
      setFaceStatus("success");
      setTimeout(() => {
        onSuccess();
      }, 1e3);
    } catch {
      setFaceStatus("failed");
    }
  };
  const handleDemoFace = async () => {
    setCapturedImage(null);
    setFaceStatus("scanning");
    stopCamera();
    await runVerification("demo-face-encoding-priya-ai");
  };
  const handleRetry = () => {
    setCapturedImage(null);
    setFaceStatus("idle");
    void startCamera();
  };
  const statusMessages = {
    idle: { text: "Position your face in the frame", color: "text-primary" },
    capturing: { text: "Hold still…", color: "text-primary" },
    scanning: { text: "Scanning biometrics…", color: "text-primary" },
    success: { text: "Face verified! Logging in…", color: "text-[#39ff14]" },
    failed: { text: "Face not recognized", color: "text-destructive" }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 12 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -12 },
      transition: { duration: 0.22 },
      className: "mt-6 space-y-4",
      "data-ocid": "login.face_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-[260px] h-[200px] rounded-lg overflow-hidden border-2 border-primary/50 bg-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BiometricGrid, {}),
          ["tl", "tr", "bl", "br"].map((corner) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `absolute w-5 h-5 border-primary/80 ${corner === "tl" ? "top-1 left-1 border-t-2 border-l-2" : ""} ${corner === "tr" ? "top-1 right-1 border-t-2 border-r-2" : ""} ${corner === "bl" ? "bottom-1 left-1 border-b-2 border-l-2" : ""} ${corner === "br" ? "bottom-1 right-1 border-b-2 border-r-2" : ""}`,
              "aria-hidden": true
            },
            corner
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLineOverlay, { active: faceStatus === "scanning" }),
          capturedImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: capturedImage,
              alt: "Captured face",
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
            faceStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                className: "absolute inset-0 flex items-center justify-center bg-background/60",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-[#39ff14]" })
              }
            ),
            faceStatus === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                className: "absolute inset-0 flex items-center justify-center bg-background/60",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-12 h-12 text-destructive" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, width: 320, height: 240, className: "hidden" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: -4 },
            animate: { opacity: 1, y: 0 },
            className: `text-center text-xs font-mono tracking-widest uppercase ${statusMessages[faceStatus].color}`,
            "data-ocid": "login.face_status",
            children: statusMessages[faceStatus].text
          },
          faceStatus
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          (faceStatus === "idle" || faceStatus === "capturing") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => void captureFace(),
              disabled: !cameraActive || faceStatus === "capturing",
              className: "btn-cyan w-full flex items-center justify-center gap-2",
              "data-ocid": "login.face_capture_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
                "Capture Face"
              ]
            }
          ),
          faceStatus === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleRetry,
              className: "btn-cyan w-full flex items-center justify-center gap-2",
              "data-ocid": "login.face_retry_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                "Try Again"
              ]
            }
          ),
          faceStatus === "scanning" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex items-center justify-center gap-2 py-3 text-primary text-sm font-mono uppercase tracking-widest", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            "Verifying…"
          ] }),
          (faceStatus === "idle" || faceStatus === "failed") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => void handleDemoFace(),
              className: "w-full py-2.5 px-3 rounded-md text-xs font-semibold uppercase tracking-widest transition-smooth flex items-center justify-center gap-2 border border-primary/30 text-primary/70 hover:border-primary hover:text-primary bg-card/30",
              "data-ocid": "login.face_demo_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScanFace, { className: "w-3.5 h-3.5" }),
                "Use Demo Face"
              ]
            }
          ),
          faceStatus === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-1", children: [
            "Or",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => void navigate({ to: "/login" }),
                className: "text-primary hover:text-primary/80 transition-colors font-semibold",
                "data-ocid": "login.face_use_password_link",
                children: "use password instead"
              }
            )
          ] })
        ] })
      ]
    },
    "face"
  );
}
function LoginPage() {
  const navigate = useNavigate();
  const loginMut = useLogin();
  const demoMut = useDemoLogin();
  const [mode, setMode] = reactExports.useState("standard");
  const [email, setEmail] = reactExports.useState("");
  const [emailError, setEmailError] = reactExports.useState("");
  const [stdPassword, setStdPassword] = reactExports.useState("");
  const [stdPasswordError, setStdPasswordError] = reactExports.useState("");
  const [showStdPwd, setShowStdPwd] = reactExports.useState(false);
  const [adminUser, setAdminUser] = reactExports.useState("");
  const [adminUserError, setAdminUserError] = reactExports.useState("");
  const [adminPassword, setAdminPassword] = reactExports.useState("");
  const [adminPasswordError, setAdminPasswordError] = reactExports.useState("");
  const [showAdminPwd, setShowAdminPwd] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState("");
  const isLoading = loginMut.isPending || demoMut.isPending;
  const handleStandardLogin = async (e) => {
    e.preventDefault();
    setServerError("");
    let valid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!stdPassword) {
      setStdPasswordError("Password is required");
      valid = false;
    } else {
      setStdPasswordError("");
    }
    if (!valid) return;
    try {
      if (email === "demo@priya.ai" && stdPassword === "password123") {
        await demoMut.mutateAsync();
      } else {
        await loginMut.mutateAsync({ username: email, password: stdPassword });
      }
      void navigate({ to: "/" });
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Login failed. Please check your credentials."
      );
    }
  };
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setServerError("");
    let valid = true;
    if (!adminUser.trim()) {
      setAdminUserError("Username is required");
      valid = false;
    } else {
      setAdminUserError("");
    }
    if (!adminPassword) {
      setAdminPasswordError("Password is required");
      valid = false;
    } else {
      setAdminPasswordError("");
    }
    if (!valid) return;
    try {
      await loginMut.mutateAsync({
        username: adminUser,
        password: adminPassword
      });
      void navigate({ to: "/" });
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Admin login failed. Check credentials."
      );
    }
  };
  const handleDemoLogin = async () => {
    setServerError("");
    try {
      await demoMut.mutateAsync();
      void navigate({ to: "/" });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Demo login failed.");
    }
  };
  const hudLabel = mode === "admin" ? "ADMIN VERIFICATION" : mode === "face" ? "BIOMETRIC VERIFICATION" : "HOLOGRAPHIC VERIFICATION";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background scanline-overlay flex items-center justify-center p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleField, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 pointer-events-none z-0",
        style: {
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.7 0.18 200 / 0.06) 0%, transparent 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 pointer-events-none z-0 opacity-[0.07]",
        style: {
          backgroundImage: "linear-gradient(oklch(0.7 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
        className: "w-full max-w-md relative z-10",
        "data-ocid": "login.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "inline-flex flex-col items-center gap-3",
              initial: { scale: 0.85, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { delay: 0.1, duration: 0.45 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-primary/10 border-2 border-primary/40 animate-pulse-glow" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "absolute inset-0 m-auto w-8 h-8 text-primary" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold tracking-[0.15em] text-foreground", children: "PRIYA" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label opacity-60 mt-1", children: "AI ASSISTANT SYSTEM v2.0" })
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-6", "data-ocid": "login.access_mode_selector", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setMode("standard");
                  setServerError("");
                },
                "data-ocid": "login.standard_tab",
                className: `flex-1 py-2.5 px-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-smooth flex items-center justify-center gap-1.5 border ${mode === "standard" ? "bg-primary/15 border-primary text-primary glow-cyan" : "border-border/30 text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }),
                  "Login"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setMode("admin");
                  setServerError("");
                },
                "data-ocid": "login.admin_tab",
                className: `flex-1 py-2.5 px-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-smooth flex items-center justify-center gap-1.5 border ${mode === "admin" ? "bg-secondary/15 border-secondary text-secondary" : "border-border/30 text-muted-foreground hover:border-secondary/40 hover:text-foreground bg-card/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
                  "Admin"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setMode("face");
                  setServerError("");
                },
                "data-ocid": "login.face_tab",
                className: `flex-1 py-2.5 px-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-smooth flex items-center justify-center gap-1.5 border ${mode === "face" ? "bg-primary/15 border-primary text-primary glow-cyan" : "border-border/30 text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ScanFace, { className: "w-3.5 h-3.5" }),
                  "Face"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => void handleDemoLogin(),
                disabled: isLoading,
                "data-ocid": "login.demo_button",
                className: "flex-1 py-2.5 px-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-smooth flex items-center justify-center gap-1.5 border border-border/30 text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card/30 disabled:opacity-50",
                children: [
                  demoMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5" }),
                  "Demo"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-form corner-brackets relative",
              "data-ocid": "login.form_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label absolute top-2 left-4 opacity-50", children: hudLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: serverError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, height: 0 },
                    animate: { opacity: 1, height: "auto" },
                    exit: { opacity: 0, height: 0 },
                    className: "mt-4 mb-2 px-3 py-2 rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-sm",
                    "data-ocid": "login.error_state",
                    children: serverError
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
                  mode === "standard" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.form,
                    {
                      initial: { opacity: 0, x: -12 },
                      animate: { opacity: 1, x: 0 },
                      exit: { opacity: 0, x: 12 },
                      transition: { duration: 0.22 },
                      onSubmit: (e) => void handleStandardLogin(e),
                      noValidate: true,
                      className: "space-y-4 mt-6",
                      "data-ocid": "login.standard_form",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "std-email", className: "hud-label block", children: "Email Address" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                id: "std-email",
                                type: "email",
                                placeholder: "your@email.com",
                                value: email,
                                onChange: (e) => {
                                  setEmail(e.target.value);
                                  setEmailError("");
                                },
                                onBlur: () => {
                                  if (!email.trim()) setEmailError("Email is required");
                                  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                    setEmailError("Enter a valid email address");
                                },
                                className: `input-holographic pl-10 ${emailError ? "border-destructive focus:border-destructive" : ""}`,
                                autoComplete: "email",
                                "data-ocid": "login.email_input"
                              }
                            )
                          ] }),
                          emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-destructive text-xs mt-1",
                              "data-ocid": "login.email.field_error",
                              children: emailError
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "std-password", className: "hud-label block", children: "Password" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                id: "std-password",
                                type: showStdPwd ? "text" : "password",
                                placeholder: "Enter password",
                                value: stdPassword,
                                onChange: (e) => {
                                  setStdPassword(e.target.value);
                                  setStdPasswordError("");
                                },
                                onBlur: () => {
                                  if (!stdPassword)
                                    setStdPasswordError("Password is required");
                                },
                                className: `input-holographic pl-10 pr-10 ${stdPasswordError ? "border-destructive" : ""}`,
                                autoComplete: "current-password",
                                "data-ocid": "login.password_input"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setShowStdPwd(!showStdPwd),
                                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                                "aria-label": showStdPwd ? "Hide password" : "Show password",
                                children: showStdPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                              }
                            )
                          ] }),
                          stdPasswordError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-destructive text-xs mt-1",
                              "data-ocid": "login.password.field_error",
                              children: stdPasswordError
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "submit",
                            disabled: isLoading,
                            className: "btn-cyan w-full flex items-center justify-center gap-2 mt-2",
                            "data-ocid": "login.submit_button",
                            children: [
                              loginMut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                              "Sign In"
                            ]
                          }
                        )
                      ]
                    },
                    "standard"
                  ),
                  mode === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.form,
                    {
                      initial: { opacity: 0, x: 12 },
                      animate: { opacity: 1, x: 0 },
                      exit: { opacity: 0, x: -12 },
                      transition: { duration: 0.22 },
                      onSubmit: (e) => void handleAdminLogin(e),
                      noValidate: true,
                      className: "space-y-4 mt-6",
                      "data-ocid": "login.admin_form",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 px-3 py-2 rounded-md border border-secondary/30 bg-secondary/10 text-secondary text-xs font-mono flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                          "Admin credentials: admin / admin123"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "admin-user", className: "hud-label block", children: "Username" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/70" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                id: "admin-user",
                                type: "text",
                                placeholder: "admin",
                                value: adminUser,
                                onChange: (e) => {
                                  setAdminUser(e.target.value);
                                  setAdminUserError("");
                                },
                                onBlur: () => {
                                  if (!adminUser.trim())
                                    setAdminUserError("Username is required");
                                },
                                className: `input-holographic pl-10 border-secondary/40 focus:border-secondary ${adminUserError ? "border-destructive" : ""}`,
                                autoComplete: "username",
                                "data-ocid": "login.admin_username_input"
                              }
                            )
                          ] }),
                          adminUserError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-destructive text-xs mt-1",
                              "data-ocid": "login.admin_username.field_error",
                              children: adminUserError
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "admin-password", className: "hud-label block", children: "Password" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/70" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                id: "admin-password",
                                type: showAdminPwd ? "text" : "password",
                                placeholder: "admin123",
                                value: adminPassword,
                                onChange: (e) => {
                                  setAdminPassword(e.target.value);
                                  setAdminPasswordError("");
                                },
                                onBlur: () => {
                                  if (!adminPassword)
                                    setAdminPasswordError("Password is required");
                                },
                                className: `input-holographic pl-10 pr-10 border-secondary/40 focus:border-secondary ${adminPasswordError ? "border-destructive" : ""}`,
                                autoComplete: "current-password",
                                "data-ocid": "login.admin_password_input"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setShowAdminPwd(!showAdminPwd),
                                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                                "aria-label": showAdminPwd ? "Hide password" : "Show password",
                                children: showAdminPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                              }
                            )
                          ] }),
                          adminPasswordError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-destructive text-xs mt-1",
                              "data-ocid": "login.admin_password.field_error",
                              children: adminPasswordError
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "submit",
                            disabled: isLoading,
                            className: "w-full flex items-center justify-center gap-2 mt-2 py-3 px-6 rounded-md font-semibold uppercase tracking-widest text-sm transition-smooth bg-secondary/20 border-2 border-secondary/60 text-secondary hover:bg-secondary/30 hover:border-secondary disabled:opacity-50",
                            "data-ocid": "login.admin_submit_button",
                            children: [
                              loginMut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                              "Admin Access"
                            ]
                          }
                        )
                      ]
                    },
                    "admin"
                  ),
                  mode === "face" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaceLoginPanel, { onSuccess: () => void navigate({ to: "/" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-4 border-t border-border/20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
                  "No account?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "/register",
                      className: "text-primary hover:text-primary/80 transition-colors font-semibold underline-offset-4 hover:underline",
                      "data-ocid": "login.register_link",
                      children: "Create one"
                    }
                  )
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label opacity-30", children: "ARIA NEURAL CORE · SECURE CHANNEL ACTIVE" }) })
        ]
      }
    )
  ] });
}
export {
  LoginPage
};
