import { useEffect, useState, useCallback } from "react";
import { type Thread, newThread } from "./mock-data";

const KEY = "if_threads_v1";

function load(): Thread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Thread[];
  } catch {
    return [];
  }
}

function save(threads: Thread[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(threads));
}

export function useThreads() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const initial = load();
    if (initial.length === 0) {
      const seed = [
        newThread({ profession: "Software Engineer", type: "Technical", level: "Senior", difficulty: "Hard" }),
        newThread({ profession: "Product Manager", type: "Behavioral", level: "Mid-Level", difficulty: "Medium" }),
      ];
      setThreads(seed);
      save(seed);
    } else {
      setThreads(initial);
    }
    setHydrated(true);
  }, []);

  const create = useCallback((opts: Parameters<typeof newThread>[0]) => {
    const t = newThread(opts);
    setThreads((prev) => {
      const next = [t, ...prev];
      save(next);
      return next;
    });
    return t;
  }, []);

  const update = useCallback((id: string, patch: Partial<Thread>) => {
    setThreads((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, ...patch } : t));
      save(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setThreads((prev) => {
      const next = prev.filter((t) => t.id !== id);
      save(next);
      return next;
    });
  }, []);

  return { threads, hydrated, create, update, remove };
}
