import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  MessagesSquare,
  Building2,
  FileText,
  Map,
  Code2,
  Trophy,
  Bell,
  Search,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/generator", label: "Generator", icon: Sparkles },
  { to: "/app/mock", label: "Mock Interview", icon: MessagesSquare },
  { to: "/app/companies", label: "Companies", icon: Building2 },
  { to: "/app/resume", label: "Resume", icon: FileText },
  { to: "/app/roadmap", label: "Roadmap", icon: Map },
  { to: "/app/coding", label: "Coding Arena", icon: Code2 },
] as const;

export function AppShell({ children }: { children?: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="relative min-h-screen">
      <div className="aurora" />
      <div className="relative z-10 mx-auto flex max-w-[1480px] gap-6 px-4 py-5 lg:px-8">
        <aside className="hidden lg:flex w-64 shrink-0 flex-col">
          <div className="glass-strong sticky top-5 flex h-[calc(100vh-2.5rem)] flex-col rounded-2xl p-4">
            <Logo className="mb-6 px-2" />
            <nav className="flex flex-col gap-1">
              {nav.map(({ to, label, icon: Icon }) => {
                const active = path.startsWith(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-white/5 text-foreground"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/20 to-accent/10 ring-1 ring-primary/30"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto rounded-xl border border-primary/30 bg-gradient-to-br from-primary/15 to-accent/5 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-primary">
                <Trophy className="h-4 w-4" /> Forge Pro
              </div>
              <p className="mt-2 text-sm font-medium">Unlimited mocks + AI mentor</p>
              <p className="mt-1 text-xs text-muted-foreground">Unlock the full coach experience.</p>
              <button className="mt-3 w-full rounded-lg bg-gradient-brand px-3 py-2 text-xs font-semibold text-primary-foreground ring-glow">
                Upgrade
              </button>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-5">
          <header className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
            <div className="lg:hidden"><Logo /></div>
            <div className="hidden md:flex flex-1 items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-muted-foreground ring-1 ring-white/10">
              <Search className="h-4 w-4" />
              Search topics, companies, questions…
              <span className="ml-auto rounded-md bg-white/10 px-1.5 py-0.5 text-[10px]">⌘K</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
                <Bell className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-2 py-1 ring-1 ring-white/10">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-brand text-xs font-bold text-primary-foreground">JD</div>
                <div className="hidden md:block pr-2 text-xs leading-tight">
                  <div className="font-medium">Jordan Doe</div>
                  <div className="text-muted-foreground">Senior · 7-day streak</div>
                </div>
              </div>
            </div>
          </header>
          <div className="min-w-0 flex-1">{children ?? <Outlet />}</div>
        </main>
      </div>
    </div>
  );
}
