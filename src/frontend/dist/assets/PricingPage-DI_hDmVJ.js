import { c as createLucideIcon, d as useActor, u as useAriaStore, e as useQuery, f as useQueryClient, g as useMutation, s as SubscriptionTier, t as mockBackend, h as createActor, i as useNavigate, j as jsxRuntimeExports, m as motion, S as Shield, Z as Zap, v as MessageCircle, b as ue, r as reactExports, A as AnimatePresence } from "./index-Khuvrpqq.js";
import { S as Sparkles } from "./sparkles-CLTf8qIQ.js";
import { L as LoaderCircle } from "./loader-circle-CP0fZB5d.js";
import { C as Check } from "./check-BeyuTpxD.js";
import { C as ChevronUp } from "./chevron-up-BIQ3il5z.js";
import { C as ChevronDown } from "./chevron-down-DSDUGHV4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode);
function useSubscriptionStatus() {
  const { actor, isFetching } = useActor(createActor);
  const isAuthenticated = useAriaStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      const backend = actor ?? mockBackend;
      const status = await backend.getSubscriptionStatus();
      return {
        active: status.active,
        tier: status.tier,
        startDate: status.startDate
      };
    },
    enabled: !isFetching && isAuthenticated,
    staleTime: 1e3 * 60 * 5
  });
}
function useUpgradeSubscription() {
  const { actor } = useActor(createActor);
  const setSubscriptionTier = useAriaStore((s) => s.setSubscriptionTier);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tier) => {
      const backend = actor ?? mockBackend;
      const tierEnum = tier === "pro" ? SubscriptionTier.pro : tier === "enterprise" ? SubscriptionTier.enterprise : SubscriptionTier.free;
      const success = await backend.upgradeSubscription(tierEnum);
      if (!success) throw new Error("Upgrade failed");
      return tier;
    },
    onSuccess: (tier) => {
      setSubscriptionTier(tier);
      queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    }
  });
}
function useCancelSubscription() {
  const { actor } = useActor(createActor);
  const setSubscriptionTier = useAriaStore((s) => s.setSubscriptionTier);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const backend = actor ?? mockBackend;
      await backend.cancelSubscription();
    },
    onSuccess: () => {
      setSubscriptionTier("free");
      queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    }
  });
}
const TIERS = [
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
      "Community support"
    ],
    featured: false,
    ctaLabel: "Get Started"
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
      "Priority support"
    ],
    featured: true,
    ctaLabel: "Upgrade to Pro"
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
      "SLA guarantee"
    ],
    featured: false,
    ctaLabel: "Subscribe Now"
  }
];
const FAQS = [
  {
    q: "Can I cancel my subscription at any time?",
    a: "Yes, absolutely. You can cancel your Pro or Enterprise subscription at any time from this page. Your access continues until the end of the current billing period — no questions asked."
  },
  {
    q: "What's included in the Pro plan?",
    a: "Pro unlocks unlimited AI conversations with Priya, the enhanced animated avatar with lip-sync and head movement, emotion detection via your webcam, the full wardrobe library with all outfit options, persistent memory across sessions, and priority support."
  },
  {
    q: "Is my payment information secure?",
    a: "All payments are processed through Stripe, which uses bank-grade encryption and is PCI DSS Level 1 certified. We never store your card details on our servers."
  }
];
function FaqAccordion({ faq, index }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-panel rounded-lg overflow-hidden transition-smooth",
      "data-ocid": `pricing.faq.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-primary/5 transition-smooth",
            "aria-expanded": open,
            "data-ocid": `pricing.faq_toggle.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: faq.q }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3", children: faq.a })
          }
        ) })
      ]
    }
  );
}
function PricingPage() {
  const navigate = useNavigate();
  const subscriptionTier = useAriaStore((s) => s.subscriptionTier);
  const isAuthenticated = useAriaStore((s) => s.isAuthenticated);
  const currentUser = useAriaStore((s) => s.currentUser);
  const { data: status, isLoading: statusLoading } = useSubscriptionStatus();
  const upgradeMut = useUpgradeSubscription();
  const cancelMut = useCancelSubscription();
  const currentTier = (status == null ? void 0 : status.tier) ?? subscriptionTier ?? "free";
  const isMutating = upgradeMut.isPending || cancelMut.isPending;
  const handleCta = async (tier) => {
    if (tier === "free") {
      if (currentTier !== "free") {
        try {
          await cancelMut.mutateAsync();
          ue.success("Subscription cancelled. You're now on the Free plan.");
        } catch {
          ue.error("Failed to cancel. Please try again.");
        }
      } else {
        void navigate({ to: "/" });
      }
      return;
    }
    if (tier === currentTier) return;
    try {
      await upgradeMut.mutateAsync(tier);
      ue.success(
        `Welcome to ${tier.charAt(0).toUpperCase() + tier.slice(1)}! Priya is ready.`
      );
    } catch {
      ue.error("Checkout failed. Please try again.", {
        description: "If this persists, contact support."
      });
    }
  };
  const handleCancel = async () => {
    try {
      await cancelMut.mutateAsync();
      ue.success("Subscription cancelled. You're now on the Free plan.");
    } catch {
      ue.error("Failed to cancel subscription.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto bg-background scanline-overlay", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 pointer-events-none",
        style: {
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.58 0.17 282 / 0.12) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 80% 80%, oklch(0.7 0.18 200 / 0.06) 0%, transparent 60%)"
        },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-5xl mx-auto px-4 sm:px-6 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55 },
          "data-ocid": "pricing.header",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
              "SUBSCRIPTION PLANS",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "hero-title font-display mb-5", children: "Choose Your Priya Experience" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed", children: "From casual conversations to enterprise-grade AI deployment — Priya scales to meet your needs. Upgrade or cancel anytime." })
          ]
        }
      ),
      isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "mb-12 glass-panel rounded-xl p-5 border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15, duration: 0.45 },
          "data-ocid": "pricing.current_plan_banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center glow-cyan flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs hud-label mb-0.5", children: "ACTIVE PLAN" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground font-semibold text-sm", children: [
                  (currentUser == null ? void 0 : currentUser.name) ?? "User",
                  " —",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: statusLoading ? "Loading…" : currentTier.charAt(0).toUpperCase() + currentTier.slice(1) }),
                  " ",
                  "plan"
                ] })
              ] })
            ] }),
            (currentTier === "pro" || currentTier === "enterprise") && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => void handleCancel(),
                disabled: cancelMut.isPending,
                "data-ocid": "pricing.cancel_button",
                className: "btn-outline text-xs px-4 py-2 border-destructive/40 text-destructive hover:border-destructive hover:shadow-[0_0_12px_oklch(0.62_0.21_25_/_0.4)]",
                children: cancelMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
                  " Cancelling…"
                ] }) : "Cancel Subscription"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-16",
          "data-ocid": "pricing.cards_list",
          children: TIERS.map((tier, i) => {
            const isActive = currentTier === tier.id;
            const isFeatured = tier.featured;
            const TierIcon = tier.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.1 + i * 0.12, duration: 0.5 },
                className: `card-pricing corner-brackets flex flex-col ${isFeatured ? "featured" : ""}`,
                "data-ocid": `pricing.tier.${i + 1}`,
                children: [
                  tier.badgeLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 left-1/2 -translate-x-1/2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-1 text-xs font-mono font-bold rounded-full bg-secondary text-secondary-foreground tracking-widest uppercase glow-purple", children: tier.badgeLabel }) }),
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 right-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 text-xs font-mono font-semibold rounded-full bg-primary/20 border border-primary/50 text-primary tracking-wider uppercase", children: "Current" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-10 h-10 rounded-lg flex items-center justify-center border ${isFeatured ? "bg-secondary/15 border-secondary/40 glow-purple" : "bg-primary/10 border-primary/30"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          TierIcon,
                          {
                            className: `w-5 h-5 ${isFeatured ? "text-secondary" : "text-primary"}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label opacity-60", children: tier.name.toUpperCase() }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-5xl font-display font-bold ${isFeatured ? "text-secondary" : "text-foreground"}`,
                          children: tier.price
                        }
                      ),
                      tier.monthly > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm mb-2 ml-1", children: "/ mo" })
                    ] }),
                    tier.monthly === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: tier.period })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 leading-relaxed min-h-[2.5rem]", children: tier.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-full h-px mb-5 ${isFeatured ? "bg-secondary/30" : "bg-border/30"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "ul",
                    {
                      className: "space-y-2.5 mb-8 flex-1",
                      "data-ocid": `pricing.features_list.${i + 1}`,
                      children: tier.features.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Check,
                          {
                            className: `w-4 h-4 mt-0.5 flex-shrink-0 ${isFeatured ? "text-secondary" : "text-primary"}`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground/85 leading-snug", children: feat })
                      ] }, feat))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => void handleCta(tier.id),
                      disabled: isActive || isMutating,
                      "data-ocid": `pricing.cta_button.${i + 1}`,
                      className: `w-full flex items-center justify-center gap-2 ${isActive ? "btn-outline opacity-50 cursor-default pointer-events-none" : isFeatured ? "btn-cyan" : "btn-outline"}`,
                      children: [
                        isMutating && (upgradeMut.isPending || cancelMut.isPending) ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : null,
                        isActive ? "Current Plan ✓" : tier.ctaLabel
                      ]
                    }
                  )
                ]
              },
              tier.id
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16",
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { delay: 0.2, duration: 0.5 },
          "data-ocid": "pricing.trust_section",
          children: [
            {
              icon: Shield,
              title: "Secure Payments",
              desc: "Stripe-powered, PCI DSS compliant"
            },
            {
              icon: Zap,
              title: "Instant Activation",
              desc: "Features unlock immediately after payment"
            },
            {
              icon: MessageCircle,
              title: "Cancel Anytime",
              desc: "No lock-in contracts, no hidden fees"
            }
          ].map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-panel rounded-lg p-4 flex items-start gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
                ] })
              ]
            },
            title
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          "data-ocid": "pricing.faq_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hud-label mb-2", children: "FAQ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: "Common Questions" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-w-3xl mx-auto", children: FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaqAccordion, { faq, index: i }, faq.q)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.p,
        {
          className: "text-center text-xs text-muted-foreground mt-14 font-mono opacity-60",
          initial: { opacity: 0 },
          whileInView: { opacity: 0.6 },
          viewport: { once: true },
          transition: { delay: 0.3 },
          "data-ocid": "pricing.footer_note",
          children: [
            "All plans include end-to-end encryption and GDPR-compliant data handling.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Priya is powered by the ARIA AI system — built with ❤ by Ashish Kumar, Jharkhand Rai University."
          ]
        }
      )
    ] })
  ] });
}
export {
  PricingPage
};
