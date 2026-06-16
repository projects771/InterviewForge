export const PROFESSIONS = [
  "Software Engineer",
  "Cybersecurity Analyst",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "Marketing Manager",
  "DevOps Engineer",
  "ML Engineer",
];

export const LEVELS = ["Fresher", "Junior", "Mid-Level", "Senior"] as const;
export const TYPES = ["HR", "Technical", "Behavioral", "Managerial"] as const;
export const DIFFICULTY = ["Easy", "Medium", "Hard"] as const;

export const COMPANIES = [
  { name: "Google", logo: "G", difficulty: 4.6, rounds: 5, accept: "0.8%", culture: "Data-driven, high autonomy, deep technical bar." },
  { name: "Meta", logo: "M", difficulty: 4.4, rounds: 5, accept: "1.2%", culture: "Move fast, impact-first, opinionated leadership." },
  { name: "Amazon", logo: "A", difficulty: 4.2, rounds: 4, accept: "3.0%", culture: "Leadership principles, customer obsession." },
  { name: "Apple", logo: "", difficulty: 4.5, rounds: 4, accept: "2.0%", culture: "Craft, secrecy, design-led excellence." },
  { name: "Microsoft", logo: "MS", difficulty: 4.0, rounds: 4, accept: "4.0%", culture: "Growth mindset, collaborative, inclusive." },
  { name: "Netflix", logo: "N", difficulty: 4.7, rounds: 6, accept: "0.5%", culture: "High performance, freedom and responsibility." },
  { name: "Stripe", logo: "S", difficulty: 4.6, rounds: 5, accept: "0.6%", culture: "Rigorous thinking, written communication, craft." },
  { name: "OpenAI", logo: "O", difficulty: 4.8, rounds: 5, accept: "0.3%", culture: "Research velocity, safety, ambition." },
];

export const SAMPLE_QUESTIONS: Record<string, string[]> = {
  Technical: [
    "Walk me through how you'd design a URL shortener that handles 1B requests/day.",
    "Explain the difference between SQL and NoSQL with a concrete tradeoff you've faced.",
    "Given a binary tree, how would you find the lowest common ancestor of two nodes?",
    "What happens, end-to-end, when you type a URL into a browser and press enter?",
  ],
  HR: [
    "Tell me about yourself in under two minutes.",
    "Why do you want to work here, specifically?",
    "Where do you see yourself in five years?",
    "What's your expected compensation range?",
  ],
  Behavioral: [
    "Describe a time you had a serious disagreement with a teammate. How did you resolve it?",
    "Tell me about a project that failed. What did you learn?",
    "Walk me through a situation where you had to influence without authority.",
    "Tell me about the most ambiguous problem you've solved.",
  ],
  Managerial: [
    "How do you handle an underperforming report?",
    "How do you decide what your team should NOT work on?",
    "Describe how you ran a hiring loop for a critical role.",
    "How do you give feedback that lands?",
  ],
};

export const PERFORMANCE_TREND = [
  { day: "Mon", score: 62, communication: 70 },
  { day: "Tue", score: 68, communication: 72 },
  { day: "Wed", score: 71, communication: 74 },
  { day: "Thu", score: 75, communication: 78 },
  { day: "Fri", score: 79, communication: 80 },
  { day: "Sat", score: 84, communication: 83 },
  { day: "Sun", score: 88, communication: 86 },
];

export const SKILL_RADAR = [
  { skill: "Technical", you: 78, target: 90 },
  { skill: "Communication", you: 82, target: 85 },
  { skill: "System Design", you: 65, target: 88 },
  { skill: "Behavioral", you: 88, target: 85 },
  { skill: "Domain", you: 70, target: 85 },
  { skill: "Leadership", you: 60, target: 80 },
];

export const ACHIEVEMENTS = [
  { name: "First Mock", desc: "Completed your first session", earned: true },
  { name: "7-Day Streak", desc: "Practiced 7 days in a row", earned: true },
  { name: "System Design Pro", desc: "Score 85+ on 5 design rounds", earned: false },
  { name: "Behavioral Star", desc: "Master the STAR method", earned: true },
  { name: "Code Crusher", desc: "Solve 50 coding problems", earned: false },
  { name: "Interview Master", desc: "Complete 100 mock interviews", earned: false },
];

export const RESUME_ISSUES = [
  { severity: "high", title: "Weak action verbs", detail: "12 bullets start with 'responsible for' — replace with measurable impact verbs." },
  { severity: "high", title: "Missing keywords for ATS", detail: "Job target mentions 'Kubernetes', 'Terraform', 'observability' — not found in resume." },
  { severity: "med", title: "No quantified results", detail: "Only 3 of 18 bullets include numbers. Add metrics where possible." },
  { severity: "med", title: "Inconsistent tense", detail: "Past roles mix present and past tense. Normalize to past tense." },
  { severity: "low", title: "Two-column layout", detail: "ATS parsers may misorder content. Consider single-column." },
];

export const ROADMAP_WEEKS = [
  {
    week: "Week 1 — Foundations",
    focus: "Data structures, async patterns, behavioral STAR drills.",
    items: ["Arrays & hashing (12 problems)", "Async/await mental model", "STAR stories — 3 written"],
  },
  {
    week: "Week 2 — System Design",
    focus: "Caching, queues, sharding, capacity estimates.",
    items: ["Design Twitter feed", "Rate limiter deep-dive", "1 mock with senior interviewer"],
  },
  {
    week: "Week 3 — Domain depth",
    focus: "Pick 2 areas of expertise and go deep.",
    items: ["Database internals", "Observability patterns", "2 mock interviews"],
  },
  {
    week: "Week 4 — Polish & loop",
    focus: "Salary negotiation, company-specific prep.",
    items: ["Negotiation script", "Per-company writeups", "3 full mock loops"],
  },
];

export type ChatRole = "user" | "interviewer";
export type ChatMessage = { id: string; role: ChatRole; text: string; ts: number };
export type Thread = {
  id: string;
  title: string;
  profession: string;
  level: string;
  type: string;
  difficulty: string;
  createdAt: number;
  messages: ChatMessage[];
  scores?: { confidence: number; technical: number; communication: number };
};

export function newThread(opts: Partial<Thread> = {}): Thread {
  const id = (typeof crypto !== "undefined" && "randomUUID" in crypto)
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
  const type = opts.type ?? "Technical";
  const opener = (SAMPLE_QUESTIONS[type] ?? SAMPLE_QUESTIONS.Technical)[0];
  return {
    id,
    title: opts.title ?? `${opts.profession ?? "Software Engineer"} · ${type}`,
    profession: opts.profession ?? "Software Engineer",
    level: opts.level ?? "Mid-Level",
    type,
    difficulty: opts.difficulty ?? "Medium",
    createdAt: Date.now(),
    messages: [
      { id: "m0", role: "interviewer", text: `Welcome. Let's begin. ${opener}`, ts: Date.now() },
    ],
    ...opts,
  };
}

export function nextInterviewerLine(thread: Thread): string {
  const pool = SAMPLE_QUESTIONS[thread.type] ?? SAMPLE_QUESTIONS.Technical;
  const asked = thread.messages.filter((m) => m.role === "interviewer").length;
  const q = pool[asked % pool.length];
  const followups = [
    "Interesting — can you go deeper on the tradeoffs?",
    "Got it. Next question:",
    "Thanks. Let's pivot a bit:",
    "Mm. Push your reasoning one level further:",
  ];
  return `${followups[asked % followups.length]} ${q}`;
}
