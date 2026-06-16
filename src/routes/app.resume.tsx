import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, Upload, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";
import { PageHeader, Card } from "@/components/app/Section";
import { RESUME_ISSUES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/resume")({
  head: () => ({ meta: [{ title: "Resume Analyzer · InterviewForge" }] }),
  component: ResumePage,
});

function ResumePage() {
  const [analyzed, setAnalyzed] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Resume Analyzer"
        title="Beat the ATS. Land the screen."
        subtitle="Upload your PDF and get bullet-level rewrites, missing keywords, and ATS issues."
      />

      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <h3 className="text-sm font-semibold">Upload</h3>
          <label className="mt-4 grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-8 text-center transition hover:border-primary/40 hover:bg-white/10">
            <input type="file" accept=".pdf" className="hidden" onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { setFileName(f.name); setAnalyzed(false); }
            }} />
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
              <Upload className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-medium">Drop your PDF resume</p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
            {fileName && <p className="mt-3 text-xs text-primary">{fileName}</p>}
          </label>
          <button
            disabled={!fileName}
            onClick={() => setAnalyzed(true)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground ring-glow disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" /> Analyze with AI
          </button>

          <div className="mt-6 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">ATS compatibility</span>
              <span className="font-semibold text-emerald-300">{analyzed ? "72%" : "—"}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div initial={{ width: 0 }} animate={{ width: analyzed ? "72%" : "0%" }} transition={{ duration: 0.8 }} className="h-full bg-gradient-brand" />
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Findings</h3>
            {analyzed && <span className="text-xs text-muted-foreground">{RESUME_ISSUES.length} issues · 2 quick wins</span>}
          </div>
          {!analyzed ? (
            <div className="grid h-72 place-items-center text-center text-sm text-muted-foreground">
              <div>
                <FileText className="mx-auto h-7 w-7 text-primary/60" />
                <p className="mt-3">Upload your resume to see findings.</p>
              </div>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {RESUME_ISSUES.map((r, i) => {
                const tone = r.severity === "high" ? "from-rose-500/30 text-rose-300 ring-rose-400/30"
                  : r.severity === "med" ? "from-amber-500/30 text-amber-300 ring-amber-400/30"
                  : "from-cyan-500/30 text-cyan-300 ring-cyan-400/30";
                return (
                  <motion.li
                    key={r.title}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
                  >
                    <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${tone} ring-1`}>
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{r.title}</span>
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{r.severity}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{r.detail}</p>
                    </div>
                    <button className="self-start rounded-lg bg-gradient-brand px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">Rewrite</button>
                  </motion.li>
                );
              })}
              <li className="flex gap-3 rounded-xl bg-emerald-500/10 p-4 ring-1 ring-emerald-400/30">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-500/30 text-emerald-300 ring-1 ring-emerald-400/30">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Strong technical depth</div>
                  <p className="mt-1 text-xs text-muted-foreground">Your last role shows clear ownership and scope. Keep this section as-is.</p>
                </div>
              </li>
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
