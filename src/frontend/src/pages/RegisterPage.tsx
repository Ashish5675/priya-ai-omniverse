import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Lock, Mail, User, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useRegister } from "../hooks/useAuth";

// ─── Floating Particles (shared visual identity with login) ───────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-label="Decorative particle animation"
    />
  );
}

// ─── Strength indicator ───────────────────────────────────────────────────────
function getPasswordStrength(pwd: string): {
  level: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { level: 1, label: "Weak", color: "bg-destructive" };
  if (score <= 2) return { level: 2, label: "Fair", color: "bg-yellow-500" };
  if (score <= 3) return { level: 3, label: "Good", color: "bg-primary/70" };
  return { level: 4, label: "Strong", color: "bg-primary" };
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function RegisterPage() {
  const navigate = useNavigate();
  const registerMut = useRegister();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");

  const pwdStrength = password ? getPasswordStrength(password) : null;

  const validate = (): boolean => {
    let valid = true;

    if (!name.trim()) {
      setNameError("Full name is required");
      valid = false;
    } else if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmError("Please confirm your password");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      valid = false;
    } else {
      setConfirmError("");
    }

    return valid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    try {
      await registerMut.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      void navigate({ to: "/" });
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background scanline-overlay flex items-center justify-center p-4 relative overflow-hidden">
      <ParticleField />

      {/* Radial glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.58 0.17 282 / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.18 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md relative z-10"
        data-ocid="register.panel"
      >
        {/* Priya Logo */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex flex-col items-center gap-3"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            <div className="relative w-16 h-16">
              <div
                className="absolute inset-0 rounded-2xl bg-secondary/10 border-2 border-secondary/40"
                style={{ boxShadow: "0 0 20px oklch(0.58 0.17 282 / 0.4)" }}
              />
              <Zap className="absolute inset-0 m-auto w-8 h-8 text-secondary" />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold tracking-[0.15em] text-foreground">
                PRIYA
              </h1>
              <p className="hud-label opacity-60 mt-1">NEW USER REGISTRATION</p>
            </div>
          </motion.div>
        </div>

        {/* Form Panel */}
        <div
          className="glass-form corner-brackets relative"
          data-ocid="register.form_panel"
        >
          <div className="hud-label absolute top-2 left-4 opacity-50">
            IDENTITY INITIALIZATION
          </div>

          {/* Server error */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 mb-2 px-3 py-2 rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-sm"
              data-ocid="register.error_state"
            >
              {serverError}
            </motion.div>
          )}

          <form
            onSubmit={handleRegister}
            noValidate
            className="space-y-4 mt-6"
            data-ocid="register.form"
          >
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="reg-name" className="hud-label block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <input
                  id="reg-name"
                  type="text"
                  placeholder="Ashish Kumar"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  onBlur={() => {
                    if (!name.trim()) setNameError("Full name is required");
                    else if (name.trim().length < 2)
                      setNameError("Name must be at least 2 characters");
                  }}
                  className={`input-holographic pl-10 ${nameError ? "border-destructive" : ""}`}
                  autoComplete="name"
                  data-ocid="register.name_input"
                />
              </div>
              {nameError && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="register.name.field_error"
                >
                  {nameError}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="reg-email" className="hud-label block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <input
                  id="reg-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  onBlur={() => {
                    if (!email.trim()) setEmailError("Email is required");
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                      setEmailError("Enter a valid email address");
                  }}
                  className={`input-holographic pl-10 ${emailError ? "border-destructive" : ""}`}
                  autoComplete="email"
                  data-ocid="register.email_input"
                />
              </div>
              {emailError && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="register.email.field_error"
                >
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="reg-password" className="hud-label block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <input
                  id="reg-password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  onBlur={() => {
                    if (!password) setPasswordError("Password is required");
                    else if (password.length < 6)
                      setPasswordError(
                        "Password must be at least 6 characters",
                      );
                  }}
                  className={`input-holographic pl-10 pr-10 ${passwordError ? "border-destructive" : ""}`}
                  autoComplete="new-password"
                  data-ocid="register.password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="register.password.field_error"
                >
                  {passwordError}
                </p>
              )}
              {/* Strength bar */}
              {pwdStrength && !passwordError && (
                <div className="mt-1.5 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((seg) => (
                      <div
                        key={seg}
                        className={`h-1 flex-1 rounded-full transition-smooth ${
                          seg <= pwdStrength.level
                            ? pwdStrength.color
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    Password strength: {pwdStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="reg-confirm" className="hud-label block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                <input
                  id="reg-confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmError("");
                  }}
                  onBlur={() => {
                    if (!confirmPassword)
                      setConfirmError("Please confirm your password");
                    else if (password !== confirmPassword)
                      setConfirmError("Passwords do not match");
                  }}
                  className={`input-holographic pl-10 pr-10 ${confirmError ? "border-destructive" : ""}`}
                  autoComplete="new-password"
                  data-ocid="register.confirm_password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {confirmError && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="register.confirm.field_error"
                >
                  {confirmError}
                </p>
              )}
              {!confirmError &&
                confirmPassword &&
                password === confirmPassword && (
                  <p className="text-primary text-xs mt-1">Passwords match</p>
                )}
            </div>

            <button
              type="submit"
              disabled={registerMut.isPending}
              className="btn-cyan w-full flex items-center justify-center gap-2 mt-2"
              data-ocid="register.submit_button"
            >
              {registerMut.isPending && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              Create Account
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-6 pt-4 border-t border-border/20 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary hover:text-primary/80 transition-colors font-semibold underline-offset-4 hover:underline"
                data-ocid="register.login_link"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* System status */}
        <div className="mt-4 text-center">
          <p className="hud-label opacity-30">
            ARIA NEURAL CORE · IDENTITY PROTOCOL
          </p>
        </div>
      </motion.div>
    </div>
  );
}
