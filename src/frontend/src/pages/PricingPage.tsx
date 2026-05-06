import { useNavigate } from "@tanstack/react-router";
import {
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  Crown,
  Loader2,
  MessageCircle,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCancelSubscription,
  useSubscriptionStatus,
  useUpgradeSubscription,
} from "../hooks/useSubscription";
import { useAriaStore } from "../store/useAriaStore";
import type { SubscriptionTier } from "../types";

interface PricingTier {
  id: SubscriptionTier;
  name: string;
  price: string;
  monthly: number;
  period: string;
  description: string;
  icon: typeof Zap;
  features: string[];
  featured: boolean;
  ctaLabel: string;
  accentClass: string;
  badgeLabel?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    monthly: 0,
    period: "forever",
    description: "Begin your journey with Priya — no credit card required.",
    icon: Zap,
    accentClass: "text-primary",
    features: [
      "Basic AI chat with Priya",
      "Standard avatar animations",
      "50 messages per day",
      "Voice interaction (browser)",
      "3 wardrobe selections",
      "Community support",
    ],
    featured: false,
    ctaLabel: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    monthly: 9.99,
    period: "per month",
    description: "Unlock the full Priya experience with premium capabilities.",
    icon: Crown,
    accentClass: "text-secondary",
    badgeLabel: "Most Popular",
    features: [
      "Unlimited AI chat",
      "Enhanced avatar with lip-sync",
      "Emotion detection camera",
      "Full wardrobe library",
      "Voice interaction + synthesis",
      "Persistent conversation memory",
      "Priority support",
    ],
    featured: true,
    ctaLabel: "Upgrade to Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$29.99",
    monthly: 29.99,
    period: "per month",
    description: "Maximum power for teams with dedicated infrastructure.",
    icon: Building2,
    accentClass: "text-primary",
    features: [
      "Everything in Pro",
      "API access & integrations",
      "Custom personality training",
      "Team accounts (up to 10)",
      "Custom avatar skins",
      "Dedicated infrastructure",
      "24/7 dedicated support",
      "SLA guarantee",
    ],
    featured: false,
    ctaLabel: "Subscribe Now",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "Can I cancel my subscription at any time?",
    a: "Yes, absolutely. You can cancel your Pro or Enterprise subscription at any time from this page. Your access continues until the end of the current billing period — no questions asked.",
  },
  {
    q: "What's included in the Pro plan?",
    a: "Pro unlocks unlimited AI conversations with Priya, the enhanced animated avatar with lip-sync and head movement, emotion detection via your webcam, the full wardrobe library with all outfit options, persistent memory across sessions, and priority support.",
  },
  {
    q: "Is my payment information secure?",
    a: "All payments are processed through Stripe, which uses bank-grade encryption and is PCI DSS Level 1 certified. We never store your card details on our servers.",
  },
];

function FaqAccordion({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="glass-panel rounded-lg overflow-hidden transition-smooth"
      data-ocid={`pricing.faq.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-primary/5 transition-smooth"
        aria-expanded={open}
        data-ocid={`pricing.faq_toggle.${index + 1}`}
      >
        <span className="font-semibold text-foreground text-sm">{faq.q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PricingPage() {
  const navigate = useNavigate();
  const subscriptionTier = useAriaStore((s) => s.subscriptionTier);
  const isAuthenticated = useAriaStore((s) => s.isAuthenticated);
  const currentUser = useAriaStore((s) => s.currentUser);

  const { data: status, isLoading: statusLoading } = useSubscriptionStatus();
  const upgradeMut = useUpgradeSubscription();
  const cancelMut = useCancelSubscription();

  const currentTier = status?.tier ?? subscriptionTier ?? "free";
  const isMutating = upgradeMut.isPending || cancelMut.isPending;

  const handleCta = async (tier: SubscriptionTier) => {
    if (tier === "free") {
      if (currentTier !== "free") {
        // Downgrade / cancel
        try {
          await cancelMut.mutateAsync();
          toast.success("Subscription cancelled. You're now on the Free plan.");
        } catch {
          toast.error("Failed to cancel. Please try again.");
        }
      } else {
        void navigate({ to: "/" });
      }
      return;
    }

    if (tier === currentTier) return;

    try {
      await upgradeMut.mutateAsync(tier);
      toast.success(
        `Welcome to ${tier.charAt(0).toUpperCase() + tier.slice(1)}! Priya is ready.`,
      );
    } catch {
      toast.error("Checkout failed. Please try again.", {
        description: "If this persists, contact support.",
      });
    }
  };

  const handleCancel = async () => {
    try {
      await cancelMut.mutateAsync();
      toast.success("Subscription cancelled. You're now on the Free plan.");
    } catch {
      toast.error("Failed to cancel subscription.");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background scanline-overlay">
      {/* Radial background accent */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.58 0.17 282 / 0.12) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 80% 80%, oklch(0.7 0.18 200 / 0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* ── Page Header ─────────────────────────────────── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          data-ocid="pricing.header"
        >
          <div className="hud-label mb-3">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              SUBSCRIPTION PLANS
              <Sparkles className="w-3 h-3" />
            </span>
          </div>
          <h1 className="hero-title font-display mb-5">
            Choose Your Priya Experience
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From casual conversations to enterprise-grade AI deployment — Priya
            scales to meet your needs. Upgrade or cancel anytime.
          </p>
        </motion.div>

        {/* ── Current Plan Status Banner ───────────────────── */}
        {isAuthenticated && (
          <motion.div
            className="mb-12 glass-panel rounded-xl p-5 border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            data-ocid="pricing.current_plan_banner"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center glow-cyan flex-shrink-0">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs hud-label mb-0.5">ACTIVE PLAN</p>
                <p className="text-foreground font-semibold text-sm">
                  {currentUser?.name ?? "User"} —{" "}
                  <span className="text-primary">
                    {statusLoading
                      ? "Loading…"
                      : currentTier.charAt(0).toUpperCase() +
                        currentTier.slice(1)}
                  </span>{" "}
                  plan
                </p>
              </div>
            </div>

            {(currentTier === "pro" || currentTier === "enterprise") && (
              <button
                type="button"
                onClick={() => void handleCancel()}
                disabled={cancelMut.isPending}
                data-ocid="pricing.cancel_button"
                className="btn-outline text-xs px-4 py-2 border-destructive/40 text-destructive hover:border-destructive hover:shadow-[0_0_12px_oklch(0.62_0.21_25_/_0.4)]"
              >
                {cancelMut.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" /> Cancelling…
                  </span>
                ) : (
                  "Cancel Subscription"
                )}
              </button>
            )}
          </motion.div>
        )}

        {/* ── Pricing Cards Grid ───────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-16"
          data-ocid="pricing.cards_list"
        >
          {TIERS.map((tier, i) => {
            const isActive = currentTier === tier.id;
            const isFeatured = tier.featured;
            const TierIcon = tier.icon;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                className={`card-pricing corner-brackets flex flex-col ${isFeatured ? "featured" : ""}`}
                data-ocid={`pricing.tier.${i + 1}`}
              >
                {/* Popular badge */}
                {tier.badgeLabel && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 text-xs font-mono font-bold rounded-full bg-secondary text-secondary-foreground tracking-widest uppercase glow-purple">
                      {tier.badgeLabel}
                    </span>
                  </div>
                )}

                {/* Current plan badge */}
                {isActive && (
                  <div className="absolute -top-3.5 right-4 z-10">
                    <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-primary/20 border border-primary/50 text-primary tracking-wider uppercase">
                      Current
                    </span>
                  </div>
                )}

                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                      isFeatured
                        ? "bg-secondary/15 border-secondary/40 glow-purple"
                        : "bg-primary/10 border-primary/30"
                    }`}
                  >
                    <TierIcon
                      className={`w-5 h-5 ${isFeatured ? "text-secondary" : "text-primary"}`}
                    />
                  </div>
                  <div>
                    <div className="hud-label opacity-60">
                      {tier.name.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Price display */}
                <div className="mb-3">
                  <div className="flex items-end gap-1">
                    <span
                      className={`text-5xl font-display font-bold ${isFeatured ? "text-secondary" : "text-foreground"}`}
                    >
                      {tier.price}
                    </span>
                    {tier.monthly > 0 && (
                      <span className="text-muted-foreground text-sm mb-2 ml-1">
                        / mo
                      </span>
                    )}
                  </div>
                  {tier.monthly === 0 && (
                    <span className="text-muted-foreground text-sm">
                      {tier.period}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed min-h-[2.5rem]">
                  {tier.description}
                </p>

                {/* Divider */}
                <div
                  className={`w-full h-px mb-5 ${isFeatured ? "bg-secondary/30" : "bg-border/30"}`}
                />

                {/* Feature list */}
                <ul
                  className="space-y-2.5 mb-8 flex-1"
                  data-ocid={`pricing.features_list.${i + 1}`}
                >
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isFeatured ? "text-secondary" : "text-primary"}`}
                      />
                      <span className="text-sm text-foreground/85 leading-snug">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => void handleCta(tier.id)}
                  disabled={isActive || isMutating}
                  data-ocid={`pricing.cta_button.${i + 1}`}
                  className={`w-full flex items-center justify-center gap-2 ${
                    isActive
                      ? "btn-outline opacity-50 cursor-default pointer-events-none"
                      : isFeatured
                        ? "btn-cyan"
                        : "btn-outline"
                  }`}
                >
                  {isMutating &&
                  (upgradeMut.isPending || cancelMut.isPending) ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  {isActive ? "Current Plan ✓" : tier.ctaLabel}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* ── Trust Indicators ─────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          data-ocid="pricing.trust_section"
        >
          {[
            {
              icon: Shield,
              title: "Secure Payments",
              desc: "Stripe-powered, PCI DSS compliant",
            },
            {
              icon: Zap,
              title: "Instant Activation",
              desc: "Features unlock immediately after payment",
            },
            {
              icon: MessageCircle,
              title: "Cancel Anytime",
              desc: "No lock-in contracts, no hidden fees",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-panel rounded-lg p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── FAQ Section ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-ocid="pricing.faq_section"
        >
          <div className="text-center mb-8">
            <div className="hud-label mb-2">FAQ</div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQS.map((faq, i) => (
              <FaqAccordion key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── Footer note ──────────────────────────────────── */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-14 font-mono opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          data-ocid="pricing.footer_note"
        >
          All plans include end-to-end encryption and GDPR-compliant data
          handling.
          <br />
          Priya is powered by the ARIA AI system &mdash; built with ❤ by Ashish
          Kumar, Jharkhand Rai University.
        </motion.p>
      </div>
    </div>
  );
}
