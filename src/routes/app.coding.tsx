import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, CheckCircle2, XCircle } from "lucide-react";
import { PageHeader, Card } from "@/components/app/Section";

export const Route = createFileRoute("/app/coding")({
  head: () => ({ meta: [{ title: "Coding Arena · InterviewForge" }] }),
  component: CodingPage,
});

const LANGS = ["Python", "JavaScript", "Java", "C++", "C"] as const;
const STARTER: Record<string, string> = {
  Python: `def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []`,
  JavaScript: `function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const c = target - nums[i];\n    if (seen.has(c)) return [seen.get(c), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}`,
  Java: `class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    // your code\n    return new int[]{};\n  }\n}`,
  "C++": `vector<int> twoSum(vector<int>& nums, int target) {\n  // your code\n  return {};\n}`,
  C: `int* twoSum(int* nums, int n, int target, int* rs) { /* ... */ return NULL; }`,
};

function CodingPage() {
  const [lang, setLang] = useState<typeof LANGS[number]>("Python");
  const [code, setCode] = useState(STARTER.Python);
  const [results, setResults] = useState<{ ok: boolean; t: string }[] | null>(null);

  function run() {
    setResults([
      { ok: true, t: "[2,7,11,15], 9 → [0,1]" },
      { ok: true, t: "[3,2,4], 6 → [1,2]" },
      { ok: true, t: "[3,3], 6 → [0,1]" },
      { ok: false, t: "[1,2,3,4], 8 → [] (expected [])" },
    ]);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Coding Arena"
        title="Two Sum · Easy"
        subtitle="Given an array of integers, return indices of two numbers that add up to target."
      />

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="flex h-[calc(100vh-220px)] flex-col p-0">
          <div className="flex items-center gap-2 border-b border-white/10 p-3">
            <div className="flex gap-1 rounded-lg bg-white/5 p-1 text-xs">
              {LANGS.map((l) => (
                <button key={l} onClick={() => { setLang(l); setCode(STARTER[l]); setResults(null); }}
                  className={`rounded-md px-2.5 py-1 ${lang === l ? "bg-white/10 text-foreground" : "text-muted-foreground"}`}>
                  {l}
                </button>
              ))}
            </div>
            <button onClick={run} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-gradient-brand px-3 py-1.5 text-xs font-semibold text-primary-foreground ring-glow">
              <Play className="h-3.5 w-3.5" /> Run tests
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 resize-none bg-transparent p-5 font-mono text-sm leading-relaxed outline-none"
          />
        </Card>

        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-semibold">Constraints</h3>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li>2 ≤ nums.length ≤ 10⁴</li>
              <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
              <li>Only one valid answer exists.</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold">Test results</h3>
            {!results ? (
              <p className="mt-3 text-xs text-muted-foreground">Run your code to see results.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-xs">
                {results.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 rounded-lg bg-white/5 p-2.5 ring-1 ring-white/10">
                    {r.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" /> : <XCircle className="mt-0.5 h-4 w-4 text-rose-400" />}
                    <code className="font-mono">{r.t}</code>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
