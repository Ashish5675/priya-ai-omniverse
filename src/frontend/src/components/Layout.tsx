import { Outlet } from "@tanstack/react-router";
import { NavHeader } from "./NavHeader";

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavHeader />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
      <footer className="border-t border-border/20 py-3 px-6 glass-panel">
        <p className="text-center text-xs text-muted-foreground font-mono tracking-wider">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
