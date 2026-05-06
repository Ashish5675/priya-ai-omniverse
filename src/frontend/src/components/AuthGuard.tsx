import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useCurrentUser } from "../hooks/useAuth";
import { useAriaStore } from "../store/useAriaStore";

interface AuthGuardProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const navigate = useNavigate();
  const isAuthenticated = useAriaStore((s) => s.isAuthenticated);
  const userRole = useAriaStore((s) => s.userRole);
  const login = useAriaStore((s) => s.login);
  const { isLoading } = useCurrentUser();
  const [autoLoggingIn, setAutoLoggingIn] = useState(false);

  // Auto demo-login on first visit so the chat page renders immediately
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !requireAdmin && !autoLoggingIn) {
      setAutoLoggingIn(true);
      import("../mocks/backend").then(({ mockBackend }) => {
        mockBackend.demoLogin().then((result) => {
          if (result.__kind__ === "ok") {
            const p = result.ok;
            const idStr =
              typeof p.id === "string"
                ? p.id
                : typeof (p.id as { toText?: () => string }).toText ===
                    "function"
                  ? (p.id as { toText: () => string }).toText()
                  : String(p.id);
            login({
              id: idStr,
              name: p.name,
              email: p.email,
              role: p.role as "user" | "admin",
              tier: p.tier as "free" | "pro" | "enterprise",
            });
          } else {
            void navigate({ to: "/login" });
          }
          setAutoLoggingIn(false);
        });
      });
    }
    if (!isLoading && isAuthenticated && requireAdmin && userRole !== "admin") {
      void navigate({ to: "/" });
    }
  }, [
    isLoading,
    isAuthenticated,
    requireAdmin,
    userRole,
    navigate,
    login,
    autoLoggingIn,
  ]);

  if (isLoading || autoLoggingIn) {
    return (
      <div
        className="flex-1 flex items-center justify-center min-h-screen bg-background"
        data-ocid="auth.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          {/* Holographic spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-2 border-t-primary border-r-primary/50 border-b-transparent border-l-transparent animate-spin" />
            <div
              className="absolute inset-2 rounded-full border border-secondary/30 animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            />
          </div>
          <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase animate-pulse">
            Initializing Priya...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requireAdmin && userRole !== "admin") {
    return null;
  }

  return <>{children}</>;
}
