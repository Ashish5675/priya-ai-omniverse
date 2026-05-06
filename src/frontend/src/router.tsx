import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AuthGuard } from "./components/AuthGuard";
import { Layout } from "./components/Layout";

const ChatPage = lazy(() =>
  import("./pages/ChatPage").then((m) => ({ default: m.ChatPage })),
);
const SettingsPage = lazy(() =>
  import("./pages/SettingsPage").then((m) => ({ default: m.SettingsPage })),
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage").then((m) => ({ default: m.RegisterPage })),
);
const HomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const PricingPage = lazy(() =>
  import("./pages/PricingPage").then((m) => ({ default: m.PricingPage })),
);
const PresentationPage = lazy(() =>
  import("./pages/PresentationPage").then((m) => ({
    default: m.PresentationPage,
  })),
);
const AgentsPage = lazy(() =>
  import("./pages/AgentsPage").then((m) => ({ default: m.AgentsPage })),
);
const KnowledgePage = lazy(() =>
  import("./pages/KnowledgePage").then((m) => ({ default: m.KnowledgePage })),
);
const DronePage = lazy(() =>
  import("./pages/DronePage").then((m) => ({ default: m.DronePage })),
);
const LegalPage = lazy(() =>
  import("./pages/LegalPage").then((m) => ({ default: m.LegalPage })),
);
const TrackingPage = lazy(() =>
  import("./pages/TrackingPage").then((m) => ({ default: m.TrackingPage })),
);
const AdminPage = lazy(() =>
  import("./pages/AdminPage").then((m) => ({ default: m.AdminPage })),
);
const AnalyticsPage = lazy(() =>
  import("./pages/AnalyticsPage").then((m) => ({ default: m.AnalyticsPage })),
);
const FaceEnrollPage = lazy(() =>
  import("./pages/FaceEnrollPage").then((m) => ({ default: m.FaceEnrollPage })),
);
const CallsPage = lazy(() =>
  import("./pages/CallsPage").then((m) => ({ default: m.CallsPage })),
);

const TradingPage = lazy(() =>
  import("./pages/TradingPage").then((m) => ({ default: m.TradingPage })),
);
const VoiceEnrollPage = lazy(() =>
  import("./pages/VoiceEnrollPage").then((m) => ({
    default: m.VoiceEnrollPage,
  })),
);

const AIDeveloperPage = lazy(() =>
  import("./pages/AIDeveloperPage").then((m) => ({
    default: m.AIDeveloperPage,
  })),
);
const MultiAgentPage = lazy(() =>
  import("./pages/MultiAgentPage").then((m) => ({
    default: m.MultiAgentPage,
  })),
);
const InsightsDashboardPage = lazy(() =>
  import("./pages/InsightsDashboardPage").then((m) => ({
    default: m.InsightsDashboardPage,
  })),
);
const AutoBuildPage = lazy(() =>
  import("./pages/AutoBuildPage").then((m) => ({
    default: m.AutoBuildPage,
  })),
);

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RegisterPage />
    </Suspense>
  ),
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <ChatPage />
      </AuthGuard>
    </Suspense>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <SettingsPage />
      </AuthGuard>
    </Suspense>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <HomePage />
      </AuthGuard>
    </Suspense>
  ),
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <PricingPage />
      </AuthGuard>
    </Suspense>
  ),
});

const presentationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/presentation",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <PresentationPage />
      </AuthGuard>
    </Suspense>
  ),
});

const agentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agents",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <AgentsPage />
      </AuthGuard>
    </Suspense>
  ),
});

const knowledgeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/knowledge",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <KnowledgePage />
      </AuthGuard>
    </Suspense>
  ),
});

const droneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/drone",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <DronePage />
      </AuthGuard>
    </Suspense>
  ),
});

const legalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/legal",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <LegalPage />
      </AuthGuard>
    </Suspense>
  ),
});

const trackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tracking",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <TrackingPage />
      </AuthGuard>
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard requireAdmin>
        <AdminPage />
      </AuthGuard>
    </Suspense>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard requireAdmin>
        <AnalyticsPage />
      </AuthGuard>
    </Suspense>
  ),
});

const faceEnrollRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/enroll-face",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <FaceEnrollPage />
      </AuthGuard>
    </Suspense>
  ),
});

const callsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calls",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <CallsPage />
      </AuthGuard>
    </Suspense>
  ),
});

const tradingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/trading",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <TradingPage />
      </AuthGuard>
    </Suspense>
  ),
});

const voiceEnrollRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/voice-enroll",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <VoiceEnrollPage />
      </AuthGuard>
    </Suspense>
  ),
});

const aiDeveloperRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-developer",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <AIDeveloperPage />
      </AuthGuard>
    </Suspense>
  ),
});

const multiAgentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/multi-agent",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <MultiAgentPage />
      </AuthGuard>
    </Suspense>
  ),
});

const insightsDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/insights-dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <InsightsDashboardPage />
      </AuthGuard>
    </Suspense>
  ),
});

const autoBuildRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auto-build",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AuthGuard>
        <AutoBuildPage />
      </AuthGuard>
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  chatRoute,
  settingsRoute,
  homeRoute,
  pricingRoute,
  presentationRoute,
  agentsRoute,
  knowledgeRoute,
  droneRoute,
  legalRoute,
  trackingRoute,
  adminRoute,
  analyticsRoute,
  faceEnrollRoute,
  callsRoute,
  tradingRoute,
  voiceEnrollRoute,
  aiDeveloperRoute,
  multiAgentRoute,
  insightsDashboardRoute,
  autoBuildRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
