import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Star, Users, Clock, Building2 } from "lucide-react";
import { PageHeader, Card } from "@/components/app/Section";
import { COMPANIES, SAMPLE_QUESTIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/companies")({
  head: () => ({ meta: [{ title: "Company Prep · InterviewForge" }] }),
  component: CompaniesPage,
});

function CompaniesPage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(COMPANIES[0]);
  const filtered = COMPANIES.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Company Prep"
        title="Walk into every loop with the playbook."
        subtitle="Process breakdowns, frequent questions, and culture cues for top hirers."
      />

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card className="p-0">
          <div className="border-b border-white/10 p-3">
            <label className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 focus-within:ring-primary/40">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search companies"
                className="w-full bg-transparent outline-none" />
            </label>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.name}
                onClick={() => setActive(c)}
                className={`flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left text-sm transition hover:bg-white/5 ${
                  active.name === c.name ? "bg-white/5" : ""
                }`}
              >
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-xs font-bold text-primary-foreground">
                  {c.logo || c.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.rounds} rounds · Accept {c.accept}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-300">
                  <Star className="h-3 w-3 fill-current" /> {c.difficulty}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <div className="flex flex-wrap items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-lg font-bold text-primary-foreground">
                {active.logo || active.name[0]}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{active.name}</h2>
                <p className="text-sm text-muted-foreground">{active.culture}</p>
              </div>
              <div className="ml-auto flex flex-wrap gap-2 text-xs">
                <Pill icon={Star} label={`Difficulty ${active.difficulty}/5`} />
                <Pill icon={Users} label={`Accept rate ${active.accept}`} />
                <Pill icon={Clock} label={`${active.rounds} rounds`} />
              </div>
            </div>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <h3 className="text-sm font-semibold">Interview process</h3>
              <ol className="mt-4 space-y-3">
                {[
                  { t: "Recruiter screen", d: "30 min · Background + motivation" },
                  { t: "Tech phone screen", d: "45 min · 1 coding question" },
                  { t: "Onsite — coding", d: "2 × 45 min · DSA + system" },
                  { t: "Onsite — behavioral", d: "60 min · Leadership principles" },
                  { t: "Hiring committee", d: "Async · Packet review" },
                ].slice(0, active.rounds).map((s, i) => (
                  <li key={s.t} className="flex gap-3">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/5 text-xs font-semibold ring-1 ring-white/10">{i + 1}</div>
                    <div>
                      <div className="text-sm font-medium">{s.t}</div>
                      <div className="text-xs text-muted-foreground">{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold">Frequently asked</h3>
              <ul className="mt-4 space-y-2">
                {SAMPLE_QUESTIONS.Technical.map((q) => (
                  <li key={q} className="rounded-lg bg-white/5 p-3 text-sm ring-1 ring-white/10">{q}</li>
                ))}
              </ul>
            </Card>
          </div>

          <Card>
            <div className="flex items-center gap-2 text-sm font-semibold"><Building2 className="h-4 w-4 text-primary" /> Hiring tips</div>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <li>• Quantify everything in behavioral answers.</li>
              <li>• Have 2 reusable "ambiguity" stories ready.</li>
              <li>• Practice writing during the design round.</li>
              <li>• Always state assumptions before coding.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Pill({ icon: Icon, label }: { icon: typeof Star; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs ring-1 ring-white/10">
      <Icon className="h-3 w-3 text-primary" /> {label}
    </span>
  );
}
