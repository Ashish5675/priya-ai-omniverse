# ARIA — PRIYA AI OMNIVERSE (GOD+ LEVEL) – QUANTUM INTERFACE EDITION

## Visual Direction
GOD+ level modular AI operating system with new Quantum Interface hero on homepage. Deep dark near-black base (0.06 0 0), dominant cyan primary glow (0.7 0.18 200), electric purple secondary (0.58 0.17 282), soft blue accent (0.72 0.16 210). Glass morphism panels, scanline overlay, monospace system text. Lime green (#39FF14) user input for high visibility. Unaltered 2D Priya avatar (brown hair, blue dress, wedge sandals) used in chat only; Quantum Brain avatar (abstract neural lines, particles, rotating geometry) featured ONLY in hero section. Horizontal scrollable card-based navigation with left/right carousel controls, active card glows and scales. Feature highlight cards, metrics section, floating quick-actions. Premium sci-fi precision aesthetic.

## Tone & Purpose
ARIA is the intelligent operating system — conversational AI assistant (Priya) with real-time voice, 8 specialized modules for autonomous agents, knowledge systems, biometric security, drone/camera AI, legal AI, live tracking, administrative control, and analytics. Design conveys sophistication, control, and advanced technological capability. Every panel reinforces "command center" visual language.

## Color Palette (OKLCH)

| Token | Value | Module/Usage |
| --- | --- | --- |
| Background | `0.06 0 0` | Deep dark canvas |
| Foreground | `0.95 0 0` | Body text, labels |
| Primary (Cyan) | `0.7 0.18 200` | Core UI, active states, navigation |
| Secondary (Purple) | `0.58 0.17 282` | Alternative accent, emotion pulse |
| Accent (Soft Blue) | `0.72 0.16 210` | Quantum Brain, feature highlights |
| Agents | `0.65 0.18 180` | Autonomous agents panel |
| Knowledge | `0.72 0.16 210` | Knowledge system, RAG |
| Face Recognition | `0.68 0.17 195` | Biometric login, face detection |
| Drone | `0.75 0.15 150` | Drone/camera dashboard |
| Legal | `0.62 0.19 25` | Legal AI, document analysis |
| Tracking/IoT | `0.7 0.18 200` | Live tracking, IoT control |
| Admin | `0.58 0.17 282` | Admin panel, settings |
| Analytics | `0.73 0.16 220` | Analytics dashboard, metrics |
| Lime Green | `#39FF14` | Chat input text (high contrast) |

## Typography

| Layer | Font | Weight | Usage |
| --- | --- | --- | --- |
| Display | GeneralSans | 700 | App title "ARIA", section headers |
| Body | DMSans | 400–600 | UI labels, chat messages, user input |
| Mono | JetBrainsMono | 400–500 | System text, responses, code, HUD labels |

**Scale:** 12px (caption) → 14px (body) → 16px (label) → 20px (heading) → 32px (title).

## Elevation & Depth

| Surface | Treatment | Shadow |
| --- | --- | --- |
| Background | Solid `#0a0a0f` | None |
| Module Panel | Glass (blur 12px), border-color by module, gradient top border | Module-specific glow: `0 0 16px module-color / 0.4` |
| Glass Form | Glass (blur 16px), lime green animated border on focus | `0 0 20px #39FF14 / 0.4` |
| Language Selector | Glass bg, mono font, active state glow | `0 0 8px primary / 0.3` |

## Structural Zones

| Zone | Background | Border | Notes |
| --- | --- | --- | --- |
| Header/Navbar | `bg-card` glass | `border-b border-border` | Priya title, nav links, language selector toggle, settings |
| Module Panels | `bg-card` glass, scanline overlay | `border-2` + module-specific color | 8 modules in grid or tabs: Agents, Knowledge, Face, Drone, Legal, Tracking, Admin, Analytics |
| Chat Area | `bg-background` | `border-l border-border` | User input in lime green, Priya audio replies, no text shown |
| Avatar Panel | `bg-card` glass + scanline | `border-2 border-primary` + cyan glow | 2D Priya SVG portrait, unaltered reference image |
| Footer | `bg-muted/20` | `border-t border-border` | Credits: "Designed and Developed by Ashish Kumar, Jharkhand Rai University, MCA Student" |

## Component Patterns

- **Quantum Brain Container** (`.quantum-brain-container`): Relative positioned hero container, 400px height, radial gradient bg, cyan-tinted border, glass blur. Center inner `.quantum-brain-core` rotates 8s infinite.
- **Navigation Carousel** (`.nav-carousel-container`): Flex row, horizontal scroll, hidden scrollbar. Arrow buttons (`.nav-carousel-btn.left/.right`) positioned absolute, 40px square, glass bg, cyan border, glow on hover.
- **Navigation Card** (`.nav-card`): Flex column, icon + label, padding 1rem 1.5rem, glass bg, border cyan/0.4. States: hover (lift -4px, scale 1.05, glow), active (blue bg/0.2, border primary, pulse animation).
- **Feature Card** (`.feature-card`): Flex column, 2rem padding, glass bg, cyan gradient top border 3px. Hover: lift -8px, cyan border/0.6, soft glow.
- **Metrics Card** (`.metrics-card`): Text center, 1.5rem padding, glass bg, cyan border/0.3. Inner `.metrics-value` (clamp 1.5-2.5rem, cyan color, display font), `.metrics-label` (0.875rem, muted text, mono font).
- **Floating Action** (`.floating-action`): Fixed bottom 2rem right 2rem, 60px circle, cyan bg, strong glow. Hover: scale 1.15, enhanced glow. Press: scale 0.95.
- **Module Panel** (`.module-panel`): Glass base with module-specific border color, gradient top border, glow on hover. Classes: `.module-panel.agents`, `.module-panel.knowledge`, `.module-panel.face`, `.module-panel.drone`, `.module-panel.legal`, `.module-panel.tracking`, `.module-panel.admin`, `.module-panel.analytics`.
- **Language Selector** (`.lang-selector`): Flex row, glass bg, mono font. Buttons toggle active state with border + glow. EN / हिन्दी / Chhattisgarhi.
- **Chat Input** (`.chat-input-holographic`): Lime green text (#39FF14), animated border on focus, glass bg.
- **Glass Panel**: `.glass-panel` — semi-transparent card, backdrop blur, cyan-tinted border.
- **Button Pattern**: `.btn-cyan` (solid primary, strong glow on hover), `.btn-outline` (transparent border, subtle glow).
- **HUD Label** (`.hud-label`): Monospace, uppercase, cyan text 0.7 opacity. Used on module headers.
- **Glow Utilities**: `.glow-cyan`, `.glow-purple`, and module-specific shadows (`shadow-glow-agents`, etc.).

## Spacing & Rhythm

- Panel padding: 1.5rem (module panels), 2rem (glass forms)
- Grid gap: 1rem (module panels), 0.5rem (language selector buttons)
- Vertical spacing: 12px (tight) → 16px (standard) → 24px (loose)
- Desktop (lg): Full-width module grid (2-4 columns), navbar spans top

## Motion & Animation

- **Transition Base**: `transition-smooth` (0.3s, `cubic-bezier(0.4, 0, 0.2, 1)`)
- **Quantum Rotate**: `quantum-rotate` (0deg → 360deg, 8s linear infinite) — Quantum Brain core rotation
- **Quantum Pulse**: `quantum-pulse` (scale 1 → 1.2 → 1, 3s ease-in-out) — Quantum Brain inner pulse
- **Nav Pulse Glow**: `nav-pulse-glow` (shadow modulation, 1s infinite) — Active navigation card glow
- **Glow Pulse**: `animate-pulse-glow` — 2s loop, box-shadow modulation
- **Module Borders**: Gradient top border on hover, module-specific color
- **Language Toggle**: Smooth color + border transition on active state
- **Chat Input Focus**: Lime green border + box-shadow glow (0.4 opacity)
- **Scanline**: Repeating linear gradient (1px scanlines, 2px interval) on avatar panel, 3% opacity

## Differentiation & Signature Detail

**Quantum Brain Holographic Avatar**: Abstract rotating form (neural lines, particles, geometry) conveys AGI intelligence on homepage hero only. Distinct from 2D Priya avatar used throughout chat.

**Horizontal Navigation Carousel**: Replaces static navbar with interactive scroll controls. Active card pulses with cyan glow. Creates dynamic, command-center aesthetic.

**Module-Specific Gradient Borders**: Each of 8 modules has a unique accent color with a subtle gradient top border. Creates visual scanability and cohesive "command center" experience without overwhelming.

**Lime Green Chat Input**: Bright (#39FF14) contrasts sharply against dark background — immediate visual anchor. Reinforces "high-contrast holographic" aesthetic.

**Language Selector in Navbar**: Global language toggle (EN / हिन्दी / Nagpuri) prominently accessible, supporting multicultural AI assistant experience.

**Unaltered 2D Priya Avatar**: Flat reference portrait (realistic young woman, brown hair, blue mini dress, wedge sandals) used consistently in chat — no 3D modifications. Cyan holographic glow border frames the image.

## Responsive Behavior

- **Desktop (lg)**: Full module grid (4 columns), 50/50 avatar-chat split, full glow effects
- **Tablet (md)**: 2-column module grid, flexible split, reduced glow intensity
- **Mobile (sm)**: Stacked tabs (Modules | Avatar | Chat), full-width panels, compact spacing

## Constraints & Anti-Patterns

- ❌ No warm colors (orange, amber) — maintains cool sci-fi palette
- ❌ No soft shadows on text — clarity only
- ❌ No multiple competing accent colors — module accents + primary cyan only
- ❌ No cartoon or playful animations — precision and sophistication
- ✅ Every module panel has visible border + glow
- ✅ Language selector always visible in navbar
- ✅ Chat input text always lime green for visibility
- ✅ Consistent monospace for system/assistant text
- ✅ Glass morphism on cards only, not full backgrounds

## Accessibility & Semantics

- Foreground-on-background contrast: 0.95 on 0.06 = safe AA+
- Language selector: Three distinct buttons with visual + text labels
- Focus states: Cyan glow + border on all interactive elements
- Lime green input: AAA contrast against background
- Scanline overlay: Low opacity (3%) — no readability impact
- Motion: All animations respect `prefers-reduced-motion`

## New Quantum Interface Features (Homepage)

### 1. Horizontal Scrollable Navigation Carousel
Replace traditional static navbar with dynamic carousel: nav cards scroll left/right with arrow buttons at edges. Each card shows icon + label (Chat, Agents, Knowledge, Voice, Analytics, Drone, Legal, Tracking, Admin). Active state: cyan glow, scale 1.05, animated pulse shadow. Hover: lift transform (translateY -4px), scale 1.05, soft glow. Smooth scroll behavior. Mobile responsive: full-width below 768px.

### 2. Quantum Brain AI Avatar
Abstract holographic form displayed in hero section (NOT replacing 2D Priya). Features: rotating conic gradient (cyan → purple → soft blue), pulsing radial center, animating 8s rotate, 3s pulse cycle. Position: 400px height container with radial dark gradient background, semi-transparent glass border. Conveys AGI intelligence without mimicking human form. Only on homepage hero.

### 3. Hero Section Layout
Left: "Meet Priya" title, subtitle, two CTA buttons (Start Chat, Explore Capabilities). Right: Quantum Brain avatar. Full-width below md breakpoint.

### 4. Feature Highlight Cards
Four cards: Voice Interaction, Multi-Agent Intelligence, Real-time Insights, Autonomous Actions. Each has gradient top border (cyan), hover lift + glow, glass morphism. Grid: 2 columns (md+), 1 column (sm).

### 5. Metrics Section
Three animated counters: 99.9% uptime, <200ms response, Multilingual support. Compact glass cards with cyan accent, large display font, mono label.

### 6. Floating Quick-Action Buttons
Fixed bottom-right FAB (60px circle, cyan background, strong glow). Expandable menu: Ask AI, Start Call, Generate Report. Smooth scale on hover, active press animation.



### 1. Autonomous Agents Panel
Route: `/agents` or module tab. Grid of agent cards (Planner, Research, Executor, Memory, Critic), each with module-agents color accent, status indicator, task list. Monospace font for logs.

### 2. Knowledge System Panel
Route: `/knowledge` or module tab. PDF/DOC/TXT upload, chunking preview, embedding stats, vector DB browser. module-knowledge color. Search bar with cyan glow.

### 3. Face Recognition Panel
Route: `/face` or module tab. Webcam preview, enrollment workflow, login verification, face dataset browser. module-face color. Biometric status indicator.

### 4. Drone Dashboard
Route: `/drone` or module tab. Live camera feed simulation, object detection overlay (YOLO mock), map with drone location, control panel. module-drone color. Safety warning overlay.

### 5. Legal AI Panel
Route: `/legal` or module tab. Document upload, clause extraction, summarization, Q&A interface. module-legal color. Red accent for warnings/sensitive data.

### 6. Live Tracking & IoT Panel
Route: `/tracking` or module tab. Google Maps mock, moving markers (simulated GPS), IoT device grid (smart home, industrial sensors). module-tracking color. Real-time status badges.

### 7. Admin Panel
Route: `/admin` or module tab. User management, knowledge upload, AI training controls, revenue metrics, system logs. module-admin color. Purple secondary accent for settings.

### 8. Analytics Dashboard
Route: `/analytics` or module tab. Charts (user stats, AI usage, voice usage, revenue), time-series graphs, export controls. module-analytics color. Chart-1 to Chart-5 color tokens from palette.

## Chat & Voice System

- User text input: Lime green (#39FF14), monospace or body font
- Priya replies: Audio only (ElevenLabs / Azure TTS, female realistic voice), no text shown in chat
- Language support: EN / हिन्दी / Nagpuri via language selector — Priya speaks and responds in selected language
- Voice waveform: Optional animated visualization during playback (cyan bars, pulse animation)

## Credits & Branding

- **ARIA**: System/tech name (AI Operating System)
- **Priya**: Assistant/personality name (humanoid female voice)
- **Footer Credit**: "Designed and Developed by Ashish Kumar, Jharkhand Rai University, MCA Student"
- **Displayed On**: Homepage, Credits page, Presentation slideshow
