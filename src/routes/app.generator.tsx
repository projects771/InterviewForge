import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { PageHeader, Card } from "@/components/app/Section";
import { PROFESSIONS, LEVELS, TYPES, DIFFICULTY, SAMPLE_QUESTIONS } from "@/lib/mock-data";
import { useThreads } from "@/lib/threads-store";

export const Route = createFileRoute("/app/generator")({
  head: () => ({ meta: [{ title: "Interview Generator · InterviewForge" }] }),
  component: GeneratorPage,
});

function GeneratorPage() {
  const [profession, setProfession] = useState(PROFESSIONS[0]);
  const [level, setLevel] = useState<typeof LEVELS[number]>("Mid-Level");
  const [type, setType] = useState<typeof TYPES[number]>("Technical");
  const [difficulty, setDifficulty] = useState<typeof DIFFICULTY[number]>("Medium");
  const [generated, setGenerated] = useState<string[] | null>(null);
  const { create } = useThreads();
  const navigate = useNavigate();

  function generate() {
    const base = SAMPLE_QUESTIONS[type] ?? SAMPLE_QUESTIONS.Technical;
    setGenerated(base.slice(0, 6));
  }

  function startMock() {
    const t = create({ profession, level, type, difficulty });
    navigate({ to: "/app/mock/$threadId", params: { threadId: t.id } });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Generator"
        title="Forge a question set."
        subtitle="Personalized to your role, level and interview type. Increase difficulty as you improve."
      />

      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <h3 className="text-sm font-semibold">Configuration</h3>
          <div className="mt-4 space-y-4">
            <Select label="Profession" value={profession} onChange={setProfession} options={PROFESSIONS} />
            <Chips label="Experience" value={level} onChange={setLevel} options={LEVELS as readonly string[]} />
            <Chips label="Interview type" value={type} onChange={setType} options={TYPES as readonly string[]} />
            <Chips label="Difficulty" value={difficulty} onChange={setDifficulty} options={DIFFICULTY as readonly string[]} />
            <button
              onClick={generate}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground ring-glow"
            >
              <Wand2 className="h-4 w-4" /> Generate questions
            </button>
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Generated set</h3>
            {generated && (
              <button onClick={startMock} className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium ring-1 ring-white/10 hover:bg-white/10">
                <Sparkles className="h-3.5 w-3.5" /> Start mock with these
              </button>
            )}
          </div>
          {!generated ? (
            <div className="grid h-72 place-items-center text-center text-sm text-muted-foreground">
              <div>
                <Sparkles className="mx-auto h-7 w-7 text-primary/60" />
                <p className="mt-3">Configure on the left, then generate.</p>
              </div>
            </div>
          ) : (
            <ol className="mt-5 space-y-3">
              {generated.map((q, i) => (
                <motion.li
                  key={q}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
                >
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-brand text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="flex-1 text-sm leading-relaxed">{q}</div>
                  <span className="self-start rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">{difficulty}</span>
                </motion.li>
              ))}
            </ol>
          )}
        </Card>
      </div>
    </div>
  );
}

function Select<T extends string>({ label, value, onChange, options }: {
  label: string; value: T; onChange: (v: T) => void; options: readonly string[];
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary/40"
      >
        {options.map((o) => <option key={o} value={o} className="bg-background">{o}</option>)}
      </select>
    </div>
  );
}

function Chips<T extends string>({ label, value, onChange, options }: {
  label: string; value: T; onChange: (v: T) => void; options: readonly string[];
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o as T)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              value === o
                ? "bg-gradient-brand text-primary-foreground ring-glow"
                : "bg-white/5 text-muted-foreground ring-1 ring-white/10 hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
