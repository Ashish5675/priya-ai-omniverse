import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        module: {
          agents: "oklch(var(--module-agents))",
          knowledge: "oklch(var(--module-knowledge))",
          face: "oklch(var(--module-face))",
          drone: "oklch(var(--module-drone))",
          legal: "oklch(var(--module-legal))",
          tracking: "oklch(var(--module-tracking))",
          admin: "oklch(var(--module-admin))",
          analytics: "oklch(var(--module-analytics))",
        },
        langSelector: {
          bg: "oklch(var(--lang-selector-bg))",
          border: "oklch(var(--lang-selector-border))",
          text: "oklch(var(--lang-selector-text))",
          active: "oklch(var(--lang-selector-active))",
        },
        limeGreen: "#39FF14",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "glow-agents": "0 0 16px oklch(var(--module-agents) / 0.4), 0 0 32px oklch(var(--module-agents) / 0.2)",
        "glow-knowledge": "0 0 16px oklch(var(--module-knowledge) / 0.4), 0 0 32px oklch(var(--module-knowledge) / 0.2)",
        "glow-face": "0 0 16px oklch(var(--module-face) / 0.4), 0 0 32px oklch(var(--module-face) / 0.2)",
        "glow-drone": "0 0 16px oklch(var(--module-drone) / 0.4), 0 0 32px oklch(var(--module-drone) / 0.2)",
        "glow-legal": "0 0 16px oklch(var(--module-legal) / 0.4), 0 0 32px oklch(var(--module-legal) / 0.2)",
        "glow-tracking": "0 0 16px oklch(var(--module-tracking) / 0.4), 0 0 32px oklch(var(--module-tracking) / 0.2)",
        "glow-admin": "0 0 16px oklch(var(--module-admin) / 0.4), 0 0 32px oklch(var(--module-admin) / 0.2)",
        "glow-analytics": "0 0 16px oklch(var(--module-analytics) / 0.4), 0 0 32px oklch(var(--module-analytics) / 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 8px oklch(var(--primary)))" },
          "50%": { opacity: "0.7", filter: "drop-shadow(0 0 16px oklch(var(--primary)))" },
        },
        "border-pulse": {
          "0%, 100%": { "box-shadow": "0 0 10px oklch(var(--primary)), inset 0 0 10px oklch(var(--primary) / 0.3)" },
          "50%": { "box-shadow": "0 0 20px oklch(var(--primary)), inset 0 0 15px oklch(var(--primary) / 0.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "border-pulse": "border-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
