import { i as useNavigate, n as useRegister, r as reactExports, j as jsxRuntimeExports, m as motion, Z as Zap } from "./index-Khuvrpqq.js";
import { U as User } from "./user-CjenePbQ.js";
import { M as Mail } from "./mail-BrG595_5.js";
import { L as Lock } from "./lock-CugnE4Qv.js";
import { E as EyeOff } from "./eye-off-OQCBq75A.js";
import { E as Eye } from "./eye-flE3EMrY.js";
import { L as LoaderCircle } from "./loader-circle-CP0fZB5d.js";
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
function getPasswordStrength(pwd) {
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
function RegisterPage() {
  const navigate = useNavigate();
  const registerMut = useRegister();
  const [name, setName] = reactExports.useState("");
  const [nameError, setNameError] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [emailError, setEmailError] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [passwordError, setPasswordError] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [confirmError, setConfirmError] = reactExports.useState("");
  const [showPwd, setShowPwd] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState("");
  const pwdStrength = password ? getPasswordStrength(password) : null;
  const validate = () => {
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
  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    try {
      await registerMut.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        password
      });
      void navigate({ to: "/" });
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background scanline-overlay flex items-center justify-center p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleField, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 pointer-events-none z-0",
        style: {
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.58 0.17 282 / 0.07) 0%, transparent 70%)"
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
        "data-ocid": "register.panel",
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 rounded-2xl bg-secondary/10 border-2 border-secondary/40",
                      style: { boxShadow: "0 0 20px oklch(0.58 0.17 282 / 0.4)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "absolute inset-0 m-auto w-8 h-8 text-secondary" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold tracking-[0.15em] text-foreground", children: "PRIYA" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label opacity-60 mt-1", children: "NEW USER REGISTRATION" })
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-form corner-brackets relative",
              "data-ocid": "register.form_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label absolute top-2 left-4 opacity-50", children: "IDENTITY INITIALIZATION" }),
                serverError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, height: 0 },
                    animate: { opacity: 1, height: "auto" },
                    className: "mt-4 mb-2 px-3 py-2 rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-sm",
                    "data-ocid": "register.error_state",
                    children: serverError
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "form",
                  {
                    onSubmit: handleRegister,
                    noValidate: true,
                    className: "space-y-4 mt-6",
                    "data-ocid": "register.form",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "reg-name", className: "hud-label block", children: "Full Name" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "reg-name",
                              type: "text",
                              placeholder: "Ashish Kumar",
                              value: name,
                              onChange: (e) => {
                                setName(e.target.value);
                                setNameError("");
                              },
                              onBlur: () => {
                                if (!name.trim()) setNameError("Full name is required");
                                else if (name.trim().length < 2)
                                  setNameError("Name must be at least 2 characters");
                              },
                              className: `input-holographic pl-10 ${nameError ? "border-destructive" : ""}`,
                              autoComplete: "name",
                              "data-ocid": "register.name_input"
                            }
                          )
                        ] }),
                        nameError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-destructive text-xs mt-1",
                            "data-ocid": "register.name.field_error",
                            children: nameError
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "reg-email", className: "hud-label block", children: "Email Address" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "reg-email",
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
                              className: `input-holographic pl-10 ${emailError ? "border-destructive" : ""}`,
                              autoComplete: "email",
                              "data-ocid": "register.email_input"
                            }
                          )
                        ] }),
                        emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-destructive text-xs mt-1",
                            "data-ocid": "register.email.field_error",
                            children: emailError
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "reg-password", className: "hud-label block", children: "Password" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "reg-password",
                              type: showPwd ? "text" : "password",
                              placeholder: "Min. 6 characters",
                              value: password,
                              onChange: (e) => {
                                setPassword(e.target.value);
                                setPasswordError("");
                              },
                              onBlur: () => {
                                if (!password) setPasswordError("Password is required");
                                else if (password.length < 6)
                                  setPasswordError(
                                    "Password must be at least 6 characters"
                                  );
                              },
                              className: `input-holographic pl-10 pr-10 ${passwordError ? "border-destructive" : ""}`,
                              autoComplete: "new-password",
                              "data-ocid": "register.password_input"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setShowPwd(!showPwd),
                              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                              "aria-label": showPwd ? "Hide password" : "Show password",
                              children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                            }
                          )
                        ] }),
                        passwordError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-destructive text-xs mt-1",
                            "data-ocid": "register.password.field_error",
                            children: passwordError
                          }
                        ),
                        pwdStrength && !passwordError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4].map((seg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `h-1 flex-1 rounded-full transition-smooth ${seg <= pwdStrength.level ? pwdStrength.color : "bg-muted"}`
                            },
                            seg
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                            "Password strength: ",
                            pwdStrength.label
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "reg-confirm", className: "hud-label block", children: "Confirm Password" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "reg-confirm",
                              type: showConfirm ? "text" : "password",
                              placeholder: "Repeat password",
                              value: confirmPassword,
                              onChange: (e) => {
                                setConfirmPassword(e.target.value);
                                setConfirmError("");
                              },
                              onBlur: () => {
                                if (!confirmPassword)
                                  setConfirmError("Please confirm your password");
                                else if (password !== confirmPassword)
                                  setConfirmError("Passwords do not match");
                              },
                              className: `input-holographic pl-10 pr-10 ${confirmError ? "border-destructive" : ""}`,
                              autoComplete: "new-password",
                              "data-ocid": "register.confirm_password_input"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setShowConfirm(!showConfirm),
                              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                              "aria-label": showConfirm ? "Hide password" : "Show password",
                              children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                            }
                          )
                        ] }),
                        confirmError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-destructive text-xs mt-1",
                            "data-ocid": "register.confirm.field_error",
                            children: confirmError
                          }
                        ),
                        !confirmError && confirmPassword && password === confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-xs mt-1", children: "Passwords match" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "submit",
                          disabled: registerMut.isPending,
                          className: "btn-cyan w-full flex items-center justify-center gap-2 mt-2",
                          "data-ocid": "register.submit_button",
                          children: [
                            registerMut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                            "Create Account"
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-4 border-t border-border/20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
                  "Already have an account?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "/login",
                      className: "text-primary hover:text-primary/80 transition-colors font-semibold underline-offset-4 hover:underline",
                      "data-ocid": "register.login_link",
                      children: "Sign in"
                    }
                  )
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label opacity-30", children: "ARIA NEURAL CORE · IDENTITY PROTOCOL" }) })
        ]
      }
    )
  ] });
}
export {
  RegisterPage
};
