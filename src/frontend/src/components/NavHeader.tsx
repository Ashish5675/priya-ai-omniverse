import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Brain,
  CameraOff,
  ChevronLeft,
  ChevronRight,
  Code2,
  CreditCard,
  Globe,
  Hammer,
  Home,
  LineChart,
  LogIn,
  LogOut,
  MapPin,
  MessageCircle,
  MonitorPlay,
  Phone,
  Scale,
  Settings,
  Shield,
  UserCheck,
  Users2,
  Wifi,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useLogout } from "../hooks/useAuth";
import { useAriaStore } from "../store/useAriaStore";
import type { Language, SubscriptionTier } from "../types";

// ─── Language config ───────────────────────────────────────────────────────────

const LANG_OPTIONS: { value: Language; abbr: string; label: string }[] = [
  { value: "english", abbr: "EN", label: "English" },
  { value: "hindi", abbr: "हि", label: "हिन्दी" },
  { value: "nagpuri", abbr: "NG", label: "Nagpuri" },
];

// ─── Tier badge ───────────────────────────────────────────────────────────────

const TIER_STYLES: Record<
  SubscriptionTier,
  { label: string; className: string }
> = {
  free: {
    label: "FREE",
    className:
      "bg-muted/60 border border-border/50 text-muted-foreground font-mono text-[10px] px-1.5 py-0.5 rounded tracking-widest",
  },
  pro: {
    label: "PRO",
    className:
      "bg-primary/15 border border-primary/50 text-primary font-mono text-[10px] px-1.5 py-0.5 rounded tracking-widest",
  },
  enterprise: {
    label: "ENT",
    className:
      "bg-secondary/15 border border-secondary/50 text-secondary font-mono text-[10px] px-1.5 py-0.5 rounded tracking-widest",
  },
};

function TierBadge({ tier }: { tier: SubscriptionTier | null }) {
  if (!tier) return null;
  const { label, className } = TIER_STYLES[tier];
  return (
    <span className={className} data-ocid="nav.tier_badge">
      {label}
    </span>
  );
}

// ─── Language Selector ────────────────────────────────────────────────────────

function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useAriaStore();
  const current =
    LANG_OPTIONS.find((l) => l.value === language) ?? LANG_OPTIONS[0];

  return (
    <div className="relative" data-ocid="nav.language_selector">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/40 hover:border-primary/60 hover:glow-cyan transition-smooth text-muted-foreground hover:text-primary text-xs font-mono"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{current.abbr}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-36 glass-panel border border-primary/30 rounded-lg overflow-hidden z-50 shadow-lg"
          >
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setLanguage(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-mono transition-smooth hover:bg-primary/10 hover:text-primary ${
                  language === opt.value
                    ? "bg-primary/15 text-primary border-l-2 border-primary"
                    : "text-muted-foreground"
                }`}
                data-ocid={`nav.language_option.${opt.value}`}
              >
                <span className="w-6 text-center font-bold">{opt.abbr}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── NavHeader ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { to: "/", icon: MessageCircle, label: "Chat", ocid: "nav.chat_link" },
  { to: "/home", icon: Home, label: "Homepage", ocid: "nav.home_link" },
  {
    to: "/pricing",
    icon: CreditCard,
    label: "Subscription",
    ocid: "nav.pricing_link",
  },
  {
    to: "/presentation",
    icon: MonitorPlay,
    label: "Presentation",
    ocid: "nav.presentation_link",
  },
  { to: "/agents", icon: Brain, label: "Agents", ocid: "nav.agents_link" },
  {
    to: "/knowledge",
    icon: BookOpen,
    label: "Knowledge",
    ocid: "nav.knowledge_link",
  },
  { to: "/drone", icon: CameraOff, label: "Drone", ocid: "nav.drone_link" },
  { to: "/calls", icon: Phone, label: "Calls", ocid: "nav.calls_link" },
  { to: "/legal", icon: Scale, label: "Legal AI", ocid: "nav.legal_link" },
  {
    to: "/tracking",
    icon: MapPin,
    label: "Tracking",
    ocid: "nav.tracking_link",
  },
  {
    to: "/trading",
    icon: LineChart,
    label: "Trading",
    ocid: "nav.trading_link",
  },
  {
    to: "/voice-enroll",
    icon: UserCheck,
    label: "Voice ID",
    ocid: "nav.voice_enroll_link",
  },
  {
    to: "/ai-developer",
    icon: Code2,
    label: "AI Developer",
    ocid: "nav.ai_developer_link",
  },
  {
    to: "/multi-agent",
    icon: Users2,
    label: "Multi-Agent",
    ocid: "nav.multi_agent_link",
  },
  {
    to: "/insights-dashboard",
    icon: BarChart3,
    label: "Insights",
    ocid: "nav.insights_dashboard_link",
  },
  {
    to: "/auto-build",
    icon: Hammer,
    label: "Auto Build",
    ocid: "nav.auto_build_link",
  },
] as const;

const ADMIN_LINKS = [
  { to: "/admin", icon: Shield, label: "Admin", ocid: "nav.admin_link" },
  {
    to: "/analytics",
    icon: BarChart3,
    label: "Analytics",
    ocid: "nav.analytics_link",
  },
] as const;

export function NavHeader() {
  const navigate = useNavigate();
  const {
    avatarMood,
    isAuthenticated,
    currentUser,
    subscriptionTier,
    userRole,
    isVoiceListening,
    activeAgentChain,
  } = useAriaStore();
  const logoutMut = useLogout();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const statusColor =
    avatarMood === "idle"
      ? "bg-primary"
      : avatarMood === "thinking"
        ? "bg-yellow-400"
        : avatarMood === "speaking"
          ? "bg-green-400"
          : "bg-red-400";

  const handleLogout = async () => {
    try {
      await logoutMut.mutateAsync();
      toast.success("Logged out successfully");
      void navigate({ to: "/login" });
    } catch {
      toast.error("Logout failed");
    }
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  const allNavLinks = [
    ...NAV_LINKS,
    ...(userRole === "admin" ? ADMIN_LINKS : []),
  ];

  return (
    <header
      className="sticky top-0 z-50 glass-panel border-b border-primary/20"
      data-ocid="nav-header"
    >
      {/* Top bar: logo + right controls */}
      <div className="px-4 py-2">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <motion.div
              className="w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center glow-cyan"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Zap className="w-3.5 h-3.5 text-primary" />
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-sm text-foreground tracking-widest uppercase leading-none">
                PRIYA AI
              </span>
              <span className="text-[9px] text-primary/70 font-mono tracking-wider uppercase">
                OMNIVERSE GOD+
              </span>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Status indicators */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Wifi className="w-3 h-3 text-primary" />
              <span className="text-primary text-[10px]">ONLINE</span>

              {isVoiceListening && (
                <motion.span
                  className="w-2 h-2 rounded-full bg-[#39FF14]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  title="Voice active"
                  data-ocid="nav.voice_indicator"
                />
              )}

              {activeAgentChain && activeAgentChain.status === "running" && (
                <span
                  className="flex items-center gap-1 text-primary/80 text-[10px]"
                  data-ocid="nav.agent_badge"
                >
                  <motion.span
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  {activeAgentChain.tasks.length} tasks
                </span>
              )}

              <span className="mx-0.5 text-muted-foreground/40">|</span>
              <span
                className={`w-2 h-2 rounded-full ${statusColor} animate-pulse-glow`}
              />
              <span className="capitalize text-[10px]">{avatarMood}</span>
            </div>

            <LanguageSelector />

            <Link
              to="/settings"
              className="p-1.5 rounded-lg border border-border/40 hover:border-primary/60 hover:glow-cyan transition-smooth text-muted-foreground hover:text-primary"
              data-ocid="nav.settings_link"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <TierBadge tier={subscriptionTier} />
                {currentUser && (
                  <span className="hidden lg:block text-xs font-mono text-muted-foreground max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="p-1.5 rounded-lg border border-border/40 hover:border-destructive/60 transition-smooth text-muted-foreground hover:text-destructive"
                  data-ocid="nav.logout_button"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-cyan text-xs"
                data-ocid="nav.login_link"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Carousel nav row */}
      <div className="relative px-12 border-t border-primary/10">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="nav-carousel-btn left"
          aria-label="Scroll navigation left"
          data-ocid="nav.scroll_left_button"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable card track */}
        <nav
          ref={scrollRef}
          className="nav-carousel-container px-1 py-2"
          aria-label="Main navigation"
        >
          {allNavLinks.map(({ to, icon: Icon, label, ocid }) => {
            const isActive =
              pathname === to || (to !== "/" && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                data-ocid={ocid}
                className={`nav-card group ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <motion.div
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-mono tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground group-hover:text-primary"
                    }`}
                  >
                    {label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => scroll("right")}
          className="nav-carousel-btn right"
          aria-label="Scroll navigation right"
          data-ocid="nav.scroll_right_button"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
