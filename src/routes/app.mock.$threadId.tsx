import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Mic, Send, Sparkles } from "lucide-react";
import { Card } from "@/components/app/Section";
import { useThreads } from "@/lib/threads-store";
import { nextInterviewerLine, type ChatMessage } from "@/lib/mock-data";

export const Route = createFileRoute("/app/mock/$threadId")({
  head: () => ({ meta: [{ title: "Mock Session · InterviewForge" }] }),
  component: MockSession,
});

function MockSession() {
  const { threadId } = useParams({ from: "/app/mock/$threadId" });
  const { threads, hydrated, update } = useThreads();
  const thread = threads.find((t) => t.id === threadId);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, [threadId]);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [thread?.messages.length, typing]);

  if (!hydrated) return <Card><div className="h-96 animate-pulse rounded-xl bg-white/5" /></Card>;
  if (!thread) {
    return (
      <Card>
        <p className="text-sm text-muted-foreground">Session not found.</p>
        <Link to="/app/mock" className="mt-3 inline-block text-sm text-primary hover:underline">← Back to mocks</Link>
      </Card>
    );
  }

  function send() {
    const text = input.trim();
    if (!text || !thread) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text, ts: Date.now() };
    update(thread.id, { messages: [...thread.messages, userMsg] });
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "interviewer",
        text: nextInterviewerLine({ ...thread, messages: [...thread.messages, userMsg] }),
        ts: Date.now(),
      };
      update(thread.id, {
        messages: [...thread.messages, userMsg, reply],
        scores: {
          confidence: 60 + Math.floor(Math.random() * 30),
          technical: 60 + Math.floor(Math.random() * 35),
          communication: 60 + Math.floor(Math.random() * 30),
        },
      });
      setTyping(false);
      inputRef.current?.focus();
    }, 900);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <Card className="flex h-[calc(100vh-180px)] flex-col p-0">
        <div className="flex items-center gap-3 border-b border-white/10 p-4">
          <Link to="/app/mock" className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-sm font-bold text-primary-foreground">AI</div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{thread.title}</div>
            <div className="text-xs text-muted-foreground">{thread.level} · {thread.difficulty}</div>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-400/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
          <AnimatePresence initial={false}>
            {thread.messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "interviewer" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground">AI</div>
                )}
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 ring-1 ring-white/10"
                }`}>
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold">JD</div>
                )}
              </motion.div>
            ))}
            {typing && (
              <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground">AI</div>
                <div className="flex items-center gap-1 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i}
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-white/10 p-3">
          <div className="flex items-end gap-2 rounded-xl bg-white/5 p-2 ring-1 ring-white/10 focus-within:ring-primary/40">
            <button className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground" title="Voice answer">
              <Mic className="h-4 w-4" />
            </button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Type your answer… (Enter to send, Shift+Enter for new line)"
              rows={1}
              className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
            />
            <button onClick={send} disabled={!input.trim() || typing}
              className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-primary-foreground ring-glow disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <Card>
          <h3 className="text-sm font-semibold">Live evaluation</h3>
          <p className="text-xs text-muted-foreground">Updates after each answer</p>
          <div className="mt-4 space-y-3">
            {(["confidence", "technical", "communication"] as const).map((k) => {
              const v = thread.scores?.[k] ?? 0;
              const label = k[0].toUpperCase() + k.slice(1);
              return (
                <div key={k}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{v}/100</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} className="h-full bg-gradient-brand" />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Coach tips</div>
          <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
            <li>• Use the STAR method when describing experiences.</li>
            <li>• Quantify outcomes ("reduced p95 by 38%").</li>
            <li>• Pause before answering — clarity beats speed.</li>
            <li>• Mention tradeoffs explicitly in design answers.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
