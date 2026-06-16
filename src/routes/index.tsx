import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, MessagesSquare, FileText, Map, Building2, Trophy,
  Mic, Code2, Shield, ArrowRight, Check, Star,
} from "lucide-react";
import { Logo } from "@/components/app/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InterviewForge — Your AI Interview Coach" },
      { name: "description", content: "Personalized AI mock interviews, resume analysis, and adaptive learning roadmaps. Land the offer." },
      { property: "og:title", content: "InterviewForge — Your AI Interview Coach" },
      { property: "og:description", content: "Personalized AI mock interviews, resume analysis, and adaptive learning roadmaps." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Sparkles, title: "AI Interview Generator", desc: "Personalized questions by role, level, type and difficulty." },
  { icon: MessagesSquare, title: "Mock Interview Simulator", desc: "Conversational AI interviewer with confidence + communication scores." },
  { icon: Mic, title: "AI Voice Interviewer", desc: "Realistic voice loops with natural follow-ups." },
  { icon: FileText, title: "Resume Analyzer", desc: "ATS scoring, weak bullets, and optimized rewrites." },
  { icon: Map, title: "Skill Gap & Roadmap", desc: "Adaptive weekly plan tuned to your target role." },
  { icon: Building2, title: "Company Prep", desc: "Process breakdowns, culture, frequent questions." },
  { icon: Code2, title: "Coding Arena", desc: "Live editor for Python, Java, JS, C++ with feedback." },
  { icon: Shield, title: "Cybersecurity Lab", desc: "SOC, pentest, forensics scenarios." },
];

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora" />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden gap-8 md:flex">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
          <a href="#how" className="text-sm text-muted-foreground hover:text-foreground">How it works</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth" className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
          <Link to="/app/dashboard" className="rounded-lg bg-gradient-brand px-3.5 py-2 text-sm font-semibold text-primary-foreground ring-glow">
            Open app
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-24 text-center md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
        >
          <Sparkles className="h-3.5 w-3.5" /> Adaptive AI coach · Now in public beta
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-tight md:text-7xl"
        >
          The interview coach that <span className="text-gradient">learns you back.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg"
        >
          Personalized mock interviews, resume rewrites, and an adaptive learning roadmap.
          InterviewForge tunes every question and plan to your performance — so you walk in ready.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/app/dashboard" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground ring-glow">
            Start a mock interview
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link to="/app/resume" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium hover:bg-white/10">
            Analyze my resume
          </Link>
        </motion.div>

        {/* Floating preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="grid-bg absolute inset-0 -z-10 rounded-3xl" />
          <div className="glass-strong rounded-3xl p-3 shadow-[0_40px_120px_-30px_oklch(0.72_0.22_295/40%)]">
            <div className="rounded-2xl bg-background/60 p-6 text-left ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live mock · Senior · System Design · Hard
              </div>
              <div className="mt-5 space-y-4">
                <ChatBubble who="Interviewer" text="Design a real-time leaderboard for 50M concurrent users. Walk me through your approach." />
                <ChatBubble who="You" text="I'd start by separating writes from reads — Redis sorted sets per shard, fanout via Kafka..." mine />
                <ChatBubble who="Interviewer" text="Nice. What's your fallback when a shard goes hot?" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Score label="Confidence" value={82} />
                <Score label="Technical" value={91} />
                <Score label="Communication" value={76} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">Built for serious prep</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Every part of the loop, in one place.</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="glass group rounded-2xl p-5 transition hover:-translate-y-0.5 hover:ring-1 hover:ring-primary/40"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-primary-foreground ring-1 ring-white/20">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">An interview coach that adapts every session.</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Forge learns your strengths and gaps after each mock — then rewrites your roadmap, raises difficulty, and surfaces the right questions next.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Pick role, level, and interview type",
                "Practice via text or voice with an AI interviewer",
                "Get scored on confidence, accuracy, and communication",
                "Wake up to a refreshed weekly plan",
              ].map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary/20 text-primary"><Check className="h-3 w-3" /></span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-6">
            <div className="space-y-4">
              {[
                { k: "Confidence", v: "+24%", c: "from-emerald-400/30" },
                { k: "Technical", v: "+38%", c: "from-primary/40" },
                { k: "Communication", v: "+19%", c: "from-cyan-400/30" },
              ].map((row, i) => (
                <motion.div
                  key={row.k}
                  initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{row.k}</span>
                    <span className="font-semibold text-emerald-300">{row.v}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full bg-gradient-to-r ${row.c} to-primary`} style={{ width: `${60 + i * 12}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Start free. Upgrade when you're loop-ready.</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { name: "Starter", price: "$0", desc: "Get a feel for Forge.", perks: ["3 mock interviews / week", "Resume scan", "Basic dashboard"] },
            { name: "Pro", price: "$19", desc: "Most popular.", perks: ["Unlimited mocks", "AI voice interviewer", "Resume rewriter", "Adaptive roadmap"], featured: true },
            { name: "Career", price: "$49", desc: "Full coach experience.", perks: ["Everything in Pro", "AI career mentor", "Company prep packs", "Advanced analytics"] },
          ].map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-6 ${p.featured ? "ring-1 ring-primary/50 bg-gradient-to-b from-primary/15 to-transparent" : "glass"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">Popular</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold">{p.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> {perk}
                  </li>
                ))}
              </ul>
              <Link
                to="/app/dashboard"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold ${
                  p.featured ? "bg-gradient-brand text-primary-foreground ring-glow" : "border border-white/15 bg-white/5 hover:bg-white/10"
                }`}
              >
                Choose {p.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-1 text-amber-300">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
          </div>
          <p className="mt-4 max-w-3xl text-balance text-xl font-medium leading-relaxed md:text-2xl">
            "After 6 mocks with Forge I walked into my Stripe loop calm. The adaptive roadmap is the closest thing to a real mentor I've found."
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-sm font-semibold text-primary-foreground">RS</div>
            <div className="text-sm">
              <div className="font-medium">Riya Sharma</div>
              <div className="text-muted-foreground">Backend Engineer · Stripe</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} InterviewForge. Crafted for serious candidates.</p>
        </div>
      </footer>
    </div>
  );
}

function ChatBubble({ who, text, mine }: { who: string; text: string; mine?: boolean }) {
  return (
    <div className={`flex gap-3 ${mine ? "justify-end" : ""}`}>
      {!mine && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-brand text-xs font-semibold text-primary-foreground">AI</div>}
      <div className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ring-1 ${mine ? "bg-primary text-primary-foreground ring-primary/40" : "bg-white/5 ring-white/10"}`}>
        <div className={`mb-0.5 text-[10px] uppercase tracking-wider ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{who}</div>
        {text}
      </div>
      {mine && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold">JD</div>}
    </div>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-xs text-muted-foreground">/100</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-gradient-brand" />
      </div>
    </div>
  );
}
