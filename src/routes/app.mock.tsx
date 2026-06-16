import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus, MessagesSquare, Trash2 } from "lucide-react";
import { PageHeader, Card } from "@/components/app/Section";
import { useThreads } from "@/lib/threads-store";

export const Route = createFileRoute("/app/mock")({
  head: () => ({ meta: [{ title: "Mock Interviews · InterviewForge" }] }),
  component: MockIndex,
});

function MockIndex() {
  const { threads, hydrated, create, remove } = useThreads();
  const navigate = useNavigate();

  function startNew() {
    const t = create({});
    navigate({ to: "/app/mock/$threadId", params: { threadId: t.id } });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mock Interviews"
        title="Your interview sessions."
        subtitle="Resume any conversation or kick off a new round with a fresh question set."
        actions={
          <button onClick={startNew} className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground ring-glow">
            <Plus className="h-4 w-4" /> New mock
          </button>
        }
      />

      {!hydrated ? (
        <Card><div className="h-40 animate-pulse rounded-xl bg-white/5" /></Card>
      ) : threads.length === 0 ? (
        <Card>
          <div className="grid place-items-center py-12 text-center">
            <MessagesSquare className="h-8 w-8 text-primary/70" />
            <p className="mt-3 text-sm text-muted-foreground">No sessions yet. Start your first mock.</p>
            <button onClick={startNew} className="mt-4 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground ring-glow">Start mock</button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {threads.map((t) => (
            <div key={t.id} className="glass group relative rounded-2xl p-5 transition hover:-translate-y-0.5 hover:ring-1 hover:ring-primary/40">
              <Link to="/app/mock/$threadId" params={{ threadId: t.id }} className="block">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 font-medium text-primary">{t.type}</span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-muted-foreground">{t.difficulty}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold">{t.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{t.level} · {new Date(t.createdAt).toLocaleDateString()}</p>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                  {t.messages.at(-1)?.text}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{t.messages.length} messages</span>
                  <span className="text-primary group-hover:underline">Resume →</span>
                </div>
              </Link>
              <button
                onClick={(e) => { e.preventDefault(); remove(t.id); }}
                className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-muted-foreground opacity-0 ring-1 ring-white/10 transition hover:bg-destructive/20 hover:text-destructive group-hover:opacity-100"
                aria-label="Delete thread"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
