import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, BookOpen, CheckCircle2 } from "lucide-react";
import { PageHeader, Card } from "@/components/app/Section";
import { ROADMAP_WEEKS, PROFESSIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/roadmap")({
  head: () => ({ meta: [{ title: "Skill Roadmap · InterviewForge" }] }),
  component: RoadmapPage,
});

function RoadmapPage() {
  const [role, setRole] = useState(PROFESSIONS[0]);
  const missing = ["Kubernetes", "Terraform", "gRPC", "Distributed tracing", "OpenTelemetry"];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Skill Gap & Roadmap"
        title="Your personal 4-week plan."
        subtitle="Forge compares your resume against the role and lays out a daily schedule."
        actions={
          <select value={role} onChange={(e) => setRole(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none">
            {PROFESSIONS.map((p) => <option key={p} className="bg-background">{p}</option>)}
          </select>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <h3 className="text-sm font-semibold">Readiness</h3>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-semibold">68<span className="text-base text-muted-foreground">/100</span></span>
            <span className="text-xs text-emerald-300">+8 this week</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div initial={{ width: 0 }} animate={{ width: "68%" }} transition={{ duration: 1 }} className="h-full bg-gradient-brand" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">You're roughly 2 weeks from loop-ready for {role}.</p>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-sm font-semibold">Missing skills</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {missing.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/30">
                <Sparkles className="h-3 w-3" /> {s}
              </span>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Read 'Designing Data-Intensive Apps' ch. 5–6", "K8s in 30 days mini-course", "Build observability sandbox"].map((r) => (
              <div key={r} className="rounded-xl bg-white/5 p-3 text-sm ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-xs text-primary"><BookOpen className="h-3.5 w-3.5" /> Resource</div>
                <p className="mt-1.5">{r}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ROADMAP_WEEKS.map((w, i) => (
          <motion.div
            key={w.week}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5"
          >
            <div className="text-[10px] font-medium uppercase tracking-widest text-primary">Week {i + 1}</div>
            <h3 className="mt-2 text-base font-semibold">{w.week.split("— ")[1]}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{w.focus}</p>
            <ul className="mt-4 space-y-2">
              {w.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${i === 0 ? "text-primary" : "text-muted-foreground"}`} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
