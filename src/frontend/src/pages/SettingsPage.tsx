import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Key,
  Palette,
  Save,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useClearHistory,
  useGetSettings,
  useSaveSettings,
} from "../hooks/useConversation";
import { useAriaStore } from "../store/useAriaStore";

// ─── Data ────────────────────────────────────────────────────────────────────

const PERSONALITY_OPTIONS = [
  {
    id: "professional",
    label: "Professional",
    desc: "Precise, focused, efficient. Optimal for high-stakes work tasks.",
    icon: "◈",
  },
  {
    id: "friendly",
    label: "Friendly",
    desc: "Warm, conversational, empathetic. Great for casual use and creativity.",
    icon: "◎",
  },
  {
    id: "mysterious",
    label: "Mysterious",
    desc: "Enigmatic, philosophical, thought-provoking. For deep exploration.",
    icon: "◉",
  },
];

const GLOW_PRESETS = [
  { value: "#00d9ff", label: "Cyan" },
  { value: "#7c3aed", label: "Purple" },
  { value: "#0066ff", label: "Electric Blue" },
];

// ─── Avatar Orb Preview ───────────────────────────────────────────────────────

function AvatarOrbPreview({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    const draw = (timestamp: number) => {
      timeRef.current = timestamp;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const t = timestamp * 0.001;

      // Outer glow ring
      const outerGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, 95);
      outerGrad.addColorStop(0, `${color}00`);
      outerGrad.addColorStop(0.6, `${color}18`);
      outerGrad.addColorStop(1, `${color}40`);
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.fillStyle = outerGrad;
      ctx.fill();

      // Pulsing ring
      const pulse = 0.8 + Math.sin(t * 1.5) * 0.15;
      ctx.beginPath();
      ctx.arc(cx, cy, 60 * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}60`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Core orb
      const orbGrad = ctx.createRadialGradient(cx - 10, cy - 10, 5, cx, cy, 45);
      orbGrad.addColorStop(0, `${color}ff`);
      orbGrad.addColorStop(0.4, `${color}cc`);
      orbGrad.addColorStop(0.8, `${color}44`);
      orbGrad.addColorStop(1, `${color}00`);
      ctx.beginPath();
      ctx.arc(cx, cy, 45, 0, Math.PI * 2);
      ctx.fillStyle = orbGrad;
      ctx.fill();

      // Rotating neural arcs
      for (let i = 0; i < 4; i++) {
        const angle = t * 0.8 + (i * Math.PI) / 2;
        const r = 65;
        ctx.beginPath();
        ctx.arc(cx, cy, r, angle, angle + Math.PI * 0.4);
        ctx.strokeStyle = `${color}${i % 2 === 0 ? "80" : "40"}`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Inner sparkle dots
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + t * 0.5;
        const dist = 28 + Math.sin(t * 2 + i) * 8;
        const dx = cx + Math.cos(a) * dist;
        const dy = cy + Math.sin(a) * dist;
        const alpha = 0.4 + Math.sin(t * 3 + i * 1.2) * 0.3;
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.round(alpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [color]);

  return (
    <div
      className="relative w-[200px] h-[200px] rounded-2xl overflow-hidden glass-panel flex items-center justify-center"
      data-ocid="avatar-orb-preview"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span className="text-[10px] font-mono text-muted-foreground/60 tracking-widest uppercase">
          Avatar Preview
        </span>
      </div>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  icon,
  title,
  ocid,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  ocid: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl p-6"
      data-ocid={ocid}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-6 h-6 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h2 className="font-display font-semibold text-sm tracking-widest uppercase text-foreground">
          {title}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
      </div>
      {children}
    </motion.section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function SettingsPage() {
  const { settings, updateSettings } = useAriaStore();
  const [glowColor, setGlowColor] = useState(settings.glowColor);
  const [personality, setPersonality] = useState(
    settings.personality || "professional",
  );
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [showKey, setShowKey] = useState(false);
  const [customColor, setCustomColor] = useState("");

  const { data: backendSettings, isLoading: loadingSettings } =
    useGetSettings();
  const saveMutation = useSaveSettings();
  const clearHistory = useClearHistory();

  // Sync from backend on mount
  useEffect(() => {
    if (backendSettings) {
      setPersonality(backendSettings.personality || "professional");
      setGlowColor(backendSettings.glowColor || "#00d9ff");
      setApiKey(backendSettings.apiKey || "");
      updateSettings({
        personality: backendSettings.personality || "professional",
        glowColor: backendSettings.glowColor || "#00d9ff",
        apiKey: backendSettings.apiKey || "",
      });
    }
  }, [backendSettings, updateSettings]);

  const handleColorSelect = (color: string) => {
    setGlowColor(color);
    updateSettings({ glowColor: color });
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomColor(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      setGlowColor(val);
      updateSettings({ glowColor: val });
    }
  };

  const handlePersonalityChange = (val: string) => {
    setPersonality(val);
    updateSettings({ personality: val });
  };

  const handleClearHistory = () => {
    clearHistory.mutate(undefined, {
      onSuccess: () => {
        toast.success("History cleared", {
          description: "All conversation history has been erased.",
        });
      },
      onError: () => {
        toast.error("Failed to clear history");
      },
    });
  };

  const handleSave = () => {
    saveMutation.mutate(
      { personality, glowColor, apiKey },
      {
        onSuccess: () => {
          updateSettings({ personality, glowColor, apiKey });
          toast.success("Configuration saved", {
            description: "ARIA settings have been updated successfully.",
          });
        },
        onError: () => {
          toast.error("Save failed", {
            description: "Unable to persist settings. Please try again.",
          });
        },
      },
    );
  };

  return (
    <div className="flex-1 overflow-auto scanline-overlay">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-mono group"
            data-ocid="settings-back"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Return to ARIA
          </Link>
        </motion.div>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-12 rounded-2xl border border-primary/60 flex items-center justify-center glow-cyan">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl tracking-widest uppercase">
              System Configuration
            </h1>
            <p className="text-sm text-muted-foreground font-mono tracking-wider">
              Customize ARIA&apos;s behavior, appearance &amp; connectivity
            </p>
          </div>
        </motion.div>

        {loadingSettings ? (
          <div className="flex items-center gap-3 py-12 justify-center text-muted-foreground font-mono text-sm">
            <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            Loading configuration...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-6">
            {/* Left column: settings panels */}
            <div className="space-y-5">
              {/* Personality Mode */}
              <SectionCard
                icon={<User className="w-4 h-4" />}
                title="Personality Mode"
                ocid="personality-section"
              >
                <div
                  className="flex flex-col gap-2"
                  data-ocid="personality-selector"
                >
                  {PERSONALITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handlePersonalityChange(opt.id)}
                      aria-pressed={personality === opt.id}
                      className={`flex items-start gap-3 p-4 rounded-xl border text-left cursor-pointer transition-smooth ${
                        personality === opt.id
                          ? "border-primary/60 bg-primary/5 glow-cyan"
                          : "border-border/30 hover:border-border/60 hover:bg-card/50"
                      }`}
                      data-ocid={`personality-opt-${opt.id}`}
                    >
                      <span
                        className={`mt-0.5 text-base font-mono ${personality === opt.id ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {opt.icon}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`font-semibold text-sm ${personality === opt.id ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {opt.label}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-0.5 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                      <div
                        className={`ml-auto mt-1 w-3 h-3 rounded-full border-2 shrink-0 transition-smooth ${
                          personality === opt.id
                            ? "border-primary bg-primary glow-cyan"
                            : "border-border/50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </SectionCard>

              {/* Glow Color */}
              <SectionCard
                icon={<Palette className="w-4 h-4" />}
                title="Avatar Glow Color"
                ocid="glow-color-section"
              >
                <div className="space-y-4">
                  <div className="flex gap-3">
                    {GLOW_PRESETS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => handleColorSelect(preset.value)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-mono transition-smooth ${
                          glowColor === preset.value
                            ? "border-primary/60 bg-primary/10 text-foreground"
                            : "border-border/30 hover:border-border/60 text-muted-foreground hover:bg-card/40"
                        }`}
                        data-ocid={`glow-preset-${preset.label.toLowerCase().replace(" ", "-")}`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 ring-1 ring-white/10"
                          style={{ backgroundColor: preset.value }}
                        />
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Free color input */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg border border-border/40 shrink-0 ring-1 ring-white/5"
                      style={{ backgroundColor: glowColor }}
                    />
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        value={customColor || glowColor}
                        onChange={handleCustomColorChange}
                        placeholder="#00d9ff"
                        className="font-mono text-sm bg-card/50 border-border/40 focus:border-primary/60 pl-3"
                        data-ocid="glow-color-custom-input"
                      />
                    </div>
                    <input
                      type="color"
                      value={glowColor}
                      onChange={(e) => handleColorSelect(e.target.value)}
                      className="w-9 h-9 rounded-lg border border-border/40 cursor-pointer bg-transparent p-0.5"
                      aria-label="Color picker"
                      data-ocid="glow-color-picker"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground/50 font-mono">
                    Enter a valid hex code or use the color picker for custom
                    colors.
                  </p>
                </div>
              </SectionCard>

              {/* API Key */}
              <SectionCard
                icon={<Key className="w-4 h-4" />}
                title="API Configuration"
                ocid="api-key-section"
              >
                <div className="space-y-3">
                  <Label
                    htmlFor="openai-api-key"
                    className="text-sm text-muted-foreground font-mono tracking-wider"
                  >
                    OpenAI API Key
                  </Label>
                  <div className="relative">
                    <Input
                      id="openai-api-key"
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="font-mono text-sm bg-card/50 border-border/40 focus:border-primary/60 pr-20"
                      data-ocid="api-key-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      aria-label={showKey ? "Hide API key" : "Show API key"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      data-ocid="api-key-toggle"
                    >
                      {showKey ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground/50 font-mono leading-relaxed">
                    Your key is encrypted at rest and never logged. Required for
                    live AI responses.
                  </p>
                </div>
              </SectionCard>

              <Separator className="border-border/20" />

              {/* Actions */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <Button
                  variant="destructive"
                  onClick={handleClearHistory}
                  disabled={clearHistory.isPending}
                  className="gap-2 bg-destructive/10 border border-destructive/40 hover:bg-destructive/20 text-destructive font-mono text-sm"
                  data-ocid="clear-history-btn"
                >
                  <Trash2 className="w-4 h-4" />
                  {clearHistory.isPending ? "Clearing..." : "Clear History"}
                </Button>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleSave}
                    disabled={saveMutation.isPending}
                    className="gap-2 bg-primary/20 border border-primary/60 hover:bg-primary/30 hover:glow-cyan text-primary font-mono text-sm transition-smooth"
                    data-ocid="save-settings-btn"
                  >
                    <Save className="w-4 h-4" />
                    {saveMutation.isPending
                      ? "Saving..."
                      : "Save Configuration"}
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Right column: avatar preview */}
            <div className="flex flex-col items-center gap-3 lg:pt-2">
              <AvatarOrbPreview color={glowColor} />
              <div className="text-center space-y-1">
                <p className="text-xs font-mono text-muted-foreground/60 tracking-widest uppercase">
                  Live Preview
                </p>
                <p className="text-xs font-mono text-primary/80 tracking-wider">
                  {PERSONALITY_OPTIONS.find((p) => p.id === personality)
                    ?.label ?? personality}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
