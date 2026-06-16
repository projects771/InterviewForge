import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart,
} from "recharts";
import { Flame, Target, TrendingUp, Trophy, ArrowUpRight, Play } from "lucide-react";
import { PageHeader, Card } from "@/components/app/Section";
import { PERFORMANCE_TREND, SKILL_RADAR, ACHIEVEMENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · InterviewForge" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Welcome back, Jordan."
        subtitle="You're 12 points away from your weekly readiness goal. Keep the streak going."
        actions={
          <Link to="/app/mock" className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground ring-glow">
            <Play className="h-4 w-4" /> Start mock
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Flame} label="Day streak" value="7" trend="+2 vs last week" tone="orange" />
        <Stat icon={TrendingUp} label="Avg score" value="84" trend="+12 pts" tone="violet" />
        <Stat icon={Target} label="Readiness" value="78%" trend="On track" tone="cyan" />
        <Stat icon={Trophy} label="Mocks done" value="24" trend="3 this week" tone="amber" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Performance trend</h2>
              <p className="text-xs text-muted-foreground">Confidence + communication, last 7 days</p>
            </div>
            <div className="flex gap-1 rounded-lg bg-white/5 p-1 text-xs">
              {["7d", "30d", "All"].map((t, i) => (
                <button key={t} className={`rounded-md px-2.5 py-1 ${i === 0 ? "bg-white/10 text-foreground" : "text-muted-foreground"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={PERFORMANCE_TREND}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.22 295)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.72 0.22 295)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.16 200)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.78 0.16 200)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="oklch(0.68 0.03 270)" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke="oklch(0.68 0.03 270)" tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 10%)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="score" stroke="oklch(0.72 0.22 295)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="communication" stroke="oklch(0.78 0.16 200)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-semibold">Skill radar</h2>
          <p className="text-xs text-muted-foreground">You vs target role</p>
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={SKILL_RADAR}>
                <PolarGrid stroke="oklch(1 0 0 / 10%)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "oklch(0.78 0.03 270)", fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Target" dataKey="target" stroke="oklch(0.78 0.16 200)" fill="oklch(0.78 0.16 200)" fillOpacity={0.15} />
                <Radar name="You" dataKey="you" stroke="oklch(0.72 0.22 295)" fill="oklch(0.72 0.22 295)" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Recent sessions</h2>
            <Link to="/app/mock" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">View all <ArrowUpRight className="h-3 w-3" /></Link>
          </div>
          <div className="mt-4 divide-y divide-white/5">
            {[
              { t: "Senior SWE · System Design", d: "Today", s: 88, tag: "Hard" },
              { t: "PM · Behavioral STAR drill", d: "Yesterday", s: 74, tag: "Medium" },
              { t: "Cybersecurity · SOC scenario", d: "Mon", s: 81, tag: "Hard" },
              { t: "Frontend · React deep-dive", d: "Sun", s: 79, tag: "Medium" },
            ].map((r) => (
              <div key={r.t} className="flex items-center gap-4 py-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-xs font-bold text-primary-foreground">
                  {r.s}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{r.t}</div>
                  <div className="text-xs text-muted-foreground">{r.d} · {r.tag}</div>
                </div>
                <div className="hidden h-1.5 w-32 overflow-hidden rounded-full bg-white/10 sm:block">
                  <div className="h-full bg-gradient-brand" style={{ width: `${r.s}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-semibold">Achievements</h2>
          <p className="text-xs text-muted-foreground">3 of 6 unlocked</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                className={`flex flex-col items-center rounded-xl p-3 text-center ${a.earned ? "bg-gradient-to-br from-primary/20 to-accent/10 ring-1 ring-primary/30" : "bg-white/5 opacity-50"}`}
                title={a.desc}
              >
                <Trophy className={`h-6 w-6 ${a.earned ? "text-primary" : "text-muted-foreground"}`} />
                <div className="mt-2 text-[10px] font-medium leading-tight">{a.name}</div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, trend, tone }: {
  icon: typeof Flame; label: string; value: string; trend: string; tone: "orange" | "violet" | "cyan" | "amber";
}) {
  const tones = {
    orange: "from-orange-500/25 text-orange-300",
    violet: "from-primary/30 text-primary",
    cyan: "from-cyan-400/25 text-cyan-300",
    amber: "from-amber-400/25 text-amber-300",
  };
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${tones[tone]} blur-2xl opacity-50`} />
      <div className="relative flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <Icon className={`h-5 w-5 ${tones[tone].split(" ")[1]}`} />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
      </div>
      <div className="relative mt-3 text-xs text-muted-foreground">{trend}</div>
    </Card>
  );
}
