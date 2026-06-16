import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Logo } from "@/components/app/Logo";
import { ArrowRight, Mail, Lock, Github } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in · InterviewForge" }] }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="aurora" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col px-6 py-8">
        <Logo />
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="glass-strong mt-12 rounded-3xl p-7"
        >
          <div className="flex gap-1 rounded-xl bg-white/5 p-1 text-sm">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-lg px-3 py-1.5 transition ${mode === m ? "bg-gradient-brand text-primary-foreground" : "text-muted-foreground"}`}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            {mode === "signin" ? "Welcome back." : "Start forging your loop."}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" ? "Continue your prep where you left off." : "Free forever for 3 mocks a week."}
          </p>

          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app/dashboard" }); }}
          >
            <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus-within:ring-1 focus-within:ring-primary/40">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input type="email" required placeholder="you@work.com" className="w-full bg-transparent outline-none" />
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm focus-within:ring-1 focus-within:ring-primary/40">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input type="password" required placeholder="••••••••" className="w-full bg-transparent outline-none" />
            </label>
            <button className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground ring-glow">
              {mode === "signin" ? "Sign in" : "Create account"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="h-px flex-1 bg-white/10" /> or <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm hover:bg-white/10">
              <GoogleIcon /> Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm hover:bg-white/10">
              <Github className="h-4 w-4" /> GitHub
            </button>
          </div>
        </motion.div>

        <Link to="/" className="mx-auto mt-8 text-xs text-muted-foreground hover:text-foreground">← Back home</Link>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.5-.1-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2c-2 1.4-4.6 2.4-7.3 2.4-5.1 0-9.5-3.1-11.3-7.4l-6.5 5C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.9 2.4-2.5 4.4-4.6 5.8l6.2 5.2C40.5 35.5 44 30.3 44 24c0-1.3-.1-2.5-.4-3.5z" />
    </svg>
  );
}
